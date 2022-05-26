# europa-dom-cheerio

A [Europa](https://github.com/neocotic/europa) DOM wrapper using [cheerio](https://cheerio.js.org).

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-dom-cheerio.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-dom-cheerio/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-dom-cheerio.svg?style=flat-square)](https://npmjs.com/package/europa-dom-cheerio)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-dom-cheerio
```

You will most likely never need to depend on `europa-dom-cheerio` directly. Instead, you will probably want to install
either the [node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa) or
[europa-worker](https://github.com/neocotic/europa/tree/main/packages/europa-worker) package in order to use Europa
within [Node.js](https://nodejs.org) or a web worker.

## API

``` typescript
import { Dom, Environment } from 'europa-core';
import { AnyNode, CheerioDom, CheerioDomRoot, Element } from 'europa-dom-cheerio';

const _dom = Symbol();

class ExampleEnvironment implements Environment<AnyNode, Element> {
  private readonly [_dom] = new CheerioDom();

  getDefaultBaseUri(): string { /* ... */ }

  getDefaultEndOfLineCharacter(): string { /* ... */ }

  getDom(): Dom<AnyNode, Element, CheerioDomRoot> {
    return this[_dom];
  }

  resolveUrl(baseUri: string, url: string): string { /* ... */ }
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

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-dom-cheerio/LICENSE.md) for more
information on our MIT license.
