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
import { ConversionContext } from 'europa-core/ConversionContext';
import {
  Plugin,
  PluginConverter,
  PluginConverterHook,
  PluginHook,
  PluginProvider,
  PluginTextConverter,
  PluginTextEscaper,
} from 'europa-core/plugin/Plugin';
import { PluginApi } from 'europa-core/plugin/PluginApi';
import { PresetProvider } from 'europa-core/plugin/Preset';

const _addProvidedPlugin = Symbol();
const _api = Symbol();
const _converters = Symbol();
const _hookCache = Symbol();
const _getHookCache = Symbol();
const _plugins = Symbol();

/**
 * A basic manager for plugins and presets (collections of plugins) that can be hooked into {@link EuropaCore}.
 */
export class PluginManager {
  private readonly [_api] = new PluginApi();
  private readonly [_converters]: Record<string, PluginConverter> = {};
  private readonly [_plugins]: Plugin[] = [];
  private [_hookCache]: PluginManagerHookCache | null = null;

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
   * Returns whether this {@link PluginManager} contains a converter for the specified `tagName` and that the converter
   * has a hook with the name provided.
   *
   * @param tagName - The name of the tag to be checked.
   * @param hookName - The name of the hook to be checked.
   * @return `true` if a converter for `tagName` exists and has the named hook; otherwise `false`.
   */
  hasConverterHook(tagName: string, hookName: PluginConverterHook): boolean {
    const converter = this[_converters][tagName];

    return typeof converter?.[hookName] === 'function';
  }

  /**
   * Invokes the hook with the specified name on with the `conversion` and `context` provided on the converter for the
   * given `tagName` within this {@link PluginManager}.
   *
   * If there is no converter for `tagName` or the converter does not have the named hook, nothing happens and one of
   * the following values will be returned based on `hookName`:
   *
   * | Hook Name  | Return Value |
   * | ---------- | ------------ |
   * | `endTag`   | `undefined`  |
   * | `startTag` | `false`      |
   *
   * Otherwise, it will return the result of invoking the named hook. For this reason it is highly recommended that,
   * if the return value is important, {@link PluginManager#hasConverterHook} is called with the same `tagName` and
   * `hookName` combination to check whether the converter hook exists before calling
   * {@link PluginManager#invokeConverterHook}.
   *
   * @param tagName - The name of the tag whose converter (if any) the named hook is to be invoked on.
   * @param hookName - The name of the hook to be invoked.
   * @param conversion - The current {@link Conversion}.
   * @param context - The context for the current element within the {@link Conversion}.
   * @return The result of calling the hook or a default value based on `hookName` (see above table) if there is no
   * converter for `tagName` or the converter does not have the named hook.
   */
  invokeConverterHook(
    tagName: string,
    hookName: PluginConverterHook,
    conversion: Conversion,
    context: ConversionContext,
  ): boolean | void {
    const hook = this[_converters][tagName]?.[hookName];
    if (typeof hook !== 'function') {
      return hookName === 'startTag' ? false : undefined;
    }

    return hook(conversion, context);
  }

  /**
   * Invokes the hook with the specified name with the `conversion` provided on each of the plugins within this
   * {@link PluginManager}.
   *
   * Any plugins that do not have the named hook are skipped.
   *
   * @param hookName - The name of the hook to be invoked.
   * @param conversion - The current {@link Conversion}.
   */
  invokeHook(hookName: PluginHook, conversion: Conversion) {
    this[_plugins].forEach((plugin) => {
      const hook = plugin[hookName];
      if (typeof hook === 'function') {
        hook(conversion);
      }
    });
  }

  /**
   * Invokes a special hook on all plugins within this {@link PluginManager} that allows plugins to conditionally
   * perform an alternative conversion of the specified `value` which has been taken from a text node being converted by
   * the given `conversion`.
   *
   * This relies entirely on plugins ensuring that, if they perform any alternative conversion of the specified `value`,
   * that their hook returns `true` in order to prevent `conversion` from also processing `value` which would result in
   * duplication and would likely have other unexpected and unwanted side effects.
   *
   * @param value - The text value to potentially be converted.
   * @param conversion - The current {@link Conversion}.
   * @return `true` if `value` has been converted by a plugin; otherwise `false`.
   */
  invokeTextConverterHook(value: string, conversion: Conversion): boolean {
    const hookCache = this[_getHookCache]();

    return hookCache.textConverters.some((textConverter) => textConverter(value, conversion));
  }

  /**
   * Invokes a special hook on all plugins within this {@link PluginManager} that allows plugins to perform any
   * additional escaping of special characters within the specified `value` which has been taken from a text node being
   * converted by the given `conversion`.
   *
   * This relies on plugins ensuring that they do not double-escape characters that have either been previously escaped
   * by `conversion` or another plugin.
   *
   * @param value - The text value to be escaped.
   * @param conversion - The current {@link Conversion}.
   * @return The escaped `str` or `str` if no escaping is required.
   */
  invokeTextEscaperHook(value: string, conversion: Conversion): string {
    const hookCache = this[_getHookCache]();

    return hookCache.textEscapers.reduce((acc, textEscaper) => textEscaper(acc, conversion), value);
  }

  private [_addProvidedPlugin](plugin: Plugin) {
    if (plugin.converters) {
      Object.entries(plugin.converters).forEach(([tagName, converter]) => {
        this[_converters][tagName.toUpperCase()] = converter;
      });
    }
    if (typeof plugin.convertText === 'function' || typeof plugin.escapeText === 'function') {
      this[_hookCache] = null;
    }

    this[_plugins].push(plugin);
  }

  private [_getHookCache](): PluginManagerHookCache {
    let hookCache = this[_hookCache];
    if (hookCache) {
      return hookCache;
    }

    const textConverters: PluginTextConverter[] = [];
    const textEscapers: PluginTextEscaper[] = [];

    this[_plugins].forEach((plugin) => {
      if (typeof plugin.convertText === 'function') {
        textConverters.push(plugin.convertText);
      }
      if (typeof plugin.escapeText === 'function') {
        textEscapers.push(plugin.escapeText);
      }
    });

    hookCache = { textConverters, textEscapers };

    this[_hookCache] = hookCache;

    return hookCache;
  }
}

/**
 * A cache containing special hooks for registered all registered plugins within a {@link PluginManager}.
 */
export type PluginManagerHookCache = {
  /**
   * The text converter special hooks existing on registered plugins within the {@link PluginManager}.
   */
  readonly textConverters: readonly PluginTextConverter[];
  /**
   * The text escaper special hooks existing on registered plugins within the {@link PluginManager}.
   */
  readonly textEscapers: readonly PluginTextEscaper[];
};
