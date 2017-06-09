![Europa](https://cdn.rawgit.com/NotNinja/europa-branding/master/assets/banner-europa/europa-banner-500x200.png)

[Europa](https://github.com/NotNinja/europa) is a pure JavaScript library for converting HTML into valid Markdown.

[![Build Status](https://img.shields.io/travis/NotNinja/europa/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/europa)
[![Dev Dependency Status](https://img.shields.io/david/dev/NotNinja/europa.svg?style=flat-square)](https://david-dm.org/NotNinja/europa?type=dev)
[![License](https://img.shields.io/npm/l/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/blob/master/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa.svg?style=flat-square)](https://www.npmjs.com/package/europa)

* [Install](#install)
* [Examples](#examples)
* [API](#api)
* [Migrating from older versions](#migrating-from-older-versions)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using the package manager for your desired environment(s):

``` bash
$ npm install --save europa
# OR:
$ bower install --save europa
```

If you want to simply download the file to be used in the browser you can find them below:

* [Development Version](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.js) (TODO - [Source Map](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.js.map))
* [Production Version](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.min.js) (TODO - [Source Map](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.min.js.map))

Check out [node-qrious](https://github.com/NotNinja/node-europa) if you want to install it for use within
[Node.js](https://nodejs.org).

## Examples

``` html
<!DOCTYPE html>
<html>
  <body>
    <textarea id="html"></textarea>
    <textarea id="markdown"></textarea>

    <script src="/path/to/europa.js"></script>
    <script>
      (function() {
        var europa = new Europa();
        var html = document.getElementById('html');
        var markdown = document.getElementById('markdown');

        html.addEventListener('input', function() {
          markdown.value = europa.convert(html.value);
        });
      }());
    </script>
  </body>
</html>
```

Open up `demo.html` in your browser to play around a bit.

## API

TODO: Document

## Migrating from older versions

If you've been using an older major version and would like details on what's changed and information on how to migrate
to the latest major release below:

https://github.com/NotNinja/europa/wiki/Migrating-from-older-versions

## Bugs

If you have any problems with Europa or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/europa/issues). Core features and issues are maintained separately
[here](https://github.com/NotNinja/europa-core/issues).


## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/europa/blob/master/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/NotNinja/europa/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/europa/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
