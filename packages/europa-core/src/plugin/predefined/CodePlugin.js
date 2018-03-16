/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
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

'use strict';

const Europa = require('../../Europa');
const Plugin = require('../Plugin');

/**
 * A {@link Plugin} which outputs the contents in a code block.
 *
 * @public
 */
class CodePlugin extends Plugin {

  /**
   * @override
   */
  after(conversion, context) {
    if (!context.skipped) {
      conversion.inCodeBlock = context.previousInCodeBlock;

      conversion.output('`');
    }
  }

  /**
   * @override
   */
  before(conversion, context) {
    context.previousInCodeBlock = conversion.inCodeBlock;
  }

  /**
   * @override
   */
  convert(conversion, context) {
    if (conversion.inPreformattedBlock) {
      context.skipped = true;
    } else {
      conversion.output('`');

      conversion.inCodeBlock = true;
    }

    return true;
  }

  /**
   * @override
   */
  getTagNames() {
    return [
      'code',
      'kbd',
      'samp'
    ];
  }

}

Europa.register(new CodePlugin());

module.exports = CodePlugin;
