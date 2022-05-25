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
  const _inOrderedList = Symbol();
  const _previousInOrderedList = Symbol();
  const _previousListIndex = Symbol();

  function createListConverter(ordered: boolean): PluginConverter {
    return {
      startTag(conversion, context): boolean {
        context.set(_previousInOrderedList, conversion.context.get(_inOrderedList));
        context.set(_previousListIndex, conversion.listIndex);

        if (conversion.listDepth === 0) {
          conversion.appendParagraph();
        }

        conversion.context.set(_inOrderedList, ordered);
        conversion.listIndex = 1;
        conversion.listDepth++;

        return true;
      },

      endTag(conversion, context) {
        conversion.context.set(_inOrderedList, context.get(_previousInOrderedList));
        conversion.listIndex = context.get(_previousListIndex);
        conversion.listDepth--;
      },
    };
  }

  function leftPad(str = '', times = 0, padding = ' '): string {
    if (!padding) {
      return str;
    }

    for (let i = 0; i < times; i++) {
      str = padding + str;
    }

    return str;
  }

  return {
    converters: {
      LI: {
        startTag(conversion): boolean {
          const value = conversion.context.get<boolean>(_inOrderedList) ? `${conversion.listIndex++}. ` : '* ';

          if (!conversion.atLeft) {
            conversion.append(conversion.left.replace(/ {2,4}$/, conversion.eol));

            conversion.atLeft = true;
            conversion.atNoWhitespace = true;
            conversion.atParagraph = true;
          } else if (conversion.last) {
            conversion.last = conversion.last.replace(/ {2,4}$/, conversion.eol);
          }

          conversion.append(leftPad(value, (conversion.listDepth - 1) * 2));

          return true;
        },
      },
      OL: createListConverter(true),
      UL: createListConverter(false),
    },

    startConversion(conversion) {
      conversion.context.set(_inOrderedList, false);
    },

    escapeText(value): string {
      return value.replace(/^\s*([+-])(\s+|$)/, '\\$1$2').replace(/^\s*(\d+)\.(\s+|$)/, '$1\\.$2');
    },
  };
}
