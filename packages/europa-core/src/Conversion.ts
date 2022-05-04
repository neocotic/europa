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

import { Europa } from 'europa-core/Europa';

const _document = Symbol('document');
const _element = Symbol('element');
const _tagName = Symbol('tagName');
const _window = Symbol('window');

/**
 * Contains contextual information for a single conversion process.
 */
export class Conversion {
  /**
   * A map of special characters and their replacements.
   */
  static readonly replacements: Readonly<Record<string, string>> = {
    '\\\\': '\\\\',
    '\\[': '\\[',
    '\\]': '\\]',
    '>': '\\>',
    _: '\\_',
    '\\*': '\\*',
    '`': '\\`',
    '#': '\\#',
    '([0-9])\\.(\\s|$)': '$1\\.$2',
    '\u00a9': '(c)',
    '\u00ae': '(r)',
    '\u2122': '(tm)',
    '\u00a0': ' ',
    '\u00b7': '\\*',
    '\u2002': ' ',
    '\u2003': ' ',
    '\u2009': ' ',
    '\u2018': "'",
    '\u2019': "'",
    '\u201c': '"',
    '\u201d': '"',
    '\u2026': '...',
    '\u2013': '--',
    '\u2014': '---',
  };

  /**
   * A map of special characters and the regular expression used to identify them.
   */
  static readonly replacementsRegExp: Readonly<Record<string, RegExp>> = Object.keys(Conversion.replacements).reduce(
    (acc, key) => {
      acc[key] = new RegExp(key, 'g');
      return acc;
    },
    {} as Record<string, RegExp>,
  );

  /**
   * The {@link Europa} instance responsible for this {@link Conversion}.
   */
  readonly europa: Europa;

  /**
   * The options for this {@link Conversion}.
   */
  readonly options: Record<string, any>;

  /**
   * Whether the buffer is at the start of the current line.
   */
  atLeft = true;

  /**
   * Whether any white space should be removed from the start of the next output.
   */
  atNoWhiteSpace = true;

  /**
   * Whether the buffer is at the start of a paragraph.
   */
  atParagraph = true;

  /**
   * The conversion output buffer to which the Markdown will be written.
   */
  buffer = '';

  /**
   * The context for this {@link Conversion}.
   */
  readonly context: Record<string, any> = {};

  /**
   * Whether the buffer is currently within a code block.
   */
  inCodeBlock = false;

  /**
   * Whether the buffer is currently within an ordered list.
   */
  inOrderedList = false;

  /**
   * Whether the buffer is currently within a preformatted block.
   */
  inPreformattedBlock = false;

  /**
   * The last string to be output next to the buffer.
   */
  last: string | null = null;

  /**
   * The start of the current line.
   */
  left = '\n';

  /**
   * The depth of nested lists.
   */
  listDepth = 0;

  /**
   * The one-based index for the current list item within the current list.
   */
  listIndex = 1;

  private [_document]: Document;
  private [_element]: HTMLElement;
  private [_tagName]: string | null;
  private [_window]: Window;

  /**
   * Creates a new instance of {@link Conversion}.
   *
   * @param europa - The {@link Europa} instance responsible for this conversion.
   * @param root - The root element.
   * @param options - The options to be used.
   */
  constructor(europa: Europa, root: HTMLElement, options: Record<string, any>) {
    this.europa = europa;
    this.options = options;
    this[_document] = europa.document;
    this[_element] = root;
    this[_tagName] = root.tagName?.toLowerCase() ?? null;
    this[_window] = europa.window;
  }

  /**
   * Appends the last output string to the buffer and then queues the specified `str` to be output.
   *
   * @param str - The string to be appended.
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  append(str: string): this {
    if (this.last != null) {
      this.buffer += this.last;
    }

    this.last = str;

    return this;
  }

  /**
   * Appends a paragraph to the output buffer.
   *
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  appendParagraph(): this {
    if (this.atParagraph) {
      return this;
    }

    if (!this.atLeft) {
      this.append(this.left);

      this.atLeft = true;
    }

    this.append(this.left);

    this.atNoWhiteSpace = true;
    this.atParagraph = true;

    return this;
  }

  /**
   * Outputs the specified `str` to the buffer.
   *
   * Optionally, `str` can be "cleaned" before being output. Doing so will replace any certain special characters as
   * well as some white space.
   *
   * @param str - The string to be output.
   * @param [clean=false] - `true` to clean `str`; otherwise `false`.
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  output(str: string, clean = false): this {
    if (!str) {
      return this;
    }

    str = str.replace(/\r\n/g, '\n');

    if (clean) {
      str = str
        .replace(/\n([ \t]*\n)+/g, '\n')
        .replace(/\n[ \t]+/g, '\n')
        .replace(/[ \t]+/g, ' ');

      Object.entries(Conversion.replacements).forEach(([key, value]) => {
        str = str.replace(Conversion.replacementsRegExp[key], value);
      });
    }

    if (!this.inPreformattedBlock) {
      if (this.atNoWhiteSpace) {
        str = str.replace(/^[ \t\n]+/, '');
      } else if (/^[ \t]*\n/.test(str)) {
        str = str.replace(/^[ \t\n]+/, '\n');
      } else {
        str = str.replace(/^[ \t]+/, ' ');
      }
    }

    if (!str) {
      return this;
    }

    this.atLeft = /\n$/.test(str);
    this.atNoWhiteSpace = /[ \t\n]$/.test(str);
    this.atParagraph = /\n{2}$/.test(str);

    return this.append(str.replace(/\n/g, this.left));
  }

  /**
   * Replaces the start of the current line with the `str` provided.
   *
   * @param str - the string to replace the start of the current line
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  replaceLeft(str: string): this {
    if (!this.atLeft) {
      this.append(this.left.replace(/ {2,4}$/, str));

      this.atLeft = true;
      this.atNoWhiteSpace = true;
      this.atParagraph = true;
    } else if (this.last) {
      this.last = this.last.replace(/ {2,4}$/, str);
    }

    return this;
  }

  /**
   * The current document for this {@link Conversion}.
   *
   * This may not be the same document as is associated with the {@link Europa} instance as this document may be
   * nested (e.g. a frame).
   */
  get document(): Document {
    return this[_document];
  }

  /**
   * The current element for this {@link Conversion}.
   */
  get element(): HTMLElement {
    return this[_element];
  }

  /**
   * Sets the current element for this {@link Conversion} to `element`.
   *
   * @param element - The element to be set.
   */
  set element(element: HTMLElement) {
    this[_element] = element;
    this[_tagName] = element.tagName?.toLowerCase() ?? null;
  }

  /**
   * The name of the tag for the current element for this {@link Conversion}.
   *
   * The tag name will always be in lower case, when available.
   */
  get tagName(): string | null {
    return this[_tagName];
  }

  /**
   * Returns the current window for this {@link Conversion}.
   *
   * This may not be the same window as is associated with the {@link Europa} instance as this window may be nested
   * (e.g. a frame).
   */
  get window(): Window {
    return this[_window];
  }

  /**
   * Sets the current window for this {@link Conversion} to `window`.
   *
   * This may not be the same window as is associated with the {@link Europa} instance as this window may be nested
   * (e.g. a frame).
   *
   * @param window - The window to be set.
   */
  set window(window: Window) {
    this[_window] = window;
    this[_document] = window.document;
  }
}
