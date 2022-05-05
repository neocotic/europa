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
import { Option } from 'europa-core/option/Option';
import { OptionParser } from 'europa-core/option/OptionParser';
import { PluginProvider } from 'europa-core/plugin/Plugin';
import { PluginManager } from 'europa-core/plugin/PluginManager';
import { PresetProvider } from 'europa-core/plugin/Preset';
import { Service } from 'europa-core/service/Service';
import { ServiceManager } from 'europa-core/service/ServiceManager';
import { ServiceName } from 'europa-core/service/ServiceName';

const _options = Symbol('options');
const _pluginManager = Symbol('pluginManager');
const _serviceManager = Symbol('serviceManager');
const _window = Symbol('window');

/**
 * Enables configuration of an HTML to Markdown converter that supports HTML strings and DOM elements.
 */
export class Europa {
  private static readonly [_pluginManager] = new PluginManager();
  private static readonly [_serviceManager] = new ServiceManager();

  private readonly [_options]: Record<string, any>;
  private [_window]: Window | null = null;

  /**
   * Creates a new instance of {@link Europa} using the `options` provided.
   *
   * @param [options] - The options to be used.
   */
  constructor(options?: EuropaOptions) {
    this[_options] = new OptionParser([
      new Option('absolute', false),
      new Option('baseUri', () => Europa[_serviceManager].getService(ServiceName.Window).getDefaultBaseUri()),
      new Option('inline', false),
    ]).parse(options);
  }

  /**
   * Converts the specified `html` into Markdown based on the options configured for this {@link Europa} instance.
   *
   * `html` can either be an HTML string or a DOM element whose HTML contents are to be converted into Markdown.
   *
   * @param html - The HTML (or element whose inner HTML is) to be converted into Markdown.
   * @return The Markdown converted from `html`.
   */
  convert(html: HTMLElement | string | null | undefined): string {
    if (!html) {
      return '';
    }

    const document = this.document;
    let root: HTMLElement;

    if (typeof html === 'string') {
      root = document.createElement('div');
      root.innerHTML = html;
    } else {
      root = html;
    }

    const pluginManager = Europa[_pluginManager];
    const conversion = new Conversion(this, root, this[_options], pluginManager);
    let wrapper: HTMLElement | undefined;

    if (!document.contains(root)) {
      wrapper = document.createElement('div');
      wrapper.style.display = 'none';
      wrapper.appendChild(root);

      document.body.appendChild(wrapper);
    }

    try {
      pluginManager.invokePlugins('startConversion', conversion);

      conversion.convertElement(root);

      pluginManager.invokePlugins('endConversion', conversion);
    } finally {
      if (wrapper) {
        document.body.removeChild(wrapper);

        wrapper.removeChild(root);
      }
    }

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
    Europa[_pluginManager].addPlugin(provider);
  }

  /**
   * Invokes the specified plugin `provider` and registers the resulting preset.
   *
   * This method is effectively just a shortcut for calling {@link Europa.registerPlugin} for multiple plugin providers,
   * however, the main benefit is that it supports the concept of presets, which are a useful mechanism for bundling and
   * distributing plugins.
   *
   * If an error occurs when invoking `provider`, the preset and all of its plugins will not be registered.
   *
   * @param provider - The provider for the preset whose plugins are to be registered.
   * @throws If a problem occurs while invoking `provider`.
   */
  static registerPreset(provider: PresetProvider) {
    Europa[_pluginManager].addPreset(provider);
  }

  /**
   * Registers the specified `service`.
   *
   * @param service - The {@link Service} to be registered.
   * @throws If a {@link Service} has already been configured with the same name.
   */
  static registerService(service: Service) {
    Europa[_serviceManager].setService(service.getName(), service);
  }

  /**
   * Releases the window used by this {@link Europa} instance.
   *
   * This allows closeable {@link WindowService} implementations to close the window and free up resources. However,
   * this instance can and will simply retrieve another window from the {@link WindowService} the next time it is
   * required (i.e. {@link Europa#convert} is called).
   *
   * @return A reference to this {@link Europa} for chaining purposes.
   */
  release(): this {
    const window = this[_window];

    if (window) {
      Europa[_serviceManager].getService(ServiceName.Window).closeWindow(window);
      this[_window] = null;
    }

    return this;
  }

  /**
   * The document to be used for HTML to Markdown conversion by this {@link Europa} instance.
   */
  get document(): Document {
    return this.window.document;
  }

  /**
   * The end of line character to be used for HTML to Markdown conversion by this {@link Europa} instance.
   */
  get eol(): string {
    return Europa[_serviceManager].getService(ServiceName.Charset).getEndOfLineCharacter();
  }

  /**
   * The window to be used for HTML to Markdown conversion by this {@link Europa} instance.
   */
  get window(): Window {
    let window = this[_window];

    if (!window) {
      window = this[_window] = Europa[_serviceManager].getService(ServiceName.Window).getWindow(this[_options].baseUri);
    }

    return window;
  }
}

/**
 * The options used by {@link Europa}.
 */
export type EuropaOptions = {
  /**
   * Whether absolute URLS should be used for anchors/images.
   */
  readonly absolute?: boolean;
  /**
   * The base URI for the window. This is ignored in environments where the base URI cannot be changed.
   */
  readonly baseUri?: string;
  /**
   * Whether anchor/image URLs are to be inserted inline.
   */
  readonly inline?: boolean;
};
