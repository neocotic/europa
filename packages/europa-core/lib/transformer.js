'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

      this._plugins.values().forEach(function (plugin) {
        return plugin.beforeAll(transformation);
      });

      this.transformElement(root, transformation);

      this._plugins.values().forEach(function (plugin) {
        return plugin.afterAll(transformation);
      });

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
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)((0, _from2.default)(element.childNodes)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;

              this.transformElement(child, transformation);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90cmFuc2Zvcm1lci5qcyJdLCJuYW1lcyI6WyJUcmFuc2Zvcm1lciIsIndpbmRvdyIsInBsdWdpbnMiLCJkb2N1bWVudCIsIl9wbHVnaW5zIiwiaHRtbCIsIm9wdGlvbnMiLCJyb290IiwiX2RvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRyYW5zZm9ybWF0aW9uIiwidmFsdWVzIiwiZm9yRWFjaCIsInBsdWdpbiIsImJlZm9yZUFsbCIsInRyYW5zZm9ybUVsZW1lbnQiLCJhZnRlckFsbCIsImFwcGVuZCIsImJ1ZmZlciIsInRyaW0iLCJlbGVtZW50IiwiX2lzVmlzaWJsZSIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsImNvbnRleHQiLCJnZXQiLCJ0YWdOYW1lIiwicGx1Z2luU3RhY2siLCJwdXNoIiwiYmVmb3JlIiwidHJhbnNmb3JtIiwic2tpcENoaWxkcmVuIiwiY2hpbGROb2RlcyIsImNoaWxkIiwiYWZ0ZXIiLCJwb3AiLCJURVhUX05PREUiLCJ2YWx1ZSIsIm5vZGVWYWx1ZSIsImluUHJlZm9ybWF0dGVkQmxvY2siLCJvdXRwdXQiLCJpbkNvZGVCbG9jayIsInJlcGxhY2UiLCJzdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7Ozs7O0FBRUE7Ozs7O0lBS01BLFc7O0FBRUo7Ozs7Ozs7QUFPQSx1QkFBWUMsTUFBWixFQUFvQkMsT0FBcEIsRUFBNkI7QUFBQTs7QUFDM0I7Ozs7OztBQU1BLFNBQUtELE1BQUwsR0FBY0EsTUFBZDs7QUFFQTs7Ozs7O0FBTUEsU0FBS0UsUUFBTCxHQUFnQkYsT0FBT0UsUUFBdkI7O0FBRUE7Ozs7OztBQU1BLFNBQUtDLFFBQUwsR0FBZ0JGLE9BQWhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs4QkFXVUcsSSxFQUFNQyxPLEVBQVM7QUFDdkIsVUFBSSxDQUFDRCxJQUFMLEVBQVc7QUFDVCxlQUFPLEVBQVA7QUFDRDs7QUFFRCxVQUFJRSxhQUFKO0FBQ0EsVUFBSSxPQUFPRixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCRSxlQUFPLEtBQUtDLFNBQUwsQ0FBZUMsYUFBZixDQUE2QixLQUE3QixDQUFQO0FBQ0FGLGFBQUtHLFNBQUwsR0FBaUJMLElBQWpCO0FBQ0QsT0FIRCxNQUdPO0FBQ0xFLGVBQU9GLElBQVA7QUFDRDs7QUFFRCxVQUFNTSxpQkFBaUIsNkJBQW1CLElBQW5CLEVBQXlCTCxPQUF6QixDQUF2Qjs7QUFFQSxXQUFLRixRQUFMLENBQWNRLE1BQWQsR0FBdUJDLE9BQXZCLENBQStCLFVBQUNDLE1BQUQ7QUFBQSxlQUFZQSxPQUFPQyxTQUFQLENBQWlCSixjQUFqQixDQUFaO0FBQUEsT0FBL0I7O0FBRUEsV0FBS0ssZ0JBQUwsQ0FBc0JULElBQXRCLEVBQTRCSSxjQUE1Qjs7QUFFQSxXQUFLUCxRQUFMLENBQWNRLE1BQWQsR0FBdUJDLE9BQXZCLENBQStCLFVBQUNDLE1BQUQ7QUFBQSxlQUFZQSxPQUFPRyxRQUFQLENBQWdCTixjQUFoQixDQUFaO0FBQUEsT0FBL0I7O0FBRUEsYUFBT0EsZUFBZU8sTUFBZixDQUFzQixFQUF0QixFQUEwQkMsTUFBMUIsQ0FBaUNDLElBQWpDLEVBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7cUNBV2lCQyxPLEVBQVNWLGMsRUFBZ0I7QUFDeEMsVUFBSSxFQUFFVSxXQUFXLEtBQUtDLFVBQUwsQ0FBZ0JELE9BQWhCLENBQWIsQ0FBSixFQUE0QztBQUMxQztBQUNEOztBQUVELFVBQUlBLFFBQVFFLFFBQVIsS0FBcUIsS0FBS3RCLE1BQUwsQ0FBWXVCLElBQVosQ0FBaUJDLFlBQTFDLEVBQXdEO0FBQ3REZCx1QkFBZVUsT0FBZixHQUF5QkEsT0FBekI7O0FBRUEsWUFBTUssVUFBVSxtQkFBaEI7QUFDQSxZQUFNWixTQUFTLEtBQUtWLFFBQUwsQ0FBY3VCLEdBQWQsQ0FBa0JoQixlQUFlaUIsT0FBakMsQ0FBZjtBQUNBLFlBQUlkLE1BQUosRUFBWTtBQUNWSCx5QkFBZWtCLFdBQWYsQ0FBMkJDLElBQTNCLENBQWdDaEIsTUFBaEM7O0FBRUFBLGlCQUFPaUIsTUFBUCxDQUFjcEIsY0FBZCxFQUE4QmUsT0FBOUI7QUFDQVosaUJBQU9rQixTQUFQLENBQWlCckIsY0FBakIsRUFBaUNlLE9BQWpDO0FBQ0Q7O0FBRUQsWUFBSSxDQUFDZixlQUFlc0IsWUFBcEIsRUFBa0M7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDaEMsNERBQW9CLG9CQUFXWixRQUFRYSxVQUFuQixDQUFwQiw0R0FBb0Q7QUFBQSxrQkFBekNDLEtBQXlDOztBQUNsRCxtQkFBS25CLGdCQUFMLENBQXNCbUIsS0FBdEIsRUFBNkJ4QixjQUE3QjtBQUNEO0FBSCtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJakM7O0FBRUQsWUFBSUcsTUFBSixFQUFZO0FBQ1ZBLGlCQUFPc0IsS0FBUCxDQUFhekIsY0FBYixFQUE2QmUsT0FBN0I7O0FBRUFmLHlCQUFla0IsV0FBZixDQUEyQlEsR0FBM0I7QUFDRDtBQUNGLE9BdkJELE1BdUJPLElBQUloQixRQUFRRSxRQUFSLEtBQXFCLEtBQUt0QixNQUFMLENBQVl1QixJQUFaLENBQWlCYyxTQUExQyxFQUFxRDtBQUMxRCxZQUFNQyxRQUFRbEIsUUFBUW1CLFNBQVIsSUFBcUIsRUFBbkM7O0FBRUEsWUFBSTdCLGVBQWU4QixtQkFBbkIsRUFBd0M7QUFDdEM5Qix5QkFBZStCLE1BQWYsQ0FBc0JILEtBQXRCO0FBQ0QsU0FGRCxNQUVPLElBQUk1QixlQUFlZ0MsV0FBbkIsRUFBZ0M7QUFDckNoQyx5QkFBZStCLE1BQWYsQ0FBc0JILE1BQU1LLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEtBQXBCLENBQXRCO0FBQ0QsU0FGTSxNQUVBO0FBQ0xqQyx5QkFBZStCLE1BQWYsQ0FBc0JILEtBQXRCLEVBQTZCLElBQTdCO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7OytCQVVXbEIsTyxFQUFTO0FBQ2xCLFVBQU13QixRQUFRLEtBQUs1QyxNQUFMLENBQVk2QyxnQkFBWixDQUE2QnpCLE9BQTdCLENBQWQ7O0FBRUEsYUFBT3dCLE1BQU1FLGdCQUFOLENBQXVCLFNBQXZCLE1BQXNDLE1BQXRDLElBQWdERixNQUFNRSxnQkFBTixDQUF1QixZQUF2QixNQUF5QyxRQUFoRztBQUNEOzs7S0FyS0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBeUtlL0MsVyIsImZpbGUiOiJ0cmFuc2Zvcm1lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IFRyYW5zZm9ybWF0aW9uIGZyb20gJy4vdHJhbnNmb3JtYXRpb24nXG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbiBIVE1MIHN0cmluZyBvciBET00gZWxlbWVudCBpbnRvIE1hcmtkb3duLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgVHJhbnNmb3JtZXIge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHtAbGluayBUcmFuc2Zvcm1lcn0gdXNpbmcgdGhlIHNwZWNpZmllZCA8Y29kZT53aW5kb3c8L2NvZGU+IGFuZCA8Y29kZT5wbHVnaW5zPC9jb2RlPi5cbiAgICpcbiAgICogQHBhcmFtIHtXaW5kb3d9IHdpbmRvdyAtIHRoZSA8Y29kZT5XaW5kb3c8L2NvZGU+IHRvIGJlIHVzZWRcbiAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCBQbHVnaW4+fSBwbHVnaW5zIC0gdGhlIHBsdWdpbnMgdG8gYmUgdXNlZFxuICAgKiBAcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih3aW5kb3csIHBsdWdpbnMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgPGNvZGU+V2luZG93PC9jb2RlPiBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtZXJ9LlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqIEB0eXBlIHtXaW5kb3d9XG4gICAgICovXG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3dcblxuICAgIC8qKlxuICAgICAqIFRoZSA8Y29kZT5IVE1MRG9jdW1lbnQ8L2NvZGU+IGZvciB0aGlzIHtAbGluayBUcmFuc2Zvcm1lcn0uXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICogQHR5cGUge0hUTUxEb2N1bWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2lucyBmb3IgdGhpcyB7QGxpbmsgVHJhbnNmb3JtZXJ9LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgUGx1Z2luPn1cbiAgICAgKi9cbiAgICB0aGlzLl9wbHVnaW5zID0gcGx1Z2luc1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHNwZWNpZmllZCA8Y29kZT5odG1sPC9jb2RlPiBpbnRvIE1hcmtkb3duIHVzaW5nIHRoZSA8Y29kZT5vcHRpb25zPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogPGNvZGU+aHRtbDwvY29kZT4gY2FuIGVpdGhlciBiZSBhbiBIVE1MIHN0cmluZyBvciBhIERPTSBlbGVtZW50IHdob3NlIEhUTUwgY29udGVudHMgYXJlIHRvIGJlIHRyYW5zZm9ybWVkIGludG9cbiAgICogTWFya2Rvd24uXG4gICAqXG4gICAqIEBwYXJhbSB7RWxlbWVudHxzdHJpbmd9IGh0bWwgLSB0aGUgSFRNTCAob3IgZWxlbWVudCB3aG9zZSBpbm5lciBIVE1MKSB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvIE1hcmtkb3duXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gb3B0aW9ucyAtIHRoZSBvcHRpb25zIHRvIGJlIHVzZWRcbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgdHJhbnNmb3JtZWQgTWFya2Rvd24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRyYW5zZm9ybShodG1sLCBvcHRpb25zKSB7XG4gICAgaWYgKCFodG1sKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBsZXQgcm9vdFxuICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJvb3QgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcm9vdC5pbm5lckhUTUwgPSBodG1sXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSBodG1sXG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNmb3JtYXRpb24gPSBuZXcgVHJhbnNmb3JtYXRpb24odGhpcywgb3B0aW9ucylcblxuICAgIHRoaXMuX3BsdWdpbnMudmFsdWVzKCkuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uYmVmb3JlQWxsKHRyYW5zZm9ybWF0aW9uKSlcblxuICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudChyb290LCB0cmFuc2Zvcm1hdGlvbilcblxuICAgIHRoaXMuX3BsdWdpbnMudmFsdWVzKCkuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uYWZ0ZXJBbGwodHJhbnNmb3JtYXRpb24pKVxuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWF0aW9uLmFwcGVuZCgnJykuYnVmZmVyLnRyaW0oKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHNwZWNpZmllZCA8Y29kZT5lbGVtZW50PC9jb2RlPiBhbmQgaXQncyBjaGlsZHJlbiBpbnRvIE1hcmtkb3duIHVzaW5nIHRoZSA8Y29kZT50cmFuc2Zvcm1hdGlvbjwvY29kZT5cbiAgICogcHJvdmlkZWQuXG4gICAqXG4gICAqIE5vdGhpbmcgaGFwcGVucyBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyA8Y29kZT5udWxsPC9jb2RlPiBvciBpcyBpbnZpc2libGUgKHNpbXBsaWZpZWQgZGV0ZWN0aW9uIHVzZWQpLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byBiZSB0cmFuc2Zvcm1lZCBpbnRvIE1hcmtkb3duIGFzIHdlbGwgYXMgaXQncyBjaGlsZHJlblxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn1cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdHJhbnNmb3JtRWxlbWVudChlbGVtZW50LCB0cmFuc2Zvcm1hdGlvbikge1xuICAgIGlmICghKGVsZW1lbnQgJiYgdGhpcy5faXNWaXNpYmxlKGVsZW1lbnQpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IHRoaXMud2luZG93Lk5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5lbGVtZW50ID0gZWxlbWVudFxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gbmV3IE1hcCgpXG4gICAgICBjb25zdCBwbHVnaW4gPSB0aGlzLl9wbHVnaW5zLmdldCh0cmFuc2Zvcm1hdGlvbi50YWdOYW1lKVxuICAgICAgaWYgKHBsdWdpbikge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5wbHVnaW5TdGFjay5wdXNoKHBsdWdpbilcblxuICAgICAgICBwbHVnaW4uYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KVxuICAgICAgICBwbHVnaW4udHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRyYW5zZm9ybWF0aW9uLnNraXBDaGlsZHJlbikge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKSkge1xuICAgICAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudChjaGlsZCwgdHJhbnNmb3JtYXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBsdWdpbikge1xuICAgICAgICBwbHVnaW4uYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpXG5cbiAgICAgICAgdHJhbnNmb3JtYXRpb24ucGx1Z2luU3RhY2sucG9wKClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IHRoaXMud2luZG93Lk5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQubm9kZVZhbHVlIHx8ICcnXG5cbiAgICAgIGlmICh0cmFuc2Zvcm1hdGlvbi5pblByZWZvcm1hdHRlZEJsb2NrKSB7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtYXRpb24uaW5Db2RlQmxvY2spIHtcbiAgICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KHZhbHVlLnJlcGxhY2UoL2AvZywgJ1xcXFxgJykpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQodmFsdWUsIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgY3VycmVudGx5IHZpc2libGUuXG4gICAqXG4gICAqIFRoaXMgaXMgbm90IGEgdmVyeSBzb3BoaXN0aWNhdGVkIGNoZWNrIGFuZCBjb3VsZCBlYXNpbHkgYmUgbWlzdGFrZW4sIGJ1dCBpdCBzaG91bGQgY2F0Y2ggYSBsb3Qgb2YgdGhlIG1vc3Qgc2ltcGxlXG4gICAqIGNhc2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB3aG9zZSB2aXNpYmlsaXR5IGlzIHRvIGJlIGNoZWNrZWRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgdmlzaWJsZTsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc1Zpc2libGUoZWxlbWVudCkge1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuXG4gICAgcmV0dXJuIHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnICYmIHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbidcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zZm9ybWVyXG4iXX0=
