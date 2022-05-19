# europa-preset-default

The default [Europa](https://github.com/neocotic/europa) preset.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-preset-default.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-preset-default/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-preset-default.svg?style=flat-square)](https://npmjs.com/package/europa-preset-default)

* [Install](#install)
* [Plugins](#plugins)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-preset-default
```

Then, in order to activate this preset;

``` typescript
// Import europa-core implementation (e.g. `europa`, `node-europa`)
import preset from 'europa-preset-default';

Europa.registerPreset(preset);
// ...
```

However, Europa Core implementations automatically register this preset by default, so you should not need to do
anything to use this preset and all of its plugins.

## Plugins

The following [Europa](https://github.com/neocotic/europa) plugins are included in this preset:

* [europa-plugin-bold](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-bold)
* [europa-plugin-code](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-code)
* [europa-plugin-description](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-description)
* [europa-plugin-details](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-details)
* [europa-plugin-header](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-header)
* [europa-plugin-horizontal-rule](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-horizontal-rule)
* [europa-plugin-image](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-image)
* [europa-plugin-italic](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-italic)
* [europa-plugin-line-break](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-line-break)
* [europa-plugin-link](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-link)
* [europa-plugin-list](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-list)
* [europa-plugin-paragraph](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-paragraph)
* [europa-plugin-preformatted](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-preformatted)
* [europa-plugin-quote](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-quote)

## Bugs

If you have any problems with this Europa preset or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-preset-default/LICENSE.md) for more information on
our MIT license.
