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

import { ConversionContext } from 'europa-core/ConversionContext';
import { EuropaOptions } from 'europa-core/EuropaOptions';
import { Environment } from 'europa-core/environment/Environment';
import { DomElement } from 'europa-core/environment/dom/DomElement';
import { DomNode } from 'europa-core/environment/dom/DomNode';
import { PluginManager } from 'europa-core/plugin/PluginManager';

const _buffer = Symbol();
const _context = Symbol();
const _environment = Symbol();
const _options = Symbol();
const _pluginManager = Symbol();
const _referenceCache = Symbol();
const _references = Symbol();
const _skipTagNames = Symbol();

/**
 * Contains contextual information for a single conversion process.
 */
export class Conversion {
  /**
   * Whether the buffer is at the start of the current line.
   */
  atLeft = true;

  /**
   * Whether any whitespace should be removed from the start of the next output.
   */
  atNoWhitespace = true;

  /**
   * Whether the buffer is at the start of a paragraph.
   */
  atParagraph = true;

  /**
   * The current element for this {@link Conversion}.
   */
  element: DomElement;

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

  private [_buffer] = '';
  private readonly [_context] = new ConversionContext();
  private readonly [_environment]: Environment<any, any>;
  private readonly [_options]: Required<EuropaOptions>;
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

  /**
   * Creates an instance of {@link Conversion} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: ConversionOptions) {
    const { element, environment, options: europaOptions, pluginManager } = options;

    this[_environment] = environment;
    this[_options] = europaOptions;
    this[_pluginManager] = pluginManager;
    this.element = element;
    this.left = europaOptions.eol;
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
      this[_buffer] += this.last;
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

    this.atNoWhitespace = true;
    this.atParagraph = true;

    return this;
  }

  /**
   * Converts the specified `node` and it's children into Markdown.
   *
   * Nothing happens if `node` is nullable or hidden (see {@link Conversion#isHidden}.
   *
   * @param node - The node (along well as it's children) to be converted into Markdown.
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  convertNode(node: DomNode | null | undefined): this {
    if (!node) {
      return this;
    }

    const pluginManager = this[_pluginManager];

    if (node.isElement()) {
      if (this.isHidden(node)) {
        return this;
      }

      this.element = node;

      const tagName = node.tagName();
      if (this.skipTagNames.has(tagName)) {
        return this;
      }

      const context = new ConversionContext();
      const convertChildren = pluginManager.hasConverterHook(tagName, 'startTag')
        ? pluginManager.invokeConverterHook(tagName, 'startTag', this, context)
        : true;

      if (convertChildren) {
        node.children().forEach((child) => this.convertNode(child));
      }

      pluginManager.invokeConverterHook(tagName, 'endTag', this, context);
    } else if (node.isText()) {
      const value = node.text() || '';

      if (!pluginManager.invokeTextConverterHook(value, this)) {
        this.output(value, { clean: true });
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

    return this.append('')[_buffer].trim();
  }

  /**
   * Escapes special characters from the specified `str`.
   *
   * If `character` is provided, this method escapes all occurrences of the specified special `character` within the
   * `str` provided by prefixing them with a backslash. Otherwise, some special characters in Markdown are escaped using
   * backslashes, others are simple replacements of potentially confusing Unicode characters, before finally allowing
   * plugins to hook in and provide any additional escaping.
   *
   * @param str - The string to be escaped.
   * @param [character] - The special character to be escaped by prefixing with a backslash in all cases.
   * @return The escaped `str`.
   */
  escape(str: string, character?: string): string {
    if (character) {
      return str.replace(new RegExp(`(${character})`, 'g'), '\\$1');
    }

    return this[_pluginManager].invokeTextEscaperHook(
      str
        .replace(/([\\`*_\[\]#])/g, (character) => `\\${character}`)
        .replace(
          /([\u00a0\u2002\u2003\u2009])|([\u2018\u2019])|([\u201c\u201d])/g,
          (character, group1, group2, group3) => {
            if (group1) {
              return ' ';
            }
            if (group2) {
              return "'";
            }
            if (group3) {
              return '"';
            }
            return character;
          },
        ),
      this,
    );
  }

  /**
   * Returns the value of the option for the {@link EuropaCore} instance responsible for this {@link Conversion} with
   * the specified `name`.
   *
   * @param name - The name of the option whose value is to be returned.
   * @return The value of the named option.
   */
  getOption<N extends keyof EuropaOptions>(name: N): Required<EuropaOptions>[N] {
    return this[_options][name];
  }

  /**
   * Checks whether the specified `element` is currently hidden.
   *
   * This check is very basic as it checks whether `element` has any of the following styles applied:
   *
   * | Style Property | Value    |
   * | -------------- | -------- |
   * | `display`      | `none`   |
   * | `visibility`   | `hidden` |
   *
   * The accuracy of the resolution of the styles is left to the active {@link Environment} and may be limited.
   *
   * @param element - The element whose visibility is to be checked.
   * @return `true` if `element` is hidden; otherwise `false`.
   */
  isHidden(element: DomElement): boolean {
    return element.css('display') === 'none' || element.css('visibility') === 'hidden';
  }

  /**
   * Outputs the specified `str` to the buffer.
   *
   * @param str - The string to be output.
   * @param [options] - The options to be used.
   * @return A reference to this {@link Conversion} for chaining purposes.
   */
  output(str: string, options: ConversionOutputOptions = {}): this {
    if (!str) {
      return this;
    }

    const newLine = '\n';

    str = str.replace(/\r\n/g, newLine);

    if (options.clean) {
      str = this.escape(str)
        .replace(/\n([ \t]*\n)+/g, newLine)
        .replace(/\n[ \t]+/g, newLine)
        .replace(/[ \t]+/g, ' ');
    }

    if (!options.preserveLeadingWhitespace) {
      if (this.atNoWhitespace) {
        str = str.replace(/^[ \t\n]+/, '');
      } else if (/^[ \t]*\n/.test(str)) {
        str = str.replace(/^[ \t\n]+/, newLine);
      } else {
        str = str.replace(/^[ \t]+/, ' ');
      }
    }

    if (!str) {
      return this;
    }

    this.atLeft = /\n$/.test(str);
    this.atNoWhitespace = /[ \t\n]$/.test(str);
    this.atParagraph = /\n{2}$/.test(str);

    return this.append(str.replace(/\n/g, this.left));
  }

  /**
   * Returns the specified `url` relative to the `baseUri` option in a manner similar to that of a browser resolving an
   * anchor element.
   *
   * A relative URL may still be returned but only if the `baseUri` option is relative.
   *
   * @param url - The target URL to resolve.
   * @return The resolved `url`.
   */
  resolveUrl(url: string): string {
    return this[_environment].resolveUrl(this.getOption('baseUri'), url);
  }

  /**
   * The global context for this {@link Conversion}.
   */
  get context(): ConversionContext {
    return this[_context];
  }

  /**
   * The end of line character to be used by this {@link Conversion}.
   */
  get eol(): string {
    return this[_options].eol;
  }

  /**
   * The options for the {@link EuropaCore} instance responsible for this {@link Conversion}.
   */
  get options(): Required<EuropaOptions> {
    return { ...this[_options] };
  }

  /**
   * The set of tag upper-case names for which conversion should be skipped for this {@link Conversion}.
   */
  get skipTagNames(): Set<string> {
    return this[_skipTagNames];
  }
}

/**
 * The options used by {@link Conversion}.
 */
export type ConversionOptions = {
  /**
   * The initial DOM element.
   */
  readonly element: DomElement;
  /**
   * The active {@link Environment}.
   */
  readonly environment: Environment<any, any>;
  /**
   * The options for the {@link EuropaCore} instance responsible for this {@link Conversion}.
   */
  readonly options: Required<EuropaOptions>;
  /**
   * The {@link PluginManager} to be used to invoke plugin converters.
   */
  readonly pluginManager: PluginManager;
};

/**
 * The options used by {@link Conversion#output}.
 */
export type ConversionOutputOptions = {
  /**
   * Escape certain special characters as well as some whitespace before appending to the output buffer.
   */
  readonly clean?: boolean;
  /**
   * Preserve any leading whitespace, preventing it from being removed before appending to the output buffer.
   */
  readonly preserveLeadingWhitespace?: boolean;
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
