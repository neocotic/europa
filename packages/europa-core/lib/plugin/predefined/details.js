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
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.skipChildren = context.get('previousSkipChildren');
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousSkipChildren', transformation.skipChildren);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var element = transformation.element;


      transformation.appendParagraph();

      if (!element.hasAttribute('open')) {
        transformation.skipChildren = true;

        var summary = element.querySelector('summary');
        transformation.transformer.transformElement(summary, transformation);
      }
    }
  }]);
  return DetailsPlugin;
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

exports.default = DetailsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9kZXRhaWxzLmpzIl0sIm5hbWVzIjpbIkRldGFpbHNQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJza2lwQ2hpbGRyZW4iLCJnZXQiLCJzZXQiLCJlbGVtZW50IiwiYXBwZW5kUGFyYWdyYXBoIiwiaGFzQXR0cmlidXRlIiwic3VtbWFyeSIsInF1ZXJ5U2VsZWN0b3IiLCJ0cmFuc2Zvcm1lciIsInRyYW5zZm9ybUVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOzs7Ozs7QUFFQTs7Ozs7Ozs7O0lBU01BLGE7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QkQscUJBQWVFLFlBQWYsR0FBOEJELFFBQVFFLEdBQVIsQ0FBWSxzQkFBWixDQUE5QjtBQUNEOztBQUVEOzs7Ozs7MkJBR09ILGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUUcsR0FBUixDQUFZLHNCQUFaLEVBQW9DSixlQUFlRSxZQUFuRDtBQUNEOztBQUVEOzs7Ozs7OEJBR1VGLGMsRUFBZ0JDLE8sRUFBUztBQUFBLFVBQ3pCSSxPQUR5QixHQUNiTCxjQURhLENBQ3pCSyxPQUR5Qjs7O0FBR2pDTCxxQkFBZU0sZUFBZjs7QUFFQSxVQUFJLENBQUNELFFBQVFFLFlBQVIsQ0FBcUIsTUFBckIsQ0FBTCxFQUFtQztBQUNqQ1AsdUJBQWVFLFlBQWYsR0FBOEIsSUFBOUI7O0FBRUEsWUFBTU0sVUFBVUgsUUFBUUksYUFBUixDQUFzQixTQUF0QixDQUFoQjtBQUNBVCx1QkFBZVUsV0FBZixDQUEyQkMsZ0JBQTNCLENBQTRDSCxPQUE1QyxFQUFxRFIsY0FBckQ7QUFDRDtBQUNGOzs7cUJBakVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztrQkErQ2VELGEiLCJmaWxlIjoiZGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5cbmltcG9ydCBQbHVnaW4gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhIGRldGFpbHMgc2VjdGlvbi5cbiAqXG4gKiBJZiB0aGUgZGV0YWlscyBoYXMgYW4gPGNvZGU+b3BlbjwvY29kZT4gYXR0cmlidXRlIHRoZW4gYWxsIG9mIGl0cyBjaGlsZHJlbiBhcmUgdHJhbnNmb3JtZWQuIE90aGVyd2lzZSwgb25seSB0aGVcbiAqIG5lc3RlZCA8Y29kZT5zdW1tYXJ5PC9jb2RlPiwgaWYgYW55LCB3aWxsIGJlIHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIERldGFpbHNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzU2tpcENoaWxkcmVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c1NraXBDaGlsZHJlbicsIHRyYW5zZm9ybWF0aW9uLnNraXBDaGlsZHJlbilcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdHJhbnNmb3JtYXRpb25cblxuICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG5cbiAgICBpZiAoIWVsZW1lbnQuaGFzQXR0cmlidXRlKCdvcGVuJykpIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLnNraXBDaGlsZHJlbiA9IHRydWVcblxuICAgICAgY29uc3Qgc3VtbWFyeSA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc3VtbWFyeScpXG4gICAgICB0cmFuc2Zvcm1hdGlvbi50cmFuc2Zvcm1lci50cmFuc2Zvcm1FbGVtZW50KHN1bW1hcnksIHRyYW5zZm9ybWF0aW9uKVxuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNQbHVnaW5cbiJdfQ==
