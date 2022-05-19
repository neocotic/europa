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

import { Plugin } from 'europa-core/plugin/Plugin';
import { PluginApi } from 'europa-core/plugin/PluginApi';

/**
 * A collection of plugins that hook into the {@link EuropaCore} conversion process.
 */
export interface Preset {
  /**
   * The plugins that belong to this preset.
   */
  readonly plugins?: Plugin[];
}

/**
 * Provider a plugin preset compatible with {@link EuropaCore}.
 *
 * Invoked internally by {@link PluginManager#addPreset} in order to get the preset and is passed an `api`, which it can
 * choose to use or not, although typically this will be passed to plugin providers to build its list of plugins.
 *
 * Any error that is thrown will bubble up and prevent any plugins within the preset from being added.
 *
 * @param api - The {@link PluginApi} that provides useful methods for preset and plugin providers.
 * @return The provided {@link Preset}.
 * @throws If a problem occurs while providing the preset or any of its plugins.
 */
export type PresetProvider = (api: PluginApi) => Preset;
