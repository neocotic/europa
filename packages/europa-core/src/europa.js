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

import { Transformer } from './transformer'
import defaultPreset from './plugin/preset/default'

/**
 * An HTML to Markdown transformation library that supports HTML strings and DOM elements.
 *
 * @public
 */
class Europa {

  /**
   * Creates an instance of {@link Europa} using the window service provided.
   *
   * @param {WindowService} windowService - the {@link WindowService} to be used for HTML to Markdown transformation
   * @public
   */
  constructor(windowService) {
    /**
     * The {@link WindowService} for this {@link Europa} instance.
     *
     * @private
     * @type {WindowService}
     */
    this._windowService = windowService

    /**
     * The <code>Window</code> to be used for HTML to Markdown transformation.
     *
     * @private
     * @type {Window}
     */
    this._window = null

    /**
     * The plugins for this {@link Europa} instance.
     *
     * @private
     * @type {Map<string, Plugin>}
     */
    this._plugins = new Map()

    this.registerPreset(defaultPreset)
  }

  /**
   * Destroys the <code>Window</code> used by this {@link Europa} instance.
   *
   * This allows closeable {@link WindowService} implementations to close the <code>Window</code> and free up resources.
   * However, this instance can and will simply retrieve another <code>Window</code> from the {@link WindowService} the
   * next time it is required.
   *
   * @return {Europa} A reference to this {@link Europa} for chaining purposes.
   * @public
   */
  destroy() {
    if (this._window) {
      this._windowService.closeWindow(this._window)
      this._window = null
    }

    return this
  }

  /**
   * Registers the specified <code>plugin</code> for the <code>tags</code> provided.
   *
   * <code>tags</code> can be an array of tag names or a single string containing white-space separated tag names.
   *
   * @param {string|string[]} tags - the tag names for which <code>plugin</code> is to be registered
   * @param {Plugin} plugin - the {@link Plugin} to be registered
   * @return {Europa} A reference to this {@link Europa} for chaining purposes.
   * @public
   */
  register(tags, plugin) {
    if (typeof tags === 'string') {
      tags = tags.trim().split(/\s+/)
    }

    for (const tag of tags) {
      this._plugins.set(tag.toLowerCase(), plugin)
    }

    return this
  }

  /**
   * Registers all of the plugins within the specified <code>preset</code>.
   *
   * @param {Preset} preset - the {@link Preset} whose plugins are to be registered
   * @return {Europa} A reference to this {@link Europa} for chaining purposes.
   * @public
   */
  registerPreset(preset) {
    for (const [ tags, plugin ] of preset.plugins) {
      this.register(tags, plugin)
    }

    return this
  }

  /**
   * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
   *
   * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
   * Markdown.
   *
   * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
   * @param {Transformation~Options} [options] - the options to be used
   * @return {string} The transformed Markdown.
   * @public
   */
  transform(html, options) {
    const { window } = this
    const transformer = new Transformer(window, this._plugins)

    options = this._createTransformationOptions(options)

    return transformer.transform(html, options)
  }

  /**
   * Creates the options, including their default values, for the {@link Transformer#transform} method based on the
   * <code>options</code> provided.
   *
   * @param {Transformation~Options} [options] - the options that were passed in
   * @return {Transformation~Options} The complete options.
   * @private
   */
  _createTransformationOptions(options) {
    return Object.assign({
      absolute: false,
      baseUri: this._windowService.getBaseUri(this.window),
      inline: false
    }, options)
  }

  /**
   * Returns the <code>Window</code> for this {@link Europa} instance.
   *
   * If no <code>Window</code> has been allocated, one is retrieved from the {@link WindowService} and allocated.
   *
   * @return {Window} The <code>Window</code>.
   * @public
   */
  get window() {
    if (this._window == null) {
      this._window = this._windowService.getWindow()
    }

    return this._window
  }

}

export { Europa }
