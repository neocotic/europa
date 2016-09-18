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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9jb2RlLmpzIl0sIm5hbWVzIjpbIkNvZGVQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJnZXQiLCJpbkNvZGVCbG9jayIsIm91dHB1dCIsInNldCIsImluUHJlZm9ybWF0dGVkQmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7Ozs7SUFNTUEsVTs7Ozs7Ozs7Ozs7O0FBRUo7OzswQkFHTUMsYyxFQUFnQkMsTyxFQUFTO0FBQzdCLFVBQUksQ0FBQ0EsUUFBUUMsR0FBUixDQUFZLFNBQVosQ0FBTCxFQUE2QjtBQUMzQkYsdUJBQWVHLFdBQWYsR0FBNkJGLFFBQVFDLEdBQVIsQ0FBWSxxQkFBWixDQUE3Qjs7QUFFQUYsdUJBQWVJLE1BQWYsQ0FBc0IsR0FBdEI7QUFDRDtBQUNGOztBQUVEOzs7Ozs7MkJBR09KLGMsRUFBZ0JDLE8sRUFBUztBQUM5QkEsY0FBUUksR0FBUixDQUFZLHFCQUFaLEVBQW1DTCxlQUFlRyxXQUFsRDtBQUNEOztBQUVEOzs7Ozs7OEJBR1VILGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFJRCxlQUFlTSxtQkFBbkIsRUFBd0M7QUFDdENMLGdCQUFRSSxHQUFSLENBQVksU0FBWixFQUF1QixJQUF2QjtBQUNELE9BRkQsTUFFTztBQUNMTCx1QkFBZUksTUFBZixDQUFzQixHQUF0Qjs7QUFFQUosdUJBQWVHLFdBQWYsR0FBNkIsSUFBN0I7QUFDRDtBQUNGOzs7bUJBN0RIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUVTSixVLEdBQUFBLFUiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyB0aGUgY29udGVudHMgaW4gYSBjb2RlIGJsb2NrLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtQbHVnaW59XG4gKi9cbmNsYXNzIENvZGVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKCFjb250ZXh0LmdldCgnc2tpcHBlZCcpKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5pbkNvZGVCbG9jayA9IGNvbnRleHQuZ2V0KCdwcmV2aW91c0luQ29kZUJsb2NrJylcblxuICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KCdgJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNJbkNvZGVCbG9jaycsIHRyYW5zZm9ybWF0aW9uLmluQ29kZUJsb2NrKVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKHRyYW5zZm9ybWF0aW9uLmluUHJlZm9ybWF0dGVkQmxvY2spIHtcbiAgICAgIGNvbnRleHQuc2V0KCdza2lwcGVkJywgdHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KCdgJylcblxuICAgICAgdHJhbnNmb3JtYXRpb24uaW5Db2RlQmxvY2sgPSB0cnVlXG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IHsgQ29kZVBsdWdpbiB9XG4iXX0=
