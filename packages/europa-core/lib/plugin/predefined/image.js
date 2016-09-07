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
 * A {@link Plugin} which extracts the URL from an image.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the image will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>src</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL will be inserted immediately after the <code>alt</code> on
 * the image (e.g. <code>![foo](/bar.png)</code>). Otherwise, all unique URLs will be indexed
 * (e.g. <code>![foo][image0]</code>) and the references will be output at the very end.
 *
 * @public
 * @extends {Plugin}
 */
var ImagePlugin = function (_Plugin) {
  (0, _inherits3.default)(ImagePlugin, _Plugin);

  function ImagePlugin() {
    (0, _classCallCheck3.default)(this, ImagePlugin);
    return (0, _possibleConstructorReturn3.default)(this, (ImagePlugin.__proto__ || (0, _getPrototypeOf2.default)(ImagePlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(ImagePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.skipChildren = context.get('previousSkipChildren');
    }

    /**
     * @override
     */

  }, {
    key: 'afterAll',
    value: function afterAll(transformation) {
      if (!this._images.length) {
        return;
      }

      transformation.append('\n\n');

      for (var i = 0; i < this._images.length; i++) {
        transformation.append('[image' + i + ']: ' + this._images[i] + '\n');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousSkipChildren', transformation.skipChildren);
    }

    /**
     * @override
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(transformation) {
      /**
       * The image values (which will contain the HREF) mapped to their index.
       *
       * This is only used when the <code>inline</code> option is enabled.
       *
       * @private
       * @type {Map<string, number>}
       */
      this._imageMap = new _map2.default();

      /**
       * The indexed image values.
       *
       * This is only used when the <code>inline</code> option is enabled.
       *
       * @private
       * @type {string[]}
       */
      this._images = [];
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      transformation.skipChildren = true;

      var element = transformation.element;
      var options = transformation.options;

      var source = options.absolute ? element.src : element.getAttribute('src');
      if (!source) {
        return;
      }

      var alternativeText = element.getAttribute('alt') || '';
      var title = element.getAttribute('title');
      var value = title ? source + ' "' + title + '"' : source;

      if (options.inline) {
        value = '(' + value + ')';
      } else {
        var index = this._imageMap.get(value);
        if (index == null) {
          index = this._images.push(value) - 1;

          this._imageMap.set(value, index);
        }

        value = '[image' + index + ']';
      }

      transformation.output('![' + alternativeText + ']' + value);
    }
  }]);
  return ImagePlugin;
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

exports.default = ImagePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9pbWFnZS5qcyJdLCJuYW1lcyI6WyJJbWFnZVBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCIsInNraXBDaGlsZHJlbiIsImdldCIsIl9pbWFnZXMiLCJsZW5ndGgiLCJhcHBlbmQiLCJpIiwic2V0IiwiX2ltYWdlTWFwIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJzb3VyY2UiLCJhYnNvbHV0ZSIsInNyYyIsImdldEF0dHJpYnV0ZSIsImFsdGVybmF0aXZlVGV4dCIsInRpdGxlIiwidmFsdWUiLCJpbmxpbmUiLCJpbmRleCIsInB1c2giLCJvdXRwdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFhTUEsVzs7Ozs7Ozs7Ozs7O0FBRUo7OzswQkFHTUMsYyxFQUFnQkMsTyxFQUFTO0FBQzdCRCxxQkFBZUUsWUFBZixHQUE4QkQsUUFBUUUsR0FBUixDQUFZLHNCQUFaLENBQTlCO0FBQ0Q7O0FBRUQ7Ozs7Ozs2QkFHU0gsYyxFQUFnQjtBQUN2QixVQUFJLENBQUMsS0FBS0ksT0FBTCxDQUFhQyxNQUFsQixFQUEwQjtBQUN4QjtBQUNEOztBQUVETCxxQkFBZU0sTUFBZixDQUFzQixNQUF0Qjs7QUFFQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLSCxPQUFMLENBQWFDLE1BQWpDLEVBQXlDRSxHQUF6QyxFQUE4QztBQUM1Q1AsdUJBQWVNLE1BQWYsWUFBK0JDLENBQS9CLFdBQXNDLEtBQUtILE9BQUwsQ0FBYUcsQ0FBYixDQUF0QztBQUNEO0FBQ0Y7O0FBRUQ7Ozs7OzsyQkFHT1AsYyxFQUFnQkMsTyxFQUFTO0FBQzlCQSxjQUFRTyxHQUFSLENBQVksc0JBQVosRUFBb0NSLGVBQWVFLFlBQW5EO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHVUYsYyxFQUFnQjtBQUN4Qjs7Ozs7Ozs7QUFRQSxXQUFLUyxTQUFMLEdBQWlCLG1CQUFqQjs7QUFFQTs7Ozs7Ozs7QUFRQSxXQUFLTCxPQUFMLEdBQWUsRUFBZjtBQUNEOztBQUVEOzs7Ozs7OEJBR1VKLGMsRUFBZ0JDLE8sRUFBUztBQUNqQ0QscUJBQWVFLFlBQWYsR0FBOEIsSUFBOUI7O0FBRGlDLFVBR3pCUSxPQUh5QixHQUdKVixjQUhJLENBR3pCVSxPQUh5QjtBQUFBLFVBR2hCQyxPQUhnQixHQUdKWCxjQUhJLENBR2hCVyxPQUhnQjs7QUFJakMsVUFBTUMsU0FBU0QsUUFBUUUsUUFBUixHQUFtQkgsUUFBUUksR0FBM0IsR0FBaUNKLFFBQVFLLFlBQVIsQ0FBcUIsS0FBckIsQ0FBaEQ7QUFDQSxVQUFJLENBQUNILE1BQUwsRUFBYTtBQUNYO0FBQ0Q7O0FBRUQsVUFBTUksa0JBQWtCTixRQUFRSyxZQUFSLENBQXFCLEtBQXJCLEtBQStCLEVBQXZEO0FBQ0EsVUFBTUUsUUFBUVAsUUFBUUssWUFBUixDQUFxQixPQUFyQixDQUFkO0FBQ0EsVUFBSUcsUUFBUUQsUUFBV0wsTUFBWCxVQUFzQkssS0FBdEIsU0FBaUNMLE1BQTdDOztBQUVBLFVBQUlELFFBQVFRLE1BQVosRUFBb0I7QUFDbEJELHNCQUFZQSxLQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSUUsUUFBUSxLQUFLWCxTQUFMLENBQWVOLEdBQWYsQ0FBbUJlLEtBQW5CLENBQVo7QUFDQSxZQUFJRSxTQUFTLElBQWIsRUFBbUI7QUFDakJBLGtCQUFRLEtBQUtoQixPQUFMLENBQWFpQixJQUFiLENBQWtCSCxLQUFsQixJQUEyQixDQUFuQzs7QUFFQSxlQUFLVCxTQUFMLENBQWVELEdBQWYsQ0FBbUJVLEtBQW5CLEVBQTBCRSxLQUExQjtBQUNEOztBQUVERiwyQkFBaUJFLEtBQWpCO0FBQ0Q7O0FBRURwQixxQkFBZXNCLE1BQWYsUUFBMkJOLGVBQTNCLFNBQThDRSxLQUE5QztBQUNEOzs7cUJBN0hIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztrQkEyR2VuQixXIiwiZmlsZSI6ImltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IFBsdWdpbiBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBleHRyYWN0cyB0aGUgVVJMIGZyb20gYW4gaW1hZ2UuXG4gKlxuICogSWYgdGhlIDxjb2RlPmFic29sdXRlPC9jb2RlPiBvcHRpb24gaXMgZW5hYmxlZCwgdGhlbiB0aGUgVVJMIGV4dHJhY3RlZCBmcm9tIHRoZSBpbWFnZSB3aWxsIGJlIGFic29sdXRlLiBPdGhlcndpc2UsXG4gKiB0aGUgVVJMIHdpbGwgYmUgZXhhY3RseSBhcyBpdCBpcyBpbiB0aGUgPGNvZGU+c3JjPC9jb2RlPiBhdHRyaWJ1dGUuXG4gKlxuICogSWYgdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIFVSTCB3aWxsIGJlIGluc2VydGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSA8Y29kZT5hbHQ8L2NvZGU+IG9uXG4gKiB0aGUgaW1hZ2UgKGUuZy4gPGNvZGU+IVtmb29dKC9iYXIucG5nKTwvY29kZT4pLiBPdGhlcndpc2UsIGFsbCB1bmlxdWUgVVJMcyB3aWxsIGJlIGluZGV4ZWRcbiAqIChlLmcuIDxjb2RlPiFbZm9vXVtpbWFnZTBdPC9jb2RlPikgYW5kIHRoZSByZWZlcmVuY2VzIHdpbGwgYmUgb3V0cHV0IGF0IHRoZSB2ZXJ5IGVuZC5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBJbWFnZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXIodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICB0cmFuc2Zvcm1hdGlvbi5za2lwQ2hpbGRyZW4gPSBjb250ZXh0LmdldCgncHJldmlvdXNTa2lwQ2hpbGRyZW4nKVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXJBbGwodHJhbnNmb3JtYXRpb24pIHtcbiAgICBpZiAoIXRoaXMuX2ltYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZCgnXFxuXFxuJylcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoYFtpbWFnZSR7aX1dOiAke3RoaXMuX2ltYWdlc1tpXX1cXG5gKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c1NraXBDaGlsZHJlbicsIHRyYW5zZm9ybWF0aW9uLnNraXBDaGlsZHJlbilcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZUFsbCh0cmFuc2Zvcm1hdGlvbikge1xuICAgIC8qKlxuICAgICAqIFRoZSBpbWFnZSB2YWx1ZXMgKHdoaWNoIHdpbGwgY29udGFpbiB0aGUgSFJFRikgbWFwcGVkIHRvIHRoZWlyIGluZGV4LlxuICAgICAqXG4gICAgICogVGhpcyBpcyBvbmx5IHVzZWQgd2hlbiB0aGUgPGNvZGU+aW5saW5lPC9jb2RlPiBvcHRpb24gaXMgZW5hYmxlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge01hcDxzdHJpbmcsIG51bWJlcj59XG4gICAgICovXG4gICAgdGhpcy5faW1hZ2VNYXAgPSBuZXcgTWFwKClcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleGVkIGltYWdlIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb25seSB1c2VkIHdoZW4gdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICB0aGlzLl9pbWFnZXMgPSBbXVxuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdHJhbnNmb3JtKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuID0gdHJ1ZVxuXG4gICAgY29uc3QgeyBlbGVtZW50LCBvcHRpb25zIH0gPSB0cmFuc2Zvcm1hdGlvblxuICAgIGNvbnN0IHNvdXJjZSA9IG9wdGlvbnMuYWJzb2x1dGUgPyBlbGVtZW50LnNyYyA6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgIGlmICghc291cmNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBhbHRlcm5hdGl2ZVRleHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJydcbiAgICBjb25zdCB0aXRsZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpXG4gICAgbGV0IHZhbHVlID0gdGl0bGUgPyBgJHtzb3VyY2V9IFwiJHt0aXRsZX1cImAgOiBzb3VyY2VcblxuICAgIGlmIChvcHRpb25zLmlubGluZSkge1xuICAgICAgdmFsdWUgPSBgKCR7dmFsdWV9KWBcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4ID0gdGhpcy5faW1hZ2VNYXAuZ2V0KHZhbHVlKVxuICAgICAgaWYgKGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLl9pbWFnZXMucHVzaCh2YWx1ZSkgLSAxXG5cbiAgICAgICAgdGhpcy5faW1hZ2VNYXAuc2V0KHZhbHVlLCBpbmRleClcbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBgW2ltYWdlJHtpbmRleH1dYFxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLm91dHB1dChgIVske2FsdGVybmF0aXZlVGV4dH1dJHt2YWx1ZX1gKVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VQbHVnaW5cbiJdfQ==
