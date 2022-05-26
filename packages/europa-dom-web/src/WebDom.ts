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

import { Dom, DomElement, DomNode } from 'europa-core';

import { WebDomElement } from 'europa-dom-web/WebDomElement';
import { WebDomNode } from 'europa-dom-web/WebDomNode';
import { WebDomRoot } from 'europa-dom-web/WebDomRoot';

/**
 * An implementation of {@link Dom} for a web browser.
 */
export class WebDom implements Dom<Node, Element, WebDomRoot> {
  createElement(element: Element, root: WebDomRoot): DomElement {
    return new WebDomElement({
      dom: this,
      node: element,
      root,
    });
  }

  createNode(node: Node, root: WebDomRoot): DomNode {
    if (this.isElement(node, root)) {
      return this.createElement(node, root);
    }
    if (this.isRoot(node, root)) {
      return root;
    }

    return new WebDomNode({
      dom: this,
      node,
      root,
    });
  }

  createRoot(contents: Node | Node[] | string): WebDomRoot {
    const bodyNode = document.createElement('span');
    if (typeof contents === 'string') {
      bodyNode.innerHTML = contents;
    } else if (Array.isArray(contents)) {
      bodyNode.append(...contents);
    } else {
      bodyNode.appendChild(contents);
    }

    const rootNode = document.createDocumentFragment();
    rootNode.appendChild(bodyNode);

    return new WebDomRoot({
      dom: this,
      node: rootNode,
    });
  }

  isElement(node: Node, root: WebDomRoot): node is Element {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  isRoot(node: Node, root: WebDomRoot): boolean {
    return node === root.node();
  }

  isText(node: Node, root: WebDomRoot): boolean {
    return node.nodeType === Node.TEXT_NODE;
  }
}
