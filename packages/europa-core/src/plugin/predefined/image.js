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

import { Plugin } from '../plugin'

/**
 * A {@link Plugin} which extracts the URL from an image.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the image will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>src</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL will be inserted immediately after the <code>alt</code> on
 * the image (e.g. <code>![foo](/bar.png)</code>). Otherwise, all unique URLs will be indexed
 * (e.g. <code>![foo][image0]</code>) and the references will be output at the very end.
 *
 * @public
 * @extends {Plugin}
 */
class ImagePlugin extends Plugin {

  /**
   * @override
   */
  afterAll(transformation) {
    const images = transformation.context.get('images')
    if (!images.length) {
      return
    }

    transformation.append('\n\n')

    for (let i = 0; i < images.length; i++) {
      transformation.append(`[image${i}]: ${images[i]}\n`)
    }
  }

  /**
   * @override
   */
  beforeAll(transformation) {
    transformation.context.set('imageMap', new Map())
    transformation.context.set('images', [])
  }

  /**
   * @override
   */
  transform(transformation, context) {
    const { element, options } = transformation
    const source = options.absolute ? element.src : element.getAttribute('src')
    if (!source) {
      return false
    }

    const alternativeText = element.getAttribute('alt') || ''
    const title = element.getAttribute('title')
    let value = title ? `${source} "${title}"` : source

    if (options.inline) {
      value = `(${value})`
    } else {
      const imageMap = transformation.context.get('imageMap')
      const images = transformation.context.get('images')
      let index = imageMap.get(value)
      if (index == null) {
        index = images.push(value) - 1

        imageMap.set(value, index)
      }

      value = `[image${index}]`
    }

    transformation.output(`![${alternativeText}]${value}`)

    return false
  }

}

export { ImagePlugin }