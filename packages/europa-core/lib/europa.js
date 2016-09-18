'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Europa = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _transformer = require('./transformer');

var _default = require('./plugin/preset/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An HTML to Markdown transformation library that supports HTML strings and DOM elements.
 *
 * @public
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

var Europa = function () {

  /**
   * Creates an instance of {@link Europa} using the window service provided.
   *
   * @param {WindowService} windowService - the {@link WindowService} to be used for HTML to Markdown transformation
   * @public
   */
  function Europa(windowService) {
    (0, _classCallCheck3.default)(this, Europa);

    /**
     * The {@link WindowService} for this {@link Europa} instance.
     *
     * @private
     * @type {WindowService}
     */
    this._windowService = windowService;

    /**
     * The <code>Window</code> to be used for HTML to Markdown transformation.
     *
     * @private
     * @type {Window}
     */
    this._window = null;

    /**
     * The plugins for this {@link Europa} instance.
     *
     * @private
     * @type {Map<string, Plugin>}
     */
    this._plugins = new _map2.default();

    this.registerPreset(_default2.default);
  }

  /**
   * Destroys the <code>Window</code> used by this {@link Europa} instance.
   *
   * This allows closeable {@link WindowService} implementations to close the <code>Window</code> and free up resources.
   * However, this instance can and will simply retrieve another <code>Window</code> from the {@link WindowService} the
   * next time it is required.
   *
   * @return {Europa} A reference to this {@link Europa} for chaining purposes.
   * @public
   */


  (0, _createClass3.default)(Europa, [{
    key: 'destroy',
    value: function destroy() {
      if (this._window) {
        this._windowService.closeWindow(this._window);
        this._window = null;
      }

      return this;
    }

    /**
     * Registers the specified <code>plugin</code> for the <code>tags</code> provided.
     *
     * <code>tags</code> can be an array of tag names or a single string containing white-space separated tag names.
     *
     * @param {string|string[]} tags - the tag names for which <code>plugin</code> is to be registered
     * @param {Plugin} plugin - the {@link Plugin} to be registered
     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
     * @public
     */

  }, {
    key: 'register',
    value: function register(tags, plugin) {
      if (typeof tags === 'string') {
        tags = tags.trim().split(/\s+/);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(tags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tag = _step.value;

          this._plugins.set(tag.toLowerCase(), plugin);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }

    /**
     * Registers all of the plugins within the specified <code>preset</code>.
     *
     * @param {Preset} preset - the {@link Preset} whose plugins are to be registered
     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
     * @public
     */

  }, {
    key: 'registerPreset',
    value: function registerPreset(preset) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(preset.plugins), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2);

          var tags = _step2$value[0];
          var plugin = _step2$value[1];

          this.register(tags, plugin);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }

    /**
     * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
     *
     * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
     * Markdown.
     *
     * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
     * @param {Transformation~Options} [options] - the options to be used
     * @return {string} The transformed Markdown.
     * @public
     */

  }, {
    key: 'transform',
    value: function transform(html, options) {
      var window = this.window;

      var transformer = new _transformer.Transformer(window, this._plugins);

      options = this._createTransformationOptions(options);

      return transformer.transform(html, options);
    }

    /**
     * Creates the options, including their default values, for the {@link Transformer#transform} method based on the
     * <code>options</code> provided.
     *
     * @param {Transformation~Options} [options] - the options that were passed in
     * @return {Transformation~Options} The complete options.
     * @private
     */

  }, {
    key: '_createTransformationOptions',
    value: function _createTransformationOptions(options) {
      return (0, _assign2.default)({
        absolute: false,
        baseUri: this._windowService.getBaseUri(this.window),
        inline: false
      }, options);
    }

    /**
     * Returns the <code>Window</code> for this {@link Europa} instance.
     *
     * If no <code>Window</code> has been allocated, one is retrieved from the {@link WindowService} and allocated.
     *
     * @return {Window} The <code>Window</code>.
     * @public
     */

  }, {
    key: 'window',
    get: function get() {
      if (this._window == null) {
        this._window = this._windowService.getWindow();
      }

      return this._window;
    }
  }]);
  return Europa;
}();

exports.Europa = Europa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ldXJvcGEuanMiXSwibmFtZXMiOlsiRXVyb3BhIiwid2luZG93U2VydmljZSIsIl93aW5kb3dTZXJ2aWNlIiwiX3dpbmRvdyIsIl9wbHVnaW5zIiwicmVnaXN0ZXJQcmVzZXQiLCJjbG9zZVdpbmRvdyIsInRhZ3MiLCJwbHVnaW4iLCJ0cmltIiwic3BsaXQiLCJ0YWciLCJzZXQiLCJ0b0xvd2VyQ2FzZSIsInByZXNldCIsInBsdWdpbnMiLCJyZWdpc3RlciIsImh0bWwiLCJvcHRpb25zIiwid2luZG93IiwidHJhbnNmb3JtZXIiLCJfY3JlYXRlVHJhbnNmb3JtYXRpb25PcHRpb25zIiwidHJhbnNmb3JtIiwiYWJzb2x1dGUiLCJiYXNlVXJpIiwiZ2V0QmFzZVVyaSIsImlubGluZSIsImdldFdpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7QUFDQTs7Ozs7O0FBRUE7Ozs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBOEJNQSxNOztBQUVKOzs7Ozs7QUFNQSxrQkFBWUMsYUFBWixFQUEyQjtBQUFBOztBQUN6Qjs7Ozs7O0FBTUEsU0FBS0MsY0FBTCxHQUFzQkQsYUFBdEI7O0FBRUE7Ozs7OztBQU1BLFNBQUtFLE9BQUwsR0FBZSxJQUFmOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxRQUFMLEdBQWdCLG1CQUFoQjs7QUFFQSxTQUFLQyxjQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OzhCQVVVO0FBQ1IsVUFBSSxLQUFLRixPQUFULEVBQWtCO0FBQ2hCLGFBQUtELGNBQUwsQ0FBb0JJLFdBQXBCLENBQWdDLEtBQUtILE9BQXJDO0FBQ0EsYUFBS0EsT0FBTCxHQUFlLElBQWY7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs2QkFVU0ksSSxFQUFNQyxNLEVBQVE7QUFDckIsVUFBSSxPQUFPRCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxlQUFPQSxLQUFLRSxJQUFMLEdBQVlDLEtBQVosQ0FBa0IsS0FBbEIsQ0FBUDtBQUNEOztBQUhvQjtBQUFBO0FBQUE7O0FBQUE7QUFLckIsd0RBQWtCSCxJQUFsQiw0R0FBd0I7QUFBQSxjQUFiSSxHQUFhOztBQUN0QixlQUFLUCxRQUFMLENBQWNRLEdBQWQsQ0FBa0JELElBQUlFLFdBQUosRUFBbEIsRUFBcUNMLE1BQXJDO0FBQ0Q7QUFQb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTckIsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7bUNBT2VNLE0sRUFBUTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNyQix5REFBK0JBLE9BQU9DLE9BQXRDLGlIQUErQztBQUFBOztBQUFBLGNBQWxDUixJQUFrQztBQUFBLGNBQTVCQyxNQUE0Qjs7QUFDN0MsZUFBS1EsUUFBTCxDQUFjVCxJQUFkLEVBQW9CQyxNQUFwQjtBQUNEO0FBSG9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS3JCLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs4QkFXVVMsSSxFQUFNQyxPLEVBQVM7QUFBQSxVQUNmQyxNQURlLEdBQ0osSUFESSxDQUNmQSxNQURlOztBQUV2QixVQUFNQyxjQUFjLDZCQUFnQkQsTUFBaEIsRUFBd0IsS0FBS2YsUUFBN0IsQ0FBcEI7O0FBRUFjLGdCQUFVLEtBQUtHLDRCQUFMLENBQWtDSCxPQUFsQyxDQUFWOztBQUVBLGFBQU9FLFlBQVlFLFNBQVosQ0FBc0JMLElBQXRCLEVBQTRCQyxPQUE1QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O2lEQVE2QkEsTyxFQUFTO0FBQ3BDLGFBQU8sc0JBQWM7QUFDbkJLLGtCQUFVLEtBRFM7QUFFbkJDLGlCQUFTLEtBQUt0QixjQUFMLENBQW9CdUIsVUFBcEIsQ0FBK0IsS0FBS04sTUFBcEMsQ0FGVTtBQUduQk8sZ0JBQVE7QUFIVyxPQUFkLEVBSUpSLE9BSkksQ0FBUDtBQUtEOztBQUVEOzs7Ozs7Ozs7Ozt3QkFRYTtBQUNYLFVBQUksS0FBS2YsT0FBTCxJQUFnQixJQUFwQixFQUEwQjtBQUN4QixhQUFLQSxPQUFMLEdBQWUsS0FBS0QsY0FBTCxDQUFvQnlCLFNBQXBCLEVBQWY7QUFDRDs7QUFFRCxhQUFPLEtBQUt4QixPQUFaO0FBQ0Q7Ozs7O1FBSU1ILE0sR0FBQUEsTSIsImZpbGUiOiJldXJvcGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFRyYW5zZm9ybWVyIH0gZnJvbSAnLi90cmFuc2Zvcm1lcidcbmltcG9ydCBkZWZhdWx0UHJlc2V0IGZyb20gJy4vcGx1Z2luL3ByZXNldC9kZWZhdWx0J1xuXG4vKipcbiAqIEFuIEhUTUwgdG8gTWFya2Rvd24gdHJhbnNmb3JtYXRpb24gbGlicmFyeSB0aGF0IHN1cHBvcnRzIEhUTUwgc3RyaW5ncyBhbmQgRE9NIGVsZW1lbnRzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgRXVyb3BhIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgRXVyb3BhfSB1c2luZyB0aGUgd2luZG93IHNlcnZpY2UgcHJvdmlkZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93U2VydmljZX0gd2luZG93U2VydmljZSAtIHRoZSB7QGxpbmsgV2luZG93U2VydmljZX0gdG8gYmUgdXNlZCBmb3IgSFRNTCB0byBNYXJrZG93biB0cmFuc2Zvcm1hdGlvblxuICAgKiBAcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih3aW5kb3dTZXJ2aWNlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBXaW5kb3dTZXJ2aWNlfSBmb3IgdGhpcyB7QGxpbmsgRXVyb3BhfSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge1dpbmRvd1NlcnZpY2V9XG4gICAgICovXG4gICAgdGhpcy5fd2luZG93U2VydmljZSA9IHdpbmRvd1NlcnZpY2VcblxuICAgIC8qKlxuICAgICAqIFRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IHRvIGJlIHVzZWQgZm9yIEhUTUwgdG8gTWFya2Rvd24gdHJhbnNmb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtXaW5kb3d9XG4gICAgICovXG4gICAgdGhpcy5fd2luZG93ID0gbnVsbFxuXG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbnMgZm9yIHRoaXMge0BsaW5rIEV1cm9wYX0gaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBQbHVnaW4+fVxuICAgICAqL1xuICAgIHRoaXMuX3BsdWdpbnMgPSBuZXcgTWFwKClcblxuICAgIHRoaXMucmVnaXN0ZXJQcmVzZXQoZGVmYXVsdFByZXNldClcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiB1c2VkIGJ5IHRoaXMge0BsaW5rIEV1cm9wYX0gaW5zdGFuY2UuXG4gICAqXG4gICAqIFRoaXMgYWxsb3dzIGNsb3NlYWJsZSB7QGxpbmsgV2luZG93U2VydmljZX0gaW1wbGVtZW50YXRpb25zIHRvIGNsb3NlIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IGFuZCBmcmVlIHVwIHJlc291cmNlcy5cbiAgICogSG93ZXZlciwgdGhpcyBpbnN0YW5jZSBjYW4gYW5kIHdpbGwgc2ltcGx5IHJldHJpZXZlIGFub3RoZXIgPGNvZGU+V2luZG93PC9jb2RlPiBmcm9tIHRoZSB7QGxpbmsgV2luZG93U2VydmljZX0gdGhlXG4gICAqIG5leHQgdGltZSBpdCBpcyByZXF1aXJlZC5cbiAgICpcbiAgICogQHJldHVybiB7RXVyb3BhfSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBFdXJvcGF9IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fd2luZG93KSB7XG4gICAgICB0aGlzLl93aW5kb3dTZXJ2aWNlLmNsb3NlV2luZG93KHRoaXMuX3dpbmRvdylcbiAgICAgIHRoaXMuX3dpbmRvdyA9IG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgc3BlY2lmaWVkIDxjb2RlPnBsdWdpbjwvY29kZT4gZm9yIHRoZSA8Y29kZT50YWdzPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogPGNvZGU+dGFnczwvY29kZT4gY2FuIGJlIGFuIGFycmF5IG9mIHRhZyBuYW1lcyBvciBhIHNpbmdsZSBzdHJpbmcgY29udGFpbmluZyB3aGl0ZS1zcGFjZSBzZXBhcmF0ZWQgdGFnIG5hbWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gdGFncyAtIHRoZSB0YWcgbmFtZXMgZm9yIHdoaWNoIDxjb2RlPnBsdWdpbjwvY29kZT4gaXMgdG8gYmUgcmVnaXN0ZXJlZFxuICAgKiBAcGFyYW0ge1BsdWdpbn0gcGx1Z2luIC0gdGhlIHtAbGluayBQbHVnaW59IHRvIGJlIHJlZ2lzdGVyZWRcbiAgICogQHJldHVybiB7RXVyb3BhfSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBFdXJvcGF9IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVnaXN0ZXIodGFncywgcGx1Z2luKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdzID09PSAnc3RyaW5nJykge1xuICAgICAgdGFncyA9IHRhZ3MudHJpbSgpLnNwbGl0KC9cXHMrLylcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHRhZyBvZiB0YWdzKSB7XG4gICAgICB0aGlzLl9wbHVnaW5zLnNldCh0YWcudG9Mb3dlckNhc2UoKSwgcGx1Z2luKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFsbCBvZiB0aGUgcGx1Z2lucyB3aXRoaW4gdGhlIHNwZWNpZmllZCA8Y29kZT5wcmVzZXQ8L2NvZGU+LlxuICAgKlxuICAgKiBAcGFyYW0ge1ByZXNldH0gcHJlc2V0IC0gdGhlIHtAbGluayBQcmVzZXR9IHdob3NlIHBsdWdpbnMgYXJlIHRvIGJlIHJlZ2lzdGVyZWRcbiAgICogQHJldHVybiB7RXVyb3BhfSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBFdXJvcGF9IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVnaXN0ZXJQcmVzZXQocHJlc2V0KSB7XG4gICAgZm9yIChjb25zdCBbIHRhZ3MsIHBsdWdpbiBdIG9mIHByZXNldC5wbHVnaW5zKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyKHRhZ3MsIHBsdWdpbilcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHNwZWNpZmllZCA8Y29kZT5odG1sPC9jb2RlPiBpbnRvIE1hcmtkb3duIHVzaW5nIHRoZSA8Y29kZT5vcHRpb25zPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogPGNvZGU+aHRtbDwvY29kZT4gY2FuIGVpdGhlciBiZSBhbiBIVE1MIHN0cmluZyBvciBhIERPTSBlbGVtZW50IHdob3NlIEhUTUwgY29udGVudHMgYXJlIHRvIGJlIHRyYW5zZm9ybWVkIGludG9cbiAgICogTWFya2Rvd24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudHxzdHJpbmd9IGh0bWwgLSB0aGUgSFRNTCAob3IgZWxlbWVudCB3aG9zZSBpbm5lciBIVE1MKSB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvIE1hcmtkb3duXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gW29wdGlvbnNdIC0gdGhlIG9wdGlvbnMgdG8gYmUgdXNlZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2Zvcm1lZCBNYXJrZG93bi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdHJhbnNmb3JtKGh0bWwsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHdpbmRvdyB9ID0gdGhpc1xuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IFRyYW5zZm9ybWVyKHdpbmRvdywgdGhpcy5fcGx1Z2lucylcblxuICAgIG9wdGlvbnMgPSB0aGlzLl9jcmVhdGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMob3B0aW9ucylcblxuICAgIHJldHVybiB0cmFuc2Zvcm1lci50cmFuc2Zvcm0oaHRtbCwgb3B0aW9ucylcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBvcHRpb25zLCBpbmNsdWRpbmcgdGhlaXIgZGVmYXVsdCB2YWx1ZXMsIGZvciB0aGUge0BsaW5rIFRyYW5zZm9ybWVyI3RyYW5zZm9ybX0gbWV0aG9kIGJhc2VkIG9uIHRoZVxuICAgKiA8Y29kZT5vcHRpb25zPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb3B0aW9ucyB0aGF0IHdlcmUgcGFzc2VkIGluXG4gICAqIEByZXR1cm4ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IFRoZSBjb21wbGV0ZSBvcHRpb25zLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NyZWF0ZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgICAgYWJzb2x1dGU6IGZhbHNlLFxuICAgICAgYmFzZVVyaTogdGhpcy5fd2luZG93U2VydmljZS5nZXRCYXNlVXJpKHRoaXMud2luZG93KSxcbiAgICAgIGlubGluZTogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gZm9yIHRoaXMge0BsaW5rIEV1cm9wYX0gaW5zdGFuY2UuXG4gICAqXG4gICAqIElmIG5vIDxjb2RlPldpbmRvdzwvY29kZT4gaGFzIGJlZW4gYWxsb2NhdGVkLCBvbmUgaXMgcmV0cmlldmVkIGZyb20gdGhlIHtAbGluayBXaW5kb3dTZXJ2aWNlfSBhbmQgYWxsb2NhdGVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHtXaW5kb3d9IFRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+LlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXQgd2luZG93KCkge1xuICAgIGlmICh0aGlzLl93aW5kb3cgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fd2luZG93ID0gdGhpcy5fd2luZG93U2VydmljZS5nZXRXaW5kb3coKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl93aW5kb3dcbiAgfVxuXG59XG5cbmV4cG9ydCB7IEV1cm9wYSB9XG4iXX0=
