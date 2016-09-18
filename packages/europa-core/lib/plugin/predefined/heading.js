'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadingPlugin = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A {@link Plugin} which outputs a heading of various levels.
 *
 * @public
 * @extends {Plugin}
 */
var HeadingPlugin = function (_Plugin) {
  (0, _inherits3.default)(HeadingPlugin, _Plugin);

  function HeadingPlugin() {
    (0, _classCallCheck3.default)(this, HeadingPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (HeadingPlugin.__proto__ || (0, _getPrototypeOf2.default)(HeadingPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(HeadingPlugin, [{
    key: 'transform',


    /**
     * @override
     */
    value: function transform(transformation, context) {
      var level = parseInt(transformation.tagName.match(/([1-6])$/)[1], 10);

      transformation.appendParagraph();

      var heading = '';
      for (var i = 0; i < level; i++) {
        heading += '#';
      }

      transformation.output(heading + ' ');
    }
  }]);
  return HeadingPlugin;
}(_plugin.Plugin); /*
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

exports.HeadingPlugin = HeadingPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9oZWFkaW5nLmpzIl0sIm5hbWVzIjpbIkhlYWRpbmdQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJsZXZlbCIsInBhcnNlSW50IiwidGFnTmFtZSIsIm1hdGNoIiwiYXBwZW5kUGFyYWdyYXBoIiwiaGVhZGluZyIsImkiLCJvdXRwdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7OztBQUVBOzs7Ozs7SUFNTUEsYTs7Ozs7Ozs7Ozs7O0FBRUo7Ozs4QkFHVUMsYyxFQUFnQkMsTyxFQUFTO0FBQ2pDLFVBQU1DLFFBQVFDLFNBQVNILGVBQWVJLE9BQWYsQ0FBdUJDLEtBQXZCLENBQTZCLFVBQTdCLEVBQXlDLENBQXpDLENBQVQsRUFBc0QsRUFBdEQsQ0FBZDs7QUFFQUwscUJBQWVNLGVBQWY7O0FBRUEsVUFBSUMsVUFBVSxFQUFkO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLEtBQXBCLEVBQTJCTSxHQUEzQixFQUFnQztBQUM5QkQsbUJBQVcsR0FBWDtBQUNEOztBQUVEUCxxQkFBZVMsTUFBZixDQUF5QkYsT0FBekI7QUFDRDs7O21CQWhESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7UUE4QlNSLGEsR0FBQUEsYSIsImZpbGUiOiJoZWFkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhIGhlYWRpbmcgb2YgdmFyaW91cyBsZXZlbHMuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgSGVhZGluZ1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29uc3QgbGV2ZWwgPSBwYXJzZUludCh0cmFuc2Zvcm1hdGlvbi50YWdOYW1lLm1hdGNoKC8oWzEtNl0pJC8pWzFdLCAxMClcblxuICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG5cbiAgICBsZXQgaGVhZGluZyA9ICcnXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXZlbDsgaSsrKSB7XG4gICAgICBoZWFkaW5nICs9ICcjJ1xuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dChgJHtoZWFkaW5nfSBgKVxuICB9XG5cbn1cblxuZXhwb3J0IHsgSGVhZGluZ1BsdWdpbiB9XG4iXX0=
