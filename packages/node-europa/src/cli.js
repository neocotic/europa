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

import fs from 'fs'
import glob from 'glob'
import mkdirp from 'mkdirp'
import path from 'path'
import program from 'commander'
import readline from 'readline'

import { version } from '../package.json'

/**
 * A command-line interface for transforming HTML into Markdown.
 *
 * @public
 */
class CLI {

  /**
   * The character set encoding to be used to read/write files.
   *
   * @return {string} The charset encoding.
   * @public
   * @static
   */
  static get ENCODING() {
    return 'utf8'
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
  constructor(europa, input, output) {
    /**
     * The {@link Europa} instance for this {@link CLI}.
     *
     * @private
     * @type {Europa}
     */
    this._europa = europa

    /**
     * The input stream for this {@link CLI}.
     *
     * This is used to read the HTML to be transformed if no files or evaluation string is provided.
     *
     * @private
     * @type {Readable}
     */
    this._input = input

    /**
     * The output stream for this {@link CLI}.
     *
     * This is used to write the generated Markdown if no files or output path is provided.
     *
     * @private
     * @type {Writable}
     */
    this._output = output

    /**
     * The command for this {@link CLI}.
     *
     * @private
     * @type {Command}
     */
    this._program = program
      .version(version)
      .usage('europa [options] [file ...]')
      .option('-a, --absolute', 'use absolute URLs for anchors/images')
      .option('-b, --base-uri <uri>', 'base URI for anchors/images')
      .option('-e, --eval <html>', 'evaluate HTML string')
      .option('-i, --inline', 'insert anchor/image URLs inline')
      .option('-o, --output <path>', 'output directory (for files) or file (for eval/stdin)')
  }

  /**
   * Parses the specified <code>args</code> and determines what is to be transformed into Markdown and where the
   * generated Markdown is to be output.
   *
   * @param {string[]} args - the command-line arguments to be parsed
   * @return {void}
   * @public
   */
  parse(args = []) {
    this._program.parse(args)

    const options = this._createTransformationOptions()

    if (this._program.eval) {
      this._readString(this._program.eval, options)
    } else if (this._program.args.length) {
      const files = glob.sync(this._program.args, {
        nodir: true,
        nosort: true
      })

      this._readFiles(files, options)
    } else {
      this._readInput(options)
    }
  }

  /**
   * Creates the options to be used for the transformation process based on the parsed command-line arguments.
   *
   * @return {Transformation~Options} The derived options.
   * @private
   */
  _createTransformationOptions() {
    const { absolute, baseUri, inline } = this._program
    const options = { absolute, inline }

    if (baseUri) {
      options.baseUri = baseUri
    }

    return options
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
  _readFiles(files, options) {
    if (!files.length) {
      return
    }

    const output = this._program.output && path.normalize(this._program.output)

    for (const file of files) {
      const html = fs.readFileSync(file, CLI.ENCODING)
      const markdown = this._europa.transform(html, options)
      const targetDirectory = output || path.dirname(file)
      const targetFile = path.join(targetDirectory, `${path.basename(file, path.extname(file))}.md`)

      mkdirp.sync(targetDirectory)

      fs.writeFileSync(targetFile, markdown, CLI.ENCODING)
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
  _readInput(options) {
    const buffer = []
    const reader = readline.createInterface({
      input: this._input,
      output: this._output,
      terminal: false
    })

    reader.on('line', (line) => {
      buffer.push(line)
    })
    reader.on('close', () => {
      if (buffer.length) {
        this._readString(buffer.join('\n'), options)
      }
    })
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
  _readString(html, options) {
    const markdown = this._europa.transform(html, options)

    if (this._program.output) {
      const target = path.normalize(this._program.output)
      const output = path.dirname(target)

      mkdirp.sync(output)

      fs.writeFileSync(target, markdown, CLI.ENCODING)
    } else {
      this._output.end(markdown, CLI.ENCODING)
    }
  }

}

export default CLI
