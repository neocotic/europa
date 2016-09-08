'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _transformation2 = _interopRequireDefault(_transformation);

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

      var transformation = new _transformation2.default(this, options);

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

exports.default = Transformer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1lci5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1lciIsIndpbmRvdyIsInBsdWdpbnMiLCJkb2N1bWVudCIsIl9wbHVnaW5zIiwiaHRtbCIsIm9wdGlvbnMiLCJyb290IiwiX2RvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRyYW5zZm9ybWF0aW9uIiwidmFsdWVzIiwicGx1Z2luIiwiYmVmb3JlQWxsIiwidHJhbnNmb3JtRWxlbWVudCIsImFmdGVyQWxsIiwiYXBwZW5kIiwiYnVmZmVyIiwidHJpbSIsImVsZW1lbnQiLCJfaXNWaXNpYmxlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiY29udGV4dCIsImdldCIsInRhZ05hbWUiLCJwbHVnaW5TdGFjayIsInB1c2giLCJiZWZvcmUiLCJ0cmFuc2Zvcm0iLCJza2lwQ2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiY2hpbGQiLCJhZnRlciIsInBvcCIsIlRFWFRfTk9ERSIsInZhbHVlIiwibm9kZVZhbHVlIiwiaW5QcmVmb3JtYXR0ZWRCbG9jayIsIm91dHB1dCIsImluQ29kZUJsb2NrIiwicmVwbGFjZSIsInN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7QUFFQTs7Ozs7SUFLTUEsVzs7QUFFSjs7Ozs7OztBQU9BLHVCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QjtBQUFBOztBQUMzQjs7Ozs7O0FBTUEsU0FBS0QsTUFBTCxHQUFjQSxNQUFkOztBQUVBOzs7Ozs7QUFNQSxTQUFLRSxRQUFMLEdBQWdCRixPQUFPRSxRQUF2Qjs7QUFFQTs7Ozs7O0FBTUEsU0FBS0MsUUFBTCxHQUFnQkYsT0FBaEI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OzhCQVdVRyxJLEVBQU1DLE8sRUFBUztBQUN2QixVQUFJLENBQUNELElBQUws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TUFFTyxJQUFJM0IsZUFBZStCLFdBQW5CLEVBQWdDO0FBQ3JDL0IseUJBQWU4QixNQUFmLENBQXNCSCxNQUFNSyxPQUFOLENBQWMsSUFBZCxFQUFvQixLQUFwQixDQUF0QjtBQUNELFNBRk0sTUFFQTtBQUNMaEMseUJBQWU4QixNQUFmLENBQXNCSCxLQUF0QixFQUE2QixJQUE3QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRDs7Ozs7Ozs7Ozs7OzsrQkFVV2xCLE8sRUFBUztBQUNsQixVQUFNd0IsUUFBUSxLQUFLM0MsTUFBTCxDQUFZNEMsZ0JBQVosQ0FBNkJ6QixPQUE3QixDQUFkOztBQUVBLGFBQU93QixNQUFNRSxnQkFBTixDQUF1QixTQUF2QixNQUFzQyxNQUF0QyxJQUFnREYsTUFBTUUsZ0JBQU4sQ0FBdUIsWUFBdkIsTUFBeUMsUUFBaEc7QUFDRDs7O0tBektIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQTZLZTlDLFciLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBUcmFuc2Zvcm1hdGlvbiBmcm9tICcuL3RyYW5zZm9ybWF0aW9uJ1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gSFRNTCBzdHJpbmcgb3IgRE9NIGVsZW1lbnQgaW50byBNYXJrZG93bi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFRyYW5zZm9ybWVyIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgVHJhbnNmb3JtZXJ9IHVzaW5nIHRoZSBzcGVjaWZpZWQgPGNvZGU+d2luZG93PC9jb2RlPiBhbmQgPGNvZGU+cGx1Z2luczwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93fSB3aW5kb3cgLSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiB0byBiZSB1c2VkXG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZywgUGx1Z2luPn0gcGx1Z2lucyAtIHRoZSBwbHVnaW5zIHRvIGJlIHVzZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3Iod2luZG93LCBwbHVnaW5zKSB7XG4gICAgLyoqXG4gICAgICogVGhlIDxjb2RlPldpbmRvdzwvY29kZT4gZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWVyfS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7V2luZG93fVxuICAgICAqL1xuICAgIHRoaXMud2luZG93ID0gd2luZG93XG5cbiAgICAvKipcbiAgICAgKiBUaGUgPGNvZGU+SFRNTERvY3VtZW50PC9jb2RlPiBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtZXJ9LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtIVE1MRG9jdW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5kb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudFxuXG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbnMgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWVyfS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge01hcDxzdHJpbmcsIFBsdWdpbj59XG4gICAgICovXG4gICAgdGhpcy5fcGx1Z2lucyA9IHBsdWdpbnNcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBzcGVjaWZpZWQgPGNvZGU+aHRtbDwvY29kZT4gaW50byBNYXJrZG93biB1c2luZyB0aGUgPGNvZGU+b3B0aW9uczwvY29kZT4gcHJvdmlkZWQuXG4gICAqXG4gICAqIDxjb2RlPmh0bWw8L2NvZGU+IGNhbiBlaXRoZXIgYmUgYW4gSFRNTCBzdHJpbmcgb3IgYSBET00gZWxlbWVudCB3aG9zZSBIVE1MIGNvbnRlbnRzIGFyZSB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvXG4gICAqIE1hcmtkb3duLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR8c3RyaW5nfSBodG1sIC0gdGhlIEhUTUwgKG9yIGVsZW1lbnQgd2hvc2UgaW5uZXIgSFRNTCkgdG8gYmUgdHJhbnNmb3JtZWQgaW50byBNYXJrZG93blxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IG9wdGlvbnMgLSB0aGUgb3B0aW9ucyB0byBiZSB1c2VkXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRyYW5zZm9ybWVkIE1hcmtkb3duLlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm0oaHRtbCwgb3B0aW9ucykge1xuICAgIGlmICghaHRtbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgbGV0IHJvb3RcbiAgICBpZiAodHlwZW9mIGh0bWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByb290ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHJvb3QuaW5uZXJIVE1MID0gaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICByb290ID0gaHRtbFxuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zZm9ybWF0aW9uID0gbmV3IFRyYW5zZm9ybWF0aW9uKHRoaXMsIG9wdGlvbnMpXG5cbiAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLl9wbHVnaW5zLnZhbHVlcygpKSB7XG4gICAgICBwbHVnaW4uYmVmb3JlQWxsKHRyYW5zZm9ybWF0aW9uKVxuICAgIH1cblxuICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudChyb290LCB0cmFuc2Zvcm1hdGlvbilcblxuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuX3BsdWdpbnMudmFsdWVzKCkpIHtcbiAgICAgIHBsdWdpbi5hZnRlckFsbCh0cmFuc2Zvcm1hdGlvbilcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtYXRpb24uYXBwZW5kKCcnKS5idWZmZXIudHJpbSgpXG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgc3BlY2lmaWVkIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGFuZCBpdCdzIGNoaWxkcmVuIGludG8gTWFya2Rvd24gdXNpbmcgdGhlIDxjb2RlPnRyYW5zZm9ybWF0aW9uPC9jb2RlPlxuICAgKiBwcm92aWRlZC5cbiAgICpcbiAgICogTm90aGluZyBoYXBwZW5zIGlmIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIDxjb2RlPm51bGw8L2NvZGU+IG9yIGlzIGludmlzaWJsZSAoc2ltcGxpZmllZCBkZXRlY3Rpb24gdXNlZCkuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd24gYXMgd2VsbCBhcyBpdCdzIGNoaWxkcmVuXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm1FbGVtZW50KGVsZW1lbnQsIHRyYW5zZm9ybWF0aW9uKSB7XG4gICAgaWYgKCEoZWxlbWVudCAmJiB0aGlzLl9pc1Zpc2libGUoZWxlbWVudCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gdGhpcy53aW5kb3cuTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX3BsdWdpbnMuZ2V0KHRyYW5zZm9ybWF0aW9uLnRhZ05hbWUpXG4gICAgICBpZiAocGx1Z2luKSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLnBsdWdpblN0YWNrLnB1c2gocGx1Z2luKVxuXG4gICAgICAgIHBsdWdpbi5iZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG4gICAgICAgIHBsdWdpbi50cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG4gICAgICB9XG5cbiAgICAgIGlmICghdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpKSB7XG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KGNoaWxkLCB0cmFuc2Zvcm1hdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGx1Z2luKSB7XG4gICAgICAgIHBsdWdpbi5hZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dClcblxuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5wbHVnaW5TdGFjay5wb3AoKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gdGhpcy53aW5kb3cuTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudC5ub2RlVmFsdWUgfHwgJydcblxuICAgICAgaWYgKHRyYW5zZm9ybWF0aW9uLmluUHJlZm9ybWF0dGVkQmxvY2spIHtcbiAgICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KHZhbHVlKVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2Zvcm1hdGlvbi5pbkNvZGVCbG9jaykge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQodmFsdWUucmVwbGFjZSgvYC9nLCAnXFxcXGAnKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCh2YWx1ZSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBjdXJyZW50bHkgdmlzaWJsZS5cbiAgICpcbiAgICogVGhpcyBpcyBub3QgYSB2ZXJ5IHNvcGhpc3RpY2F0ZWQgY2hlY2sgYW5kIGNvdWxkIGVhc2lseSBiZSBtaXN0YWtlbiwgYnV0IGl0IHNob3VsZCBjYXRjaCBhIGxvdCBvZiB0aGUgbW9zdCBzaW1wbGVcbiAgICogY2FzZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHdob3NlIHZpc2liaWxpdHkgaXMgdG8gYmUgY2hlY2tlZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyB2aXNpYmxlOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzVmlzaWJsZShlbGVtZW50KSB7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpICE9PSAnbm9uZScgJiYgc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJ1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJhbnNmb3JtZXJcbiJdfQ==
