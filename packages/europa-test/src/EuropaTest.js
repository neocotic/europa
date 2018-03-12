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

var assert = require('chai').assert;
var Nevis = require('nevis/lite');

var fixtures = [
  'content',
  'lists',
  'scaffolding',
  'tables',
  'unformatted-lists',
  'visibility'
];

/**
 * TODO: Document
 *
 * @public
 * @class
 * @extends Nevis
 */
var EuropaTest = Nevis.extend(null, {

  /**
   * TODO: Document
   *
   * @param {Object} options -
   * @param {Function} options.Europa -
   * @param {Function} options.loadFixture -
   * @return {void}
   * @public
   * @static
   * @memberof EuropaTest
   */
  test: function(options) {
    var europa = new options.Europa();
    var loadFixture = options.loadFixture;

    describe('europa-test', function() {
      fixtures.forEach(function(fixture) {
        describe('fixture-' + fixture, function() {
          var html, markdown;

          before('load HTML fixture', function(done) {
            loadFixture('/fixtures/' + fixture + '.html', function(error, contents) {
              if (error) {
                done(error);
              } else {
                html = contents;
                done();
              }
            });
          });

          before('load Markdown fixture', function(done) {
            loadFixture('/fixtures/' + fixture + '.md', function(error, contents) {
              if (error) {
                done(error);
              } else {
                markdown = contents;
                done();
              }
            });
          });

          it('should correctly convert HTML into Markdown', function() {
            assert.equal(europa.convert(html), markdown);
          });
        });
      });
    });
  }

});

module.exports = EuropaTest;
