'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utilities = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
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

/**
 * Contains utility methods that are useful throughout the library.
 *
 * @public
 */
var Utilities = function () {
  function Utilities() {
    (0, _classCallCheck3.default)(this, Utilities);
  }

  (0, _createClass3.default)(Utilities, null, [{
    key: 'leftPad',


    /**
     * Left pads the <code>string</code> provided with the given padding string for the specified number of
     * <code>times</code>.
     *
     * @param {string} [string=""] - the string to be padded
     * @param {number} [times=0] - the number of times to pad <code>string</code>
     * @param {string} [padding=" "] - the padding string
     * @return {string} The padded <code>string</code>.
     * @public
     * @static
     */
    value: function leftPad() {
      var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var times = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var padding = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

      if (!padding) {
        return string;
      }

      for (var i = 0; i < times; i++) {
        string = padding + string;
      }

      return string;
    }

    /**
     * Throws an error indicating that the a given method on a specific class has not been implemented.
     *
     * @param {string} className - the name of the class on which the method has not been implemented
     * @param {string} methodName - the name of the method which has not been implemented
     * @return {void}
     * @throws {Error} The error describing the class method which has not been implemented.
     * @public
     * @static
     */

  }, {
    key: 'throwUnimplemented',
    value: function throwUnimplemented(className, methodName) {
      throw new Error('"' + methodName + '" method must be implemented on the ' + className + ' class');
    }
  }]);
  return Utilities;
}();

exports.Utilities = Utilities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXRpZXMuanMiXSwibmFtZXMiOlsiVXRpbGl0aWVzIiwic3RyaW5nIiwidGltZXMiLCJwYWRkaW5nIiwiaSIsImNsYXNzTmFtZSIsIm1ldGhvZE5hbWUiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7Ozs7SUFLTUEsUzs7Ozs7Ozs7O0FBRUo7Ozs7Ozs7Ozs7OzhCQVdzRDtBQUFBLFVBQXZDQyxNQUF1Qyx5REFBOUIsRUFBOEI7QUFBQSxVQUExQkMsS0FBMEIseURBQWxCLENBQWtCO0FBQUEsVUFBZkMsT0FBZSx5REFBTCxHQUFLOztBQUNwRCxVQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaLGVBQU9GLE1BQVA7QUFDRDs7QUFFRCxXQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsS0FBcEIsRUFBMkJFLEdBQTNCLEVBQWdDO0FBQzlCSCxpQkFBU0UsVUFBVUYsTUFBbkI7QUFDRDs7QUFFRCxhQUFPQSxNQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7dUNBVTBCSSxTLEVBQVdDLFUsRUFBWTtBQUMvQyxZQUFNLElBQUlDLEtBQUosT0FBY0QsVUFBZCw0Q0FBK0RELFNBQS9ELFlBQU47QUFDRDs7Ozs7UUFJTUwsUyxHQUFBQSxTIiwiZmlsZSI6InV0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBDb250YWlucyB1dGlsaXR5IG1ldGhvZHMgdGhhdCBhcmUgdXNlZnVsIHRocm91Z2hvdXQgdGhlIGxpYnJhcnkuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBVdGlsaXRpZXMge1xuXG4gIC8qKlxuICAgKiBMZWZ0IHBhZHMgdGhlIDxjb2RlPnN0cmluZzwvY29kZT4gcHJvdmlkZWQgd2l0aCB0aGUgZ2l2ZW4gcGFkZGluZyBzdHJpbmcgZm9yIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mXG4gICAqIDxjb2RlPnRpbWVzPC9jb2RlPi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9XCJcIl0gLSB0aGUgc3RyaW5nIHRvIGJlIHBhZGRlZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVzPTBdIC0gdGhlIG51bWJlciBvZiB0aW1lcyB0byBwYWQgPGNvZGU+c3RyaW5nPC9jb2RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhZGRpbmc9XCIgXCJdIC0gdGhlIHBhZGRpbmcgc3RyaW5nXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHBhZGRlZCA8Y29kZT5zdHJpbmc8L2NvZGU+LlxuICAgKiBAcHVibGljXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBsZWZ0UGFkKHN0cmluZyA9ICcnLCB0aW1lcyA9IDAsIHBhZGRpbmcgPSAnICcpIHtcbiAgICBpZiAoIXBhZGRpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmdcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcbiAgICAgIHN0cmluZyA9IHBhZGRpbmcgKyBzdHJpbmdcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nXG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGFuIGVycm9yIGluZGljYXRpbmcgdGhhdCB0aGUgYSBnaXZlbiBtZXRob2Qgb24gYSBzcGVjaWZpYyBjbGFzcyBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgLSB0aGUgbmFtZSBvZiB0aGUgY2xhc3Mgb24gd2hpY2ggdGhlIG1ldGhvZCBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhlIGVycm9yIGRlc2NyaWJpbmcgdGhlIGNsYXNzIG1ldGhvZCB3aGljaCBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQuXG4gICAqIEBwdWJsaWNcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHRocm93VW5pbXBsZW1lbnRlZChjbGFzc05hbWUsIG1ldGhvZE5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFwiJHttZXRob2ROYW1lfVwiIG1ldGhvZCBtdXN0IGJlIGltcGxlbWVudGVkIG9uIHRoZSAke2NsYXNzTmFtZX0gY2xhc3NgKVxuICB9XG5cbn1cblxuZXhwb3J0IHsgVXRpbGl0aWVzIH1cbiJdfQ==
