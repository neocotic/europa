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

import { ExecFileException, execFile } from 'child_process';
import { EOL } from 'os';
import { resolve } from 'path';
import { promisify } from 'util';

import { PackageInfo } from 'europa-build/PackageInfo';
import { CommonScriptProvider, CommonScriptProviderOptions } from 'europa-build/script/provider/CommonScriptProvider';

const executeFile = promisify(execFile);

/**
 * An abstract {@link ScriptProvider} that provides logic useful for executing commands to support scripts.
 */
export abstract class CommandScriptProvider extends CommonScriptProvider {
  /**
   * Creates a {@link CommandScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: CommandScriptProviderOptions) {
    super(options);
  }

  /**
   * Executes the bundled command with the specified name using the `args` provided within the given directory.
   *
   * @param directoryPath - The path of the directory in which the command should be executed.
   * @param commandName - The name of the bundled command to be executed.
   * @param args - Any arguments to be passed to the bundled command during execution.
   * @throws If an error occurs while attempting to execute the bundled command.
   */
  protected async execCommand(directoryPath: string, commandName: string, ...args: string[]): Promise<void> {
    const packageInfo = await PackageInfo.getSingleton();
    const commandPath = resolve(packageInfo.directoryPath, 'node_modules/.bin', commandName);

    this.getLogger().debug(
      `Executing '${commandName}' command  with arguments [${args}] in directory: '${directoryPath}'`,
    );

    try {
      const { stdout } = await executeFile(commandPath, args, { cwd: directoryPath });
      if (stdout) {
        this.getLogger().debug(`Output from '${commandName}' command:${EOL}${stdout}`);
      }
    } catch (e) {
      throw new Error(
        `Failed to execute '${commandName}' command: ${CommandScriptProvider.getExecFileExceptionMessage(e)}`,
      );
    }
  }

  private static getExecFileExceptionMessage(error: unknown): string {
    if (!error) {
      return '';
    }

    if (error instanceof Error) {
      const exception = error as ExecFileException & { stderr: string; stdout: string };
      if (exception.stderr) {
        return exception.stderr;
      }
      if (exception.stdout) {
        return exception.stdout;
      }
    }

    return `${error}`;
  }
}

/**
 * The options used by {@link CommandScriptProvider}.
 */
export type CommandScriptProviderOptions = CommonScriptProviderOptions;
