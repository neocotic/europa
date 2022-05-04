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
 * A {@link Plugin} which outputs the contents in a code block.
 */
export class CodePlugin extends Plugin {
  override after(conversion: Conversion, context: Record<string, any>) {
    if (!context.skipped) {
      conversion.inCodeBlock = context.previousInCodeBlock;

      conversion.output('`');
    }
  }

  override before(conversion: Conversion, context: Record<string, any>) {
    context.previousInCodeBlock = conversion.inCodeBlock;
  }

  override convert(conversion: Conversion, context: Record<string, any>): boolean {
    if (conversion.inPreformattedBlock) {
      context.skipped = true;
    } else {
      conversion.output('`');

      conversion.inCodeBlock = true;
    }

    return true;
  }

  override getTagNames(): string[] {
    return ['code', 'kbd', 'samp'];
  }
}
