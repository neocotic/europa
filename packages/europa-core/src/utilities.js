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

/**
 * Contains utility methods that are useful throughout the library.
 *
 * @public
 */
class Utilities {

  /**
   * Left pads the <code>string</code> provided with the given padding string for the specified number of
   * <code>times</code>.
   *
   * @param {string} [string=""] - the string to be padded
   * @param {number} [times=0] - the number of times to pad <code>string</code>
   * @param {string} [padding=" "] - the padding string
   * @return {string} The padded <code>string</code>.
   * @public
   * @static
   */
  static leftPad(string = '', times = 0, padding = ' ') {
    if (!padding) {
      return string
    }

    for (let i = 0; i < times; i++) {
      string = padding + string
    }

    return string
  }

  /**
   * Throws an error indicating that the a given method on a specific class has not been implemented.
   *
   * @param {string} className - the name of the class on which the method has not been implemented
   * @param {string} methodName - the name of the method which has not been implemented
   * @return {void}
   * @throws {Error} The error describing the class method which has not been implemented.
   * @public
   * @static
   */
  static throwUnimplemented(className, methodName) {
    throw new Error(`"${methodName}" method must be implemented on the ${className} class`)
  }

}

export default Utilities
