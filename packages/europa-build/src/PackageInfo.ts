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

import { dirname } from 'path';
import * as readPkgUp from 'read-pkg-up';

const _singleton = Symbol();

/**
 * Contains information relating to this npm package, including its installation location.
 */
export class PackageInfo {
  private static [_singleton]: PackageInfo | undefined;

  /**
   * Creates an instance of {@link PackageInfo}.
   *
   * @param directoryPath - The path of the package's installation directory.
   * @param filePath - The path of the package's `package.json` file.
   * @param json - The JSON contents of the package's `package.json` file.
   */
  private constructor(
    readonly directoryPath: string,
    readonly filePath: string,
    readonly json: readPkgUp.NormalizedPackageJson,
  ) {}

  /**
   * Returns a singleton instance of {@link PackageInfo}.
   *
   * @return A singleton {@link PackageInfo}.
   */
  static async getSingleton(): Promise<PackageInfo> {
    const cachedPackageInfo = PackageInfo[_singleton];
    if (cachedPackageInfo) {
      return cachedPackageInfo;
    }

    const result = await readPkgUp({ cwd: __dirname });
    if (!result) {
      throw new Error('Failed to read "europa-build" package.json file');
    }

    const packageInfo = new PackageInfo(dirname(result.path), result.path, result.packageJson);

    PackageInfo[_singleton] = packageInfo;

    return packageInfo;
  }
}
