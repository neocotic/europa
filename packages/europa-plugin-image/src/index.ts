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

import { Plugin } from 'europa-core';

export default function (): Plugin {
  return {
    converters: {
      IMG: {
        startTag(conversion): boolean {
          const absolute = conversion.getOption('absolute');
          const inline = conversion.getOption('inline');
          const { element } = conversion;
          const source = element.attr('src');
          if (!source) {
            return false;
          }

          const alternativeText = element.attr('alt') || '';
          const title = element.attr('title');
          const url = absolute ? conversion.resolveUrl(source) : source;
          let value = title ? `${url} "${title}"` : url;

          if (inline) {
            value = `(${value})`;
          } else {
            const reference = conversion.addReference('image', value);

            value = `[${reference}]`;
          }

          conversion.output(`![${alternativeText}]${value}`);

          return false;
        },
      },
    },
  };
}
