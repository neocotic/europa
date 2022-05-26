![Europa Core](https://raw.githubusercontent.com/neocotic/europa-branding/main/assets/banner/europa-core/europa-core-banner-742x200.png)

[Europa Core](https://github.com/neocotic/europa/tree/main/packages/europa-core) is the core engine for
[Europa](https://github.com/neocotic/europa)'s HTML to Markdown conversion.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-core.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-core/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-core.svg?style=flat-square)](https://npmjs.com/package/europa-core)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-core
```

You will most likely never need to depend on `europa-core` directly. Instead, you will probably want to install a module
that supports your desired environment. For example:

* [europa](https://github.com/neocotic/europa/tree/main/packages/europa) for a web browser
* [europa-worker](https://github.com/neocotic/europa/tree/main/packages/europa) for a worker
* [node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa) for [Node.js](https://nodejs.org)

## API

As this is the core of Europa, it contains all the HTML to Markdown conversion logic and, since it's designed to use the
DOM as the model, all implementations need to do is provide an `Environment`. Although, it's typically recommended that
they also ensure that
[europa-preset-default](https://github.com/neocotic/europa/tree/main/packages/europa-preset-default) is also registered.

A typical implementation module of Europa Core will look something like the following:

``` typescript
import { Dom, Environment, EuropaCore, EuropaOptions } from 'europa-core';
import defaultPresetProvider from 'europa-preset-default';

class ExampleEnvironment implements Environment<any, any> {
  getDefaultBaseUri(): string { /* ... */ }

  getDefaultEndOfLineCharacter(): string { /* ... */ }

  getDom(): Dom<any, any, any> { /* ... */ }

  resolveUrl(baseUri: string, url: string): string { /* ... */ }
}

const _environment = Symbol();

class Europa extends EuropaCore<any, any> {
  private static readonly [_environment] = new ExampleEnvironment();

  constructor(options?: EuropaOptions) {
    super({ environment: Europa[_environment], options });
  }
}

Europa.registerPreset(defaultPresetProvider);

export default Europa;
```

This allows Europa Core to control the primary API and keep it consistent across all environments. With the above in
place, you are free to import Europa and use it as you would anywhere else. The bulk of the complexity typically lies
within implementing the `Dom`.

You will find the primary API documentation on one of the official Europa Core implementation packages (e.g.
[europa](https://github.com/neocotic/europa/tree/main/packages/europa),
[europa-worker](https://github.com/neocotic/europa/tree/main/packages/europa-worker),
[node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa)). All Europa Core implementations
should also reference this to help developers find the information easily. However, they are encouraged to provide
environment-specific examples.

## Bugs

If you have any problems with Europa Core or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-core/LICENSE.md) for more information on
our MIT license.
