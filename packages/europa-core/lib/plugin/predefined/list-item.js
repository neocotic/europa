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

      transformation.append(_utilities.Utilities.leftPad(value, (transformation.listDepth - 1) * 2));
    }
  }]);
  return ListItemPlugin;
}(_plugin.Plugin);

exports.ListItemPlugin = ListItemPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiTGlzdEl0ZW1QbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJ2YWx1ZSIsImluT3JkZXJlZExpc3QiLCJsaXN0SW5kZXgiLCJhdExlZnQiLCJhcHBlbmQiLCJsZWZ0IiwicmVwbGFjZSIsImF0Tm9XaGl0ZVNwYWNlIiwiYXRQYXJhZ3JhcGgiLCJsYXN0IiwibGVmdFBhZCIsImxpc3REZXB0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7QUEzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7O0lBWU1BLGM7Ozs7Ozs7Ozs7OztBQUVKOzs7OEJBR1VDLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFNQyxRQUFRRixlQUFlRyxhQUFmLEdBQWtDSCxlQUFlSSxTQUFmLEVBQWxDLFVBQW1FLElBQWpGOztBQUVBLFVBQUksQ0FBQ0osZUFBZUssTUFBcEIsRUFBNEI7QUFDMUJMLHVCQUFlTSxNQUFmLENBQXNCTixlQUFlTyxJQUFmLENBQW9CQyxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxJQUF6QyxDQUF0Qjs7QUFFQVIsdUJBQWVLLE1BQWYsR0FBd0IsSUFBeEI7QUFDQUwsdUJBQWVTLGNBQWYsR0FBZ0MsSUFBaEM7QUFDQVQsdUJBQWVVLFdBQWYsR0FBNkIsSUFBN0I7QUFDRCxPQU5ELE1BTU8sSUFBSVYsZUFBZVcsSUFBbkIsRUFBeUI7QUFDOUJYLHVCQUFlVyxJQUFmLEdBQXNCWCxlQUFlVyxJQUFmLENBQW9CSCxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxJQUF6QyxDQUF0QjtBQUNEOztBQUVEUixxQkFBZU0sTUFBZixDQUFzQixxQkFBVU0sT0FBVixDQUFrQlYsS0FBbEIsRUFBeUIsQ0FBQ0YsZUFBZWEsU0FBZixHQUEyQixDQUE1QixJQUFpQyxDQUExRCxDQUF0QjtBQUNEOzs7OztRQUlNZCxjLEdBQUFBLGMiLCJmaWxlIjoibGlzdC1pdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuaW1wb3J0IHsgVXRpbGl0aWVzIH0gZnJvbSAnLi4vLi4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhIGxpc3QgaXRlbS4gVGhlIHByZWZpeCBmb3IgdGhlIGxpc3QgaXRlbSB3aWxsIHZhcnkgZGVwZW5kaW5nIG9uIHdoYXQgdHlwZSBvZiBsaXN0IHRoZVxuICogaXRlbSBpcyBjb250YWluZWQgd2l0aGluLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIExpc3RJdGVtUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPyBgJHt0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXgrK30uIGAgOiAnKiAnXG5cbiAgICBpZiAoIXRyYW5zZm9ybWF0aW9uLmF0TGVmdCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKHRyYW5zZm9ybWF0aW9uLmxlZnQucmVwbGFjZSgvWyBdezIsNH0kLywgJ1xcbicpKVxuXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hdExlZnQgPSB0cnVlXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hdE5vV2hpdGVTcGFjZSA9IHRydWVcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmF0UGFyYWdyYXBoID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtYXRpb24ubGFzdCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24ubGFzdCA9IHRyYW5zZm9ybWF0aW9uLmxhc3QucmVwbGFjZSgvWyBdezIsNH0kLywgJ1xcbicpXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKFV0aWxpdGllcy5sZWZ0UGFkKHZhbHVlLCAodHJhbnNmb3JtYXRpb24ubGlzdERlcHRoIC0gMSkgKiAyKSlcbiAgfVxuXG59XG5cbmV4cG9ydCB7IExpc3RJdGVtUGx1Z2luIH1cbiJdfQ==
