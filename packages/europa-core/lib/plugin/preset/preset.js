"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = Preset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlc2V0L3ByZXNldC5qcyJdLCJuYW1lcyI6WyJQcmVzZXQiLCJfcGx1Z2lucyIsInRhZ3MiLCJwbHVnaW4iLCJzZXQiLCJwbHVnaW5zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7Ozs7O0lBS01BLE07O0FBRUo7Ozs7O0FBS0Esb0JBQWM7QUFBQTs7QUFDWjs7Ozs7O0FBTUEsU0FBS0MsUUFBTCxHQUFnQixtQkFBaEI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7O3dCQVFJQyxJLEVBQU1DLE0sRUFBUTtBQUNoQixXQUFLRixRQUFMLENBQWNHLEdBQWQsQ0FBa0JGLElBQWxCLEVBQXdCQyxNQUF4Qjs7QUFFQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBUU9FLE8sRUFBUztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNkLHdEQUErQkEsT0FBL0IsNEdBQXdDO0FBQUE7O0FBQUEsY0FBM0JILElBQTJCO0FBQUEsY0FBckJDLE1BQXFCOztBQUN0QyxlQUFLRixRQUFMLENBQWNHLEdBQWQsQ0FBa0JGLElBQWxCLEVBQXdCQyxNQUF4QjtBQUNEO0FBSGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLZCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O3dCQU1jO0FBQ1osYUFBTyxrQkFBUSxLQUFLRixRQUFiLENBQVA7QUFDRDs7Ozs7a0JBSVlELE0iLCJmaWxlIjoicHJlc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEEgcHJlc2V0IG9mIHBsdWdpbnMgdXN1YWxseSBncm91cGVkIGZvciBhIHNwZWNpZmljIHB1cnBvc2UuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBQcmVzZXQge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHtAbGluayBQcmVzZXR9LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2lucyBmb3IgdGhpcyB7QGxpbmsgUHJlc2V0fS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge01hcDxzdHJpbmdbXSwgUGx1Z2luPn1cbiAgICAgKi9cbiAgICB0aGlzLl9wbHVnaW5zID0gbmV3IE1hcCgpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc3BlY2lmaWVkIDxjb2RlPnBsdWdpbjwvY29kZT4gZm9yIHRoZSA8Y29kZT50YWdzPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdGFncyAtIHRoZSB0YWcgbmFtZXMgdG8gd2hpY2ggPGNvZGU+cGx1Z2luPC9jb2RlPiB3aWxsIGJlIHJlZ2lzdGVyZWRcbiAgICogQHBhcmFtIHtQbHVnaW59IHBsdWdpbiAtIHRoZSB7QGxpbmsgUGx1Z2lufSB0byBiZSByZWdpc3RlcmVkIGFnYWluc3QgPGNvZGU+dGFnczwvY29kZT5cbiAgICogQHJldHVybiB7UHJlc2V0fSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBQcmVzZXR9IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0KHRhZ3MsIHBsdWdpbikge1xuICAgIHRoaXMuX3BsdWdpbnMuc2V0KHRhZ3MsIHBsdWdpbilcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhbGwgb2YgdGhlIHNwZWNpZmllZCA8Y29kZT5wbHVnaW5zPC9jb2RlPiB0byBiZSByZWdpc3RlcmVkIGFnYWluc3QgdGhlaXIgbWFwcGVkIHRhZyBuYW1lcy5cbiAgICpcbiAgICogQHBhcmFtIHtNYXA8c3RyaW5nW10sIFBsdWdpbj59IHBsdWdpbnMgLSBhIDxjb2RlPk1hcDwvY29kZT4gb2YgcGx1Z2lucyBhbmQgdGFnIG5hbWVzIHRvIHdoaWNoIHRoZXkgYXJlXG4gICAqIHRvIGJlIHJlZ2lzdGVyZWRcbiAgICogQHJldHVybiB7UHJlc2V0fSBBIHJlZmVyZW5jZSB0byB0aGlzIHtAbGluayBQcmVzZXR9IGZvciBjaGFpbmluZyBwdXJwb3Nlcy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0QWxsKHBsdWdpbnMpIHtcbiAgICBmb3IgKGNvbnN0IFsgdGFncywgcGx1Z2luIF0gb2YgcGx1Z2lucykge1xuICAgICAgdGhpcy5fcGx1Z2lucy5zZXQodGFncywgcGx1Z2luKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGx1Z2lucyBmb3IgdGhpcyB7QGxpbmsgUHJlc2V0fS5cbiAgICpcbiAgICogQHJldHVybiB7TWFwPHN0cmluZ1tdLCBQbHVnaW4+fSBUaGUgcGx1Z2lucy5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0IHBsdWdpbnMoKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAodGhpcy5fcGx1Z2lucylcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByZXNldFxuIl19
