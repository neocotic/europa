'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _plugin2 = _interopRequireDefault(_plugin);

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
}(_plugin2.default); /*
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

exports.default = AnchorPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9hbmNob3IuanMiXSwibmFtZXMiOlsiQW5jaG9yUGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiaGFzIiwib3V0cHV0IiwiZ2V0IiwiX2FuY2hvcnMiLCJsZW5ndGgiLCJhcHBlbmQiLCJpIiwiX2FuY2hvck1hcCIsImVsZW1lbnQiLCJvcHRpb25zIiwiaHJlZiIsImFic29sdXRlIiwiZ2V0QXR0cmlidXRlIiwidGl0bGUiLCJ2YWx1ZSIsImlubGluZSIsInNldCIsImluZGV4IiwicHVzaCIsImF0Tm9XaGl0ZVNwYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQWNNQSxZOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0IsVUFBSUEsUUFBUUMsR0FBUixDQUFZLE9BQVosQ0FBSixFQUEwQjtBQUN4QkYsdUJBQWVHLE1BQWYsT0FBMEJGLFFBQVFHLEdBQVIsQ0FBWSxPQUFaLENBQTFCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OzZCQUdTSixjLEVBQWdCO0FBQ3ZCLFVBQUksQ0FBQyxLQUFLSyxRQUFMLENBQWNDLE1BQW5CLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUROLHFCQUFlTyxNQUFmLENBQXNCLE1BQXRCOztBQUVBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtILFFBQUwsQ0FBY0MsTUFBbEMsRUFBMENFLEdBQTFDLEVBQStDO0FBQzdDUix1QkFBZU8sTUFBZixhQUFnQ0MsQ0FBaEMsV0FBdUMsS0FBS0gsUUFBTCxDQUFjRyxDQUFkLENBQXZDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OzhCQUdVUixjLEVBQWdCO0FBQ3hCOzs7Ozs7OztBQVFBLFdBQUtTLFVBQUwsR0FBa0IsbUJBQWxCOztBQUVBOzs7Ozs7OztBQVFBLFdBQUtKLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVTCxjLEVBQWdCQyxPLEVBQVM7QUFBQSxVQUN6QlMsT0FEeUIsR0FDSlYsY0FESSxDQUN6QlUsT0FEeUI7QUFBQSxVQUNoQkMsT0FEZ0IsR0FDSlgsY0FESSxDQUNoQlcsT0FEZ0I7O0FBRWpDLFVBQU1DLE9BQU9ELFFBQVFFLFFBQVIsR0FBbUJILFFBQVFFLElBQTNCLEdBQWtDRixRQUFRSSxZQUFSLENBQXFCLE1BQXJCLENBQS9DO0FBQ0EsVUFBSSxDQUFDRixJQUFMLEVBQVc7QUFDVDtBQUNEOztBQUVELFVBQU1HLFFBQVFMLFFBQVFJLFlBQVIsQ0FBcUIsT0FBckIsQ0FBZDtBQUNBLFVBQU1FLFFBQVFELFFBQVdILElBQVgsVUFBb0JHLEtBQXBCLFNBQStCSCxJQUE3Qzs7QUFFQSxVQUFJRCxRQUFRTSxNQUFaLEVBQW9CO0FBQ2xCaEIsZ0JBQVFpQixHQUFSLENBQVksT0FBWixRQUF5QkYsS0FBekI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJRyxRQUFRLEtBQUtWLFVBQUwsQ0FBZ0JMLEdBQWhCLENBQW9CWSxLQUFwQixDQUFaO0FBQ0EsWUFBSUcsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCQSxrQkFBUSxLQUFLZCxRQUFMLENBQWNlLElBQWQsQ0FBbUJKLEtBQW5CLElBQTRCLENBQXBDOztBQUVBLGVBQUtQLFVBQUwsQ0FBZ0JTLEdBQWhCLENBQW9CRixLQUFwQixFQUEyQkcsS0FBM0I7QUFDRDs7QUFFRGxCLGdCQUFRaUIsR0FBUixDQUFZLE9BQVosY0FBK0JDLEtBQS9CO0FBQ0Q7O0FBRURuQixxQkFBZUcsTUFBZixDQUFzQixHQUF0Qjs7QUFFQUgscUJBQWVxQixjQUFmLEdBQWdDLElBQWhDO0FBQ0Q7OztxQkF4SEg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7O2tCQXNHZXRCLFkiLCJmaWxlIjoiYW5jaG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IFBsdWdpbiBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBleHRyYWN0cyB0aGUgVVJMIGZyb20gYW4gYW5jaG9yLiBBbmNob3JzIHdpdGhvdXQgYW4gPGNvZGU+aHJlZjwvY29kZT4gYXJlIHRyZWF0ZWQgYXMgcGxhaW5cbiAqIHRleHQuXG4gKlxuICogSWYgdGhlIDxjb2RlPmFic29sdXRlPC9jb2RlPiBvcHRpb24gaXMgZW5hYmxlZCwgdGhlbiB0aGUgVVJMIGV4dHJhY3RlZCBmcm9tIHRoZSBhbmNob3Igd2lsbCBiZSBhYnNvbHV0ZS4gT3RoZXJ3aXNlLFxuICogdGhlIFVSTCB3aWxsIGJlIGV4YWN0bHkgYXMgaXQgaXMgaW4gdGhlIDxjb2RlPmhyZWY8L2NvZGU+IGF0dHJpYnV0ZS5cbiAqXG4gKiBJZiB0aGUgPGNvZGU+aW5saW5lPC9jb2RlPiBvcHRpb24gaXMgZW5hYmxlZCwgdGhlbiB0aGUgVVJMIChhbmQgYW55IDxjb2RlPnRpdGxlPC9jb2RlPiBvbiB0aGUgYW5jaG9yKSB3aWxsIGJlXG4gKiBpbnNlcnRlZCBpbW1lZGlhdGVseSBhZnRlciB0aGUgYW5jaG9yIGNvbnRlbnRzIChlLmcuIDxjb2RlPltmb29dKC9iYXIpPC9jb2RlPikuIE90aGVyd2lzZSwgYWxsIHVuaXF1ZSBVUkwgYW5kIHRpdGxlXG4gKiBjb21iaW5hdGlvbnMgd2lsbCBiZSBpbmRleGVkIChlLmcuIDxjb2RlPltmb29dW2FuY2hvcjBdPC9jb2RlPikgYW5kIHRoZSByZWZlcmVuY2VzIHdpbGwgYmUgb3V0cHV0IGF0IHRoZSB2ZXJ5IGVuZC5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBBbmNob3JQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQuaGFzKCd2YWx1ZScpKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQoYF0ke2NvbnRleHQuZ2V0KCd2YWx1ZScpfWApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXJBbGwodHJhbnNmb3JtYXRpb24pIHtcbiAgICBpZiAoIXRoaXMuX2FuY2hvcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoJ1xcblxcbicpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2FuY2hvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZChgW2FuY2hvciR7aX1dOiAke3RoaXMuX2FuY2hvcnNbaV19XFxuYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmVBbGwodHJhbnNmb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYW5jaG9yIHZhbHVlcyAod2hpY2ggd2lsbCBjb250YWluIHRoZSBIUkVGIGFuZCBhbnkgdGl0bGUpIG1hcHBlZCB0byB0aGVpciBpbmRleC5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb25seSB1c2VkIHdoZW4gdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBudW1iZXI+fVxuICAgICAqL1xuICAgIHRoaXMuX2FuY2hvck1hcCA9IG5ldyBNYXAoKVxuXG4gICAgLyoqXG4gICAgICogVGhlIGluZGV4ZWQgYW5jaG9yIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb25seSB1c2VkIHdoZW4gdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICB0aGlzLl9hbmNob3JzID0gW11cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnN0IHsgZWxlbWVudCwgb3B0aW9ucyB9ID0gdHJhbnNmb3JtYXRpb25cbiAgICBjb25zdCBocmVmID0gb3B0aW9ucy5hYnNvbHV0ZSA/IGVsZW1lbnQuaHJlZiA6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICBpZiAoIWhyZWYpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRpdGxlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJylcbiAgICBjb25zdCB2YWx1ZSA9IHRpdGxlID8gYCR7aHJlZn0gXCIke3RpdGxlfVwiYCA6IGhyZWZcblxuICAgIGlmIChvcHRpb25zLmlubGluZSkge1xuICAgICAgY29udGV4dC5zZXQoJ3ZhbHVlJywgYCgke3ZhbHVlfSlgKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLl9hbmNob3JNYXAuZ2V0KHZhbHVlKVxuICAgICAgaWYgKGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLl9hbmNob3JzLnB1c2godmFsdWUpIC0gMVxuXG4gICAgICAgIHRoaXMuX2FuY2hvck1hcC5zZXQodmFsdWUsIGluZGV4KVxuICAgICAgfVxuXG4gICAgICBjb250ZXh0LnNldCgndmFsdWUnLCBgW2FuY2hvciR7aW5kZXh9XWApXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24ub3V0cHV0KCdbJylcblxuICAgIHRyYW5zZm9ybWF0aW9uLmF0Tm9XaGl0ZVNwYWNlID0gdHJ1ZVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5jaG9yUGx1Z2luXG4iXX0=
