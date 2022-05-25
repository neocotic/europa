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
 * A {@link ScriptProvider} implementation that compiles a package's source code using TypeScript with a common
 * configuration.
 */
export class BuildScriptProvider extends CommandScriptProvider {
  /**
   * Creates an instance of {@link BuildScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: CommandScriptProviderOptions) {
    super(options);
  }

  protected override getLoggerName(): string {
    return 'BuildScriptProvider';
  }

  override getName(): string {
    return 'build';
  }

  override async runScript(directoryPath: string): Promise<void> {
    await this.deleteDirectory(directoryPath, 'lib');

    await this.compileTypeScript(directoryPath, 'commonjs', 'lib/cjs');
    await this.compileTypeScript(directoryPath, 'es2020', 'lib/esm');
  }

  private async compileTypeScript(directoryPath: string, module: string, outDir: string): Promise<void> {
    await this.execBundledCommand(directoryPath, 'tsc', [
      '--baseUrl',
      '.',
      '--declaration',
      '--lib',
      'ES2017',
      '--module',
      module,
      '--moduleResolution',
      'node',
      '--outDir',
      outDir,
      '--sourceMap',
      '--strict',
      '--target',
      'ES2017',
      'src/index.ts',
    ]);
  }
}
