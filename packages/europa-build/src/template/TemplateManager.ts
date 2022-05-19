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

import { LoggableOptions, createLogger } from 'europa-build/logger/Logger';
import { TemplateContext, TemplateProvider } from 'europa-build/template/provider/TemplateProvider';
import { TemplateProviderType } from 'europa-build/template/provider/TemplateProviderType';
import { ContribPluginTemplateProvider } from 'europa-build/template/provider/plugin/ContribPluginTemplateProvider';
import { OfficialPluginTemplateProvider } from 'europa-build/template/provider/plugin/OfficialPluginTemplateProvider';
import { ContribPresetTemplateProvider } from 'europa-build/template/provider/preset/ContribPresetTemplateProvider';
import { OfficialPresetTemplateProvider } from 'europa-build/template/provider/preset/OfficialPresetTemplateProvider';

const _logger = Symbol();
const _providers = Symbol();

/**
 * A basic manager for template providers that are mapped to their general names and types.
 */
export class TemplateManager {
  private readonly [_logger]: Logger;
  private readonly [_providers]: readonly TemplateProvider<any>[];

  /**
   * Creates an instance of {@link TemplateManager} using the `options` provided.
   *
   * @param [options] - The options to be used.
   */
  constructor(options: TemplateManagerOptions = {}) {
    const parentLogger = options.parentLogger ?? createLogger({ outputStream: options.outputStream });

    this[_logger] = parentLogger.child({ name: 'TemplateManager' });
    this[_providers] = [
      new ContribPluginTemplateProvider({ parentLogger }),
      new ContribPresetTemplateProvider({ parentLogger }),
      new OfficialPluginTemplateProvider({ parentLogger }),
      new OfficialPresetTemplateProvider({ parentLogger }),
    ];
  }

  /**
   * Returns the template provider with the specified `name` and `type`.
   *
   * @param name - The name of the template provider to be returned.
   * @param type - The {@link TemplateProviderType} of the template provider to be returned.
   * @return The template provider matching `name` and `type`.
   * @throws If no template provider could be found with `name` and `type`.
   */
  getProvider<C extends TemplateContext>(name: string, type: TemplateProviderType): TemplateProvider<C> {
    const provider = this[_providers].find((provider) => {
      return provider.getName() === name && provider.getType() === type;
    });
    if (!provider) {
      throw new Error(`Failed to find ${type} TemplateProvider: ${name}`);
    }

    return provider;
  }

  /**
   * Returns all template providers with the specified `type`.
   *
   * @param type - The {@link TemplateProviderType} of the template providers to be returned.
   * @return The template providers matching `type`.
   */
  getProvidersForType(type: TemplateProviderType): TemplateProvider<any>[] {
    return this[_providers].filter((provider) => provider.getType() === type);
  }
}

/**
 * The options used by {@link TemplateManager}.
 */
export type TemplateManagerOptions = LoggableOptions;
