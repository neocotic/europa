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

exports.default = CodePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9jb2RlLmpzIl0sIm5hbWVzIjpbIkNvZGVQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJnZXQiLCJpbkNvZGVCbG9jayIsIm91dHB1dCIsInNldCIsImluUHJlZm9ybWF0dGVkQmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7QUFFQTs7Ozs7O0lBTU1BLFU7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QixVQUFJLENBQUNBLFFBQVFDLEdBQVIsQ0FBWSxTQUFaLENBQUwsRUFBNkI7QUFDM0JGLHVCQUFlRyxXQUFmLEdBQTZCRixRQUFRQyxHQUFSLENBQVkscUJBQVosQ0FBN0I7O0FBRUFGLHVCQUFlSSxNQUFmLENBQXNCLEdBQXRCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OzJCQUdPSixjLEVBQWdCQyxPLEVBQVM7QUFDOUJBLGNBQVFJLEdBQVIsQ0FBWSxxQkFBWixFQUFtQ0wsZUFBZUcsV0FBbEQ7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVSCxjLEVBQWdCQyxPLEVBQVM7QUFDakMsVUFBSUQsZUFBZU0sbUJBQW5CLEVBQXdDO0FBQ3RDTCxnQkFBUUksR0FBUixDQUFZLFNBQVosRUFBdUIsSUFBdkI7QUFDRCxPQUZELE1BRU87QUFDTEwsdUJBQWVJLE1BQWYsQ0FBc0IsR0FBdEI7O0FBRUFKLHVCQUFlRyxXQUFmLEdBQTZCLElBQTdCO0FBQ0Q7QUFDRjs7O3FCQTdESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFpRWVKLFUiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IFBsdWdpbiBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBvdXRwdXRzIHRoZSBjb250ZW50cyBpbiBhIGNvZGUgYmxvY2suXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgQ29kZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQuZ2V0KCdza2lwcGVkJykpIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmluQ29kZUJsb2NrID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzSW5Db2RlQmxvY2snKVxuXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQoJ2AnKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c0luQ29kZUJsb2NrJywgdHJhbnNmb3JtYXRpb24uaW5Db2RlQmxvY2spXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBpZiAodHJhbnNmb3JtYXRpb24uaW5QcmVmb3JtYXR0ZWRCbG9jaykge1xuICAgICAgY29udGV4dC5zZXQoJ3NraXBwZWQnLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQoJ2AnKVxuXG4gICAgICB0cmFuc2Zvcm1hdGlvbi5pbkNvZGVCbG9jayA9IHRydWVcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2RlUGx1Z2luXG4iXX0=
