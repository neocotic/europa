'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeWindowService = undefined;

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

var _windowService = require('europa-core/lib/service/window-service');

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Node-based implementation of {@link WindowService} uses the jsdom library to create a virtual <code>Window</code>
 * object to be used for transforming HTML into Markdown.
 *
 * @public
 * @extends {WindowService}
 */
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

var NodeWindowService = function (_WindowService) {
  (0, _inherits3.default)(NodeWindowService, _WindowService);

  function NodeWindowService() {
    (0, _classCallCheck3.default)(this, NodeWindowService);
    return (0, _possibleConstructorReturn3.default)(this, (NodeWindowService.__proto__ || (0, _getPrototypeOf2.default)(NodeWindowService)).apply(this, arguments));
  }

  (0, _createClass3.default)(NodeWindowService, [{
    key: 'getBaseUri',


    /**
     * @override
     */
    value: function getBaseUri(window) {
      return 'file:///' + process.cwd().replace(/\\/g, '/');
    }

    /**
     * @override
     */

  }, {
    key: 'getWindow',
    value: function getWindow() {
      return (0, _jsdom.jsdom)(null, {
        features: { FetchExternalResources: false },
        url: this.getBaseUri(null)
      }).defaultView;
    }

    /**
     * @override
     */

  }, {
    key: 'isCloseable',
    value: function isCloseable(window) {
      return true;
    }
  }]);
  return NodeWindowService;
}(_windowService.WindowService);

exports.NodeWindowService = NodeWindowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL25vZGUtd2luZG93LXNlcnZpY2UuanMiXSwibmFtZXMiOlsiTm9kZVdpbmRvd1NlcnZpY2UiLCJ3aW5kb3ciLCJwcm9jZXNzIiwiY3dkIiwicmVwbGFjZSIsImZlYXR1cmVzIiwiRmV0Y2hFeHRlcm5hbFJlc291cmNlcyIsInVybCIsImdldEJhc2VVcmkiLCJkZWZhdWx0VmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQ01BLGlCOzs7Ozs7Ozs7Ozs7QUFFSjs7OytCQUdXQyxNLEVBQVE7QUFDakIsMEJBQWtCQyxRQUFRQyxHQUFSLEdBQWNDLE9BQWQsQ0FBc0IsS0FBdEIsRUFBNkIsR0FBN0IsQ0FBbEI7QUFDRDs7QUFFRDs7Ozs7O2dDQUdZO0FBQ1YsYUFBTyxrQkFBTSxJQUFOLEVBQVk7QUFDakJDLGtCQUFVLEVBQUVDLHdCQUF3QixLQUExQixFQURPO0FBRWpCQyxhQUFLLEtBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFGWSxPQUFaLEVBR0pDLFdBSEg7QUFJRDs7QUFFRDs7Ozs7O2dDQUdZUixNLEVBQVE7QUFDbEIsYUFBTyxJQUFQO0FBQ0Q7Ozs7O1FBSU1ELGlCLEdBQUFBLGlCIiwiZmlsZSI6Im5vZGUtd2luZG93LXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFdpbmRvd1NlcnZpY2UgfSBmcm9tICdldXJvcGEtY29yZS9saWIvc2VydmljZS93aW5kb3ctc2VydmljZSdcbmltcG9ydCB7IGpzZG9tIH0gZnJvbSAnanNkb20nXG5cbi8qKlxuICogQSBOb2RlLWJhc2VkIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBXaW5kb3dTZXJ2aWNlfSB1c2VzIHRoZSBqc2RvbSBsaWJyYXJ5IHRvIGNyZWF0ZSBhIHZpcnR1YWwgPGNvZGU+V2luZG93PC9jb2RlPlxuICogb2JqZWN0IHRvIGJlIHVzZWQgZm9yIHRyYW5zZm9ybWluZyBIVE1MIGludG8gTWFya2Rvd24uXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1dpbmRvd1NlcnZpY2V9XG4gKi9cbmNsYXNzIE5vZGVXaW5kb3dTZXJ2aWNlIGV4dGVuZHMgV2luZG93U2VydmljZSB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZ2V0QmFzZVVyaSh3aW5kb3cpIHtcbiAgICByZXR1cm4gYGZpbGU6Ly8vJHtwcm9jZXNzLmN3ZCgpLnJlcGxhY2UoL1xcXFwvZywgJy8nKX1gXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBnZXRXaW5kb3coKSB7XG4gICAgcmV0dXJuIGpzZG9tKG51bGwsIHtcbiAgICAgIGZlYXR1cmVzOiB7IEZldGNoRXh0ZXJuYWxSZXNvdXJjZXM6IGZhbHNlIH0sXG4gICAgICB1cmw6IHRoaXMuZ2V0QmFzZVVyaShudWxsKVxuICAgIH0pLmRlZmF1bHRWaWV3XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBpc0Nsb3NlYWJsZSh3aW5kb3cpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbn1cblxuZXhwb3J0IHsgTm9kZVdpbmRvd1NlcnZpY2UgfVxuIl19
