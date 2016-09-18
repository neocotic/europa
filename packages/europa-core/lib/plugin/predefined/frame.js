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
      transformation.skipChildren = context.get('previousSkipChildren');
      transformation.window = context.get('previousWindow');
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousSkipChildren', transformation.skipChildren);
      context.set('previousWindow', transformation.window);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var window = transformation.element.contentWindow;

      transformation.skipChildren = true;

      if (window) {
        transformation.window = window;

        transformation.transformer.transformElement(window.document.body, transformation);
      }
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

/* eslint no-unused-vars: "off" */

exports.FramePlugin = FramePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9mcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZVBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCIsInNraXBDaGlsZHJlbiIsImdldCIsIndpbmRvdyIsInNldCIsImVsZW1lbnQiLCJjb250ZW50V2luZG93IiwidHJhbnNmb3JtZXIiLCJ0cmFuc2Zvcm1FbGVtZW50IiwiZG9jdW1lbnQiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7QUFFQTs7Ozs7O0lBTU1BLFc7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QkQscUJBQWVFLFlBQWYsR0FBOEJELFFBQVFFLEdBQVIsQ0FBWSxzQkFBWixDQUE5QjtBQUNBSCxxQkFBZUksTUFBZixHQUF3QkgsUUFBUUUsR0FBUixDQUFZLGdCQUFaLENBQXhCO0FBQ0Q7O0FBRUQ7Ozs7OzsyQkFHT0gsYyxFQUFnQkMsTyxFQUFTO0FBQzlCQSxjQUFRSSxHQUFSLENBQVksc0JBQVosRUFBb0NMLGVBQWVFLFlBQW5EO0FBQ0FELGNBQVFJLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkwsZUFBZUksTUFBN0M7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVSixjLEVBQWdCQyxPLEVBQVM7QUFDakMsVUFBTUcsU0FBU0osZUFBZU0sT0FBZixDQUF1QkMsYUFBdEM7O0FBRUFQLHFCQUFlRSxZQUFmLEdBQThCLElBQTlCOztBQUVBLFVBQUlFLE1BQUosRUFBWTtBQUNWSix1QkFBZUksTUFBZixHQUF3QkEsTUFBeEI7O0FBRUFKLHVCQUFlUSxXQUFmLENBQTJCQyxnQkFBM0IsQ0FBNENMLE9BQU9NLFFBQVAsQ0FBZ0JDLElBQTVELEVBQWtFWCxjQUFsRTtBQUNEO0FBQ0Y7OzttQkEvREg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7O1FBNkNTRCxXLEdBQUFBLFciLCJmaWxlIjoiZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuXG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBvdXRwdXRzIHRoZSBjb250ZW50cyBvZiBuZXN0ZWQgZnJhbWUuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgRnJhbWVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzU2tpcENoaWxkcmVuJylcbiAgICB0cmFuc2Zvcm1hdGlvbi53aW5kb3cgPSBjb250ZXh0LmdldCgncHJldmlvdXNXaW5kb3cnKVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzU2tpcENoaWxkcmVuJywgdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuKVxuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c1dpbmRvdycsIHRyYW5zZm9ybWF0aW9uLndpbmRvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHdpbmRvdyA9IHRyYW5zZm9ybWF0aW9uLmVsZW1lbnQuY29udGVudFdpbmRvd1xuXG4gICAgdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuID0gdHJ1ZVxuXG4gICAgaWYgKHdpbmRvdykge1xuICAgICAgdHJhbnNmb3JtYXRpb24ud2luZG93ID0gd2luZG93XG5cbiAgICAgIHRyYW5zZm9ybWF0aW9uLnRyYW5zZm9ybWVyLnRyYW5zZm9ybUVsZW1lbnQod2luZG93LmRvY3VtZW50LmJvZHksIHRyYW5zZm9ybWF0aW9uKVxuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCB7IEZyYW1lUGx1Z2luIH1cbiJdfQ==
