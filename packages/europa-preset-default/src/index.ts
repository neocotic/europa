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

import { PluginApi, PluginProvider, Preset } from 'europa-core';
import boldPluginProvider from 'europa-plugin-bold';
import codePluginProvider from 'europa-plugin-code';
import descriptionPluginProvider from 'europa-plugin-description';
import detailsPluginProvider from 'europa-plugin-details';
import headerPluginProvider from 'europa-plugin-header';
import horizontalRulePluginProvider from 'europa-plugin-horizontal-rule';
import imagePluginProvider from 'europa-plugin-image';
import italicPluginProvider from 'europa-plugin-italic';
import lineBreakPluginProvider from 'europa-plugin-line-break';
import linkPluginProvider from 'europa-plugin-link';
import listPluginProvider from 'europa-plugin-list';
import paragraphPluginProvider from 'europa-plugin-paragraph';
import preformattedPluginProvider from 'europa-plugin-preformatted';
import quotePluginProvider from 'europa-plugin-quote';

const pluginProviders: PluginProvider[] = [
  boldPluginProvider,
  codePluginProvider,
  descriptionPluginProvider,
  detailsPluginProvider,
  headerPluginProvider,
  horizontalRulePluginProvider,
  imagePluginProvider,
  italicPluginProvider,
  lineBreakPluginProvider,
  linkPluginProvider,
  listPluginProvider,
  paragraphPluginProvider,
  preformattedPluginProvider,
  quotePluginProvider,
];

export default function (api: PluginApi): Preset {
  return {
    plugins: pluginProviders.map((pluginProvider) => pluginProvider(api)),
  };
}
