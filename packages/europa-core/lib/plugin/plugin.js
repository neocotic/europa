"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = undefined;

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

/* eslint no-empty-function: "off" */

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
     * control over the transformation and returns whether the children of the element should be transformed.
     *
     * <code>context</code> can be used to pass any state for a single element transformation from {@link Plugin#before}
     * to {@link Plugin#after}.
     *
     * @param {Transformation} transformation - the current {@link Transformation}
     * @param {Map<string, *>} context - the current context for this {@link Plugin}
     * @return {boolean} <code>true</code> if the children of the current element should be transformed; otherwise
     * <code>false</code>.
     * @public
     */

  }, {
    key: "transform",
    value: function transform(transformation, context) {
      return true;
    }
  }]);
  return Plugin;
}();

exports.Plugin = Plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4vcGx1Z2luLmpzIl0sIm5hbWVzIjpbIlBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7QUFFQTs7Ozs7SUFLTUEsTTs7Ozs7Ozs7O0FBRUo7Ozs7Ozs7Ozs7OzswQkFZTUMsYyxFQUFnQkMsTyxFQUFTLENBQUU7O0FBRWpDOzs7Ozs7Ozs7OzZCQU9TRCxjLEVBQWdCLENBQUU7O0FBRTNCOzs7Ozs7Ozs7Ozs7Ozs7MkJBWU9BLGMsRUFBZ0JDLE8sRUFBUyxDQUFFOztBQUVsQzs7Ozs7Ozs7Ozs4QkFPVUQsYyxFQUFnQixDQUFFOztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFhVUEsYyxFQUFnQkMsTyxFQUFTO0FBQ2pDLGFBQU8sSUFBUDtBQUNEOzs7OztRQUlNRixNLEdBQUFBLE0iLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBBbGFzZGFpciBNZXJjZXIsIFNrZWxwXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tZW1wdHktZnVuY3Rpb246IFwib2ZmXCIgKi9cblxuLyoqXG4gKiBBIHBsdWdpbiB0aGF0IGNhbiB0YXAgaW50byBtdWx0aXBsZSBwYXJ0cyBpbiB0aGUgdHJhbnNmb3JtYXRpb24gcHJvY2Vzcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciB7QGxpbmsgUGx1Z2luI3RyYW5zZm9ybX0gPGI+YW5kPC9iPiBvbmx5IG9uY2UgYWxsIGNoaWxkcmVuIGVsZW1lbnRzIGhhdmUgYmVlbiB0cmFuc2Zvcm1lZCBhcyB3ZWxsLFxuICAgKiBwcm92aWRlZCB0aGV5IHdlcmVuJ3Qgc2tpcHBlZCwgYW5kIGludGVuZGVkIGZvciB0aWR5aW5nIHVwIGFmdGVyIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICpcbiAgICogPGNvZGU+Y29udGV4dDwvY29kZT4gY2FuIGJlIHVzZWQgdG8gcmVjZWl2ZSBhbnkgc3RhdGUgZm9yIGEgc2luZ2xlIGVsZW1lbnQgdHJhbnNmb3JtYXRpb24gZnJvbVxuICAgKiB7QGxpbmsgUGx1Z2luI2JlZm9yZX0gYW5kIHtAbGluayBQbHVnaW4jdHJhbnNmb3JtfS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn0gdHJhbnNmb3JtYXRpb24gLSB0aGUgY3VycmVudCB7QGxpbmsgVHJhbnNmb3JtYXRpb259XG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZywgKj59IGNvbnRleHQgLSB0aGUgY3VycmVudCBjb250ZXh0IGZvciB0aGlzIHtAbGluayBQbHVnaW59XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYmVmb3JlIGFueSBlbGVtZW50cyBhcmUgdHJhbnNmb3JtZWQgYW5kIGludGVuZGVkIHRvIHNldHVwIHRoaXMge0BsaW5rIFBsdWdpbn0gaW5pdGlhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFmdGVyQWxsKHRyYW5zZm9ybWF0aW9uKSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgaW1tZWRpYXRlbHkgYmVmb3JlIHtAbGluayBQbHVnaW4jdHJhbnNmb3JtfSBhbmQgaW50ZW5kZWQgZm9yIHByZXBhcmluZyB0aGlzIHtAbGluayBQbHVnaW59IGZvclxuICAgKiB0cmFuc2Zvcm1hdGlvbi5cbiAgICpcbiAgICogPGNvZGU+Y29udGV4dDwvY29kZT4gY2FuIGJlIHVzZWQgdG8gcGFzcyBhbnkgc3RhdGUgZm9yIGEgc2luZ2xlIGVsZW1lbnQgdHJhbnNmb3JtYXRpb24gdG8ge0BsaW5rIFBsdWdpbiN0cmFuc2Zvcm19XG4gICAqIGFuZCB0aGVuIHRvIHtAbGluayBQbHVnaW4jYWZ0ZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn1cbiAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCAqPn0gY29udGV4dCAtIHRoZSBjdXJyZW50IGNvbnRleHQgZm9yIHRoaXMge0BsaW5rIFBsdWdpbn1cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgYWxsIGVsZW1lbnRzIGhhdmUgYmVlbiB0cmFuc2Zvcm1lZCBhbmQgaW50ZW5kZWQgdG8gY29tcGxldGluZyBhbnkgc3RlcHMgZm9yIHRoaXMge0BsaW5rIFBsdWdpbn0uXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBiZWZvcmVBbGwodHJhbnNmb3JtYXRpb24pIHt9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIGN1cnJlbnQgZWxlbWVudCB3aXRoaW4gdGhlIHNwZWNpZmllZCA8Y29kZT50cmFuc2Zvcm1hdGlvbjwvY29kZT4gd2hpY2ggY2FuIGJlIHVzZWQgdG8gcHJvdmlkZVxuICAgKiBjb250cm9sIG92ZXIgdGhlIHRyYW5zZm9ybWF0aW9uIGFuZCByZXR1cm5zIHdoZXRoZXIgdGhlIGNoaWxkcmVuIG9mIHRoZSBlbGVtZW50IHNob3VsZCBiZSB0cmFuc2Zvcm1lZC5cbiAgICpcbiAgICogPGNvZGU+Y29udGV4dDwvY29kZT4gY2FuIGJlIHVzZWQgdG8gcGFzcyBhbnkgc3RhdGUgZm9yIGEgc2luZ2xlIGVsZW1lbnQgdHJhbnNmb3JtYXRpb24gZnJvbSB7QGxpbmsgUGx1Z2luI2JlZm9yZX1cbiAgICogdG8ge0BsaW5rIFBsdWdpbiNhZnRlcn0uXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsICo+fSBjb250ZXh0IC0gdGhlIGN1cnJlbnQgY29udGV4dCBmb3IgdGhpcyB7QGxpbmsgUGx1Z2lufVxuICAgKiBAcmV0dXJuIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgY2hpbGRyZW4gb2YgdGhlIGN1cnJlbnQgZWxlbWVudCBzaG91bGQgYmUgdHJhbnNmb3JtZWQ7IG90aGVyd2lzZVxuICAgKiA8Y29kZT5mYWxzZTwvY29kZT4uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxufVxuXG5leHBvcnQgeyBQbHVnaW4gfVxuIl19
