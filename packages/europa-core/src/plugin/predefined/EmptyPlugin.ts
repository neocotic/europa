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
 * A {@link Plugin} which simply ensures that no children elements are converted.
 */
export class EmptyPlugin extends Plugin {
  override convert(conversion: Conversion, context: Record<string, any>): boolean {
    return false;
  }

  override getTagNames(): string[] {
    return [
      'applet',
      'area',
      'audio',
      'button',
      'canvas',
      'datalist',
      'embed',
      'head',
      'input',
      'map',
      'menu',
      'meter',
      'noframes',
      'noscript',
      'object',
      'optgroup',
      'option',
      'param',
      'progress',
      'rp',
      'rt',
      'ruby',
      'script',
      'select',
      'style',
      'textarea',
      'title',
      'video',
    ];
  }
}
