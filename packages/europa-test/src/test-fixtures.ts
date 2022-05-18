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

const fixtures: readonly TestFixture[] = [
  {
    name: 'content',
  },
  {
    name: 'lists',
  },
  {
    name: 'scaffolding',
  },
  {
    name: 'tables',
  },
  {
    name: 'unformatted-lists',
  },
  {
    name: 'visibility',
  },
];

export default fixtures;

/**
 * Describes an individual test fixture.
 */
export type TestFixture = {
  /**
   * The name of the test fixture.
   *
   * This will also correlate with a pair of files (one `.html` and another `.md`) within the `fixtures` directory of
   * the `europa-test` package.
   */
  readonly name: string;
  /**
   * Any options to be passed to the {@link Europa} constructor.
   */
  readonly options?: EuropaOptions;
};
