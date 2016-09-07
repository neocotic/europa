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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _strong = require('./strong');

var _strong2 = _interopRequireDefault(_strong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A {@link Plugin} which outputs a definition term as strong text.
 *
 * @public
 * @extends {StrongPlugin}
 */
var DefinitionTermPlugin = function (_StrongPlugin) {
  (0, _inherits3.default)(DefinitionTermPlugin, _StrongPlugin);

  function DefinitionTermPlugin() {
    (0, _classCallCheck3.default)(this, DefinitionTermPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (DefinitionTermPlugin.__proto__ || (0, _getPrototypeOf2.default)(DefinitionTermPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(DefinitionTermPlugin, [{
    key: 'transform',


    /**
     * @override
     */
    value: function transform(transformation, context) {
      transformation.appendParagraph();

      (0, _get3.default)(DefinitionTermPlugin.prototype.__proto__ || (0, _getPrototypeOf2.default)(DefinitionTermPlugin.prototype), 'transform', this).call(this, transformation, context);
    }
  }]);
  return DefinitionTermPlugin;
}(_strong2.default); /*
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

exports.default = DefinitionTermPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9kZWZpbml0aW9uLXRlcm0uanMiXSwibmFtZXMiOlsiRGVmaW5pdGlvblRlcm1QbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJhcHBlbmRQYXJhZ3JhcGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxvQjs7Ozs7Ozs7Ozs7O0FBRUo7Ozs4QkFHVUMsYyxFQUFnQkMsTyxFQUFTO0FBQ2pDRCxxQkFBZUUsZUFBZjs7QUFFQSxrS0FBZ0JGLGNBQWhCLEVBQWdDQyxPQUFoQztBQUNEOzs7cUJBdkNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQTJDZUYsb0IiLCJmaWxlIjoiZGVmaW5pdGlvbi10ZXJtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgU3Ryb25nUGx1Z2luIGZyb20gJy4vc3Ryb25nJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhIGRlZmluaXRpb24gdGVybSBhcyBzdHJvbmcgdGV4dC5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7U3Ryb25nUGx1Z2lufVxuICovXG5jbGFzcyBEZWZpbml0aW9uVGVybVBsdWdpbiBleHRlbmRzIFN0cm9uZ1BsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kUGFyYWdyYXBoKClcblxuICAgIHN1cGVyLnRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dClcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERlZmluaXRpb25UZXJtUGx1Z2luXG4iXX0=
