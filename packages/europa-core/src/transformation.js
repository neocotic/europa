/*
 * Copyright (C) 2016 Alasdair Mercer, Skelp
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

/**
 * Contains contextual information for a single transformation process.
 *
 * @public
 */
class Transformation {

  /**
   * Creates an instance of {@link Transformation} for the specified <code>transformer</code> and using the
   * <code>options</code> provided.
   *
   * @param {Transformer} transformer - the {@link Transformer} responsible for this transformation
   * @param {Transformation~Options} options - the options to be used
   * @public
   */
  constructor(transformer, options) {
    /**
     * The {@link Transformation} responsible for this {@link Transformation}.
     *
     * @public
     * @type {Transformer}
     */
    this.transformer = transformer

    /**
     * The options for this {@link Transformation}.
     *
     * @public
     * @type {Transformation~Options}
     */
    this.options = options

    /**
     * Indicates whether the buffer is at the start of the current line.
     *
     * @public
     * @type {boolean}
     */
    this.atLeft = true

    /**
     * Indicates whether any white space should be removed from the start of the next output.
     *
     * @public
     * @type {boolean}
     */
    this.atNoWhiteSpace = true

    /**
     * Indicates whether the buffer is at the start of a paragraph.
     *
     * @public
     * @type {boolean}
     */
    this.atParagraph = true


    /**
     * The transformation output buffer to which the Markdown will be written.
     *
     * @public
     * @type {string}
     */
    this.buffer = ''

    /**
     * Indicates whether the buffer is currently within a code block.
     *
     * @public
     * @type {boolean}
     */
    this.inCodeBlock = false

    /**
     * Indicates whether the buffer is currently within an ordered list.
     *
     * @public
     * @type {boolean}
     */
    this.inOrderedList = false

    /**
     * Indicates whether the buffer is currently within a preformatted block.
     *
     * @public
     * @type {boolean}
     */
    this.inPreformattedBlock = false

    /**
     * The last string to be output next to the buffer.
     *
     * @public
     * @type {string}
     */
    this.last = null

    /**
     * The start of the current line.
     *
     * @public
     * @type {string}
     */
    this.left = '\n'

    /**
     * The depth of nested lists.
     *
     * @public
     * @type {number}
     */
    this.listDepth = 0

    /**
     * The one-based index for the current list item within the current list.
     *
     * @public
     * @type {number}
     */
    this.listIndex = 1

    /**
     * The current stack of plugins.
     *
     * @public
     * @type {Plugin[]}
     */
    this.pluginStack = []

    /**
     * Indicates whether transformation of the children of the current element should be skippped.
     *
     * @public
     * @type {boolean}
     */
    this.skipChildren = false

    /**
     * The current document for this {@link Transformation}.
     *
     * @private
     * @type {HTMLDocument}
     */
    this._document = transformer.document

    /**
     * The current element for this {@link Transformation}.
     *
     * @private
     * @type {Element}
     */
    this._element = null

    /**
     * The name of the tag for the current element for this {@link Transformation}.
     *
     * @private
     * @type {string}
     */
    this._tagName = null

    /**
     * The current window for this {@link Transformation}.
     *
     * @private
     * @type {Window}
     */
    this._window = transformer.window
  }

  /**
   * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
   *
   * @param {string} string - the string to be appended
   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
   * @public
   */
  append(string) {
    if (this.last != null) {
      this.buffer += this.last
    }

    this.last = string

    return this
  }

  /**
   * Appends a paragraph to the output buffer.
   *
   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
   * @public
   */
  appendParagraph() {
    if (this.atParagraph) {
      return this
    }

    if (!this.atLeft) {
      this.append(this.left)

      this.atLeft = true
    }

    this.append(this.left)

    this.atNoWhiteSpace = true
    this.atParagraph = true

    return this
  }

  /**
   * Outputs the specified <code>string</code> to the buffer.
   *
   * Optionally, <code>string</code> can be "cleaned" before being output. Doing so will replace any certain special
   * characters as well as some white space.
   *
   * @param {string} string - the string to be output
   * @param {boolean} [clean=false] - <code>true</code> to clean <code>string</code>; otherwise <code>false</code>
   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
   * @public
   */
  output(string, clean) {
    if (!string) {
      return this
    }

    string = string.replace(/\r\n/g, '\n')

    if (clean) {
      string = string.replace(/\n([ \t]*\n)+/g, '\n')
        .replace(/\n[ \t]+/g, '\n')
        .replace(/[ \t]+/g, ' ')

      for (const [ key, expression ] of Object.entries(Transformation.REPLACEMENTS)) {
        string = string.replace(Transformation.REPLACEMENTS_REGEXP[key], expression)
      }
    }

    if (!this.inPreformattedBlock) {
      if (this.atNoWhiteSpace) {
        string = string.replace(/^[ \t\n]+/, '')
      } else if (/^[ \t]*\n/.test(string)) {
        string = string.replace(/^[ \t\n]+/, '\n')
      } else {
        string = string.replace(/^[ \t]+/, ' ')
      }
    }

    if (!string) {
      return this
    }

    this.atLeft = /\n$/.test(string)
    this.atNoWhiteSpace = /[ \t\n]$/.test(string)
    this.atParagraph = /\n{2}$/.test(string)

    return this.append(string.replace(/\n/g, this.left))
  }

  /**
   * Replaces the start of the current line with the <code>string</code> provided.
   *
   * @param {string} string - the string to replace the start of the current line
   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
   * @public
   */
  replaceLeft(string) {
    if (!this.atLeft) {
      this.append(this.left.replace(/[ ]{2,4}$/, string))

      this.atLeft = true
      this.atNoWhiteSpace = true
      this.atParagraph = true
    } else if (this.last) {
      this.last = this.last.replace(/[ ]{2,4}$/, string)
    }

    return this
  }

  /**
   * Returns the HTML document for this {@link Transformation}.
   *
   * This may not be the same document as is associated with the {@link Transformer} as this document may be nested
   * (e.g. a frame).
   *
   * @return {HTMLDocument} The HTML document.
   * @public
   */
  get document() {
    return this._document
  }

  /**
   * Returns the element for this {@link Transformation}.
   *
   * @return {Element} The element.
   * @public
   */
  get element() {
    return this._element
  }

  /**
   * Sets the element for this {@link Transformation} to <code>value</code>.
   *
   * @param {Element} value - the element to be set
   * @public
   */
  set element(value) {
    this._element = value
    this._tagName = value && value.tagName ? value.tagName.toLowerCase() : null
  }

  /**
   * Returns the name of the tag for this {@link Transformation}.
   *
   * This will be the lower case tag name.
   *
   * @return {string} The tag name.
   * @public
   */
  get tagName() {
    return this._tagName
  }

  /**
   * Returns the window for this {@link Transformation}.
   *
   * This may not be the same window as is associated with the {@link Transformer} as this window may be nested (e.g. a
   * frame).
   *
   * @return {Window} The window.
   * @public
   */
  get window() {
    return this._window
  }

  /**
   * Sets the window for this {@link Transformation} to <code>value</code>.
   *
   * @param {Window} value - the window to be set
   * @public
   */
  set window(value) {
    this._window = value
    this._document = value ? value.document : null
  }

}

/**
 * A map of special characters and their replacements.
 *
 * @public
 * @static
 * @type {Object<string, string>}
 */
Transformation.REPLACEMENTS = {
  '\\\\': '\\\\',
  '\\[': '\\[',
  '\\]': '\\]',
  '>': '\\>',
  '_': '\\_',
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
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201c': '"',
  '\u201d': '"',
  '\u2026': '...',
  '\u2013': '--',
  '\u2014': '---'
}

/**
 * A map of special characters and the regular expression used to identify them.
 *
 * @public
 * @static
 * @type {Object<string, RegExp>}
 */
Transformation.REPLACEMENTS_REGEXP = {}
for (const key of Object.keys(Transformation.REPLACEMENTS)) {
  Transformation.REPLACEMENTS_REGEXP[key] = new RegExp(key, 'g')
}

export default Transformation

/**
 * The options for {@link Transformation}.
 *
 * @typedef {Object} Transformation~Options
 * @property {boolean} [absolute=false] - <code>true</code> if absolute URLs should be used for anchors/images;
 * otherwise <code>false</code>.
 * @property {string} [baseUri] - the base URI for the window
 * @property {boolean} [inline=false] - <code>true</code> if anchor/image URLs are to be inserted inline; otherwise
 * <code>false</code>.
 */
