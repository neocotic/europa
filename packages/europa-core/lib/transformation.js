'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformation = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var Transformation = function () {

  /**
   * Creates an instance of {@link Transformation} for the specified <code>transformer</code> and using the
   * <code>options</code> provided.
   *
   * @param {Transformer} transformer - the {@link Transformer} responsible for this transformation
   * @param {Transformation~Options} options - the options to be used
   * @public
   */
  function Transformation(transformer, options) {
    (0, _classCallCheck3.default)(this, Transformation);

    /**
     * The {@link Transformation} responsible for this {@link Transformation}.
     *
     * @public
     * @type {Transformer}
     */
    this.transformer = transformer;

    /**
     * The options for this {@link Transformation}.
     *
     * @public
     * @type {Transformation~Options}
     */
    this.options = options;

    /**
     * Indicates whether the buffer is at the start of the current line.
     *
     * @public
     * @type {boolean}
     */
    this.atLeft = true;

    /**
     * Indicates whether any white space should be removed from the start of the next output.
     *
     * @public
     * @type {boolean}
     */
    this.atNoWhiteSpace = true;

    /**
     * Indicates whether the buffer is at the start of a paragraph.
     *
     * @public
     * @type {boolean}
     */
    this.atParagraph = true;

    /**
     * The transformation output buffer to which the Markdown will be written.
     *
     * @public
     * @type {string}
     */
    this.buffer = '';

    /**
     * Indicates whether the buffer is currently within a code block.
     *
     * @public
     * @type {boolean}
     */
    this.inCodeBlock = false;

    /**
     * Indicates whether the buffer is currently within an ordered list.
     *
     * @public
     * @type {boolean}
     */
    this.inOrderedList = false;

    /**
     * Indicates whether the buffer is currently within a preformatted block.
     *
     * @public
     * @type {boolean}
     */
    this.inPreformattedBlock = false;

    /**
     * The last string to be output next to the buffer.
     *
     * @public
     * @type {string}
     */
    this.last = null;

    /**
     * The start of the current line.
     *
     * @public
     * @type {string}
     */
    this.left = '\n';

    /**
     * The depth of nested lists.
     *
     * @public
     * @type {number}
     */
    this.listDepth = 0;

    /**
     * The one-based index for the current list item within the current list.
     *
     * @public
     * @type {number}
     */
    this.listIndex = 1;

    /**
     * The current stack of plugins.
     *
     * @public
     * @type {Plugin[]}
     */
    this.pluginStack = [];

    /**
     * Indicates whether transformation of the children of the current element should be skippped.
     *
     * @public
     * @type {boolean}
     */
    this.skipChildren = false;

    /**
     * The current document for this {@link Transformation}.
     *
     * @private
     * @type {HTMLDocument}
     */
    this._document = transformer.document;

    /**
     * The current element for this {@link Transformation}.
     *
     * @private
     * @type {Element}
     */
    this._element = null;

    /**
     * The name of the tag for the current element for this {@link Transformation}.
     *
     * @private
     * @type {string}
     */
    this._tagName = null;

    /**
     * The current window for this {@link Transformation}.
     *
     * @private
     * @type {Window}
     */
    this._window = transformer.window;
  }

  /**
   * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
   *
   * @param {string} string - the string to be appended
   * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
   * @public
   */


  (0, _createClass3.default)(Transformation, [{
    key: 'append',
    value: function append(string) {
      if (this.last != null) {
        this.buffer += this.last;
      }

      this.last = string;

      return this;
    }

    /**
     * Appends a paragraph to the output buffer.
     *
     * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
     * @public
     */

  }, {
    key: 'appendParagraph',
    value: function appendParagraph() {
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

  }, {
    key: 'output',
    value: function output(string, clean) {
      if (!string) {
        return this;
      }

      string = string.replace(/\r\n/g, '\n');

      if (clean) {
        string = string.replace(/\n([ \t]*\n)+/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/[ \t]+/g, ' ');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(Transformation.REPLACEMENTS)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = (0, _slicedToArray3.default)(_step.value, 2);

            var key = _step$value[0];
            var expression = _step$value[1];

            string = string.replace(Transformation.REPLACEMENTS_REGEXP[key], expression);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      if (!this.inPreformattedBlock) {
        if (this.atNoWhiteSpace) {
          string = string.replace(/^[ \t\n]+/, '');
        } else if (/^[ \t]*\n/.test(string)) {
          string = string.replace(/^[ \t\n]+/, '\n');
        } else {
          string = string.replace(/^[ \t]+/, ' ');
        }
      }

      if (!string) {
        return this;
      }

      this.atLeft = /\n$/.test(string);
      this.atNoWhiteSpace = /[ \t\n]$/.test(string);
      this.atParagraph = /\n{2}$/.test(string);

      return this.append(string.replace(/\n/g, this.left));
    }

    /**
     * Replaces the start of the current line with the <code>string</code> provided.
     *
     * @param {string} string - the string to replace the start of the current line
     * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
     * @public
     */

  }, {
    key: 'replaceLeft',
    value: function replaceLeft(string) {
      if (!this.atLeft) {
        this.append(this.left.replace(/[ ]{2,4}$/, string));

        this.atLeft = true;
        this.atNoWhiteSpace = true;
        this.atParagraph = true;
      } else if (this.last) {
        this.last = this.last.replace(/[ ]{2,4}$/, string);
      }

      return this;
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

  }, {
    key: 'document',
    get: function get() {
      return this._document;
    }

    /**
     * Returns the element for this {@link Transformation}.
     *
     * @return {Element} The element.
     * @public
     */

  }, {
    key: 'element',
    get: function get() {
      return this._element;
    }

    /**
     * Sets the element for this {@link Transformation} to <code>value</code>.
     *
     * @param {Element} value - the element to be set
     * @public
     */
    ,
    set: function set(value) {
      this._element = value;
      this._tagName = value && value.tagName ? value.tagName.toLowerCase() : null;
    }

    /**
     * Returns the name of the tag for this {@link Transformation}.
     *
     * This will be the lower case tag name.
     *
     * @return {string} The tag name.
     * @public
     */

  }, {
    key: 'tagName',
    get: function get() {
      return this._tagName;
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

  }, {
    key: 'window',
    get: function get() {
      return this._window;
    }

    /**
     * Sets the window for this {@link Transformation} to <code>value</code>.
     *
     * @param {Window} value - the window to be set
     * @public
     */
    ,
    set: function set(value) {
      this._window = value;
      this._document = value ? value.document : null;
    }
  }]);
  return Transformation;
}();

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
  '©': '(c)',
  '®': '(r)',
  '™': '(tm)',
  ' ': ' ',
  '·': '\\*',
  ' ': ' ',
  ' ': ' ',
  ' ': ' ',
  '‘': '\'',
  '’': '\'',
  '“': '"',
  '”': '"',
  '…': '...',
  '–': '--',
  '—': '---'
};

/**
 * A map of special characters and the regular expression used to identify them.
 *
 * @public
 * @static
 * @type {Object<string, RegExp>}
 */
Transformation.REPLACEMENTS_REGEXP = {};
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(Transformation.REPLACEMENTS)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var key = _step2.value;

    Transformation.REPLACEMENTS_REGEXP[key] = new RegExp(key, 'g');
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

exports.Transformation = Transformation;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1hdGlvbi5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1hdGlvbiIsInRyYW5zZm9ybWVyIiwib3B0aW9ucyIsImF0TGVmdCIsImF0Tm9XaGl0ZVNwYWNlIiwiYXRQYXJhZ3JhcGgiLCJidWZmZXIiLCJpbkNvZGVCbG9jayIsImluT3JkZXJlZExpc3QiLCJpblByZWZvcm1hdHRlZEJsb2NrIiwibGFzdCIsImxlZnQiLCJsaXN0RGVwdGgiLCJsaXN0SW5kZXgiLCJwbHVnaW5TdGFjayIsInNraXBDaGlsZHJlbiIsIl9kb2N1bWVudCIsImRvY3VtZW50IiwiX2VsZW1lbnQiLCJfdGFnTmFtZSIsIl93aW5kb3ciLCJ3aW5kb3ciLCJzdHJpbmciLCJhcHBlbmQiLCJjbGVhbiIsInJlcGxhY2UiLCJSRVBMQUNFTUVOVFMiLCJrZXkiLCJleHByZXNzaW9uIiwiUkVQTEFDRU1FTlRTX1JFR0VYUCIsInRlc3QiLCJ2YWx1ZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7O0lBS01BLGM7O0FBRUo7Ozs7Ozs7O0FBUUEsMEJBQVlDLFdBQVosRUFBeUJDLE9BQXpCLEVBQWtDO0FBQUE7O0FBQ2hDOzs7Ozs7QUFNQSxTQUFLRCxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsT0FBTCxHQUFlQSxPQUFmOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsY0FBTCxHQUFzQixJQUF0Qjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsV0FBTCxHQUFtQixJQUFuQjs7QUFHQTs7Ozs7O0FBTUEsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLFdBQUwsR0FBbUIsS0FBbkI7O0FBRUE7Ozs7OztB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InNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBDb250YWlucyBjb250ZXh0dWFsIGluZm9ybWF0aW9uIGZvciBhIHNpbmdsZSB0cmFuc2Zvcm1hdGlvbiBwcm9jZXNzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgVHJhbnNmb3JtYXRpb24ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gZm9yIHRoZSBzcGVjaWZpZWQgPGNvZGU+dHJhbnNmb3JtZXI8L2NvZGU+IGFuZCB1c2luZyB0aGVcbiAgICogPGNvZGU+b3B0aW9uczwvY29kZT4gcHJvdmlkZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtZXJ9IHRyYW5zZm9ybWVyIC0gdGhlIHtAbGluayBUcmFuc2Zvcm1lcn0gcmVzcG9uc2libGUgZm9yIHRoaXMgdHJhbnNmb3JtYXRpb25cbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBvcHRpb25zIC0gdGhlIG9wdGlvbnMgdG8gYmUgdXNlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0cmFuc2Zvcm1lciwgb3B0aW9ucykge1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgVHJhbnNmb3JtYXRpb259IHJlc3BvbnNpYmxlIGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge1RyYW5zZm9ybWVyfVxuICAgICAqL1xuICAgIHRoaXMudHJhbnNmb3JtZXIgPSB0cmFuc2Zvcm1lclxuXG4gICAgLyoqXG4gICAgICogVGhlIG9wdGlvbnMgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc31cbiAgICAgKi9cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYnVmZmVyIGlzIGF0IHRoZSBzdGFydCBvZiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuYXRMZWZ0ID0gdHJ1ZVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgYW55IHdoaXRlIHNwYWNlIHNob3VsZCBiZSByZW1vdmVkIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBuZXh0IG91dHB1dC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmF0Tm9XaGl0ZVNwYWNlID0gdHJ1ZVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJ1ZmZlciBpcyBhdCB0aGUgc3RhcnQgb2YgYSBwYXJhZ3JhcGguXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5hdFBhcmFncmFwaCA9IHRydWVcblxuXG4gICAgLyoqXG4gICAgICogVGhlIHRyYW5zZm9ybWF0aW9uIG91dHB1dCBidWZmZXIgdG8gd2hpY2ggdGhlIE1hcmtkb3duIHdpbGwgYmUgd3JpdHRlbi5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuYnVmZmVyID0gJydcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBidWZmZXIgaXMgY3VycmVudGx5IHdpdGhpbiBhIGNvZGUgYmxvY2suXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pbkNvZGVCbG9jayA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYnVmZmVyIGlzIGN1cnJlbnRseSB3aXRoaW4gYW4gb3JkZXJlZCBsaXN0LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaW5PcmRlcmVkTGlzdCA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYnVmZmVyIGlzIGN1cnJlbnRseSB3aXRoaW4gYSBwcmVmb3JtYXR0ZWQgYmxvY2suXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pblByZWZvcm1hdHRlZEJsb2NrID0gZmFsc2VcblxuICAgIC8qKlxuICAgICAqIFRoZSBsYXN0IHN0cmluZyB0byBiZSBvdXRwdXQgbmV4dCB0byB0aGUgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5sYXN0ID0gbnVsbFxuXG4gICAgLyoqXG4gICAgICogVGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmxlZnQgPSAnXFxuJ1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRlcHRoIG9mIG5lc3RlZCBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGlzdERlcHRoID0gMFxuXG4gICAgLyoqXG4gICAgICogVGhlIG9uZS1iYXNlZCBpbmRleCBmb3IgdGhlIGN1cnJlbnQgbGlzdCBpdGVtIHdpdGhpbiB0aGUgY3VycmVudCBsaXN0LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5saXN0SW5kZXggPSAxXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGFjayBvZiBwbHVnaW5zLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtQbHVnaW5bXX1cbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpblN0YWNrID0gW11cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRyYW5zZm9ybWF0aW9uIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgY3VycmVudCBlbGVtZW50IHNob3VsZCBiZSBza2lwcHBlZC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnNraXBDaGlsZHJlbiA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBkb2N1bWVudCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7SFRNTERvY3VtZW50fVxuICAgICAqL1xuICAgIHRoaXMuX2RvY3VtZW50ID0gdHJhbnNmb3JtZXIuZG9jdW1lbnRcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IGVsZW1lbnQgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSB0YWcgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLl90YWdOYW1lID0gbnVsbFxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgd2luZG93IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtXaW5kb3d9XG4gICAgICovXG4gICAgdGhpcy5fd2luZG93ID0gdHJhbnNmb3JtZXIud2luZG93XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyB0aGUgbGFzdCBvdXRwdXQgc3RyaW5nIHRvIHRoZSBidWZmZXIgYW5kIHRoZW4gcXVldWVzIHRoZSBzcGVjaWZpZWQgPGNvZGU+c3RyaW5nPC9jb2RlPiB0byBiZSBvdXRwdXQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSB0aGUgc3RyaW5nIHRvIGJlIGFwcGVuZGVkXG4gICAqIEByZXR1cm4ge1RyYW5zZm9ybWF0aW9ufSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBhcHBlbmQoc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubGFzdCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmJ1ZmZlciArPSB0aGlzLmxhc3RcbiAgICB9XG5cbiAgICB0aGlzLmxhc3QgPSBzdHJpbmdcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIHBhcmFncmFwaCB0byB0aGUgb3V0cHV0IGJ1ZmZlci5cbiAgICpcbiAgICogQHJldHVybiB7VHJhbnNmb3JtYXRpb259IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSBmb3IgY2hhaW5pbmcgcHVycG9zZXMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFwcGVuZFBhcmFncmFwaCgpIHtcbiAgICBpZiAodGhpcy5hdFBhcmFncmFwaCkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYXRMZWZ0KSB7XG4gICAgICB0aGlzLmFwcGVuZCh0aGlzLmxlZnQpXG5cbiAgICAgIHRoaXMuYXRMZWZ0ID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kKHRoaXMubGVmdClcblxuICAgIHRoaXMuYXROb1doaXRlU3BhY2UgPSB0cnVlXG4gICAgdGhpcy5hdFBhcmFncmFwaCA9IHRydWVcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogT3V0cHV0cyB0aGUgc3BlY2lmaWVkIDxjb2RlPnN0cmluZzwvY29kZT4gdG8gdGhlIGJ1ZmZlci5cbiAgICpcbiAgICogT3B0aW9uYWxseSwgPGNvZGU+c3RyaW5nPC9jb2RlPiBjYW4gYmUgXCJjbGVhbmVkXCIgYmVmb3JlIGJlaW5nIG91dHB1dC4gRG9pbmcgc28gd2lsbCByZXBsYWNlIGFueSBjZXJ0YWluIHNwZWNpYWxcbiAgICogY2hhcmFjdGVycyBhcyB3ZWxsIGFzIHNvbWUgd2hpdGUgc3BhY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSB0aGUgc3RyaW5nIHRvIGJlIG91dHB1dFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjbGVhbj1mYWxzZV0gLSA8Y29kZT50cnVlPC9jb2RlPiB0byBjbGVhbiA8Y29kZT5zdHJpbmc8L2NvZGU+OyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+XG4gICAqIEByZXR1cm4ge1RyYW5zZm9ybWF0aW9ufSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBvdXRwdXQoc3RyaW5nLCBjbGVhbikge1xuICAgIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpXG5cbiAgICBpZiAoY2xlYW4pIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXG4oWyBcXHRdKlxcbikrL2csICdcXG4nKVxuICAgICAgICAucmVwbGFjZSgvXFxuWyBcXHRdKy9nLCAnXFxuJylcbiAgICAgICAgLnJlcGxhY2UoL1sgXFx0XSsvZywgJyAnKVxuXG4gICAgICBmb3IgKGNvbnN0IFsga2V5LCBleHByZXNzaW9uIF0gb2YgT2JqZWN0LmVudHJpZXMoVHJhbnNmb3JtYXRpb24uUkVQTEFDRU1FTlRTKSkge1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShUcmFuc2Zvcm1hdGlvbi5SRVBMQUNFTUVOVFNfUkVHRVhQW2tleV0sIGV4cHJlc3Npb24pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluUHJlZm9ybWF0dGVkQmxvY2spIHtcbiAgICAgIGlmICh0aGlzLmF0Tm9XaGl0ZVNwYWNlKSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9eWyBcXHRcXG5dKy8sICcnKVxuICAgICAgfSBlbHNlIGlmICgvXlsgXFx0XSpcXG4vLnRlc3Qoc3RyaW5nKSkge1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXlsgXFx0XFxuXSsvLCAnXFxuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9eWyBcXHRdKy8sICcgJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICB0aGlzLmF0TGVmdCA9IC9cXG4kLy50ZXN0KHN0cmluZylcbiAgICB0aGlzLmF0Tm9XaGl0ZVNwYWNlID0gL1sgXFx0XFxuXSQvLnRlc3Qoc3RyaW5nKVxuICAgIHRoaXMuYXRQYXJhZ3JhcGggPSAvXFxuezJ9JC8udGVzdChzdHJpbmcpXG5cbiAgICByZXR1cm4gdGhpcy5hcHBlbmQoc3RyaW5nLnJlcGxhY2UoL1xcbi9nLCB0aGlzLmxlZnQpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBzdGFydCBvZiB0aGUgY3VycmVudCBsaW5lIHdpdGggdGhlIDxjb2RlPnN0cmluZzwvY29kZT4gcHJvdmlkZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSB0aGUgc3RyaW5nIHRvIHJlcGxhY2UgdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IGxpbmVcbiAgICogQHJldHVybiB7VHJhbnNmb3JtYXRpb259IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSBmb3IgY2hhaW5pbmcgcHVycG9zZXMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHJlcGxhY2VMZWZ0KHN0cmluZykge1xuICAgIGlmICghdGhpcy5hdExlZnQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKHRoaXMubGVmdC5yZXBsYWNlKC9bIF17Miw0fSQvLCBzdHJpbmcpKVxuXG4gICAgICB0aGlzLmF0TGVmdCA9IHRydWVcbiAgICAgIHRoaXMuYXROb1doaXRlU3BhY2UgPSB0cnVlXG4gICAgICB0aGlzLmF0UGFyYWdyYXBoID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0KSB7XG4gICAgICB0aGlzLmxhc3QgPSB0aGlzLmxhc3QucmVwbGFjZSgvWyBdezIsNH0kLywgc3RyaW5nKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgSFRNTCBkb2N1bWVudCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgKlxuICAgKiBUaGlzIG1heSBub3QgYmUgdGhlIHNhbWUgZG9jdW1lbnQgYXMgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSB7QGxpbmsgVHJhbnNmb3JtZXJ9IGFzIHRoaXMgZG9jdW1lbnQgbWF5IGJlIG5lc3RlZFxuICAgKiAoZS5nLiBhIGZyYW1lKS5cbiAgICpcbiAgICogQHJldHVybiB7SFRNTERvY3VtZW50fSBUaGUgSFRNTCBkb2N1bWVudC5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0IGRvY3VtZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnQgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICpcbiAgICogQHJldHVybiB7RWxlbWVudH0gVGhlIGVsZW1lbnQuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCBlbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZWxlbWVudCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259IHRvIDxjb2RlPnZhbHVlPC9jb2RlPi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSB2YWx1ZSAtIHRoZSBlbGVtZW50IHRvIGJlIHNldFxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXQgZWxlbWVudCh2YWx1ZSkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSB2YWx1ZVxuICAgIHRoaXMuX3RhZ05hbWUgPSB2YWx1ZSAmJiB2YWx1ZS50YWdOYW1lID8gdmFsdWUudGFnTmFtZS50b0xvd2VyQ2FzZSgpIDogbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHRhZyBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgKlxuICAgKiBUaGlzIHdpbGwgYmUgdGhlIGxvd2VyIGNhc2UgdGFnIG5hbWUuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRhZyBuYW1lLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXQgdGFnTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFnTmFtZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpbmRvdyBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgKlxuICAgKiBUaGlzIG1heSBub3QgYmUgdGhlIHNhbWUgd2luZG93IGFzIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUge0BsaW5rIFRyYW5zZm9ybWVyfSBhcyB0aGlzIHdpbmRvdyBtYXkgYmUgbmVzdGVkIChlLmcuIGFcbiAgICogZnJhbWUpLlxuICAgKlxuICAgKiBAcmV0dXJuIHtXaW5kb3d9IFRoZSB3aW5kb3cuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCB3aW5kb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dpbmRvd1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHdpbmRvdyBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259IHRvIDxjb2RlPnZhbHVlPC9jb2RlPi5cbiAgICpcbiAgICogQHBhcmFtIHtXaW5kb3d9IHZhbHVlIC0gdGhlIHdpbmRvdyB0byBiZSBzZXRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0IHdpbmRvdyh2YWx1ZSkge1xuICAgIHRoaXMuX3dpbmRvdyA9IHZhbHVlXG4gICAgdGhpcy5fZG9jdW1lbnQgPSB2YWx1ZSA/IHZhbHVlLmRvY3VtZW50IDogbnVsbFxuICB9XG5cbn1cblxuLyoqXG4gKiBBIG1hcCBvZiBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIHRoZWlyIHJlcGxhY2VtZW50cy5cbiAqXG4gKiBAcHVibGljXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAqL1xuVHJhbnNmb3JtYXRpb24uUkVQTEFDRU1FTlRTID0ge1xuICAnXFxcXFxcXFwnOiAnXFxcXFxcXFwnLFxuICAnXFxcXFsnOiAnXFxcXFsnLFxuICAnXFxcXF0nOiAnXFxcXF0nLFxuICAnPic6ICdcXFxcPicsXG4gICdfJzogJ1xcXFxfJyxcbiAgJ1xcXFwqJzogJ1xcXFwqJyxcbiAgJ2AnOiAnXFxcXGAnLFxuICAnIyc6ICdcXFxcIycsXG4gICcoWzAtOV0pXFxcXC4oXFxcXHN8JCknOiAnJDFcXFxcLiQyJyxcbiAgJ1xcdTAwYTknOiAnKGMpJyxcbiAgJ1xcdTAwYWUnOiAnKHIpJyxcbiAgJ1xcdTIxMjInOiAnKHRtKScsXG4gICdcXHUwMGEwJzogJyAnLFxuICAnXFx1MDBiNyc6ICdcXFxcKicsXG4gICdcXHUyMDAyJzogJyAnLFxuICAnXFx1MjAwMyc6ICcgJyxcbiAgJ1xcdTIwMDknOiAnICcsXG4gICdcXHUyMDE4JzogJ1xcJycsXG4gICdcXHUyMDE5JzogJ1xcJycsXG4gICdcXHUyMDFjJzogJ1wiJyxcbiAgJ1xcdTIwMWQnOiAnXCInLFxuICAnXFx1MjAyNic6ICcuLi4nLFxuICAnXFx1MjAxMyc6ICctLScsXG4gICdcXHUyMDE0JzogJy0tLSdcbn1cblxuLyoqXG4gKiBBIG1hcCBvZiBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBpZGVudGlmeSB0aGVtLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHA+fVxuICovXG5UcmFuc2Zvcm1hdGlvbi5SRVBMQUNFTUVOVFNfUkVHRVhQID0ge31cbmZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKFRyYW5zZm9ybWF0aW9uLlJFUExBQ0VNRU5UUykpIHtcbiAgVHJhbnNmb3JtYXRpb24uUkVQTEFDRU1FTlRTX1JFR0VYUFtrZXldID0gbmV3IFJlZ0V4cChrZXksICdnJylcbn1cblxuZXhwb3J0IHsgVHJhbnNmb3JtYXRpb24gfVxuXG4vKipcbiAqIFRoZSBvcHRpb25zIGZvciB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRyYW5zZm9ybWF0aW9ufk9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2Fic29sdXRlPWZhbHNlXSAtIDxjb2RlPnRydWU8L2NvZGU+IGlmIGFic29sdXRlIFVSTHMgc2hvdWxkIGJlIHVzZWQgZm9yIGFuY2hvcnMvaW1hZ2VzO1xuICogb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbYmFzZVVyaV0gLSB0aGUgYmFzZSBVUkkgZm9yIHRoZSB3aW5kb3dcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2lubGluZT1mYWxzZV0gLSA8Y29kZT50cnVlPC9jb2RlPiBpZiBhbmNob3IvaW1hZ2UgVVJMcyBhcmUgdG8gYmUgaW5zZXJ0ZWQgaW5saW5lOyBvdGhlcndpc2VcbiAqIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAqL1xuIl19
