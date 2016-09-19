'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodePlugin = undefined;

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
 * A {@link Plugin} which outputs the contents in a code block.
 *
 * @public
 * @extends {Plugin}
 */
var CodePlugin = function (_Plugin) {
  (0, _inherits3.default)(CodePlugin, _Plugin);

  function CodePlugin() {
    (0, _classCallCheck3.default)(this, CodePlugin);
    return (0, _possibleConstructorReturn3.default)(this, (CodePlugin.__proto__ || (0, _getPrototypeOf2.default)(CodePlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(CodePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      if (!context.get('skipped')) {
        transformation.inCodeBlock = context.get('previousInCodeBlock');

        transformation.output('`');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousInCodeBlock', transformation.inCodeBlock);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      if (transformation.inPreformattedBlock) {
        context.set('skipped', true);
      } else {
        transformation.output('`');

        transformation.inCodeBlock = true;
      }

      return true;
    }
  }]);
  return CodePlugin;
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

exports.CodePlugin = CodePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9jb2RlLmpzIl0sIm5hbWVzIjpbIkNvZGVQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJnZXQiLCJpbkNvZGVCbG9jayIsIm91dHB1dCIsInNldCIsImluUHJlZm9ybWF0dGVkQmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7Ozs7SUFNTUEsVTs7Ozs7Ozs7Ozs7O0FBRUo7OzswQkFHTUMsYyxFQUFnQkMsTyxFQUFTO0FBQzdCLFVBQUksQ0FBQ0EsUUFBUUMsR0FBUixDQUFZLFNBQVosQ0FBTCxFQUE2QjtBQUMzQkYsdUJBQWVHLFdBQWYsR0FBNkJGLFFBQVFDLEdBQVIsQ0FBWSxxQkFBWixDQUE3Qjs7QUFFQUYsdUJBQWVJLE1BQWYsQ0FBc0IsR0FBdEI7QUFDRDtBQUNGOztBQUVEOzs7Ozs7MkJBR09KLGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUUksR0FBUixDQUFZLHFCQUFaLEVBQW1DTCxlQUFlRyxXQUFsRDtBQUNEOztBQUVEOzs7Ozs7OEJBR1VILGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFJRCxlQUFlTSxtQkFBbkIsRUFBd0M7QUFDdENMLGdCQUFRSSxHQUFSLENBQVksU0FBWixFQUF1QixJQUF2QjtBQUNELE9BRkQsTUFFTztBQUNMTCx1QkFBZUksTUFBZixDQUFzQixHQUF0Qjs7QUFFQUosdUJBQWVHLFdBQWYsR0FBNkIsSUFBN0I7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7O21CQS9ESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW1FU0osVSxHQUFBQSxVIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIG91dHB1dHMgdGhlIGNvbnRlbnRzIGluIGEgY29kZSBibG9jay5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBDb2RlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGlmICghY29udGV4dC5nZXQoJ3NraXBwZWQnKSkge1xuICAgICAgdHJhbnNmb3JtYXRpb24uaW5Db2RlQmxvY2sgPSBjb250ZXh0LmdldCgncHJldmlvdXNJbkNvZGVCbG9jaycpXG5cbiAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCgnYCcpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzSW5Db2RlQmxvY2snLCB0cmFuc2Zvcm1hdGlvbi5pbkNvZGVCbG9jaylcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGlmICh0cmFuc2Zvcm1hdGlvbi5pblByZWZvcm1hdHRlZEJsb2NrKSB7XG4gICAgICBjb250ZXh0LnNldCgnc2tpcHBlZCcsIHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCgnYCcpXG5cbiAgICAgIHRyYW5zZm9ybWF0aW9uLmluQ29kZUJsb2NrID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG5leHBvcnQgeyBDb2RlUGx1Z2luIH1cbiJdfQ==
