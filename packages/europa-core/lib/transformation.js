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

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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
     * The context for this {@link Transformation}.
     *
     * @public
     * @type {Map<string, *>}
     */
    this.context = new _map2.default();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1hdGlvbi5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1hdGlvbiIsInRyYW5zZm9ybWVyIiwib3B0aW9ucyIsImF0TGVmdCIsImF0Tm9XaGl0ZVNwYWNlIiwiYXRQYXJhZ3JhcGgiLCJidWZmZXIiLCJjb250ZXh0IiwiaW5Db2RlQmxvY2siLCJpbk9yZGVyZWRMaXN0IiwiaW5QcmVmb3JtYXR0ZWRCbG9jayIsImxhc3QiLCJsZWZ0IiwibGlzdERlcHRoIiwibGlzdEluZGV4IiwicGx1Z2luU3RhY2siLCJfZG9jdW1lbnQiLCJkb2N1bWVudCIsIl9lbGVtZW50IiwiX3RhZ05hbWUiLCJfd2luZG93Iiwid2luZG93Iiwic3RyaW5nIiwiYXBwZW5kIiwiY2xlYW4iLCJyZXBsYWNlIiwiUkVQTEFDRU1FTlRTIiwia2V5IiwiZXhwcmVzc2lvbiIsIlJFUExBQ0VNRU5UU19SRUdFWFAiLCJ0ZXN0IiwidmFsdWUiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJSZWdFeHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7Ozs7SUFLTUEsYzs7QUFFSjs7Ozs7Ozs7QUFRQSwwQkFBWUMsV0FBWixFQUF5QkMsT0FBekIsRUFBa0M7QUFBQTs7QUFDaEM7Ozs7OztBQU1BLFNBQUtELFdBQUwsR0FBbUJBLFdBQW5COztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLE1BQUwsR0FBYyxJQUFkOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxXQUFMLEdBQW1CLElBQW5COztBQUdBOzs7Ozs7QUFNQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBOzs7Ozs7QUFN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b3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQ29udGFpbnMgY29udGV4dHVhbCBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgdHJhbnNmb3JtYXRpb24gcHJvY2Vzcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFRyYW5zZm9ybWF0aW9uIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgVHJhbnNmb3JtYXRpb259IGZvciB0aGUgc3BlY2lmaWVkIDxjb2RlPnRyYW5zZm9ybWVyPC9jb2RlPiBhbmQgdXNpbmcgdGhlXG4gICAqIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWVyfSB0cmFuc2Zvcm1lciAtIHRoZSB7QGxpbmsgVHJhbnNmb3JtZXJ9IHJlc3BvbnNpYmxlIGZvciB0aGlzIHRyYW5zZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gb3B0aW9ucyAtIHRoZSBvcHRpb25zIHRvIGJlIHVzZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3IodHJhbnNmb3JtZXIsIG9wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSByZXNwb25zaWJsZSBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtUcmFuc2Zvcm1lcn1cbiAgICAgKi9cbiAgICB0aGlzLnRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXJcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25zIGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJ1ZmZlciBpcyBhdCB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmF0TGVmdCA9IHRydWVcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIGFueSB3aGl0ZSBzcGFjZSBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzdGFydCBvZiB0aGUgbmV4dCBvdXRwdXQuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5hdE5vV2hpdGVTcGFjZSA9IHRydWVcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBidWZmZXIgaXMgYXQgdGhlIHN0YXJ0IG9mIGEgcGFyYWdyYXBoLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuYXRQYXJhZ3JhcGggPSB0cnVlXG5cblxuICAgIC8qKlxuICAgICAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvdXRwdXQgYnVmZmVyIHRvIHdoaWNoIHRoZSBNYXJrZG93biB3aWxsIGJlIHdyaXR0ZW4uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmJ1ZmZlciA9ICcnXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGV4dCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCAqPn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgTWFwKClcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBidWZmZXIgaXMgY3VycmVudGx5IHdpdGhpbiBhIGNvZGUgYmxvY2suXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pbkNvZGVCbG9jayA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYnVmZmVyIGlzIGN1cnJlbnRseSB3aXRoaW4gYW4gb3JkZXJlZCBsaXN0LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaW5PcmRlcmVkTGlzdCA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYnVmZmVyIGlzIGN1cnJlbnRseSB3aXRoaW4gYSBwcmVmb3JtYXR0ZWQgYmxvY2suXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pblByZWZvcm1hdHRlZEJsb2NrID0gZmFsc2VcblxuICAgIC8qKlxuICAgICAqIFRoZSBsYXN0IHN0cmluZyB0byBiZSBvdXRwdXQgbmV4dCB0byB0aGUgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5sYXN0ID0gbnVsbFxuXG4gICAgLyoqXG4gICAgICogVGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmxlZnQgPSAnXFxuJ1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRlcHRoIG9mIG5lc3RlZCBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGlzdERlcHRoID0gMFxuXG4gICAgLyoqXG4gICAgICogVGhlIG9uZS1iYXNlZCBpbmRleCBmb3IgdGhlIGN1cnJlbnQgbGlzdCBpdGVtIHdpdGhpbiB0aGUgY3VycmVudCBsaXN0LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5saXN0SW5kZXggPSAxXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGFjayBvZiBwbHVnaW5zLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtQbHVnaW5bXX1cbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpblN0YWNrID0gW11cblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IGRvY3VtZW50IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtIVE1MRG9jdW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5fZG9jdW1lbnQgPSB0cmFuc2Zvcm1lci5kb2N1bWVudFxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgZWxlbWVudCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHRhZyBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuX3RhZ05hbWUgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCB3aW5kb3cgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge1dpbmRvd31cbiAgICAgKi9cbiAgICB0aGlzLl93aW5kb3cgPSB0cmFuc2Zvcm1lci53aW5kb3dcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBsYXN0IG91dHB1dCBzdHJpbmcgdG8gdGhlIGJ1ZmZlciBhbmQgdGhlbiBxdWV1ZXMgdGhlIHNwZWNpZmllZCA8Y29kZT5zdHJpbmc8L2NvZGU+IHRvIGJlIG91dHB1dC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIHRoZSBzdHJpbmcgdG8gYmUgYXBwZW5kZWRcbiAgICogQHJldHVybiB7VHJhbnNmb3JtYXRpb259IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSBmb3IgY2hhaW5pbmcgcHVycG9zZXMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFwcGVuZChzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5sYXN0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYnVmZmVyICs9IHRoaXMubGFzdFxuICAgIH1cblxuICAgIHRoaXMubGFzdCA9IHN0cmluZ1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgcGFyYWdyYXBoIHRvIHRoZSBvdXRwdXQgYnVmZmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtUcmFuc2Zvcm1hdGlvbn0gQSByZWZlcmVuY2UgdG8gdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXBwZW5kUGFyYWdyYXBoKCkge1xuICAgIGlmICh0aGlzLmF0UGFyYWdyYXBoKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGlmICghdGhpcy5hdExlZnQpIHtcbiAgICAgIHRoaXMuYXBwZW5kKHRoaXMubGVmdClcblxuICAgICAgdGhpcy5hdExlZnQgPSB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmQodGhpcy5sZWZ0KVxuXG4gICAgdGhpcy5hdE5vV2hpdGVTcGFjZSA9IHRydWVcbiAgICB0aGlzLmF0UGFyYWdyYXBoID0gdHJ1ZVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXRwdXRzIHRoZSBzcGVjaWZpZWQgPGNvZGU+c3RyaW5nPC9jb2RlPiB0byB0aGUgYnVmZmVyLlxuICAgKlxuICAgKiBPcHRpb25hbGx5LCA8Y29kZT5zdHJpbmc8L2NvZGU+IGNhbiBiZSBcImNsZWFuZWRcIiBiZWZvcmUgYmVpbmcgb3V0cHV0LiBEb2luZyBzbyB3aWxsIHJlcGxhY2UgYW55IGNlcnRhaW4gc3BlY2lhbFxuICAgKiBjaGFyYWN0ZXJzIGFzIHdlbGwgYXMgc29tZSB3aGl0ZSBzcGFjZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIHRoZSBzdHJpbmcgdG8gYmUgb3V0cHV0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NsZWFuPWZhbHNlXSAtIDxjb2RlPnRydWU8L2NvZGU+IHRvIGNsZWFuIDxjb2RlPnN0cmluZzwvY29kZT47IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT5cbiAgICogQHJldHVybiB7VHJhbnNmb3JtYXRpb259IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSBmb3IgY2hhaW5pbmcgcHVycG9zZXMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIG91dHB1dChzdHJpbmcsIGNsZWFuKSB7XG4gICAgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJylcblxuICAgIGlmIChjbGVhbikge1xuICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcbihbIFxcdF0qXFxuKSsvZywgJ1xcbicpXG4gICAgICAgIC5yZXBsYWNlKC9cXG5bIFxcdF0rL2csICdcXG4nKVxuICAgICAgICAucmVwbGFjZSgvWyBcXHRdKy9nLCAnICcpXG5cbiAgICAgIGZvciAoY29uc3QgWyBrZXksIGV4cHJlc3Npb24gXSBvZiBPYmplY3QuZW50cmllcyhUcmFuc2Zvcm1hdGlvbi5SRVBMQUNFTUVOVFMpKSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKFRyYW5zZm9ybWF0aW9uLlJFUExBQ0VNRU5UU19SRUdFWFBba2V5XSwgZXhwcmVzc2lvbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5QcmVmb3JtYXR0ZWRCbG9jaykge1xuICAgICAgaWYgKHRoaXMuYXROb1doaXRlU3BhY2UpIHtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL15bIFxcdFxcbl0rLywgJycpXG4gICAgICB9IGVsc2UgaWYgKC9eWyBcXHRdKlxcbi8udGVzdChzdHJpbmcpKSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9eWyBcXHRcXG5dKy8sICdcXG4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL15bIFxcdF0rLywgJyAnKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHRoaXMuYXRMZWZ0ID0gL1xcbiQvLnRlc3Qoc3RyaW5nKVxuICAgIHRoaXMuYXROb1doaXRlU3BhY2UgPSAvWyBcXHRcXG5dJC8udGVzdChzdHJpbmcpXG4gICAgdGhpcy5hdFBhcmFncmFwaCA9IC9cXG57Mn0kLy50ZXN0KHN0cmluZylcblxuICAgIHJldHVybiB0aGlzLmFwcGVuZChzdHJpbmcucmVwbGFjZSgvXFxuL2csIHRoaXMubGVmdCkpXG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IGxpbmUgd2l0aCB0aGUgPGNvZGU+c3RyaW5nPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIHRoZSBzdHJpbmcgdG8gcmVwbGFjZSB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgbGluZVxuICAgKiBAcmV0dXJuIHtUcmFuc2Zvcm1hdGlvbn0gQSByZWZlcmVuY2UgdG8gdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVwbGFjZUxlZnQoc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmF0TGVmdCkge1xuICAgICAgdGhpcy5hcHBlbmQodGhpcy5sZWZ0LnJlcGxhY2UoL1sgXXsyLDR9JC8sIHN0cmluZykpXG5cbiAgICAgIHRoaXMuYXRMZWZ0ID0gdHJ1ZVxuICAgICAgdGhpcy5hdE5vV2hpdGVTcGFjZSA9IHRydWVcbiAgICAgIHRoaXMuYXRQYXJhZ3JhcGggPSB0cnVlXG4gICAgfSBlbHNlIGlmICh0aGlzLmxhc3QpIHtcbiAgICAgIHRoaXMubGFzdCA9IHRoaXMubGFzdC5yZXBsYWNlKC9bIF17Miw0fSQvLCBzdHJpbmcpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBIVE1MIGRvY3VtZW50IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAqXG4gICAqIFRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSBkb2N1bWVudCBhcyBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHtAbGluayBUcmFuc2Zvcm1lcn0gYXMgdGhpcyBkb2N1bWVudCBtYXkgYmUgbmVzdGVkXG4gICAqIChlLmcuIGEgZnJhbWUpLlxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRG9jdW1lbnR9IFRoZSBIVE1MIGRvY3VtZW50LlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXQgZG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudCBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBUaGUgZWxlbWVudC5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBlbGVtZW50IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gdG8gPGNvZGU+dmFsdWU8L2NvZGU+LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHZhbHVlIC0gdGhlIGVsZW1lbnQgdG8gYmUgc2V0XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNldCBlbGVtZW50KHZhbHVlKSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHZhbHVlXG4gICAgdGhpcy5fdGFnTmFtZSA9IHZhbHVlICYmIHZhbHVlLnRhZ05hbWUgPyB2YWx1ZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiBudWxsXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdGFnIGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAqXG4gICAqIFRoaXMgd2lsbCBiZSB0aGUgbG93ZXIgY2FzZSB0YWcgbmFtZS5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgdGFnIG5hbWUuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCB0YWdOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl90YWdOYW1lXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2luZG93IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAqXG4gICAqIFRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSB3aW5kb3cgYXMgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSB7QGxpbmsgVHJhbnNmb3JtZXJ9IGFzIHRoaXMgd2luZG93IG1heSBiZSBuZXN0ZWQgKGUuZy4gYVxuICAgKiBmcmFtZSkuXG4gICAqXG4gICAqIEByZXR1cm4ge1dpbmRvd30gVGhlIHdpbmRvdy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0IHdpbmRvdygpIHtcbiAgICByZXR1cm4gdGhpcy5fd2luZG93XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgd2luZG93IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gdG8gPGNvZGU+dmFsdWU8L2NvZGU+LlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gdmFsdWUgLSB0aGUgd2luZG93IHRvIGJlIHNldFxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXQgd2luZG93KHZhbHVlKSB7XG4gICAgdGhpcy5fd2luZG93ID0gdmFsdWVcbiAgICB0aGlzLl9kb2N1bWVudCA9IHZhbHVlID8gdmFsdWUuZG9jdW1lbnQgOiBudWxsXG4gIH1cblxufVxuXG4vKipcbiAqIEEgbWFwIG9mIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgdGhlaXIgcmVwbGFjZW1lbnRzLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxuICovXG5UcmFuc2Zvcm1hdGlvbi5SRVBMQUNFTUVOVFMgPSB7XG4gICdcXFxcXFxcXCc6ICdcXFxcXFxcXCcsXG4gICdcXFxcWyc6ICdcXFxcWycsXG4gICdcXFxcXSc6ICdcXFxcXScsXG4gICc+JzogJ1xcXFw+JyxcbiAgJ18nOiAnXFxcXF8nLFxuICAnXFxcXConOiAnXFxcXConLFxuICAnYCc6ICdcXFxcYCcsXG4gICcjJzogJ1xcXFwjJyxcbiAgJyhbMC05XSlcXFxcLihcXFxcc3wkKSc6ICckMVxcXFwuJDInLFxuICAnXFx1MDBhOSc6ICcoYyknLFxuICAnXFx1MDBhZSc6ICcociknLFxuICAnXFx1MjEyMic6ICcodG0pJyxcbiAgJ1xcdTAwYTAnOiAnICcsXG4gICdcXHUwMGI3JzogJ1xcXFwqJyxcbiAgJ1xcdTIwMDInOiAnICcsXG4gICdcXHUyMDAzJzogJyAnLFxuICAnXFx1MjAwOSc6ICcgJyxcbiAgJ1xcdTIwMTgnOiAnXFwnJyxcbiAgJ1xcdTIwMTknOiAnXFwnJyxcbiAgJ1xcdTIwMWMnOiAnXCInLFxuICAnXFx1MjAxZCc6ICdcIicsXG4gICdcXHUyMDI2JzogJy4uLicsXG4gICdcXHUyMDEzJzogJy0tJyxcbiAgJ1xcdTIwMTQnOiAnLS0tJ1xufVxuXG4vKipcbiAqIEEgbWFwIG9mIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIGlkZW50aWZ5IHRoZW0uXG4gKlxuICogQHB1YmxpY1xuICogQHN0YXRpY1xuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFJlZ0V4cD59XG4gKi9cblRyYW5zZm9ybWF0aW9uLlJFUExBQ0VNRU5UU19SRUdFWFAgPSB7fVxuZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoVHJhbnNmb3JtYXRpb24uUkVQTEFDRU1FTlRTKSkge1xuICBUcmFuc2Zvcm1hdGlvbi5SRVBMQUNFTUVOVFNfUkVHRVhQW2tleV0gPSBuZXcgUmVnRXhwKGtleSwgJ2cnKVxufVxuXG5leHBvcnQgeyBUcmFuc2Zvcm1hdGlvbiB9XG5cbi8qKlxuICogVGhlIG9wdGlvbnMgZm9yIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVHJhbnNmb3JtYXRpb25+T3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBbYWJzb2x1dGU9ZmFsc2VdIC0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYWJzb2x1dGUgVVJMcyBzaG91bGQgYmUgdXNlZCBmb3IgYW5jaG9ycy9pbWFnZXM7XG4gKiBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtiYXNlVXJpXSAtIHRoZSBiYXNlIFVSSSBmb3IgdGhlIHdpbmRvd1xuICogQHByb3BlcnR5IHtib29sZWFufSBbaW5saW5lPWZhbHNlXSAtIDxjb2RlPnRydWU8L2NvZGU+IGlmIGFuY2hvci9pbWFnZSBVUkxzIGFyZSB0byBiZSBpbnNlcnRlZCBpbmxpbmU7IG90aGVyd2lzZVxuICogPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICovXG4iXX0=
