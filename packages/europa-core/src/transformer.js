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

import Transformation from './transformation'

/**
 * Transforms an HTML string or DOM element into Markdown.
 *
 * @public
 */
class Transformer {

  /**
   * Creates an instance of {@link Transformer} using the specified <code>window</code> and <code>plugins</code>.
   *
   * @param {Window} window - the <code>Window</code> to be used
   * @param {Map<string, Plugin>} plugins - the plugins to be used
   * @public
   */
  constructor(window, plugins) {
    /**
     * The <code>Window</code> for this {@link Transformer}.
     *
     * @public
     * @type {Window}
     */
    this.window = window

    /**
     * The <code>HTMLDocument</code> for this {@link Transformer}.
     *
     * @public
     * @type {HTMLDocument}
     */
    this.document = window.document

    /**
     * The plugins for this {@link Transformer}.
     *
     * @private
     * @type {Map<string, Plugin>}
     */
    this._plugins = plugins
  }

  /**
   * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
   *
   * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
   * Markdown.
   *
   * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
   * @param {Transformation~Options} options - the options to be used
   * @return {string} The transformed Markdown.
   * @public
   */
  transform(html, options) {
    if (!html) {
      return ''
    }

    let root
    if (typeof html === 'string') {
      root = this._document.createElement('div')
      root.innerHTML = html
    } else {
      root = html
    }

    const transformation = new Transformation(this, options)

    this._plugins.values().forEach((plugin) => plugin.beforeAll(transformation))

    this.transformElement(root, transformation)

    this._plugins.values().forEach((plugin) => plugin.afterAll(transformation))

    return transformation.append('').buffer.trim()
  }

  /**
   * Transforms the specified <code>element</code> and it's children into Markdown using the <code>transformation</code>
   * provided.
   *
   * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
   *
   * @param {Element} element - the element to be transformed into Markdown as well as it's children
   * @param {Transformation} transformation - the current {@link Transformation}
   * @return {void}
   * @public
   */
  transformElement(element, transformation) {
    if (!(element && this._isVisible(element))) {
      return
    }

    if (element.nodeType === this.window.Node.ELEMENT_NODE) {
      transformation.element = element

      const context = new Map()
      const plugin = this._plugins.get(transformation.tagName)
      if (plugin) {
        transformation.pluginStack.push(plugin)

        plugin.before(transformation, context)
        plugin.transform(transformation, context)
      }

      if (!transformation.skipChildren) {
        for (const child of Array.from(element.childNodes)) {
          this.transformElement(child, transformation)
        }
      }

      if (plugin) {
        plugin.after(transformation, context)

        transformation.pluginStack.pop()
      }
    } else if (element.nodeType === this.window.Node.TEXT_NODE) {
      const value = element.nodeValue || ''

      if (transformation.inPreformattedBlock) {
        transformation.output(value)
      } else if (transformation.inCodeBlock) {
        transformation.output(value.replace(/`/g, '\\`'))
      } else {
        transformation.output(value, true)
      }
    }
  }

  /**
   * Checks whether the specified <code>element</code> is currently visible.
   *
   * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
   * cases.
   *
   * @param {Element} element - the element whose visibility is to be checked
   * @return {boolean} <code>true</code> if <code>element</code> is visible; otherwise <code>false</code>.
   * @private
   */
  _isVisible(element) {
    const style = this.window.getComputedStyle(element)

    return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden'
  }

}

export default Transformer
