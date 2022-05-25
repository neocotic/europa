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

describe('europa-plugin-image', () => {
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

    it('should resolve image source URLs', () => {
      expect(europa.convert('<img src="image.png" alt="Text" title="Title">')).toBe(
        `
![Text][image1]

[image1]: https://github.com/neocotic/europa/image.png "Title"
    `.trim(),
      );
    });
  });

  describe('when "inline" option is enabled', () => {
    beforeEach(() => {
      europa = new TestEuropa({ inline: true });
    });

    it('should inline image URLs and titles', () => {
      expect(europa.convert('<img alt="Text" title="Title">')).toBe('');
      expect(europa.convert('<img src="image.png">')).toBe('![](image.png)');
      expect(europa.convert('<img src="image.png" alt="Text" title="Title">')).toBe('![Text](image.png "Title")');
    });
  });

  it('should convert HTML to Markdown using plugin', () => {
    expect(europa.convert('<img alt="Text" title="Title">')).toBe('');
    expect(europa.convert('<img src="image.png">')).toBe(
      `
![][image1]

[image1]: image.png
    `.trim(),
    );
    expect(europa.convert('<img src="image.png" alt="Text" title="Title">')).toBe(
      `
![Text][image1]

[image1]: image.png "Title"
    `.trim(),
    );
  });
});
