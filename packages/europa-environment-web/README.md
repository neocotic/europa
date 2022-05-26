# europa-environment-web

A [Europa](https://github.com/neocotic/europa) environment for a web browser.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-environment-web.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-environment-web/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-environment-web.svg?style=flat-square)](https://npmjs.com/package/europa-environment-web)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-environment-web
```

You will most likely never need to depend on `europa-environment-web` directly. Instead, you will probably want to
install the [europa](https://github.com/neocotic/europa/tree/main/packages/europa) package in order to use Europa within
a web browser.

## API

``` typescript
import { EuropaCore, EuropaOptions } from 'europa-core';
import { WebEnvironment } from 'europa-environment-web';

const _environment = Symbol();

class Europa extends EuropaCore<Node, Element> {
  private static readonly [_environment] = new WebEnvironment();

  constructor(options?: EuropaOptions) {
    super({ environment: Europa[_environment], options });
  }
}
```

## Bugs

If you have any problems with this Europa environment or would like to see changes currently in development you can do
so [here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-environment-web/LICENSE.md) for more
information on our MIT license.
