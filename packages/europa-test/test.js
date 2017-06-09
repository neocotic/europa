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
(function(global, factory) {
  /* eslint global-require: "off", no-nested-ternary: "off", strict: "off" */
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chai'))
  : typeof define === 'function' && define.amd ? define([ 'chai' ], factory)
  : (global.test = factory(global.chai));
}(this, (function(chai) {
  'use strict';

  var expect = chai.expect;
  var fixtures = [
    'content',
    'lists',
    'scaffolding',
    'tables',
    'unformatted-lists',
    'visibility'
  ];

  return function(options) {
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
            expect(europa.convert(html)).to.equal(markdown);
          });
        });
      });
    });
  };
})));
