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

import { Dom } from 'europa-core/environment/dom/Dom';
import { DomRoot } from 'europa-core/environment/dom/DomRoot';

/**
 * Defines the environment in which the {@link EuropaCore} implementation exists.
 */
export interface Environment<N, E extends N> {
  /**
   * Returns the default base URI to be used when resolving absolute URLs.
   *
   * @return The default base URI.
   */
  getDefaultBaseUri(): string;

  /**
   * Returns the default end of line character to be inserted into generated Markdown.
   *
   * @return The default end of line character.
   */
  getDefaultEndOfLineCharacter(): string;

  /**
   * Returns the DOM wrapper to be used in this {@link Environment}.
   *
   * This method should always return the same {@link Dom} instance when called multiple times.
   *
   * @return The {@link Dom}.
   */
  getDom(): Dom<N, E, DomRoot>;

  /**
   * Returns the specified `url` relative to the `baseUri` provided in a manner similar to that of a web browser
   * resolving an anchor element.
   *
   * A relative URL may still be returned but only if `baseUri` itself is relative.
   *
   * @param baseUri - The base URI to use if `url` is a relative URL.
   * @param url - The target URL to resolve.
   * @return The resolved `url`.
   */
  resolveUrl(baseUri: string, url: string): string;
}
