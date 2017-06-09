/*
 * Copyright (C) 2017 Alasdair Mercer, !ninja
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

var Europa = require('../../Europa');
var Plugin = require('../Plugin');

/**
 * A {@link Plugin} which outputs the contents in a preformatted block.
 *
 * @public
 * @class
 * @extends Plugin
 */
var PreformattedPlugin = Plugin.extend({

  /**
   * @override
   */
  after: function(conversion, context) {
    conversion.atLeft = false;
    conversion.atParagraph = false;
    conversion.inPreformattedBlock = context.previousInPreformattedBlock;
    conversion.left = context.previousLeft;

    conversion.appendParagraph();
  },

  /**
   * @override
   */
  before: function(conversion, context) {
    context.previousInPreformattedBlock = conversion.inPreformattedBlock;
    context.previousLeft = conversion.left;
  },

  /**
   * @override
   */
  convert: function(conversion, context) {
    var value = '    ';

    conversion.left += value;

    if (conversion.atParagraph) {
      conversion.append(value);
    } else {
      conversion.appendParagraph();
    }

    return true;
  },

  /**
   * @override
   */
  getTagNames: function() {
    return [ 'pre' ];
  }

});

Europa.register(new PreformattedPlugin());

module.exports = PreformattedPlugin;
