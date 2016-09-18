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

exports.Plugin = Plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4vcGx1Z2luLmpzIl0sIm5hbWVzIjpbIlBsdWdpbiIsInRyYW5zZm9ybWF0aW9uIiwiY29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7QUFFQTs7Ozs7SUFLTUEsTTs7Ozs7Ozs7O0FBRUo7Ozs7Ozs7Ozs7OzswQkFZTUMsYyxFQUFnQkMsTyxFQUFTLENBQUU7O0FBRWpDOzs7Ozs7Ozs7OzZCQU9TRCxjLEVBQWdCLENBQUU7O0FBRTNCOzs7Ozs7Ozs7Ozs7Ozs7MkJBWU9BLGMsRUFBZ0JDLE8sRUFBUyxDQUFFOztBQUVsQzs7Ozs7Ozs7Ozs4QkFPVUQsYyxFQUFnQixDQUFFOztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7OzhCQVlVQSxjLEVBQWdCQyxPLEVBQVMsQ0FBRTs7Ozs7UUFJOUJGLE0sR0FBQUEsTSIsImZpbGUiOiJwbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby1lbXB0eS1mdW5jdGlvbjogXCJvZmZcIiwgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cblxuLyoqXG4gKiBBIHBsdWdpbiB0aGF0IGNhbiB0YXAgaW50byBtdWx0aXBsZSBwYXJ0cyBpbiB0aGUgdHJhbnNmb3JtYXRpb24gcHJvY2Vzcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFBsdWdpbiB7XG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciB7QGxpbmsgUGx1Z2luI3RyYW5zZm9ybX0gPGI+YW5kPC9iPiBvbmx5IG9uY2UgYWxsIGNoaWxkcmVuIGVsZW1lbnRzIGhhdmUgYmVlbiB0cmFuc2Zvcm1lZCBhcyB3ZWxsLFxuICAgKiBwcm92aWRlZCB0aGV5IHdlcmVuJ3Qgc2tpcHBlZCwgYW5kIGludGVuZGVkIGZvciB0aWR5aW5nIHVwIGFmdGVyIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICpcbiAgICogPGNvZGU+Y29udGV4dDwvY29kZT4gY2FuIGJlIHVzZWQgdG8gcmVjZWl2ZSBhbnkgc3RhdGUgZm9yIGEgc2luZ2xlIGVsZW1lbnQgdHJhbnNmb3JtYXRpb24gZnJvbVxuICAgKiB7QGxpbmsgUGx1Z2luI2JlZm9yZX0gYW5kIHtAbGluayBQbHVnaW4jdHJhbnNmb3JtfS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn0gdHJhbnNmb3JtYXRpb24gLSB0aGUgY3VycmVudCB7QGxpbmsgVHJhbnNmb3JtYXRpb259XG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZywgKj59IGNvbnRleHQgLSB0aGUgY3VycmVudCBjb250ZXh0IGZvciB0aGlzIHtAbGluayBQbHVnaW59XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFmdGVyKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYmVmb3JlIGFueSBlbGVtZW50cyBhcmUgdHJhbnNmb3JtZWQgYW5kIGludGVuZGVkIHRvIHNldHVwIHRoaXMge0BsaW5rIFBsdWdpbn0gaW5pdGlhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn0uXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFmdGVyQWxsKHRyYW5zZm9ybWF0aW9uKSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgaW1tZWRpYXRlbHkgYmVmb3JlIHtAbGluayBQbHVnaW4jdHJhbnNmb3JtfSBhbmQgaW50ZW5kZWQgZm9yIHByZXBhcmluZyB0aGlzIHtAbGluayBQbHVnaW59IGZvclxuICAgKiB0cmFuc2Zvcm1hdGlvbi5cbiAgICpcbiAgICogPGNvZGU+Y29udGV4dDwvY29kZT4gY2FuIGJlIHVzZWQgdG8gcGFzcyBhbnkgc3RhdGUgZm9yIGEgc2luZ2xlIGVsZW1lbnQgdHJhbnNmb3JtYXRpb24gdG8ge0BsaW5rIFBsdWdpbiN0cmFuc2Zvcm19XG4gICAqIGFuZCB0aGVuIHRvIHtAbGluayBQbHVnaW4jYWZ0ZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufSB0cmFuc2Zvcm1hdGlvbiAtIHRoZSBjdXJyZW50IHtAbGluayBUcmFuc2Zvcm1hdGlvbn1cbiAgICogQHBhcmFtIHtNYXA8c3RyaW5nLCAqPn0gY29udGV4dCAtIHRoZSBjdXJyZW50IGNvbnRleHQgZm9yIHRoaXMge0BsaW5rIFBsdWdpbn1cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYmVmb3JlKHRyYW5zZm9ybWF0aW9uLCBjb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgYWxsIGVsZW1lbnRzIGhhdmUgYmVlbiB0cmFuc2Zvcm1lZCBhbmQgaW50ZW5kZWQgdG8gY29tcGxldGluZyBhbnkgc3RlcHMgZm9yIHRoaXMge0BsaW5rIFBsdWdpbn0uXG4gICAqXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb259IHRyYW5zZm9ybWF0aW9uIC0gdGhlIGN1cnJlbnQge0BsaW5rIFRyYW5zZm9ybWF0aW9ufVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHVibGljXG4gICAqL1xuICBiZWZvcmVBbGwodHJhbnNmb3JtYXRpb24pIHt9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIGN1cnJlbnQgZWxlbWVudCB3aXRoaW4gdGhlIHNwZWNpZmllZCA8Y29kZT50cmFuc2Zvcm1hdGlvbjwvY29kZT4gd2hpY2ggY2FuIGJlIHVzZWQgdG8gcHJvdmlkZVxuICAgKiBjb250cm9sIG92ZXIgdGhlIHRyYW5zZm9ybWF0aW9uLlxuICAgKlxuICAgKiA8Y29kZT5jb250ZXh0PC9jb2RlPiBjYW4gYmUgdXNlZCB0byBwYXNzIGFueSBzdGF0ZSBmb3IgYSBzaW5nbGUgZWxlbWVudCB0cmFuc2Zvcm1hdGlvbiBmcm9tIHtAbGluayBQbHVnaW4jYmVmb3JlfVxuICAgKiB0byB7QGxpbmsgUGx1Z2luI2FmdGVyfS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn0gdHJhbnNmb3JtYXRpb24gLSB0aGUgY3VycmVudCB7QGxpbmsgVHJhbnNmb3JtYXRpb259XG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZywgKj59IGNvbnRleHQgLSB0aGUgY3VycmVudCBjb250ZXh0IGZvciB0aGlzIHtAbGluayBQbHVnaW59XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRyYW5zZm9ybSh0cmFuc2Zvcm1hdGlvbiwgY29udGV4dCkge31cblxufVxuXG5leHBvcnQgeyBQbHVnaW4gfVxuIl19
