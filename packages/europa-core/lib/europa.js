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
      var _this = this;

      if (typeof tags === 'string') {
        tags = tags.trim().split(/\s+/);
      }

      tags.forEach(function (tag) {
        return _this._plugins.set(tag.toLowerCase(), plugin);
      });

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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(preset.plugins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2);

          var tags = _step$value[0];
          var plugin = _step$value[1];

          this.register(tags, plugin);
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

      options = this._createTransformerOptions(options);

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
    key: '_createTransformerOptions',
    value: function _createTransformerOptions(options) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ldXJvcGEuanMiXSwibmFtZXMiOlsiRXVyb3BhIiwid2luZG93U2VydmljZSIsIl93aW5kb3dTZXJ2aWNlIiwiX3dpbmRvdyIsIl9wbHVnaW5zIiwicmVnaXN0ZXJQcmVzZXQiLCJjbG9zZVdpbmRvdyIsInRhZ3MiLCJwbHVnaW4iLCJ0cmltIiwic3BsaXQiLCJmb3JFYWNoIiwidGFnIiwic2V0IiwidG9Mb3dlckNhc2UiLCJwcmVzZXQiLCJwbHVnaW5zIiwicmVnaXN0ZXIiLCJodG1sIiwib3B0aW9ucyIsIndpbmRvdyIsInRyYW5zZm9ybWVyIiwiX2NyZWF0ZVRyYW5zZm9ybWVyT3B0aW9ucyIsInRyYW5zZm9ybSIsImFic29sdXRlIiwiYmFzZVVyaSIsImdldEJhc2VVcmkiLCJpbmxpbmUiLCJnZXRXaW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4Qk1BLE07O0FBRUo7Ozs7OztBQU1BLGtCQUFZQyxhQUFaLEVBQTJCO0FBQUE7O0FBQ3pCOzs7Ozs7QUFNQSxTQUFLQyxjQUFMLEdBQXNCRCxhQUF0Qjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0UsT0FBTCxHQUFlLElBQWY7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLFFBQUwsR0FBZ0IsbUJBQWhCOztBQUVBLFNBQUtDLGNBQUw7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OEJBVVU7QUFDUixVQUFJLEtBQUtGLE9BQVQsRUFBa0I7QUFDaEIsYUFBS0QsY0FBTCxDQUFvQkksV0FBcEIsQ0FBZ0MsS0FBS0gsT0FBckM7QUFDQSxhQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7OzZCQVVTSSxJLEVBQU1DLE0sRUFBUTtBQUFBOztBQUNyQixVQUFJLE9BQU9ELElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJBLGVBQU9BLEtBQUtFLElBQUwsR0FBWUMsS0FBWixDQUFrQixLQUFsQixDQUFQO0FBQ0Q7O0FBRURILFdBQUtJLE9BQUwsQ0FBYSxVQUFDQyxHQUFEO0FBQUEsZUFBUyxNQUFLUixRQUFMLENBQWNTLEdBQWQsQ0FBa0JELElBQUlFLFdBQUosRUFBbEIsRUFBcUNOLE1BQXJDLENBQVQ7QUFBQSxPQUFiOztBQUVBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7O21DQU9lTyxNLEVBQVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDckIsd0RBQStCQSxPQUFPQyxPQUF0Qyw0R0FBK0M7QUFBQTs7QUFBQSxjQUFsQ1QsSUFBa0M7QUFBQSxjQUE1QkMsTUFBNEI7O0FBQzdDLGVBQUtTLFFBQUwsQ0FBY1YsSUFBZCxFQUFvQkMsTUFBcEI7QUFDRDtBQUhvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtyQixhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OEJBV1VVLEksRUFBTUMsTyxFQUFTO0FBQUEsVUFDZkMsTUFEZSxHQUNKLElBREksQ0FDZkEsTUFEZTs7QUFFdkIsVUFBTUMsY0FBYywwQkFBZ0JELE1BQWhCLEVBQXdCLEtBQUtoQixRQUE3QixDQUFwQjs7QUFFQWUsZ0JBQVUsS0FBS0cseUJBQUwsQ0FBK0JILE9BQS9CLENBQVY7O0FBRUEsYUFBT0UsWUFBWUUsU0FBWixDQUFzQkwsSUFBdEIsRUFBNEJDLE9BQTVCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7OENBUTBCQSxPLEVBQVM7QUFDakMsYUFBTyxzQkFBYztBQUNuQkssa0JBQVUsS0FEUztBQUVuQkMsaUJBQVMsS0FBS3ZCLGNBQUwsQ0FBb0J3QixVQUFwQixDQUErQixLQUFLTixNQUFwQyxDQUZVO0FBR25CTyxnQkFBUTtBQUhXLE9BQWQsRUFJSlIsT0FKSSxDQUFQO0FBS0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3dCQVFhO0FBQ1gsVUFBSSxLQUFLaEIsT0FBTCxJQUFnQixJQUFwQixFQUEwQjtBQUN4QixhQUFLQSxPQUFMLEdBQWUsS0FBS0QsY0FBTCxDQUFvQjBCLFNBQXBCLEVBQWY7QUFDRDs7QUFFRCxhQUFPLEtBQUt6QixPQUFaO0FBQ0Q7Ozs7O2tCQUlZSCxNIiwiZmlsZSI6ImV1cm9wYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IFRyYW5zZm9ybWVyIGZyb20gJy4vdHJhbnNmb3JtZXInXG5pbXBvcnQgZGVmYXVsdFByZXNldCBmcm9tICcuL3BsdWdpbi9wcmVzZXQvZGVmYXVsdCdcblxuLyoqXG4gKiBBbiBIVE1MIHRvIE1hcmtkb3duIHRyYW5zZm9ybWF0aW9uIGxpYnJhcnkgdGhhdCBzdXBwb3J0cyBIVE1MIHN0cmluZ3MgYW5kIERPTSBlbGVtZW50cy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIEV1cm9wYSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEV1cm9wYX0gdXNpbmcgdGhlIHdpbmRvdyBzZXJ2aWNlIHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd1NlcnZpY2V9IHdpbmRvd1NlcnZpY2UgLSB0aGUge0BsaW5rIFdpbmRvd1NlcnZpY2V9IHRvIGJlIHVzZWQgZm9yIEhUTUwgdG8gTWFya2Rvd24gdHJhbnNmb3JtYXRpb25cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3Iod2luZG93U2VydmljZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgV2luZG93U2VydmljZX0gZm9yIHRoaXMge0BsaW5rIEV1cm9wYX0gaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtXaW5kb3dTZXJ2aWNlfVxuICAgICAqL1xuICAgIHRoaXMuX3dpbmRvd1NlcnZpY2UgPSB3aW5kb3dTZXJ2aWNlXG5cbiAgICAvKipcbiAgICAgKiBUaGUgPGNvZGU+V2luZG93PC9jb2RlPiB0byBiZSB1c2VkIGZvciBIVE1MIHRvIE1hcmtkb3duIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7V2luZG93fVxuICAgICAqL1xuICAgIHRoaXMuX3dpbmRvdyA9IG51bGxcblxuICAgIC8qKlxuICAgICAqIFRoZSBwbHVnaW5zIGZvciB0aGlzIHtAbGluayBFdXJvcGF9IGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgUGx1Z2luPn1cbiAgICAgKi9cbiAgICB0aGlzLl9wbHVnaW5zID0gbmV3IE1hcCgpXG5cbiAgICB0aGlzLnJlZ2lzdGVyUHJlc2V0KGRlZmF1bHRQcmVzZXQpXG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gdXNlZCBieSB0aGlzIHtAbGluayBFdXJvcGF9IGluc3RhbmNlLlxuICAgKlxuICAgKiBUaGlzIGFsbG93cyBjbG9zZWFibGUge0BsaW5rIFdpbmRvd1NlcnZpY2V9IGltcGxlbWVudGF0aW9ucyB0byBjbG9zZSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiBhbmQgZnJlZSB1cCByZXNvdXJjZXMuXG4gICAqIEhvd2V2ZXIsIHRoaXMgaW5zdGFuY2UgY2FuIGFuZCB3aWxsIHNpbXBseSByZXRyaWV2ZSBhbm90aGVyIDxjb2RlPldpbmRvdzwvY29kZT4gZnJvbSB0aGUge0BsaW5rIFdpbmRvd1NlcnZpY2V9IHRoZVxuICAgKiBuZXh0IHRpbWUgaXQgaXMgcmVxdWlyZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge0V1cm9wYX0gQSByZWZlcmVuY2UgdG8gdGhpcyB7QGxpbmsgRXVyb3BhfSBmb3IgY2hhaW5pbmcgcHVycG9zZXMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3dpbmRvdykge1xuICAgICAgdGhpcy5fd2luZG93U2VydmljZS5jbG9zZVdpbmRvdyh0aGlzLl93aW5kb3cpXG4gICAgICB0aGlzLl93aW5kb3cgPSBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCA8Y29kZT5wbHVnaW48L2NvZGU+IGZvciB0aGUgPGNvZGU+dGFnczwvY29kZT4gcHJvdmlkZWQuXG4gICAqXG4gICAqIDxjb2RlPnRhZ3M8L2NvZGU+IGNhbiBiZSBhbiBhcnJheSBvZiB0YWcgbmFtZXMgb3IgYSBzaW5nbGUgc3RyaW5nIGNvbnRhaW5pbmcgd2hpdGUtc3BhY2Ugc2VwYXJhdGVkIHRhZyBuYW1lcy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHRhZ3MgLSB0aGUgdGFnIG5hbWVzIGZvciB3aGljaCA8Y29kZT5wbHVnaW48L2NvZGU+IGlzIHRvIGJlIHJlZ2lzdGVyZWRcbiAgICogQHBhcmFtIHtQbHVnaW59IHBsdWdpbiAtIHRoZSB7QGxpbmsgUGx1Z2lufSB0byBiZSByZWdpc3RlcmVkXG4gICAqIEByZXR1cm4ge0V1cm9wYX0gQSByZWZlcmVuY2UgdG8gdGhpcyB7QGxpbmsgRXVyb3BhfSBmb3IgY2hhaW5pbmcgcHVycG9zZXMuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHJlZ2lzdGVyKHRhZ3MsIHBsdWdpbikge1xuICAgIGlmICh0eXBlb2YgdGFncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRhZ3MgPSB0YWdzLnRyaW0oKS5zcGxpdCgvXFxzKy8pXG4gICAgfVxuXG4gICAgdGFncy5mb3JFYWNoKCh0YWcpID0+IHRoaXMuX3BsdWdpbnMuc2V0KHRhZy50b0xvd2VyQ2FzZSgpLCBwbHVnaW4pKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYWxsIG9mIHRoZSBwbHVnaW5zIHdpdGhpbiB0aGUgc3BlY2lmaWVkIDxjb2RlPnByZXNldDwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7UHJlc2V0fSBwcmVzZXQgLSB0aGUge0BsaW5rIFByZXNldH0gd2hvc2UgcGx1Z2lucyBhcmUgdG8gYmUgcmVnaXN0ZXJlZFxuICAgKiBAcmV0dXJuIHtFdXJvcGF9IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIEV1cm9wYX0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICByZWdpc3RlclByZXNldChwcmVzZXQpIHtcbiAgICBmb3IgKGNvbnN0IFsgdGFncywgcGx1Z2luIF0gb2YgcHJlc2V0LnBsdWdpbnMpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXIodGFncywgcGx1Z2luKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmh0bWw8L2NvZGU+IGludG8gTWFya2Rvd24gdXNpbmcgdGhlIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiA8Y29kZT5odG1sPC9jb2RlPiBjYW4gZWl0aGVyIGJlIGFuIEhUTUwgc3RyaW5nIG9yIGEgRE9NIGVsZW1lbnQgd2hvc2UgSFRNTCBjb250ZW50cyBhcmUgdG8gYmUgdHJhbnNmb3JtZWQgaW50b1xuICAgKiBNYXJrZG93bi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fHN0cmluZ30gaHRtbCAtIHRoZSBIVE1MIChvciBlbGVtZW50IHdob3NlIGlubmVyIEhUTUwpIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd25cbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb3B0aW9ucyB0byBiZSB1c2VkXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRyYW5zZm9ybWVkIE1hcmtkb3duLlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm0oaHRtbCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgd2luZG93IH0gPSB0aGlzXG4gICAgY29uc3QgdHJhbnNmb3JtZXIgPSBuZXcgVHJhbnNmb3JtZXIod2luZG93LCB0aGlzLl9wbHVnaW5zKVxuXG4gICAgb3B0aW9ucyA9IHRoaXMuX2NyZWF0ZVRyYW5zZm9ybWVyT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyLnRyYW5zZm9ybShodG1sLCBvcHRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG9wdGlvbnMsIGluY2x1ZGluZyB0aGVpciBkZWZhdWx0IHZhbHVlcywgZm9yIHRoZSB7QGxpbmsgVHJhbnNmb3JtZXIjdHJhbnNmb3JtfSBtZXRob2QgYmFzZWQgb24gdGhlXG4gICAqIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvcHRpb25zIHRoYXQgd2VyZSBwYXNzZWQgaW5cbiAgICogQHJldHVybiB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gVGhlIGNvbXBsZXRlIG9wdGlvbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlVHJhbnNmb3JtZXJPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhYnNvbHV0ZTogZmFsc2UsXG4gICAgICBiYXNlVXJpOiB0aGlzLl93aW5kb3dTZXJ2aWNlLmdldEJhc2VVcmkodGhpcy53aW5kb3cpLFxuICAgICAgaW5saW5lOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiBmb3IgdGhpcyB7QGxpbmsgRXVyb3BhfSBpbnN0YW5jZS5cbiAgICpcbiAgICogSWYgbm8gPGNvZGU+V2luZG93PC9jb2RlPiBoYXMgYmVlbiBhbGxvY2F0ZWQsIG9uZSBpcyByZXRyaWV2ZWQgZnJvbSB0aGUge0BsaW5rIFdpbmRvd1NlcnZpY2V9IGFuZCBhbGxvY2F0ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge1dpbmRvd30gVGhlIDxjb2RlPldpbmRvdzwvY29kZT4uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCB3aW5kb3coKSB7XG4gICAgaWYgKHRoaXMuX3dpbmRvdyA9PSBudWxsKSB7XG4gICAgICB0aGlzLl93aW5kb3cgPSB0aGlzLl93aW5kb3dTZXJ2aWNlLmdldFdpbmRvdygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3dpbmRvd1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXVyb3BhXG4iXX0=
