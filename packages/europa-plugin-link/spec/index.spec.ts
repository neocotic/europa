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

describe('europa-plugin-link', () => {
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

  describe('when "absolute" option is enabled', () => {
    beforeEach(() => {
      europa = new TestEuropa({ absolute: true, baseUri: 'https://github.com/neocotic/europa/' });
    });

    it('should resolve anchor href URLs', () => {
      expect(europa.convert('<a href="index.html" title="Title">Text</a>')).toBe(
        `
[Text][link1]

[link1]: https://github.com/neocotic/europa/index.html "Title"
    `.trim(),
      );
    });
  });

  describe('when "inline" option is enabled', () => {
    beforeEach(() => {
      europa = new TestEuropa({ inline: true });
    });

    it('should inline link URLs and titles', () => {
      expect(europa.convert('<a title="Title"></a>')).toBe('');
      expect(europa.convert('<a href="index.html">Text</a>')).toBe('[Text](index.html)');
      expect(europa.convert('<a href="index.html" title="Title">Text</a>')).toBe('[Text](index.html "Title")');
    });
  });

  it('should convert HTML to Markdown using plugin', () => {
    expect(europa.convert('<a title="Title"></a>')).toBe('');
    expect(europa.convert('<a href="index.html">Text</a>')).toBe(
      `
[Text][link1]

[link1]: index.html
    `.trim(),
    );
    expect(europa.convert('<a href="index.html" title="Title">Text</a>')).toBe(
      `
[Text][link1]

[link1]: index.html "Title"
    `.trim(),
    );
  });
});
