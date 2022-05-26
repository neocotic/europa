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

import { DomElement } from 'europa-core';

import { AbstractWebDomParentNode, AbstractWebDomParentNodeOptions } from 'europa-dom-web/AbstractWebDomParentNode';
import { WebDomRoot } from 'europa-dom-web/WebDomRoot';

const _root = Symbol();
const _tagName = Symbol();

/**
 * An implementation of {@link DomElement} for DOM elements within a web browser.
 */
export class WebDomElement extends AbstractWebDomParentNode<Element> implements DomElement {
  private readonly [_root]: WebDomRoot;
  private readonly [_tagName]: string;

  /**
   * Creates an instance of {@link WebDomElement} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: WebDomElementOptions) {
    super(options);

    this[_root] = options.root;
    this[_tagName] = options.node.tagName.toUpperCase();
  }

  attr(name: string): string | undefined {
    return this.node().getAttribute(name) ?? undefined;
  }

  css(name: string): string | undefined {
    if (!name) {
      return;
    }

    const { style } = this.node() as HTMLElement;

    return style[name as any] || undefined;
  }

  hasAttr(name: string): boolean {
    return this.node().hasAttribute(name);
  }

  innerHtml(): string {
    return this.node().innerHTML;
  }

  override isElement(): this is DomElement {
    return true;
  }

  outerHtml(): string {
    return this.node().outerHTML;
  }

  prop(name: string): any {
    const node = this.node();
    if (!(name in node)) {
      return;
    }

    const value = node[name as keyof Element];

    return value != null ? value : undefined;
  }

  override root(): WebDomRoot {
    return this[_root];
  }

  tagName(): string {
    return this[_tagName];
  }
}

/**
 * The options used by {@link WebDomElement}.
 */
export type WebDomElementOptions = AbstractWebDomParentNodeOptions<Element> & {
  /**
   * The DOM root wrapper in which the DOM element to be wrapped exists.
   */
  readonly root: WebDomRoot;
};
