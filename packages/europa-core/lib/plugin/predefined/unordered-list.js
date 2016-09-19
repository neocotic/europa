'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnorderedListPlugin = undefined;

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
 * A {@link Plugin} which outputs an unordered list.
 *
 * @public
 * @extends {Plugin}
 */
var UnorderedListPlugin = function (_Plugin) {
  (0, _inherits3.default)(UnorderedListPlugin, _Plugin);

  function UnorderedListPlugin() {
    (0, _classCallCheck3.default)(this, UnorderedListPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (UnorderedListPlugin.__proto__ || (0, _getPrototypeOf2.default)(UnorderedListPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(UnorderedListPlugin, [{
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

      transformation.inOrderedList = false;
      transformation.listIndex = 1;
      transformation.listDepth++;

      return true;
    }
  }]);
  return UnorderedListPlugin;
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

exports.UnorderedListPlugin = UnorderedListPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC91bm9yZGVyZWQtbGlzdC5qcyJdLCJuYW1lcyI6WyJVbm9yZGVyZWRMaXN0UGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiaW5PcmRlcmVkTGlzdCIsImdldCIsImxpc3RJbmRleCIsImxpc3REZXB0aCIsInNldCIsImFwcGVuZFBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7O0FBRUE7Ozs7OztJQU1NQSxtQjs7Ozs7Ozs7Ozs7O0FBRUo7OzswQkFHTUMsYyxFQUFnQkMsTyxFQUFTO0FBQzdCRCxxQkFBZUUsYUFBZixHQUErQkQsUUFBUUUsR0FBUixDQUFZLHVCQUFaLENBQS9CO0FBQ0FILHFCQUFlSSxTQUFmLEdBQTJCSCxRQUFRRSxHQUFSLENBQVksbUJBQVosQ0FBM0I7QUFDQUgscUJBQWVLLFNBQWY7QUFDRDs7QUFFRDs7Ozs7OzJCQUdPTCxjLEVBQWdCQyxPLEVBQVM7QUFDOUJBLGNBQVFLLEdBQVIsQ0FBWSx1QkFBWixFQUFxQ04sZUFBZUUsYUFBcEQ7QUFDQUQsY0FBUUssR0FBUixDQUFZLG1CQUFaLEVBQWlDTixlQUFlSSxTQUFoRDtBQUNEOztBQUVEOzs7Ozs7OEJBR1VKLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFJRCxlQUFlSyxTQUFmLEtBQTZCLENBQWpDLEVBQW9DO0FBQ2xDTCx1QkFBZU8sZUFBZjtBQUNEOztBQUVEUCxxQkFBZUUsYUFBZixHQUErQixLQUEvQjtBQUNBRixxQkFBZUksU0FBZixHQUEyQixDQUEzQjtBQUNBSixxQkFBZUssU0FBZjs7QUFFQSxhQUFPLElBQVA7QUFDRDs7O21CQTlESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWtFU04sbUIsR0FBQUEsbUIiLCJmaWxlIjoidW5vcmRlcmVkLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIG91dHB1dHMgYW4gdW5vcmRlcmVkIGxpc3QuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgVW5vcmRlcmVkTGlzdFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbi5pbk9yZGVyZWRMaXN0ID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzSW5PcmRlcmVkTGlzdCcpXG4gICAgdHJhbnNmb3JtYXRpb24ubGlzdEluZGV4ID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzTGlzdEluZGV4JylcbiAgICB0cmFuc2Zvcm1hdGlvbi5saXN0RGVwdGgtLVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzSW5PcmRlcmVkTGlzdCcsIHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QpXG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzTGlzdEluZGV4JywgdHJhbnNmb3JtYXRpb24ubGlzdEluZGV4KVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKHRyYW5zZm9ybWF0aW9uLmxpc3REZXB0aCA9PT0gMCkge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kUGFyYWdyYXBoKClcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5pbk9yZGVyZWRMaXN0ID0gZmFsc2VcbiAgICB0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXggPSAxXG4gICAgdHJhbnNmb3JtYXRpb24ubGlzdERlcHRoKytcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG5leHBvcnQgeyBVbm9yZGVyZWRMaXN0UGx1Z2luIH1cbiJdfQ==
