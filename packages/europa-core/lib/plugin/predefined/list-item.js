'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _utilities = require('../../utilities');

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
 * item is contained within.
 *
 * @public
 * @extends {Plugin}
 */
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

/* eslint no-unused-vars: "off" */

var ListItemPlugin = function (_Plugin) {
  (0, _inherits3.default)(ListItemPlugin, _Plugin);

  function ListItemPlugin() {
    (0, _classCallCheck3.default)(this, ListItemPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (ListItemPlugin.__proto__ || (0, _getPrototypeOf2.default)(ListItemPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListItemPlugin, [{
    key: 'transform',


    /**
     * @override
     */
    value: function transform(transformation, context) {
      var value = transformation.inOrderedList ? transformation.listIndex++ + '. ' : '* ';

      if (!transformation.atLeft) {
        transformation.append(transformation.left.replace(/[ ]{2,4}$/, '\n'));

        transformation.atLeft = true;
        transformation.atNoWhiteSpace = true;
        transformation.atParagraph = true;
      } else if (transformation.last) {
        transformation.last = transformation.last.replace(/[ ]{2,4}$/, '\n');
      }

      transformation.append(_utilities2.default.leftPad(value, (transformation.listDepth - 1) * 2));
    }
  }]);
  return ListItemPlugin;
}(_plugin2.default);

exports.default = ListItemPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiTGlzdEl0ZW1QbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJ2YWx1ZSIsImluT3JkZXJlZExpc3QiLCJsaXN0SW5kZXgiLCJhdExlZnQiLCJhcHBlbmQiLCJsZWZ0IiwicmVwbGFjZSIsImF0Tm9XaGl0ZVNwYWNlIiwiYXRQYXJhZ3JhcGgiLCJsYXN0IiwibGVmdFBhZCIsImxpc3REZXB0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7QUEzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7O0lBWU1BLGM7Ozs7Ozs7Ozs7OztBQUVKOzs7OEJBR1VDLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFNQyxRQUFRRixlQUFlRyxhQUFmLEdBQWtDSCxlQUFlSSxTQUFmLEVBQWxDLFVBQW1FLElBQWpGOztBQUVBLFVBQUksQ0FBQ0osZUFBZUssTUFBcEIsRUFBNEI7QUFDMUJMLHVCQUFlTSxNQUFmLENBQXNCTixlQUFlTyxJQUFmLENBQW9CQyxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxJQUF6QyxDQUF0Qjs7QUFFQVIsdUJBQWVLLE1BQWYsR0FBd0IsSUFBeEI7QUFDQUwsdUJBQWVTLGNBQWYsR0FBZ0MsSUFBaEM7QUFDQVQsdUJBQWVVLFdBQWYsR0FBNkIsSUFBN0I7QUFDRCxPQU5ELE1BTU8sSUFBSVYsZUFBZVcsSUFBbkIsRUFBeUI7QUFDOUJYLHVCQUFlVyxJQUFmLEdBQXNCWCxlQUFlVyxJQUFmLENBQW9CSCxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxJQUF6QyxDQUF0QjtBQUNEOztBQUVEUixxQkFBZU0sTUFBZixDQUFzQixvQkFBVU0sT0FBVixDQUFrQlYsS0FBbEIsRUFBeUIsQ0FBQ0YsZUFBZWEsU0FBZixHQUEyQixDQUE1QixJQUFpQyxDQUExRCxDQUF0QjtBQUNEOzs7OztrQkFJWWQsYyIsImZpbGUiOiJsaXN0LWl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4uL3BsdWdpbidcbmltcG9ydCBVdGlsaXRpZXMgZnJvbSAnLi4vLi4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhIGxpc3QgaXRlbS4gVGhlIHByZWZpeCBmb3IgdGhlIGxpc3QgaXRlbSB3aWxsIHZhcnkgZGVwZW5kaW5nIG9uIHdoYXQgdHlwZSBvZiBsaXN0IHRoZVxuICogaXRlbSBpcyBjb250YWluZWQgd2l0aGluLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIExpc3RJdGVtUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPyBgJHt0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXgrK30uIGAgOiAnKiAnXG5cbiAgICBpZiAoIXRyYW5zZm9ybWF0aW9uLmF0TGVmdCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKHRyYW5zZm9ybWF0aW9uLmxlZnQucmVwbGFjZSgvWyBdezIsNH0kLywgJ1xcbicpKVxuXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hdExlZnQgPSB0cnVlXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hdE5vV2hpdGVTcGFjZSA9IHRydWVcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmF0UGFyYWdyYXBoID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtYXRpb24ubGFzdCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24ubGFzdCA9IHRyYW5zZm9ybWF0aW9uLmxhc3QucmVwbGFjZSgvWyBdezIsNH0kLywgJ1xcbicpXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKFV0aWxpdGllcy5sZWZ0UGFkKHZhbHVlLCAodHJhbnNmb3JtYXRpb24ubGlzdERlcHRoIC0gMSkgKiAyKSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RJdGVtUGx1Z2luXG4iXX0=
