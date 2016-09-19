'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockQuotePlugin = undefined;

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
 * A {@link Plugin} which outputs the contents in a block quote.
 *
 * @public
 * @extends {Plugin}
 */
var BlockQuotePlugin = function (_Plugin) {
  (0, _inherits3.default)(BlockQuotePlugin, _Plugin);

  function BlockQuotePlugin() {
    (0, _classCallCheck3.default)(this, BlockQuotePlugin);
    return (0, _possibleConstructorReturn3.default)(this, (BlockQuotePlugin.__proto__ || (0, _getPrototypeOf2.default)(BlockQuotePlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(BlockQuotePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.atLeft = false;
      transformation.atParagraph = false;
      transformation.left = context.get('previousLeft');

      transformation.appendParagraph();
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousLeft', transformation.left);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var value = '> ';

      transformation.left += value;

      if (transformation.atParagraph) {
        transformation.append(value);
      } else {
        transformation.appendParagraph();
      }

      return true;
    }
  }]);
  return BlockQuotePlugin;
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

exports.BlockQuotePlugin = BlockQuotePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9ibG9jay1xdW90ZS5qcyJdLCJuYW1lcyI6WyJCbG9ja1F1b3RlUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiYXRMZWZ0IiwiYXRQYXJhZ3JhcGgiLCJsZWZ0IiwiZ2V0IiwiYXBwZW5kUGFyYWdyYXBoIiwic2V0IiwidmFsdWUiLCJhcHBlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7Ozs7SUFNTUEsZ0I7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QkQscUJBQWVFLE1BQWYsR0FBd0IsS0FBeEI7QUFDQUYscUJBQWVHLFdBQWYsR0FBNkIsS0FBN0I7QUFDQUgscUJBQWVJLElBQWYsR0FBc0JILFFBQVFJLEdBQVIsQ0FBWSxjQUFaLENBQXRCOztBQUVBTCxxQkFBZU0sZUFBZjtBQUNEOztBQUVEOzs7Ozs7MkJBR09OLGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUU0sR0FBUixDQUFZLGNBQVosRUFBNEJQLGVBQWVJLElBQTNDO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHVUosYyxFQUFnQkMsTyxFQUFTO0FBQ2pDLFVBQU1PLFFBQVEsSUFBZDs7QUFFQVIscUJBQWVJLElBQWYsSUFBdUJJLEtBQXZCOztBQUVBLFVBQUlSLGVBQWVHLFdBQW5CLEVBQWdDO0FBQzlCSCx1QkFBZVMsTUFBZixDQUFzQkQsS0FBdEI7QUFDRCxPQUZELE1BRU87QUFDTFIsdUJBQWVNLGVBQWY7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7O21CQWpFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFFU1AsZ0IsR0FBQUEsZ0IiLCJmaWxlIjoiYmxvY2stcXVvdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIG91dHB1dHMgdGhlIGNvbnRlbnRzIGluIGEgYmxvY2sgcXVvdGUuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgQmxvY2tRdW90ZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbi5hdExlZnQgPSBmYWxzZVxuICAgIHRyYW5zZm9ybWF0aW9uLmF0UGFyYWdyYXBoID0gZmFsc2VcbiAgICB0cmFuc2Zvcm1hdGlvbi5sZWZ0ID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzTGVmdCcpXG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzTGVmdCcsIHRyYW5zZm9ybWF0aW9uLmxlZnQpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB2YWx1ZSA9ICc+ICdcblxuICAgIHRyYW5zZm9ybWF0aW9uLmxlZnQgKz0gdmFsdWVcblxuICAgIGlmICh0cmFuc2Zvcm1hdGlvbi5hdFBhcmFncmFwaCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG5leHBvcnQgeyBCbG9ja1F1b3RlUGx1Z2luIH1cbiJdfQ==
