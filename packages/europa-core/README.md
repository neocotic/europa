![Europa Core](https://cdn.rawgit.com/NotNinja/europa-branding/master/assets/banner/europa-core/europa-core-banner-742x200.png)

[Europa Core](https://github.com/NotNinja/europa-core) is the core engine for
[Europa](https://github.com/NotNinja/europa)'s HTML to Markdown conversion as well as modules to support other
environments (e.g. [Europa Node](https://github.com/NotNinja/node-europa)).

[![Build Status](https://img.shields.io/travis/NotNinja/europa-core/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/europa-core)
[![Dependency Status](https://img.shields.io/david/NotNinja/europa-core.svg?style=flat-square)](https://david-dm.org/NotNinja/europa-core)
[![Dev Dependency Status](https://img.shields.io/david/dev/NotNinja/europa-core.svg?style=flat-square)](https://david-dm.org/NotNinja/europa-core?type=dev)
[![License](https://img.shields.io/npm/l/europa-core.svg?style=flat-square)](https://github.com/NotNinja/europa-core/blob/master/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-core.svg?style=flat-square)](https://www.npmjs.com/package/europa-core)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using `npm`:

``` bash
$ npm install --save europa-core
```

You will most likely never need to depend on `europa-core` directly. Instead, you will probably want to install a module
that supports your desired environment. For example:

* [europa](https://github.com/NotNinja/europa) for browser
* [node-europa](https://github.com/NotNinja/node-europa) for Node.js

## API

As this is the core of Europa, it contains all of the HTML to Markdown conversion logic and, since it's designed to use
the DOM as the model, all that consumers need to do is define and register an implementation of `WindowService`.

Most modules that use Europa Core will look something like the following:

``` javascript
var Europa = require('europa-core');
var WindowService = require('europa-core/src/service/window/WindowService');

var ExampleWindowService = WindowService.extend({
  getDefaultBaseUri: function() { /* ... */ },
  getWindow: function(baseUri) { /* ... */ },
  isCloseable: function(window) { /* ... */ }
});

Europa.use(new ExampleWindowService());

module.exports = Europa;
```

This allows the core to control the primary API and keep it consistent across all environments. With the above in place,
you are free to import Europa and use it as you would anywhere else.

You will find the primary API documentation on [Europa](https://github.com/NotNinja/europa). All direct consumers of
core should also reference this to help developers find the information easily. However, they are encouraged to provide
environment-specific examples.

## Bugs

If you have any problems with Europa Core or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/europa-core/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/europa-core/blob/master/CONTRIBUTING.md). We want your suggestions and
pull requests!

A list of Europa Core contributors can be found in
[AUTHORS.md](https://github.com/NotNinja/europa-core/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/europa-core/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
