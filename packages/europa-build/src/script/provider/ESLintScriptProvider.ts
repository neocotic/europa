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

import {
  CommandScriptProvider,
  CommandScriptProviderOptions,
} from 'europa-build/script/provider/CommandScriptProvider';

/**
 * An abstract {@link ScriptProvider} that provides the logic for scripts based on ESLint.
 */
export abstract class ESLintScriptProvider extends CommandScriptProvider {
  /**
   * Creates an instance of {@link ESLintScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: ESLintScriptProviderOptions) {
    super(options);
  }

  /**
   * Returns any additional arguments to be passed to the ESLint command.
   *
   * @return Any ESLint command-line arguments.
   */
  protected abstract getESLintArgs(): string[];

  override async runScript(directoryPath: string): Promise<void> {
    await this.execBundledCommand(directoryPath, 'eslint', [
      ...this.getESLintArgs(),
      '--no-eslintrc',
      '--config',
      await this.getBundledConfigFilePath('.eslintrc.json'),
      'src/**/*.ts',
      'spec/**/*.ts',
    ]);
  }
}

/**
 * The options used by {@link ESLintScriptProvider}.
 */
export type ESLintScriptProviderOptions = CommandScriptProviderOptions;
