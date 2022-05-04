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

import { Conversion } from 'europa-core/Conversion';
import { Plugin } from 'europa-core/plugin/Plugin';

/**
 * A {@link Plugin} which extracts the URL from an anchor. Anchors without an `href` are treated as plain text.
 *
 * If the `absolute` option is enabled, then the URL extracted from the anchor will be absolute. Otherwise, the URL will
 * be exactly as it is in the `href` attribute.
 *
 * If the `inline` option is enabled, then the URL (and any `title` on the anchor) will be inserted immediately after
 * the anchor contents (e.g. `[foo](/bar)`). Otherwise, all unique URL and title combinations will be indexed (e.g.
 * `[foo][anchor0]`) and the references will be output at the very end.
 */
export class AnchorPlugin extends Plugin {
  override after(conversion: Conversion, context: Record<string, any>) {
    if (context.value != null) {
      conversion.output(`]${context.value}`);
    }
  }

  override afterAll(conversion: Conversion) {
    const anchors: string[] = conversion.context.anchors;
    if (!anchors.length) {
      return;
    }

    conversion.append('\n\n');

    anchors.forEach((anchor, index) => {
      conversion.append(`[anchor${index}]: ${anchor}\n`);
    });
  }

  override beforeAll(conversion: Conversion) {
    conversion.context.anchorMap = {};
    conversion.context.anchors = [];
  }

  override convert(conversion: Conversion, context: Record<string, any>): boolean {
    const element = conversion.element as HTMLAnchorElement;
    const options = conversion.options;
    const href = options.absolute ? element.href : element.getAttribute('href');
    if (!href) {
      return true;
    }

    const anchorMap: Record<string, number> = conversion.context.anchorMap;
    const anchors: string[] = conversion.context.anchors;
    const title = element.getAttribute('title');
    const value = title ? `${href} "${title}"` : href;

    if (options.inline) {
      context.value = `(${value})`;
    } else {
      let index = anchorMap[value];
      if (index == null) {
        index = anchors.push(value) - 1;

        anchorMap[value] = index;
      }

      context.value = `[anchor${index}]`;
    }

    conversion.output('[');

    conversion.atNoWhiteSpace = true;

    return true;
  }

  override getTagNames(): string[] {
    return ['a'];
  }
}
