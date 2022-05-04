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
import { ElementNode } from 'europa-core/dom/ElementNode';
import { Option } from 'europa-core/option/Option';
import { OptionParser } from 'europa-core/option/OptionParser';
import { Plugin } from 'europa-core/plugin/Plugin';
import { Service } from 'europa-core/service/Service';
import { ServiceManager } from 'europa-core/service/ServiceManager';
import { WindowService } from 'europa-core/service/window/WindowService';
import { isVisible } from 'europa-core/util/is-visible';

const _options = Symbol('options');
const _plugins = Symbol('plugins');
const _serviceManager = Symbol('serviceManager');
const _window = Symbol('window');

/**
 * Enables configuration of an HTML to Markdown converter that supports HTML strings and DOM elements.
 */
export class Europa {
  /**
   * A convenient reference to {@link Plugin} exposed on {@link Europa} for cases where Europa Core is bundled.
   */
  static readonly Plugin = Plugin;

  private static readonly [_plugins]: Record<string, Plugin> = {};
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
      new Option('baseUri', () => Europa[_serviceManager].getService<WindowService>('window').getDefaultBaseUri()),
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

    const conversion = new Conversion(this, root, this[_options]);
    let wrapper: HTMLElement | undefined;

    if (!document.contains(root)) {
      wrapper = document.createElement('div');
      wrapper.style.display = 'none';
      wrapper.appendChild(root);

      document.body.appendChild(wrapper);
    }

    try {
      Object.values(Europa[_plugins]).forEach((plugin) => plugin.beforeAll(conversion));

      this.convertElement(root, conversion);

      Object.values(Europa[_plugins]).forEach((plugin) => plugin.afterAll(conversion));
    } finally {
      if (wrapper) {
        document.body.removeChild(wrapper);

        wrapper.removeChild(root);
      }
    }

    return conversion.append('').buffer.trim();
  }

  /**
   * Converts the specified `element` and it's children into Markdown using the `conversion` provided.
   *
   * Nothing happens if `element` is `null` or is invisible (simplified detection used).
   *
   * @param element - The element (along well as it's children) to be converted into Markdown.
   * @param conversion - The current {@link Conversion}.
   */
  convertElement(element: HTMLElement | null, conversion: Conversion) {
    if (!element) {
      return;
    }

    const window = this.window;

    if (element.nodeType === ElementNode.Element) {
      if (!isVisible(element, window)) {
        return;
      }

      conversion.element = element;

      const context: Record<string, any> = {};
      const plugin = conversion.tagName ? Europa[_plugins][conversion.tagName] : null;
      let convertChildren = true;

      if (plugin) {
        plugin.before(conversion, context);
        convertChildren = plugin.convert(conversion, context);
      }

      if (convertChildren) {
        for (let i = 0; i < element.childNodes.length; i++) {
          this.convertElement(element.childNodes[i] as HTMLElement, conversion);
        }
      }

      if (plugin) {
        plugin.after(conversion, context);
      }
    } else if (element.nodeType === ElementNode.Text) {
      const value = element.nodeValue || '';

      if (conversion.inPreformattedBlock) {
        conversion.output(value);
      } else if (conversion.inCodeBlock) {
        conversion.output(value.replace(/`/g, '\\`'));
      } else {
        conversion.output(value, true);
      }
    }
  }

  /**
   * Registers the specified `plugin` to be used by all {@link Europa} instances.
   *
   * If `plugin` declares support for a tag name which already has a {@link Plugin} registered for it, `plugin` will
   * replace the previously registered plugin, but only for conflicting tag names.
   *
   * @param plugin - The {@link Plugin} to be registered.
   */
  static register(plugin: Plugin) {
    plugin.getTagNames().forEach((tag) => (Europa[_plugins][tag] = plugin));
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
      Europa[_serviceManager].getService<WindowService>('window').closeWindow(window);
      this[_window] = null;
    }

    return this;
  }

  /**
   * Configures the `service` provided to be used by all {@link Europa} instances.
   *
   * @param service - The {@link Service} to be configured.
   * @throws If a {@link Service} has already been configured with the same name.
   */
  static use(service: Service) {
    Europa[_serviceManager].setService(service.getName(), service);
  }

  /**
   * The document to be used for HTML to Markdown conversion by this {@link Europa} instance.
   */
  get document(): Document {
    return this.window.document;
  }

  /**
   * The window to be used for HTML to Markdown conversion by this {@link Europa} instance.
   */
  get window(): Window {
    let window = this[_window];

    if (!window) {
      window = this[_window] = Europa[_serviceManager]
        .getService<WindowService>('window')
        .getWindow(this[_options].baseUri);
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
