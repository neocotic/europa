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

import { Conversion, ElementConversionContext } from 'europa-core/Conversion';
import { Plugin, PluginConverter, PluginProvider } from 'europa-core/plugin/Plugin';
import { PluginApi } from 'europa-core/plugin/PluginApi';
import { PresetProvider } from 'europa-core/plugin/Preset';

const _addProvidedPlugin = Symbol();
const _api = Symbol();
const _converters = Symbol();
const _plugins = Symbol();

/**
 * A basic manager for plugins and presets (collections of plugins) that can be hooked into {@link Europa}.
 */
export class PluginManager {
  private readonly [_api] = new PluginApi();
  private readonly [_converters]: Record<string, PluginConverter> = {};
  private readonly [_plugins]: Plugin[] = [];

  /**
   * Invokes the specified plugin `provider` and adds the resulting plugin to this {@link PluginManager}.
   *
   * If the plugin contains any converters, they will be associated with their corresponding tag names, overriding any
   * previously converters associated with those tag names.
   *
   * If an error occurs when invoking `provider`, the plugin will not be added to this {@link PluginManager}.
   *
   * @param provider - The provider for the plugin to be added.
   * @return A reference to this {@link PluginManager} for chaining purposes.
   * @throws If a problem occurs while invoking `provider`.
   */
  addPlugin(provider: PluginProvider): this {
    const plugin = provider(this[_api]);

    this[_addProvidedPlugin](plugin);

    return this;
  }

  /**
   * Invokes the specified preset `provider` and adds the resulting preset to this {@link PluginManager}.
   *
   * This method is effectively just a shortcut for calling {@link PluginManager#addPlugin} for multiple plugin
   * providers, however, the main benefit is that it supports the concept of presets, which are a useful mechanism for
   * bundling and distributing plugins.
   *
   * If an error occurs when invoking `provider`, the preset and all of its plugins will not be added to this
   * {@link PluginManager}.
   *
   * @param provider - The provider for the preset whose plugins are to be added.
   * @return A reference to this {@link PluginManager} for chaining purposes.
   * @throws If a problem occurs while invoking `provider`.
   */
  addPreset(provider: PresetProvider): this {
    const preset = provider(this[_api]);
    preset.plugins?.forEach((plugin) => this[_addProvidedPlugin](plugin));

    return this;
  }

  /**
   * Returns whether this {@link PluginManager} contains a converter for the specified `tagName`.
   *
   * @param tagName - The name of the tag to be checked.
   * @return `true` if it has a converter for `tagName`; otherwise `false`.
   */
  hasConverter(tagName: string): boolean {
    return !!this[_converters][tagName];
  }

  /**
   * Invokes the method with the specified name on with the `conversion` and `context` provided on the converter for the
   * given `tagName` within this {@link PluginManager}.
   *
   * This method will return `undefined` if there is no converter for `tagName` or that converter does not have the
   * method. Otherwise, it will return the result of invoking the method.
   *
   * @param tagName - The name of the tag whose converter (if any) the method is to be invoked on.
   * @param methodName - The name of the method to be invoked.
   * @param conversion - The current {@link Conversion}.
   * @param context - The current {@link ElementConversionContext}.
   * @return The result of calling the method or `undefined` if there is no converter for `tagName` or it did not have
   * the method.
   */
  invokeConverter<K extends keyof PluginConverter>(
    tagName: string,
    methodName: K,
    conversion: Conversion,
    context: ElementConversionContext,
  ): boolean | void {
    const converter = this[_converters][tagName];
    const method = converter?.[methodName];
    if (typeof method !== 'function') {
      return;
    }

    return method(conversion, context);
  }

  /**
   * Invokes the method with the specified name with the `conversion` provided on each of the plugins within this
   * {@link PluginManager}.
   *
   * Plugins that do not have the method are skipped and any return values are ignored by this method.
   *
   * @param methodName - The name of the method to be invoked.
   * @param conversion - The current {@link Conversion}.
   */
  invokePlugins<K extends keyof Plugin>(methodName: K, conversion: Conversion) {
    this[_plugins].forEach((plugin) => {
      const method = plugin[methodName];
      if (typeof method === 'function') {
        method(conversion);
      }
    });
  }

  private [_addProvidedPlugin](plugin: Plugin) {
    if (plugin.converters) {
      Object.entries(plugin.converters).forEach(([tagName, converter]) => {
        this[_converters][tagName.toUpperCase()] = converter;
      });
    }

    this[_plugins].push(plugin);
  }
}
