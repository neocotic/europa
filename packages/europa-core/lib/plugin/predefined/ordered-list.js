'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * A {@link Plugin} which outputs an ordered list.
 *
 * @public
 * @extends {Plugin}
 */
var OrderedListPlugin = function (_Plugin) {
  (0, _inherits3.default)(OrderedListPlugin, _Plugin);

  function OrderedListPlugin() {
    (0, _classCallCheck3.default)(this, OrderedListPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (OrderedListPlugin.__proto__ || (0, _getPrototypeOf2.default)(OrderedListPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(OrderedListPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(transformation, context) {
      transformation.inOrderedList = context.get('previousInOrderedList');
      transformation.listIndex = context.get('previousListIndex');
      transformation.listDepth--;
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(transformation, context) {
      context.set('previousInOrderedList', transformation.inOrderedList);
      context.set('previousListIndex', transformation.listIndex);
    }

    /**
     * @override
     */

  }, {
    key: 'transform',
    value: function transform(transformation, context) {
      if (transformation.listDepth === 0) {
        transformation.appendParagraph();
      }

      transformation.inOrderedList = true;
      transformation.listIndex = 1;
      transformation.listDepth++;
    }
  }]);
  return OrderedListPlugin;
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

exports.default = OrderedListPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC9vcmRlcmVkLWxpc3QuanMiXSwibmFtZXMiOlsiT3JkZXJlZExpc3RQbHVnaW4iLCJ0cmFuc2Zvcm1hdGlvbiIsImNvbnRleHQiLCJpbk9yZGVyZWRMaXN0IiwiZ2V0IiwibGlzdEluZGV4IiwibGlzdERlcHRoIiwic2V0IiwiYXBwZW5kUGFyYWdyYXBoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxpQjs7Ozs7Ozs7Ozs7O0FBRUo7OzswQkFHTUMsYyxFQUFnQkMsTyxFQUFTO0FBQzdCRCxxQkFBZUUsYUFBZixHQUErQkQsUUFBUUUsR0FBUixDQUFZLHVCQUFaLENBQS9CO0FBQ0FILHFCQUFlSSxTQUFmLEdBQTJCSCxRQUFRRSxHQUFSLENBQVksbUJBQVosQ0FBM0I7QUFDQUgscUJBQWVLLFNBQWY7QUFDRDs7QUFFRDs7Ozs7OzJCQUdPTCxjLEVBQWdCQyxPLEVBQVM7QUFDOUJBLGNBQVFLLEdBQVIsQ0FBWSx1QkFBWixFQUFxQ04sZUFBZUUsYUFBcEQ7QUFDQUQsY0FBUUssR0FBUixDQUFZLG1CQUFaLEVBQWlDTixlQUFlSSxTQUFoRDtBQUNEOztBQUVEOzs7Ozs7OEJBR1VKLGMsRUFBZ0JDLE8sRUFBUztBQUNqQyxVQUFJRCxlQUFlSyxTQUFmLEtBQTZCLENBQWpDLEVBQW9DO0FBQ2xDTCx1QkFBZU8sZUFBZjtBQUNEOztBQUVEUCxxQkFBZUUsYUFBZixHQUErQixJQUEvQjtBQUNBRixxQkFBZUksU0FBZixHQUEyQixDQUEzQjtBQUNBSixxQkFBZUssU0FBZjtBQUNEOzs7cUJBOURIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztrQkE0Q2VOLGlCIiwiZmlsZSI6Im9yZGVyZWQtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5cbmltcG9ydCBQbHVnaW4gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhbiBvcmRlcmVkIGxpc3QuXG4gKlxuICogQHB1YmxpY1xuICogQGV4dGVuZHMge1BsdWdpbn1cbiAqL1xuY2xhc3MgT3JkZXJlZExpc3RQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24uaW5PcmRlcmVkTGlzdCA9IGNvbnRleHQuZ2V0KCdwcmV2aW91c0luT3JkZXJlZExpc3QnKVxuICAgIHRyYW5zZm9ybWF0aW9uLmxpc3RJbmRleCA9IGNvbnRleHQuZ2V0KCdwcmV2aW91c0xpc3RJbmRleCcpXG4gICAgdHJhbnNmb3JtYXRpb24ubGlzdERlcHRoLS1cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGJlZm9yZSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c0luT3JkZXJlZExpc3QnLCB0cmFuc2Zvcm1hdGlvbi5pbk9yZGVyZWRMaXN0KVxuICAgIGNvbnRleHQuc2V0KCdwcmV2aW91c0xpc3RJbmRleCcsIHRyYW5zZm9ybWF0aW9uLmxpc3RJbmRleClcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIGlmICh0cmFuc2Zvcm1hdGlvbi5saXN0RGVwdGggPT09IDApIHtcbiAgICAgIHRyYW5zZm9ybWF0aW9uLmFwcGVuZFBhcmFncmFwaCgpXG4gICAgfVxuXG4gICAgdHJhbnNmb3JtYXRpb24uaW5PcmRlcmVkTGlzdCA9IHRydWVcbiAgICB0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXggPSAxXG4gICAgdHJhbnNmb3JtYXRpb24ubGlzdERlcHRoKytcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyZWRMaXN0UGx1Z2luXG4iXX0=
