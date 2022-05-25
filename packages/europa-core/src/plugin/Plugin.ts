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
import { PluginApi } from 'europa-core/plugin/PluginApi';

/**
 * A plugin that hooks into the {@link EuropaCore} conversion process.
 *
 * Any declared converters will override any previously associated tag name to converter mappings when the plugin is
 * added to {@link EuropaCore}.
 */
export interface Plugin {
  /**
   * Called whenever a text node is being converted with the specified `value`, allowing this plugin to perform any
   * alternative conversion of the text by the given `conversion`.
   *
   * It is extremely important that, if this plugin does perform any alternative conversion of the specified `value`,
   * that this method returns `true` in order to prevent `conversion` from also processing `value` which would result in
   * duplication and would likely have other unexpected and unwanted side effects.
   *
   * @param value - The text value to potentially be converted.
   * @param conversion - The current {@link Conversion}.
   * @return `true` if `value` has been converted by this plugin; otherwise `false`.
   */
  readonly convertText?: PluginTextConverter;
  /**
   * A map containing tag name to converter pairs.
   */
  readonly converters?: { readonly [key: string]: PluginConverter };
  /**
   * Called after all nodes have been converted for a single input, allowing this plugin to perform any necessary clean
   * up or tear down steps.
   *
   * @param conversion - The current {@link Conversion}.
   */
  readonly endConversion?: (conversion: Conversion) => void;
  /**
   * Called whenever a text node is being converted with the specified `value`, allowing this plugin to perform any
   * additional escaping of special characters within the text which has been taken by the given `conversion`.
   *
   * It's important to note that `value` will have already been escaped by `conversion` (or another plugin) and that
   * only additional escaping should be applied, and with extra care as to not double-escape characters.
   *
   * @param value - The text value to be escaped.
   * @param conversion - The current {@link Conversion}.
   * @return The escaped `str` or `str` if no escaping is required.
   */
  readonly escapeText?: PluginTextEscaper;
  /**
   * Called before any nodes are converted for a single input, allowing this plugin to perform any necessary setup
   * steps.
   *
   * @param conversion - The current {@link Conversion}.
   */
  readonly startConversion?: (conversion: Conversion) => void;
}

/**
 * Responsible for converting an individual element to Markdown as defined in a plugin.
 */
export interface PluginConverter {
  /**
   * Called at the end of the current element within the specified `conversion` and only once all children elements have
   * been converted as well, provided they weren't skipped.
   *
   * `context` can be used to receive any state that may have been passed at the start of the single element conversion
   * by this converter.
   *
   * @param conversion - The current {@link Conversion}.
   * @param context - The context for the current element within the {@link Conversion}.
   */
  readonly endTag?: (conversion: Conversion, context: ConversionContext) => void;
  /**
   * Called at the start of the current element within the specified `conversion` which can be used to provide control
   * over the conversion and returns whether the children of the element should be converted.
   *
   * `context` can be used to pass any state for a single element conversion from start to end, limited to this
   * converter.
   *
   * @param conversion - The current {@link Conversion}.
   * @param context - The context for the current element within the {@link Conversion}.
   * @return `true` if the children of the current element should be converted; otherwise `false`.
   */
  readonly startTag?: (conversion: Conversion, context: ConversionContext) => boolean;
}

/**
 * The name of a hook on a {@link PluginConverter}.
 */
export type PluginConverterHook = keyof PluginConverter;

/**
 * The name of a hook on a {@link Plugin}.
 */
export type PluginHook = Exclude<keyof Plugin, 'convertText' | 'converters' | 'escapeText'>;

/**
 * Provides a plugin compatible with {@link EuropaCore}.
 *
 * Invoked internally by {@link PluginManager#addPlugin} in order to get the plugin and is passed an `api`, which it can
 * choose to use or not.
 *
 * Any error that is thrown will bubble up and prevent the plugin from being added.
 *
 * @param api - The {@link PluginApi} that provides useful methods for plugin providers.
 * @return The provided {@link Plugin}.
 * @throws If a problem occurs while providing the plugin.
 */
export type PluginProvider = (api: PluginApi) => Plugin;

/**
 * Conditionally performs an alternative conversion of the specified `value` which has been taken from a text node being
 * converted by the given `conversion`.
 *
 * It is extremely important that, if any alternative conversion of the specified `value` is performed, that this method
 * returns `true` in order to prevent `conversion` from also processing `value` which would result in duplication and
 * would likely have other unexpected and unwanted side effects.
 *
 * @param value - The text value to potentially be converted.
 * @param conversion - The current {@link Conversion}.
 * @return `true` if `value` has been converted by this method; otherwise `false`.
 */
export type PluginTextConverter = (value: string, conversion: Conversion) => boolean;

/**
 * Conditionally performs additional escaping of special characters within the specified `value` which has been taken
 * from a text node being converted by the given `conversion`.
 *
 * It's important to note that `value` will have already been escaped by `conversion` (or another plugin) and that only
 * additional escaping should be applied, and with extra care as to not double-escape characters.
 *
 * @param value - The text value to be escaped.
 * @param conversion - The current {@link Conversion}.
 * @return The escaped `str` or `str` if no escaping is required.
 */
export type PluginTextEscaper = (value: string, conversion: Conversion) => string;
