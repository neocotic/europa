'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _transformer2 = _interopRequireDefault(_transformer);

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

      var transformer = new _transformer2.default(window, this._plugins);

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

exports.default = Europa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ldXJvcGEuanMiXSwibmFtZXMiOlsiRXVyb3BhIiwid2luZG93U2VydmljZSIsIl93aW5kb3dTZXJ2aWNlIiwiX3dpbmRvdyIsIl9wbHVnaW5zIiwicmVnaXN0ZXJQcmVzZXQiLCJjbG9zZVdpbmRvdyIsInRhZ3MiLCJwbHVnaW4iLCJ0cmltIiwic3BsaXQiLCJ0YWciLCJzZXQiLCJ0b0xvd2VyQ2FzZSIsInByZXNldCIsInBsdWdpbnMiLCJyZWdpc3RlciIsImh0bWwiLCJvcHRpb25zIiwid2luZG93IiwidHJhbnNmb3JtZXIiLCJfY3JlYXRlVHJhbnNmb3JtYXRpb25PcHRpb25zIiwidHJhbnNmb3JtIiwiYWJzb2x1dGUiLCJiYXNlVXJpIiwiZ2V0QmFzZVVyaSIsImlubGluZSIsImdldFdpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7OztBQXpCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQThCTUEsTTs7QUFFSjs7Ozs7O0FBTUEsa0JBQVlDLGFBQVosRUFBMkI7QUFBQTs7QUFDekI7Ozs7OztBQU1BLFNBQUtDLGNBQUwsR0FBc0JELGFBQXRCOztBQUVBOzs7Ozs7QUFNQSxTQUFLRSxPQUFMLEdBQWUsSUFBZjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsUUFBTCxHQUFnQixtQkFBaEI7O0FBRUEsU0FBS0MsY0FBTDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs4QkFVVTtBQUNSLFVBQUksS0FBS0YsT0FBVCxFQUFrQjtBQUNoQixhQUFLRCxjQUFMLENBQW9CSSxXQUFwQixDQUFnQyxLQUFLSCxPQUFyQztBQUNBLGFBQUtBLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7NkJBVVNJLEksRUFBTUMsTSxFQUFRO0FBQ3JCLFVBQUksT0FBT0QsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkEsZUFBT0EsS0FBS0UsSUFBTCxHQUFZQyxLQUFaLENBQWtCLEtBQWxCLENBQVA7QUFDRDs7QUFIb0I7QUFBQTtBQUFBOztBQUFBO0FBS3JCLHdEQUFrQkgsSUFBbEIsNEdBQXdCO0FBQUEsY0FBYkksR0FBYTs7QUFDdEIsZUFBS1AsUUFBTCxDQUFjUSxHQUFkLENBQWtCRCxJQUFJRSxXQUFKLEVBQWxCLEVBQXFDTCxNQUFyQztBQUNEO0FBUG9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU3JCLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7O21DQU9lTSxNLEVBQVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDckIseURBQStCQSxPQUFPQyxPQUF0QyxpSEFBK0M7QUFBQTs7QUFBQSxjQUFsQ1IsSUFBa0M7QUFBQSxjQUE1QkMsTUFBNEI7O0FBQzdDLGVBQUtRLFFBQUwsQ0FBY1QsSUFBZCxFQUFvQkMsTUFBcEI7QUFDRDtBQUhvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtyQixhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OEJBV1VTLEksRUFBTUMsTyxFQUFTO0FBQUEsVUFDZkMsTUFEZSxHQUNKLElBREksQ0FDZkEsTUFEZTs7QUFFdkIsVUFBTUMsY0FBYywwQkFBZ0JELE1BQWhCLEVBQXdCLEtBQUtmLFFBQTdCLENBQXBCOztBQUVBYyxnQkFBVSxLQUFLRyw0QkFBTCxDQUFrQ0gsT0FBbEMsQ0FBVjs7QUFFQSxhQUFPRSxZQUFZRSxTQUFaLENBQXNCTCxJQUF0QixFQUE0QkMsT0FBNUIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OztpREFRNkJBLE8sRUFBUztBQUNwQyxhQUFPLHNCQUFjO0FBQ25CSyxrQkFBVSxLQURTO0FBRW5CQyxpQkFBUyxLQUFLdEIsY0FBTCxDQUFvQnVCLFVBQXBCLENBQStCLEtBQUtOLE1BQXBDLENBRlU7QUFHbkJPLGdCQUFRO0FBSFcsT0FBZCxFQUlKUixPQUpJLENBQVA7QUFLRDs7QUFFRDs7Ozs7Ozs7Ozs7d0JBUWE7QUFDWCxVQUFJLEtBQUtmLE9BQUwsSUFBZ0IsSUFBcEIsRUFBMEI7QUFDeEIsYUFBS0EsT0FBTCxHQUFlLEtBQUtELGNBQUwsQ0FBb0J5QixTQUFwQixFQUFmO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLeEIsT0FBWjtBQUNEOzs7OztrQkFJWUgsTSIsImZpbGUiOiJldXJvcGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBUcmFuc2Zvcm1lciBmcm9tICcuL3RyYW5zZm9ybWVyJ1xuaW1wb3J0IGRlZmF1bHRQcmVzZXQgZnJvbSAnLi9wbHVnaW4vcHJlc2V0L2RlZmF1bHQnXG5cbi8qKlxuICogQW4gSFRNTCB0byBNYXJrZG93biB0cmFuc2Zvcm1hdGlvbiBsaWJyYXJ5IHRoYXQgc3VwcG9ydHMgSFRNTCBzdHJpbmdzIGFuZCBET00gZWxlbWVudHMuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBFdXJvcGEge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHtAbGluayBFdXJvcGF9IHVzaW5nIHRoZSB3aW5kb3cgc2VydmljZSBwcm92aWRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtXaW5kb3dTZXJ2aWNlfSB3aW5kb3dTZXJ2aWNlIC0gdGhlIHtAbGluayBXaW5kb3dTZXJ2aWNlfSB0byBiZSB1c2VkIGZvciBIVE1MIHRvIE1hcmtkb3duIHRyYW5zZm9ybWF0aW9uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHdpbmRvd1NlcnZpY2UpIHtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIFdpbmRvd1NlcnZpY2V9IGZvciB0aGlzIHtAbGluayBFdXJvcGF9IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7V2luZG93U2VydmljZX1cbiAgICAgKi9cbiAgICB0aGlzLl93aW5kb3dTZXJ2aWNlID0gd2luZG93U2VydmljZVxuXG4gICAgLyoqXG4gICAgICogVGhlIDxjb2RlPldpbmRvdzwvY29kZT4gdG8gYmUgdXNlZCBmb3IgSFRNTCB0byBNYXJrZG93biB0cmFuc2Zvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge1dpbmRvd31cbiAgICAgKi9cbiAgICB0aGlzLl93aW5kb3cgPSBudWxsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2lucyBmb3IgdGhpcyB7QGxpbmsgRXVyb3BhfSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge01hcDxzdHJpbmcsIFBsdWdpbj59XG4gICAgICovXG4gICAgdGhpcy5fcGx1Z2lucyA9IG5ldyBNYXAoKVxuXG4gICAgdGhpcy5yZWdpc3RlclByZXNldChkZWZhdWx0UHJlc2V0KVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IHVzZWQgYnkgdGhpcyB7QGxpbmsgRXVyb3BhfSBpbnN0YW5jZS5cbiAgICpcbiAgICogVGhpcyBhbGxvd3MgY2xvc2VhYmxlIHtAbGluayBXaW5kb3dTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbnMgdG8gY2xvc2UgdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gYW5kIGZyZWUgdXAgcmVzb3VyY2VzLlxuICAgKiBIb3dldmVyLCB0aGlzIGluc3RhbmNlIGNhbiBhbmQgd2lsbCBzaW1wbHkgcmV0cmlldmUgYW5vdGhlciA8Y29kZT5XaW5kb3c8L2NvZGU+IGZyb20gdGhlIHtAbGluayBXaW5kb3dTZXJ2aWNlfSB0aGVcbiAgICogbmV4dCB0aW1lIGl0IGlzIHJlcXVpcmVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHtFdXJvcGF9IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIEV1cm9wYX0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl93aW5kb3cpIHtcbiAgICAgIHRoaXMuX3dpbmRvd1NlcnZpY2UuY2xvc2VXaW5kb3codGhpcy5fd2luZG93KVxuICAgICAgdGhpcy5fd2luZG93ID0gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHRoZSBzcGVjaWZpZWQgPGNvZGU+cGx1Z2luPC9jb2RlPiBmb3IgdGhlIDxjb2RlPnRhZ3M8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiA8Y29kZT50YWdzPC9jb2RlPiBjYW4gYmUgYW4gYXJyYXkgb2YgdGFnIG5hbWVzIG9yIGEgc2luZ2xlIHN0cmluZyBjb250YWluaW5nIHdoaXRlLXNwYWNlIHNlcGFyYXRlZCB0YWcgbmFtZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSB0YWdzIC0gdGhlIHRhZyBuYW1lcyBmb3Igd2hpY2ggPGNvZGU+cGx1Z2luPC9jb2RlPiBpcyB0byBiZSByZWdpc3RlcmVkXG4gICAqIEBwYXJhbSB7UGx1Z2lufSBwbHVnaW4gLSB0aGUge0BsaW5rIFBsdWdpbn0gdG8gYmUgcmVnaXN0ZXJlZFxuICAgKiBAcmV0dXJuIHtFdXJvcGF9IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIEV1cm9wYX0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICByZWdpc3Rlcih0YWdzLCBwbHVnaW4pIHtcbiAgICBpZiAodHlwZW9mIHRhZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0YWdzID0gdGFncy50cmltKCkuc3BsaXQoL1xccysvKVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcbiAgICAgIHRoaXMuX3BsdWdpbnMuc2V0KHRhZy50b0xvd2VyQ2FzZSgpLCBwbHVnaW4pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYWxsIG9mIHRoZSBwbHVnaW5zIHdpdGhpbiB0aGUgc3BlY2lmaWVkIDxjb2RlPnByZXNldDwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7UHJlc2V0fSBwcmVzZXQgLSB0aGUge0BsaW5rIFByZXNldH0gd2hvc2UgcGx1Z2lucyBhcmUgdG8gYmUgcmVnaXN0ZXJlZFxuICAgKiBAcmV0dXJuIHtFdXJvcGF9IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIEV1cm9wYX0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICByZWdpc3RlclByZXNldChwcmVzZXQpIHtcbiAgICBmb3IgKGNvbnN0IFsgdGFncywgcGx1Z2luIF0gb2YgcHJlc2V0LnBsdWdpbnMpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXIodGFncywgcGx1Z2luKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmh0bWw8L2NvZGU+IGludG8gTWFya2Rvd24gdXNpbmcgdGhlIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiA8Y29kZT5odG1sPC9jb2RlPiBjYW4gZWl0aGVyIGJlIGFuIEhUTUwgc3RyaW5nIG9yIGEgRE9NIGVsZW1lbnQgd2hvc2UgSFRNTCBjb250ZW50cyBhcmUgdG8gYmUgdHJhbnNmb3JtZWQgaW50b1xuICAgKiBNYXJrZG93bi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fHN0cmluZ30gaHRtbCAtIHRoZSBIVE1MIChvciBlbGVtZW50IHdob3NlIGlubmVyIEhUTUwpIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd25cbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb3B0aW9ucyB0byBiZSB1c2VkXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRyYW5zZm9ybWVkIE1hcmtkb3duLlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm0oaHRtbCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgd2luZG93IH0gPSB0aGlzXG4gICAgY29uc3QgdHJhbnNmb3JtZXIgPSBuZXcgVHJhbnNmb3JtZXIod2luZG93LCB0aGlzLl9wbHVnaW5zKVxuXG4gICAgb3B0aW9ucyA9IHRoaXMuX2NyZWF0ZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyLnRyYW5zZm9ybShodG1sLCBvcHRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG9wdGlvbnMsIGluY2x1ZGluZyB0aGVpciBkZWZhdWx0IHZhbHVlcywgZm9yIHRoZSB7QGxpbmsgVHJhbnNmb3JtZXIjdHJhbnNmb3JtfSBtZXRob2QgYmFzZWQgb24gdGhlXG4gICAqIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvcHRpb25zIHRoYXQgd2VyZSBwYXNzZWQgaW5cbiAgICogQHJldHVybiB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gVGhlIGNvbXBsZXRlIG9wdGlvbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlVHJhbnNmb3JtYXRpb25PcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhYnNvbHV0ZTogZmFsc2UsXG4gICAgICBiYXNlVXJpOiB0aGlzLl93aW5kb3dTZXJ2aWNlLmdldEJhc2VVcmkodGhpcy53aW5kb3cpLFxuICAgICAgaW5saW5lOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiBmb3IgdGhpcyB7QGxpbmsgRXVyb3BhfSBpbnN0YW5jZS5cbiAgICpcbiAgICogSWYgbm8gPGNvZGU+V2luZG93PC9jb2RlPiBoYXMgYmVlbiBhbGxvY2F0ZWQsIG9uZSBpcyByZXRyaWV2ZWQgZnJvbSB0aGUge0BsaW5rIFdpbmRvd1NlcnZpY2V9IGFuZCBhbGxvY2F0ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge1dpbmRvd30gVGhlIDxjb2RlPldpbmRvdzwvY29kZT4uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCB3aW5kb3coKSB7XG4gICAgaWYgKHRoaXMuX3dpbmRvdyA9PSBudWxsKSB7XG4gICAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl93aW5kb3dTZXJ2aWNlLmdldFdpbmRvdygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3dpbmRvd1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXVyb3BhXG4iXX0=
