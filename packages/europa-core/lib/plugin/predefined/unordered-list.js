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
 * A {@link Plugin} which outputs an unordered list.
 *
 * @public
 * @extends {Plugin}
 */
var UnorderedListPlugin = function (_Plugin) {
  (0, _inherits3.default)(UnorderedListPlugin, _Plugin);

  function UnorderedListPlugin() {
    (0, _classCallCheck3.default)(this, UnorderedListPlugin);
    return (0, _possibleConstructorReturn3.default)(this, (UnorderedListPlugin.__proto__ || (0, _getPrototypeOf2.default)(UnorderedListPlugin)).apply(this, arguments));
  }

  (0, _createClass3.default)(UnorderedListPlugin, [{
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

      transformation.inOrderedList = false;
      transformation.listIndex = 1;
      transformation.listDepth++;
    }
  }]);
  return UnorderedListPlugin;
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

exports.default = UnorderedListPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlZGVmaW5lZC91bm9yZGVyZWQtbGlzdC5qcyJdLCJuYW1lcyI6WyJVbm9yZGVyZWRMaXN0UGx1Z2luIiwidHJhbnNmb3JtYXRpb24iLCJjb250ZXh0IiwiaW5PcmRlcmVkTGlzdCIsImdldCIsImxpc3RJbmRleCIsImxpc3REZXB0aCIsInNldCIsImFwcGVuZFBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7OztBQUVBOzs7Ozs7SUFNTUEsbUI7Ozs7Ozs7Ozs7OztBQUVKOzs7MEJBR01DLGMsRUFBZ0JDLE8sRUFBUztBQUM3QkQscUJBQWVFLGFBQWYsR0FBK0JELFFBQVFFLEdBQVIsQ0FBWSx1QkFBWixDQUEvQjtBQUNBSCxxQkFBZUksU0FBZixHQUEyQkgsUUFBUUUsR0FBUixDQUFZLG1CQUFaLENBQTNCO0FBQ0FILHFCQUFlSyxTQUFmO0FBQ0Q7O0FBRUQ7Ozs7OzsyQkFHT0wsYyxFQUFnQkMsTyxFQUFTO0FBQzlCQSxjQUFRSyxHQUFSLENBQVksdUJBQVosRUFBcUNOLGVBQWVFLGFBQXBEO0FBQ0FELGNBQVFLLEdBQVIsQ0FBWSxtQkFBWixFQUFpQ04sZUFBZUksU0FBaEQ7QUFDRDs7QUFFRDs7Ozs7OzhCQUdVSixjLEVBQWdCQyxPLEVBQVM7QUFDakMsVUFBSUQsZUFBZUssU0FBZixLQUE2QixDQUFqQyxFQUFvQztBQUNsQ0wsdUJBQWVPLGVBQWY7QUFDRDs7QUFFRFAscUJBQWVFLGFBQWYsR0FBK0IsS0FBL0I7QUFDQUYscUJBQWVJLFNBQWYsR0FBMkIsQ0FBM0I7QUFDQUoscUJBQWVLLFNBQWY7QUFDRDs7O3FCQTlESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7a0JBNENlTixtQiIsImZpbGUiOiJ1bm9yZGVyZWQtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5cbmltcG9ydCBQbHVnaW4gZnJvbSAnLi4vcGx1Z2luJ1xuXG4vKipcbiAqIEEge0BsaW5rIFBsdWdpbn0gd2hpY2ggb3V0cHV0cyBhbiB1bm9yZGVyZWQgbGlzdC5cbiAqXG4gKiBAcHVibGljXG4gKiBAZXh0ZW5kcyB7UGx1Z2lufVxuICovXG5jbGFzcyBVbm9yZGVyZWRMaXN0UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPSBjb250ZXh0LmdldCgncHJldmlvdXNJbk9yZGVyZWRMaXN0JylcbiAgICB0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXggPSBjb250ZXh0LmdldCgncHJldmlvdXNMaXN0SW5kZXgnKVxuICAgIHRyYW5zZm9ybWF0aW9uLmxpc3REZXB0aC0tXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBiZWZvcmUodHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNJbk9yZGVyZWRMaXN0JywgdHJhbnNmb3JtYXRpb24uaW5PcmRlcmVkTGlzdClcbiAgICBjb250ZXh0LnNldCgncHJldmlvdXNMaXN0SW5kZXgnLCB0cmFuc2Zvcm1hdGlvbi5saXN0SW5kZXgpXG4gIH1cblxuICAvKipcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHtcbiAgICBpZiAodHJhbnNmb3JtYXRpb24ubGlzdERlcHRoID09PSAwKSB7XG4gICAgICB0cmFuc2Zvcm1hdGlvbi5hcHBlbmRQYXJhZ3JhcGgoKVxuICAgIH1cblxuICAgIHRyYW5zZm9ybWF0aW9uLmluT3JkZXJlZExpc3QgPSBmYWxzZVxuICAgIHRyYW5zZm9ybWF0aW9uLmxpc3RJbmRleCA9IDFcbiAgICB0cmFuc2Zvcm1hdGlvbi5saXN0RGVwdGgrK1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5vcmRlcmVkTGlzdFBsdWdpblxuIl19
