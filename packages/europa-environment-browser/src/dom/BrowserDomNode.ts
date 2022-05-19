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

import {
  AbstractBrowserDomNode,
  AbstractBrowserDomNodeOptions,
} from 'europa-environment-browser/dom/AbstractBrowserDomNode';
import { BrowserDomRoot } from 'europa-environment-browser/dom/BrowserDomRoot';

const _root = Symbol();

/**
 * An implementation of {@link DomNode} for DOM nodes within a web browser.
 */
export class BrowserDomNode extends AbstractBrowserDomNode<Node> {
  private readonly [_root]: BrowserDomRoot;

  /**
   * Creates an instance of {@link BrowserDomNode} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: BrowserDomNodeOptions) {
    super(options);

    this[_root] = options.root;
  }

  override root(): BrowserDomRoot {
    return this[_root];
  }
}

/**
 * The options used by {@link BrowserDomNode}.
 */
export type BrowserDomNodeOptions = AbstractBrowserDomNodeOptions<Node> & {
  /**
   * The DOM root wrapper in which the DOM node to be wrapped exists.
   */
  readonly root: BrowserDomRoot;
};
