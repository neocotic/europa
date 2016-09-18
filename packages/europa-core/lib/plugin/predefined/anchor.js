'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnchorPlugin = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _plugin = require('../plugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
 * text.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>href</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
 * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
 * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
 *
 * @public
 * @extends {Plugin}
 */
var AnchorPlugin = function (_Plugin) {
  (0, _inherits3.default)(AnchorPlugin, _Plugin);

  function AnchorPlugin() {
    (0, _classCallCheck3.default)(this, AnchorPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (AnchorPlugin.__proto__ || (0, _getPrototypeOf2.default)(AnchorPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(AnchorPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      if (context.has('value')) {
        transformation.output(']' + context.get('value'));
      }
    }

    /**
     * @override
     */

  }, {
    key: 'afterAll',
    value: function afterAll(transformation) {
      if (!this._anchors.length) {
        return;
      }

      transformation.append('\n\n');

      for (var i = 0; i < this._anchors.length; i++) {
        transformation.append('[anchor' + i + ']: ' + this._anchors[i] + '\n');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(transformation) {
      /**
       * The anchor values (which will contain the HREF and any title) mapped to their index.
       *
       * This is only used when the <code>inline</code> option is enabled.
       *
       * @private
       * @type {Map<string, number>}
       */
      this._anchorMap = new _map2.default();

      /**
       * The indexed anchor values.
       *
       * This is only used when the <code>inline</code> option is enabled.
       *
       * @private
       * @type {string[]}
       */
      this._anchors = [];
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var element = transformation.element;
      var options = transformation.options;

      var href = options.absolute ? element.href : element.getAttribute('href');
      if (!href) {
        return;
      }

      var title = element.getAttribute('title');
      var value = title ? href + ' "' + title + '"' : href;

      if (options.inline) {
        context.set('value', '(' + value + ')');
      } else {
        var index = this._anchorMap.get(value);
        if (index == null) {
          index = this._anchors.push(value) - 1;

          this._anchorMap.set(value, index);
        }

        context.set('value', '[anchor' + index + ']');
      }

      transformation.output('[');

      transformation.atNoWhiteSpace = true;
    }
  }]);
  return AnchorPlugin;
}(_plugin.Plugin); /*
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

/* eslint no-unused-vars: "off" */

exports.AnchorPlugin = AnchorPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9hbmNob3IuanMiXSwibmFtZXMiOlsiQW5jaG9yUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiaGFzIiwib3V0cHV0IiwiZ2V0IiwiX2FuY2hvcnMiLCJsZW5ndGgiLCJhcHBlbmQiLCJpIiwiX2FuY2hvck1hcCIsImVsZW1lbnQiLCJvcHRpb25zIiwiaHJlZiIsImFic29sdXRlIiwiZ2V0QXR0cmlidXRlIiwidGl0bGUiLCJ2YWx1ZSIsImlubGluZSIsInNldCIsImluZGV4IiwicHVzaCIsImF0Tm9XaGl0ZVNwYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBY01BLFk7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QixVQUFJQSxRQUFRQyxHQUFSLENBQVksT0FBWixDQUFKLEVBQTBCO0FBQ3hCRix1QkFBZUcsTUFBZixPQUEwQkYsUUFBUUcsR0FBUixDQUFZLE9BQVosQ0FBMUI7QUFDRDtBQUNGOztBQUVEOzs7Ozs7NkJBR1NKLGMsRUFBZ0I7QUFDdkIsVUFBSSxDQUFDLEtBQUtLLFFBQUwsQ0FBY0MsTUFBbkIsRUFBMkI7QUFDekI7QUFDRDs7QUFFRE4scUJBQWVPLE1BQWYsQ0FBc0IsTUFBdEI7O0FBRUEsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS0gsUUFBTCxDQUFjQyxNQUFsQyxFQUEwQ0UsR0FBMUMsRUFBK0M7QUFDN0NSLHVCQUFlTyxNQUFmLGFBQWdDQyxDQUFoQyxXQUF1QyxLQUFLSCxRQUFMLENBQWNHLENBQWQsQ0FBdkM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7OEJBR1VSLGMsRUFBZ0I7QUFDeEI7Ozs7Ozs7O0FBUUEsV0FBS1MsVUFBTCxHQUFrQixtQkFBbEI7O0FBRUE7Ozs7Ozs7O0FBUUEsV0FBS0osUUFBTCxHQUFnQixFQUFoQjtBQUNEOztBQUVEOzs7Ozs7OEJBR1VMLGMsRUFBZ0JDLE8sRUFBUztBQUFBLFVBQ3pCUyxPQUR5QixHQUNKVixjQURJLENBQ3pCVSxPQUR5QjtBQUFBLFVBQ2hCQyxPQURnQixHQUNKWCxjQURJLENBQ2hCVyxPQURnQjs7QUFFakMsVUFBTUMsT0FBT0QsUUFBUUUsUUFBUixHQUFtQkgsUUFBUUUsSUFBM0IsR0FBa0NGLFFBQVFJLFlBQVIsQ0FBcUIsTUFBckIsQ0FBL0M7QUFDQSxVQUFJLENBQUNGLElBQUwsRUFBVztBQUNUO0FBQ0Q7O0FBRUQsVUFBTUcsUUFBUUwsUUFBUUksWUFBUixDQUFxQixPQUFyQixDQUFkO0FBQ0EsVUFBTUUsUUFBUUQsUUFBV0gsSUFBWCxVQUFvQkcsS0FBcEIsU0FBK0JILElBQTdDOztBQUVBLFVBQUlELFFBQVFNLE1BQVosRUFBb0I7QUFDbEJoQixnQkFBUWlCLEdBQVIsQ0FBWSxPQUFaLFFBQXlCRixLQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlHLFFBQVEsS0FBS1YsVUFBTCxDQUFnQkwsR0FBaEIsQ0FBb0JZLEtBQXBCLENBQVo7QUFDQSxZQUFJRyxTQUFTLElBQWIsRUFBbUI7QUFDakJBLGtCQUFRLEtBQUtkLFFBQUwsQ0FBY2UsSUFBZCxDQUFtQkosS0FBbkIsSUFBNEIsQ0FBcEM7O0FBRUEsZUFBS1AsVUFBTCxDQUFnQlMsR0FBaEIsQ0FBb0JGLEtBQXBCLEVBQTJCRyxLQUEzQjtBQUNEOztBQUVEbEIsZ0JBQVFpQixHQUFSLENBQVksT0FBWixjQUErQkMsS0FBL0I7QUFDRDs7QUFFRG5CLHFCQUFlRyxNQUFmLENBQXNCLEdBQXRCOztBQUVBSCxxQkFBZXFCLGNBQWYsR0FBZ0MsSUFBaEM7QUFDRDs7O21CQXhISDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7UUFzR1N0QixZLEdBQUFBLFkiLCJmaWxlIjoiYW5jaG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggZXh0cmFjdHMgdGhlIFVSTCBmcm9tIGFuIGFuY2hvci4gQW5jaG9ycyB3aXRob3V0IGFuIDxjb2RlPmhyZWY8L2NvZGU+IGFyZSB0cmVhdGVkIGFzIHBsYWluXG4gKiB0ZXh0LlxuICpcbiAqIElmIHRoZSA8Y29kZT5hYnNvbHV0ZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIFVSTCBleHRyYWN0ZWQgZnJvbSB0aGUgYW5jaG9yIHdpbGwgYmUgYWJzb2x1dGUuIE90aGVyd2lzZSxcbiAqIHRoZSBVUkwgd2lsbCBiZSBleGFjdGx5IGFzIGl0IGlzIGluIHRoZSA8Y29kZT5ocmVmPC9jb2RlPiBhdHRyaWJ1dGUuXG4gKlxuICogSWYgdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIFVSTCAoYW5kIGFueSA8Y29kZT50aXRsZTwvY29kZT4gb24gdGhlIGFuY2hvcikgd2lsbCBiZVxuICogaW5zZXJ0ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGFuY2hvciBjb250ZW50cyAoZS5nLiA8Y29kZT5bZm9vXSgvYmFyKTwvY29kZT4pLiBPdGhlcndpc2UsIGFsbCB1bmlxdWUgVVJMIGFuZCB0aXRsZVxuICogY29tYmluYXRpb25zIHdpbGwgYmUgaW5kZXhlZCAoZS5nLiA8Y29kZT5bZm9vXVthbmNob3IwXTwvY29kZT4pIGFuZCB0aGUgcmVmZXJlbmNlcyB3aWxsIGJlIG91dHB1dCBhdCB0aGUgdmVyeSBlbmQuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgQW5jaG9yUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGlmIChjb250ZXh0LmhhcygndmFsdWUnKSkge1xuICAgICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KGBdJHtjb250ZXh0LmdldCgndmFsdWUnKX1gKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyQWxsKHRyYW5zZm9ybWF0aW9uKSB7XG4gICAgaWYgKCF0aGlzLl9hbmNob3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKCdcXG5cXG4nKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hbmNob3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoYFthbmNob3Ike2l9XTogJHt0aGlzLl9hbmNob3JzW2ldfVxcbmApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYmVmb3JlQWxsKHRyYW5zZm9ybWF0aW9uKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGFuY2hvciB2YWx1ZXMgKHdoaWNoIHdpbGwgY29udGFpbiB0aGUgSFJFRiBhbmQgYW55IHRpdGxlKSBtYXBwZWQgdG8gdGhlaXIgaW5kZXguXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9ubHkgdXNlZCB3aGVuIHRoZSA8Y29kZT5pbmxpbmU8L2NvZGU+IG9wdGlvbiBpcyBlbmFibGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgbnVtYmVyPn1cbiAgICAgKi9cbiAgICB0aGlzLl9hbmNob3JNYXAgPSBuZXcgTWFwKClcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleGVkIGFuY2hvciB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9ubHkgdXNlZCB3aGVuIHRoZSA8Y29kZT5pbmxpbmU8L2NvZGU+IG9wdGlvbiBpcyBlbmFibGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICovXG4gICAgdGhpcy5fYW5jaG9ycyA9IFtdXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB7IGVsZW1lbnQsIG9wdGlvbnMgfSA9IHRyYW5zZm9ybWF0aW9uXG4gICAgY29uc3QgaHJlZiA9IG9wdGlvbnMuYWJzb2x1dGUgPyBlbGVtZW50LmhyZWYgOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgaWYgKCFocmVmKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0aXRsZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpXG4gICAgY29uc3QgdmFsdWUgPSB0aXRsZSA/IGAke2hyZWZ9IFwiJHt0aXRsZX1cImAgOiBocmVmXG5cbiAgICBpZiAob3B0aW9ucy5pbmxpbmUpIHtcbiAgICAgIGNvbnRleHQuc2V0KCd2YWx1ZScsIGAoJHt2YWx1ZX0pYClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4ID0gdGhpcy5fYW5jaG9yTWFwLmdldCh2YWx1ZSlcbiAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5fYW5jaG9ycy5wdXNoKHZhbHVlKSAtIDFcblxuICAgICAgICB0aGlzLl9hbmNob3JNYXAuc2V0KHZhbHVlLCBpbmRleClcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5zZXQoJ3ZhbHVlJywgYFthbmNob3Ike2luZGV4fV1gKVxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dCgnWycpXG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hdE5vV2hpdGVTcGFjZSA9IHRydWVcbiAgfVxuXG59XG5cbmV4cG9ydCB7IEFuY2hvclBsdWdpbiB9XG4iXX0=
