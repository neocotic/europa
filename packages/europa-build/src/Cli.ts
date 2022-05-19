/*
 * Copyright (C) 2022 neocotic
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Argument, Command, Option, program } from 'commander';
import { Writable } from 'stream';
import { Logger } from 'winston';

import { PackageInfo } from 'europa-build/PackageInfo';
import { createLogger } from 'europa-build/logger/Logger';
import { ScriptRunner } from 'europa-build/script/ScriptRunner';
import { TemplateManager } from 'europa-build/template/TemplateManager';
import { TemplateCliOption, TemplateContext, TemplateProvider } from 'europa-build/template/provider/TemplateProvider';
import { TemplateProviderType } from 'europa-build/template/provider/TemplateProviderType';

const _cwd = Symbol();
const _command = Symbol();
const _logger = Symbol();
const _onError = Symbol();
const _outputStream = Symbol();

/**
 * A command-line interface for generating and maintaining Europa plugins and presets.
 */
export class Cli {
  private [_command]: Command | undefined;
  private readonly [_cwd]: string;
  private readonly [_logger]: Logger;
  private readonly [_onError]: ((error: unknown) => void) | undefined;
  private readonly [_outputStream]: Writable | undefined;

  /**
   * Creates an instance of {@link Cli} using the `options` provided.
   *
   * @param [options] - The options to be used.
   */
  constructor(options: CliOptions = {}) {
    this[_cwd] = options.cwd ?? process.cwd();
    this[_logger] = createLogger({ outputStream: options.outputStream }).child({ name: 'Cli' });
    this[_onError] = options.onError;
    this[_outputStream] = options.outputStream;
  }

  /**
   * Parses the specified `args` and executes the relevant sub-command.
   *
   * @param [args] - The command-line arguments to be parsed. Defaults to those passed to the Node.js process.
   */
  async parse(args: string[] = process.argv): Promise<void> {
    const command = await this.getCommand();
    command.parse(args);
  }

  private activateDebugLogging() {
    this[_logger].transports[0].level = 'debug';
  }

  private async createCommand(): Promise<Command> {
    const outputStream = this[_outputStream];
    const parentLogger = this[_logger];
    const packageInfo = await PackageInfo.getSingleton();
    const scriptRunner = new ScriptRunner({ outputStream, parentLogger });
    const templateManager = new TemplateManager({ outputStream, parentLogger });

    return program
      .version(packageInfo.json.version)
      .addCommand(
        this.createGenerateSubCommand(
          templateManager,
          'generate-plugin',
          'generate a plugin package',
          TemplateProviderType.Plugin,
        ),
      )
      .addCommand(
        this.createGenerateSubCommand(
          templateManager,
          'generate-preset',
          'generate a preset package',
          TemplateProviderType.Preset,
        ),
      )
      .addCommand(this.createRunScriptSubCommand(scriptRunner));
  }

  private static createDebugOption(): Option {
    return new Option('-d, --debug', 'enable debug logging');
  }

  private createGenerateSubCommand(
    templateManager: TemplateManager,
    name: string,
    description: string,
    type: TemplateProviderType,
  ): Command {
    const templateProviders = templateManager.getProvidersForType(type);
    const subCommand = new Command(name)
      .description(description)
      .usage('[options] <template>')
      .addArgument(
        new Argument('<template>', 'name of the template to generate').choices(
          templateProviders.map((provider) => provider.getName()),
        ),
      )
      .addOption(Cli.createDebugOption());

    templateProviders.forEach((provider) => {
      subCommand.addCommand(this.createTemplateSubCommand(name, provider));
    });

    return subCommand;
  }

  private createRunScriptSubCommand(scriptRunner: ScriptRunner): Command {
    return new Command('run-script')
      .description('run the named script')
      .addArgument(new Argument('<name>', 'name of the script to run').choices(scriptRunner.getScriptNames()))
      .addOption(Cli.createDebugOption())
      .action(async (scriptName: string, { debug }: CommandOptions) => {
        if (debug) {
          this.activateDebugLogging();
        }

        try {
          await scriptRunner.run(scriptName, { cwd: this[_cwd] });
        } catch (e) {
          this[_logger].error('Failed to execute "run-script" command');
          this[_logger].error(e);

          this[_onError]?.(e);
        }
      });
  }

  private static createTemplateOption(cliOption: TemplateCliOption): Option {
    let flags = `--${cliOption.longName}`;
    if (cliOption.shortName) {
      flags = `-${cliOption.shortName}, ${flags}`;
    }
    if (cliOption.arg) {
      flags += ` ${cliOption.arg}`;
    }

    const option = new Option(flags, cliOption.description);
    if (typeof cliOption.defaultValue !== 'undefined') {
      option.default(cliOption.defaultValue, cliOption.defaultValueDescription);
    }

    return option;
  }

  private createTemplateSubCommand<C extends TemplateContext>(
    rootCommand: string,
    templateProvider: TemplateProvider<C>,
  ): Command {
    const subCommand = new Command(templateProvider.getName())
      .addArgument(
        new Argument('[target]', 'path of the template output').default(process.cwd(), 'current working directory'),
      )
      .addOption(Cli.createDebugOption());

    templateProvider.createCliOptions().map(Cli.createTemplateOption).forEach(subCommand.addOption.bind(subCommand));

    subCommand.action(async (targetDirectory: string, { debug, ...options }: CommandOptions & Partial<C>) => {
      if (debug) {
        this.activateDebugLogging();
      }

      try {
        const context = await templateProvider.createContext(options as Partial<C>);
        const generator = templateProvider.createGenerator();

        await generator.generate(context, targetDirectory);
      } catch (e) {
        this[_logger].error(`Failed to execute "${rootCommand} ${templateProvider.getName()}" command`);
        this[_logger].error(e);

        this[_onError]?.(e);
      }
    });

    return subCommand;
  }

  private async getCommand(): Promise<Command> {
    const cachedCommand = this[_command];
    if (cachedCommand) {
      return cachedCommand;
    }

    const command = await this.createCommand();

    this[_command] = command;

    return command;
  }
}

/**
 * The options used by {@link Cli}.
 */
export type CliOptions = {
  /**
   * The current working directory to be used to resolve relative file paths. Defaults to the current working directory.
   */
  readonly cwd?: string;
  /**
   * A handler for any errors that occur while processing a command.
   */
  readonly onError?: (error: unknown) => void;
  /**
   * The `Writable` to which logging output should be written. Defaults to the standard output stream.
   */
  readonly outputStream?: Writable;
};

type CommandOptions = {
  readonly debug?: boolean;
};
