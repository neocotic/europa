/*
 * Copyright (C) 2022 neocotic
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

import { Command, program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';
import { basename, dirname, extname, join, normalize } from 'path';
import { createInterface } from 'readline';
import { Readable, Writable } from 'stream';

import Europa from 'node-europa/index';

import { version } from '../package.json';

const _command = Symbol('command');
const _input = Symbol('input');
const _output = Symbol('output');

/**
 * A command-line interface for converting HTML into Markdown.
 */
export class Cli {
  /**
   * The character set encoding to be used to read/write files.
   */
  static readonly encoding = 'utf8';

  private readonly [_command]: CliCommand;
  private readonly [_input]: Readable;
  private readonly [_output]: Writable;

  /**
   * Creates a new instance of {@link Cli}.
   *
   * @param input - The `Readable` from which to read the HTML to be converted if no files or evaluation string is
   * provided.
   * @param output - The `Writable` to which the generated Markdown is to be written if no files or output path is
   * provided.
   */
  constructor(input: Readable, output: Writable) {
    this[_input] = input;
    this[_output] = output;
    this[_command] = program
      .version(version)
      .usage('[options] [file ...]')
      .option('-a, --absolute', 'use absolute URLs for anchors/images')
      .option('-b, --base-uri <uri>', 'base URI for anchors/images')
      .option('-e, --eval <html>', 'evaluate HTML string')
      .option('-i, --inline', 'insert anchor/image URLs inline')
      .option('-o, --output <path>', 'output directory (for files) or file (for eval/stdin)');
  }

  /**
   * Parses the specified `args` and determines what is to be converted into Markdown and where the generated Markdown
   * is to be output.
   *
   * @param [args=[]] - The command-line arguments to be parsed.
   */
  parse(args: string[] = []) {
    if (args == null) {
      args = [];
    }

    this[_command].parse(args);

    const europa = new Europa({
      absolute: this[_command].absolute,
      baseUri: this[_command].baseUri || undefined,
      inline: this[_command].inline,
    });
    const html = this[_command].eval;

    if (html) {
      this.readString(html, europa);
    } else if (this[_command].args.length) {
      this.readFiles(Cli.resolveFiles(this[_command].args), europa);
    } else {
      this.readInput(europa);
    }
  }

  private static readFile(file: string, output: string | null, europa: Europa) {
    const html = readFileSync(file, Cli.encoding);
    const markdown = europa.convert(html);
    const targetDirectory = output || dirname(file);
    const targetFile = join(targetDirectory, `${basename(file, extname(file))}.md`);

    mkdirpSync(targetDirectory);

    writeFileSync(targetFile, markdown, Cli.encoding);
  }

  private readFiles(files: string[], europa: Europa) {
    if (!files.length) {
      return;
    }

    const { output } = this[_command];
    const normalizedOutput = output ? normalize(output) : null;

    files.forEach((file) => Cli.readFile(file, normalizedOutput, europa));
  }

  private readInput(europa: Europa) {
    const buffer: string[] = [];
    const reader = createInterface({
      input: this[_input],
      output: this[_output],
      terminal: false,
    });

    reader.on('line', (line) => buffer.push(line));
    reader.on('close', () => {
      if (buffer.length) {
        this.readString(buffer.join('\n'), europa);
      }
    });
  }

  private readString(html: string, europa: Europa) {
    const markdown = europa.convert(html);
    const { output } = this[_command];

    if (output) {
      const target = normalize(output);
      const normalizedOutput = dirname(target);

      mkdirpSync(normalizedOutput);

      writeFileSync(target, markdown, Cli.encoding);
    } else {
      this[_output].end(markdown, Cli.encoding);
    }
  }

  private static resolveFiles(patterns: string[]): string[] {
    const files = new Set<string>();

    patterns.forEach((pattern) => {
      const results = globSync(pattern, {
        nodir: true,
        nosort: true,
      });

      results.forEach((result) => files.add(result));
    });

    return [...files].sort();
  }
}

interface CliCommand extends Command {
  readonly absolute?: boolean;
  readonly baseUri?: string;
  readonly eval?: string;
  readonly inline?: boolean;
  readonly output?: string;
}
