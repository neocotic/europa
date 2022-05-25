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
  const _value = Symbol();

  return {
    converters: {
      A: {
        startTag(conversion, context): boolean {
          const absolute = conversion.getOption('absolute');
          const inline = conversion.getOption('inline');
          const { element } = conversion;
          const href = element.attr('href');
          if (!href) {
            return true;
          }

          const title = element.attr('title');
          const url = absolute ? conversion.resolveUrl(href) : href;
          let value = title ? `${url} "${title}"` : url;

          if (inline) {
            value = `(${value})`;
          } else {
            const reference = conversion.addReference('link', value);

            value = `[${reference}]`;
          }

          context.set(_value, value);

          conversion.output('[');

          conversion.atNoWhitespace = true;

          return true;
        },

        endTag(conversion, context) {
          if (context.has(_value)) {
            conversion.output(`]${context.get<string>(_value)}`);
          }
        },
      },
    },
  };
}
