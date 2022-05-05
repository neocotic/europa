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

import { Writable } from 'stream';
import { Logger, createLogger as createWinstonLogger, format, transports } from 'winston';

/**
 * Creates a logger using the `options` provided.
 *
 * It's only expected that a single logger is created using this function and that any other loggers are created as a
 * child of that. For example;
 *
 * ```
 * const rootLogger = createLogger();
 * const childLogger = rootLogger.child({ name: 'Child' });
 * ```
 *
 * @param [options] - The options to be used.
 * @return A logger.
 */
export function createLogger(options: CreateLoggerOptions = {}): Logger {
  const transportLevel = options.level ?? 'info';
  const transportStream = options.outputStream ?? process.stdout;

  return createWinstonLogger({
    format: format.combine(
      format.errors({ stack: true }),
      format.colorize(),
      format.printf(({ level, message, timestamp, ...meta }) => {
        return `${level} [${meta.name || 'ROOT'}] ${getMessage(message, meta.stack)}`;
      }),
    ),
    transports: [new transports.Stream({ level: transportLevel, stream: transportStream })],
  });
}

function getMessage(message: string, stack: any): string {
  if (!message) {
    return stack || '';
  }
  if (stack) {
    return stack;
  }
  return message;
}

/**
 * The options used by {@link createLogger}.
 */
export type CreateLoggerOptions = {
  /**
   * The logging level to be used. Defaults to "info".
   */
  readonly level?: string;
  /**
   * The `Writable` to which logging output should be written. Defaults to the standard output stream.
   */
  readonly outputStream?: Writable;
};

/**
 * Options that can be used to create a {@link Logger}.
 */
export type LoggableOptions = {
  /**
   * The `Writable` to which logging output should be written. Defaults to the standard output stream.
   */
  readonly outputStream?: Writable;
  /**
   * The parent logger to be used to create any children loggers. Creates a new root logger by default.
   */
  readonly parentLogger?: Logger;
};
