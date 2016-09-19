'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A service used to retrieve the <code>Window</code> object for transforming HTML to Markdown and, optionally, to close
 * it upon destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an
 * artificial browser environment.
 *
 * @public
 */
var WindowService = function () {
  function WindowService() {
    (0, _classCallCheck3.default)(this, WindowService);
  }

  (0, _createClass3.default)(WindowService, [{
    key: 'closeWindow',


    /**
     * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
     *
     * @param {Window} window - the <code>Window</code> to be closed
     * @return {void}
     * @public
     */
    value: function closeWindow(window) {
      if (this.isCloseable(window)) {
        window.close();
      }
    }

    /**
     * Returns the base URI for the specified <code>window</code>.
     *
     * Implementations <b>must</b> override this method.
     *
     * @param {Window} window - the <code>Window</code> for which the base URI is to be returned
     * @return {string} The base URI for <code>window</code>.
     * @public
     * @abstract
     */

  }, {
    key: 'getBaseUri',
    value: function getBaseUri(window) {
      _utilities.Utilities.throwUnimplemented('WindowService', 'getBaseUri');
    }

    /**
     * Returns a <code>Window</code> to be used for transforming HTML to Markdown.
     *
     * Implementations <b>must</b> override this method.
     *
     * @return {Window} The <code>Window</code>.
     * @public
     * @abstract
     */

  }, {
    key: 'getWindow',
    value: function getWindow() {
      _utilities.Utilities.throwUnimplemented('WindowService', 'getWindow');
    }

    /**
     * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
     *
     * @param {Window} window - the <code>Window</code> to be checked
     * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
     * @public
     */

  }, {
    key: 'isCloseable',
    value: function isCloseable(window) {
      return false;
    }
  }]);
  return WindowService;
}(); /*
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

exports.WindowService = WindowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3dpbmRvdy1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIldpbmRvd1NlcnZpY2UiLCJ3aW5kb3ciLCJpc0Nsb3NlYWJsZSIsImNsb3NlIiwidGhyb3dVbmltcGxlbWVudGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7QUFFQTs7Ozs7OztJQU9NQSxhOzs7Ozs7Ozs7QUFFSjs7Ozs7OztnQ0FPWUMsTSxFQUFRO0FBQ2xCLFVBQUksS0FBS0MsV0FBTCxDQUFpQkQsTUFBakIsQ0FBSixFQUE4QjtBQUM1QkEsZUFBT0UsS0FBUDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7K0JBVVdGLE0sRUFBUTtBQUNqQiwyQkFBVUcsa0JBQVYsQ0FBNkIsZUFBN0IsRUFBOEMsWUFBOUM7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7O2dDQVNZO0FBQ1YsMkJBQVVBLGtCQUFWLENBQTZCLGVBQTdCLEVBQThDLFdBQTlDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Z0NBT1lILE0sRUFBUTtBQUNsQixhQUFPLEtBQVA7QUFDRDs7O0tBbEZIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBc0ZTRCxhLEdBQUFBLGEiLCJmaWxlIjoid2luZG93LXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFV0aWxpdGllcyB9IGZyb20gJy4uL3V0aWxpdGllcydcblxuLyoqXG4gKiBBIHNlcnZpY2UgdXNlZCB0byByZXRyaWV2ZSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiBvYmplY3QgZm9yIHRyYW5zZm9ybWluZyBIVE1MIHRvIE1hcmtkb3duIGFuZCwgb3B0aW9uYWxseSwgdG8gY2xvc2VcbiAqIGl0IHVwb24gZGVzdHJ1Y3Rpb24gb2YgdGhlIHtAbGluayBFdXJvcGF9IGluc3RhbmNlLiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gZnJlZSB1cCByZXNvdXJjZXMgYXMvd2hlbiByZXF1aXJlZCBpbiBhblxuICogYXJ0aWZpY2lhbCBicm93c2VyIGVudmlyb25tZW50LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgV2luZG93U2VydmljZSB7XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgc3BlY2lmaWVkIDxjb2RlPndpbmRvdzwvY29kZT4gYnV0IG9ubHkgaWYgdGhpcyB7QGxpbmsgV2luZG93U2VydmljZX0gaXMgY2xvc2VhYmxlLlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gd2luZG93IC0gdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gdG8gYmUgY2xvc2VkXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlV2luZG93KHdpbmRvdykge1xuICAgIGlmICh0aGlzLmlzQ2xvc2VhYmxlKHdpbmRvdykpIHtcbiAgICAgIHdpbmRvdy5jbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJhc2UgVVJJIGZvciB0aGUgc3BlY2lmaWVkIDxjb2RlPndpbmRvdzwvY29kZT4uXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9ucyA8Yj5tdXN0PC9iPiBvdmVycmlkZSB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtXaW5kb3d9IHdpbmRvdyAtIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IGZvciB3aGljaCB0aGUgYmFzZSBVUkkgaXMgdG8gYmUgcmV0dXJuZWRcbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgYmFzZSBVUkkgZm9yIDxjb2RlPndpbmRvdzwvY29kZT4uXG4gICAqIEBwdWJsaWNcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBnZXRCYXNlVXJpKHdpbmRvdykge1xuICAgIFV0aWxpdGllcy50aHJvd1VuaW1wbGVtZW50ZWQoJ1dpbmRvd1NlcnZpY2UnLCAnZ2V0QmFzZVVyaScpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIDxjb2RlPldpbmRvdzwvY29kZT4gdG8gYmUgdXNlZCBmb3IgdHJhbnNmb3JtaW5nIEhUTUwgdG8gTWFya2Rvd24uXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9ucyA8Yj5tdXN0PC9iPiBvdmVycmlkZSB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHJldHVybiB7V2luZG93fSBUaGUgPGNvZGU+V2luZG93PC9jb2RlPi5cbiAgICogQHB1YmxpY1xuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIGdldFdpbmRvdygpIHtcbiAgICBVdGlsaXRpZXMudGhyb3dVbmltcGxlbWVudGVkKCdXaW5kb3dTZXJ2aWNlJywgJ2dldFdpbmRvdycpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgPGNvZGU+d2luZG93PC9jb2RlPiB3aGljaCB3YXMgcmV0cmlldmVkIGJ5IHRoaXMge0BsaW5rIFdpbmRvd1NlcnZpY2V9IGlzIGNsb3NlYWJsZS5cbiAgICpcbiAgICogQHBhcmFtIHtXaW5kb3d9IHdpbmRvdyAtIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IHRvIGJlIGNoZWNrZWRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgPGNvZGU+d2luZG93PC9jb2RlPiBpcyBjbG9zZWFibGU7IG90aGVyd2lzZSA8Y29kZT5mYWxzZTwvY29kZT4uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGlzQ2xvc2VhYmxlKHdpbmRvdykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbn1cblxuZXhwb3J0IHsgV2luZG93U2VydmljZSB9XG4iXX0=
