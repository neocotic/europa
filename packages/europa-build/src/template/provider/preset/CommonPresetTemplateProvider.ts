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

import { PackageInfo } from 'europa-build/PackageInfo';
import {
  CommonTemplateProvider,
  CommonTemplateProviderOptions,
} from 'europa-build/template/provider/CommonTemplateProvider';
import { TemplateCliOption, TemplateContext } from 'europa-build/template/provider/TemplateProvider';
import { TemplateProviderType } from 'europa-build/template/provider/TemplateProviderType';

/**
 * An abstract {@link TemplateProvider} that is intended for preset package template providers.
 */
export abstract class CommonPresetTemplateProvider<
  C extends CommonPresetTemplateContext,
> extends CommonTemplateProvider<C, CommonPresetTemplateContext> {
  /**
   * Creates an instance of {@link CommonPresetTemplateProvider} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: CommonPresetTemplateProviderOptions) {
    super(options);
  }

  override createCommonCliOptions(): TemplateCliOption[] {
    return [
      {
        arg: '<desc>',
        description: 'description of the package',
        longName: 'description',
      },
      {
        arg: '<keywords...>',
        description: 'keywords of the package',
        longName: 'keywords',
      },
      {
        arg: '<name>',
        description: 'name of the package',
        longName: 'name',
      },
      {
        arg: '<version>',
        description: 'version of the package',
        longName: 'version',
      },
    ];
  }

  override async createCommonContext(options: Partial<C>): Promise<CommonPresetTemplateContext> {
    const packageInfo = await PackageInfo.getSingleton();
    let name: string = this.getRequiredContextOption(options, 'name');
    if (!name.startsWith('europa-preset-')) {
      name = `europa-preset-${name}`;
    }

    return {
      authorName: this.getAuthorName(options),
      copyrightYear: options.copyrightYear ?? new Date().getFullYear(),
      description: options.description ?? 'TODO: Description',
      europaVersion: options.europaVersion ?? packageInfo.json.version,
      isDefault: name === 'europa-preset-default',
      keywords: options.keywords ?? [],
      name,
      version: options.version ?? (await this.getDefaultVersion()),
    };
  }

  override getType(): TemplateProviderType {
    return TemplateProviderType.Preset;
  }
}

/**
 * The context passed to a preset package template during rendering.
 */
export interface CommonPresetTemplateContext extends TemplateContext {
  /**
   * Whether the package is for the default preset.
   */
  readonly isDefault: boolean;
}

/**
 * The options used by {@link CommonPresetTemplateProvider}.
 */
export type CommonPresetTemplateProviderOptions = CommonTemplateProviderOptions;
