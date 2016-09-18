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

import { Plugin } from '../plugin'

/**
 * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
 * text.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>href</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
 * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
 * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
 *
 * @public
 * @extends {Plugin}
 */
class AnchorPlugin extends Plugin {

  /**
   * @override
   */
  after(transformation, context) {
    if (context.has('value')) {
      transformation.output(`]${context.get('value')}`)
    }
  }

  /**
   * @override
   */
  afterAll(transformation) {
    if (!this._anchors.length) {
      return
    }

    transformation.append('\n\n')

    for (let i = 0; i < this._anchors.length; i++) {
      transformation.append(`[anchor${i}]: ${this._anchors[i]}\n`)
    }
  }

  /**
   * @override
   */
  beforeAll(transformation) {
    /**
     * The anchor values (which will contain the HREF and any title) mapped to their index.
     *
     * This is only used when the <code>inline</code> option is enabled.
     *
     * @private
     * @type {Map<string, number>}
     */
    this._anchorMap = new Map()

    /**
     * The indexed anchor values.
     *
     * This is only used when the <code>inline</code> option is enabled.
     *
     * @private
     * @type {string[]}
     */
    this._anchors = []
  }

  /**
   * @override
   */
  transform(transformation, context) {
    const { element, options } = transformation
    const href = options.absolute ? element.href : element.getAttribute('href')
    if (!href) {
      return
    }

    const title = element.getAttribute('title')
    const value = title ? `${href} "${title}"` : href

    if (options.inline) {
      context.set('value', `(${value})`)
    } else {
      let index = this._anchorMap.get(value)
      if (index == null) {
        index = this._anchors.push(value) - 1

        this._anchorMap.set(value, index)
      }

      context.set('value', `[anchor${index}]`)
    }

    transformation.output('[')

    transformation.atNoWhiteSpace = true
  }

}

export { AnchorPlugin }
