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
 * A {@link Plugin} which outputs an ordered list.
 */
export class OrderedListPlugin extends Plugin {
  override after(conversion: Conversion, context: Record<string, any>) {
    conversion.inOrderedList = context.previousInOrderedList;
    conversion.listIndex = context.previousListIndex;
    conversion.listDepth--;
  }

  override before(conversion: Conversion, context: Record<string, any>) {
    context.previousInOrderedList = conversion.inOrderedList;
    context.previousListIndex = conversion.listIndex;
  }

  override convert(conversion: Conversion, context: Record<string, any>): boolean {
    if (conversion.listDepth === 0) {
      conversion.appendParagraph();
    }

    conversion.inOrderedList = true;
    conversion.listIndex = 1;
    conversion.listDepth++;

    return true;
  }

  override getTagNames(): string[] {
    return ['ol'];
  }
}