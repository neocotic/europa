![Europa Test](https://raw.githubusercontent.com/neocotic/europa-branding/main/assets/banner/europa-test/europa-test-banner-710x200.png)

[Europa Test](https://github.com/neocotic/europa/tree/main/packages/europa-test) is a framework for testing
[Europa Core](https://github.com/neocotic/europa/tree/main/packages/europa-core) implementations.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-test.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-test/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-test.svg?style=flat-square)](https://npmjs.com/package/europa-test)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save-dev europa-test
```

You will most likely never need to depend on `europa-test` as it's only intended to be used to provide some general test
coverage for [Europa Core](https://github.com/neocotic/europa/tree/main/packages/europa-core) implementations. For
example:

* [europa](https://github.com/neocotic/europa/tree/main/packages/europa)
* [node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa)

Your implementation will also need to have `jasmine` installed as dependencies as these are used by this framework.
This too can be installed using your preferred package manager. For example;

``` bash
$ npm install --save-dev jasmine
```

## API

As this framework has to work in various environments, it only provides a high level test coverage of the core engine
using a selection of fixtures. In order to use this framework, you only have to provide `Europa`, loaded with your
implementation's `WindowService`, and a function which can be used to asynchronously load the test fixtures within this
framework on demand.

Most modules that use Europa Test will look something like the following:

``` typescript
import testEuropa from 'europa-test';

import Europa from '../path/to/ExampleEuropa';

testEuropa({
  Europa,
  loadFixture: (path) => someAsyncFileLoader(`../path/to/node_modules/europa-test/${path}`),
});
```

## Bugs

If you have any problems with Europa Test or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-test/LICENSE.md) for more information on
our MIT license.
