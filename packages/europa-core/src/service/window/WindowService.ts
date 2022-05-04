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

import { Service } from 'europa-core/service/Service';

/**
 * A service used to retrieve the window object for converting HTML to Markdown and, optionally, to close it upon
 * destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an artificial
 * browser environment.
 */
export abstract class WindowService extends Service {
  /**
   * Closes the specified `window` but only if this {@link WindowService} is closeable.
   *
   * @param window - The window to be closed.
   */
  closeWindow(window: Window) {
    if (this.isCloseable(window)) {
      window.close();
    }
  }

  /**
   * Returns the default base URI for windows provided by this {@link WindowService}.
   *
   * Implementations of {@link WindowService} **must** override this method with their own specific logic.
   *
   * @return The default base URI.
   */
  abstract getDefaultBaseUri(): string;

  override getName(): string {
    return 'window';
  }

  /**
   * Returns a window to be used for converting HTML to Markdown using the base URI provided.
   *
   * It's important to note that the base URI cannot be changed in some environments, in which case `baseUri` will be
   * ignored.
   *
   * Implementations of {@link WindowService} **must** override this method with their own specific logic.
   *
   * @param baseUri - The base URI to be used.
   * @return The window.
   */
  abstract getWindow(baseUri: string): Window;

  /**
   * Returns whether the specified `window` which was retrieved by this {@link WindowService} is closeable.
   *
   * The default implementation of this method will always return `false`.
   *
   * @param window - The window to be checked.
   * @return `true` if `window` is closeable; otherwise `false`.
   */
  isCloseable(window: Window): boolean {
    return false;
  }
}
