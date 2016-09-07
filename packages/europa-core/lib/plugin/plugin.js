"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
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

/* eslint no-empty-function: "off", no-unused-vars: "off" */

/**
 * A plugin that can tap into multiple parts in the transformation process.
 *
 * @public
 */
var Plugin = function () {
  function Plugin() {
    (0, _classCallCheck3.default)(this, Plugin);
  }

  (0, _createClass3.default)(Plugin, [{
    key: "after",


    /**
     * Called after {@link Plugin#transform} <b>and</b> only once all children elements have been transformed as well,
     * provided they weren't skipped, and intended for tidying up after the transformation.
     *
     * <code>context</code> can be used to receive any state for a single element transformation from
     * {@link Plugin#before} and {@link Plugin#transform}.
     *
     * @param {Transformation} transformation - the current {@link Transformation}
     * @param {Map<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     */
    value: function after(transformation, context) {}

    /**
     * Called before any elements are transformed and intended to setup this {@link Plugin} initially.
     *
     * @param {Transformation} transformation - the current {@link Transformation}.
     * @return {void}
     * @public
     */

  }, {
    key: "afterAll",
    value: function afterAll(transformation) {}

    /**
     * Called immediately before {@link Plugin#transform} and intended for preparing this {@link Plugin} for
     * transformation.
     *
     * <code>context</code> can be used to pass any state for a single element transformation to {@link Plugin#transform}
     * and then to {@link Plugin#after}.
     *
     * @param {Transformation} transformation - the current {@link Transformation}
     * @param {Map<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     */

  }, {
    key: "before",
    value: function before(transformation, context) {}

    /**
     * Called after all elements have been transformed and intended to completing any steps for this {@link Plugin}.
     *
     * @param {Transformation} transformation - the current {@link Transformation}
     * @return {void}
     * @public
     */

  }, {
    key: "beforeAll",
    value: function beforeAll(transformation) {}

    /**
     * Transforms the current element within the specified <code>transformation</code> which can be used to provide
     * control over the transformation.
     *
     * <code>context</code> can be used to pass any state for a single element transformation from {@link Plugin#before}
     * to {@link Plugin#after}.
     *
     * @param {Transformation} transformation - the current {@link Transformation}
     * @param {Map<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     */

  }, {
    key: "transform",
    value: function transform(transformation, context) {}
  }]);
  return Plugin;
}();

exports.default = Plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4vcGx1Z2luLmpzIl0sIm5hbWVzIjpbIlBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztBQUVBOzs7OztJQUtNQSxNOzs7Ozs7Ozs7QUFFSjs7Ozs7Ozs7Ozs7OzBCQVlNQyxjLEVBQWdCQyxPLEVBQVMsQ0FBRTs7QUFFakM7Ozs7Ozs7Ozs7NkJBT1NELGMsRUFBZ0IsQ0FBRTs7QUFFM0I7Ozs7Ozs7Ozs7Ozs7OzsyQkFZT0EsYyxFQUFnQkMsTyxFQUFTLENBQUU7O0FBRWxDOzs7Ozs7Ozs7OzhCQU9VRCxjLEVBQWdCLENBQUU7O0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OEJBWVVBLGMsRUFBZ0JDLE8sRUFBUyxDQUFFOzs7OztrQkFJeEJGLE0iLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tZW1wdHktZnVuY3Rpb246IFwib2ZmXCIsIG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5cbi8qKlxuICogQSBwbHVnaW4gdGhhdCBjYW4gdGFwIGludG8gbXVsdGlwbGUgcGFydHMgaW4gdGhlIHRyYW5zZm9ybWF0aW9uIHByb2Nlc3MuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIge0BsaW5rIFBsdWdpbiN0cmFuc2Zvcm19IDxiPmFuZDwvYj4gb25seSBvbmNlIGFsbCBjaGlsZHJlbiBlbGVtZW50cyBoYXZlIGJlZW4gdHJhbnNmb3JtZWQgYXMgd2VsbCxcbiAgICogcHJvdmlkZWQgdGhleSB3ZXJlbid0IHNraXBwZWQsIGFuZCBpbnRlbmRlZCBmb3IgdGlkeWluZyB1cCBhZnRlciB0aGUgdHJhbnNmb3JtYXRpb24uXG4gICAqXG4gICAqIDxjb2RlPmNvbnRleHQ8L2NvZGU+IGNhbiBiZSB1c2VkIHRvIHJlY2VpdmUgYW55IHN0YXRlIGZvciBhIHNpbmdsZSBlbGVtZW50IHRyYW5zZm9ybWF0aW9uIGZyb21cbiAgICoge0BsaW5rIFBsdWdpbiNiZWZvcmV9IGFuZCB7QGxpbmsgUGx1Z2luI3RyYW5zZm9ybX0uXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsICo+fSBjb250ZXh0IC0gdGhlIGN1cnJlbnQgY29udGV4dCBmb3IgdGhpcyB7QGxpbmsgUGx1Z2lufVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZnRlcih0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge31cblxuICAvKipcbiAgICogQ2FsbGVkIGJlZm9yZSBhbnkgZWxlbWVudHMgYXJlIHRyYW5zZm9ybWVkIGFuZCBpbnRlbmRlZCB0byBzZXR1cCB0aGlzIHtAbGluayBQbHVnaW59IGluaXRpYWxseS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn0gdHJhbnNmb3JtYXRpb24gLSB0aGUgY3VycmVudCB7QGxpbmsgVHJhbnNmb3JtYXRpb259LlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZnRlckFsbCh0cmFuc2Zvcm1hdGlvbikge31cblxuICAvKipcbiAgICogQ2FsbGVkIGltbWVkaWF0ZWx5IGJlZm9yZSB7QGxpbmsgUGx1Z2luI3RyYW5zZm9ybX0gYW5kIGludGVuZGVkIGZvciBwcmVwYXJpbmcgdGhpcyB7QGxpbmsgUGx1Z2lufSBmb3JcbiAgICogdHJhbnNmb3JtYXRpb24uXG4gICAqXG4gICAqIDxjb2RlPmNvbnRleHQ8L2NvZGU+IGNhbiBiZSB1c2VkIHRvIHBhc3MgYW55IHN0YXRlIGZvciBhIHNpbmdsZSBlbGVtZW50IHRyYW5zZm9ybWF0aW9uIHRvIHtAbGluayBQbHVnaW4jdHJhbnNmb3JtfVxuICAgKiBhbmQgdGhlbiB0byB7QGxpbmsgUGx1Z2luI2FmdGVyfS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn0gdHJhbnNmb3JtYXRpb24gLSB0aGUgY3VycmVudCB7QGxpbmsgVHJhbnNmb3JtYXRpb259XG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZywgKj59IGNvbnRleHQgLSB0aGUgY3VycmVudCBjb250ZXh0IGZvciB0aGlzIHtAbGluayBQbHVnaW59XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGJlZm9yZSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge31cblxuICAvKipcbiAgICogQ2FsbGVkIGFmdGVyIGFsbCBlbGVtZW50cyBoYXZlIGJlZW4gdHJhbnNmb3JtZWQgYW5kIGludGVuZGVkIHRvIGNvbXBsZXRpbmcgYW55IHN0ZXBzIGZvciB0aGlzIHtAbGluayBQbHVnaW59LlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn1cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYmVmb3JlQWxsKHRyYW5zZm9ybWF0aW9uKSB7fVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBjdXJyZW50IGVsZW1lbnQgd2l0aGluIHRoZSBzcGVjaWZpZWQgPGNvZGU+dHJhbnNmb3JtYXRpb248L2NvZGU+IHdoaWNoIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGVcbiAgICogY29udHJvbCBvdmVyIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICpcbiAgICogPGNvZGU+Y29udGV4dDwvY29kZT4gY2FuIGJlIHVzZWQgdG8gcGFzcyBhbnkgc3RhdGUgZm9yIGEgc2luZ2xlIGVsZW1lbnQgdHJhbnNmb3JtYXRpb24gZnJvbSB7QGxpbmsgUGx1Z2luI2JlZm9yZX1cbiAgICogdG8ge0BsaW5rIFBsdWdpbiNhZnRlcn0uXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsICo+fSBjb250ZXh0IC0gdGhlIGN1cnJlbnQgY29udGV4dCBmb3IgdGhpcyB7QGxpbmsgUGx1Z2lufVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtYXRpb24sIGNvbnRleHQpIHt9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGx1Z2luXG4iXX0=
