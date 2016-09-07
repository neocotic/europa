'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utilities = require('../utilities');

var _utilities2 = _interopRequireDefault(_utilities);

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
      _utilities2.default.throwUnimplemented('WindowService', 'getBaseUri');
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
      _utilities2.default.throwUnimplemented('WindowService', 'getWindow');
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

exports.default = WindowService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3dpbmRvdy1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIldpbmRvd1NlcnZpY2UiLCJ3aW5kb3ciLCJpc0Nsb3NlYWJsZSIsImNsb3NlIiwidGhyb3dVbmltcGxlbWVudGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7O0FBRUE7Ozs7Ozs7SUFPTUEsYTs7Ozs7Ozs7O0FBRUo7Ozs7Ozs7Z0NBT1lDLE0sRUFBUTtBQUNsQixVQUFJLEtBQUtDLFdBQUwsQ0FBaUJELE1BQWpCLENBQUosRUFBOEI7QUFDNUJBLGVBQU9FLEtBQVA7QUFDRDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7OytCQVVXRixNLEVBQVE7QUFDakIsMEJBQVVHLGtCQUFWLENBQTZCLGVBQTdCLEVBQThDLFlBQTlDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7OztnQ0FTWTtBQUNWLDBCQUFVQSxrQkFBVixDQUE2QixlQUE3QixFQUE4QyxXQUE5QztBQUNEOztBQUVEOzs7Ozs7Ozs7O2dDQU9ZSCxNLEVBQVE7QUFDbEIsYUFBTyxLQUFQO0FBQ0Q7OztLQXBGSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7a0JBa0VlRCxhIiwiZmlsZSI6IndpbmRvdy1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IFV0aWxpdGllcyBmcm9tICcuLi91dGlsaXRpZXMnXG5cbi8qKlxuICogQSBzZXJ2aWNlIHVzZWQgdG8gcmV0cmlldmUgdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gb2JqZWN0IGZvciB0cmFuc2Zvcm1pbmcgSFRNTCB0byBNYXJrZG93biBhbmQsIG9wdGlvbmFsbHksIHRvIGNsb3NlXG4gKiBpdCB1cG9uIGRlc3RydWN0aW9uIG9mIHRoZSB7QGxpbmsgRXVyb3BhfSBpbnN0YW5jZS4gVGhpcyBjYW4gYmUgdXNlZnVsIHRvIGZyZWUgdXAgcmVzb3VyY2VzIGFzL3doZW4gcmVxdWlyZWQgaW4gYW5cbiAqIGFydGlmaWNpYWwgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFdpbmRvd1NlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHNwZWNpZmllZCA8Y29kZT53aW5kb3c8L2NvZGU+IGJ1dCBvbmx5IGlmIHRoaXMge0BsaW5rIFdpbmRvd1NlcnZpY2V9IGlzIGNsb3NlYWJsZS5cbiAgICpcbiAgICogQHBhcmFtIHtXaW5kb3d9IHdpbmRvdyAtIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IHRvIGJlIGNsb3NlZFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBjbG9zZVdpbmRvdyh3aW5kb3cpIHtcbiAgICBpZiAodGhpcy5pc0Nsb3NlYWJsZSh3aW5kb3cpKSB7XG4gICAgICB3aW5kb3cuY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBiYXNlIFVSSSBmb3IgdGhlIHNwZWNpZmllZCA8Y29kZT53aW5kb3c8L2NvZGU+LlxuICAgKlxuICAgKiBJbXBsZW1lbnRhdGlvbnMgPGI+bXVzdDwvYj4gb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93fSB3aW5kb3cgLSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiBmb3Igd2hpY2ggdGhlIGJhc2UgVVJJIGlzIHRvIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGJhc2UgVVJJIGZvciA8Y29kZT53aW5kb3c8L2NvZGU+LlxuICAgKiBAcHVibGljXG4gICAqIEBhYnN0cmFjdFxuICAgKi9cbiAgZ2V0QmFzZVVyaSh3aW5kb3cpIHtcbiAgICBVdGlsaXRpZXMudGhyb3dVbmltcGxlbWVudGVkKCdXaW5kb3dTZXJ2aWNlJywgJ2dldEJhc2VVcmknKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSA8Y29kZT5XaW5kb3c8L2NvZGU+IHRvIGJlIHVzZWQgZm9yIHRyYW5zZm9ybWluZyBIVE1MIHRvIE1hcmtkb3duLlxuICAgKlxuICAgKiBJbXBsZW1lbnRhdGlvbnMgPGI+bXVzdDwvYj4gb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEByZXR1cm4ge1dpbmRvd30gVGhlIDxjb2RlPldpbmRvdzwvY29kZT4uXG4gICAqIEBwdWJsaWNcbiAgICogQGFic3RyYWN0XG4gICAqL1xuICBnZXRXaW5kb3coKSB7XG4gICAgVXRpbGl0aWVzLnRocm93VW5pbXBsZW1lbnRlZCgnV2luZG93U2VydmljZScsICdnZXRXaW5kb3cnKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIDxjb2RlPndpbmRvdzwvY29kZT4gd2hpY2ggd2FzIHJldHJpZXZlZCBieSB0aGlzIHtAbGluayBXaW5kb3dTZXJ2aWNlfSBpcyBjbG9zZWFibGUuXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93fSB3aW5kb3cgLSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiB0byBiZSBjaGVja2VkXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIDxjb2RlPndpbmRvdzwvY29kZT4gaXMgY2xvc2VhYmxlOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICAgKiBAcHVibGljXG4gICAqL1xuICBpc0Nsb3NlYWJsZSh3aW5kb3cpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdpbmRvd1NlcnZpY2VcbiJdfQ==
