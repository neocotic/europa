'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FramePlugin = undefined;

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
 * A {@link Plugin} which outputs the contents of nested frame.
 *
 * @public
 * @extends {Plugin}
 */
var FramePlugin = function (_Plugin) {
  (0, _inherits3.default)(FramePlugin, _Plugin);

  function FramePlugin() {
    (0, _classCallCheck3.default)(this, FramePlugin);
    return (0, _possibleConstructorReturn3.default)(this, (FramePlugin.__proto__ || (0, _getPrototypeOf2.default)(FramePlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(FramePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.window = context.get('previousWindow');
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousWindow', transformation.window);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var window = transformation.element.contentWindow;

      if (window) {
        transformation.window = window;

        transformation.transformer.transformElement(window.document.body, transformation);
      }

      return false;
    }
  }]);
  return FramePlugin;
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

exports.FramePlugin = FramePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9mcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZVBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCIsIndpbmRvdyIsImdldCIsInNldCIsImVsZW1lbnQiLCJjb250ZW50V2luZG93IiwidHJhbnNmb3JtZXIiLCJ0cmFuc2Zvcm1FbGVtZW50IiwiZG9jdW1lbnQiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7QUFFQTs7Ozs7O0lBTU1BLFc7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QkQscUJBQWVFLE1BQWYsR0FBd0JELFFBQVFFLEdBQVIsQ0FBWSxnQkFBWixDQUF4QjtBQUNEOztBQUVEOzs7Ozs7MkJBR09ILGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUUcsR0FBUixDQUFZLGdCQUFaLEVBQThCSixlQUFlRSxNQUE3QztBQUNEOztBQUVEOzs7Ozs7OEJBR1VGLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFNQyxTQUFTRixlQUFlSyxPQUFmLENBQXVCQyxhQUF0Qzs7QUFFQSxVQUFJSixNQUFKLEVBQVk7QUFDVkYsdUJBQWVFLE1BQWYsR0FBd0JBLE1BQXhCOztBQUVBRix1QkFBZU8sV0FBZixDQUEyQkMsZ0JBQTNCLENBQTRDTixPQUFPTyxRQUFQLENBQWdCQyxJQUE1RCxFQUFrRVYsY0FBbEU7QUFDRDs7QUFFRCxhQUFPLEtBQVA7QUFDRDs7O21CQTNESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQStEU0QsVyxHQUFBQSxXIiwiZmlsZSI6ImZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBvdXRwdXRzIHRoZSBjb250ZW50cyBvZiBuZXN0ZWQgZnJhbWUuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgRnJhbWVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24ud2luZG93ID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzV2luZG93JylcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c1dpbmRvdycsIHRyYW5zZm9ybWF0aW9uLndpbmRvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHdpbmRvdyA9IHRyYW5zZm9ybWF0aW9uLmVsZW1lbnQuY29udGVudFdpbmRvd1xuXG4gICAgaWYgKHdpbmRvdykge1xuICAgICAgdHJhbnNmb3JtYXRpb24ud2luZG93ID0gd2luZG93XG5cbiAgICAgIHRyYW5zZm9ybWF0aW9uLnRyYW5zZm9ybWVyLnRyYW5zZm9ybUVsZW1lbnQod2luZG93LmRvY3VtZW50LmJvZHksIHRyYW5zZm9ybWF0aW9uKVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbn1cblxuZXhwb3J0IHsgRnJhbWVQbHVnaW4gfVxuIl19
