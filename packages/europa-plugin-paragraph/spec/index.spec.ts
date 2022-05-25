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

import { Environment, EuropaCore, EuropaOptions } from 'europa-core';
import { NodeEnvironment } from 'europa-environment-node';

import plugin from '../src/index';

describe('europa-plugin-paragraph', () => {
  let environment: Environment<any, any>;
  let europa: EuropaCore<any, any>;

  class TestEuropa extends EuropaCore<any, any> {
    constructor(options?: EuropaOptions) {
      super({ environment, options });
    }
  }

  beforeAll(() => {
    TestEuropa.registerPlugin(plugin);
  });

  beforeEach(() => {
    environment = new NodeEnvironment();
    europa = new TestEuropa();
  });

  it('should convert HTML to Markdown using plugin', () => {
    const tags = ['address', 'article', 'aside', 'div', 'fieldset', 'footer', 'header', 'main', 'nav', 'p', 'section'];

    tags.forEach((tag) => {
      expect(europa.convert('<p></p>')).toBe('');
      expect(europa.convert(`Before<${tag}>Inside</${tag}>After`)).toBe(
        `
Before

Inside

After
`.trim(),
      );
      expect(europa.convert('Before<p></p>After')).toBe(
        `
Before

After
`.trim(),
      );
    });
  });
});
