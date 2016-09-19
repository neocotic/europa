'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderedListPlugin = undefined;

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
 * A {@link Plugin} which outputs an ordered list.
 *
 * @public
 * @extends {Plugin}
 */
var OrderedListPlugin = function (_Plugin) {
  (0, _inherits3.default)(OrderedListPlugin, _Plugin);

  function OrderedListPlugin() {
    (0, _classCallCheck3.default)(this, OrderedListPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (OrderedListPlugin.__proto__ || (0, _getPrototypeOf2.default)(OrderedListPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(OrderedListPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.inOrderedList = context.get('previousInOrderedList');
      transformation.listIndex = context.get('previousListIndex');
      transformation.listDepth--;
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousInOrderedList', transformation.inOrderedList);
      context.set('previousListIndex', transformation.listIndex);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      if (transformation.listDepth === 0) {
        transformation.appendParagraph();
      }

      transformation.inOrderedList = true;
      transformation.listIndex = 1;
      transformation.listDepth++;

      return true;
    }
  }]);
  return OrderedListPlugin;
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

exports.OrderedListPlugin = OrderedListPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9vcmRlcmVkLWxpc3QuanMiXSwibmFtZXMiOlsiT3JkZXJlZExpc3RQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJpbk9yZGVyZWRMaXN0IiwiZ2V0IiwibGlzdEluZGV4IiwibGlzdERlcHRoIiwic2V0IiwiYXBwZW5kUGFyYWdyYXBoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7QUFFQTs7Ozs7O0lBTU1BLGlCOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0JELHFCQUFlRSxhQUFmLEdBQStCRCxRQUFRRSxHQUFSLENBQVksdUJBQVosQ0FBL0I7QUFDQUgscUJBQWVJLFNBQWYsR0FBMkJILFFBQVFFLEdBQVIsQ0FBWSxtQkFBWixDQUEzQjtBQUNBSCxxQkFBZUssU0FBZjtBQUNEOztBQUVEOzs7Ozs7MkJBR09MLGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUUssR0FBUixDQUFZLHVCQUFaLEVBQXFDTixlQUFlRSxhQUFwRDtBQUNBRCxjQUFRSyxHQUFSLENBQVksbUJBQVosRUFBaUNOLGVBQWVJLFNBQWhEO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHVUosYyxFQUFnQkMsTyxFQUFTO0FBQ2pDLFVBQUlELGVBQWVLLFNBQWYsS0FBNkIsQ0FBakMsRUFBb0M7QUFDbENMLHVCQUFlTyxlQUFmO0FBQ0Q7O0FBRURQLHFCQUFlRSxhQUFmLEdBQStCLElBQS9CO0FBQ0FGLHFCQUFlSSxTQUFmLEdBQTJCLENBQTNCO0FBQ0FKLHFCQUFlSyxTQUFmOztBQUVBLGFBQU8sSUFBUDtBQUNEOzs7bUJBOURIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBa0VTTixpQixHQUFBQSxpQiIsImZpbGUiOiJvcmRlcmVkLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIG91dHB1dHMgYW4gb3JkZXJlZCBsaXN0LlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIE9yZGVyZWRMaXN0UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPSBjb250ZXh0LmdldCgncHJldmlvdXNJbk9yZGVyZWRMaXN0JylcbiAgICB0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXggPSBjb250ZXh0LmdldCgncHJldmlvdXNMaXN0SW5kZXgnKVxuICAgIHRyYW5zZm9ybWF0aW9uLmxpc3REZXB0aC0tXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNJbk9yZGVyZWRMaXN0JywgdHJhbnNmb3JtYXRpb24uaW5PcmRlcmVkTGlzdClcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNMaXN0SW5kZXgnLCB0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXgpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBpZiAodHJhbnNmb3JtYXRpb24ubGlzdERlcHRoID09PSAwKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPSB0cnVlXG4gICAgdHJhbnNmb3JtYXRpb24ubGlzdEluZGV4ID0gMVxuICAgIHRyYW5zZm9ybWF0aW9uLmxpc3REZXB0aCsrXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbn1cblxuZXhwb3J0IHsgT3JkZXJlZExpc3RQbHVnaW4gfVxuIl19
