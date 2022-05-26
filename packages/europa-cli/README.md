![Europa CLI](https://raw.githubusercontent.com/neocotic/europa-branding/main/assets/banner/europa-cli/europa-cli-banner-614x200.png)

[Europa CLI](https://github.com/neocotic/europa/tree/main/packages/europa-cli) is a CLI for converting HTML into valid
Markdown.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-cli.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-cli/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-cli.svg?style=flat-square)](https://npmjs.com/package/europa-cli)

* [Install](#install)
* [Examples](#examples)
* [CLI](#cli)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save-dev europa-cli
```

You'll need to have at least [Node.js](https://nodejs.org) 12.22.0 or newer.

That said; you'll most likely want to install it globally so that you can run `europa` from anywhere:

``` bash
$ npm install --global europa-cli
```

Check out [europa](https://github.com/neocotic/europa/tree/main/packages/europa),
[europa-worker](https://github.com/neocotic/europa/tree/main/packages/europa-worker), or
[node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa) if you want to install it for use
within a web browser, worker, or [Node.js](https://nodejs.org) respectively.

## Examples

Convert HTML from `STDIN` into Markdown:

``` bash
$ europa < index.html
```

Convert an HTML file into a Markdown file in another directory:

``` bash
$ europa index.html --output docs
```

## CLI

    Usage: europa [options] [file ...]

    Options:
      -V, --version         output the version number
      -a, --absolute        use absolute URLs for elements (e.g. anchors, images)
      -b, --base-uri <uri>  base URI for elements (e.g. anchors, images)
      -e, --eval <html>     evaluate HTML string
      --eol <character>     end of line character
      -i, --inline          insert URLs for elements (e.g. anchors, images) inline
      -o, --output <path>   output directory (for files) or file (for eval/stdin)
      -h, --help            display help for command

## Bugs

If you have any problems with Europa CLI or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-cli/LICENSE.md) for more information on
our MIT license.
