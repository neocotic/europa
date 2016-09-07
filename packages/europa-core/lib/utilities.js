'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = Utilities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsaXRpZXMuanMiXSwibmFtZXMiOlsiVXRpbGl0aWVzIiwic3RyaW5nIiwidGltZXMiLCJwYWRkaW5nIiwiaSIsImNsYXNzTmFtZSIsIm1ldGhvZE5hbWUiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7OztJQUtNQSxTOzs7Ozs7Ozs7QUFFSjs7Ozs7Ozs7Ozs7OEJBV3NEO0FBQUEsVUFBdkNDLE1BQXVDLHlEQUE5QixFQUE4QjtBQUFBLFVBQTFCQyxLQUEwQix5REFBbEIsQ0FBa0I7QUFBQSxVQUFmQyxPQUFlLHlEQUFMLEdBQUs7O0FBQ3BELFVBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1osZUFBT0YsTUFBUDtBQUNEOztBQUVELFdBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixLQUFwQixFQUEyQkUsR0FBM0IsRUFBZ0M7QUFDOUJILGlCQUFTRSxVQUFVRixNQUFuQjtBQUNEOztBQUVELGFBQU9BLE1BQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozt1Q0FVMEJJLFMsRUFBV0MsVSxFQUFZO0FBQy9DLFlBQU0sSUFBSUMsS0FBSixPQUFjRCxVQUFkLDRDQUErREQsU0FBL0QsWUFBTjtBQUNEOzs7OztrQkFJWUwsUyIsImZpbGUiOiJ1dGlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQ29udGFpbnMgdXRpbGl0eSBtZXRob2RzIHRoYXQgYXJlIHVzZWZ1bCB0aHJvdWdob3V0IHRoZSBsaWJyYXJ5LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgVXRpbGl0aWVzIHtcblxuICAvKipcbiAgICogTGVmdCBwYWRzIHRoZSA8Y29kZT5zdHJpbmc8L2NvZGU+IHByb3ZpZGVkIHdpdGggdGhlIGdpdmVuIHBhZGRpbmcgc3RyaW5nIGZvciB0aGUgc3BlY2lmaWVkIG51bWJlciBvZlxuICAgKiA8Y29kZT50aW1lczwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPVwiXCJdIC0gdGhlIHN0cmluZyB0byBiZSBwYWRkZWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lcz0wXSAtIHRoZSBudW1iZXIgb2YgdGltZXMgdG8gcGFkIDxjb2RlPnN0cmluZzwvY29kZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwYWRkaW5nPVwiIFwiXSAtIHRoZSBwYWRkaW5nIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwYWRkZWQgPGNvZGU+c3RyaW5nPC9jb2RlPi5cbiAgICogQHB1YmxpY1xuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgbGVmdFBhZChzdHJpbmcgPSAnJywgdGltZXMgPSAwLCBwYWRkaW5nID0gJyAnKSB7XG4gICAgaWYgKCFwYWRkaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XG4gICAgICBzdHJpbmcgPSBwYWRkaW5nICsgc3RyaW5nXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhbiBlcnJvciBpbmRpY2F0aW5nIHRoYXQgdGhlIGEgZ2l2ZW4gbWV0aG9kIG9uIGEgc3BlY2lmaWMgY2xhc3MgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGNsYXNzIG9uIHdoaWNoIHRoZSBtZXRob2QgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIC0gdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB3aGljaCBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHRocm93cyB7RXJyb3J9IFRoZSBlcnJvciBkZXNjcmliaW5nIHRoZSBjbGFzcyBtZXRob2Qgd2hpY2ggaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkLlxuICAgKiBAcHVibGljXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyB0aHJvd1VuaW1wbGVtZW50ZWQoY2xhc3NOYW1lLCBtZXRob2ROYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7bWV0aG9kTmFtZX1cIiBtZXRob2QgbXVzdCBiZSBpbXBsZW1lbnRlZCBvbiB0aGUgJHtjbGFzc05hbWV9IGNsYXNzYClcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxpdGllc1xuIl19
