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

import { TemplateCliOption } from 'europa-build/template/provider/TemplateProvider';
import {
  CommonPluginTemplateContext,
  CommonPluginTemplateProvider,
  CommonPluginTemplateProviderOptions,
} from 'europa-build/template/provider/plugin/CommonPluginTemplateProvider';

/**
 * A {@link TemplateProvider} for contribution plugin package templates.
 */
export class ContribPluginTemplateProvider extends CommonPluginTemplateProvider<ContribPluginTemplateContext> {
  /**
   * Creates an instance of {@link ContribPluginTemplateProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: CommonPluginTemplateProviderOptions) {
    super(options);
  }

  protected override extendCommonCliOptions(commonCliOptions: TemplateCliOption[]): TemplateCliOption[] {
    return [
      ...commonCliOptions,
      {
        arg: '<email>',
        description: 'email of the package author',
        longName: 'author-email',
      },
      {
        arg: '<name>',
        description: 'name of the package author',
        longName: 'author-name',
      },
      {
        arg: '<url>',
        description: 'URL of the package author homepage',
        longName: 'author-url',
      },
      {
        arg: '<url>',
        description: 'URL of the package issue tracker',
        longName: 'bugs-url',
      },
      {
        arg: '<url>',
        description: 'URL of the package homepage',
        longName: 'homepage-url',
      },
      {
        arg: '<url>',
        description: 'URL of the package git repository',
        longName: 'repository-url',
      },
    ];
  }

  protected override extendCommonContext(
    commonContext: CommonPluginTemplateContext,
    options: Partial<ContribPluginTemplateContext>,
  ): ContribPluginTemplateContext {
    return {
      ...commonContext,
      authorEmail: options.authorEmail,
      authorUrl: options.authorUrl,
      bugsUrl: options.bugsUrl,
      homepageUrl: options.homepageUrl,
      repositoryUrl: this.getRequiredContextOption(options, 'repositoryUrl'),
    };
  }

  protected override getAuthorName(options: Partial<ContribPluginTemplateContext>): string {
    return this.getRequiredContextOption(options, 'authorName');
  }

  protected override async getDefaultVersion(): Promise<string> {
    return '1.0.0';
  }

  override getName(): string {
    return 'contrib';
  }
}

/**
 * The context passed to contribution plugin package template during rendering.
 */
export interface ContribPluginTemplateContext extends CommonPluginTemplateContext {
  /**
   * The email of the package's author, where applicable.
   */
  readonly authorEmail?: string;
  /**
   * The homepage URL of the package's author, where applicable.
   */
  readonly authorUrl?: string;
  /**
   * The URL of the package's issue tracker, where applicable.
   */
  readonly bugsUrl?: string;
  /**
   * The homepage URL of the package, where applicable.
   */
  readonly homepageUrl?: string;
  /**
   * The URL of the package's git repository.
   */
  readonly repositoryUrl: string;
}
