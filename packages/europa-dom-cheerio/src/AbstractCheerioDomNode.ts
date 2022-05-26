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

import { AnyNode, Cheerio, CheerioAPI } from 'cheerio';
import { DomElement, DomNode, DomRoot } from 'europa-core';

import { CheerioDom } from 'europa-dom-cheerio/CheerioDom';
import { CheerioDomRoot } from 'europa-dom-cheerio/CheerioDomRoot';

const _cheerio = Symbol();
const _dom = Symbol();
const _node = Symbol();

/**
 * An abstract implementation of {@link DomNode} which can be used to meet most of the contract for DOM nodes using
 * cheerio.
 */
export abstract class AbstractCheerioDomNode<N extends AnyNode> implements DomNode {
  private readonly [_cheerio]: CheerioAPI;
  private readonly [_dom]: CheerioDom;
  private readonly [_node]: Cheerio<N>;

  /**
   * Creates an instance of {@link AbstractCheerioDomNode} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: AbstractCheerioDomNodeOptions<N>) {
    const { cheerio, dom, node } = options;

    this[_cheerio] = cheerio;
    this[_dom] = dom;
    this[_node] = cheerio(node);
  }

  /**
   * Returns the Cheerio API used when creating the DOM root wrapper in which this DOM node wrapper exists.
   *
   * @return The Cheerio API.
   */
  cheerio(): CheerioAPI {
    return this[_cheerio];
  }

  children(): DomNode[] {
    const results: DomNode[] = [];
    const root = this.root();

    this[_node].contents().each((index, child) => {
      results.push(this[_dom].createNode(child, root));
    });

    return results;
  }

  /**
   * Returns the DOM wrapper for Node.js.
   *
   * @return The DOM wrapper.
   */
  protected dom(): CheerioDom {
    return this[_dom];
  }

  isElement(): this is DomElement {
    return false;
  }

  isRoot(): this is DomRoot {
    return false;
  }

  isText(): boolean {
    return this[_dom].isText(this[_node][0], this.root());
  }

  node(): Cheerio<N> {
    return this[_node];
  }

  parent(): DomNode {
    const parent = this[_node].parent();
    if (!parent.length) {
      return this.root();
    }

    return this[_dom].createNode(parent[0], this.root());
  }

  abstract root(): CheerioDomRoot;

  text(): string {
    return this[_node].text() || '';
  }

  type(): number {
    return this[_node][0].nodeType;
  }
}

/**
 * The options used by {@link AbstractCheerioDomNode}.
 */
export type AbstractCheerioDomNodeOptions<N> = {
  /**
   * The Cheerio API used when creating the DOM root wrapper in which the DOM node to be wrapped exists.
   */
  readonly cheerio: CheerioAPI;
  /**
   * The DOM wrapper to be used.
   */
  readonly dom: CheerioDom;
  /**
   * The DOM node to be wrapped.
   */
  readonly node: N;
};
