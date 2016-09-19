'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImagePlugin = undefined;

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
    key: 'afterAll',


    /**
     * @override
     */
    value: function afterAll(transformation) {
      var images = transformation.context.get('images');
      if (!images.length) {
        return;
      }

      transformation.append('\n\n');

      for (var i = 0; i < images.length; i++) {
        transformation.append('[image' + i + ']: ' + images[i] + '\n');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(transformation) {
      transformation.context.set('imageMap', new _map2.default());
      transformation.context.set('images', []);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      var element = transformation.element;
      var options = transformation.options;

      var source = options.absolute ? element.src : element.getAttribute('src');
      if (!source) {
        return false;
      }

      var alternativeText = element.getAttribute('alt') || '';
      var title = element.getAttribute('title');
      var value = title ? source + ' "' + title + '"' : source;

      if (options.inline) {
        value = '(' + value + ')';
      } else {
        var imageMap = transformation.context.get('imageMap');
        var images = transformation.context.get('images');
        var index = imageMap.get(value);
        if (index == null) {
          index = images.push(value) - 1;

          imageMap.set(value, index);
        }

        value = '[image' + index + ']';
      }

      transformation.output('![' + alternativeText + ']' + value);

      return false;
    }
  }]);
  return ImagePlugin;
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

exports.ImagePlugin = ImagePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9pbWFnZS5qcyJdLCJuYW1lcyI6WyJJbWFnZVBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiaW1hZ2VzIiwiY29udGV4dCIsImdldCIsImxlbmd0aCIsImFwcGVuZCIsImkiLCJzZXQiLCJlbGVtZW50Iiwib3B0aW9ucyIsInNvdXJjZSIsImFic29sdXRlIiwic3JjIiwiZ2V0QXR0cmlidXRlIiwiYWx0ZXJuYXRpdmVUZXh0IiwidGl0bGUiLCJ2YWx1ZSIsImlubGluZSIsImltYWdlTWFwIiwiaW5kZXgiLCJwdXNoIiwib3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFhTUEsVzs7Ozs7Ozs7Ozs7O0FBRUo7Ozs2QkFHU0MsYyxFQUFnQjtBQUN2QixVQUFNQyxTQUFTRCxlQUFlRSxPQUFmLENBQXVCQyxHQUF2QixDQUEyQixRQUEzQixDQUFmO0FBQ0EsVUFBSSxDQUFDRixPQUFPRyxNQUFaLEVBQW9CO0FBQ2xCO0FBQ0Q7O0FBRURKLHFCQUFlSyxNQUFmLENBQXNCLE1BQXRCOztBQUVBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTCxPQUFPRyxNQUEzQixFQUFtQ0UsR0FBbkMsRUFBd0M7QUFDdENOLHVCQUFlSyxNQUFmLFlBQStCQyxDQUEvQixXQUFzQ0wsT0FBT0ssQ0FBUCxDQUF0QztBQUNEO0FBQ0Y7O0FBRUQ7Ozs7Ozs4QkFHVU4sYyxFQUFnQjtBQUN4QkEscUJBQWVFLE9BQWYsQ0FBdUJLLEdBQXZCLENBQTJCLFVBQTNCLEVBQXVDLG1CQUF2QztBQUNBUCxxQkFBZUUsT0FBZixDQUF1QkssR0FBdkIsQ0FBMkIsUUFBM0IsRUFBcUMsRUFBckM7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVUCxjLEVBQWdCRSxPLEVBQVM7QUFBQSxVQUN6Qk0sT0FEeUIsR0FDSlIsY0FESSxDQUN6QlEsT0FEeUI7QUFBQSxVQUNoQkMsT0FEZ0IsR0FDSlQsY0FESSxDQUNoQlMsT0FEZ0I7O0FBRWpDLFVBQU1DLFNBQVNELFFBQVFFLFFBQVIsR0FBbUJILFFBQVFJLEdBQTNCLEdBQWlDSixRQUFRSyxZQUFSLENBQXFCLEtBQXJCLENBQWhEO0FBQ0EsVUFBSSxDQUFDSCxNQUFMLEVBQWE7QUFDWCxlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFNSSxrQkFBa0JOLFFBQVFLLFlBQVIsQ0FBcUIsS0FBckIsS0FBK0IsRUFBdkQ7QUFDQSxVQUFNRSxRQUFRUCxRQUFRSyxZQUFSLENBQXFCLE9BQXJCLENBQWQ7QUFDQSxVQUFJRyxRQUFRRCxRQUFXTCxNQUFYLFVBQXNCSyxLQUF0QixTQUFpQ0wsTUFBN0M7O0FBRUEsVUFBSUQsUUFBUVEsTUFBWixFQUFvQjtBQUNsQkQsc0JBQVlBLEtBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFNRSxXQUFXbEIsZUFBZUUsT0FBZixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0IsQ0FBakI7QUFDQSxZQUFNRixTQUFTRCxlQUFlRSxPQUFmLENBQXVCQyxHQUF2QixDQUEyQixRQUEzQixDQUFmO0FBQ0EsWUFBSWdCLFFBQVFELFNBQVNmLEdBQVQsQ0FBYWEsS0FBYixDQUFaO0FBQ0EsWUFBSUcsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCQSxrQkFBUWxCLE9BQU9tQixJQUFQLENBQVlKLEtBQVosSUFBcUIsQ0FBN0I7O0FBRUFFLG1CQUFTWCxHQUFULENBQWFTLEtBQWIsRUFBb0JHLEtBQXBCO0FBQ0Q7O0FBRURILDJCQUFpQkcsS0FBakI7QUFDRDs7QUFFRG5CLHFCQUFlcUIsTUFBZixRQUEyQlAsZUFBM0IsU0FBOENFLEtBQTlDOztBQUVBLGFBQU8sS0FBUDtBQUNEOzs7bUJBL0ZIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUdTakIsVyxHQUFBQSxXIiwiZmlsZSI6ImltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuLi9wbHVnaW4nXG5cbi8qKlxuICogQSB7QGxpbmsgUGx1Z2lufSB3aGljaCBleHRyYWN0cyB0aGUgVVJMIGZyb20gYW4gaW1hZ2UuXG4gKlxuICogSWYgdGhlIDxjb2RlPmFic29sdXRlPC9jb2RlPiBvcHRpb24gaXMgZW5hYmxlZCwgdGhlbiB0aGUgVVJMIGV4dHJhY3RlZCBmcm9tIHRoZSBpbWFnZSB3aWxsIGJlIGFic29sdXRlLiBPdGhlcndpc2UsXG4gKiB0aGUgVVJMIHdpbGwgYmUgZXhhY3RseSBhcyBpdCBpcyBpbiB0aGUgPGNvZGU+c3JjPC9jb2RlPiBhdHRyaWJ1dGUuXG4gKlxuICogSWYgdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIFVSTCB3aWxsIGJlIGluc2VydGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSA8Y29kZT5hbHQ8L2NvZGU+IG9uXG4gKiB0aGUgaW1hZ2UgKGUuZy4gPGNvZGU+IVtmb29dKC9iYXIucG5nKTwvY29kZT4pLiBPdGhlcndpc2UsIGFsbCB1bmlxdWUgVVJMcyB3aWxsIGJlIGluZGV4ZWRcbiAqIChlLmcuIDxjb2RlPiFbZm9vXVtpbWFnZTBdPC9jb2RlPikgYW5kIHRoZSByZWZlcmVuY2VzIHdpbGwgYmUgb3V0cHV0IGF0IHRoZSB2ZXJ5IGVuZC5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBJbWFnZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgYWZ0ZXJBbGwodHJhbnNmb3JtYXRpb24pIHtcbiAgICBjb25zdCBpbWFnZXMgPSB0cmFuc2Zvcm1hdGlvbi5jb250ZXh0LmdldCgnaW1hZ2VzJylcbiAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZCgnXFxuXFxuJylcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoYFtpbWFnZSR7aX1dOiAke2ltYWdlc1tpXX1cXG5gKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZUFsbCh0cmFuc2Zvcm1hdGlvbikge1xuICAgIHRyYW5zZm9ybWF0aW9uLmNvbnRleHQuc2V0KCdpbWFnZU1hcCcsIG5ldyBNYXAoKSlcbiAgICB0cmFuc2Zvcm1hdGlvbi5jb250ZXh0LnNldCgnaW1hZ2VzJywgW10pXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb25zdCB7IGVsZW1lbnQsIG9wdGlvbnMgfSA9IHRyYW5zZm9ybWF0aW9uXG4gICAgY29uc3Qgc291cmNlID0gb3B0aW9ucy5hYnNvbHV0ZSA/IGVsZW1lbnQuc3JjIDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGFsdGVybmF0aXZlVGV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhbHQnKSB8fCAnJ1xuICAgIGNvbnN0IHRpdGxlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJylcbiAgICBsZXQgdmFsdWUgPSB0aXRsZSA/IGAke3NvdXJjZX0gXCIke3RpdGxlfVwiYCA6IHNvdXJjZVxuXG4gICAgaWYgKG9wdGlvbnMuaW5saW5lKSB7XG4gICAgICB2YWx1ZSA9IGAoJHt2YWx1ZX0pYFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbWFnZU1hcCA9IHRyYW5zZm9ybWF0aW9uLmNvbnRleHQuZ2V0KCdpbWFnZU1hcCcpXG4gICAgICBjb25zdCBpbWFnZXMgPSB0cmFuc2Zvcm1hdGlvbi5jb250ZXh0LmdldCgnaW1hZ2VzJylcbiAgICAgIGxldCBpbmRleCA9IGltYWdlTWFwLmdldCh2YWx1ZSlcbiAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGluZGV4ID0gaW1hZ2VzLnB1c2godmFsdWUpIC0gMVxuXG4gICAgICAgIGltYWdlTWFwLnNldCh2YWx1ZSwgaW5kZXgpXG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gYFtpbWFnZSR7aW5kZXh9XWBcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQoYCFbJHthbHRlcm5hdGl2ZVRleHR9XSR7dmFsdWV9YClcblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbn1cblxuZXhwb3J0IHsgSW1hZ2VQbHVnaW4gfVxuIl19
