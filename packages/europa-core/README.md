![Europa Core](https://cdn.rawgit.com/neocotic/europa-branding/master/assets/banner/europa-core/europa-core-banner-742x200.png)

[Europa Core](https://github.com/neocotic/europa/tree/main/packages/europa-core) is the core engine for
[Europa](https://github.com/neocotic/europa)'s HTML to Markdown conversion.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/develop?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-core.svg?style=flat-square)](https://github.com/neocotic/europa/blob/main/LICENSE.md)
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

* [europa](https://github.com/neocotic/europa/tree/main/packages/europa) for browser
* [node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa) for Node.js

## API

As this is the core of Europa, it contains all the HTML to Markdown conversion logic and, since it's designed to use the
DOM as the model, all that consumers need to do is define and register an implementation of `WindowService`.

Most modules that use Europa Core will look something like the following:

``` javascript
import { Europa, WindowService } from 'europa-core';

class ExampleWindowService extends WindowService {
  getDefaultBaseUri() { /* ... */ },
  getWindow(baseUri) { /* ... */ },
  isCloseable(window) { /* ... */ }
}

Europa.use(new ExampleWindowService());

export default Europa;
```

This allows the core to control the primary API and keep it consistent across all environments. With the above in place,
you are free to import Europa and use it as you would anywhere else.

You will find the primary API documentation on [Europa](https://github.com/neocotic/europa/tree/main/packages/europa).
All direct consumers of core should also reference this to help developers find the information easily. However, they
are encouraged to provide environment-specific examples.

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
