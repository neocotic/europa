'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsPlugin = undefined;

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
 * A {@link Plugin} which outputs a details section.
 *
 * If the details has an <code>open</code> attribute then all of its children are transformed. Otherwise, only the
 * nested <code>summary</code>, if any, will be transformed.
 *
 * @public
 * @extends {Plugin}
 */
var DetailsPlugin = function (_Plugin) {
  (0, _inherits3.default)(DetailsPlugin, _Plugin);

  function DetailsPlugin() {
    (0, _classCallCheck3.default)(this, DetailsPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (DetailsPlugin.__proto__ || (0, _getPrototypeOf2.default)(DetailsPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(DetailsPlugin, [{
    key: 'transform',


    /**
     * @override
     */
    value: function transform(transformation, context) {
      var element = transformation.element;


      transformation.appendParagraph();

      if (element.hasAttribute('open')) {
        return true;
      }

      var summary = element.querySelector('summary');
      transformation.transformer.transformElement(summary, transformation);

      return false;
    }
  }]);
  return DetailsPlugin;
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

exports.DetailsPlugin = DetailsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9kZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkRldGFpbHNQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJlbGVtZW50IiwiYXBwZW5kUGFyYWdyYXBoIiwiaGFzQXR0cmlidXRlIiwic3VtbWFyeSIsInF1ZXJ5U2VsZWN0b3IiLCJ0cmFuc2Zvcm1lciIsInRyYW5zZm9ybUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7Ozs7Ozs7SUFTTUEsYTs7Ozs7Ozs7Ozs7O0FBRUo7Ozs4QkFHVUMsYyxFQUFnQkMsTyxFQUFTO0FBQUEsVUFDekJDLE9BRHlCLEdBQ2JGLGNBRGEsQ0FDekJFLE9BRHlCOzs7QUFHakNGLHFCQUFlRyxlQUFmOztBQUVBLFVBQUlELFFBQVFFLFlBQVIsQ0FBcUIsTUFBckIsQ0FBSixFQUFrQztBQUNoQyxlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFNQyxVQUFVSCxRQUFRSSxhQUFSLENBQXNCLFNBQXRCLENBQWhCO0FBQ0FOLHFCQUFlTyxXQUFmLENBQTJCQyxnQkFBM0IsQ0FBNENILE9BQTVDLEVBQXFETCxjQUFyRDs7QUFFQSxhQUFPLEtBQVA7QUFDRDs7O21CQW5ESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXVEU0QsYSxHQUFBQSxhIiwiZmlsZSI6ImRldGFpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIG91dHB1dHMgYSBkZXRhaWxzIHNlY3Rpb24uXG4gKlxuICogSWYgdGhlIGRldGFpbHMgaGFzIGFuIDxjb2RlPm9wZW48L2NvZGU+IGF0dHJpYnV0ZSB0aGVuIGFsbCBvZiBpdHMgY2hpbGRyZW4gYXJlIHRyYW5zZm9ybWVkLiBPdGhlcndpc2UsIG9ubHkgdGhlXG4gKiBuZXN0ZWQgPGNvZGU+c3VtbWFyeTwvY29kZT4sIGlmIGFueSwgd2lsbCBiZSB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBEZXRhaWxzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB7IGVsZW1lbnQgfSA9IHRyYW5zZm9ybWF0aW9uXG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuXG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdvcGVuJykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3Qgc3VtbWFyeSA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3VtbWFyeScpXG4gICAgdHJhbnNmb3JtYXRpb24udHJhbnNmb3JtZXIudHJhbnNmb3JtRWxlbWVudChzdW1tYXJ5LCB0cmFuc2Zvcm1hdGlvbilcblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbn1cblxuZXhwb3J0IHsgRGV0YWlsc1BsdWdpbiB9XG4iXX0=
