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

import { AnyNode } from 'cheerio';

import { AbstractCheerioDomNode, AbstractCheerioDomNodeOptions } from 'europa-dom-cheerio/AbstractCheerioDomNode';
import { CheerioDomRoot } from 'europa-dom-cheerio/CheerioDomRoot';

const _root = Symbol();

/**
 * An implementation of {@link DomNode} for DOM nodes using cheerio.
 */
export class CheerioDomNode extends AbstractCheerioDomNode<AnyNode> {
  private readonly [_root]: CheerioDomRoot;

  /**
   * Creates an instance of {@link CheerioDomNode} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: CheerioDomNodeOptions) {
    super(options);

    this[_root] = options.root;
  }

  override root(): CheerioDomRoot {
    return this[_root];
  }
}

/**
 * The options used by {@link CheerioDomNode}.
 */
export type CheerioDomNodeOptions = AbstractCheerioDomNodeOptions<AnyNode> & {
  /**
   * The DOM root wrapper in which the DOM node to be wrapped exists.
   */
  readonly root: CheerioDomRoot;
};
