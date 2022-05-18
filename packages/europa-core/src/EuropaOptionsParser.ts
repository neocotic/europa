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

import { EuropaOptions } from 'europa-core/Europa';
import { WindowService } from 'europa-core/service/window/WindowService';

const _windowService = Symbol();

/**
 * A parser for {@link EuropaOptions} that provides null safety and supports default value resolution.
 */
export class EuropaOptionsParser {
  private readonly [_windowService]: WindowService;

  /**
   * Creates an instance of {@link EuropaOptionsParser} using the `options` provided.
   *
   * @param options - The options to be used.
   */
  constructor(options: EuropaOptionsParserOptions) {
    this[_windowService] = options.windowService;
  }

  /**
   * Parses the specified `options`, extracting only properties that match valid options and applying default values
   * where required.
   *
   * @param options - The options to be parsed.
   * @return The parsed options.
   */
  parse(options: EuropaOptions | null | undefined): Required<EuropaOptions> {
    function setOption<N extends keyof MutableEuropaOptions>(
      options: MutableEuropaOptions,
      name: N,
      value: MutableEuropaOptions[N],
    ) {
      options[name] = value;
    }

    const definitions: EuropaOptionDefinitions = {
      absolute: false,
      baseUri: () => this[_windowService].getDefaultBaseUri(),
      inline: false,
    };

    return Object.entries(definitions).reduce((acc, [name, defaultValue]) => {
      const optionName = name as keyof EuropaOptions;
      const optionValue = options?.[optionName] ?? (typeof defaultValue === 'function' ? defaultValue() : defaultValue);

      setOption(acc, optionName, optionValue);

      return acc;
    }, {} as MutableEuropaOptions);
  }
}

/**
 * The options used by {@link EuropaOptionsParser}.
 */
export type EuropaOptionsParserOptions = {
  /**
   * The {@link WindowService} to be used to derive the default base URI, if needed.
   */
  readonly windowService: WindowService;
};

type EuropaOptionDefinitions = {
  [N in keyof EuropaOptions]-?: NonNullable<EuropaOptions[N]> | (() => NonNullable<EuropaOptions[N]>);
};

type MutableEuropaOptions = {
  -readonly [N in keyof EuropaOptions]-?: EuropaOptions[N];
};
