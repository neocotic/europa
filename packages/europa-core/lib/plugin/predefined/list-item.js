'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemPlugin = undefined;

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

var _utilities = require('../../utilities');

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

      transformation.append(_utilities.Utilities.leftPad(value, (transformation.listDepth - 1) * 2));

      return true;
    }
  }]);
  return ListItemPlugin;
}(_plugin.Plugin);

exports.ListItemPlugin = ListItemPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiTGlzdEl0ZW1QbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJ2YWx1ZSIsImluT3JkZXJlZExpc3QiLCJsaXN0SW5kZXgiLCJhdExlZnQiLCJhcHBlbmQiLCJsZWZ0IiwicmVwbGFjZSIsImF0Tm9XaGl0ZVNwYWNlIiwiYXRQYXJhZ3JhcGgiLCJsYXN0IiwibGVmdFBhZCIsImxpc3REZXB0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQ01BLGM7Ozs7Ozs7Ozs7OztBQUVKOzs7OEJBR1VDLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFNQyxRQUFRRixlQUFlRyxhQUFmLEdBQWtDSCxlQUFlSSxTQUFmLEVBQWxDLFVBQW1FLElBQWpGOztBQUVBLFVBQUksQ0FBQ0osZUFBZUssTUFBcEIsRUFBNEI7QUFDMUJMLHVCQUFlTSxNQUFmLENBQXNCTixlQUFlTyxJQUFmLENBQW9CQyxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxJQUF6QyxDQUF0Qjs7QUFFQVIsdUJBQWVLLE1BQWYsR0FBd0IsSUFBeEI7QUFDQUwsdUJBQWVTLGNBQWYsR0FBZ0MsSUFBaEM7QUFDQVQsdUJBQWVVLFdBQWYsR0FBNkIsSUFBN0I7QUFDRCxPQU5ELE1BTU8sSUFBSVYsZUFBZVcsSUFBbkIsRUFBeUI7QUFDOUJYLHVCQUFlVyxJQUFmLEdBQXNCWCxlQUFlVyxJQUFmLENBQW9CSCxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxJQUF6QyxDQUF0QjtBQUNEOztBQUVEUixxQkFBZU0sTUFBZixDQUFzQixxQkFBVU0sT0FBVixDQUFrQlYsS0FBbEIsRUFBeUIsQ0FBQ0YsZUFBZWEsU0FBZixHQUEyQixDQUE1QixJQUFpQyxDQUExRCxDQUF0Qjs7QUFFQSxhQUFPLElBQVA7QUFDRDs7Ozs7UUFJTWQsYyxHQUFBQSxjIiwiZmlsZSI6Imxpc3QtaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuaW1wb3J0IHsgVXRpbGl0aWVzIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhIGxpc3QgaXRlbS4gVGhlIHByZWZpeCBmb3IgdGhlIGxpc3QgaXRlbSB3aWxsIHZhcnkgZGVwZW5kaW5nIG9uIHdoYXQgdHlwZSBvZiBsaXN0IHRoZVxuICogaXRlbSBpcyBjb250YWluZWQgd2l0aGluLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIExpc3RJdGVtUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPyBgJHt0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXgrK30uIGAgOiAnKiAnXG5cbiAgICBpZiAoIXRyYW5zZm9ybWF0aW9uLmF0TGVmdCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKHRyYW5zZm9ybWF0aW9uLmxlZnQucmVwbGFjZSgvWyBdezIsNH0kLywgJ1xcbicpKVxuXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hdExlZnQgPSB0cnVlXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hdE5vV2hpdGVTcGFjZSA9IHRydWVcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmF0UGFyYWdyYXBoID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtYXRpb24ubGFzdCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24ubGFzdCA9IHRyYW5zZm9ybWF0aW9uLmxhc3QucmVwbGFjZSgvWyBdezIsNH0kLywgJ1xcbicpXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKFV0aWxpdGllcy5sZWZ0UGFkKHZhbHVlLCAodHJhbnNmb3JtYXRpb24ubGlzdERlcHRoIC0gMSkgKiAyKSlcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG5leHBvcnQgeyBMaXN0SXRlbVBsdWdpbiB9XG4iXX0=
