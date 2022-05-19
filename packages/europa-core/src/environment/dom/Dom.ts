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

import { DomElement } from 'europa-core/environment/dom/DomElement';
import { DomNode } from 'europa-core/environment/dom/DomNode';
import { DomRoot } from 'europa-core/environment/dom/DomRoot';

/**
 * A wrapper for a DOM that supports multiple environments within {@link EuropaCore} and its plugin/preset ecosystem.
 *
 * To begin using the DOM wrapper, first call {@link Dom#createRoot} to create a wrapper for the DOM root containing the
 * desired children.
 */
export interface Dom<N, E extends N, R extends DomRoot> {
  /**
   * Creates a wrapper for the specified DOM `element` in the `root` provided.
   *
   * @param element - The DOM element to be wrapped.
   * @param root - The DOM root wrapper in which `element` exists.
   * @return The wrapped DOM `element`.
   */
  createElement(element: E, root: R): DomElement;

  /**
   * Creates a wrapper for the specified DOM `node` in the `root` provided.
   *
   * @param node - The DOM node to be wrapped.
   * @param root - The DOM root wrapper in which `node` exists.
   * @return The wrapped DOM `node`.
   */
  createNode(node: N, root: R): DomNode;

  /**
   * Creates a DOM root wrapper containing the specified `contents`.
   *
   * @param contents - The DOM node(s) or HTML string to be appended to the created DOM root wrapper.
   * @return A DOM root wrapper containing `contents`.
   */
  createRoot(contents: N | N[] | string): R;

  /**
   * Checks whether the specified DOM `node` is a DOM element in the `root` provided.
   *
   * @param node - The DOM node to be checked.
   * @param root - The DOM root wrapper to be checked.
   * @return `true` if `node` is a DOM element; otherwise `false`.
   */
  isElement(node: N, root: R): node is E;

  /**
   * Checks whether the specified DOM `node` is the same as that of the `root` provided.
   *
   * @param node - The DOM node to be checked.
   * @param root - The DOM root wrapper to be checked.
   * @return `true` if `node` is the DOM root node; otherwise `false`.
   */
  isRoot(node: N, root: R): boolean;

  /**
   * Checks whether the specified DOM `node` is a DOM text node in the `root` provided.
   *
   * @param node - The DOM node to be checked.
   * @param root - The DOM root wrapper to the checked.
   * @return `true` if `node` is a DOM text node; otherwise `false`.
   */
  isText(node: N, root: R): boolean;
}
