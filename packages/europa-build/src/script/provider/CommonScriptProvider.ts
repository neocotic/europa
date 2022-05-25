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

import * as del from 'del';
import { copyFile } from 'fs/promises';
import { resolve } from 'path';
import { Logger } from 'winston';

import { PackageInfo } from 'europa-build/PackageInfo';
import { ScriptProvider } from 'europa-build/script/provider/ScriptProvider';

const _logger = Symbol();

/**
 * An abstract {@link ScriptProvider} that provides common logic across the majority of implementations.
 */
export abstract class CommonScriptProvider implements ScriptProvider {
  private readonly [_logger]: Logger;

  /**
   * Creates an instance of {@link CommonScriptProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: CommonScriptProviderOptions) {
    this[_logger] = options.parentLogger.child({ name: this.getLoggerName() });
  }

  async afterScript(directoryPath: string): Promise<void> {
    // Do nothing by default
  }

  /**
   * Copies the specified bundled config file to the directory provided.
   *
   * @param directoryPath - The path of the directory to which the bundled config file is to be copied.
   * @param fileName - The name of the bundled config file to be copied.
   * @throws If an error occurs while attempting to copy the bundled config file.
   */
  protected async copyBundledConfigFile(directoryPath: string, fileName: string): Promise<void> {
    const sourceFilePath = await this.getBundledConfigFilePath(fileName);
    const targetFilePath = resolve(directoryPath, fileName);

    this.getLogger().debug(`Copying '${sourceFilePath}' file to '${targetFilePath}'`);

    await copyFile(sourceFilePath, targetFilePath);
  }

  /**
   * Copies the specified bundled config files to the directory provided.
   *
   * @param directoryPath - The path of the directory to which the bundled config files are to be copied.
   * @param fileNames - The names of the bundled config files to be copied.
   * @throws If an error occurs while attempting to copy any bundled config file.
   */
  protected async copyBundledConfigFiles(directoryPath: string, fileNames: string[]): Promise<void> {
    for (const fileName of fileNames) {
      await this.copyBundledConfigFile(directoryPath, fileName);
    }
  }

  /**
   * Deletes the subdirectories at the specified path within the directory provided.
   *
   * @param directoryPath - The path of the directory to which `subdirectoryPaths` are resolved.
   * @param subdirectoryPaths - The paths of the subdirectories to be deleted relative to `directoryPath`
   * @throws If an error occurs while attempting to delete any subdirectory.
   */
  protected async deleteDirectories(directoryPath: string, subdirectoryPaths: string[]): Promise<void> {
    const targetDirectoryPaths = subdirectoryPaths.map((subdirectoryPath) => resolve(directoryPath, subdirectoryPath));

    this.getLogger().debug(`Deleting directories: [${targetDirectoryPaths}]`);

    await del(targetDirectoryPaths);
  }

  /**
   * Deletes the subdirectory at the specified path within the directory provided.
   *
   * @param directoryPath - The path of the directory to which `subdirectoryPath` is resolved.
   * @param subdirectoryPath - The path of the subdirectory to be deleted relative to `directoryPath`
   * @throws If an error occurs while attempting to delete the subdirectory.
   */
  protected async deleteDirectory(directoryPath: string, subdirectoryPath: string): Promise<void> {
    const targetDirectoryPath = resolve(directoryPath, subdirectoryPath);

    this.getLogger().debug(`Deleting directory: '${targetDirectoryPath}'`);

    await del(targetDirectoryPath);
  }

  /**
   * Deletes the file at the specified path within the directory provided.
   *
   * @param directoryPath - The path of the directory to which `filePath` is resolved.
   * @param filePath - The path of the file to be deleted relative to `directoryPath`
   * @throws If an error occurs while attempting to delete the file.
   */
  protected async deleteFile(directoryPath: string, filePath: string): Promise<void> {
    const targetFilePath = resolve(directoryPath, filePath);

    this.getLogger().debug(`Deleting file: '${targetFilePath}'`);

    await del(targetFilePath);
  }

  /**
   * Deletes the files at the specified paths within the directory provided.
   *
   * @param directoryPath - The path of the directory to which `filePaths` are resolved.
   * @param filePaths - The paths of the files to be deleted relative to `directoryPath`
   * @throws If an error occurs while attempting to delete any file.
   */
  protected async deleteFiles(directoryPath: string, filePaths: string[]): Promise<void> {
    const targetFilePaths = filePaths.map((filePath) => resolve(directoryPath, filePath));

    this.getLogger().debug(`Deleting files: [${targetFilePaths}]`);

    await del(targetFilePaths);
  }

  /**
   * Returns the absolute path of the bundled config file with the specified name.
   *
   * @param fileName - The name of the bundled config file to be resolved.
   * @return The absolute path of the bundled config file.
   */
  protected getBundledConfigFilePath(fileName: string): Promise<string> {
    return this.getBundledPath('bundled-config', fileName);
  }

  /**
   * Returns the absolute path of the bundled file/directory at the specified paths.
   *
   * @param filePaths - The paths of the bundled file/directory to be resolved.
   * @return The absolute path of the bundled file/directory.
   */
  protected async getBundledPath(...filePaths: string[]): Promise<string> {
    const packageInfo = await PackageInfo.getSingleton();

    return resolve(packageInfo.directoryPath, ...filePaths);
  }

  /**
   * Returns the logger for this {@link CommonScriptProvider}.
   *
   * @return The logger.
   */
  protected getLogger(): Logger {
    return this[_logger];
  }

  /**
   * Returns the name of the logger to be created for this {@link CommonScriptProvider}.
   *
   * @return The logger name.
   */
  protected abstract getLoggerName(): string;

  abstract getName(): string;

  abstract runScript(directoryPath: string): Promise<void>;
}

/**
 * The options used by {@link CommonScriptProvider}.
 */
export type CommonScriptProviderOptions = {
  /**
   * The parent logger to be used to create any children loggers.
   */
  readonly parentLogger: Logger;
};
