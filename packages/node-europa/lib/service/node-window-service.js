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

var _jsdom = require('jsdom');

var _windowService = require('europa-core/lib/service/window-service');

var _windowService2 = _interopRequireDefault(_windowService);

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

/* eslint no-unused-vars: "off" */

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
}(_windowService2.default);

exports.default = NodeWindowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL25vZGUtd2luZG93LXNlcnZpY2UuanMiXSwibmFtZXMiOlsiTm9kZVdpbmRvd1NlcnZpY2UiLCJ3aW5kb3ciLCJwcm9jZXNzIiwiY3dkIiwicmVwbGFjZSIsImZlYXR1cmVzIiwiRmV0Y2hFeHRlcm5hbFJlc291cmNlcyIsInVybCIsImdldEJhc2VVcmkiLCJkZWZhdWx0VmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7O0FBRUE7Ozs7OztBQUVBOzs7Ozs7O0FBNUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztJQWFNQSxpQjs7Ozs7Ozs7Ozs7O0FBRUo7OzsrQkFHV0MsTSxFQUFRO0FBQ2pCLDBCQUFrQkMsUUFBUUMsR0FBUixHQUFjQyxPQUFkLENBQXNCLEtBQXRCLEVBQTZCLEdBQTdCLENBQWxCO0FBQ0Q7O0FBRUQ7Ozs7OztnQ0FHWTtBQUNWLGFBQU8sa0JBQU0sSUFBTixFQUFZO0FBQ2pCQyxrQkFBVSxFQUFFQyx3QkFBd0IsS0FBMUIsRUFETztBQUVqQkMsYUFBSyxLQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBRlksT0FBWixFQUdKQyxXQUhIO0FBSUQ7O0FBRUQ7Ozs7OztnQ0FHWVIsTSxFQUFRO0FBQ2xCLGFBQU8sSUFBUDtBQUNEOzs7OztrQkFJWUQsaUIiLCJmaWxlIjoibm9kZS13aW5kb3ctc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5cbmltcG9ydCB7IGpzZG9tIH0gZnJvbSAnanNkb20nXG5cbmltcG9ydCBXaW5kb3dTZXJ2aWNlIGZyb20gJ2V1cm9wYS1jb3JlL2xpYi9zZXJ2aWNlL3dpbmRvdy1zZXJ2aWNlJ1xuXG4vKipcbiAqIEEgTm9kZS1iYXNlZCBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgV2luZG93U2VydmljZX0gdXNlcyB0aGUganNkb20gbGlicmFyeSB0byBjcmVhdGUgYSB2aXJ0dWFsIDxjb2RlPldpbmRvdzwvY29kZT5cbiAqIG9iamVjdCB0byBiZSB1c2VkIGZvciB0cmFuc2Zvcm1pbmcgSFRNTCBpbnRvIE1hcmtkb3duLlxuICpcbiAqIEBwdWJsaWNcbiAqIEBleHRlbmRzIHtXaW5kb3dTZXJ2aWNlfVxuICovXG5jbGFzcyBOb2RlV2luZG93U2VydmljZSBleHRlbmRzIFdpbmRvd1NlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGdldEJhc2VVcmkod2luZG93KSB7XG4gICAgcmV0dXJuIGBmaWxlOi8vLyR7cHJvY2Vzcy5jd2QoKS5yZXBsYWNlKC9cXFxcL2csICcvJyl9YFxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZ2V0V2luZG93KCkge1xuICAgIHJldHVybiBqc2RvbShudWxsLCB7XG4gICAgICBmZWF0dXJlczogeyBGZXRjaEV4dGVybmFsUmVzb3VyY2VzOiBmYWxzZSB9LFxuICAgICAgdXJsOiB0aGlzLmdldEJhc2VVcmkobnVsbClcbiAgICB9KS5kZWZhdWx0Vmlld1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgaXNDbG9zZWFibGUod2luZG93KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVXaW5kb3dTZXJ2aWNlXG4iXX0=
