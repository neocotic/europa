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
import { readFile, writeFile } from 'fs/promises';
import * as glob from 'glob';
import * as mkdirp from 'mkdirp';
import Europa from 'node-europa';
import { EOL } from 'os';
import { basename, dirname, extname, join, normalize } from 'path';
import { createInterface } from 'readline';
import { Readable, Writable } from 'stream';
import { promisify } from 'util';

import { PackageInfo } from 'europa-cli/PackageInfo';

const findFiles = promisify(glob);

const _command = Symbol();
const _cwd = Symbol();
const _inputStream = Symbol();
const _onError = Symbol();
const _outputStream = Symbol();

/**
 * A command-line interface for converting HTML into Markdown.
 */
export class Cli {
  private [_command]: CliCommand | undefined;
  private readonly [_cwd]: string;
  private readonly [_inputStream]: Readable;
  private readonly [_onError]: ((error: unknown) => void) | undefined;
  private readonly [_outputStream]: Writable;

  /**
   * Creates an instance of {@link Cli} using the `options` provided.
   *
   * @param [options] - The options to be used.
   */
  constructor(options: CliOptions = {}) {
    this[_cwd] = options.cwd ?? process.cwd();
    this[_inputStream] = options.inputStream ?? process.stdin;
    this[_onError] = options.onError;
    this[_outputStream] = options.outputStream ?? process.stdout;
  }

  /**
   * Parses the specified `args` and determines what is to be converted into Markdown and where the generated Markdown
   * is to be output.
   *
   * @param [args] - The command-line arguments to be parsed. Defaults to those passed to the Node.js process.
   */
  async parse(args: string[] = process.argv): Promise<void> {
    const command = await this.getCommand();
    command.parse(args);

    try {
      const europa = new Europa({
        absolute: command.getOptionValue('absolute'),
        baseUri: command.getOptionValue('baseUri') || undefined,
        inline: command.getOptionValue('inline'),
      });
      const html = command.getOptionValue('eval');

      if (html) {
        await this.readString(command, html, europa);
      } else if (command.args.length) {
        await Cli.readFiles(command, await this.resolveFiles(command.args), europa);
      } else {
        this.readInput(command, europa);
      }
    } catch (e) {
      this[_onError]?.(e);
    }
  }

  private async getCommand(): Promise<CliCommand> {
    const cachedCommand = this[_command];
    if (cachedCommand) {
      return cachedCommand;
    }

    const packageInfo = await PackageInfo.getSingleton();
    const command = program
      .version(packageInfo.json.version)
      .usage('[options] [file ...]')
      .option('-a, --absolute', 'use absolute URLs for elements (e.g. anchors, images)')
      .option('-b, --base-uri <uri>', 'base URI for elements (e.g. anchors, images)')
      .option('-e, --eval <html>', 'evaluate HTML string')
      .option('--eol <character>', 'end of line character')
      .option('-i, --inline', 'insert URLs for elements (e.g. anchors, images) inline')
      .option('-o, --output <path>', 'output directory (for files) or file (for eval/stdin)');

    this[_command] = command;

    return command;
  }

  private static async readFile(file: string, output: string | null, europa: Europa): Promise<void> {
    const html = await readFile(file, 'utf8');
    const markdown = europa.convert(html);
    const targetDirectory = output || dirname(file);
    const targetFile = join(targetDirectory, `${basename(file, extname(file))}.md`);

    await mkdirp(targetDirectory);

    await writeFile(targetFile, markdown, 'utf8');
  }

  private static async readFiles(command: CliCommand, files: string[], europa: Europa): Promise<void> {
    if (!files.length) {
      return;
    }

    const output = command.getOptionValue('output');
    const normalizedOutput = output ? normalize(output) : null;

    for (const file of files) {
      await Cli.readFile(file, normalizedOutput, europa);
    }
  }

  private readInput(command: CliCommand, europa: Europa) {
    const buffer: string[] = [];
    const inputStream = this[_inputStream];
    const outputStream = this[_outputStream];
    const reader = createInterface({
      input: inputStream,
      output: outputStream,
      terminal: false,
    });

    reader.on('line', (line) => buffer.push(line));
    reader.on('close', async () => {
      if (buffer.length) {
        await this.readString(command, buffer.join(EOL), europa);
      }
    });
  }

  private async readString(command: CliCommand, html: string, europa: Europa): Promise<void> {
    const markdown = europa.convert(html);
    const output = command.getOptionValue('output');

    if (output) {
      const target = normalize(output);
      const normalizedOutput = dirname(target);

      await mkdirp(normalizedOutput);

      await writeFile(target, markdown, 'utf8');
    } else {
      this[_outputStream].end(markdown, 'utf8');
    }
  }

  private async resolveFiles(patterns: string[]): Promise<string[]> {
    const files = new Set<string>();

    for (const pattern of patterns) {
      const results = await findFiles(pattern, {
        cwd: this[_cwd],
        nodir: true,
        nosort: true,
      });

      results.forEach((result) => files.add(result));
    }

    return [...files].sort();
  }
}

/**
 * The options used by {@link Cli}.
 */
export type CliOptions = {
  /**
   * The current working directory to be used to resolve relative file paths. Defaults to the current working directory.
   */
  readonly cwd?: string;
  /**
   * The `Readable` from which to read the HTML to be converted if no files or evaluation string is provided. Defaults
   * to the standard input stream.
   */
  readonly inputStream?: Readable;
  /**
   * A handler for any errors that occur while processing a command.
   */
  readonly onError?: (error: unknown) => void;
  /**
   * The `Writable` to which the generated Markdown is to be written if no files or output path is provided. Defaults to
   * the standard output stream.
   */
  readonly outputStream?: Writable;
};

interface CliCommand extends Command {
  readonly absolute?: boolean;
  readonly baseUri?: string;
  readonly eval?: string;
  readonly inline?: boolean;
  readonly output?: string;
}
