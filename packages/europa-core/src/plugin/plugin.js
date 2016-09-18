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
class Plugin {

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
  after(transformation, context) {}

  /**
   * Called before any elements are transformed and intended to setup this {@link Plugin} initially.
   *
   * @param {Transformation} transformation - the current {@link Transformation}.
   * @return {void}
   * @public
   */
  afterAll(transformation) {}

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
  before(transformation, context) {}

  /**
   * Called after all elements have been transformed and intended to completing any steps for this {@link Plugin}.
   *
   * @param {Transformation} transformation - the current {@link Transformation}
   * @return {void}
   * @public
   */
  beforeAll(transformation) {}

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
  transform(transformation, context) {}

}

export { Plugin }
