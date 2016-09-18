"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preset = undefined;

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

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
 * A preset of plugins usually grouped for a specific purpose.
 *
 * @public
 */
var Preset = function () {

  /**
   * Creates an instance of {@link Preset}.
   *
   * @public
   */
  function Preset() {
    (0, _classCallCheck3.default)(this, Preset);

    /**
     * The plugins for this {@link Preset}.
     *
     * @private
     * @type {Map<string[], Plugin>}
     */
    this._plugins = new _map2.default();
  }

  /**
   * Sets the specified <code>plugin</code> for the <code>tags</code> provided.
   *
   * @param {string[]} tags - the tag names to which <code>plugin</code> will be registered
   * @param {Plugin} plugin - the {@link Plugin} to be registered against <code>tags</code>
   * @return {Preset} A reference to this {@link Preset} for chaining purposes.
   * @public
   */


  (0, _createClass3.default)(Preset, [{
    key: "set",
    value: function set(tags, plugin) {
      this._plugins.set(tags, plugin);

      return this;
    }

    /**
     * Sets all of the specified <code>plugins</code> to be registered against their mapped tag names.
     *
     * @param {Map<string[], Plugin>} plugins - a <code>Map</code> of plugins and tag names to which they are
     * to be registered
     * @return {Preset} A reference to this {@link Preset} for chaining purposes.
     * @public
     */

  }, {
    key: "setAll",
    value: function setAll(plugins) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(plugins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2);

          var tags = _step$value[0];
          var plugin = _step$value[1];

          this._plugins.set(tags, plugin);
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
     * Returns the plugins for this {@link Preset}.
     *
     * @return {Map<string[], Plugin>} The plugins.
     * @public
     */

  }, {
    key: "plugins",
    get: function get() {
      return new _map2.default(this._plugins);
    }
  }]);
  return Preset;
}();

exports.Preset = Preset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlc2V0L3ByZXNldC5qcyJdLCJuYW1lcyI6WyJQcmVzZXQiLCJfcGx1Z2lucyIsInRhZ3MiLCJwbHVnaW4iLCJzZXQiLCJwbHVnaW5zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7OztJQUtNQSxNOztBQUVKOzs7OztBQUtBLG9CQUFjO0FBQUE7O0FBQ1o7Ozs7OztBQU1BLFNBQUtDLFFBQUwsR0FBZ0IsbUJBQWhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozt3QkFRSUMsSSxFQUFNQyxNLEVBQVE7QUFDaEIsV0FBS0YsUUFBTCxDQUFjRyxHQUFkLENBQWtCRixJQUFsQixFQUF3QkMsTUFBeEI7O0FBRUEsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7OzJCQVFPRSxPLEVBQVM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDZCx3REFBK0JBLE9BQS9CLDRHQUF3QztBQUFBOztBQUFBLGNBQTNCSCxJQUEyQjtBQUFBLGNBQXJCQyxNQUFxQjs7QUFDdEMsZUFBS0YsUUFBTCxDQUFjRyxHQUFkLENBQWtCRixJQUFsQixFQUF3QkMsTUFBeEI7QUFDRDtBQUhhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS2QsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozt3QkFNYztBQUNaLGFBQU8sa0JBQVEsS0FBS0YsUUFBYixDQUFQO0FBQ0Q7Ozs7O1FBSU1ELE0sR0FBQUEsTSIsImZpbGUiOiJwcmVzZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQSBwcmVzZXQgb2YgcGx1Z2lucyB1c3VhbGx5IGdyb3VwZWQgZm9yIGEgc3BlY2lmaWMgcHVycG9zZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFByZXNldCB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFByZXNldH0uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBwbHVnaW5zIGZvciB0aGlzIHtAbGluayBQcmVzZXR9LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZ1tdLCBQbHVnaW4+fVxuICAgICAqL1xuICAgIHRoaXMuX3BsdWdpbnMgPSBuZXcgTWFwKClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzcGVjaWZpZWQgPGNvZGU+cGx1Z2luPC9jb2RlPiBmb3IgdGhlIDxjb2RlPnRhZ3M8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0YWdzIC0gdGhlIHRhZyBuYW1lcyB0byB3aGljaCA8Y29kZT5wbHVnaW48L2NvZGU+IHdpbGwgYmUgcmVnaXN0ZXJlZFxuICAgKiBAcGFyYW0ge1BsdWdpbn0gcGx1Z2luIC0gdGhlIHtAbGluayBQbHVnaW59IHRvIGJlIHJlZ2lzdGVyZWQgYWdhaW5zdCA8Y29kZT50YWdzPC9jb2RlPlxuICAgKiBAcmV0dXJuIHtQcmVzZXR9IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIFByZXNldH0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXQodGFncywgcGx1Z2luKSB7XG4gICAgdGhpcy5fcGx1Z2lucy5zZXQodGFncywgcGx1Z2luKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGFsbCBvZiB0aGUgc3BlY2lmaWVkIDxjb2RlPnBsdWdpbnM8L2NvZGU+IHRvIGJlIHJlZ2lzdGVyZWQgYWdhaW5zdCB0aGVpciBtYXBwZWQgdGFnIG5hbWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmdbXSwgUGx1Z2luPn0gcGx1Z2lucyAtIGEgPGNvZGU+TWFwPC9jb2RlPiBvZiBwbHVnaW5zIGFuZCB0YWcgbmFtZXMgdG8gd2hpY2ggdGhleSBhcmVcbiAgICogdG8gYmUgcmVnaXN0ZXJlZFxuICAgKiBAcmV0dXJuIHtQcmVzZXR9IEEgcmVmZXJlbmNlIHRvIHRoaXMge0BsaW5rIFByZXNldH0gZm9yIGNoYWluaW5nIHB1cnBvc2VzLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXRBbGwocGx1Z2lucykge1xuICAgIGZvciAoY29uc3QgWyB0YWdzLCBwbHVnaW4gXSBvZiBwbHVnaW5zKSB7XG4gICAgICB0aGlzLl9wbHVnaW5zLnNldCh0YWdzLCBwbHVnaW4pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwbHVnaW5zIGZvciB0aGlzIHtAbGluayBQcmVzZXR9LlxuICAgKlxuICAgKiBAcmV0dXJuIHtNYXA8c3RyaW5nW10sIFBsdWdpbj59IFRoZSBwbHVnaW5zLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXQgcGx1Z2lucygpIHtcbiAgICByZXR1cm4gbmV3IE1hcCh0aGlzLl9wbHVnaW5zKVxuICB9XG5cbn1cblxuZXhwb3J0IHsgUHJlc2V0IH1cbiJdfQ==
