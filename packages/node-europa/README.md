![Europa Node](https://raw.githubusercontent.com/neocotic/europa-branding/main/assets/banner/node-europa/node-europa-banner-754x200.png)

[Europa Node](https://github.com/neocotic/europa/tree/main/packages/node-europa) is a [Node.js](https://nodejs.org)
module for converting HTML into valid Markdown.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/node-europa.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/node-europa/LICENSE.md)
[![Release](https://img.shields.io/npm/v/node-europa.svg?style=flat-square)](https://npmjs.com/package/node-europa)

* [Install](#install)
* [Examples](#examples)
* [API](#api)
* [CLI](#cli)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save node-europa
```

You'll need to have at least [Node.js](https://nodejs.org) 12.22.0 or newer.

If you want to use the command line interface, you'll most likely want to install it globally so that you can run
`europa` from anywhere:

``` bash
$ npm install --global node-europa
```

Check out [europa](https://github.com/neocotic/europa/tree/main/packages/europa) if you want to install it for use
within the browser.

## Examples

``` javascript
const Europa = require('node-europa');
const express = require('express');

const app = express();

app.get('/md', (req, res) => {
  const europa = new Europa();

  res.set('Content-Type', 'text/markdown; charset=utf-8');
  res.send(europa.convert('<a href="https://github.com/neocotic/europa">Europa</a>'));
});

app.listen(3000);
```

## API

Simply create an instance of `Europa` and you've done most of the work. You can control many aspects of the HTML to
Markdown conversion by passing the following options to the constructor:

| Option   | Type    | Description                                           | Default                   |
|----------|---------|-------------------------------------------------------|---------------------------|
| absolute | Boolean | Whether absolute URLS should be used for links/images | `false`                   |
| baseUri  | String  | The base URI for the window                           | `file://${process.cwd()}` |
| inline   | Boolean | Whether link/image URLs are to be inserted inline     | `false`                   |

``` javascript
const europa = new Europa({
  absolute: true,
  baseUri: 'https://example.com',
  inline: true
});
```

### `convert(html)`

Converts the specified `html` into Markdown.

`html` can either be an HTML string or a DOM element whose HTML contents are to be converted into Markdown.

``` javascript
const europa = new Europa();

europa.convert('<blockquote>This <i>is</i> great!</blockquote>');
//=> "> This *is* great!"
europa.convert(document.querySelector('.lead'));
//=> "We ♥ **Europa**!"

const div = document.createElement('div');
div.innerHTML = 'Please keep my <span style="display: none">treasure</span> secret safe...';

europa.convert(div);
//=> "Please keep my secret safe..."
```

## `release()`

Releases the window being used.

As `node-europa` uses virtual windows and, since each `Europa` instance will have its own window, calling this method
when you're done with the instance can help to free up resources.

However, a new window will be used if you attempt to call `convert` on the same instance. So you don't have to worry
about creating lots of instances, just ensuring that you `release` them after its done its job to free up resources.

Windows are only ever created when `convert` is called and *not* when you instantiate `Europa`!

You may well want to keep the window "open" in order to speed up consecutive conversions (e.g. in an iteration).

``` javascript
cpmst europa = new Europa({ inline: true });

const input = [
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>',
  '<p>Etiam sed felis ligula. Maecenas sit amet tristique risus...</p>',
  '<p>In dictum consequat nulla at lobortis...</p>'
];
const output = input.map((html) => europa.convert(html));

europa.release();

// ...

europa.convert('Wow! <a href="https://github.com/neocotic/europa">Europa</a> is awesome!');
//=> "Wow! [Europa](https://github.com/neocotic/europa) is awesome!"
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

``` javascript
Europa.registerPlugin((api) => ({
  name: 'europa-plugin-example',
  // Everything below is optional
  converters: {
    TAGNAME: {
      startTag(conversion, context) { /* ... */ },
      endTag(conversion, context) { /* ... */ },
    },
  },
  startConversion(conversion) { /* ... */ },
  endConversion(conversion) { /* ... */ },
}));
```

It's highly recommended to look at existing plugins to get a better understanding of how things work.

Since multiple plugins could support the same tag(s), the load order is important as the last plugin loaded that
declares support for a tag, will be the one that's used. Be wary of overriding tags supported by default plugins and
consider whether it's something that should be part of the original plugin. If so, [open a pull request](#contributors)!

A good practice for naming plugin packages is `europa-plugin-<markdown-feature>`. For example; `europa-plugin-link` and
not `europa-plugin-a`, and `europa-plugin-quote` and not `europa-plugin-q`. Each plugin should aim to support a specific
Markdown feature.

### Presets

Europa also has the concept of a "preset", which is essentially a bundle of plugins. In fact, all the default plugins
are provided by a default preset.

A preset simply imports a collection of plugins and declares them so that they can be registered together. For example;

``` javascript
const examplePluginProvider = require('europa-plugin-example');

const pluginProviders = [
  examplePluginProvider,
  /* ... */
];

Europa.registerPreset((api) => ({
  name: 'europa-preset-example',
  plugins: pluginProviders.map((pluginProvider) => pluginProvider(api)),
}));
```

A good practice for naming preset packages is `europa-preset-<markdown-feature-set>`. For example;
`europa-preset-github` could be used to register plugins that converts HTML to GitHub-flavoured Markdown. Each preset
should include plugins that aim to support a related Markdown feature set.

## CLI

    Usage: europa [options] [file ...]

    Options:

      -h, --help            output usage information
      -V, --version         output the version number
      -a, --absolute        use absolute URLs for links/images
      -b, --base-uri <uri>  base URI for links/images
      -e, --eval <html>     evaluate HTML string
      -i, --inline          insert link/image URLs inline
      -o, --output <path>   output directory (for files) or file (for eval/stdin)

## Migrating from older versions

If you've been using an older major version and would like details on what's changed and information on how to migrate
to the latest major release below:

https://github.com/neocotic/europa/wiki/Migrating-from-older-versions

## Bugs

If you have any problems with Europa Node or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/node-europa/LICENSE.md) for more information on
our MIT license.
