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

import { DomElement, DomNode, DomRoot } from 'europa-core';

import { WebDom } from 'europa-dom-web/WebDom';
import { WebDomRoot } from 'europa-dom-web/WebDomRoot';

const _dom = Symbol();
const _node = Symbol();

/**
 * An abstract implementation of {@link DomNode} which can be used to meet most of the contract for DOM nodes within a
 * web browser.
 */
export abstract class AbstractWebDomNode<N extends Node> implements DomNode {
  private readonly [_dom]: WebDom;
  private readonly [_node]: N;

  /**
   * Creates an instance of {@link AbstractWebDomNode} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: AbstractWebDomNodeOptions<N>) {
    this[_dom] = options.dom;
    this[_node] = options.node;
  }

  children(): DomNode[] {
    return this.map(this[_node].childNodes, (node, root) => this[_dom].createNode(node, root));
  }

  /**
   * Returns the DOM wrapper for a web browser.
   *
   * @return The DOM wrapper.
   */
  protected dom(): WebDom {
    return this[_dom];
  }

  isElement(): this is DomElement {
    return false;
  }

  isRoot(): this is DomRoot {
    return false;
  }

  isText(): boolean {
    return this[_dom].isText(this[_node], this.root());
  }

  /**
   * Maps all the specified DOM `nodes` using the `mapper` provided into a new array of DOM node wrappers.
   *
   * @param nodes - The DOM node list to be mapped.
   * @param mapper - A function to map a DOM node within `nodes` to the desired type.
   * @return An array containing the mapped DOM node wrappers.
   */
  protected map<T extends Node, R extends DomNode>(
    nodes: NodeListOf<T>,
    mapper: (node: T, root: WebDomRoot) => R,
  ): R[] {
    const results: R[] = [];
    const root = this.root();

    for (let i = 0; i < nodes.length; i++) {
      results.push(mapper(nodes[i], root));
    }

    return results;
  }

  node(): N {
    return this[_node];
  }

  parent(): DomNode {
    const { parentNode } = this[_node];
    if (!parentNode) {
      return this.root();
    }

    return this[_dom].createNode(parentNode, this.root());
  }

  abstract root(): WebDomRoot;

  text(): string {
    return this[_node].textContent || '';
  }

  type(): number {
    return this[_node].nodeType;
  }
}

/**
 * The options used by {@link AbstractWebDomNode}.
 */
export type AbstractWebDomNodeOptions<N> = {
  /**
   * The DOM wrapper to be used.
   */
  readonly dom: WebDom;
  /**
   * The DOM node to be wrapped.
   */
  readonly node: N;
};
