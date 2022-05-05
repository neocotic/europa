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
import { ServiceName } from 'europa-core/service/ServiceName';
import { CharsetService } from 'europa-core/service/charset/CharsetService';
import { WindowService } from 'europa-core/service/window/WindowService';

const _services = Symbol('services');

/**
 * A basic manager for {@link Service} implementations that are mapped to simple names.
 */
export class ServiceManager {
  private readonly [_services]: { [name in ServiceName]?: Service } = {};

  /**
   * Returns the {@link CharsetService} implementation being managed.
   *
   * @param name - The name of the {@link Service} to be returned.
   * @return The {@link CharsetService} being managed.
   * @throws If no {@link CharsetService} is being managed with `name`.
   */
  getService(name: ServiceName.Charset): CharsetService;

  /**
   * Returns the {@link WindowService} implementation being managed.
   *
   * @param name - The name of the {@link Service} to be returned.
   * @return The {@link WindowService} being managed.
   * @throws If no {@link WindowService} is being managed with `name`.
   */
  getService(name: ServiceName.Window): WindowService;

  /**
   * Returns the {@link Service} being managed with the specified `name`.
   *
   * @param name - The name of the {@link Service} to be returned.
   * @return The {@link Service} being managed with `name`.
   * @throws If no {@link Service} is being managed with `name`.
   */
  getService<S extends Service>(name: ServiceName): S {
    const service = this[_services][name];
    if (!service) {
      throw new Error(`Service is not being managed with name: ${name}`);
    }

    return service as S;
  }

  /**
   * Sets the {@link Service} implementation to be managed for the specified `name` to the `service` provided.
   *
   * @param name - The name of the {@link Service} to be managed.
   * @param service - The {@link Service} implementation to be managed.
   * @throws If a {@link Service} is already being managed with the same `name`.
   */
  setService(name: ServiceName, service: Service) {
    if (this[_services][name]) {
      throw new Error(`Service is already managed with name: ${name}`);
    }

    if (service) {
      this[_services][name] = service;
    }
  }
}
