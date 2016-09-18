'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformer = undefined;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _transformation = require('./transformation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Transforms an HTML string or DOM element into Markdown.
 *
 * @public
 */
var Transformer = function () {

  /**
   * Creates an instance of {@link Transformer} using the specified <code>window</code> and <code>plugins</code>.
   *
   * @param {Window} window - the <code>Window</code> to be used
   * @param {Map<string, Plugin>} plugins - the plugins to be used
   * @public
   */
  function Transformer(window, plugins) {
    (0, _classCallCheck3.default)(this, Transformer);

    /**
     * The <code>Window</code> for this {@link Transformer}.
     *
     * @public
     * @type {Window}
     */
    this.window = window;

    /**
     * The <code>HTMLDocument</code> for this {@link Transformer}.
     *
     * @public
     * @type {HTMLDocument}
     */
    this.document = window.document;

    /**
     * The plugins for this {@link Transformer}.
     *
     * @private
     * @type {Map<string, Plugin>}
     */
    this._plugins = plugins;
  }

  /**
   * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
   *
   * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
   * Markdown.
   *
   * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
   * @param {Transformation~Options} options - the options to be used
   * @return {string} The transformed Markdown.
   * @public
   */


  (0, _createClass3.default)(Transformer, [{
    key: 'transform',
    value: function transform(html, options) {
      if (!html) {
        return '';
      }

      var root = void 0;
      if (typeof html === 'string') {
        root = this.document.createElement('div');
        root.innerHTML = html;
      } else {
        root = html;
      }

      var transformation = new _transformation.Transformation(this, options);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._plugins.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          plugin.beforeAll(transformation);
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

      this.transformElement(root, transformation);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this._plugins.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _plugin = _step2.value;

          _plugin.afterAll(transformation);
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

      return transformation.append('').buffer.trim();
    }

    /**
     * Transforms the specified <code>element</code> and it's children into Markdown using the <code>transformation</code>
     * provided.
     *
     * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
     *
     * @param {Element} element - the element to be transformed into Markdown as well as it's children
     * @param {Transformation} transformation - the current {@link Transformation}
     * @return {void}
     * @public
     */

  }, {
    key: 'transformElement',
    value: function transformElement(element, transformation) {
      if (!(element && this._isVisible(element))) {
        return;
      }

      if (element.nodeType === this.window.Node.ELEMENT_NODE) {
        transformation.element = element;

        var context = new _map2.default();
        var plugin = this._plugins.get(transformation.tagName);
        if (plugin) {
          transformation.pluginStack.push(plugin);

          plugin.before(transformation, context);
          plugin.transform(transformation, context);
        }

        if (!transformation.skipChildren) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)((0, _from2.default)(element.childNodes)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var child = _step3.value;

              this.transformElement(child, transformation);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        if (plugin) {
          plugin.after(transformation, context);

          transformation.pluginStack.pop();
        }
      } else if (element.nodeType === this.window.Node.TEXT_NODE) {
        var value = element.nodeValue || '';

        if (transformation.inPreformattedBlock) {
          transformation.output(value);
        } else if (transformation.inCodeBlock) {
          transformation.output(value.replace(/`/g, '\\`'));
        } else {
          transformation.output(value, true);
        }
      }
    }

    /**
     * Checks whether the specified <code>element</code> is currently visible.
     *
     * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
     * cases.
     *
     * @param {Element} element - the element whose visibility is to be checked
     * @return {boolean} <code>true</code> if <code>element</code> is visible; otherwise <code>false</code>.
     * @private
     */

  }, {
    key: '_isVisible',
    value: function _isVisible(element) {
      var style = this.window.getComputedStyle(element);

      return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
    }
  }]);
  return Transformer;
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

exports.Transformer = Transformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1lci5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1lciIsIndpbmRvdyIsInBsdWdpbnMiLCJkb2N1bWVudCIsIl9wbHVnaW5zIiwiaHRtbCIsIm9wdGlvbnMiLCJyb290IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRyYW5zZm9ybWF0aW9uIiwidmFsdWVzIiwicGx1Z2luIiwiYmVmb3JlQWxsIiwidHJhbnNmb3JtRWxlbWVudCIsImFmdGVyQWxsIiwiYXBwZW5kIiwiYnVmZmVyIiwidHJpbSIsImVsZW1lbnQiLCJfaXNWaXNpYmxlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiY29udGV4dCIsImdldCIsInRhZ05hbWUiLCJwbHVnaW5TdGFjayIsInB1c2giLCJiZWZvcmUiLCJ0cmFuc2Zvcm0iLCJza2lwQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiY2hpbGQiLCJhZnRlciIsInBvcCIsIlRFWFRfTk9ERSIsInZhbHVlIiwibm9kZVZhbHVlIiwiaW5QcmVmb3JtYXR0ZWRCbG9jayIsIm91dHB1dCIsImluQ29kZUJsb2NrIiwicmVwbGFjZSIsInN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7OztJQUtNQSxXOztBQUVKOzs7Ozs7O0FBT0EsdUJBQVlDLE1BQVosRUFBb0JDLE9BQXBCLEVBQTZCO0FBQUE7O0FBQzNCOzs7Ozs7QUFNQSxTQUFLRCxNQUFMLEdBQWNBLE1BQWQ7O0FBRUE7Ozs7OztBQU1BLFNBQUtFLFFBQUwsR0FBZ0JGLE9BQU9FLFFBQXZCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxRQUFMLEdBQWdCRixPQUFoQjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7OEJBV1VHLEksRUFBTUMsTyxFQUFTO0FBQ3ZCLFVBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1QsZUFB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QUFlK0IsV0FBbkIsRUFBZ0M7QUFDckMvQix5QkFBZThCLE1BQWYsQ0FBc0JILE1BQU1LLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEtBQXBCLENBQXRCO0FBQ0QsU0FGTSxNQUVBO0FBQ0xoQyx5QkFBZThCLE1BQWYsQ0FBc0JILEtBQXRCLEVBQTZCLElBQTdCO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7OytCQVVXbEIsTyxFQUFTO0FBQ2xCLFVBQU13QixRQUFRLEtBQUsxQyxNQUFMLENBQVkyQyxnQkFBWixDQUE2QnpCLE9BQTdCLENBQWQ7O0FBRUEsYUFBT3dCLE1BQU1FLGdCQUFOLENBQXVCLFNBQXZCLE1BQXNDLE1BQXRDLElBQWdERixNQUFNRSxnQkFBTixDQUF1QixZQUF2QixNQUF5QyxRQUFoRztBQUNEOzs7S0F6S0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2S1M3QyxXLEdBQUFBLFciLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFRyYW5zZm9ybWF0aW9uIH0gZnJvbSAnLi90cmFuc2Zvcm1hdGlvbidcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGFuIEhUTUwgc3RyaW5nIG9yIERPTSBlbGVtZW50IGludG8gTWFya2Rvd24uXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBUcmFuc2Zvcm1lciB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFRyYW5zZm9ybWVyfSB1c2luZyB0aGUgc3BlY2lmaWVkIDxjb2RlPndpbmRvdzwvY29kZT4gYW5kIDxjb2RlPnBsdWdpbnM8L2NvZGU+LlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gd2luZG93IC0gdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gdG8gYmUgdXNlZFxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIFBsdWdpbj59IHBsdWdpbnMgLSB0aGUgcGx1Z2lucyB0byBiZSB1c2VkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHdpbmRvdywgcGx1Z2lucykge1xuICAgIC8qKlxuICAgICAqIFRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1lcn0uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge1dpbmRvd31cbiAgICAgKi9cbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvd1xuXG4gICAgLyoqXG4gICAgICogVGhlIDxjb2RlPkhUTUxEb2N1bWVudDwvY29kZT4gZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWVyfS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7SFRNTERvY3VtZW50fVxuICAgICAqL1xuICAgIHRoaXMuZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnRcblxuICAgIC8qKlxuICAgICAqIFRoZSBwbHVnaW5zIGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1lcn0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBQbHVnaW4+fVxuICAgICAqL1xuICAgIHRoaXMuX3BsdWdpbnMgPSBwbHVnaW5zXG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmh0bWw8L2NvZGU+IGludG8gTWFya2Rvd24gdXNpbmcgdGhlIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiA8Y29kZT5odG1sPC9jb2RlPiBjYW4gZWl0aGVyIGJlIGFuIEhUTUwgc3RyaW5nIG9yIGEgRE9NIGVsZW1lbnQgd2hvc2UgSFRNTCBjb250ZW50cyBhcmUgdG8gYmUgdHJhbnNmb3JtZWQgaW50b1xuICAgKiBNYXJrZG93bi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fHN0cmluZ30gaHRtbCAtIHRoZSBIVE1MIChvciBlbGVtZW50IHdob3NlIGlubmVyIEhUTUwpIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd25cbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBvcHRpb25zIC0gdGhlIG9wdGlvbnMgdG8gYmUgdXNlZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2Zvcm1lZCBNYXJrZG93bi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdHJhbnNmb3JtKGh0bWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWh0bWwpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGxldCByb290XG4gICAgaWYgKHR5cGVvZiBodG1sID09PSAnc3RyaW5nJykge1xuICAgICAgcm9vdCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHJvb3QuaW5uZXJIVE1MID0gaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICByb290ID0gaHRtbFxuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zZm9ybWF0aW9uID0gbmV3IFRyYW5zZm9ybWF0aW9uKHRoaXMsIG9wdGlvbnMpXG5cbiAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLl9wbHVnaW5zLnZhbHVlcygpKSB7XG4gICAgICBwbHVnaW4uYmVmb3JlQWxsKHRyYW5zZm9ybWF0aW9uKVxuICAgIH1cblxuICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudChyb290LCB0cmFuc2Zvcm1hdGlvbilcblxuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuX3BsdWdpbnMudmFsdWVzKCkpIHtcbiAgICAgIHBsdWdpbi5hZnRlckFsbCh0cmFuc2Zvcm1hdGlvbilcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtYXRpb24uYXBwZW5kKCcnKS5idWZmZXIudHJpbSgpXG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGFuZCBpdCdzIGNoaWxkcmVuIGludG8gTWFya2Rvd24gdXNpbmcgdGhlIDxjb2RlPnRyYW5zZm9ybWF0aW9uPC9jb2RlPlxuICAgKiBwcm92aWRlZC5cbiAgICpcbiAgICogTm90aGluZyBoYXBwZW5zIGlmIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIDxjb2RlPm51bGw8L2NvZGU+IG9yIGlzIGludmlzaWJsZSAoc2ltcGxpZmllZCBkZXRlY3Rpb24gdXNlZCkuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd24gYXMgd2VsbCBhcyBpdCdzIGNoaWxkcmVuXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm1FbGVtZW50KGVsZW1lbnQsIHRyYW5zZm9ybWF0aW9uKSB7XG4gICAgaWYgKCEoZWxlbWVudCAmJiB0aGlzLl9pc1Zpc2libGUoZWxlbWVudCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gdGhpcy53aW5kb3cuTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX3BsdWdpbnMuZ2V0KHRyYW5zZm9ybWF0aW9uLnRhZ05hbWUpXG4gICAgICBpZiAocGx1Z2luKSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLnBsdWdpblN0YWNrLnB1c2gocGx1Z2luKVxuXG4gICAgICAgIHBsdWdpbi5iZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG4gICAgICAgIHBsdWdpbi50cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIGlmICghdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpKSB7XG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KGNoaWxkLCB0cmFuc2Zvcm1hdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGx1Z2luKSB7XG4gICAgICAgIHBsdWdpbi5hZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dClcblxuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5wbHVnaW5TdGFjay5wb3AoKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gdGhpcy53aW5kb3cuTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudC5ub2RlVmFsdWUgfHwgJydcblxuICAgICAgaWYgKHRyYW5zZm9ybWF0aW9uLmluUHJlZm9ybWF0dGVkQmxvY2spIHtcbiAgICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KHZhbHVlKVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2Zvcm1hdGlvbi5pbkNvZGVCbG9jaykge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQodmFsdWUucmVwbGFjZSgvYC9nLCAnXFxcXGAnKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCh2YWx1ZSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBjdXJyZW50bHkgdmlzaWJsZS5cbiAgICpcbiAgICogVGhpcyBpcyBub3QgYSB2ZXJ5IHNvcGhpc3RpY2F0ZWQgY2hlY2sgYW5kIGNvdWxkIGVhc2lseSBiZSBtaXN0YWtlbiwgYnV0IGl0IHNob3VsZCBjYXRjaCBhIGxvdCBvZiB0aGUgbW9zdCBzaW1wbGVcbiAgICogY2FzZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHdob3NlIHZpc2liaWxpdHkgaXMgdG8gYmUgY2hlY2tlZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyB2aXNpYmxlOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzVmlzaWJsZShlbGVtZW50KSB7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpICE9PSAnbm9uZScgJiYgc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJ1xuICB9XG5cbn1cblxuZXhwb3J0IHsgVHJhbnNmb3JtZXIgfVxuIl19
