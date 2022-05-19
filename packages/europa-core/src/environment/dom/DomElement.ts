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

import { DomParentNode } from 'europa-core/environment/dom/DomParentNode';

/**
 * A cross-platform wrapper for a DOM element that exists within a {@link Dom}.
 */
export interface DomElement extends DomParentNode {
  /**
   * Returns the value of the attribute with the specified `name` on the wrapped DOM element.
   *
   * @param name - The name of the attribute whose value is to be returned.
   * @return The value of the named attribute or `undefined` if no attribute exists for `name`.
   */
  attr(name: string): string | undefined;

  /**
   * Returns the value of the style property with the specified `name` on the wrapped DOM element.
   *
   * `name` should always be provided in camel case.
   *
   * @param name - The name of the style property whose value is to be returned.
   * @return The value of the named style property or `undefined` if no property exists for `name`.
   */
  css(name: string): string | undefined;

  /**
   * Checks whether the wrapped DOM element has an attribute with the specified `name`.
   *
   * @param name - The name of the attribute to be checked.
   * @return `true` if an attribute exists for `name` on the wrapped DOM element; otherwise `false`.
   */
  hasAttr(name: string): boolean;

  /**
   * Returns the inner HTML of the wrapped DOM element.
   *
   * @return The inner HTML.
   */
  innerHtml(): string;

  /**
   * Returns the outer HTML of the wrapped DOM element.
   *
   * @return The outer HTML.
   */
  outerHtml(): string;

  /**
   * Returns the value of the property with the specified `name` on the wrapped DOM element.
   *
   * @param name - The name of the property whose value is to be returned.
   * @return The value of the named property or `undefined` if no property exists for `name`.
   */
  prop(name: string): any;

  /**
   * Returns the upper case tag name of the wrapped DOM element.
   *
   * @return The tag name.
   */
  tagName(): string;
}
