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

import { Logger } from 'winston';

import { MustacheTemplateGenerator } from 'europa-build/template/MustacheTemplateGenerator';
import { TemplateGenerator } from 'europa-build/template/TemplateGenerator';
import { TemplateCliOption, TemplateContext, TemplateProvider } from 'europa-build/template/provider/TemplateProvider';
import { TemplateProviderType } from 'europa-build/template/provider/TemplateProviderType';

const _parentLogger = Symbol();

/**
 * An abstract {@link TemplateProvider} that provides common logic that is useful for the majority of implementations.
 */
export abstract class CommonTemplateProvider<C extends O, O extends TemplateContext> implements TemplateProvider<C> {
  private readonly [_parentLogger]: Logger;

  /**
   * Creates an instance of {@link CommonTemplateProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: CommonTemplateProviderOptions) {
    this[_parentLogger] = options.parentLogger;
  }

  createCliOptions(): TemplateCliOption[] {
    const commonCliOptions = this.createCommonCliOptions();

    return this.extendCommonCliOptions(commonCliOptions);
  }

  /**
   * Creates common command-line options to be supported for the command-line interface of this
   * {@link CommonTemplateProvider}.
   *
   * These can be extended with provider-specific command-line options to build the complete set by overriding
   * {@link CommonTemplateProvider#extendCommonCliOptions}.
   *
   * @return Common command-line options.
   */
  abstract createCommonCliOptions(): TemplateCliOption[];

  /**
   * Creates a common context to be passed to the template during rendering based on the `options` provided.
   *
   * These can be extended with a provider-specific context to build the complete context by overriding
   * {@link CommonTemplateProvider#extendCommonContext}.
   *
   * @param options - The options to be used.
   * @return A common template context.
   */
  abstract createCommonContext(options: Partial<C>): Promise<O>;

  async createContext(options: Partial<C>): Promise<C> {
    const commonContext = await this.createCommonContext(options);

    return this.extendCommonContext(commonContext, options);
  }

  createGenerator(): TemplateGenerator<C> {
    return new MustacheTemplateGenerator({
      parentLogger: this[_parentLogger],
      provider: this,
    });
  }

  /**
   * Extends the specified common command-line options with provider-specific command-line options.
   *
   * By default, this method returns a copy of `commonCliOptions`.
   *
   * @param commonCliOptions - The common command-line options to be extended.
   * @return The extended command-line options.
   */
  protected extendCommonCliOptions(commonCliOptions: TemplateCliOption[]): TemplateCliOption[] {
    return commonCliOptions.slice();
  }

  /**
   * Extends the specified common context with a provider-specific context.
   *
   * By default, this method returns a copy of `commonContext`.
   *
   * @param commonContext - The common context to be extended.
   * @param options - The options to be used.
   * @return The extended context.
   */
  protected extendCommonContext(commonContext: O, options: Partial<C>): C {
    return { ...commonContext } as C;
  }

  /**
   * Returns the package's author name.
   *
   * @param options - The options to be used.
   * @return The package's author name.
   */
  protected abstract getAuthorName(options: Partial<C>): string;

  /**
   * Returns the default package's version.
   *
   * @return The default package's version.
   */
  protected abstract getDefaultVersion(): Promise<string>;

  getDirectories(): string[] {
    return ['.common', this.getName()];
  }

  abstract getName(): string;

  /**
   * Returns the value of the named option.
   *
   * @param options - The options to be used.
   * @param name - The name of the option whose value is to be returned.
   * @return The value of the named option.
   * @throws If the named option does not exist.
   */
  protected getRequiredContextOption<N extends keyof OP, OP extends Partial<C>>(
    options: OP,
    name: N,
  ): Exclude<OP[N], undefined> {
    const value = options[name];
    if (typeof value === 'undefined') {
      throw new Error(`Missing required option: ${String(name)}`);
    }

    return value as any;
  }

  abstract getType(): TemplateProviderType;
}

/**
 * The options used by {@link CommonTemplateProvider}.
 */
export type CommonTemplateProviderOptions = {
  /**
   * The parent logger to be used to create any children loggers.
   */
  readonly parentLogger: Logger;
};
