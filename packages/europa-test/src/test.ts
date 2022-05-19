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

import { EuropaCore, EuropaOptions } from 'europa-core';

import { BundledTestFixture, FileTestFixture, TestFixture } from 'europa-test/TestFixture';
import { bundledFixtures } from 'europa-test/bundled-fixtures';

/**
 * Creates a full test suite for a `europa-core` implementation package using the `options` provided.
 *
 * @param options - The options to be used.
 */
export function test<T extends EuropaCore<N, E>, N, E extends N>(options: TestOptions<T, N, E>) {
  const { createEuropa, extraFixtures, loadFixtureFile, packageName } = options;
  const fixtures = getFixtures<N>(extraFixtures);

  describe(`europa-test: ${packageName}`, () => {
    fixtures.forEach((fixture) => {
      describe(fixture.description, () => {
        let input: N | N[] | string;
        let europa: T;
        let expected: string;

        beforeAll(async () => {
          europa = createEuropa(fixture.options);

          if (isFileFixture(fixture)) {
            const bundled = isBundledFixture(fixture);

            input = await loadFixtureFile(`${fixture.baseFilePath}.html`, bundled);
            expected = await loadFixtureFile(`${fixture.baseFilePath}.md`, bundled);
          } else {
            input = fixture.input;
            expected = fixture.expected;
          }
        });

        it(`should correctly convert ${getInputType(fixture)} into Markdown`, () => {
          expect(input).toBeDefined();
          expect(expected).toBeDefined();

          expect(europa.convert(input)).toBe(expected);
        });
      });
    });
  });
}

function getFixtures<N>(extras?: TestFixture<N>[]): Fixture<N>[] {
  const fixtures: TestFixture<N>[] = [...bundledFixtures];
  if (extras) {
    fixtures.push(...extras);
  }

  return fixtures;
}

function getInputType(fixture: Fixture<any>): string {
  return isFileFixture(fixture) || typeof fixture.input === 'string' ? 'HTML' : 'DOM';
}

function isBundledFixture(fixture: Fixture<any>): fixture is BundledTestFixture {
  return 'bundled' in fixture && fixture.bundled;
}

function isFileFixture(fixture: Fixture<any>): fixture is FileTestFixture {
  return 'baseFilePath' in fixture;
}

/**
 * The options used by `europa-test`.
 */
export type TestOptions<T extends EuropaCore<N, E>, N, E extends N> = {
  /**
   * The function to be used to create an instance of the {@link EuropaCore} implementation to be tested using the
   * `options` provided.
   *
   * @param [options] - The options to be used.
   * @return An instance of the {@link EuropaCore} implementation.
   */
  readonly createEuropa: (options?: EuropaOptions) => T;
  /**
   * Any additional test fixtures that are only of interest to a specific implementation of {@link EuropaCore}.
   *
   * Typically, it is recommended that test fixtures are implementation agnostic, and it's preferred to contribute to
   * the bundled test fixtures over building an implementation-specific test suite.
   */
  readonly extraFixtures?: TestFixture<N>[];
  /**
   * The function to be used to load the contents of a test fixture file.
   *
   * If `bundled` is `true`; `path` will target a file bundled within `europa-test` itself and should be conform to the
   * pattern: `node_modules/europa-test/fixtures/*.(html|md)`. Otherwise, `path` will be whatever was provided as the
   * fixtures `baseFilePath` with either `.html` or `.md` appended to it.
   *
   * @param path - The path of the fixture file whose contents are to be loaded.
   * @param bundled - `true` if the fixture file is bundled within `europa-test`; otherwise `false`.
   * @return The contents of the test fixture file.
   * @throws If unable to read the test fixture file.
   */
  readonly loadFixtureFile: (path: string, bundled: boolean) => Promise<string>;
  /**
   * The name of the `europa-core` implementation package being tested.
   */
  readonly packageName: string;
};

type Fixture<N> = BundledTestFixture | TestFixture<N>;
