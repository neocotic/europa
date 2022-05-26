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

import { Element } from 'cheerio';
import { DomElement } from 'europa-core';
import kebabCase from 'lodash/kebabCase';

import {
  AbstractCheerioDomParentNode,
  AbstractCheerioDomParentNodeOptions,
} from 'europa-dom-cheerio/AbstractCheerioDomParentNode';
import { CheerioDomRoot } from 'europa-dom-cheerio/CheerioDomRoot';

const _root = Symbol();
const _tagName = Symbol();

/**
 * An implementation of {@link DomElement} for DOM elements using cheerio.
 */
export class CheerioDomElement extends AbstractCheerioDomParentNode<Element> implements DomElement {
  private readonly [_root]: CheerioDomRoot;
  private readonly [_tagName]: string;

  /**
   * Creates an instance of {@link CheerioDomElement} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: CheerioDomElementOptions) {
    super(options);

    this[_root] = options.root;
    this[_tagName] = options.node.tagName.toUpperCase();
  }

  attr(name: string): string | undefined {
    return this.node().attr(name) ?? undefined;
  }

  css(name: string): string | undefined {
    const styleName = kebabCase(name);
    if (!styleName) {
      return;
    }

    return this.node().css(styleName);
  }

  hasAttr(name: string): boolean {
    return this.node().attr(name) != null;
  }

  innerHtml(): string {
    return this.node().html() || '';
  }

  override isElement(): this is DomElement {
    return true;
  }

  outerHtml(): string {
    return this.cheerio().html(this.node()) || '';
  }

  prop(name: string): any {
    return this.node().prop(name) ?? undefined;
  }

  override root(): CheerioDomRoot {
    return this[_root];
  }

  tagName(): string {
    return this[_tagName];
  }
}

/**
 * The options used by {@link CheerioDomElement}.
 */
export type CheerioDomElementOptions = AbstractCheerioDomParentNodeOptions<Element> & {
  /**
   * The DOM root wrapper in which the DOM element to be wrapped exists.
   */
  readonly root: CheerioDomRoot;
};
