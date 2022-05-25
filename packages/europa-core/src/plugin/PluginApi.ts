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

import { PluginConverter } from 'europa-core/plugin/Plugin';

/**
 * Contains API methods that passed to plugin providers upon initialization.
 */
export class PluginApi {
  /**
   * Creates a plugin converter that can be used for converting HTML elements to Markdown block quotes.
   *
   * @return A block quote {@link PluginConverter}.
   */
  createBlockQuoteConverter(): PluginConverter {
    const _previousLeft = Symbol();

    return {
      startTag(conversion, context): boolean {
        const value = '> ';

        conversion.appendParagraph();

        context.set(_previousLeft, conversion.left);
        conversion.left += value;

        if (conversion.atParagraph) {
          conversion.append(value);
        } else {
          conversion.appendParagraph();
        }

        return true;
      },

      endTag(conversion, context) {
        conversion.atLeft = false;
        conversion.atParagraph = false;
        conversion.left = context.get(_previousLeft);

        conversion.appendParagraph();
      },
    };
  }

  /**
   * Creates a plugin converter that can be used for converting HTML elements to Markdown bold text.
   *
   * @return A bold {@link PluginConverter}.
   */
  createBoldConverter(): PluginConverter {
    return {
      startTag(conversion): boolean {
        conversion.output('**');

        conversion.atNoWhitespace = true;

        return true;
      },

      endTag(conversion) {
        conversion.output('**');
      },
    };
  }

  /**
   * Creates a plugin converter that can be used for converting HTML elements to Markdown italic text.
   *
   * @return An italic {@link PluginConverter}.
   */
  createItalicConverter(): PluginConverter {
    return {
      startTag(conversion): boolean {
        conversion.output('_');

        conversion.atNoWhitespace = true;

        return true;
      },

      endTag(conversion) {
        conversion.output('_');
      },
    };
  }
}
