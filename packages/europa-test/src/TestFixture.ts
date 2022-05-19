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

import { EuropaOptions } from 'europa-core';

/**
 * The base test fixture containing only the minimum information required to set up the test.
 */
export type BaseTestFixture = {
  /**
   * The description of the test fixture.
   */
  readonly description: string;
  /**
   * Any options to be passed to the {@link EuropaCore} implementation constructor.
   */
  readonly options?: EuropaOptions;
};

/**
 * A test fixture that is bundled within `europa-test` itself.
 *
 * Such fixtures are tested against all {@link EuropaCore} implementations.
 */
export type BundledTestFixture = TestFixture<any> & {
  /**
   * Whether the test fixture is bundled within `europa-test`.
   */
  readonly bundled: true;
};

/**
 * A test fixture that is tested using the contents of a pair of files; An HTML file used as the test input and a
 * Markdown file used as expected test output.
 */
export type FileTestFixture = BaseTestFixture & {
  /**
   * The base file path of the test fixture.
   *
   * This will be appended with `.html` and `.md` and the corresponding files will be loaded during test execution. The
   * content of the `.html` file is used as the test input and the contents of the `.md` file is used as the expected
   * test output compared against the actual test output.
   */
  readonly baseFilePath: string;
};

/**
 * A test fixture where the test input and expected output is declared up-front.
 */
export type InlineTestFixture<N> = BaseTestFixture & {
  /**
   * The expected Markdown output for the test.
   */
  readonly expected: string;
  /**
   * The HTML/DOM input for the test.
   */
  readonly input: N | N[] | string;
};

/**
 * An individual test fixture.
 */
export type TestFixture<N> = FileTestFixture | InlineTestFixture<N>;
