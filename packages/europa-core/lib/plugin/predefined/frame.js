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

exports.default = FramePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9mcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZVBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCIsInNraXBDaGlsZHJlbiIsImdldCIsIndpbmRvdyIsInNldCIsImVsZW1lbnQiLCJjb250ZW50V2luZG93IiwidHJhbnNmb3JtZXIiLCJ0cmFuc2Zvcm1FbGVtZW50IiwiZG9jdW1lbnQiLCJib2R5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxXOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0JELHFCQUFlRSxZQUFmLEdBQThCRCxRQUFRRSxHQUFSLENBQVksc0JBQVosQ0FBOUI7QUFDQUgscUJBQWVJLE1BQWYsR0FBd0JILFFBQVFFLEdBQVIsQ0FBWSxnQkFBWixDQUF4QjtBQUNEOztBQUVEOzs7Ozs7MkJBR09ILGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUUksR0FBUixDQUFZLHNCQUFaLEVBQW9DTCxlQUFlRSxZQUFuRDtBQUNBRCxjQUFRSSxHQUFSLENBQVksZ0JBQVosRUFBOEJMLGVBQWVJLE1BQTdDO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHVUosYyxFQUFnQkMsTyxFQUFTO0FBQ2pDLFVBQU1HLFNBQVNKLGVBQWVNLE9BQWYsQ0FBdUJDLGFBQXRDOztBQUVBUCxxQkFBZUUsWUFBZixHQUE4QixJQUE5Qjs7QUFFQSxVQUFJRSxNQUFKLEVBQVk7QUFDVkosdUJBQWVJLE1BQWYsR0FBd0JBLE1BQXhCOztBQUVBSix1QkFBZVEsV0FBZixDQUEyQkMsZ0JBQTNCLENBQTRDTCxPQUFPTSxRQUFQLENBQWdCQyxJQUE1RCxFQUFrRVgsY0FBbEU7QUFDRDtBQUNGOzs7cUJBL0RIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztrQkE2Q2VELFciLCJmaWxlIjoiZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIG91dHB1dHMgdGhlIGNvbnRlbnRzIG9mIG5lc3RlZCBmcmFtZS5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBGcmFtZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbi5za2lwQ2hpbGRyZW4gPSBjb250ZXh0LmdldCgncHJldmlvdXNTa2lwQ2hpbGRyZW4nKVxuICAgIHRyYW5zZm9ybWF0aW9uLndpbmRvdyA9IGNvbnRleHQuZ2V0KCdwcmV2aW91c1dpbmRvdycpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNTa2lwQ2hpbGRyZW4nLCB0cmFuc2Zvcm1hdGlvbi5za2lwQ2hpbGRyZW4pXG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzV2luZG93JywgdHJhbnNmb3JtYXRpb24ud2luZG93KVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29uc3Qgd2luZG93ID0gdHJhbnNmb3JtYXRpb24uZWxlbWVudC5jb250ZW50V2luZG93XG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5za2lwQ2hpbGRyZW4gPSB0cnVlXG5cbiAgICBpZiAod2luZG93KSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi53aW5kb3cgPSB3aW5kb3dcblxuICAgICAgdHJhbnNmb3JtYXRpb24udHJhbnNmb3JtZXIudHJhbnNmb3JtRWxlbWVudCh3aW5kb3cuZG9jdW1lbnQuYm9keSwgdHJhbnNmb3JtYXRpb24pXG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRnJhbWVQbHVnaW5cbiJdfQ==
