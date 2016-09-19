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
      if (!element) {
        return;
      }

      if (element.nodeType === this.window.Node.ELEMENT_NODE) {
        if (!this._isVisible(element)) {
          return;
        }

        transformation.element = element;

        var context = new _map2.default();
        var plugin = this._plugins.get(transformation.tagName);
        var transformChildren = true;
        if (plugin) {
          transformation.pluginStack.push(plugin);

          plugin.before(transformation, context);
          transformChildren = plugin.transform(transformation, context);
        }

        if (transformChildren) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1lci5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1lciIsIndpbmRvdyIsInBsdWdpbnMiLCJkb2N1bWVudCIsIl9wbHVnaW5zIiwiaHRtbCIsIm9wdGlvbnMiLCJyb290IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRyYW5zZm9ybWF0aW9uIiwidmFsdWVzIiwicGx1Z2luIiwiYmVmb3JlQWxsIiwidHJhbnNmb3JtRWxlbWVudCIsImFmdGVyQWxsIiwiYXBwZW5kIiwiYnVmZmVyIiwidHJpbSIsImVsZW1lbnQiLCJub2RlVHlwZSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJfaXNWaXNpYmxlIiwiY29udGV4dCIsImdldCIsInRhZ05hbWUiLCJ0cmFuc2Zvcm1DaGlsZHJlbiIsInBsdWdpblN0YWNrIiwicHVzaCIsImJlZm9yZSIsInRyYW5zZm9ybSIsImNoaWxkTm9kZXMiLCJjaGlsZCIsImFmdGVyIiwicG9wIiwiVEVYVF9OT0RFIiwidmFsdWUiLCJub2RlVmFsdWUiLCJpblByZWZvcm1hdHRlZEJsb2NrIiwib3V0cHV0IiwiaW5Db2RlQmxvY2siLCJyZXBsYWNlIiwic3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7O0FBRUE7Ozs7O0lBS01BLFc7O0FBRUo7Ozs7Ozs7QUFPQSx1QkFBWUMsTUFBWixFQUFvQkMsT0FBcEIsRUFBNkI7QUFBQTs7QUFDM0I7Ozs7OztBQU1BLFNBQUtELE1BQUwsR0FBY0EsTUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBS0UsUUFBTCxHQUFnQkYsT0FBT0UsUUFBdkI7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLFFBQUwsR0FBZ0JGLE9BQWhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs4QkFXVUcsSSxFQUFNQyxPLEVBQVM7QUFDdkIsVUFBSSxDQUFDRCxJQUFMLEVBQVc7QUFD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QUN0QzdCLHlCQUFlOEIsTUFBZixDQUFzQkgsS0FBdEI7QUFDRCxTQUZELE1BRU8sSUFBSTNCLGVBQWUrQixXQUFuQixFQUFnQztBQUNyQy9CLHlCQUFlOEIsTUFBZixDQUFzQkgsTUFBTUssT0FBTixDQUFjLElBQWQsRUFBb0IsS0FBcEIsQ0FBdEI7QUFDRCxTQUZNLE1BRUE7QUFDTGhDLHlCQUFlOEIsTUFBZixDQUFzQkgsS0FBdEIsRUFBNkIsSUFBN0I7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7K0JBVVdsQixPLEVBQVM7QUFDbEIsVUFBTXdCLFFBQVEsS0FBSzFDLE1BQUwsQ0FBWTJDLGdCQUFaLENBQTZCekIsT0FBN0IsQ0FBZDs7QUFFQSxhQUFPd0IsTUFBTUUsZ0JBQU4sQ0FBdUIsU0FBdkIsTUFBc0MsTUFBdEMsSUFBZ0RGLE1BQU1FLGdCQUFOLENBQXVCLFlBQXZCLE1BQXlDLFFBQWhHO0FBQ0Q7OztLQTlLSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWtMUzdDLFcsR0FBQUEsVyIsImZpbGUiOiJ0cmFuc2Zvcm1lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IHsgVHJhbnNmb3JtYXRpb24gfSBmcm9tICcuL3RyYW5zZm9ybWF0aW9uJ1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gSFRNTCBzdHJpbmcgb3IgRE9NIGVsZW1lbnQgaW50byBNYXJrZG93bi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFRyYW5zZm9ybWVyIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgVHJhbnNmb3JtZXJ9IHVzaW5nIHRoZSBzcGVjaWZpZWQgPGNvZGU+d2luZG93PC9jb2RlPiBhbmQgPGNvZGU+cGx1Z2luczwvY29kZT4uXG4gICAqXG4gICAqIEBwYXJhbSB7V2luZG93fSB3aW5kb3cgLSB0aGUgPGNvZGU+V2luZG93PC9jb2RlPiB0byBiZSB1c2VkXG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZywgUGx1Z2luPn0gcGx1Z2lucyAtIHRoZSBwbHVnaW5zIHRvIGJlIHVzZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3Iod2luZG93LCBwbHVnaW5zKSB7XG4gICAgLyoqXG4gICAgICogVGhlIDxjb2RlPldpbmRvdzwvY29kZT4gZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWVyfS5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAdHlwZSB7V2luZG93fVxuICAgICAqL1xuICAgIHRoaXMud2luZG93ID0gd2luZG93XG5cbiAgICAvKipcbiAgICAgKiBUaGUgPGNvZGU+SFRNTERvY3VtZW50PC9jb2RlPiBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtZXJ9LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtIVE1MRG9jdW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5kb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudFxuXG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbnMgZm9yIHRoaXMge0BsaW5rIFRyYW5zZm9ybWVyfS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge01hcDxzdHJpbmcsIFBsdWdpbj59XG4gICAgICovXG4gICAgdGhpcy5fcGx1Z2lucyA9IHBsdWdpbnNcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBzcGVjaWZpZWQgPGNvZGU+aHRtbDwvY29kZT4gaW50byBNYXJrZG93biB1c2luZyB0aGUgPGNvZGU+b3B0aW9uczwvY29kZT4gcHJvdmlkZWQuXG4gICAqXG4gICAqIDxjb2RlPmh0bWw8L2NvZGU+IGNhbiBlaXRoZXIgYmUgYW4gSFRNTCBzdHJpbmcgb3IgYSBET00gZWxlbWVudCB3aG9zZSBIVE1MIGNvbnRlbnRzIGFyZSB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvXG4gICAqIE1hcmtkb3duLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR8c3RyaW5nfSBodG1sIC0gdGhlIEhUTUwgKG9yIGVsZW1lbnQgd2hvc2UgaW5uZXIgSFRNTCkgdG8gYmUgdHJhbnNmb3JtZWQgaW50byBNYXJrZG93blxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IG9wdGlvbnMgLSB0aGUgb3B0aW9ucyB0byBiZSB1c2VkXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRyYW5zZm9ybWVkIE1hcmtkb3duLlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm0oaHRtbCwgb3B0aW9ucykge1xuICAgIGlmICghaHRtbCkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgbGV0IHJvb3RcbiAgICBpZiAodHlwZW9mIGh0bWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByb290ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcm9vdC5pbm5lckhUTUwgPSBodG1sXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSBodG1sXG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNmb3JtYXRpb24gPSBuZXcgVHJhbnNmb3JtYXRpb24odGhpcywgb3B0aW9ucylcblxuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMuX3BsdWdpbnMudmFsdWVzKCkpIHtcbiAgICAgIHBsdWdpbi5iZWZvcmVBbGwodHJhbnNmb3JtYXRpb24pXG4gICAgfVxuXG4gICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KHJvb3QsIHRyYW5zZm9ybWF0aW9uKVxuXG4gICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5fcGx1Z2lucy52YWx1ZXMoKSkge1xuICAgICAgcGx1Z2luLmFmdGVyQWxsKHRyYW5zZm9ybWF0aW9uKVxuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoJycpLmJ1ZmZlci50cmltKClcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBzcGVjaWZpZWQgPGNvZGU+ZWxlbWVudDwvY29kZT4gYW5kIGl0J3MgY2hpbGRyZW4gaW50byBNYXJrZG93biB1c2luZyB0aGUgPGNvZGU+dHJhbnNmb3JtYXRpb248L2NvZGU+XG4gICAqIHByb3ZpZGVkLlxuICAgKlxuICAgKiBOb3RoaW5nIGhhcHBlbnMgaWYgPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgPGNvZGU+bnVsbDwvY29kZT4gb3IgaXMgaW52aXNpYmxlIChzaW1wbGlmaWVkIGRldGVjdGlvbiB1c2VkKS5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gdGhlIGVsZW1lbnQgdG8gYmUgdHJhbnNmb3JtZWQgaW50byBNYXJrZG93biBhcyB3ZWxsIGFzIGl0J3MgY2hpbGRyZW5cbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn0gdHJhbnNmb3JtYXRpb24gLSB0aGUgY3VycmVudCB7QGxpbmsgVHJhbnNmb3JtYXRpb259XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRyYW5zZm9ybUVsZW1lbnQoZWxlbWVudCwgdHJhbnNmb3JtYXRpb24pIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSB0aGlzLndpbmRvdy5Ob2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgaWYgKCF0aGlzLl9pc1Zpc2libGUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRyYW5zZm9ybWF0aW9uLmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX3BsdWdpbnMuZ2V0KHRyYW5zZm9ybWF0aW9uLnRhZ05hbWUpXG4gICAgICBsZXQgdHJhbnNmb3JtQ2hpbGRyZW4gPSB0cnVlXG4gICAgICBpZiAocGx1Z2luKSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLnBsdWdpblN0YWNrLnB1c2gocGx1Z2luKVxuXG4gICAgICAgIHBsdWdpbi5iZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG4gICAgICAgIHRyYW5zZm9ybUNoaWxkcmVuID0gcGx1Z2luLnRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zZm9ybUNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpKSB7XG4gICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KGNoaWxkLCB0cmFuc2Zvcm1hdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGx1Z2luKSB7XG4gICAgICAgIHBsdWdpbi5hZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dClcblxuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5wbHVnaW5TdGFjay5wb3AoKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gdGhpcy53aW5kb3cuTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudC5ub2RlVmFsdWUgfHwgJydcblxuICAgICAgaWYgKHRyYW5zZm9ybWF0aW9uLmluUHJlZm9ybWF0dGVkQmxvY2spIHtcbiAgICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KHZhbHVlKVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2Zvcm1hdGlvbi5pbkNvZGVCbG9jaykge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQodmFsdWUucmVwbGFjZSgvYC9nLCAnXFxcXGAnKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCh2YWx1ZSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBjdXJyZW50bHkgdmlzaWJsZS5cbiAgICpcbiAgICogVGhpcyBpcyBub3QgYSB2ZXJ5IHNvcGhpc3RpY2F0ZWQgY2hlY2sgYW5kIGNvdWxkIGVhc2lseSBiZSBtaXN0YWtlbiwgYnV0IGl0IHNob3VsZCBjYXRjaCBhIGxvdCBvZiB0aGUgbW9zdCBzaW1wbGVcbiAgICogY2FzZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHdob3NlIHZpc2liaWxpdHkgaXMgdG8gYmUgY2hlY2tlZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyB2aXNpYmxlOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzVmlzaWJsZShlbGVtZW50KSB7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpICE9PSAnbm9uZScgJiYgc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndmlzaWJpbGl0eScpICE9PSAnaGlkZGVuJ1xuICB9XG5cbn1cblxuZXhwb3J0IHsgVHJhbnNmb3JtZXIgfVxuIl19
