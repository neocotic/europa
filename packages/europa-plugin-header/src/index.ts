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

import { Plugin, PluginConverter } from 'europa-core';

export default function (): Plugin {
  const headingConverter: PluginConverter = {
    startTag(conversion): boolean {
      const level = parseInt(conversion.element.tagName().match(/([1-6])$/)![1], 10);

      let headerPrefix = '';
      for (let i = 0; i < level; i++) {
        headerPrefix += '#';
      }

      conversion.appendParagraph().output(`${headerPrefix} `);

      return true;
    },

    endTag(conversion) {
      conversion.appendParagraph();
    },
  };

  return {
    converters: {
      H1: headingConverter,
      H2: headingConverter,
      H3: headingConverter,
      H4: headingConverter,
      H5: headingConverter,
      H6: headingConverter,
    },
  };
}
