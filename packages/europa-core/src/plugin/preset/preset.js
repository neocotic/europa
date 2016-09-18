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

/**
 * A preset of plugins usually grouped for a specific purpose.
 *
 * @public
 */
class Preset {

  /**
   * Creates an instance of {@link Preset}.
   *
   * @public
   */
  constructor() {
    /**
     * The plugins for this {@link Preset}.
     *
     * @private
     * @type {Map<string[], Plugin>}
     */
    this._plugins = new Map()
  }

  /**
   * Sets the specified <code>plugin</code> for the <code>tags</code> provided.
   *
   * @param {string[]} tags - the tag names to which <code>plugin</code> will be registered
   * @param {Plugin} plugin - the {@link Plugin} to be registered against <code>tags</code>
   * @return {Preset} A reference to this {@link Preset} for chaining purposes.
   * @public
   */
  set(tags, plugin) {
    this._plugins.set(tags, plugin)

    return this
  }

  /**
   * Sets all of the specified <code>plugins</code> to be registered against their mapped tag names.
   *
   * @param {Map<string[], Plugin>} plugins - a <code>Map</code> of plugins and tag names to which they are
   * to be registered
   * @return {Preset} A reference to this {@link Preset} for chaining purposes.
   * @public
   */
  setAll(plugins) {
    for (const [ tags, plugin ] of plugins) {
      this._plugins.set(tags, plugin)
    }

    return this
  }

  /**
   * Returns the plugins for this {@link Preset}.
   *
   * @return {Map<string[], Plugin>} The plugins.
   * @public
   */
  get plugins() {
    return new Map(this._plugins)
  }

}

export { Preset }
