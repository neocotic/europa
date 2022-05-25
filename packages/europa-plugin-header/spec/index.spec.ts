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

describe('europa-plugin-header', () => {
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
    const tags: HeaderTag[] = [
      { hashCount: 1, name: 'h1' },
      { hashCount: 2, name: 'h2' },
      { hashCount: 3, name: 'h3' },
      { hashCount: 4, name: 'h4' },
      { hashCount: 5, name: 'h5' },
      { hashCount: 6, name: 'h6' },
    ];

    tags.forEach((tag) => {
      const hashes = '#'.repeat(tag.hashCount);

      expect(europa.convert(`<${tag.name}></${tag.name}>`)).toBe(hashes);
      expect(europa.convert(`<${tag.name}>Heading</${tag.name}>`)).toBe(`${hashes} Heading`);
      expect(
        europa.convert(`
<${tag.name}>Heading</${tag.name}>
<span>Text</span>
`),
      ).toBe(
        `
${hashes} Heading

Text
`.trim(),
      );
    });
  });
});

type HeaderTag = {
  readonly hashCount: number;
  readonly name: string;
};
