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
var Utilities = require('../../util/Utilities');

/**
 * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
 * item is contained within.
 *
 * @public
 * @class
 * @extends Plugin
 */
var ListItemPlugin = Plugin.extend({

  /**
   * @override
   */
  convert: function(conversion, context) {
    var value = conversion.inOrderedList ? conversion.listIndex++ + '. ' : '* ';

    if (!conversion.atLeft) {
      conversion.append(conversion.left.replace(/[ ]{2,4}$/, '\n'));

      conversion.atLeft = true;
      conversion.atNoWhiteSpace = true;
      conversion.atParagraph = true;
    } else if (conversion.last) {
      conversion.last = conversion.last.replace(/[ ]{2,4}$/, '\n');
    }

    conversion.append(Utilities.leftPad(value, (conversion.listDepth - 1) * 2));

    return true;
  },

  /**
   * @override
   */
  getTagNames: function() {
    return [ 'li' ];
  }

});

Europa.register(new ListItemPlugin());

module.exports = ListItemPlugin;
