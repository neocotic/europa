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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A {@link Plugin} which outputs the contents in a preformatted block.
 *
 * @public
 * @extends {Plugin}
 */
var PreformattedPlugin = function (_Plugin) {
  (0, _inherits3.default)(PreformattedPlugin, _Plugin);

  function PreformattedPlugin() {
    (0, _classCallCheck3.default)(this, PreformattedPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (PreformattedPlugin.__proto__ || (0, _getPrototypeOf2.default)(PreformattedPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(PreformattedPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.atLeft = false;
      transformation.atParagraph = false;
      transformation.inPreformattedBlock = context.get('previousInPreformattedBlock');
      transformation.left = context.get('previousLeft');

      transformation.appendParagraph();
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousInPreformattedBlock', transformation.inPreformattedBlock);
      context.set('previousLeft', transformation.left);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var value = '    ';

      transformation.left += value;

      if (transformation.atParagraph) {
        transformation.append(value);
      } else {
        transformation.appendParagraph();
      }
    }
  }]);
  return PreformattedPlugin;
}(_plugin2.default); /*
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

exports.default = PreformattedPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9wcmVmb3JtYXR0ZWQuanMiXSwibmFtZXMiOlsiUHJlZm9ybWF0dGVkUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiYXRMZWZ0IiwiYXRQYXJhZ3JhcGgiLCJpblByZWZvcm1hdHRlZEJsb2NrIiwiZ2V0IiwibGVmdCIsImFwcGVuZFBhcmFncmFwaCIsInNldCIsInZhbHVlIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxrQjs7Ozs7Ozs7Ozs7O0FBRUo7OzswQkFHTUMsYyxFQUFnQkMsTyxFQUFTO0FBQzdCRCxxQkFBZUUsTUFBZixHQUF3QixLQUF4QjtBQUNBRixxQkFBZUcsV0FBZixHQUE2QixLQUE3QjtBQUNBSCxxQkFBZUksbUJBQWYsR0FBcUNILFFBQVFJLEdBQVIsQ0FBWSw2QkFBWixDQUFyQztBQUNBTCxxQkFBZU0sSUFBZixHQUFzQkwsUUFBUUksR0FBUixDQUFZLGNBQVosQ0FBdEI7O0FBRUFMLHFCQUFlTyxlQUFmO0FBQ0Q7O0FBRUQ7Ozs7OzsyQkFHT1AsYyxFQUFnQkMsTyxFQUFTO0FBQzlCQSxjQUFRTyxHQUFSLENBQVksNkJBQVosRUFBMkNSLGVBQWVJLG1CQUExRDtBQUNBSCxjQUFRTyxHQUFSLENBQVksY0FBWixFQUE0QlIsZUFBZU0sSUFBM0M7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVTixjLEVBQWdCQyxPLEVBQVM7QUFDakMsVUFBTVEsUUFBUSxNQUFkOztBQUVBVCxxQkFBZU0sSUFBZixJQUF1QkcsS0FBdkI7O0FBRUEsVUFBSVQsZUFBZUcsV0FBbkIsRUFBZ0M7QUFDOUJILHVCQUFlVSxNQUFmLENBQXNCRCxLQUF0QjtBQUNELE9BRkQsTUFFTztBQUNMVCx1QkFBZU8sZUFBZjtBQUNEO0FBQ0Y7OztxQkFuRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7O2tCQWlEZVIsa0IiLCJmaWxlIjoicHJlZm9ybWF0dGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IFBsdWdpbiBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBvdXRwdXRzIHRoZSBjb250ZW50cyBpbiBhIHByZWZvcm1hdHRlZCBibG9jay5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBQcmVmb3JtYXR0ZWRQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uYXRMZWZ0ID0gZmFsc2VcbiAgICB0cmFuc2Zvcm1hdGlvbi5hdFBhcmFncmFwaCA9IGZhbHNlXG4gICAgdHJhbnNmb3JtYXRpb24uaW5QcmVmb3JtYXR0ZWRCbG9jayA9IGNvbnRleHQuZ2V0KCdwcmV2aW91c0luUHJlZm9ybWF0dGVkQmxvY2snKVxuICAgIHRyYW5zZm9ybWF0aW9uLmxlZnQgPSBjb250ZXh0LmdldCgncHJldmlvdXNMZWZ0JylcblxuICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNJblByZWZvcm1hdHRlZEJsb2NrJywgdHJhbnNmb3JtYXRpb24uaW5QcmVmb3JtYXR0ZWRCbG9jaylcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNMZWZ0JywgdHJhbnNmb3JtYXRpb24ubGVmdClcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHZhbHVlID0gJyAgICAnXG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5sZWZ0ICs9IHZhbHVlXG5cbiAgICBpZiAodHJhbnNmb3JtYXRpb24uYXRQYXJhZ3JhcGgpIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZCh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kUGFyYWdyYXBoKClcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVmb3JtYXR0ZWRQbHVnaW5cbiJdfQ==
