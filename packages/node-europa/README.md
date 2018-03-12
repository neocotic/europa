![Europa Node](https://cdn.rawgit.com/NotNinja/europa-branding/master/assets/banner/node-europa/node-europa-banner-754x200.png)

[Europa Node](https://github.com/NotNinja/europa/tree/master/packages/node-europa) is a [Node.js](https://nodejs.org)
module for converting HTML into valid Markdown using the
[Europa Core](https://github.com/NotNinja/europa/tree/master/packages/europa-core) engine.

[![Build Status](https://img.shields.io/travis/NotNinja/node-europa/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/europa)
[![License](https://img.shields.io/github/license/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/release/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/tree/master/packages/node-europa)

* [Install](#install)
* [Examples](#examples)
* [API](#api)
* [CLI](#cli)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using [npm](https://www.npmjs.com):

``` bash
$ npm install --save node-europa
```

You'll need to have at least [Node.js](https://nodejs.org) 6 or newer.

If you want to use the command line interface, you'll most likely want to install it globally so that you can run
`europa` from anywhere:

``` bash
$ npm install --global node-europa
```

Check out [Europa](https://github.com/NotNinja/europa/tree/master/packages/europa) if you want to install it for use
within the browser.

## Examples

``` javascript
const bodyParser = require('body-parser');
const express = require('express');
const Europa = require('node-europa');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const europa = new Europa();

app.post('/convert/html/md', (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  res.set('Content-Type', 'text/markdown; charset=utf-8');
  res.send(europa.convert(req.body.source));
});

app.listen(3000);
```

## API

TODO: Improve documentation within monorepo

You will find documentation for the API on [Europa](https://github.com/NotNinja/europa/tree/master/packages/europa).

Here's some things to note for this implementation:

* It comes with its own [command-line interface](#cli)!
* The base URI can be changed via the `baseUri` option. The default value is the current working directory using the
  `file` protocol.
* It's encouraged to call `Europa#release()` after jobs to free up resources.

## CLI

    Usage: europa [options] [file ...]

    Options:

      -h, --help            output usage information
      -V, --version         output the version number
      -a, --absolute        use absolute URLs for anchors/images
      -b, --base-uri <uri>  base URI for anchors/images
      -e, --eval <html>     evaluate HTML string
      -i, --inline          insert anchor/image URLs inline
      -o, --output <path>   output directory (for files) or file (for eval/stdin)

## Bugs

If you have any problems with Europa Node or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/europa/blob/master/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa Node contributors can be found in
[AUTHORS.md](https://github.com/NotNinja/europa/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/europa/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
