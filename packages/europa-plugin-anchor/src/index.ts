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
  const pluginName = 'europa-plugin-anchor';

  return {
    name: pluginName,

    converters: {
      A: {
        startTag(conversion, context): boolean {
          const { absolute, inline } = conversion.options;
          const element = conversion.element as HTMLAnchorElement;
          const href = absolute ? element.href : element.getAttribute('href');
          if (!href) {
            return true;
          }

          const { anchorMap, anchors } = conversion.context[pluginName] as AnchorPluginContext;
          const title = element.getAttribute('title');
          const value = title ? `${href} "${title}"` : href;
          let index;

          if (inline) {
            context.value = `(${value})`;
          } else {
            index = anchorMap[value];
            if (index == null) {
              index = anchors.push(value) - 1;

              anchorMap[value] = index;
            }

            context.value = `[anchor${index}]`;
          }

          conversion.output('[');

          conversion.atNoWhiteSpace = true;

          return true;
        },

        endTag(conversion, context) {
          if (context.value != null) {
            conversion.output(`]${context.value}`);
          }
        },
      },
    },

    startConversion(conversion) {
      conversion.context[pluginName] = {
        anchorMap: {},
        anchors: [],
      };
    },

    endConversion(conversion) {
      const { anchors } = conversion.context[pluginName] as AnchorPluginContext;
      if (!anchors.length) {
        return;
      }

      conversion.append(`${conversion.eol}${conversion.eol}`);

      for (let i = 0; i < anchors.length; i++) {
        conversion.append(`[anchor${i}]: ${anchors[i]}${conversion.eol}`);
      }
    },
  };
}

type AnchorPluginContext = {
  readonly anchorMap: Record<string, number>;
  readonly anchors: string[];
};
