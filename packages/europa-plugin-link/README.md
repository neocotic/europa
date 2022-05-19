# europa-plugin-link

A [Europa](https://github.com/neocotic/europa) plugin to convert HTML tags to Markdown links.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-plugin-link.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-plugin-link/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-plugin-link.svg?style=flat-square)](https://npmjs.com/package/europa-plugin-link)

* [Install](#install)
* [Converted Tags](#converted-tags)
* [Examples](#examples)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-plugin-link
```

Then, in order to activate this plugin;

``` typescript
// Import europa-core implementation (e.g. `europa`, `node-europa`)
import plugin from 'europa-plugin-link';

Europa.registerPlugin(plugin);
// ...
```

However, this plugin belongs to the `europa-preset-default`, which is registered with all Europa Core implementations by default,
so you should not need to do anything to use this plugin.

## Converted Tags

The following HTML tags are converted by this plugin:

* `A`

## Examples

### Basic

HTML:

``` html
<a href="https://github.com/neocotic/europa">Europa</a>
<a href="https://github.com/neocotic/europa/tree/main/packages/europa-plugin-link" title="europa-plugin-link">Plugin</a>
```

Markdown:

``` markdown
[Europa][link1]
[Plugin][link2]

[link1]: https://github.com/neocotic/europa
[link2]: https://github.com/neocotic/europa/tree/main/packages/europa-plugin-link "europa-plugin-link"
```

### Absolute Option Enabled

Assume the following example is converted on <https://github.com/neocotic/europa>.

Setup:

``` typescript
const europa = new Europa({ absolute: true });
```

HTML:

``` html
<a href="./">Europa</a>
<a href="./packages/europa-plugin-link" title="europa-plugin-link">Plugin</a>
```

Markdown:

``` markdown
[Europa][link1]
[Plugin][link2]

[link1]: https://github.com/neocotic/europa
[link2]: https://github.com/neocotic/europa/tree/main/packages/europa-plugin-link "europa-plugin-link"
```

### Inline Option Enabled

Setup:

``` typescript
const europa = new Europa({ inline: true });
```

HTML:

``` html
<a href="https://github.com/neocotic/europa">Europa</a>
<a href="https://github.com/neocotic/europa/tree/main/packages/europa-plugin-link" title="europa-plugin-link">Plugin</a>
```

Markdown:

``` markdown
[Europa](https://github.com/neocotic/europa)
[Plugin](https://github.com/neocotic/europa/tree/main/packages/europa-plugin-link "europa-plugin-link")
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

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-plugin-link/LICENSE.md) for more information on
our MIT license.
