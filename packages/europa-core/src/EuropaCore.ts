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

import { Conversion } from 'europa-core/Conversion';
import { EuropaOptions } from 'europa-core/EuropaOptions';
import { EuropaOptionsParser } from 'europa-core/EuropaOptionsParser';
import { Environment } from 'europa-core/environment/Environment';
import { PluginProvider } from 'europa-core/plugin/Plugin';
import { PluginManager } from 'europa-core/plugin/PluginManager';
import { PresetProvider } from 'europa-core/plugin/Preset';

const _environment = Symbol();
const _options = Symbol();
const _pluginManager = Symbol();

/**
 * A transformer capable of converting HTML into Markdown that supports HTML strings and DOM elements and nodes.
 */
export abstract class EuropaCore<N, E extends N> {
  private static readonly [_pluginManager] = new PluginManager();

  private readonly [_environment]: Environment<N, E>;
  private readonly [_options]: Required<EuropaOptions>;

  /**
   * Creates an instance of {@link EuropaCore} using the `options` provided.
   *
   * @param [options] - The options to be used.
   */
  protected constructor(options: EuropaCoreOptions<N, E>) {
    const { environment, options: implementationOptions } = options;

    this[_environment] = environment;
    this[_options] = new EuropaOptionsParser({ environment }).parse(implementationOptions);
  }

  /**
   * Converts the specified `input` into Markdown based on the options configured for this {@link EuropaCore} instance.
   *
   * `input` can either be an HTML string or DOM node(s) to be converted into Markdown.
   *
   * @param input - The HTML string or DOM node(s) to be converted into Markdown.
   * @return The Markdown converted from `input`.
   */
  convert(input: N | N[] | string | null | undefined): string {
    if (!input) {
      return '';
    }

    const root = this[_environment].getDom().createRoot(input);
    const pluginManager = EuropaCore[_pluginManager];
    const conversion = new Conversion({
      element: root.body(),
      environment: this[_environment],
      options: this[_options],
      pluginManager,
    });

    pluginManager.invokeHook('startConversion', conversion);

    conversion.convertNode(root.body());

    pluginManager.invokeHook('endConversion', conversion);

    return conversion.end();
  }

  /**
   * Invokes the specified plugin `provider` and registers the resulting plugin.
   *
   * If the plugin contains any converters, they will be associated with their corresponding tag names, overriding any
   * previously converters associated with those tag names.
   *
   * If an error occurs when invoking `provider`, the plugin will not be registered.
   *
   * @param provider - The provider for the plugin to be registered.
   * @throws If a problem occurs while invoking `provider`.
   */
  static registerPlugin(provider: PluginProvider) {
    EuropaCore[_pluginManager].addPlugin(provider);
  }

  /**
   * Invokes the specified plugin `provider` and registers the resulting preset.
   *
   * This method is effectively just a shortcut for calling {@link EuropaCore.registerPlugin} for multiple plugin
   * providers, however, the main benefit is that it supports the concept of presets, which are a useful mechanism for
   * bundling and distributing plugins.
   *
   * If an error occurs when invoking `provider`, the preset and all of its plugins will not be registered.
   *
   * @param provider - The provider for the preset whose plugins are to be registered.
   * @throws If a problem occurs while invoking `provider`.
   */
  static registerPreset(provider: PresetProvider) {
    EuropaCore[_pluginManager].addPreset(provider);
  }
}

/**
 * The options used by {@link EuropaCore}.
 */
export type EuropaCoreOptions<N, E extends N> = {
  /**
   * The environment of the {@link EuropaCore} implementation.
   */
  readonly environment: Environment<N, E>;
  /**
   * The options passed to the {@link EuropaCore} implementation, if any.
   */
  readonly options?: EuropaOptions;
};
