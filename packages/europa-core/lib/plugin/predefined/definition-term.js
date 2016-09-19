'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefinitionTermPlugin = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _strong = require('./strong');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A {@link Plugin} which outputs a definition term as strong text.
 *
 * @public
 * @extends {StrongPlugin}
 */
var DefinitionTermPlugin = function (_StrongPlugin) {
  (0, _inherits3.default)(DefinitionTermPlugin, _StrongPlugin);

  function DefinitionTermPlugin() {
    (0, _classCallCheck3.default)(this, DefinitionTermPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (DefinitionTermPlugin.__proto__ || (0, _getPrototypeOf2.default)(DefinitionTermPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(DefinitionTermPlugin, [{
    key: 'transform',


    /**
     * @override
     */
    value: function transform(transformation, context) {
      transformation.appendParagraph();

      return (0, _get3.default)(DefinitionTermPlugin.prototype.__proto__ || (0, _getPrototypeOf2.default)(DefinitionTermPlugin.prototype), 'transform', this).call(this, transformation, context);
    }
  }]);
  return DefinitionTermPlugin;
}(_strong.StrongPlugin); /*
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

exports.DefinitionTermPlugin = DefinitionTermPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9kZWZpbml0aW9uLXRlcm0uanMiXSwibmFtZXMiOlsiRGVmaW5pdGlvblRlcm1QbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJhcHBlbmRQYXJhZ3JhcGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7QUFFQTs7Ozs7O0lBTU1BLG9COzs7Ozs7Ozs7Ozs7QUFFSjs7OzhCQUdVQyxjLEVBQWdCQyxPLEVBQVM7QUFDakNELHFCQUFlRSxlQUFmOztBQUVBLHlLQUF1QkYsY0FBdkIsRUFBdUNDLE9BQXZDO0FBQ0Q7Ozt5QkF2Q0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUEyQ1NGLG9CLEdBQUFBLG9CIiwiZmlsZSI6ImRlZmluaXRpb24tdGVybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgU3Ryb25nUGx1Z2luIH0gZnJvbSAnLi9zdHJvbmcnXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBvdXRwdXRzIGEgZGVmaW5pdGlvbiB0ZXJtIGFzIHN0cm9uZyB0ZXh0LlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtTdHJvbmdQbHVnaW59XG4gKi9cbmNsYXNzIERlZmluaXRpb25UZXJtUGx1Z2luIGV4dGVuZHMgU3Ryb25nUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuXG4gICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dClcbiAgfVxuXG59XG5cbmV4cG9ydCB7IERlZmluaXRpb25UZXJtUGx1Z2luIH1cbiJdfQ==
