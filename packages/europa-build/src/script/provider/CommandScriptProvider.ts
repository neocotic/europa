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

import { exec, execFile } from 'child_process';
import { EOL } from 'os';
import { promisify } from 'util';

import { CommonScriptProvider, CommonScriptProviderOptions } from 'europa-build/script/provider/CommonScriptProvider';

const execute = promisify(exec);
const executeFile = promisify(execFile);

/**
 * An abstract {@link ScriptProvider} that provides logic useful for executing commands to support scripts.
 */
export abstract class CommandScriptProvider extends CommonScriptProvider {
  /**
   * Creates an instance of {@link CommandScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: CommandScriptProviderOptions) {
    super(options);
  }

  /**
   * Executes the command with the specified name using the `args` provided within the given directory and returns
   * anything written to STDOUT by the command.
   *
   * @param directoryPath - The path of the directory in which the command should be executed.
   * @param commandName - The name of the command to be executed.
   * @param [args] - Any arguments to be passed to the command during execution.
   * @return Anything written to STDOUT by the command.
   * @throws If an error occurs while attempting to execute the command.
   */
  protected async exec(directoryPath: string, commandName: string, args: string[] = []): Promise<string> {
    this.getLogger().debug(
      `Executing '${commandName}' command  with arguments [${args}] in directory: '${directoryPath}'`,
    );

    try {
      const command = args.length ? [commandName].concat(...args).join(' ') : commandName;
      const { stdout } = await execute(command, { cwd: directoryPath });

      this.logCommandOutput(commandName, stdout);

      return stdout;
    } catch (e) {
      throw new Error(`Failed to execute '${commandName}' command: ${CommandScriptProvider.getExecErrorMessage(e)}`);
    }
  }

  /**
   * Executes the bundled command with the specified name using the `args` provided within the given directory and
   * returns anything written to STDOUT by the command.
   *
   * @param directoryPath - The path of the directory in which the command should be executed.
   * @param commandName - The name of the bundled command to be executed.
   * @param [args] - Any arguments to be passed to the bundled command during execution.
   * @return Anything written to STDOUT by the bundled command.
   * @throws If an error occurs while attempting to execute the bundled command.
   */
  protected async execBundledCommand(directoryPath: string, commandName: string, args: string[] = []): Promise<string> {
    const commandPath = await this.getBundledCommandPath(commandName);

    this.getLogger().debug(
      `Executing '${commandName}' command  with arguments [${args}] in directory: '${directoryPath}'`,
    );

    try {
      const { stdout } = await executeFile(commandPath, args, { cwd: directoryPath });

      this.logCommandOutput(commandName, stdout);

      return stdout;
    } catch (e) {
      throw new Error(`Failed to execute '${commandName}' command: ${CommandScriptProvider.getExecErrorMessage(e)}`);
    }
  }

  /**
   * Returns the path of the bundled command.
   *
   * @param commandName - The name of the bundled command whose path is to be returned.
   * @return The path of the bundled command.
   */
  protected getBundledCommandPath(commandName: string): Promise<string> {
    return this.getBundledPath('node_modules/.bin', commandName);
  }

  private static getExecErrorMessage(error: unknown): string {
    if (!error) {
      return 'An unknown error occurred';
    }

    if (error instanceof Error) {
      if (CommandScriptProvider.hasErrorStderr(error)) {
        return error.stderr;
      }
      if (CommandScriptProvider.hasErrorStdout(error)) {
        return error.stdout;
      }
    }

    return `${error}`;
  }

  private static hasErrorField(error: any, fieldName: string): boolean {
    return fieldName in error && typeof error[fieldName] === 'string' && !!error[fieldName];
  }

  private static hasErrorStderr(error: any): error is Error & { stderr: string } {
    return CommandScriptProvider.hasErrorField(error, 'stderr');
  }

  private static hasErrorStdout(error: any): error is Error & { stdout: string } {
    return CommandScriptProvider.hasErrorField(error, 'stdout');
  }

  private logCommandOutput(commandName: string, output: string) {
    const logger = this.getLogger();

    if (logger.isDebugEnabled()) {
      logger.debug(
        output
          ? `'${commandName}' command provided output:${EOL}${output}`
          : `'${commandName}' command provided no output`,
      );
    }
  }
}

/**
 * The options used by {@link CommandScriptProvider}.
 */
export type CommandScriptProviderOptions = CommonScriptProviderOptions;
