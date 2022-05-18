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
import { PluginApi } from 'europa-core/plugin/PluginApi';

/**
 * A plugin that hooks into the {@link Europa} conversion process.
 *
 * Any declared converters will override any previously associated tag name to converter mappings when the plugin is
 * added to {@link Europa}.
 */
export interface Plugin {
  /**
   * A map containing tag name to converter pairs.
   */
  readonly converters?: { readonly [key: string]: PluginConverter };
  /**
   * Called after all elements have been converted for a single input, allowing this plugin to perform any necessary
   * clean up or tear down steps.
   *
   * @param conversion - The current {@link Conversion}.
   */
  readonly endConversion?: (conversion: Conversion) => void;
  /**
   * Called before any elements are converted for a single input, allowing this plugin to perform any necessary setup
   * steps.
   *
   * @param {Conversion} conversion - the current {@link Conversion}
   */
  readonly startConversion?: (conversion: Conversion) => void;
}

/**
 * Responsible for converting an individual HTML element to Markdown as defined in a plugin.
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
   * @param context - The current {@link ElementConversionContext}.
   */
  readonly endTag?: (conversion: Conversion, context: ElementConversionContext) => void;
  /**
   * Called at the start of the current element within the specified `conversion` which can be used to provide control
   * over the conversion and returns whether the children of the element should be converted.
   *
   * `context` can be used to pass any state for a single element conversion from start to end, limited to this
   * converter.
   *
   * @param conversion - The current {@link Conversion}.
   * @param context - The current {@link ElementConversionContext}.
   * @return `true` if the children of the current element should be converted; otherwise `false`.
   */
  readonly startTag?: (conversion: Conversion, context: ElementConversionContext) => boolean;
}

/**
 * Provides a plugin compatible with {@link Europa}.
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
