     __      __               ___                      __     
    /\ \    /\ \__           /\_ \                    /\ \    
    \ \ \___\ \ ,_\   ___ ___\//\ \        ___ ___    \_\ \   
     \ \  _ `\ \ \/ /' __` __`\\ \ \     /' __` __`\  /'_` \  
      \ \ \ \ \ \ \_/\ \/\ \/\ \\_\ \_ __/\ \/\ \/\ \/\ \L\ \ 
       \ \_\ \_\ \__\ \_\ \_\ \_\\____\\_\ \_\ \_\ \_\ \___,_\
        \/_/\/_/\/__/\/_/\/_/\/_//____//_/\/_/\/_/\/_/\/__,_ /

[html.md][] is a pure JavaScript library for converting [HTML][] in to valid [Markdown][].

[![Build Status](https://secure.travis-ci.org/neocotic/html.md.png)](http://travis-ci.org/neocotic/html.md)

[html.md][] can be used normally in any browser as well as in the [node.js][] environment where it
also provides a command line interface.

* [Install](#install)
* [Examples](#examples)
* [Usage](#usage)
* [API](#api)
   * [md](#mdhtml-options)
   * [Miscellaneous](#miscellaneous)
* [Windows](#windows)
* [Bugs](#bugs)
* [Questions](#questions)

## Install

Install using the package manager for your desired environment(s):

``` bash
# for node.js:
$ npm install html-md
# OR; for the browser:
$ bower install html-md
```

## Examples

In the browser:

``` html
<html>
  <head>
    <script src="/path/to/md.min.js"></script>
    <script>
      (function () {
        var body = document.getElementsByTagName('body')[0];
        console.log(md(body));
      }());
    </script>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>My tasks for today:</p>
    <ul>
      <li>Learn all about <a href="http://neocotic.com/html.md">html.md</a></li>
      <li>Tell everyone how <strong>awesome</strong> it is!</li>
    </ul>
  </body>
</html>
```

In [node.js][]:

``` javascript
var md = require('html-md');

console.log(md('I <em>love</em> html.md!'));
```

The fantastic [jsdom][] library is used in this environment in order to simulate a working DOM to
be traversed and translated to Markdown (see the [Windows](#windows) section for important notes
about support for this platform).

In the terminal:

``` bash
# provide HTML to be converted and print it back out to stdout:
$ htmlmd -epi "I <b>love</b> <a href='http://neocotic.com/html.md'>html.md</a>"
I **love** [html.md](http://neocotic.com/html.md)
# convert HTML files and output them into another directory:
$ htmlmd -o ./markdown ./html/*.html
# convert all HTML files in the current directory into Markdown files:
$ htmlmd -l .
```

## Usage

    Usage: htmlmd [options] [ -e html | <file ...> ]

    Options:

      -h, --help          output usage information
      -V, --version       output the version number
      -a, --absolute      always use absolute URLs for links and images
      -b, --base <url>    set base URL to resolve relative URLs from
      -d, --debug         print additional debug information
      -e, --eval          pass a string from the command line as input
      -i, --inline        generate inline style links
      -l, --long-ext      use long extension for Markdown files
      -o, --output <dir>  set the output directory for converted Markdown
      -p, --print         print out the converted Markdown

## API

### md(html, [options])
Parses the HTML into a valid [Markdown][] string. The `html` can either be an HTML string or DOM
element.

``` javascript
console.log(md('I <strong>love</strong> html.md!')); // "I **love** html.md!"
console.log(md(document.querySelector('p')));        // "Lorem ipsum, *baby*!"
```

#### Options

The following options are recognised by this method (all of which are optional);

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>absolute</td>
    <td>All links and images are parsed with absolute URLs</td>
  </tr>
  <tr>
    <td>base</td>
    <td>All relative links and images are resolved from this URL</td>
  </tr>
  <tr>
    <td>debug</td>
    <td>Prepends additional debug information to the Markdown output</td>
  </tr>
  <tr>
    <td>inline</td>
    <td>All links are generated using the inline style</td>
  </tr>
</table>

**Note:** The `base` option *only* works in the [node.js][] environment.

### Miscellaneous

#### `noConflict()`
Returns `md` in a no-conflict state, reallocating the `md` global variable name to its previous
owner, where possible.

This is really just intended for use within a browser.

``` html
<head>
  <script src="/path/to/conflict-lib.js"></script>
  <script src="/path/to/md.min.js"></script>
  <script>
    var mdNC = md.noConflict();
    // Conflicting lib works again and use mdNC for this library onwards...
  </script>
</head>
```

#### `version`
The current version of `md`.

``` javascript
console.log(md.version); // "3.0.2"
```

## Windows

*This section is only relevant for [node.js][] users and does not affect browsers.*

A lot of care has been put in to ensure [html.md][] runs well on Windows. Unfortunately, one of the
dependencies of the [jsdom][] library, which we depend on to emulate a DOM within the [node.js][]
environment, does not build well on Windows systems since it's built using "native modules" that
are compiled during installation. [Contextify][], the inherited dependency in question, is used to
run `<script>` contents safely in a sandbox environment and is required to properly parse DOM
objects into valid [Markdown][].

Fortunately, the author has documented some techniques to get it building on your Windows system in
a [Windows installation guide][].

## Bugs

If you have any problems with this library or would like to see the changes currently in
development you can do so here;

https://github.com/neocotic/html.md/issues

## Questions?

Take a look at `docs/*` to get a better understanding of what the code is doing.

If that doesn't help, feel free to follow me on Twitter, [@neocotic][].

However, if you want more information or examples of using this library please visit the project's
homepage;

http://neocotic.com/html.md

[@neocotic]: https://twitter.com/neocotic
[contextify]: https://github.com/brianmcd/contextify
[html]: http://en.wikipedia.org/wiki/HTML
[html.md]: http://neocotic.com/html.md
[jsdom]: https://github.com/tmpvar/jsdom
[markdown]: http://en.wikipedia.org/wiki/Markdown
[node.js]: http://nodejs.org
[windows installation guide]: https://github.com/brianmcd/contextify/wiki/Windows-Installation-Guide
