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

/* eslint no-unused-vars: "off" */

exports.WindowService = WindowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3dpbmRvdy1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIldpbmRvd1NlcnZpY2UiLCJ3aW5kb3ciLCJpc0Nsb3NlYWJsZSIsImNsb3NlIiwidGhyb3dVbmltcGxlbWVudGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7QUFFQTs7Ozs7OztJQU9NQSxhOzs7Ozs7Ozs7QUFFSjs7Ozs7OztnQ0FPWUMsTSxFQUFRO0FBQ2xCLFVBQUksS0FBS0MsV0FBTCxDQUFpQkQsTUFBakIsQ0FBSixFQUE4QjtBQUM1QkEsZUFBT0UsS0FBUDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7K0JBVVdGLE0sRUFBUTtBQUNqQiwyQkFBVUcsa0JBQVYsQ0FBNkIsZUFBN0IsRUFBOEMsWUFBOUM7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7O2dDQVNZO0FBQ1YsMkJBQVVBLGtCQUFWLENBQTZCLGVBQTdCLEVBQThDLFdBQTlDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Z0NBT1lILE0sRUFBUTtBQUNsQixhQUFPLEtBQVA7QUFDRDs7O0tBcEZIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztRQWtFU0QsYSxHQUFBQSxhIiwiZmlsZSI6IndpbmRvdy1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IHsgVXRpbGl0aWVzIH0gZnJvbSAnLi4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEEgc2VydmljZSB1c2VkIHRvIHJldHJpZXZlIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IG9iamVjdCBmb3IgdHJhbnNmb3JtaW5nIEhUTUwgdG8gTWFya2Rvd24gYW5kLCBvcHRpb25hbGx5LCB0byBjbG9zZVxuICogaXQgdXBvbiBkZXN0cnVjdGlvbiBvZiB0aGUge0BsaW5rIEV1cm9wYX0gaW5zdGFuY2UuIFRoaXMgY2FuIGJlIHVzZWZ1bCB0byBmcmVlIHVwIHJlc291cmNlcyBhcy93aGVuIHJlcXVpcmVkIGluIGFuXG4gKiBhcnRpZmljaWFsIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBXaW5kb3dTZXJ2aWNlIHtcblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBzcGVjaWZpZWQgPGNvZGU+d2luZG93PC9jb2RlPiBidXQgb25seSBpZiB0aGlzIHtAbGluayBXaW5kb3dTZXJ2aWNlfSBpcyBjbG9zZWFibGUuXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93fSB3aW5kb3cgLSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiB0byBiZSBjbG9zZWRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2VXaW5kb3cod2luZG93KSB7XG4gICAgaWYgKHRoaXMuaXNDbG9zZWFibGUod2luZG93KSkge1xuICAgICAgd2luZG93LmNsb3NlKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYmFzZSBVUkkgZm9yIHRoZSBzcGVjaWZpZWQgPGNvZGU+d2luZG93PC9jb2RlPi5cbiAgICpcbiAgICogSW1wbGVtZW50YXRpb25zIDxiPm11c3Q8L2I+IG92ZXJyaWRlIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gd2luZG93IC0gdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gZm9yIHdoaWNoIHRoZSBiYXNlIFVSSSBpcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBiYXNlIFVSSSBmb3IgPGNvZGU+d2luZG93PC9jb2RlPi5cbiAgICogQHB1YmxpY1xuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIGdldEJhc2VVcmkod2luZG93KSB7XG4gICAgVXRpbGl0aWVzLnRocm93VW5pbXBsZW1lbnRlZCgnV2luZG93U2VydmljZScsICdnZXRCYXNlVXJpJylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgPGNvZGU+V2luZG93PC9jb2RlPiB0byBiZSB1c2VkIGZvciB0cmFuc2Zvcm1pbmcgSFRNTCB0byBNYXJrZG93bi5cbiAgICpcbiAgICogSW1wbGVtZW50YXRpb25zIDxiPm11c3Q8L2I+IG92ZXJyaWRlIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcmV0dXJuIHtXaW5kb3d9IFRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+LlxuICAgKiBAcHVibGljXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgZ2V0V2luZG93KCkge1xuICAgIFV0aWxpdGllcy50aHJvd1VuaW1wbGVtZW50ZWQoJ1dpbmRvd1NlcnZpY2UnLCAnZ2V0V2luZG93JylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCA8Y29kZT53aW5kb3c8L2NvZGU+IHdoaWNoIHdhcyByZXRyaWV2ZWQgYnkgdGhpcyB7QGxpbmsgV2luZG93U2VydmljZX0gaXMgY2xvc2VhYmxlLlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gd2luZG93IC0gdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gdG8gYmUgY2hlY2tlZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiA8Y29kZT53aW5kb3c8L2NvZGU+IGlzIGNsb3NlYWJsZTsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgaXNDbG9zZWFibGUod2luZG93KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxufVxuXG5leHBvcnQgeyBXaW5kb3dTZXJ2aWNlIH1cbiJdfQ==
