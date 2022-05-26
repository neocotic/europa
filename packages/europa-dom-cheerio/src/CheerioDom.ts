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

import cheerio, { AnyNode, Element } from 'cheerio';
import { Dom, DomElement, DomNode } from 'europa-core';

import { CheerioDomElement } from 'europa-dom-cheerio/CheerioDomElement';
import { CheerioDomNode } from 'europa-dom-cheerio/CheerioDomNode';
import { CheerioDomRoot } from 'europa-dom-cheerio/CheerioDomRoot';

/**
 * An implementation of {@link Dom} using cheerio.
 */
export class CheerioDom implements Dom<AnyNode, Element, CheerioDomRoot> {
  createElement(element: Element, root: CheerioDomRoot): DomElement {
    return new CheerioDomElement({
      cheerio: root.cheerio(),
      dom: this,
      node: element,
      root,
    });
  }

  createNode(node: AnyNode, root: CheerioDomRoot): DomNode {
    if (this.isElement(node, root)) {
      return this.createElement(node, root);
    }
    if (this.isRoot(node, root)) {
      return root;
    }

    return new CheerioDomNode({
      cheerio: root.cheerio(),
      dom: this,
      node,
      root,
    });
  }

  createRoot(contents: AnyNode | AnyNode[] | string): CheerioDomRoot {
    const cheerioApi = cheerio.load(contents);
    const [rootNode] = cheerioApi.root();

    return new CheerioDomRoot({
      cheerio: cheerioApi,
      dom: this,
      node: rootNode,
    });
  }

  isElement(node: AnyNode, root: CheerioDomRoot): node is Element {
    return node.nodeType === 1;
  }

  isRoot(node: AnyNode, root: CheerioDomRoot): boolean {
    return node === root.node()[0];
  }

  isText(node: AnyNode, root: CheerioDomRoot): boolean {
    return node.nodeType === 3;
  }
}
