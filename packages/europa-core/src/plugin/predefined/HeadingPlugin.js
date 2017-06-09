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
 * A {@link Plugin} which outputs a heading of various levels.
 *
 * @public
 * @class
 * @extends Plugin
 */
var HeadingPlugin = Plugin.extend({

  /**
   * @override
   */
  convert: function(conversion, context) {
    var level = parseInt(conversion.tagName.match(/([1-6])$/)[1], 10);

    conversion.appendParagraph();

    var heading = '';
    for (var i = 0; i < level; i++) {
      heading += '#';
    }

    conversion.output(heading + ' ');

    return true;
  },

  /**
   * @override
   */
  getTagNames: function() {
    return [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ];
  }

});

Europa.register(new HeadingPlugin());

module.exports = HeadingPlugin;
