# europa-plugin-code

A [Europa](https://github.com/neocotic/europa) plugin to convert HTML tags to Markdown inline code.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/develop?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-plugin-code.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-plugin-code/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-plugin-code.svg?style=flat-square)](https://npmjs.com/package/europa-plugin-code)

* [Install](#install)
* [Converted Tags](#converted-tags)
* [Examples](#examples)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-plugin-code
```

Then, in order to activate this plugin;

``` javascript
// Import europa-core implementation (e.g. `europa`, `node-europa`)
import plugin from 'europa-plugin-code';

Europa.registerPlugin(plugin);
// ...
```

However, this plugin belongs to the `europa-preset-default`, which is registered with all Europa Core implementations by default,
so you should not need to do anything to use this plugin.

## Converted Tags

The following HTML tags are converted by this plugin:

* `CODE`
* `KBD`
* `SAMP`

## Examples

### Basic

HTML:

``` html
Call <code>Europa.registerPlugin</code> to register this plugin
```

Markdown:

``` markdown
Call `Europa.registerPlugin` to register this plugin
```

## Bugs

If you have any problems with this Europa plugin or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-plugin-code/LICENSE.md) for more information on
our MIT license.
