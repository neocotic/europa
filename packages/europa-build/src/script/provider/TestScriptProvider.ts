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

import { CommonScriptProvider, CommonScriptProviderOptions } from 'europa-build/script/provider/CommonScriptProvider';

/**
 * A {@link ScriptProvider} that runs a test suite against the package's source code.
 *
 * Currently, no tests are executed by this script.
 */
export class TestScriptProvider extends CommonScriptProvider {
  /**
   * Creates an instance of {@link TestScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: CommonScriptProviderOptions) {
    super(options);
  }

  protected override getLoggerName(): string {
    return 'TestScriptProvider';
  }

  override getName(): string {
    return 'test';
  }

  override async runScript(directoryPath: string): Promise<void> {
    this.getLogger().info('No tests');
  }
}
