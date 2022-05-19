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

import { Logger } from 'winston';

import { LoggableOptions, createLogger } from 'europa-build/logger/Logger';
import { BuildScriptProvider } from 'europa-build/script/provider/BuildScriptProvider';
import { FixLintScriptProvider } from 'europa-build/script/provider/FixLintScriptProvider';
import { FormatScriptProvider } from 'europa-build/script/provider/FormatScriptProvider';
import { LintScriptProvider } from 'europa-build/script/provider/LintScriptProvider';
import { ScriptProvider } from 'europa-build/script/provider/ScriptProvider';
import { TestScriptProvider } from 'europa-build/script/provider/TestScriptProvider';

const _logger = Symbol();
const _providers = Symbol();

/**
 * A runner for scripts that relate to generated plugin and preset packages.
 */
export class ScriptRunner {
  private readonly [_logger]: Logger;
  private readonly [_providers]: ScriptProvider[];

  /**
   * Creates an instance of {@link ScriptRunner} using the `options` provided.
   *
   * @param [options] - The options to be used.
   */
  constructor(options: ScriptRunnerOptions = {}) {
    const parentLogger = options.parentLogger ?? createLogger({ outputStream: options.outputStream });

    this[_logger] = parentLogger.child({ name: 'ScriptRunner' });
    this[_providers] = [
      new BuildScriptProvider({ parentLogger }),
      new FixLintScriptProvider({ parentLogger }),
      new FormatScriptProvider({ parentLogger }),
      new LintScriptProvider({ parentLogger }),
      new TestScriptProvider({ parentLogger }),
    ];
  }

  /**
   * Returns the names of all available scripts.
   *
   * @return The available script names.
   */
  getScriptNames(): string[] {
    return this[_providers].map((provider) => provider.getName());
  }

  /**
   * Runs the script with the specified name using the `options` provided.
   *
   * @param scriptName - The name of the script to run.
   * @param [options] - The options to be used.
   * @throws If no script could be found for `scriptName` or if any error occurs while running the script.
   */
  async run(scriptName: string, options: ScriptRunnerRunOptions = {}): Promise<void> {
    const cwd = options.cwd ?? process.cwd();
    const provider = this[_providers].find((provider) => provider.getName() === scriptName);
    if (!provider) {
      throw new Error(`Unexpected script name: ${scriptName}`);
    }

    let ranScript = false;

    try {
      await provider.runScript(cwd);

      ranScript = true;

      await provider.afterScript(cwd);
    } catch (e) {
      if (!ranScript) {
        await provider.afterScript(cwd);
      }

      throw e;
    }
  }
}

/**
 * The options used by {@link ScriptRunner}.
 */
export type ScriptRunnerOptions = LoggableOptions;

/**
 * The options used by {@link ScriptRunner#run}.
 */
export type ScriptRunnerRunOptions = {
  /**
   * The current working directory to be used to resolve relative file paths. Defaults to the current working directory.
   */
  readonly cwd?: string;
};
