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
 * A {@link Plugin} which outputs the contents in a code block.
 *
 * @public
 * @extends {Plugin}
 */
class CodePlugin extends Plugin {

  /**
   * @override
   */
  after(transformation, context) {
    if (!context.get('skipped')) {
      transformation.inCodeBlock = context.get('previousInCodeBlock')

      transformation.output('`')
    }
  }

  /**
   * @override
   */
  before(transformation, context) {
    context.set('previousInCodeBlock', transformation.inCodeBlock)
  }

  /**
   * @override
   */
  transform(transformation, context) {
    if (transformation.inPreformattedBlock) {
      context.set('skipped', true)
    } else {
      transformation.output('`')

      transformation.inCodeBlock = true
    }
  }

}

export { CodePlugin }
