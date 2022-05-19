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

import { ESLintScriptProvider, ESLintScriptProviderOptions } from 'europa-build/script/provider/ESLintScriptProvider';

/**
 * A {@link ScriptProvider} implementation that runs ESLint against a package's source code using a common configuration
 * that supports Prettier and TypeScript with the ability to fix applicable linting errors automatically within the
 * source code.
 */
export class FixLintScriptProvider extends ESLintScriptProvider {
  /**
   * Creates an instance of {@link FixLintScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: ESLintScriptProviderOptions) {
    super(options);
  }

  protected override getESLintArgs(): string[] {
    return ['--fix'];
  }

  protected override getLoggerName(): string {
    return 'FixLintScriptProvider';
  }

  override getName(): string {
    return 'flint';
  }
}
