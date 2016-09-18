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
        root = this._document.createElement('div');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1lci5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1lciIsIndpbmRvdyIsInBsdWdpbnMiLCJkb2N1bWVudCIsIl9wbHVnaW5zIiwiaHRtbCIsIm9wdGlvbnMiLCJyb290IiwiX2RvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRyYW5zZm9ybWF0aW9uIiwidmFsdWVzIiwicGx1Z2luIiwiYmVmb3JlQWxsIiwidHJhbnNmb3JtRWxlbWVudCIsImFmdGVyQWxsIiwiYXBwZW5kIiwiYnVmZmVyIiwidHJpbSIsImVsZW1lbnQiLCJfaXNWaXNpYmxlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiY29udGV4dCIsImdldCIsInRhZ05hbWUiLCJwbHVnaW5TdGFjayIsInB1c2giLCJiZWZvcmUiLCJ0cmFuc2Zvcm0iLCJza2lwQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiY2hpbGQiLCJhZnRlciIsInBvcCIsIlRFWFRfTk9ERSIsInZhbHVlIiwibm9kZVZhbHVlIiwiaW5QcmVmb3JtYXR0ZWRCbG9jayIsIm91dHB1dCIsImluQ29kZUJsb2NrIiwicmVwbGFjZSIsInN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUVBOzs7OztJQUtNQSxXOztBQUVKOzs7Ozs7O0FBT0EsdUJBQVlDLE1BQVosRUFBb0JDLE9BQXBCLEVBQTZCO0FBQUE7O0FBQzNCOzs7Ozs7QUFNQSxTQUFLRCxNQUFMLEdBQWNBLE1BQWQ7O0FBRUE7Ozs7OztBQU1BLFNBQUtFLFFBQUwsR0FBZ0JGLE9BQU9FLFFBQXZCOztBQUVBOzs7Ozs7QUFNQSxTQUFLQyxRQUFMLEdBQWdCRixPQUFoQjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7OEJBV1VHLEksRUFBTUMsTyxFQUFTO0FBQ3ZCLFVBQUksQ0FBQ0QsSUFBTCxF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QUVPLElBQUkzQixlQUFlK0IsV0FBbkIsRUFBZ0M7QUFDckMvQix5QkFBZThCLE1BQWYsQ0FBc0JILE1BQU1LLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEtBQXBCLENBQXRCO0FBQ0QsU0FGTSxNQUVBO0FBQ0xoQyx5QkFBZThCLE1BQWYsQ0FBc0JILEtBQXRCLEVBQTZCLElBQTdCO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7OytCQVVXbEIsTyxFQUFTO0FBQ2xCLFVBQU13QixRQUFRLEtBQUszQyxNQUFMLENBQVk0QyxnQkFBWixDQUE2QnpCLE9BQTdCLENBQWQ7O0FBRUEsYUFBT3dCLE1BQU1FLGdCQUFOLENBQXVCLFNBQXZCLE1BQXNDLE1BQXRDLElBQWdERixNQUFNRSxnQkFBTixDQUF1QixZQUF2QixNQUF5QyxRQUFoRztBQUNEOzs7S0F6S0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2S1M5QyxXLEdBQUFBLFciLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IFRyYW5zZm9ybWF0aW9uIH0gZnJvbSAnLi90cmFuc2Zvcm1hdGlvbidcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGFuIEhUTUwgc3RyaW5nIG9yIERPTSBlbGVtZW50IGludG8gTWFya2Rvd24uXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBUcmFuc2Zvcm1lciB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFRyYW5zZm9ybWVyfSB1c2luZyB0aGUgc3BlY2lmaWVkIDxjb2RlPndpbmRvdzwvY29kZT4gYW5kIDxjb2RlPnBsdWdpbnM8L2NvZGU+LlxuICAgKlxuICAgKiBAcGFyYW0ge1dpbmRvd30gd2luZG93IC0gdGhlIDxjb2RlPldpbmRvdzwvY29kZT4gdG8gYmUgdXNlZFxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsIFBsdWdpbj59IHBsdWdpbnMgLSB0aGUgcGx1Z2lucyB0byBiZSB1c2VkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHdpbmRvdywgcGx1Z2lucykge1xuICAgIC8qKlxuICAgICAqIFRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1lcn0uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge1dpbmRvd31cbiAgICAgKi9cbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvd1xuXG4gICAgLyoqXG4gICAgICogVGhlIDxjb2RlPkhUTUxEb2N1bWVudDwvY29kZT4gZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWVyfS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7SFRNTERvY3VtZW50fVxuICAgICAqL1xuICAgIHRoaXMuZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnRcblxuICAgIC8qKlxuICAgICAqIFRoZSBwbHVnaW5zIGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1lcn0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBQbHVnaW4+fVxuICAgICAqL1xuICAgIHRoaXMuX3BsdWdpbnMgPSBwbHVnaW5zXG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmh0bWw8L2NvZGU+IGludG8gTWFya2Rvd24gdXNpbmcgdGhlIDxjb2RlPm9wdGlvbnM8L2NvZGU+IHByb3ZpZGVkLlxuICAgKlxuICAgKiA8Y29kZT5odG1sPC9jb2RlPiBjYW4gZWl0aGVyIGJlIGFuIEhUTUwgc3RyaW5nIG9yIGEgRE9NIGVsZW1lbnQgd2hvc2UgSFRNTCBjb250ZW50cyBhcmUgdG8gYmUgdHJhbnNmb3JtZWQgaW50b1xuICAgKiBNYXJrZG93bi5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fHN0cmluZ30gaHRtbCAtIHRoZSBIVE1MIChvciBlbGVtZW50IHdob3NlIGlubmVyIEhUTUwpIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd25cbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBvcHRpb25zIC0gdGhlIG9wdGlvbnMgdG8gYmUgdXNlZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2Zvcm1lZCBNYXJrZG93bi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdHJhbnNmb3JtKGh0bWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWh0bWwpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGxldCByb290XG4gICAgaWYgKHR5cGVvZiBodG1sID09PSAnc3RyaW5nJykge1xuICAgICAgcm9vdCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICByb290LmlubmVySFRNTCA9IGh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdCA9IGh0bWxcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2Zvcm1hdGlvbiA9IG5ldyBUcmFuc2Zvcm1hdGlvbih0aGlzLCBvcHRpb25zKVxuXG4gICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fcGx1Z2lucy52YWx1ZXMoKSkge1xuICAgICAgcGx1Z2luLmJlZm9yZUFsbCh0cmFuc2Zvcm1hdGlvbilcbiAgICB9XG5cbiAgICB0aGlzLnRyYW5zZm9ybUVsZW1lbnQocm9vdCwgdHJhbnNmb3JtYXRpb24pXG5cbiAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLl9wbHVnaW5zLnZhbHVlcygpKSB7XG4gICAgICBwbHVnaW4uYWZ0ZXJBbGwodHJhbnNmb3JtYXRpb24pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWF0aW9uLmFwcGVuZCgnJykuYnVmZmVyLnRyaW0oKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHNwZWNpZmllZCA8Y29kZT5lbGVtZW50PC9jb2RlPiBhbmQgaXQncyBjaGlsZHJlbiBpbnRvIE1hcmtkb3duIHVzaW5nIHRoZSA8Y29kZT50cmFuc2Zvcm1hdGlvbjwvY29kZT5cbiAgICogcHJvdmlkZWQuXG4gICAqXG4gICAqIE5vdGhpbmcgaGFwcGVucyBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyA8Y29kZT5udWxsPC9jb2RlPiBvciBpcyBpbnZpc2libGUgKHNpbXBsaWZpZWQgZGV0ZWN0aW9uIHVzZWQpLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvIE1hcmtkb3duIGFzIHdlbGwgYXMgaXQncyBjaGlsZHJlblxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn1cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdHJhbnNmb3JtRWxlbWVudChlbGVtZW50LCB0cmFuc2Zvcm1hdGlvbikge1xuICAgIGlmICghKGVsZW1lbnQgJiYgdGhpcy5faXNWaXNpYmxlKGVsZW1lbnQpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IHRoaXMud2luZG93Lk5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5lbGVtZW50ID0gZWxlbWVudFxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gbmV3IE1hcCgpXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLl9wbHVnaW5zLmdldCh0cmFuc2Zvcm1hdGlvbi50YWdOYW1lKVxuICAgICAgaWYgKHBsdWdpbikge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5wbHVnaW5TdGFjay5wdXNoKHBsdWdpbilcblxuICAgICAgICBwbHVnaW4uYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KVxuICAgICAgICBwbHVnaW4udHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRyYW5zZm9ybWF0aW9uLnNraXBDaGlsZHJlbikge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKSkge1xuICAgICAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudChjaGlsZCwgdHJhbnNmb3JtYXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBsdWdpbikge1xuICAgICAgICBwbHVnaW4uYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG5cbiAgICAgICAgdHJhbnNmb3JtYXRpb24ucGx1Z2luU3RhY2sucG9wKClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IHRoaXMud2luZG93Lk5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQubm9kZVZhbHVlIHx8ICcnXG5cbiAgICAgIGlmICh0cmFuc2Zvcm1hdGlvbi5pblByZWZvcm1hdHRlZEJsb2NrKSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtYXRpb24uaW5Db2RlQmxvY2spIHtcbiAgICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KHZhbHVlLnJlcGxhY2UoL2AvZywgJ1xcXFxgJykpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQodmFsdWUsIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgY3VycmVudGx5IHZpc2libGUuXG4gICAqXG4gICAqIFRoaXMgaXMgbm90IGEgdmVyeSBzb3BoaXN0aWNhdGVkIGNoZWNrIGFuZCBjb3VsZCBlYXNpbHkgYmUgbWlzdGFrZW4sIGJ1dCBpdCBzaG91bGQgY2F0Y2ggYSBsb3Qgb2YgdGhlIG1vc3Qgc2ltcGxlXG4gICAqIGNhc2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB3aG9zZSB2aXNpYmlsaXR5IGlzIHRvIGJlIGNoZWNrZWRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgdmlzaWJsZTsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc1Zpc2libGUoZWxlbWVudCkge1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuXG4gICAgcmV0dXJuIHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnICYmIHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbidcbiAgfVxuXG59XG5cbmV4cG9ydCB7IFRyYW5zZm9ybWVyIH1cbiJdfQ==
