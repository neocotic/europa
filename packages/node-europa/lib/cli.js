'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLI = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A command-line interface for transforming HTML into Markdown.
 *
 * @public
 */
var CLI = function () {
  (0, _createClass3.default)(CLI, null, [{
    key: 'ENCODING',


    /**
     * The character set encoding to be used to read/write files.
     *
     * @return {string} The charset encoding.
     * @public
     * @static
     */
    get: function get() {
      return 'utf8';
    }

    /**
     * Creates an instance of {@link CLI} using the specified <code>europa</code> instance and the <code>input</code> and
     * <code>output</code> streams provided.
     *
     * @param {Europa} europa - the {@link Europa} to be used
     * @param {Readable} input - the <code>Readable</code> from which to read the HTML to be transformed if no files or
     * evaluation string is provided
     * @param {Writable} output - the <code>Writable</code> to which the generated Markdown is to be written if no files
     * or output path is provided
     * @public
     */

  }]);

  function CLI(europa, input, output) {
    (0, _classCallCheck3.default)(this, CLI);

    /**
     * The {@link Europa} instance for this {@link CLI}.
     *
     * @private
     * @type {Europa}
     */
    this._europa = europa;

    /**
     * The input stream for this {@link CLI}.
     *
     * This is used to read the HTML to be transformed if no files or evaluation string is provided.
     *
     * @private
     * @type {Readable}
     */
    this._input = input;

    /**
     * The output stream for this {@link CLI}.
     *
     * This is used to write the generated Markdown if no files or output path is provided.
     *
     * @private
     * @type {Writable}
     */
    this._output = output;

    /**
     * The command for this {@link CLI}.
     *
     * @private
     * @type {Command}
     */
    this._program = _commander2.default.version(_package.version).usage('europa [options] [file ...]').option('-a, --absolute', 'use absolute URLs for anchors/images').option('-b, --base-uri <uri>', 'base URI for anchors/images').option('-e, --eval <html>', 'evaluate HTML string').option('-i, --inline', 'insert anchor/image URLs inline').option('-o, --output <path>', 'output directory (for files) or file (for eval/stdin)');
  }

  /**
   * Parses the specified <code>args</code> and determines what is to be transformed into Markdown and where the
   * generated Markdown is to be output.
   *
   * @param {string[]} args - the command-line arguments to be parsed
   * @return {void}
   * @public
   */


  (0, _createClass3.default)(CLI, [{
    key: 'parse',
    value: function parse() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      this._program.parse(args);

      var options = this._createTransformationOptions();

      if (this._program.eval) {
        this._readString(this._program.eval, options);
      } else if (this._program.args.length) {
        var files = _glob2.default.sync(this._program.args, {
          nodir: true,
          nosort: true
        });

        this._readFiles(files, options);
      } else {
        this._readInput(options);
      }
    }

    /**
     * Creates the options to be used for the transformation process based on the parsed command-line arguments.
     *
     * @return {Transformation~Options} The derived options.
     * @private
     */

  }, {
    key: '_createTransformationOptions',
    value: function _createTransformationOptions() {
      var _program = this._program;
      var absolute = _program.absolute;
      var baseUri = _program.baseUri;
      var inline = _program.inline;

      var options = { absolute: absolute, inline: inline };

      if (baseUri) {
        options.baseUri = baseUri;
      }

      return options;
    }

    /**
     * Transforms the specified HTML <code>files</code> into Markdown files based on the <code>options</code> provided.
     * The generated Markdown file will have the same names as the original <code>files</code> except that the file
     * extension will be <code>.md</code>.
     *
     * If a path has been specified via the <code>output</code> command-line option, then the generated Markdown files
     * will all be written to that directory. Otherwise, each file will be written to the same directory as the original
     * file.
     *
     * @param {string[]} files - the HTML files for which Markdown files are to be generated
     * @param {Transformation~Options} options - the options to be used
     * @return {void}
     * @private
     */

  }, {
    key: '_readFiles',
    value: function _readFiles(files, options) {
      if (!files.length) {
        return;
      }

      var output = this._program.output && _path2.default.normalize(this._program.output);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          var html = _fs2.default.readFileSync(file, CLI.ENCODING);
          var markdown = this._europa.transform(html, options);
          var targetDirectory = output || _path2.default.dirname(file);
          var targetFile = _path2.default.join(targetDirectory, _path2.default.basename(file, _path2.default.extname(file)) + '.md');

          _mkdirp2.default.sync(targetDirectory);

          _fs2.default.writeFileSync(targetFile, markdown, CLI.ENCODING);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Transforms the HTML read from the specified input stream into Markdown based on the <code>options</code> provided.
     *
     * If a path has been specified via the <code>output</code> command-line option, then the generated Markdown will be
     * written to that file. Otherwise, it will be written to the specified output stream.
     *
     * @param {Transformation~Options} options - the options to be used
     * @return {void}
     * @private
     */

  }, {
    key: '_readInput',
    value: function _readInput(options) {
      var _this = this;

      var buffer = [];
      var reader = _readline2.default.createInterface({
        input: this._input,
        output: this._output,
        terminal: false
      });

      reader.on('line', function (line) {
        buffer.push(line);
      });
      reader.on('close', function () {
        if (buffer.length) {
          _this._readString(buffer.join('\n'), options);
        }
      });
    }

    /**
     * Transforms the specified <code>html</code> into Markdown based on the <code>options</code> provided.
     *
     * If a path has been specified via the <code>output</code> command-line option, then the generated Markdown will be
     * written to that file. Otherwise, it will be written to the specified output stream.
     *
     * @param {string} html - the HTML to be transformed into Markdown
     * @param {Transformation~Options} options - the options to be used
     * @return {void}
     * @private
     */

  }, {
    key: '_readString',
    value: function _readString(html, options) {
      var markdown = this._europa.transform(html, options);

      if (this._program.output) {
        var target = _path2.default.normalize(this._program.output);
        var output = _path2.default.dirname(target);

        _mkdirp2.default.sync(output);

        _fs2.default.writeFileSync(target, markdown, CLI.ENCODING);
      } else {
        this._output.end(markdown, CLI.ENCODING);
      }
    }
  }]);
  return CLI;
}(); /*
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

exports.CLI = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsiQ0xJIiwiZXVyb3BhIiwiaW5wdXQiLCJvdXRwdXQiLCJfZXVyb3BhIiwiX2lucHV0IiwiX291dHB1dCIsIl9wcm9ncmFtIiwidmVyc2lvbiIsInVzYWdlIiwib3B0aW9uIiwiYXJncyIsInBhcnNlIiwib3B0aW9ucyIsIl9jcmVhdGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMiLCJldmFsIiwiX3JlYWRTdHJpbmciLCJsZW5ndGgiLCJmaWxlcyIsInN5bmMiLCJub2RpciIsIm5vc29ydCIsIl9yZWFkRmlsZXMiLCJfcmVhZElucHV0IiwiYWJzb2x1dGUiLCJiYXNlVXJpIiwiaW5saW5lIiwibm9ybWFsaXplIiwiZmlsZSIsImh0bWwiLCJyZWFkRmlsZVN5bmMiLCJFTkNPRElORyIsIm1hcmtkb3duIiwidHJhbnNmb3JtIiwidGFyZ2V0RGlyZWN0b3J5IiwiZGlybmFtZSIsInRhcmdldEZpbGUiLCJqb2luIiwiYmFzZW5hbWUiLCJleHRuYW1lIiwid3JpdGVGaWxlU3luYyIsImJ1ZmZlciIsInJlYWRlciIsImNyZWF0ZUludGVyZmFjZSIsInRlcm1pbmFsIiwib24iLCJsaW5lIiwicHVzaCIsInRhcmdldCIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7OztJQUtNQSxHOzs7OztBQUVKOzs7Ozs7O3dCQU9zQjtBQUNwQixhQUFPLE1BQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUFXQSxlQUFZQyxNQUFaLEVBQW9CQyxLQUFwQixFQUEyQkMsTUFBM0IsRUFBbUM7QUFBQTs7QUFDakM7Ozs7OztBQU1BLFNBQUtDLE9BQUwsR0FBZUgsTUFBZjs7QUFFQTs7Ozs7Ozs7QUFRQSxTQUFLSSxNQUFMLEdBQWNILEtBQWQ7O0FBRUE7Ozs7Ozs7O0FBUUEsU0FBS0ksT0FBTCxHQUFlSCxNQUFmOztBQUVBOzs7Ozs7QUFNQSxTQUFLSSxRQUFMLEdBQWdCLG9CQUNiQyxPQURhLG1CQUViQyxLQUZhLENBRVAsNkJBRk8sRUFHYkMsTUFIYSxDQUdOLGdCQUhNLEVBR1ksc0NBSFosRUFJYkEsTUFKYSxDQUlOLHNCQUpNLEVBSWtCLDZCQUpsQixFQUtiQSxNQUxhLENBS04sbUJBTE0sRUFLZSxzQkFMZixFQU1iQSxNQU5hLENBTU4sY0FOTSxFQU1VLGlDQU5WLEVBT2JBLE1BUGEsQ0FPTixxQkFQTSxFQU9pQix1REFQakIsQ0FBaEI7QUFRRDs7QUFFRDs7Ozs7Ozs7Ozs7OzRCQVFpQjtBQUFBLFVBQVhDLElBQVcseURBQUosRUFBSTs7QUFDZixXQUFLSixRQUFMLENBQWNLLEtBQWQsQ0FBb0JELElBQXBCOztBQUVBLFVBQU1FLFVBQVUsS0FBS0MsNEJBQUwsRUFBaEI7O0FBRUEsVUFBSSxLQUFLUCxRQUFMLENBQWNRLElBQWxCLEVBQXdCO0FBQ3RCLGFBQUtDLFdBQUwsQ0FBaUIsS0FBS1QsUUFBTCxDQUFjUSxJQUEvQixFQUFxQ0YsT0FBckM7QUFDRCxPQUZELE1BRU8sSUFBSSxLQUFLTixRQUFMLENBQWNJLElBQWQsQ0FBbUJNLE1BQXZCLEVBQStCO0FBQ3BDLFlBQU1DLFFBQVEsZUFBS0MsSUFBTCxDQUFVLEtBQUtaLFFBQUwsQ0FBY0ksSUFBeEIsRUFBOEI7QUFDMUNTLGlCQUFPLElBRG1DO0FBRTFDQyxrQkFBUTtBQUZrQyxTQUE5QixDQUFkOztBQUtBLGFBQUtDLFVBQUwsQ0FBZ0JKLEtBQWhCLEVBQXVCTCxPQUF2QjtBQUNELE9BUE0sTUFPQTtBQUNMLGFBQUtVLFVBQUwsQ0FBZ0JWLE9BQWhCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7Ozs7O21EQU0rQjtBQUFBLHFCQUNTLEtBQUtOLFFBRGQ7QUFBQSxVQUNyQmlCLFFBRHFCLFlBQ3JCQSxRQURxQjtBQUFBLFVBQ1hDLE9BRFcsWUFDWEEsT0FEVztBQUFBLFVBQ0ZDLE1BREUsWUFDRkEsTUFERTs7QUFFN0IsVUFBTWIsVUFBVSxFQUFFVyxrQkFBRixFQUFZRSxjQUFaLEVBQWhCOztBQUVBLFVBQUlELE9BQUosRUFBYTtBQUNYWixnQkFBUVksT0FBUixHQUFrQkEsT0FBbEI7QUFDRDs7QUFFRCxhQUFPWixPQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQWNXSyxLLEVBQU9MLE8sRUFBUztBQUN6QixVQUFJLENBQUNLLE1BQU1ELE1BQVgsRUFBbUI7QUFDakI7QUFDRDs7QUFFRCxVQUFNZCxTQUFTLEtBQUtJLFFBQUwsQ0FBY0osTUFBZCxJQUF3QixlQUFLd0IsU0FBTCxDQUFlLEtBQUtwQixRQUFMLENBQWNKLE1BQTdCLENBQXZDOztBQUx5QjtBQUFBO0FBQUE7O0FBQUE7QUFPekIsd0RBQW1CZSxLQUFuQiw0R0FBMEI7QUFBQSxjQUFmVSxJQUFlOztBQUN4QixjQUFNQyxPQUFPLGFBQUdDLFlBQUgsQ0FBZ0JGLElBQWhCLEVBQXNCNUIsSUFBSStCLFFBQTFCLENBQWI7QUFDQSxjQUFNQyxXQUFXLEtBQUs1QixPQUFMLENBQWE2QixTQUFiLENBQXVCSixJQUF2QixFQUE2QmhCLE9BQTdCLENBQWpCO0FBQ0EsY0FBTXFCLGtCQUFrQi9CLFVBQVUsZUFBS2dDLE9BQUwsQ0FBYVAsSUFBYixDQUFsQztBQUNBLGNBQU1RLGFBQWEsZUFBS0MsSUFBTCxDQUFVSCxlQUFWLEVBQThCLGVBQUtJLFFBQUwsQ0FBY1YsSUFBZCxFQUFvQixlQUFLVyxPQUFMLENBQWFYLElBQWIsQ0FBcEIsQ0FBOUIsU0FBbkI7O0FBRUEsMkJBQU9ULElBQVAsQ0FBWWUsZUFBWjs7QUFFQSx1QkFBR00sYUFBSCxDQUFpQkosVUFBakIsRUFBNkJKLFFBQTdCLEVBQXVDaEMsSUFBSStCLFFBQTNDO0FBQ0Q7QUFoQndCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQjFCOztBQUVEOzs7Ozs7Ozs7Ozs7OytCQVVXbEIsTyxFQUFTO0FBQUE7O0FBQ2xCLFVBQU00QixTQUFTLEVBQWY7QUFDQSxVQUFNQyxTQUFTLG1CQUFTQyxlQUFULENBQXlCO0FBQ3RDekMsZUFBTyxLQUFLRyxNQUQwQjtBQUV0Q0YsZ0JBQVEsS0FBS0csT0FGeUI7QUFHdENzQyxrQkFBVTtBQUg0QixPQUF6QixDQUFmOztBQU1BRixhQUFPRyxFQUFQLENBQVUsTUFBVixFQUFrQixVQUFDQyxJQUFELEVBQVU7QUFDMUJMLGVBQU9NLElBQVAsQ0FBWUQsSUFBWjtBQUNELE9BRkQ7QUFHQUosYUFBT0csRUFBUCxDQUFVLE9BQVYsRUFBbUIsWUFBTTtBQUN2QixZQUFJSixPQUFPeEIsTUFBWCxFQUFtQjtBQUNqQixnQkFBS0QsV0FBTCxDQUFpQnlCLE9BQU9KLElBQVAsQ0FBWSxJQUFaLENBQWpCLEVBQW9DeEIsT0FBcEM7QUFDRDtBQUNGLE9BSkQ7QUFLRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Z0NBV1lnQixJLEVBQU1oQixPLEVBQVM7QUFDekIsVUFBTW1CLFdBQVcsS0FBSzVCLE9BQUwsQ0FBYTZCLFNBQWIsQ0FBdUJKLElBQXZCLEVBQTZCaEIsT0FBN0IsQ0FBakI7O0FBRUEsVUFBSSxLQUFLTixRQUFMLENBQWNKLE1BQWxCLEVBQTBCO0FBQ3hCLFlBQU02QyxTQUFTLGVBQUtyQixTQUFMLENBQWUsS0FBS3BCLFFBQUwsQ0FBY0osTUFBN0IsQ0FBZjtBQUNBLFlBQU1BLFNBQVMsZUFBS2dDLE9BQUwsQ0FBYWEsTUFBYixDQUFmOztBQUVBLHlCQUFPN0IsSUFBUCxDQUFZaEIsTUFBWjs7QUFFQSxxQkFBR3FDLGFBQUgsQ0FBaUJRLE1BQWpCLEVBQXlCaEIsUUFBekIsRUFBbUNoQyxJQUFJK0IsUUFBdkM7QUFDRCxPQVBELE1BT087QUFDTCxhQUFLekIsT0FBTCxDQUFhMkMsR0FBYixDQUFpQmpCLFFBQWpCLEVBQTJCaEMsSUFBSStCLFFBQS9CO0FBQ0Q7QUFDRjs7O0tBMU9IOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOE9TL0IsRyxHQUFBQSxHIiwiZmlsZSI6ImNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgQWxhc2RhaXIgTWVyY2VyLCBTa2VscFxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCBta2RpcnAgZnJvbSAnbWtkaXJwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcidcbmltcG9ydCByZWFkbGluZSBmcm9tICdyZWFkbGluZSdcblxuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4uL3BhY2thZ2UuanNvbidcblxuLyoqXG4gKiBBIGNvbW1hbmQtbGluZSBpbnRlcmZhY2UgZm9yIHRyYW5zZm9ybWluZyBIVE1MIGludG8gTWFya2Rvd24uXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBDTEkge1xuXG4gIC8qKlxuICAgKiBUaGUgY2hhcmFjdGVyIHNldCBlbmNvZGluZyB0byBiZSB1c2VkIHRvIHJlYWQvd3JpdGUgZmlsZXMuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNoYXJzZXQgZW5jb2RpbmcuXG4gICAqIEBwdWJsaWNcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGdldCBFTkNPRElORygpIHtcbiAgICByZXR1cm4gJ3V0ZjgnXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB7QGxpbmsgQ0xJfSB1c2luZyB0aGUgc3BlY2lmaWVkIDxjb2RlPmV1cm9wYTwvY29kZT4gaW5zdGFuY2UgYW5kIHRoZSA8Y29kZT5pbnB1dDwvY29kZT4gYW5kXG4gICAqIDxjb2RlPm91dHB1dDwvY29kZT4gc3RyZWFtcyBwcm92aWRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtFdXJvcGF9IGV1cm9wYSAtIHRoZSB7QGxpbmsgRXVyb3BhfSB0byBiZSB1c2VkXG4gICAqIEBwYXJhbSB7UmVhZGFibGV9IGlucHV0IC0gdGhlIDxjb2RlPlJlYWRhYmxlPC9jb2RlPiBmcm9tIHdoaWNoIHRvIHJlYWQgdGhlIEhUTUwgdG8gYmUgdHJhbnNmb3JtZWQgaWYgbm8gZmlsZXMgb3JcbiAgICogZXZhbHVhdGlvbiBzdHJpbmcgaXMgcHJvdmlkZWRcbiAgICogQHBhcmFtIHtXcml0YWJsZX0gb3V0cHV0IC0gdGhlIDxjb2RlPldyaXRhYmxlPC9jb2RlPiB0byB3aGljaCB0aGUgZ2VuZXJhdGVkIE1hcmtkb3duIGlzIHRvIGJlIHdyaXR0ZW4gaWYgbm8gZmlsZXNcbiAgICogb3Igb3V0cHV0IHBhdGggaXMgcHJvdmlkZWRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29uc3RydWN0b3IoZXVyb3BhLCBpbnB1dCwgb3V0cHV0KSB7XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBFdXJvcGF9IGluc3RhbmNlIGZvciB0aGlzIHtAbGluayBDTEl9LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7RXVyb3BhfVxuICAgICAqL1xuICAgIHRoaXMuX2V1cm9wYSA9IGV1cm9wYVxuXG4gICAgLyoqXG4gICAgICogVGhlIGlucHV0IHN0cmVhbSBmb3IgdGhpcyB7QGxpbmsgQ0xJfS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgdXNlZCB0byByZWFkIHRoZSBIVE1MIHRvIGJlIHRyYW5zZm9ybWVkIGlmIG5vIGZpbGVzIG9yIGV2YWx1YXRpb24gc3RyaW5nIGlzIHByb3ZpZGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7UmVhZGFibGV9XG4gICAgICovXG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dFxuXG4gICAgLyoqXG4gICAgICogVGhlIG91dHB1dCBzdHJlYW0gZm9yIHRoaXMge0BsaW5rIENMSX0uXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHVzZWQgdG8gd3JpdGUgdGhlIGdlbmVyYXRlZCBNYXJrZG93biBpZiBubyBmaWxlcyBvciBvdXRwdXQgcGF0aCBpcyBwcm92aWRlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge1dyaXRhYmxlfVxuICAgICAqL1xuICAgIHRoaXMuX291dHB1dCA9IG91dHB1dFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbW1hbmQgZm9yIHRoaXMge0BsaW5rIENMSX0uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtDb21tYW5kfVxuICAgICAqL1xuICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtXG4gICAgICAudmVyc2lvbih2ZXJzaW9uKVxuICAgICAgLnVzYWdlKCdldXJvcGEgW29wdGlvbnNdIFtmaWxlIC4uLl0nKVxuICAgICAgLm9wdGlvbignLWEsIC0tYWJzb2x1dGUnLCAndXNlIGFic29sdXRlIFVSTHMgZm9yIGFuY2hvcnMvaW1hZ2VzJylcbiAgICAgIC5vcHRpb24oJy1iLCAtLWJhc2UtdXJpIDx1cmk+JywgJ2Jhc2UgVVJJIGZvciBhbmNob3JzL2ltYWdlcycpXG4gICAgICAub3B0aW9uKCctZSwgLS1ldmFsIDxodG1sPicsICdldmFsdWF0ZSBIVE1MIHN0cmluZycpXG4gICAgICAub3B0aW9uKCctaSwgLS1pbmxpbmUnLCAnaW5zZXJ0IGFuY2hvci9pbWFnZSBVUkxzIGlubGluZScpXG4gICAgICAub3B0aW9uKCctbywgLS1vdXRwdXQgPHBhdGg+JywgJ291dHB1dCBkaXJlY3RvcnkgKGZvciBmaWxlcykgb3IgZmlsZSAoZm9yIGV2YWwvc3RkaW4pJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHNwZWNpZmllZCA8Y29kZT5hcmdzPC9jb2RlPiBhbmQgZGV0ZXJtaW5lcyB3aGF0IGlzIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gTWFya2Rvd24gYW5kIHdoZXJlIHRoZVxuICAgKiBnZW5lcmF0ZWQgTWFya2Rvd24gaXMgdG8gYmUgb3V0cHV0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBhcmdzIC0gdGhlIGNvbW1hbmQtbGluZSBhcmd1bWVudHMgdG8gYmUgcGFyc2VkXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHBhcnNlKGFyZ3MgPSBbXSkge1xuICAgIHRoaXMuX3Byb2dyYW0ucGFyc2UoYXJncylcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9jcmVhdGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMoKVxuXG4gICAgaWYgKHRoaXMuX3Byb2dyYW0uZXZhbCkge1xuICAgICAgdGhpcy5fcmVhZFN0cmluZyh0aGlzLl9wcm9ncmFtLmV2YWwsIG9wdGlvbnMpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9wcm9ncmFtLmFyZ3MubGVuZ3RoKSB7XG4gICAgICBjb25zdCBmaWxlcyA9IGdsb2Iuc3luYyh0aGlzLl9wcm9ncmFtLmFyZ3MsIHtcbiAgICAgICAgbm9kaXI6IHRydWUsXG4gICAgICAgIG5vc29ydDogdHJ1ZVxuICAgICAgfSlcblxuICAgICAgdGhpcy5fcmVhZEZpbGVzKGZpbGVzLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWFkSW5wdXQob3B0aW9ucylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgb3B0aW9ucyB0byBiZSB1c2VkIGZvciB0aGUgdHJhbnNmb3JtYXRpb24gcHJvY2VzcyBiYXNlZCBvbiB0aGUgcGFyc2VkIGNvbW1hbmQtbGluZSBhcmd1bWVudHMuXG4gICAqXG4gICAqIEByZXR1cm4ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IFRoZSBkZXJpdmVkIG9wdGlvbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlVHJhbnNmb3JtYXRpb25PcHRpb25zKCkge1xuICAgIGNvbnN0IHsgYWJzb2x1dGUsIGJhc2VVcmksIGlubGluZSB9ID0gdGhpcy5fcHJvZ3JhbVxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGFic29sdXRlLCBpbmxpbmUgfVxuXG4gICAgaWYgKGJhc2VVcmkpIHtcbiAgICAgIG9wdGlvbnMuYmFzZVVyaSA9IGJhc2VVcmlcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHNwZWNpZmllZCBIVE1MIDxjb2RlPmZpbGVzPC9jb2RlPiBpbnRvIE1hcmtkb3duIGZpbGVzIGJhc2VkIG9uIHRoZSA8Y29kZT5vcHRpb25zPC9jb2RlPiBwcm92aWRlZC5cbiAgICogVGhlIGdlbmVyYXRlZCBNYXJrZG93biBmaWxlIHdpbGwgaGF2ZSB0aGUgc2FtZSBuYW1lcyBhcyB0aGUgb3JpZ2luYWwgPGNvZGU+ZmlsZXM8L2NvZGU+IGV4Y2VwdCB0aGF0IHRoZSBmaWxlXG4gICAqIGV4dGVuc2lvbiB3aWxsIGJlIDxjb2RlPi5tZDwvY29kZT4uXG4gICAqXG4gICAqIElmIGEgcGF0aCBoYXMgYmVlbiBzcGVjaWZpZWQgdmlhIHRoZSA8Y29kZT5vdXRwdXQ8L2NvZGU+IGNvbW1hbmQtbGluZSBvcHRpb24sIHRoZW4gdGhlIGdlbmVyYXRlZCBNYXJrZG93biBmaWxlc1xuICAgKiB3aWxsIGFsbCBiZSB3cml0dGVuIHRvIHRoYXQgZGlyZWN0b3J5LiBPdGhlcndpc2UsIGVhY2ggZmlsZSB3aWxsIGJlIHdyaXR0ZW4gdG8gdGhlIHNhbWUgZGlyZWN0b3J5IGFzIHRoZSBvcmlnaW5hbFxuICAgKiBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlcyAtIHRoZSBIVE1MIGZpbGVzIGZvciB3aGljaCBNYXJrZG93biBmaWxlcyBhcmUgdG8gYmUgZ2VuZXJhdGVkXG4gICAqIEBwYXJhbSB7VHJhbnNmb3JtYXRpb25+T3B0aW9uc30gb3B0aW9ucyAtIHRoZSBvcHRpb25zIHRvIGJlIHVzZWRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWFkRmlsZXMoZmlsZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fcHJvZ3JhbS5vdXRwdXQgJiYgcGF0aC5ub3JtYWxpemUodGhpcy5fcHJvZ3JhbS5vdXRwdXQpXG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGNvbnN0IGh0bWwgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZSwgQ0xJLkVOQ09ESU5HKVxuICAgICAgY29uc3QgbWFya2Rvd24gPSB0aGlzLl9ldXJvcGEudHJhbnNmb3JtKGh0bWwsIG9wdGlvbnMpXG4gICAgICBjb25zdCB0YXJnZXREaXJlY3RvcnkgPSBvdXRwdXQgfHwgcGF0aC5kaXJuYW1lKGZpbGUpXG4gICAgICBjb25zdCB0YXJnZXRGaWxlID0gcGF0aC5qb2luKHRhcmdldERpcmVjdG9yeSwgYCR7cGF0aC5iYXNlbmFtZShmaWxlLCBwYXRoLmV4dG5hbWUoZmlsZSkpfS5tZGApXG5cbiAgICAgIG1rZGlycC5zeW5jKHRhcmdldERpcmVjdG9yeSlcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyh0YXJnZXRGaWxlLCBtYXJrZG93biwgQ0xJLkVOQ09ESU5HKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBIVE1MIHJlYWQgZnJvbSB0aGUgc3BlY2lmaWVkIGlucHV0IHN0cmVhbSBpbnRvIE1hcmtkb3duIGJhc2VkIG9uIHRoZSA8Y29kZT5vcHRpb25zPC9jb2RlPiBwcm92aWRlZC5cbiAgICpcbiAgICogSWYgYSBwYXRoIGhhcyBiZWVuIHNwZWNpZmllZCB2aWEgdGhlIDxjb2RlPm91dHB1dDwvY29kZT4gY29tbWFuZC1saW5lIG9wdGlvbiwgdGhlbiB0aGUgZ2VuZXJhdGVkIE1hcmtkb3duIHdpbGwgYmVcbiAgICogd3JpdHRlbiB0byB0aGF0IGZpbGUuIE90aGVyd2lzZSwgaXQgd2lsbCBiZSB3cml0dGVuIHRvIHRoZSBzcGVjaWZpZWQgb3V0cHV0IHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2Zvcm1hdGlvbn5PcHRpb25zfSBvcHRpb25zIC0gdGhlIG9wdGlvbnMgdG8gYmUgdXNlZFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlYWRJbnB1dChvcHRpb25zKSB7XG4gICAgY29uc3QgYnVmZmVyID0gW11cbiAgICBjb25zdCByZWFkZXIgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xuICAgICAgaW5wdXQ6IHRoaXMuX2lucHV0LFxuICAgICAgb3V0cHV0OiB0aGlzLl9vdXRwdXQsXG4gICAgICB0ZXJtaW5hbDogZmFsc2VcbiAgICB9KVxuXG4gICAgcmVhZGVyLm9uKCdsaW5lJywgKGxpbmUpID0+IHtcbiAgICAgIGJ1ZmZlci5wdXNoKGxpbmUpXG4gICAgfSlcbiAgICByZWFkZXIub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fcmVhZFN0cmluZyhidWZmZXIuam9pbignXFxuJyksIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBzcGVjaWZpZWQgPGNvZGU+aHRtbDwvY29kZT4gaW50byBNYXJrZG93biBiYXNlZCBvbiB0aGUgPGNvZGU+b3B0aW9uczwvY29kZT4gcHJvdmlkZWQuXG4gICAqXG4gICAqIElmIGEgcGF0aCBoYXMgYmVlbiBzcGVjaWZpZWQgdmlhIHRoZSA8Y29kZT5vdXRwdXQ8L2NvZGU+IGNvbW1hbmQtbGluZSBvcHRpb24sIHRoZW4gdGhlIGdlbmVyYXRlZCBNYXJrZG93biB3aWxsIGJlXG4gICAqIHdyaXR0ZW4gdG8gdGhhdCBmaWxlLiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgd3JpdHRlbiB0byB0aGUgc3BlY2lmaWVkIG91dHB1dCBzdHJlYW0uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIC0gdGhlIEhUTUwgdG8gYmUgdHJhbnNmb3JtZWQgaW50byBNYXJrZG93blxuICAgKiBAcGFyYW0ge1RyYW5zZm9ybWF0aW9ufk9wdGlvbnN9IG9wdGlvbnMgLSB0aGUgb3B0aW9ucyB0byBiZSB1c2VkXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVhZFN0cmluZyhodG1sLCBvcHRpb25zKSB7XG4gICAgY29uc3QgbWFya2Rvd24gPSB0aGlzLl9ldXJvcGEudHJhbnNmb3JtKGh0bWwsIG9wdGlvbnMpXG5cbiAgICBpZiAodGhpcy5fcHJvZ3JhbS5vdXRwdXQpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHBhdGgubm9ybWFsaXplKHRoaXMuX3Byb2dyYW0ub3V0cHV0KVxuICAgICAgY29uc3Qgb3V0cHV0ID0gcGF0aC5kaXJuYW1lKHRhcmdldClcblxuICAgICAgbWtkaXJwLnN5bmMob3V0cHV0KVxuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKHRhcmdldCwgbWFya2Rvd24sIENMSS5FTkNPRElORylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb3V0cHV0LmVuZChtYXJrZG93biwgQ0xJLkVOQ09ESU5HKVxuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCB7IENMSSB9XG4iXX0=
