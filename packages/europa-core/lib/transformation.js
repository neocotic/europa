'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = Transformation;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1hdGlvbi5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1hdGlvbiIsInRyYW5zZm9ybWVyIiwib3B0aW9ucyIsImF0TGVmdCIsImF0Tm9XaGl0ZVNwYWNlIiwiYXRQYXJhZ3JhcGgiLCJidWZmZXIiLCJpbkNvZGVCbG9jayIsImluT3JkZXJlZExpc3QiLCJpblByZWZvcm1hdHRlZEJsb2NrIiwibGFzdCIsImxlZnQiLCJsaXN0RGVwdGgiLCJsaXN0SW5kZXgiLCJwbHVnaW5TdGFjayIsInNraXBDaGlsZHJlbiIsIl9kb2N1bWVudCIsImRvY3VtZW50IiwiX2VsZW1lbnQiLCJfdGFnTmFtZSIsIl93aW5kb3ciLCJ3aW5kb3ciLCJzdHJpbmciLCJhcHBlbmQiLCJjbGVhbiIsInJlcGxhY2UiLCJSRVBMQUNFTUVOVFMiLCJrZXkiLCJleHByZXNzaW9uIiwiUkVQTEFDRU1FTlRTX1JFR0VYUCIsInRlc3QiLCJ2YWx1ZSIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIlJlZ0V4cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7Ozs7SUFLTUEsYzs7QUFFSjs7Ozs7Ozs7QUFRQSwwQkFBWUMsV0FBWixFQUF5QkMsT0FBekIsRUFBa0M7QUFBQTs7QUFDaEM7Ozs7OztBQU1BLFNBQUtELFdBQUwsR0FBbUJBLFdBQW5COztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLE1BQUwsR0FBYyxJQUFkOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxXQUFMLEdBQW1CLElBQW5COztBQUdBOzs7Ozs7QUFNQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsV0FBTCxHQUFtQixLQUFuQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsbUJBQUwsR0FBMkIsS0FBM0I7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxJQUFMLEdBQVksSUFBWjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsU0FBTCxHQUFpQixDQUFqQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsU0FBTCxHQUFpQixDQUFqQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsWUFBTCxHQUFvQixLQUFwQjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsU0FBTCxHQUFpQmYsWUFBWWdCLFFBQTdCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxRQUFMLEdBQWdCLElBQWhCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxRQUFMLEdBQWdCLElBQWhCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxPQUFMLEdBQWVuQixZQUFZb0IsTUFBM0I7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT09DLE0sRUFBUTtBQUNiLFVBQUksS0FBS1osSUFBTCxJQUFhLElBQWpCLEVBQXVCO0FBQ3JCLGFBQUtKLE1BQUwsSUFBZSxLQUFLSSxJQUFwQjtBQUNEOztBQUVELFdBQUtBLElBQUwsR0FBWVksTUFBWjs7QUFFQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O3NDQU1rQjtBQUNoQixVQUFJLEtBQUtqQixXQUFULEVBQXNCO0FBQ3BCLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUksQ0FBQyxLQUFLRixNQUFWLEVBQWtCO0FBQ2hCLGFBQUtvQixNQUFMLENBQVksS0FBS1osSUFBakI7O0FBRUEsYUFBS1IsTUFBTCxHQUFjLElBQWQ7QUFDRDs7QUFFRCxXQUFLb0IsTUFBTCxDQUFZLEtBQUtaLElBQWpCOztBQUVBLFdBQUtQLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLElBQW5COztBQUVBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7OzsyQkFXT2lCLE0sRUFBUUUsSyxFQUFPO0FBQ3BCLFVBQUksQ0FBQ0YsTUFBTCxFQUFhO0FBQ1gsZUFBTyxJQUFQO0FBQ0Q7O0FBRURBLGVBQVNBLE9BQU9HLE9BQVAsQ0FBZSxPQUFmLEVBQXdCLElBQXhCLENBQVQ7O0FBRUEsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLGlCQUFTQSxPQUFPRyxPQUFQLENBQWUsZ0JBQWYsRUFBaUMsSUFBakMsRUFDTkEsT0FETSxDQUNFLFdBREYsRUFDZSxJQURmLEVBRU5BLE9BRk0sQ0FFRSxTQUZGLEVBRWEsR0FGYixDQUFUOztBQURTO0FBQUE7QUFBQTs7QUFBQTtBQUtULDBEQUFrQyx1QkFBZXpCLGVBQWUwQixZQUE5QixDQUFsQyw0R0FBK0U7QUFBQTs7QUFBQSxnQkFBbEVDLEdBQWtFO0FBQUEsZ0JBQTdEQyxVQUE2RDs7QUFDN0VOLHFCQUFTQSxPQUFPRyxPQUFQLENBQWV6QixlQUFlNkIsbUJBQWYsQ0FBbUNGLEdBQW5DLENBQWYsRUFBd0RDLFVBQXhELENBQVQ7QUFDRDtBQVBRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRVjs7QUFFRCxVQUFJLENBQUMsS0FBS25CLG1CQUFWLEVBQStCO0FBQzdCLFlBQUksS0FBS0wsY0FBVCxFQUF5QjtBQUN2QmtCLG1CQUFTQSxPQUFPRyxPQUFQLENBQWUsV0FBZixFQUE0QixFQUE1QixDQUFUO0FBQ0QsU0FGRCxNQUVPLElBQUksWUFBWUssSUFBWixDQUFpQlIsTUFBakIsQ0FBSixFQUE4QjtBQUNuQ0EsbUJBQVNBLE9BQU9HLE9BQVAsQ0FBZSxXQUFmLEVBQTRCLElBQTVCLENBQVQ7QUFDRCxTQUZNLE1BRUE7QUFDTEgsbUJBQVNBLE9BQU9HLE9BQVAsQ0FBZSxTQUFmLEVBQTBCLEdBQTFCLENBQVQ7QUFDRDtBQUNGOztBQUVELFVBQUksQ0FBQ0gsTUFBTCxFQUFhO0FBQ1gsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBS25CLE1BQUwsR0FBYyxNQUFNMkIsSUFBTixDQUFXUixNQUFYLENBQWQ7QUFDQSxXQUFLbEIsY0FBTCxHQUFzQixXQUFXMEIsSUFBWCxDQUFnQlIsTUFBaEIsQ0FBdEI7QUFDQSxXQUFLakIsV0FBTCxHQUFtQixTQUFTeUIsSUFBVCxDQUFjUixNQUFkLENBQW5COztBQUVBLGFBQU8sS0FBS0MsTUFBTCxDQUFZRCxPQUFPRyxPQUFQLENBQWUsS0FBZixFQUFzQixLQUFLZCxJQUEzQixDQUFaLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OztnQ0FPWVcsTSxFQUFRO0FBQ2xCLFVBQUksQ0FBQyxLQUFLbkIsTUFBVixFQUFrQjtBQUNoQixhQUFLb0IsTUFBTCxDQUFZLEtBQUtaLElBQUwsQ0FBVWMsT0FBVixDQUFrQixXQUFsQixFQUErQkgsTUFBL0IsQ0FBWjs7QUFFQSxhQUFLbkIsTUFBTCxHQUFjLElBQWQ7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNELE9BTkQsTUFNTyxJQUFJLEtBQUtLLElBQVQsRUFBZTtBQUNwQixhQUFLQSxJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVZSxPQUFWLENBQWtCLFdBQWxCLEVBQStCSCxNQUEvQixDQUFaO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozt3QkFTZTtBQUNiLGFBQU8sS0FBS04sU0FBWjtBQUNEOztBQUVEOzs7Ozs7Ozs7d0JBTWM7QUFDWixhQUFPLEtBQUtFLFFBQVo7QUFDRDs7QUFFRDs7Ozs7OztzQkFNWWEsSyxFQUFPO0FBQ2pCLFdBQUtiLFFBQUwsR0FBZ0JhLEtBQWhCO0FBQ0EsV0FBS1osUUFBTCxHQUFnQlksU0FBU0EsTUFBTUMsT0FBZixHQUF5QkQsTUFBTUMsT0FBTixDQUFjQyxXQUFkLEVBQXpCLEdBQXVELElBQXZFO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFjO0FBQ1osYUFBTyxLQUFLZCxRQUFaO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozt3QkFTYTtBQUNYLGFBQU8sS0FBS0MsT0FBWjtBQUNEOztBQUVEOzs7Ozs7O3NCQU1XVyxLLEVBQU87QUFDaEIsV0FBS1gsT0FBTCxHQUFlVyxLQUFmO0FBQ0EsV0FBS2YsU0FBTCxHQUFpQmUsUUFBUUEsTUFBTWQsUUFBZCxHQUF5QixJQUExQztBQUNEOzs7OztBQUlIOzs7Ozs7Ozs7QUFPQWpCLGVBQWUwQixZQUFmLEdBQThCO0FBQzVCLFVBQVEsTUFEb0I7QUFFNUIsU0FBTyxLQUZxQjtBQUc1QixTQUFPLEtBSHFCO0FBSTVCLE9BQUssS0FKdUI7QUFLNUIsT0FBSyxLQUx1QjtBQU01QixTQUFPLEtBTnFCO0FBTzVCLE9BQUssS0FQdUI7QUFRNUIsT0FBSyxLQVJ1QjtBQVM1Qix1QkFBcUIsU0FUTztBQVU1QixPQUFVLEtBVmtCO0FBVzVCLE9BQVUsS0FYa0I7QUFZNUIsT0FBVSxNQVprQjtBQWE1QixPQUFVLEdBYmtCO0FBYzVCLE9BQVUsS0Fka0I7QUFlNUIsT0FBVSxHQWZrQjtBQWdCNUIsT0FBVSxHQWhCa0I7QUFpQjVCLE9BQVUsR0FqQmtCO0FBa0I1QixPQUFVLElBbEJrQjtBQW1CNUIsT0FBVSxJQW5Ca0I7QUFvQjVCLE9BQVUsR0FwQmtCO0FBcUI1QixPQUFVLEdBckJrQjtBQXNCNUIsT0FBVSxLQXRCa0I7QUF1QjVCLE9BQVUsSUF2QmtCO0FBd0I1QixPQUFVO0FBeEJrQixDQUE5Qjs7QUEyQkE7Ozs7Ozs7QUFPQTFCLGVBQWU2QixtQkFBZixHQUFxQyxFQUFyQzs7Ozs7O0FBQ0EsbURBQWtCLG9CQUFZN0IsZUFBZTBCLFlBQTNCLENBQWxCLGlIQUE0RDtBQUFBLFFBQWpEQyxHQUFpRDs7QUFDMUQzQixtQkFBZTZCLG1CQUFmLENBQW1DRixHQUFuQyxJQUEwQyxJQUFJTyxNQUFKLENBQVdQLEdBQVgsRUFBZ0IsR0FBaEIsQ0FBMUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OztrQkFFYzNCLGM7O0FBRWYiLCJmaWxlIjoidHJhbnNmb3JtYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQ29udGFpbnMgY29udGV4dHVhbCBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgdHJhbnNmb3JtYXRpb24gcHJvY2Vzcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFRyYW5zZm9ybWF0aW9uIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgVHJhbnNmb3JtYXRpb259IGZvciB0aGUgc3BlY2lmaWVkIDxjb2RlPnRyYW5zZm9ybWVyPC9jb2RlPiBhbmQgdXNpbmcgdGhlXG4gICAqIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWVyfSB0cmFuc2Zvcm1lciAtIHRoZSB7QGxpbmsgVHJhbnNmb3JtZXJ9IHJlc3BvbnNpYmxlIGZvciB0aGlzIHRyYW5zZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gb3B0aW9ucyAtIHRoZSBvcHRpb25zIHRvIGJlIHVzZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3IodHJhbnNmb3JtZXIsIG9wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSByZXNwb25zaWJsZSBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtUcmFuc2Zvcm1lcn1cbiAgICAgKi9cbiAgICB0aGlzLnRyYW5zZm9ybWVyID0gdHJhbnNmb3JtZXJcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25zIGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJ1ZmZlciBpcyBhdCB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmF0TGVmdCA9IHRydWVcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIGFueSB3aGl0ZSBzcGFjZSBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzdGFydCBvZiB0aGUgbmV4dCBvdXRwdXQuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5hdE5vV2hpdGVTcGFjZSA9IHRydWVcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBidWZmZXIgaXMgYXQgdGhlIHN0YXJ0IG9mIGEgcGFyYWdyYXBoLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuYXRQYXJhZ3JhcGggPSB0cnVlXG5cblxuICAgIC8qKlxuICAgICAqIFRoZSB0cmFuc2Zvcm1hdGlvbiBvdXRwdXQgYnVmZmVyIHRvIHdoaWNoIHRoZSBNYXJrZG93biB3aWxsIGJlIHdyaXR0ZW4uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmJ1ZmZlciA9ICcnXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYnVmZmVyIGlzIGN1cnJlbnRseSB3aXRoaW4gYSBjb2RlIGJsb2NrLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaW5Db2RlQmxvY2sgPSBmYWxzZVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJ1ZmZlciBpcyBjdXJyZW50bHkgd2l0aGluIGFuIG9yZGVyZWQgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmluT3JkZXJlZExpc3QgPSBmYWxzZVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJ1ZmZlciBpcyBjdXJyZW50bHkgd2l0aGluIGEgcHJlZm9ybWF0dGVkIGJsb2NrLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaW5QcmVmb3JtYXR0ZWRCbG9jayA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbGFzdCBzdHJpbmcgdG8gYmUgb3V0cHV0IG5leHQgdG8gdGhlIGJ1ZmZlci5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMubGFzdCA9IG51bGxcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdGFydCBvZiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5sZWZ0ID0gJ1xcbidcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZXB0aCBvZiBuZXN0ZWQgbGlzdHMuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxpc3REZXB0aCA9IDBcblxuICAgIC8qKlxuICAgICAqIFRoZSBvbmUtYmFzZWQgaW5kZXggZm9yIHRoZSBjdXJyZW50IGxpc3QgaXRlbSB3aXRoaW4gdGhlIGN1cnJlbnQgbGlzdC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGlzdEluZGV4ID0gMVxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RhY2sgb2YgcGx1Z2lucy5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7UGx1Z2luW119XG4gICAgICovXG4gICAgdGhpcy5wbHVnaW5TdGFjayA9IFtdXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgY2hpbGRyZW4gb2YgdGhlIGN1cnJlbnQgZWxlbWVudCBzaG91bGQgYmUgc2tpcHBwZWQuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5za2lwQ2hpbGRyZW4gPSBmYWxzZVxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgZG9jdW1lbnQgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge0hUTUxEb2N1bWVudH1cbiAgICAgKi9cbiAgICB0aGlzLl9kb2N1bWVudCA9IHRyYW5zZm9ybWVyLmRvY3VtZW50XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBlbGVtZW50IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgdGFnIGZvciB0aGUgY3VycmVudCBlbGVtZW50IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5fdGFnTmFtZSA9IG51bGxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHdpbmRvdyBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7V2luZG93fVxuICAgICAqL1xuICAgIHRoaXMuX3dpbmRvdyA9IHRyYW5zZm9ybWVyLndpbmRvd1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIGxhc3Qgb3V0cHV0IHN0cmluZyB0byB0aGUgYnVmZmVyIGFuZCB0aGVuIHF1ZXVlcyB0aGUgc3BlY2lmaWVkIDxjb2RlPnN0cmluZzwvY29kZT4gdG8gYmUgb3V0cHV0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gdGhlIHN0cmluZyB0byBiZSBhcHBlbmRlZFxuICAgKiBAcmV0dXJuIHtUcmFuc2Zvcm1hdGlvbn0gQSByZWZlcmVuY2UgdG8gdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXBwZW5kKHN0cmluZykge1xuICAgIGlmICh0aGlzLmxhc3QgIT0gbnVsbCkge1xuICAgICAgdGhpcy5idWZmZXIgKz0gdGhpcy5sYXN0XG4gICAgfVxuXG4gICAgdGhpcy5sYXN0ID0gc3RyaW5nXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBwYXJhZ3JhcGggdG8gdGhlIG91dHB1dCBidWZmZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge1RyYW5zZm9ybWF0aW9ufSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBhcHBlbmRQYXJhZ3JhcGgoKSB7XG4gICAgaWYgKHRoaXMuYXRQYXJhZ3JhcGgpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmF0TGVmdCkge1xuICAgICAgdGhpcy5hcHBlbmQodGhpcy5sZWZ0KVxuXG4gICAgICB0aGlzLmF0TGVmdCA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZCh0aGlzLmxlZnQpXG5cbiAgICB0aGlzLmF0Tm9XaGl0ZVNwYWNlID0gdHJ1ZVxuICAgIHRoaXMuYXRQYXJhZ3JhcGggPSB0cnVlXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIE91dHB1dHMgdGhlIHNwZWNpZmllZCA8Y29kZT5zdHJpbmc8L2NvZGU+IHRvIHRoZSBidWZmZXIuXG4gICAqXG4gICAqIE9wdGlvbmFsbHksIDxjb2RlPnN0cmluZzwvY29kZT4gY2FuIGJlIFwiY2xlYW5lZFwiIGJlZm9yZSBiZWluZyBvdXRwdXQuIERvaW5nIHNvIHdpbGwgcmVwbGFjZSBhbnkgY2VydGFpbiBzcGVjaWFsXG4gICAqIGNoYXJhY3RlcnMgYXMgd2VsbCBhcyBzb21lIHdoaXRlIHNwYWNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gdGhlIHN0cmluZyB0byBiZSBvdXRwdXRcbiAgICogQHBhcmFtIHtib29sZWFufSBbY2xlYW49ZmFsc2VdIC0gPGNvZGU+dHJ1ZTwvY29kZT4gdG8gY2xlYW4gPGNvZGU+c3RyaW5nPC9jb2RlPjsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPlxuICAgKiBAcmV0dXJuIHtUcmFuc2Zvcm1hdGlvbn0gQSByZWZlcmVuY2UgdG8gdGhpcyB7QGxpbmsgVHJhbnNmb3JtYXRpb259IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgb3V0cHV0KHN0cmluZywgY2xlYW4pIHtcbiAgICBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKVxuXG4gICAgaWYgKGNsZWFuKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxuKFsgXFx0XSpcXG4pKy9nLCAnXFxuJylcbiAgICAgICAgLnJlcGxhY2UoL1xcblsgXFx0XSsvZywgJ1xcbicpXG4gICAgICAgIC5yZXBsYWNlKC9bIFxcdF0rL2csICcgJylcblxuICAgICAgZm9yIChjb25zdCBbIGtleSwgZXhwcmVzc2lvbiBdIG9mIE9iamVjdC5lbnRyaWVzKFRyYW5zZm9ybWF0aW9uLlJFUExBQ0VNRU5UUykpIHtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoVHJhbnNmb3JtYXRpb24uUkVQTEFDRU1FTlRTX1JFR0VYUFtrZXldLCBleHByZXNzaW9uKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5pblByZWZvcm1hdHRlZEJsb2NrKSB7XG4gICAgICBpZiAodGhpcy5hdE5vV2hpdGVTcGFjZSkge1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXlsgXFx0XFxuXSsvLCAnJylcbiAgICAgIH0gZWxzZSBpZiAoL15bIFxcdF0qXFxuLy50ZXN0KHN0cmluZykpIHtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL15bIFxcdFxcbl0rLywgJ1xcbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXlsgXFx0XSsvLCAnICcpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgdGhpcy5hdExlZnQgPSAvXFxuJC8udGVzdChzdHJpbmcpXG4gICAgdGhpcy5hdE5vV2hpdGVTcGFjZSA9IC9bIFxcdFxcbl0kLy50ZXN0KHN0cmluZylcbiAgICB0aGlzLmF0UGFyYWdyYXBoID0gL1xcbnsyfSQvLnRlc3Qoc3RyaW5nKVxuXG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKHN0cmluZy5yZXBsYWNlKC9cXG4vZywgdGhpcy5sZWZ0KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgbGluZSB3aXRoIHRoZSA8Y29kZT5zdHJpbmc8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gdGhlIHN0cmluZyB0byByZXBsYWNlIHRoZSBzdGFydCBvZiB0aGUgY3VycmVudCBsaW5lXG4gICAqIEByZXR1cm4ge1RyYW5zZm9ybWF0aW9ufSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICByZXBsYWNlTGVmdChzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuYXRMZWZ0KSB7XG4gICAgICB0aGlzLmFwcGVuZCh0aGlzLmxlZnQucmVwbGFjZSgvWyBdezIsNH0kLywgc3RyaW5nKSlcblxuICAgICAgdGhpcy5hdExlZnQgPSB0cnVlXG4gICAgICB0aGlzLmF0Tm9XaGl0ZVNwYWNlID0gdHJ1ZVxuICAgICAgdGhpcy5hdFBhcmFncmFwaCA9IHRydWVcbiAgICB9IGVsc2UgaWYgKHRoaXMubGFzdCkge1xuICAgICAgdGhpcy5sYXN0ID0gdGhpcy5sYXN0LnJlcGxhY2UoL1sgXXsyLDR9JC8sIHN0cmluZylcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIEhUTUwgZG9jdW1lbnQgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICpcbiAgICogVGhpcyBtYXkgbm90IGJlIHRoZSBzYW1lIGRvY3VtZW50IGFzIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUge0BsaW5rIFRyYW5zZm9ybWVyfSBhcyB0aGlzIGRvY3VtZW50IG1heSBiZSBuZXN0ZWRcbiAgICogKGUuZy4gYSBmcmFtZSkuXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxEb2N1bWVudH0gVGhlIEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCBkb2N1bWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAqXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9IFRoZSBlbGVtZW50LlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXQgZWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGVsZW1lbnQgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSB0byA8Y29kZT52YWx1ZTwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdmFsdWUgLSB0aGUgZWxlbWVudCB0byBiZSBzZXRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0IGVsZW1lbnQodmFsdWUpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdmFsdWVcbiAgICB0aGlzLl90YWdOYW1lID0gdmFsdWUgJiYgdmFsdWUudGFnTmFtZSA/IHZhbHVlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA6IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB0YWcgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICpcbiAgICogVGhpcyB3aWxsIGJlIHRoZSBsb3dlciBjYXNlIHRhZyBuYW1lLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0YWcgbmFtZS5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0IHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhZ05hbWVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aW5kb3cgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufS5cbiAgICpcbiAgICogVGhpcyBtYXkgbm90IGJlIHRoZSBzYW1lIHdpbmRvdyBhcyBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHtAbGluayBUcmFuc2Zvcm1lcn0gYXMgdGhpcyB3aW5kb3cgbWF5IGJlIG5lc3RlZCAoZS5nLiBhXG4gICAqIGZyYW1lKS5cbiAgICpcbiAgICogQHJldHVybiB7V2luZG93fSBUaGUgd2luZG93LlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXQgd2luZG93KCkge1xuICAgIHJldHVybiB0aGlzLl93aW5kb3dcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB3aW5kb3cgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWF0aW9ufSB0byA8Y29kZT52YWx1ZTwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93fSB2YWx1ZSAtIHRoZSB3aW5kb3cgdG8gYmUgc2V0XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNldCB3aW5kb3codmFsdWUpIHtcbiAgICB0aGlzLl93aW5kb3cgPSB2YWx1ZVxuICAgIHRoaXMuX2RvY3VtZW50ID0gdmFsdWUgPyB2YWx1ZS5kb2N1bWVudCA6IG51bGxcbiAgfVxuXG59XG5cbi8qKlxuICogQSBtYXAgb2Ygc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciByZXBsYWNlbWVudHMuXG4gKlxuICogQHB1YmxpY1xuICogQHN0YXRpY1xuICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG4gKi9cblRyYW5zZm9ybWF0aW9uLlJFUExBQ0VNRU5UUyA9IHtcbiAgJ1xcXFxcXFxcJzogJ1xcXFxcXFxcJyxcbiAgJ1xcXFxbJzogJ1xcXFxbJyxcbiAgJ1xcXFxdJzogJ1xcXFxdJyxcbiAgJz4nOiAnXFxcXD4nLFxuICAnXyc6ICdcXFxcXycsXG4gICdcXFxcKic6ICdcXFxcKicsXG4gICdgJzogJ1xcXFxgJyxcbiAgJyMnOiAnXFxcXCMnLFxuICAnKFswLTldKVxcXFwuKFxcXFxzfCQpJzogJyQxXFxcXC4kMicsXG4gICdcXHUwMGE5JzogJyhjKScsXG4gICdcXHUwMGFlJzogJyhyKScsXG4gICdcXHUyMTIyJzogJyh0bSknLFxuICAnXFx1MDBhMCc6ICcgJyxcbiAgJ1xcdTAwYjcnOiAnXFxcXConLFxuICAnXFx1MjAwMic6ICcgJyxcbiAgJ1xcdTIwMDMnOiAnICcsXG4gICdcXHUyMDA5JzogJyAnLFxuICAnXFx1MjAxOCc6ICdcXCcnLFxuICAnXFx1MjAxOSc6ICdcXCcnLFxuICAnXFx1MjAxYyc6ICdcIicsXG4gICdcXHUyMDFkJzogJ1wiJyxcbiAgJ1xcdTIwMjYnOiAnLi4uJyxcbiAgJ1xcdTIwMTMnOiAnLS0nLFxuICAnXFx1MjAxNCc6ICctLS0nXG59XG5cbi8qKlxuICogQSBtYXAgb2Ygc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCB0aGUgcmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gaWRlbnRpZnkgdGhlbS5cbiAqXG4gKiBAcHVibGljXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgUmVnRXhwPn1cbiAqL1xuVHJhbnNmb3JtYXRpb24uUkVQTEFDRU1FTlRTX1JFR0VYUCA9IHt9XG5mb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhUcmFuc2Zvcm1hdGlvbi5SRVBMQUNFTUVOVFMpKSB7XG4gIFRyYW5zZm9ybWF0aW9uLlJFUExBQ0VNRU5UU19SRUdFWFBba2V5XSA9IG5ldyBSZWdFeHAoa2V5LCAnZycpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zZm9ybWF0aW9uXG5cbi8qKlxuICogVGhlIG9wdGlvbnMgZm9yIHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVHJhbnNmb3JtYXRpb25+T3B0aW9uc1xuICogQHByb3BlcnR5IHtib29sZWFufSBbYWJzb2x1dGU9ZmFsc2VdIC0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgYWJzb2x1dGUgVVJMcyBzaG91bGQgYmUgdXNlZCBmb3IgYW5jaG9ycy9pbWFnZXM7XG4gKiBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtiYXNlVXJpXSAtIHRoZSBiYXNlIFVSSSBmb3IgdGhlIHdpbmRvd1xuICogQHByb3BlcnR5IHtib29sZWFufSBbaW5saW5lPWZhbHNlXSAtIDxjb2RlPnRydWU8L2NvZGU+IGlmIGFuY2hvci9pbWFnZSBVUkxzIGFyZSB0byBiZSBpbnNlcnRlZCBpbmxpbmU7IG90aGVyd2lzZVxuICogPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICovXG4iXX0=
