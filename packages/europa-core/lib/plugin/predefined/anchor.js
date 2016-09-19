'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnchorPlugin = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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
 * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
 * text.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>href</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
 * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
 * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
 *
 * @public
 * @extends {Plugin}
 */
var AnchorPlugin = function (_Plugin) {
  (0, _inherits3.default)(AnchorPlugin, _Plugin);

  function AnchorPlugin() {
    (0, _classCallCheck3.default)(this, AnchorPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (AnchorPlugin.__proto__ || (0, _getPrototypeOf2.default)(AnchorPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(AnchorPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      if (context.has('value')) {
        transformation.output(']' + context.get('value'));
      }
    }

    /**
     * @override
     */

  }, {
    key: 'afterAll',
    value: function afterAll(transformation) {
      var anchors = transformation.context.get('anchors');
      if (!anchors.length) {
        return;
      }

      transformation.append('\n\n');

      for (var i = 0; i < anchors.length; i++) {
        transformation.append('[anchor' + i + ']: ' + anchors[i] + '\n');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(transformation) {
      transformation.context.set('anchorMap', new _map2.default());
      transformation.context.set('anchors', []);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var element = transformation.element;
      var options = transformation.options;

      var href = options.absolute ? element.href : element.getAttribute('href');
      if (!href) {
        return true;
      }

      var title = element.getAttribute('title');
      var value = title ? href + ' "' + title + '"' : href;

      if (options.inline) {
        context.set('value', '(' + value + ')');
      } else {
        var anchorMap = transformation.context.get('anchorMap');
        var anchors = transformation.context.get('anchors');
        var index = anchorMap.get(value);
        if (index == null) {
          index = anchors.push(value) - 1;

          anchorMap.set(value, index);
        }

        context.set('value', '[anchor' + index + ']');
      }

      transformation.output('[');

      transformation.atNoWhiteSpace = true;

      return true;
    }
  }]);
  return AnchorPlugin;
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

exports.AnchorPlugin = AnchorPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9hbmNob3IuanMiXSwibmFtZXMiOlsiQW5jaG9yUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiaGFzIiwib3V0cHV0IiwiZ2V0IiwiYW5jaG9ycyIsImxlbmd0aCIsImFwcGVuZCIsImkiLCJzZXQiLCJlbGVtZW50Iiwib3B0aW9ucyIsImhyZWYiLCJhYnNvbHV0ZSIsImdldEF0dHJpYnV0ZSIsInRpdGxlIiwidmFsdWUiLCJpbmxpbmUiLCJhbmNob3JNYXAiLCJpbmRleCIsInB1c2giLCJhdE5vV2hpdGVTcGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQWNNQSxZOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0IsVUFBSUEsUUFBUUMsR0FBUixDQUFZLE9BQVosQ0FBSixFQUEwQjtBQUN4QkYsdUJBQWVHLE1BQWYsT0FBMEJGLFFBQVFHLEdBQVIsQ0FBWSxPQUFaLENBQTFCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OzZCQUdTSixjLEVBQWdCO0FBQ3ZCLFVBQU1LLFVBQVVMLGVBQWVDLE9BQWYsQ0FBdUJHLEdBQXZCLENBQTJCLFNBQTNCLENBQWhCO0FBQ0EsVUFBSSxDQUFDQyxRQUFRQyxNQUFiLEVBQXFCO0FBQ25CO0FBQ0Q7O0FBRUROLHFCQUFlTyxNQUFmLENBQXNCLE1BQXRCOztBQUVBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxRQUFRQyxNQUE1QixFQUFvQ0UsR0FBcEMsRUFBeUM7QUFDdkNSLHVCQUFlTyxNQUFmLGFBQWdDQyxDQUFoQyxXQUF1Q0gsUUFBUUcsQ0FBUixDQUF2QztBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs4QkFHVVIsYyxFQUFnQjtBQUN4QkEscUJBQWVDLE9BQWYsQ0FBdUJRLEdBQXZCLENBQTJCLFdBQTNCLEVBQXdDLG1CQUF4QztBQUNBVCxxQkFBZUMsT0FBZixDQUF1QlEsR0FBdkIsQ0FBMkIsU0FBM0IsRUFBc0MsRUFBdEM7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVVCxjLEVBQWdCQyxPLEVBQVM7QUFBQSxVQUN6QlMsT0FEeUIsR0FDSlYsY0FESSxDQUN6QlUsT0FEeUI7QUFBQSxVQUNoQkMsT0FEZ0IsR0FDSlgsY0FESSxDQUNoQlcsT0FEZ0I7O0FBRWpDLFVBQU1DLE9BQU9ELFFBQVFFLFFBQVIsR0FBbUJILFFBQVFFLElBQTNCLEdBQWtDRixRQUFRSSxZQUFSLENBQXFCLE1BQXJCLENBQS9DO0FBQ0EsVUFBSSxDQUFDRixJQUFMLEVBQVc7QUFDVCxlQUFPLElBQVA7QUFDRDs7QUFFRCxVQUFNRyxRQUFRTCxRQUFRSSxZQUFSLENBQXFCLE9BQXJCLENBQWQ7QUFDQSxVQUFNRSxRQUFRRCxRQUFXSCxJQUFYLFVBQW9CRyxLQUFwQixTQUErQkgsSUFBN0M7O0FBRUEsVUFBSUQsUUFBUU0sTUFBWixFQUFvQjtBQUNsQmhCLGdCQUFRUSxHQUFSLENBQVksT0FBWixRQUF5Qk8sS0FBekI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFNRSxZQUFZbEIsZUFBZUMsT0FBZixDQUF1QkcsR0FBdkIsQ0FBMkIsV0FBM0IsQ0FBbEI7QUFDQSxZQUFNQyxVQUFVTCxlQUFlQyxPQUFmLENBQXVCRyxHQUF2QixDQUEyQixTQUEzQixDQUFoQjtBQUNBLFlBQUllLFFBQVFELFVBQVVkLEdBQVYsQ0FBY1ksS0FBZCxDQUFaO0FBQ0EsWUFBSUcsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCQSxrQkFBUWQsUUFBUWUsSUFBUixDQUFhSixLQUFiLElBQXNCLENBQTlCOztBQUVBRSxvQkFBVVQsR0FBVixDQUFjTyxLQUFkLEVBQXFCRyxLQUFyQjtBQUNEOztBQUVEbEIsZ0JBQVFRLEdBQVIsQ0FBWSxPQUFaLGNBQStCVSxLQUEvQjtBQUNEOztBQUVEbkIscUJBQWVHLE1BQWYsQ0FBc0IsR0FBdEI7O0FBRUFILHFCQUFlcUIsY0FBZixHQUFnQyxJQUFoQzs7QUFFQSxhQUFPLElBQVA7QUFDRDs7O21CQTFHSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQThHU3RCLFksR0FBQUEsWSIsImZpbGUiOiJhbmNob3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4uL3BsdWdpbidcblxuLyoqXG4gKiBBIHtAbGluayBQbHVnaW59IHdoaWNoIGV4dHJhY3RzIHRoZSBVUkwgZnJvbSBhbiBhbmNob3IuIEFuY2hvcnMgd2l0aG91dCBhbiA8Y29kZT5ocmVmPC9jb2RlPiBhcmUgdHJlYXRlZCBhcyBwbGFpblxuICogdGV4dC5cbiAqXG4gKiBJZiB0aGUgPGNvZGU+YWJzb2x1dGU8L2NvZGU+IG9wdGlvbiBpcyBlbmFibGVkLCB0aGVuIHRoZSBVUkwgZXh0cmFjdGVkIGZyb20gdGhlIGFuY2hvciB3aWxsIGJlIGFic29sdXRlLiBPdGhlcndpc2UsXG4gKiB0aGUgVVJMIHdpbGwgYmUgZXhhY3RseSBhcyBpdCBpcyBpbiB0aGUgPGNvZGU+aHJlZjwvY29kZT4gYXR0cmlidXRlLlxuICpcbiAqIElmIHRoZSA8Y29kZT5pbmxpbmU8L2NvZGU+IG9wdGlvbiBpcyBlbmFibGVkLCB0aGVuIHRoZSBVUkwgKGFuZCBhbnkgPGNvZGU+dGl0bGU8L2NvZGU+IG9uIHRoZSBhbmNob3IpIHdpbGwgYmVcbiAqIGluc2VydGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBhbmNob3IgY29udGVudHMgKGUuZy4gPGNvZGU+W2Zvb10oL2Jhcik8L2NvZGU+KS4gT3RoZXJ3aXNlLCBhbGwgdW5pcXVlIFVSTCBhbmQgdGl0bGVcbiAqIGNvbWJpbmF0aW9ucyB3aWxsIGJlIGluZGV4ZWQgKGUuZy4gPGNvZGU+W2Zvb11bYW5jaG9yMF08L2NvZGU+KSBhbmQgdGhlIHJlZmVyZW5jZXMgd2lsbCBiZSBvdXRwdXQgYXQgdGhlIHZlcnkgZW5kLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIEFuY2hvclBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBpZiAoY29udGV4dC5oYXMoJ3ZhbHVlJykpIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dChgXSR7Y29udGV4dC5nZXQoJ3ZhbHVlJyl9YClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlckFsbCh0cmFuc2Zvcm1hdGlvbikge1xuICAgIGNvbnN0IGFuY2hvcnMgPSB0cmFuc2Zvcm1hdGlvbi5jb250ZXh0LmdldCgnYW5jaG9ycycpXG4gICAgaWYgKCFhbmNob3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKCdcXG5cXG4nKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmNob3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoYFthbmNob3Ike2l9XTogJHthbmNob3JzW2ldfVxcbmApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlQWxsKHRyYW5zZm9ybWF0aW9uKSB7XG4gICAgdHJhbnNmb3JtYXRpb24uY29udGV4dC5zZXQoJ2FuY2hvck1hcCcsIG5ldyBNYXAoKSlcbiAgICB0cmFuc2Zvcm1hdGlvbi5jb250ZXh0LnNldCgnYW5jaG9ycycsIFtdKVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29uc3QgeyBlbGVtZW50LCBvcHRpb25zIH0gPSB0cmFuc2Zvcm1hdGlvblxuICAgIGNvbnN0IGhyZWYgPSBvcHRpb25zLmFic29sdXRlID8gZWxlbWVudC5ocmVmIDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgIGlmICghaHJlZikge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCB0aXRsZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpXG4gICAgY29uc3QgdmFsdWUgPSB0aXRsZSA/IGAke2hyZWZ9IFwiJHt0aXRsZX1cImAgOiBocmVmXG5cbiAgICBpZiAob3B0aW9ucy5pbmxpbmUpIHtcbiAgICAgIGNvbnRleHQuc2V0KCd2YWx1ZScsIGAoJHt2YWx1ZX0pYClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYW5jaG9yTWFwID0gdHJhbnNmb3JtYXRpb24uY29udGV4dC5nZXQoJ2FuY2hvck1hcCcpXG4gICAgICBjb25zdCBhbmNob3JzID0gdHJhbnNmb3JtYXRpb24uY29udGV4dC5nZXQoJ2FuY2hvcnMnKVxuICAgICAgbGV0IGluZGV4ID0gYW5jaG9yTWFwLmdldCh2YWx1ZSlcbiAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGluZGV4ID0gYW5jaG9ycy5wdXNoKHZhbHVlKSAtIDFcblxuICAgICAgICBhbmNob3JNYXAuc2V0KHZhbHVlLCBpbmRleClcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5zZXQoJ3ZhbHVlJywgYFthbmNob3Ike2luZGV4fV1gKVxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCgnWycpXG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hdE5vV2hpdGVTcGFjZSA9IHRydWVcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG5leHBvcnQgeyBBbmNob3JQbHVnaW4gfVxuIl19
