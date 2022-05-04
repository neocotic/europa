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

const _defaultValue = Symbol('defaultValue');

/**
 * Defines an available option.
 */
export class Option {
  private readonly [_defaultValue]: any;

  /**
   * Creates an instance of `Option` using the `name` provided.
   *
   * If `defaultValue` is a function, it will be called if/when needed and the return value will be used as the default
   * value. If the default value is to be a function itself, then `defaultValue` must return that function.
   *
   * @param name - The name to be used.
   * @param [defaultValue] - The default value to be used.
   */
  constructor(
    /** The name for this {@link Option}. */
    readonly name: string,
    defaultValue: any,
  ) {
    this[_defaultValue] = defaultValue;
  }

  /**
   * The default value for this {@link Option}.
   */
  get defaultValue(): any {
    const defaultValue = this[_defaultValue];
    return typeof defaultValue === 'function' ? defaultValue.call(this) : defaultValue;
  }
}
