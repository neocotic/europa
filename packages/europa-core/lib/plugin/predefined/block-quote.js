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
    }
  }]);
  return BlockQuotePlugin;
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

exports.default = BlockQuotePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9ibG9jay1xdW90ZS5qcyJdLCJuYW1lcyI6WyJCbG9ja1F1b3RlUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiYXRMZWZ0IiwiYXRQYXJhZ3JhcGgiLCJsZWZ0IiwiZ2V0IiwiYXBwZW5kUGFyYWdyYXBoIiwic2V0IiwidmFsdWUiLCJhcHBlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOzs7Ozs7QUFFQTs7Ozs7O0lBTU1BLGdCOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0JELHFCQUFlRSxNQUFmLEdBQXdCLEtBQXhCO0FBQ0FGLHFCQUFlRyxXQUFmLEdBQTZCLEtBQTdCO0FBQ0FILHFCQUFlSSxJQUFmLEdBQXNCSCxRQUFRSSxHQUFSLENBQVksY0FBWixDQUF0Qjs7QUFFQUwscUJBQWVNLGVBQWY7QUFDRDs7QUFFRDs7Ozs7OzJCQUdPTixjLEVBQWdCQyxPLEVBQVM7QUFDOUJBLGNBQVFNLEdBQVIsQ0FBWSxjQUFaLEVBQTRCUCxlQUFlSSxJQUEzQztBQUNEOztBQUVEOzs7Ozs7OEJBR1VKLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFNTyxRQUFRLElBQWQ7O0FBRUFSLHFCQUFlSSxJQUFmLElBQXVCSSxLQUF2Qjs7QUFFQSxVQUFJUixlQUFlRyxXQUFuQixFQUFnQztBQUM5QkgsdUJBQWVTLE1BQWYsQ0FBc0JELEtBQXRCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xSLHVCQUFlTSxlQUFmO0FBQ0Q7QUFDRjs7O3FCQWpFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7a0JBK0NlUCxnQiIsImZpbGUiOiJibG9jay1xdW90ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5cbmltcG9ydCBQbHVnaW4gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyB0aGUgY29udGVudHMgaW4gYSBibG9jayBxdW90ZS5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBCbG9ja1F1b3RlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIHRyYW5zZm9ybWF0aW9uLmF0TGVmdCA9IGZhbHNlXG4gICAgdHJhbnNmb3JtYXRpb24uYXRQYXJhZ3JhcGggPSBmYWxzZVxuICAgIHRyYW5zZm9ybWF0aW9uLmxlZnQgPSBjb250ZXh0LmdldCgncHJldmlvdXNMZWZ0JylcblxuICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNMZWZ0JywgdHJhbnNmb3JtYXRpb24ubGVmdClcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHZhbHVlID0gJz4gJ1xuXG4gICAgdHJhbnNmb3JtYXRpb24ubGVmdCArPSB2YWx1ZVxuXG4gICAgaWYgKHRyYW5zZm9ybWF0aW9uLmF0UGFyYWdyYXBoKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQodmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2tRdW90ZVBsdWdpblxuIl19
