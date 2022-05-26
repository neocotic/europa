![Europa](https://raw.githubusercontent.com/neocotic/europa-branding/main/assets/banner/europa/europa-banner-500x200.png)

[Europa](https://github.com/neocotic/europa/tree/main/packages/europa) is a library for converting HTML into valid
Markdown within a web browser.

[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg?style=flat-square)](https://codepen.io/neocotic/pen/YzeKvzG)
[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa.svg?style=flat-square)](https://npmjs.com/package/europa)

* [Install](#install)
* [Examples](#examples)
* [API](#api)
* [Plugins](#plugins)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save europa
```

If you want to simply download the file to be used in the browser you can find them on
[cdnjs](https://cdnjs.com/libraries/europa).

Check out [europa-worker](https://github.com/neocotic/europa/tree/main/packages/europa-worker),
[node-europa](https://github.com/neocotic/europa/tree/main/packages/node-europa), or
[europa-cli](https://github.com/neocotic/europa/tree/main/packages/europa-cli) if you want to install it for use within
a worker, [Node.js](https://nodejs.org), or as a CLI respectively.

## Examples

``` html
<!DOCTYPE html>
<html>
  <body>
    <p class="lead">We &hearts; <b>Europa</b>!</p>

    <textarea id="html"></textarea>
    <textarea id="markdown"></textarea>

    <script src="/path/to/europa.js"></script>
    <script>
      (() => {
        const europa = new Europa();
        const html = document.getElementById('html');
        const markdown = document.getElementById('markdown');

        html.addEventListener('input', () => {
          markdown.value = europa.convert(html.value);
        });
      })();
    </script>
  </body>
</html>
```

Open up `demo.html` in your browser to play around a bit.

## API

Simply create an instance of `Europa` and you've done most of the work. You can control many aspects of the HTML to
Markdown conversion by passing the following options to the constructor:

| Option     | Type    | Description                                                                         | Default            |
|------------|---------|-------------------------------------------------------------------------------------|--------------------|
| `absolute` | Boolean | Whether absolute URLs should be used for elements (e.g. anchors, images)            | `false`            |
| `baseUri`  | String  | The base URI used to resolve relative URLs used for elements (e.g. anchors, images) | `document.baseURI` |
| `eol`      | String  | The end of line character to be inserted into generated Markdown                    | `"\n"`             |
| `inline`   | Boolean | Whether URLs for elements (e.g. anchors, images) are to be inserted inline          | `false`            |

``` typescript
const europa = new Europa({
  absolute: true,
  baseUri: 'https://example.com',
  eol: '\r\n',
  inline: true,
});
```

### `convert(input)`

Converts the specified `input` into Markdown.

`input` can either be an HTML string or DOM node(s) to be converted into Markdown.

``` typescript
const europa = new Europa();

europa.convert('<blockquote><b>Europa</b> is great!</blockquote>');
//=> "> **Europa** is great!"
europa.convert(document.querySelector('.lead'));
//=> "_Everyone_ ♥ **Europa**!"

const div = document.createElement('div');
div.innerHTML = 'Please keep my <span style="display: none">treasure</span> secret safe...';

europa.convert(div);
//=> "Please keep my secret safe..."
```

## Plugins

Europa is fully pluggable and is packed with default plugins in order to get full support for basic Markdown. It
enables the creation of external plugins to further extend Europa's capabilities to support extended Markdown syntax or
even new HTML elements should they not be added to Europa quick enough for you.

Plugins are packaged independently, however, the default plugins are included in
[europa-preset-default](https://github.com/neocotic/europa/tree/main/packages/europa-preset-default) and is bundled with
[Europa Core](https://github.com/neocotic/europa/tree/main/packages/europa-core) so that they are available to all
implementations with no extra effort.

The API for plugins is simple on a high level, but you'll need to get to grips with the internal API to understand what
you can really do:

``` typescript
import Europa from 'europa';
import { Plugin, PluginApi } from 'europa-core';

const examplePluginProvider = (api: PluginApi): Plugin => ({
  // All fields and methods are optional
  converters: {
    TAGNAME: {
      startTag(conversion, context): boolean { /* ... */ },
      endTag(conversion, context) { /* ... */ },
    },
  },
  convertText(value, conversion): boolean { /* ... */ },
  startConversion(conversion) { /* ... */ },
  endConversion(conversion) { /* ... */ },
});

Europa.registerPlugin(examplePluginProvider);
```

It's highly recommended to look at existing plugins to get a better understanding of how things work.

Since multiple plugins could support the same tag(s), the load order is important as the last plugin loaded that
declares support for a tag, will be the one that's used. Be wary of overriding tags supported by default plugins and
consider whether it's something that should be part of the original plugin. If so, [open a pull request](#contributors)!

A good practice for naming plugin packages is `europa-plugin-<markdown-feature>`. For example; `europa-plugin-link` and
not `europa-plugin-a`, and `europa-plugin-quote` and not `europa-plugin-q`. Each plugin should aim to support a specific
Markdown feature.

Take a look at [Europa Build](https://github.com/neocotic/europa/tree/main/packages/europa-build) to quickly generate a
Europa plugin package.

### Presets

Europa also has the concept of a "preset", which is essentially a bundle of plugins. In fact, all the default plugins
are provided by a default preset.

A preset simply imports a collection of plugins and declares them so that they can be registered together. For example;

``` typescript
import Europa from 'europa';
import { PluginApi, PluginProvider, Preset } from 'europa-core';
import examplePluginProvider from 'europa-plugin-example';

const pluginProviders: PluginProvider[] = [
  examplePluginProvider,
  // ...
];

const examplePresetProvider = (api: PluginApi): Preset => ({
  // All fields and methods are optional
  plugins: pluginProviders.map((pluginProvider) => pluginProvider(api)),
});

Europa.registerPreset(examplePresetProvider);
```

A good practice for naming preset packages is `europa-preset-<markdown-feature-set>`. For example;
`europa-preset-github` could be used to register plugins that converts HTML to GitHub-flavoured Markdown. Each preset
should include plugins that aim to support a related Markdown feature set.

Take a look at [Europa Build](https://github.com/neocotic/europa/tree/main/packages/europa-build) to quickly generate a
Europa preset package.

## Bugs

If you have any problems with Europa or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa/LICENSE.md) for more information on our MIT
license.
