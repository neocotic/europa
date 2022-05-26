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

import { Dom, Environment } from 'europa-core';
import { WebDom, WebDomRoot } from 'europa-dom-web';

const _dom = Symbol();

/**
 * An implementation of {@link Environment} intended for use within a web browser.
 */
export class WebEnvironment implements Environment<Node, Element> {
  private readonly [_dom] = new WebDom();

  getDefaultBaseUri(): string {
    return window.document.baseURI;
  }

  getDefaultEndOfLineCharacter(): string {
    return '\n';
  }

  getDom(): Dom<Node, Element, WebDomRoot> {
    return this[_dom];
  }

  resolveUrl(baseUri: string, url: string): string {
    const resolvedUrl = new URL(url, new URL(baseUri, 'resolve://'));
    if (resolvedUrl.protocol === 'resolve:') {
      // `baseUri` is a relative URL
      const { pathname, search, hash } = resolvedUrl;

      return `${pathname}${search}${hash}`;
    }

    return resolvedUrl.toString();
  }
}
