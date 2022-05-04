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
 * A {@link Plugin} which outputs a details section.
 *
 * If the details has an `open` attribute then all of its children are converted. Otherwise, only the nested `summary`,
 * if any, will be converted.
 */
export class DetailsPlugin extends Plugin {
  override convert(conversion: Conversion): boolean {
    const element = conversion.element;

    conversion.appendParagraph();

    if (element.hasAttribute('open')) {
      return true;
    }

    const summary = element.querySelector('summary');
    conversion.europa.convertElement(summary, conversion);

    return false;
  }

  override getTagNames(): string[] {
    return ['details'];
  }
}
