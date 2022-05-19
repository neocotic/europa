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
import { DomRoot } from 'europa-core/environment/dom/DomRoot';

/**
 * A cross-platform wrapper for a DOM node that exists within a {@link Dom}.
 */
export interface DomNode {
  /**
   * Returns all child DOM nodes contained within this DOM node wrapper.
   *
   * @return The children DOM node wrappers.
   */
  children(): DomNode[];

  /**
   * Checks whether this wrapper is for a DOM element.
   *
   * @return `true` if this {@link DomNode} is a {@link DomElement}; otherwise `false`.
   */
  isElement(): this is DomElement;

  /**
   * Checks whether this wrapper is for the DOM root.
   *
   * @return `true` if this {@link DomNode} is a {@link DomRoot}; otherwise `false`.
   */
  isRoot(): this is DomRoot;

  /**
   * Checks whether this wrapper is for a DOM text node.
   *
   * @return `true` if this {@link DomNode} is for a DOM text node; otherwise `false`.
   */
  isText(): boolean;

  /**
   * Returns the wrapped DOM node.
   *
   * @return The wrapped DOM node.
   */
  node(): any;

  /**
   * Returns the parent of this DOM wrapper.
   *
   * The DOM root wrapper should be returned if this wrapper has no parent or if this wrapper is for the DOM root.
   *
   * @return A wrapper for the parent DOM node.
   */
  parent(): DomNode;

  /**
   * Returns the DOM root wrapper in which this DOM node wrapper exists.
   *
   * @return The DOM root wrapper.
   */
  root(): DomRoot;

  /**
   * Returns the text contents of the wrapped DOM node or an empty string if not applicable to the wrapped DOM node's
   * type.
   *
   * @return The text contents.
   */
  text(): string;

  /**
   * Returns the type of the wrapped DOM node.
   *
   * @return The DOM node type.
   */
  type(): number;
}
