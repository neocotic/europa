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
  const pluginName = 'europa-plugin-image';

  return {
    name: pluginName,

    converters: {
      IMG: {
        startTag(conversion) {
          const element = conversion.element as HTMLImageElement;
          const options = conversion.options;
          const source = options.absolute ? element.src : element.getAttribute('src');
          if (!source) {
            return false;
          }

          const alternativeText = element.getAttribute('alt') || '';
          const { imageMap, images } = conversion.context[pluginName] as ImagePluginContext;
          const title = element.getAttribute('title');
          let value = title ? `${source} "${title}"` : source;
          let index;

          if (options.inline) {
            value = `(${value})`;
          } else {
            index = imageMap[value];
            if (index == null) {
              index = images.push(value);

              imageMap[value] = index;
            }

            value = `[image${index}]`;
          }

          conversion.output(`![${alternativeText}]${value}`);

          return false;
        },
      },
    },

    startConversion(conversion) {
      conversion.context[pluginName] = {
        imageMap: {},
        images: [],
      };
    },

    endConversion(conversion) {
      const { images } = conversion.context[pluginName] as ImagePluginContext;
      if (!images.length) {
        return;
      }

      conversion.append(`${conversion.eol}${conversion.eol}`);

      for (let i = 0; i < images.length; i++) {
        conversion.append(`[image${i + 1}]: ${images[i]}${conversion.eol}`);
      }
    },
  };
}

type ImagePluginContext = {
  readonly imageMap: Record<string, number>;
  readonly images: string[];
};
