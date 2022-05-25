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

const _map = Symbol();

/**
 * Contains contextual information relating to a {@link Conversion}; either globally or a limited scope single element
 * conversion.
 *
 * The scope of entries can be restricted further by using symbols as keys.
 */
export class ConversionContext {
  private readonly [_map] = new Map<ConversionContextKey, any>();

  /**
   * Deletes the entry for the specified `key` from this {@link ConversionContext}.
   *
   * @param key - The key whose entry is to be deleted.
   * @return A reference to this {@link ConversionContext} for chaining purposes.
   */
  delete(key: ConversionContextKey): this {
    this[_map].delete(key);

    return this;
  }

  /**
   * Iterates over all non-private entries within this {@link ConversionContext}, calling `callback` for each entry.
   *
   * Private entries are those set using a symbol as a key.
   *
   * @param callback - The function to be called for each non-private entry.
   * @return A reference to this {@link ConversionContext} for chaining purposes.
   */
  forEach(callback: (key: string, value: any) => void): this {
    for (const [key, value] of this[_map]) {
      if (typeof key === 'string') {
        callback(key, value);
      }
    }

    return this;
  }

  /**
   * Returns the value of the entry with the specified `key` within this {@link ConversionContext}.
   *
   * An error is thrown if no entry was found for `key`.
   *
   * @param key - The key of the entry whose value is to be returned.
   * @return The entry value for `key`.
   * @throws If no entry exists for `key`.
   */
  get<T = any>(key: ConversionContextKey): T {
    const value = this[_map].get(key);
    if (typeof value === 'undefined') {
      const keyType = typeof key === 'string' ? '' : 'private ';

      throw new Error(`Cannot find context value for ${keyType}key: '${String(key)}'`);
    }

    return value;
  }

  /**
   * Returns whether an entry for the specified `key` exists within this {@link ConversionContext}.
   *
   * @param key - The key to be checked.
   * @return A reference to this {@link ConversionContext} for chaining purposes.
   */
  has(key: ConversionContextKey): boolean {
    return this[_map].has(key);
  }

  /**
   * Returns the keys for all non-private entries within this {@link ConversionContext}.
   *
   * Private entries are those set using a symbol as a key.
   *
   * @return The keys for non-private entries.
   */
  keys(): string[] {
    return this.map((key) => key);
  }

  /**
   * Iterates over all non-private entries within this {@link ConversionContext}, calling `callback` for each entry in
   * order to map its key/value pair, returning the results of all mapped entries.
   *
   * Private entries are those set using a symbol as a key.
   *
   * @param callback - The function to be called for each non-private entry.
   * @return The mapped non-private entries.
   */
  map<T>(callback: (key: string, value: any) => T): T[] {
    const results: T[] = [];

    this.forEach((key, value) => results.push(callback(key, value)));

    return results;
  }

  /**
   * Sets the value of the entry with the specified `key` within this {@link ConversionContext} to `value`.
   *
   * The entry can be considered private if `key` is a symbol.
   *
   * @param key - The key of the entry whose value is to be set.
   * @param value - The value to be set.
   * @return A reference to this {@link ConversionContext} for chaining purposes.
   */
  set<T = any>(key: ConversionContextKey, value: T): this {
    this[_map].set(key, value);

    return this;
  }

  /**
   * Returns the values for all non-private entries within this {@link ConversionContext}.
   *
   * Private entries are those set using a symbol as a key.
   *
   * @return The values for non-private entries.
   */
  values(): any[] {
    return this.map((_, value) => value);
  }
}

/**
 * A key which can be used to store contextual information within a {@link ConversionContext}.
 *
 * The scope of an entry can be restricted further by using a symbol.
 */
export type ConversionContextKey = string | symbol;
