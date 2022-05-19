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

import { Dirent, Stats } from 'fs';
import { readFile, readdir, stat, writeFile } from 'fs/promises';
import * as mkdirp from 'mkdirp';
import * as Mustache from 'mustache';
import { EOL } from 'os';
import { basename, dirname, extname, join, resolve } from 'path';
import { Logger } from 'winston';

import { PackageInfo } from 'europa-build/PackageInfo';
import { TemplateGenerator } from 'europa-build/template/TemplateGenerator';
import { TemplateContext, TemplateProvider } from 'europa-build/template/provider/TemplateProvider';

const _logger = Symbol();
const _partials = Symbol();
const _provider = Symbol();

/**
 * A {@link TemplateGenerator} implementation that uses Mustache to render templates.
 */
export class MustacheTemplateGenerator<C extends TemplateContext> implements TemplateGenerator<C> {
  private readonly [_logger]: Logger;
  private [_partials]: Readonly<Record<string, string>> | undefined;
  private readonly [_provider]: TemplateProvider<C>;

  /**
   * Creates an instance of {@link MustacheTemplateGenerator} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: MustacheTemplateGeneratorOptions<C>) {
    this[_logger] = options.parentLogger.child({ name: 'MustacheTemplateGenerator' });
    this[_provider] = options.provider;
  }

  async generate(context: C, directory: string): Promise<void> {
    const targetDirectory = join(directory, context.name);

    this[_logger].info(
      `Generating ${this[_provider].getType()} package '${context.name}' in directory: ${targetDirectory}`,
    );

    await MustacheTemplateGenerator.verifyDirectoryEmptyOrNotExists(targetDirectory);

    await mkdirp(targetDirectory);

    for (const templateDirectory of this[_provider].getDirectories()) {
      await this.generateDirectory(context, targetDirectory, templateDirectory);
    }

    this[_logger].info(`Generated ${this[_provider].getType()} package: ${targetDirectory}@${context.version}`);
  }

  private static formatOutput(output: string, fileExtension: string): string {
    if (fileExtension === '.json') {
      return JSON.stringify(JSON.parse(output), undefined, '  ') + EOL;
    }

    return output;
  }

  private async generateDirectory(context: C, targetDirectory: string, directory: string): Promise<void> {
    const templatePath = await this.getTemplatePath(directory);
    const entries = await readdir(templatePath, { withFileTypes: true });

    for (const entry of entries) {
      await this.generateEntry(context, targetDirectory, directory, '', entry);
    }
  }

  private async generateEntry(
    context: C,
    targetDirectory: string,
    directory: string,
    subDirectoryPath: string,
    entry: Dirent,
  ): Promise<void> {
    const templatePath = await this.getTemplatePath(directory, subDirectoryPath, entry.name);

    if (entry.isDirectory()) {
      const targetPath = MustacheTemplateGenerator.getTargetPath(targetDirectory, subDirectoryPath, entry.name);

      this[_logger].info(`Generating ${this[_provider].getType()} package sub-directory: ${targetPath}`);

      await mkdirp(targetPath);

      const subEntries = await readdir(templatePath, { withFileTypes: true });

      for (const subEntry of subEntries) {
        await this.generateEntry(context, targetDirectory, directory, join(subDirectoryPath, entry.name), subEntry);
      }
    } else if (entry.isFile()) {
      const targetPath = MustacheTemplateGenerator.getTargetPathExcludingExtension(
        targetDirectory,
        subDirectoryPath,
        entry.name,
      );

      this[_logger].info(`Generating ${this[_provider].getType()} package template file: ${targetPath}`);

      const template = await readFile(templatePath, 'utf8');
      // eslint-disable-next-line import/namespace
      const templateOutput = Mustache.render(template, context, await this.getPartials());
      const output = MustacheTemplateGenerator.formatOutput(templateOutput, extname(targetPath));

      await writeFile(targetPath, output, 'utf8');
    } else {
      throw new Error(`Unexpected template entry: ${templatePath}`);
    }
  }

  private async getPartials(): Promise<Readonly<Record<string, string>>> {
    const cachedPartials = this[_partials];
    if (cachedPartials) {
      return cachedPartials;
    }

    const partialDirectoryPath = await this.getTemplatePath('.partial');

    this[_logger].debug(
      `Loading ${this[_provider].getType()} package template partials from directory: ${partialDirectoryPath}`,
    );

    const partials: Record<string, string> = {};
    const entries = await readdir(partialDirectoryPath, { withFileTypes: true });

    for (const entry of entries) {
      const partialName = basename(entry.name, extname(entry.name));
      const partialPath = join(partialDirectoryPath, entry.name);
      if (!entry.isFile()) {
        throw new Error(`Unexpected partial entry: ${partialPath}`);
      }

      partials[partialName] = await readFile(partialPath, 'utf8');
    }

    this[_partials] = partials;

    return partials;
  }

  private async getTemplatePath(directory: string, ...paths: string[]): Promise<string> {
    const packageInfo = await PackageInfo.getSingleton();
    const providerType = this[_provider].getType();

    return resolve(packageInfo.directoryPath, 'templates', providerType, directory, ...paths);
  }

  private static getTargetPath(targetDirectory: string, ...paths: string[]): string {
    return resolve(targetDirectory, ...paths);
  }

  private static getTargetPathExcludingExtension(targetDirectory: string, ...paths: string[]): string {
    const targetPath = MustacheTemplateGenerator.getTargetPath(targetDirectory, ...paths);
    const targetDirectoryPath = dirname(targetPath);
    const targetFileName = basename(targetPath, extname(targetPath));

    return join(targetDirectoryPath, targetFileName);
  }

  private static async verifyDirectoryEmptyOrNotExists(directoryPath: string): Promise<void> {
    let stats: Stats;

    try {
      stats = await stat(directoryPath);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        return;
      }
      throw e;
    }

    if (!stats.isDirectory()) {
      throw new Error(`Invalid directory: ${directoryPath}`);
    }
  }
}

/**
 * The options used by {@link MustacheTemplateGenerator}.
 */
export type MustacheTemplateGeneratorOptions<C extends TemplateContext> = {
  /**
   * The parent logger to be used to create any children loggers.
   */
  readonly parentLogger: Logger;
  /**
   * The template provider to be used.
   */
  readonly provider: TemplateProvider<C>;
};
