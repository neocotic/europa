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

import { Europa, EuropaOptions } from 'europa-core';

import fixtures from 'europa-test/test-fixtures';

/**
 * Creates a full test suite for a `europa-core` implementation package using the `options` provided.
 *
 * @param options - The options to be used.
 */
export default function (options: TestOptions) {
  const { loadFixture, packageName } = options;

  describe(`europa-test: ${packageName}`, () => {
    fixtures.forEach((fixture) => {
      describe(`Converting fixture '${fixture.name}'`, () => {
        let html: string;
        let markdown: string;
        let europa: Europa;

        beforeAll(async () => {
          html = await loadFixture(`fixtures/${fixture.name}.html`);
          markdown = await loadFixture(`fixtures/${fixture.name}.md`);
          europa = new options.Europa(fixture.options);
        });

        afterAll(() => {
          europa.release();
        });

        it('should correctly convert HTML into Markdown', () => {
          expect(html).toBeDefined();
          expect(markdown).toBeDefined();

          expect(europa.convert(html)).toBe(markdown!);
        });
      });
    });
  });
}

/**
 * The options used by `europa-test`.
 */
export type TestOptions = {
  /**
   * The {@link Europa} constructor to be tested.
   */
  readonly Europa: { new (options?: EuropaOptions): Europa };
  /**
   * The function to be used to load the contents of a `europa-test` fixture file at the path provided.
   */
  readonly loadFixture: (path: string) => Promise<string>;
  /**
   * The name of the `europa-core` implementation package being tested.
   */
  readonly packageName: string;
};
