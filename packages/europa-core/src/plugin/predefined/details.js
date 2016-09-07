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

/* eslint no-unused-vars: "off" */

import Plugin from '../plugin'

/**
 * A {@link Plugin} which outputs a details section.
 *
 * If the details has an <code>open</code> attribute then all of its children are transformed. Otherwise, only the
 * nested <code>summary</code>, if any, will be transformed.
 *
 * @public
 * @extends {Plugin}
 */
class DetailsPlugin extends Plugin {

  /**
   * @override
   */
  after(transformation, context) {
    transformation.skipChildren = context.get('previousSkipChildren')
  }

  /**
   * @override
   */
  before(transformation, context) {
    context.set('previousSkipChildren', transformation.skipChildren)
  }

  /**
   * @override
   */
  transform(transformation, context) {
    const { element } = transformation

    transformation.appendParagraph()

    if (!element.hasAttribute('open')) {
      transformation.skipChildren = true

      const summary = element.querySelector('summary')
      transformation.transformer.transformElement(summary, transformation)
    }
  }

}

export default DetailsPlugin
