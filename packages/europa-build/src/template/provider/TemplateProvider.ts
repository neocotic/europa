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

import { TemplateGenerator } from 'europa-build/template/TemplateGenerator';
import { TemplateProviderType } from 'europa-build/template/provider/TemplateProviderType';

/**
 * Provides the logic to interact with and render a named template.
 */
export interface TemplateProvider<C extends TemplateContext> {
  /**
   * Creates a command-line options to be supported for the command-line interface of this {@link TemplateProvider}.
   *
   * @return Command-line options.
   */
  createCliOptions(): TemplateCliOption[];

  /**
   * Creates a context to be passed to the template during rendering based on the `options` provided.
   *
   * @param options - The options to be used.
   * @return A template context.
   */
  createContext(options: Partial<C>): Promise<C>;

  /**
   * Creates a template generator for this {@link TemplateProvider}.
   *
   * @return A template generator.
   */
  createGenerator(): TemplateGenerator<C>;

  /**
   * The paths of the directories relative to the bundled `templates` directory that contain the template files to be
   * applied.
   *
   * @return The template directories to be applied.
   */
  getDirectories(): string[];

  /**
   * Returns the general name of this {@link TemplateProvider}.
   *
   * @return The general template name.
   */
  getName(): string;

  /**
   * Returns the general type of this {@link TemplateProvider}.
   *
   * @return The general template type.
   */
  getType(): TemplateProviderType;
}

/**
 * A command-line option to be supported for the command-line interface of a {@link TemplateProvider}.
 */
export interface TemplateCliOption {
  /**
   * The name of the option's argument, where applicable.
   */
  readonly arg?: string;
  /**
   * The default value of the option, where applicable.
   */
  readonly defaultValue?: any;
  /**
   * The description of the option's default value, where applicable.
   */
  readonly defaultValueDescription?: string;
  /**
   * The description of the option.
   */
  readonly description: string;
  /**
   * The long name of the option.
   */
  readonly longName: string;
  /**
   * The short name of the option, where applicable.
   */
  readonly shortName?: string;
}

/**
 * The context passed to a template during rendering.
 */
export interface TemplateContext {
  /**
   * The name of the package's author.
   */
  readonly authorName: string;
  /**
   * The copyright year.
   */
  readonly copyrightYear: number;
  /**
   * The description of the package.
   */
  readonly description: string;
  /**
   * The version of Europa.
   */
  readonly europaVersion: string;
  /**
   * The keywords for the package.
   */
  readonly keywords: readonly string[];
  /**
   * The name of the package.
   */
  readonly name: string;
  /**
   * The version of the package.
   */
  readonly version: string;
}
