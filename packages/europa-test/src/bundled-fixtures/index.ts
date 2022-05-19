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

import { BundledTestFixture, FileTestFixture, TestFixture } from 'europa-test/TestFixture';

/**
 * The test fixtures bundled within `europa-test`.
 */
export const bundledFixtures: BundledTestFixture[] = convertToBundledTestFixture([
  {
    description: 'Converting simple HTML',
    input: 'I love <b>Europa</b>!',
    expected: 'I love **Europa**!',
  },
  {
    description: 'Converting general HTML',
    baseFilePath: 'content',
  },
  {
    description: 'Converting HTML lists',
    baseFilePath: 'lists',
  },
  {
    description: 'Converting HTML scaffolding',
    baseFilePath: 'scaffolding',
  },
  {
    description: 'Converting HTML tables',
    baseFilePath: 'tables',
  },
  {
    description: 'Converting unformatted HTML lists',
    baseFilePath: 'unformatted-lists',
  },
  {
    description: 'Converting HTML with mixed visibility',
    baseFilePath: 'visibility',
  },
]);

function convertToBundledTestFixture(fixtures: TestFixture<any>[]): BundledTestFixture[] {
  return fixtures.map((fixture) => {
    if (isFileFixture(fixture)) {
      return {
        ...fixture,
        baseFilePath: `node_modules/europa-test/fixtures/${fixture.baseFilePath}`,
        bundled: true,
      };
    }

    return {
      ...fixture,
      bundled: true,
    };
  });
}

function isFileFixture(fixture: TestFixture<any>): fixture is FileTestFixture {
  return 'baseFilePath' in fixture;
}
