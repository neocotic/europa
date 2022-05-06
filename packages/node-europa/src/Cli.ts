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
import { basename, dirname, extname, join, normalize } from 'path';
import { createInterface } from 'readline';
import { Readable, Writable } from 'stream';
import { promisify } from 'util';

import { PackageInfo } from 'node-europa/PackageInfo';
import Europa from 'node-europa/index';

const findFiles = promisify(glob);

const _command = Symbol('command');
const _input = Symbol('input');
const _output = Symbol('output');

/**
 * A command-line interface for converting HTML into Markdown.
 */
export class Cli {
  private [_command]: CliCommand | undefined;
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
  }

  /**
   * Parses the specified `args` and determines what is to be converted into Markdown and where the generated Markdown
   * is to be output.
   *
   * @param [args=[]] - The command-line arguments to be parsed.
   */
  async parse(args: string[] = []): Promise<void> {
    const command = await this.getCommand();
    command.parse(args);

    const europa = new Europa({
      absolute: command.getOptionValue('absolute'),
      baseUri: command.getOptionValue('baseUri') || undefined,
      inline: command.getOptionValue('inline'),
    });
    const html = command.getOptionValue('eval');

    if (html) {
      await this.readString(command, html, europa);
    } else if (command.args.length) {
      await this.readFiles(command, await Cli.resolveFiles(command.args), europa);
    } else {
      this.readInput(command, europa);
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
      .option('-a, --absolute', 'use absolute URLs for anchors/images')
      .option('-b, --base-uri <uri>', 'base URI for anchors/images')
      .option('-e, --eval <html>', 'evaluate HTML string')
      .option('-i, --inline', 'insert anchor/image URLs inline')
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

  private async readFiles(command: CliCommand, files: string[], europa: Europa): Promise<void> {
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
    const reader = createInterface({
      input: this[_input],
      output: this[_output],
      terminal: false,
    });

    reader.on('line', (line) => buffer.push(line));
    reader.on('close', async () => {
      if (buffer.length) {
        await this.readString(command, buffer.join('\n'), europa);
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
      this[_output].end(markdown, 'utf8');
    }
  }

  private static async resolveFiles(patterns: string[]): Promise<string[]> {
    const files = new Set<string>();

    for (const pattern of patterns) {
      const results = await findFiles(pattern, {
        nodir: true,
        nosort: true,
      });

      results.forEach((result) => files.add(result));
    }

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
