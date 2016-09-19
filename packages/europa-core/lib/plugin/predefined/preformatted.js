'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreformattedPlugin = undefined;

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
 * A {@link Plugin} which outputs the contents in a preformatted block.
 *
 * @public
 * @extends {Plugin}
 */
var PreformattedPlugin = function (_Plugin) {
  (0, _inherits3.default)(PreformattedPlugin, _Plugin);

  function PreformattedPlugin() {
    (0, _classCallCheck3.default)(this, PreformattedPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (PreformattedPlugin.__proto__ || (0, _getPrototypeOf2.default)(PreformattedPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(PreformattedPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.atLeft = false;
      transformation.atParagraph = false;
      transformation.inPreformattedBlock = context.get('previousInPreformattedBlock');
      transformation.left = context.get('previousLeft');

      transformation.appendParagraph();
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousInPreformattedBlock', transformation.inPreformattedBlock);
      context.set('previousLeft', transformation.left);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var value = '    ';

      transformation.left += value;

      if (transformation.atParagraph) {
        transformation.append(value);
      } else {
        transformation.appendParagraph();
      }

      return true;
    }
  }]);
  return PreformattedPlugin;
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

exports.PreformattedPlugin = PreformattedPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9wcmVmb3JtYXR0ZWQuanMiXSwibmFtZXMiOlsiUHJlZm9ybWF0dGVkUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiYXRMZWZ0IiwiYXRQYXJhZ3JhcGgiLCJpblByZWZvcm1hdHRlZEJsb2NrIiwiZ2V0IiwibGVmdCIsImFwcGVuZFBhcmFncmFwaCIsInNldCIsInZhbHVlIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7QUFFQTs7Ozs7O0lBTU1BLGtCOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0JELHFCQUFlRSxNQUFmLEdBQXdCLEtBQXhCO0FBQ0FGLHFCQUFlRyxXQUFmLEdBQTZCLEtBQTdCO0FBQ0FILHFCQUFlSSxtQkFBZixHQUFxQ0gsUUFBUUksR0FBUixDQUFZLDZCQUFaLENBQXJDO0FBQ0FMLHFCQUFlTSxJQUFmLEdBQXNCTCxRQUFRSSxHQUFSLENBQVksY0FBWixDQUF0Qjs7QUFFQUwscUJBQWVPLGVBQWY7QUFDRDs7QUFFRDs7Ozs7OzJCQUdPUCxjLEVBQWdCQyxPLEVBQVM7QUFDOUJBLGNBQVFPLEdBQVIsQ0FBWSw2QkFBWixFQUEyQ1IsZUFBZUksbUJBQTFEO0FBQ0FILGNBQVFPLEdBQVIsQ0FBWSxjQUFaLEVBQTRCUixlQUFlTSxJQUEzQztBQUNEOztBQUVEOzs7Ozs7OEJBR1VOLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFNUSxRQUFRLE1BQWQ7O0FBRUFULHFCQUFlTSxJQUFmLElBQXVCRyxLQUF2Qjs7QUFFQSxVQUFJVCxlQUFlRyxXQUFuQixFQUFnQztBQUM5QkgsdUJBQWVVLE1BQWYsQ0FBc0JELEtBQXRCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xULHVCQUFlTyxlQUFmO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0Q7OzttQkFuRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF1RVNSLGtCLEdBQUFBLGtCIiwiZmlsZSI6InByZWZvcm1hdHRlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyB0aGUgY29udGVudHMgaW4gYSBwcmVmb3JtYXR0ZWQgYmxvY2suXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgUHJlZm9ybWF0dGVkUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIHRyYW5zZm9ybWF0aW9uLmF0TGVmdCA9IGZhbHNlXG4gICAgdHJhbnNmb3JtYXRpb24uYXRQYXJhZ3JhcGggPSBmYWxzZVxuICAgIHRyYW5zZm9ybWF0aW9uLmluUHJlZm9ybWF0dGVkQmxvY2sgPSBjb250ZXh0LmdldCgncHJldmlvdXNJblByZWZvcm1hdHRlZEJsb2NrJylcbiAgICB0cmFuc2Zvcm1hdGlvbi5sZWZ0ID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzTGVmdCcpXG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzSW5QcmVmb3JtYXR0ZWRCbG9jaycsIHRyYW5zZm9ybWF0aW9uLmluUHJlZm9ybWF0dGVkQmxvY2spXG4gICAgY29udGV4dC5zZXQoJ3ByZXZpb3VzTGVmdCcsIHRyYW5zZm9ybWF0aW9uLmxlZnQpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB2YWx1ZSA9ICcgICAgJ1xuXG4gICAgdHJhbnNmb3JtYXRpb24ubGVmdCArPSB2YWx1ZVxuXG4gICAgaWYgKHRyYW5zZm9ybWF0aW9uLmF0UGFyYWdyYXBoKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQodmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG59XG5cbmV4cG9ydCB7IFByZWZvcm1hdHRlZFBsdWdpbiB9XG4iXX0=
