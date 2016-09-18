/*
 * Copyright (C) 2016 Alasdair Mercer, Skelp
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

/* eslint no-unused-vars: "off" */

import { Utilities } from '../utilities'

/**
 * A service used to retrieve the <code>Window</code> object for transforming HTML to Markdown and, optionally, to close
 * it upon destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an
 * artificial browser environment.
 *
 * @public
 */
class WindowService {

  /**
   * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
   *
   * @param {Window} window - the <code>Window</code> to be closed
   * @return {void}
   * @public
   */
  closeWindow(window) {
    if (this.isCloseable(window)) {
      window.close()
    }
  }

  /**
   * Returns the base URI for the specified <code>window</code>.
   *
   * Implementations <b>must</b> override this method.
   *
   * @param {Window} window - the <code>Window</code> for which the base URI is to be returned
   * @return {string} The base URI for <code>window</code>.
   * @public
   * @abstract
   */
  getBaseUri(window) {
    Utilities.throwUnimplemented('WindowService', 'getBaseUri')
  }

  /**
   * Returns a <code>Window</code> to be used for transforming HTML to Markdown.
   *
   * Implementations <b>must</b> override this method.
   *
   * @return {Window} The <code>Window</code>.
   * @public
   * @abstract
   */
  getWindow() {
    Utilities.throwUnimplemented('WindowService', 'getWindow')
  }

  /**
   * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
   *
   * @param {Window} window - the <code>Window</code> to be checked
   * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
   * @public
   */
  isCloseable(window) {
    return false
  }

}

export { WindowService }
