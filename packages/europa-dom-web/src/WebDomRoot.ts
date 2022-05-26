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

import { AbstractWebDomParentNode, AbstractWebDomParentNodeOptions } from 'europa-dom-web/AbstractWebDomParentNode';

/**
 * An implementation of {@link DomRoot} for DOM roots within a web browser.
 */
export class WebDomRoot extends AbstractWebDomParentNode<DocumentFragment> implements DomRoot {
  /**
   * Creates an instance of {@link WebDomRoot} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: WebDomRootOptions) {
    super(options);
  }

  body(): DomElement {
    const body = this.find(':first-child');
    if (!body) {
      throw new Error('Unable to find DOM root body');
    }

    return body;
  }

  override isRoot(): this is DomRoot {
    return true;
  }

  override parent(): DomNode {
    return this;
  }

  override root(): WebDomRoot {
    return this;
  }
}

/**
 * The options used by {@link WebDomRoot}.
 */
export type WebDomRootOptions = AbstractWebDomParentNodeOptions<DocumentFragment>;
