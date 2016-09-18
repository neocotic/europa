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

exports.ImagePlugin = ImagePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9pbWFnZS5qcyJdLCJuYW1lcyI6WyJJbWFnZVBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCIsInNraXBDaGlsZHJlbiIsImdldCIsIl9pbWFnZXMiLCJsZW5ndGgiLCJhcHBlbmQiLCJpIiwic2V0IiwiX2ltYWdlTWFwIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJzb3VyY2UiLCJhYnNvbHV0ZSIsInNyYyIsImdldEF0dHJpYnV0ZSIsImFsdGVybmF0aXZlVGV4dCIsInRpdGxlIiwidmFsdWUiLCJpbmxpbmUiLCJpbmRleCIsInB1c2giLCJvdXRwdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7OztJQWFNQSxXOzs7Ozs7Ozs7Ozs7QUFFSjs7OzBCQUdNQyxjLEVBQWdCQyxPLEVBQVM7QUFDN0JELHFCQUFlRSxZQUFmLEdBQThCRCxRQUFRRSxHQUFSLENBQVksc0JBQVosQ0FBOUI7QUFDRDs7QUFFRDs7Ozs7OzZCQUdTSCxjLEVBQWdCO0FBQ3ZCLFVBQUksQ0FBQyxLQUFLSSxPQUFMLENBQWFDLE1BQWxCLEVBQTBCO0FBQ3hCO0FBQ0Q7O0FBRURMLHFCQUFlTSxNQUFmLENBQXNCLE1BQXRCOztBQUVBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtILE9BQUwsQ0FBYUMsTUFBakMsRUFBeUNFLEdBQXpDLEVBQThDO0FBQzVDUCx1QkFBZU0sTUFBZixZQUErQkMsQ0FBL0IsV0FBc0MsS0FBS0gsT0FBTCxDQUFhRyxDQUFiLENBQXRDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OzJCQUdPUCxjLEVBQWdCQyxPLEVBQVM7QUFDOUJBLGNBQVFPLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ1IsZUFBZUUsWUFBbkQ7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVRixjLEVBQWdCO0FBQ3hCOzs7Ozs7OztBQVFBLFdBQUtTLFNBQUwsR0FBaUIsbUJBQWpCOztBQUVBOzs7Ozs7OztBQVFBLFdBQUtMLE9BQUwsR0FBZSxFQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs4QkFHVUosYyxFQUFnQkMsTyxFQUFTO0FBQ2pDRCxxQkFBZUUsWUFBZixHQUE4QixJQUE5Qjs7QUFEaUMsVUFHekJRLE9BSHlCLEdBR0pWLGNBSEksQ0FHekJVLE9BSHlCO0FBQUEsVUFHaEJDLE9BSGdCLEdBR0pYLGNBSEksQ0FHaEJXLE9BSGdCOztBQUlqQyxVQUFNQyxTQUFTRCxRQUFRRSxRQUFSLEdBQW1CSCxRQUFRSSxHQUEzQixHQUFpQ0osUUFBUUssWUFBUixDQUFxQixLQUFyQixDQUFoRDtBQUNBLFVBQUksQ0FBQ0gsTUFBTCxFQUFhO0FBQ1g7QUFDRDs7QUFFRCxVQUFNSSxrQkFBa0JOLFFBQVFLLFlBQVIsQ0FBcUIsS0FBckIsS0FBK0IsRUFBdkQ7QUFDQSxVQUFNRSxRQUFRUCxRQUFRSyxZQUFSLENBQXFCLE9BQXJCLENBQWQ7QUFDQSxVQUFJRyxRQUFRRCxRQUFXTCxNQUFYLFVBQXNCSyxLQUF0QixTQUFpQ0wsTUFBN0M7O0FBRUEsVUFBSUQsUUFBUVEsTUFBWixFQUFvQjtBQUNsQkQsc0JBQVlBLEtBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJRSxRQUFRLEtBQUtYLFNBQUwsQ0FBZU4sR0FBZixDQUFtQmUsS0FBbkIsQ0FBWjtBQUNBLFlBQUlFLFNBQVMsSUFBYixFQUFtQjtBQUNqQkEsa0JBQVEsS0FBS2hCLE9BQUwsQ0FBYWlCLElBQWIsQ0FBa0JILEtBQWxCLElBQTJCLENBQW5DOztBQUVBLGVBQUtULFNBQUwsQ0FBZUQsR0FBZixDQUFtQlUsS0FBbkIsRUFBMEJFLEtBQTFCO0FBQ0Q7O0FBRURGLDJCQUFpQkUsS0FBakI7QUFDRDs7QUFFRHBCLHFCQUFlc0IsTUFBZixRQUEyQk4sZUFBM0IsU0FBOENFLEtBQTlDO0FBQ0Q7OzttQkE3SEg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7O1FBMkdTbkIsVyxHQUFBQSxXIiwiZmlsZSI6ImltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggZXh0cmFjdHMgdGhlIFVSTCBmcm9tIGFuIGltYWdlLlxuICpcbiAqIElmIHRoZSA8Y29kZT5hYnNvbHV0ZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQsIHRoZW4gdGhlIFVSTCBleHRyYWN0ZWQgZnJvbSB0aGUgaW1hZ2Ugd2lsbCBiZSBhYnNvbHV0ZS4gT3RoZXJ3aXNlLFxuICogdGhlIFVSTCB3aWxsIGJlIGV4YWN0bHkgYXMgaXQgaXMgaW4gdGhlIDxjb2RlPnNyYzwvY29kZT4gYXR0cmlidXRlLlxuICpcbiAqIElmIHRoZSA8Y29kZT5pbmxpbmU8L2NvZGU+IG9wdGlvbiBpcyBlbmFibGVkLCB0aGVuIHRoZSBVUkwgd2lsbCBiZSBpbnNlcnRlZCBpbW1lZGlhdGVseSBhZnRlciB0aGUgPGNvZGU+YWx0PC9jb2RlPiBvblxuICogdGhlIGltYWdlIChlLmcuIDxjb2RlPiFbZm9vXSgvYmFyLnBuZyk8L2NvZGU+KS4gT3RoZXJ3aXNlLCBhbGwgdW5pcXVlIFVSTHMgd2lsbCBiZSBpbmRleGVkXG4gKiAoZS5nLiA8Y29kZT4hW2Zvb11baW1hZ2UwXTwvY29kZT4pIGFuZCB0aGUgcmVmZXJlbmNlcyB3aWxsIGJlIG91dHB1dCBhdCB0aGUgdmVyeSBlbmQuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgSW1hZ2VQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uc2tpcENoaWxkcmVuID0gY29udGV4dC5nZXQoJ3ByZXZpb3VzU2tpcENoaWxkcmVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyQWxsKHRyYW5zZm9ybWF0aW9uKSB7XG4gICAgaWYgKCF0aGlzLl9pbWFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmQoJ1xcblxcbicpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2ltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdHJhbnNmb3JtYXRpb24uYXBwZW5kKGBbaW1hZ2Uke2l9XTogJHt0aGlzLl9pbWFnZXNbaV19XFxuYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNTa2lwQ2hpbGRyZW4nLCB0cmFuc2Zvcm1hdGlvbi5za2lwQ2hpbGRyZW4pXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmVBbGwodHJhbnNmb3JtYXRpb24pIHtcbiAgICAvKipcbiAgICAgKiBUaGUgaW1hZ2UgdmFsdWVzICh3aGljaCB3aWxsIGNvbnRhaW4gdGhlIEhSRUYpIG1hcHBlZCB0byB0aGVpciBpbmRleC5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb25seSB1c2VkIHdoZW4gdGhlIDxjb2RlPmlubGluZTwvY29kZT4gb3B0aW9uIGlzIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBudW1iZXI+fVxuICAgICAqL1xuICAgIHRoaXMuX2ltYWdlTWFwID0gbmV3IE1hcCgpXG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXhlZCBpbWFnZSB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9ubHkgdXNlZCB3aGVuIHRoZSA8Y29kZT5pbmxpbmU8L2NvZGU+IG9wdGlvbiBpcyBlbmFibGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICovXG4gICAgdGhpcy5faW1hZ2VzID0gW11cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIHRyYW5zZm9ybWF0aW9uLnNraXBDaGlsZHJlbiA9IHRydWVcblxuICAgIGNvbnN0IHsgZWxlbWVudCwgb3B0aW9ucyB9ID0gdHJhbnNmb3JtYXRpb25cbiAgICBjb25zdCBzb3VyY2UgPSBvcHRpb25zLmFic29sdXRlID8gZWxlbWVudC5zcmMgOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJylcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgYWx0ZXJuYXRpdmVUZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnXG4gICAgY29uc3QgdGl0bGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKVxuICAgIGxldCB2YWx1ZSA9IHRpdGxlID8gYCR7c291cmNlfSBcIiR7dGl0bGV9XCJgIDogc291cmNlXG5cbiAgICBpZiAob3B0aW9ucy5pbmxpbmUpIHtcbiAgICAgIHZhbHVlID0gYCgke3ZhbHVlfSlgXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuX2ltYWdlTWFwLmdldCh2YWx1ZSlcbiAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5faW1hZ2VzLnB1c2godmFsdWUpIC0gMVxuXG4gICAgICAgIHRoaXMuX2ltYWdlTWFwLnNldCh2YWx1ZSwgaW5kZXgpXG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gYFtpbWFnZSR7aW5kZXh9XWBcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm1hdGlvbi5vdXRwdXQoYCFbJHthbHRlcm5hdGl2ZVRleHR9XSR7dmFsdWV9YClcbiAgfVxuXG59XG5cbmV4cG9ydCB7IEltYWdlUGx1Z2luIH1cbiJdfQ==
