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

import { Document } from 'cheerio';
import { DomElement, DomNode, DomRoot } from 'europa-core';

import {
  AbstractNodeDomParentNode,
  AbstractNodeDomParentNodeOptions,
} from 'europa-environment-node/dom/AbstractNodeDomParentNode';

/**
 * An implementation of {@link DomRoot} for DOM roots within Node.js.
 */
export class NodeDomRoot extends AbstractNodeDomParentNode<Document> implements DomRoot {
  /**
   * Creates an instance of {@link NodeDomRoot} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: NodeDomRootOptions) {
    super(options);
  }

  body(): DomElement {
    const body = this.find('body');
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

  override root(): NodeDomRoot {
    return this;
  }
}

/**
 * The options used by {@link NodeDomRoot}.
 */
export type NodeDomRootOptions = AbstractNodeDomParentNodeOptions<Document>;
