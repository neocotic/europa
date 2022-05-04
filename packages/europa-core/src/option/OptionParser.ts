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

import { Option } from 'europa-core/option/Option';

/**
 * Manages multiple {@link Option} instances that are intended to be used by multiple implementations/instances.
 */
export class OptionParser {
  /**
   * Creates an instance of {@link OptionParser} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(
    /** The available options for this {@link OptionParser}. */
    readonly options: readonly Option[],
  ) {}

  /**
   * Returns whether an option with the specified `name` is available.
   *
   * @param name - The name of the {@link Option} whose existence is to be checked.
   * @return `true` if an {@link Option} exists with `name`; otherwise `false`.
   */
  exists(name: string): boolean {
    return this.options.some((option) => option.name === name);
  }

  /**
   * Parses the specified `options`, extracting only properties that match valid options and applying default values
   * where required.
   *
   * @param options - The options to be parsed.
   * @return The parsed options.
   */
  parse(options: Record<string, any> | null | undefined): Record<string, any> {
    return this.options.reduce((acc, option) => {
      const { name } = option;

      acc[name] = options?.[name] ?? option.defaultValue;

      return acc;
    }, {} as Record<string, any>);
  }
}
