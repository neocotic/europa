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

import { ParentNode } from 'cheerio';
import { DomElement, DomParentNode } from 'europa-core';

import { AbstractCheerioDomNode, AbstractCheerioDomNodeOptions } from 'europa-dom-cheerio/AbstractCheerioDomNode';

/**
 * An abstract implementation of {@link DomParentNode} which can be used to meet most of the contract for DOM parent
 * nodes using cheerio.
 */
export abstract class AbstractCheerioDomParentNode<N extends ParentNode>
  extends AbstractCheerioDomNode<N>
  implements DomParentNode
{
  /**
   * Creates an instance of {@link AbstractCheerioDomParentNode} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  protected constructor(options: AbstractCheerioDomParentNodeOptions<N>) {
    super(options);
  }

  find(selector: string): DomElement | undefined {
    const node = this.node().find(selector).first();
    if (!node.length) {
      return;
    }

    return this.dom().createElement(node[0], this.root());
  }

  findAll(selector: string): DomElement[] {
    const dom = this.dom();
    const nodes = this.node().find(selector);
    const results: DomElement[] = [];
    const root = this.root();

    nodes.each((index, node) => {
      results.push(dom.createElement(node, root));
    });

    return results;
  }
}

/**
 * The options used by {@link AbstractCheerioDomParentNode}.
 */
export type AbstractCheerioDomParentNodeOptions<N> = AbstractCheerioDomNodeOptions<N>;
