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

/**
 * A cross-platform wrapper for a DOM parent node that exists within a {@link Dom}.
 */
export interface DomParentNode extends DomNode {
  /**
   * Returns the first DOM element that matches the specified `selector` within this DOM node wrapper.
   *
   * @param selector - The selector to be used.
   * @return The wrapper for the first DOM element matching `selector` or `undefined` if none could be found.
   */
  find(selector: string): DomElement | undefined;

  /**
   * Returns all DOM elements that match the specified `selector` within this DOM node wrapper.
   *
   * @param selector - The selector to be used.
   * @return The DOM element wrappers matching `selector`.
   */
  findAll(selector: string): DomElement[];
}
