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

import { Europa, EuropaOptions } from 'europa-core/Europa';
import { ElementNode } from 'europa-core/dom/ElementNode';
import { PluginManager } from 'europa-core/plugin/PluginManager';

const _document = Symbol('document');
const _element = Symbol('element');
const _eol = Symbol('eol');
const _europa = Symbol('europa');
const _pluginManager = Symbol('pluginManager');
const _referenceCache = Symbol('referenceCache');
const _references = Symbol('references');
const _skipTagNames = Symbol('skipTagNames');
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
  readonly context: ConversionContext = {};

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
  left: string;

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
  private readonly [_eol]: string;
  private readonly [_europa]: Europa;
  private readonly [_pluginManager]: PluginManager;
  private readonly [_referenceCache]: ConversionReferenceCache = {
    all: {},
    last: {},
  };
  private readonly [_references]: ConversionReference[] = [];
  private readonly [_skipTagNames] = new Set([
    'APPLET',
    'AREA',
    'AUDIO',
    'BUTTON',
    'CANVAS',
    'DATALIST',
    'EMBED',
    'HEAD',
    'INPUT',
    'MAP',
    'MENU',
    'METER',
    'NOFRAMES',
    'NOSCRIPT',
    'OBJECT',
    'OPTGROUP',
    'OPTION',
    'PARAM',
    'PROGRESS',
    'RP',
    'RT',
    'RUBY',
    'SCRIPT',
    'SELECT',
    'STYLE',
    'TEXTAREA',
    'TITLE',
    'VIDEO',
  ]);
  private [_tagName]: string;
  private [_window]: Window;

  /**
   * Creates a new instance of {@link Conversion} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: ConversionOptions) {
    const { europa, pluginManager, root } = options;

    this[_document] = europa.document;
    this[_element] = root;
    this[_eol] = europa.eol;
    this[_europa] = europa;
    this[_pluginManager] = pluginManager;
    this[_tagName] = root.tagName.toUpperCase();
    this[_window] = europa.window;
    this.left = this[_eol];
  }

  /**
   * Adds a reference to this {@link Conversion} using the `key` and `value` provided.
   *
   * A numeric ID is associated with `value` and is included in the returned reference. If a reference already exists
   * for the given `key` and `value` then this ID will be the same as the existing reference in order to avoid
   * duplications. Otherwise, the ID will be the next number in the sequence for `key`.
   *
   * At the end of the conversion, the reference will be appended to the output string.
   *
   * @param key - The key (prefix) for the reference.
   * @param value - The value for the reference.
   * @return The reference.
   * @throws If the `inline` option is enabled.
   */
  addReference(key: string, value: string): string {
    if (this.getOption('inline')) {
      throw new Error('Cannot add reference when "inline" option is enabled');
    }

    const cache = this[_referenceCache];
    const cacheKey = `${key}:${value}`;
    let id = cache.all[cacheKey];

    if (id == null) {
      id = cache.last[key] ? cache.last[key] + 1 : 1;

      this[_references].push({ id, key, value });

      cache.all[cacheKey] = cache.last[key] = id;
    }

    return `${key}${id}`;
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
   * Converts the specified `element` and it's children into Markdown.
   *
   * Nothing happens if `element` is `null` or is invisible (simplified detection used).
   *
   * @param element - The element (along well as it's children) to be converted into Markdown.
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  convertElement(element: HTMLElement | null): this {
    if (!element) {
      return this;
    }

    const pluginManager = this[_pluginManager];

    if (element.nodeType === ElementNode.Element) {
      if (!this.isVisible(element)) {
        return this;
      }

      this.element = element;

      const tagName = this.tagName;
      if (this.skipTagNames.has(tagName)) {
        return this;
      }

      const context: ElementConversionContext = {};
      const convertChildren = pluginManager.hasConverter(tagName)
        ? pluginManager.invokeConverter(tagName, 'startTag', this, context)
        : true;

      if (convertChildren) {
        for (let i = 0; i < element.childNodes.length; i++) {
          this.convertElement(element.childNodes[i] as HTMLElement);
        }
      }

      pluginManager.invokeConverter(tagName, 'endTag', this, context);
    } else if (element.nodeType === ElementNode.Text) {
      const value = element.nodeValue || '';

      if (this.inPreformattedBlock) {
        this.output(value);
      } else if (this.inCodeBlock) {
        this.output(value.replace(/`/g, '\\`'));
      } else {
        this.output(value, true);
      }
    }

    return this;
  }

  /**
   * Ensures any recorded references are generated and that output buffer contains last output string before returning
   * the trimmed output buffer.
   *
   * @return The complete output buffer.
   */
  end(): string {
    if (this[_references].length) {
      const { eol } = this;

      this.append(eol.repeat(2));

      this[_references]
        .sort((a, b) => {
          if (a.key < b.key) return -1;
          if (a.key > b.key) return 1;
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        })
        .forEach((reference) => this.append(`[${reference.key}${reference.id}]: ${reference.value}${eol}`));
    }

    return this.append('').buffer.trim();
  }

  /**
   * Returns the value of the option for the {@link Europa} instance responsible for this {@link Conversion} with the
   * specified `name`.
   *
   * @param name - The name of the option whose value is to be returned.
   * @return The value of the named option.
   */
  getOption<N extends keyof EuropaOptions>(name: N): Required<EuropaOptions>[N] {
    return this[_europa].getOption(name);
  }

  /**
   * Checks whether the specified `element` is currently visible within the current window of this {@link Conversion}.
   *
   * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
   * cases.
   *
   * @param element - The element whose visibility is to be checked.
   * @return `true` if `element` is visible; otherwise `false`.
   */
  isVisible(element: Element): boolean {
    const style = this.window.getComputedStyle(element);

    return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
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

    const eol = this.eol;

    str = str.replace(/\r\n/g, eol);

    if (clean) {
      str = str
        .replace(/\n([ \t]*\n)+/g, eol)
        .replace(/\n[ \t]+/g, eol)
        .replace(/[ \t]+/g, ' ');

      Object.entries(Conversion.replacements).forEach(([key, value]) => {
        str = str.replace(Conversion.replacementsRegExp[key], value);
      });
    }

    if (!this.inPreformattedBlock) {
      if (this.atNoWhiteSpace) {
        str = str.replace(/^[ \t\n]+/, '');
      } else if (/^[ \t]*\n/.test(str)) {
        str = str.replace(/^[ \t\n]+/, eol);
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
    this[_tagName] = element.tagName.toUpperCase();
  }

  /**
   * The end of line character to be used by this {@link Conversion}.
   */
  get eol(): string {
    return this[_eol];
  }

  /**
   * The {@link Europa} instance responsible for this {@link Conversion}.
   */
  get europa(): Europa {
    return this[_europa];
  }

  /**
   * The options for the {@link Europa} instance responsible for this {@link Conversion}.
   */
  get options(): Required<EuropaOptions> {
    return this[_europa].options;
  }

  /**
   * The set of tag upper-case names for which conversion should be skipped for this {@link Conversion}.
   */
  get skipTagNames(): Set<string> {
    return this[_skipTagNames];
  }

  /**
   * The upper-case name of the tag for the current element for this {@link Conversion}.
   */
  get tagName(): string {
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

/**
 * The context for a {@link Conversion}.
 */
export type ConversionContext = Record<string, any>;

/**
 * The options used by {@link Conversion}.
 */
export type ConversionOptions = {
  /**
   * The {@link Europa} instance responsible for the {@link Conversion}.
   */
  readonly europa: Europa;
  /**
   * The {@link PluginManager} to be used to invoke plugin converters.
   */
  readonly pluginManager: PluginManager;
  /**
   * The root element.
   */
  readonly root: HTMLElement;
};

/**
 * A reference to be included at the end of the converted Markdown.
 */
export type ConversionReference = {
  /**
   * The numeric ID of this {@link ConversionReference}.
   *
   * This is unique across all references with the same key.
   */
  readonly id: number;
  /**
   * The key of this {@link ConversionReference}.
   */
  readonly key: string;
  /**
   * The value of this {@link ConversionReference}.
   *
   * This is unique across all references with the same key.
   */
  readonly value: string;
};

/**
 * Contains cached information for all references recorded for a {@link Conversion}.
 *
 * This is used to ensure uniqueness of {@link ConversionReference} numeric IDs and values, while also aiding in the
 * generation of the former.
 */
export type ConversionReferenceCache = {
  /**
   * A mapping of cache keys (containing both the key and value of a {@link ConversionReference}) to their corresponding
   * numeric IDs, if previously recorded.
   */
  readonly all: Record<string, number>;
  /**
   * A mapping of {@link ConversionReference} keys to their last recorded numeric ID, if any.
   */
  readonly last: Record<string, number>;
};

/**
 * The context for an HTML element being converted by a {@link Conversion}.
 */
export type ElementConversionContext = Record<string, any>;
