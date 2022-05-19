# europa-plugin-list

A [Europa](https://github.com/neocotic/europa) plugin to convert HTML tags to Markdown lists.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-plugin-list.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-plugin-list/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-plugin-list.svg?style=flat-square)](https://npmjs.com/package/europa-plugin-list)

* [Install](#install)
* [Converted Tags](#converted-tags)
* [Examples](#examples)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa-plugin-list
```

Then, in order to activate this plugin;

``` typescript
// Import europa-core implementation (e.g. `europa`, `node-europa`)
import plugin from 'europa-plugin-list';

Europa.registerPlugin(plugin);
// ...
```

However, this plugin belongs to the `europa-preset-default`, which is registered with all Europa Core implementations by default,
so you should not need to do anything to use this plugin.

## Converted Tags

The following HTML tags are converted by this plugin:

* `LI`
* `OL`
* `UL`

## Examples

### Ordered

HTML:

``` html
<ol>
  <li>First</li>
  <li>Second
    <ol>
      <li>Nested</li>
    </ol>
  </li>
  <li>Third</li>
</ol>
```

Markdown:

``` markdown
1. First
2. Second
  1. Nested
3. Third
```

### Unordered

HTML:

``` html
<ul>
  <li>First</li>
  <li>Second
    <ul>
      <li>Nested</li>
    </ul>
  </li>
  <li>Third</li>
</ul>
```

Markdown:

``` markdown
* First
* Second
  * Nested
* Third
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

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-plugin-list/LICENSE.md) for more information on
our MIT license.
