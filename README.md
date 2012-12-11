     __      __               ___                      __     
    /\ \    /\ \__           /\_ \                    /\ \    
    \ \ \___\ \ ,_\   ___ ___\//\ \        ___ ___    \_\ \   
     \ \  _ `\ \ \/ /' __` __`\\ \ \     /' __` __`\  /'_` \  
      \ \ \ \ \ \ \_/\ \/\ \/\ \\_\ \_ __/\ \/\ \/\ \/\ \L\ \ 
       \ \_\ \_\ \__\ \_\ \_\ \_\\____\\_\ \_\ \_\ \_\ \___,_\
        \/_/\/_/\/__/\/_/\/_/\/_//____//_/\/_/\/_/\/_/\/__,_ /

[html.md][] is a pure JavaScript library for converting [HTML][] in to valid
[Markdown][].

[![Build Status](https://secure.travis-ci.org/neocotic/html.md.png)](http://travis-ci.org/neocotic/html.md)

[html.md][] can be used normally in any browser as well as in the [node.js][]
environment where it also provides a command line interface.

## Install

Install from [npm][]:

``` bash
$ npm install html-md
```

## Usage

```
Usage: md [options] [ -e html | file.html ] [arguments]

Options:
  -a, --absolute     always use absolute URLs for links
  -d, --debug        print additional debug information
  -e, --eval         pass a string from the command line as input
  -h, --help         display this help information
  -l, --long-ext     use long extension for Markdown files
  -o, --output DIR   set the output directory for converted Markdown
  -p, --print        print out the converted Markdown
  -v, --version      display the version number
```

### Examples

Provide HTML to be converted and print it out into the terminal:

``` bash
$ md -ep "I <b>love</b> <a href='https://github.com/neocotic/html.md'>html.md</a>"
I **love** [html.md](https://github.com/neocotic/html.md)
```

Convert HTML files and output them into another directory:

``` bash
$ md -o ./markdown ./html/*.html
```

Convert all `.html` files in the current directory into `.markdown` files:

``` bash
$ md -l .
```

## Programmatically

`md(html[, options])` is used primarily:

``` html
<script src="dist/md.min.js"></script>
<script>
  var markdown = md(document.querySelector('.content'))
  console.log(markdown)
</script>
```

### Options

The following options are recognised by this method (all of which are optional);

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>absolute</td>
    <td>All links are parsed with absolute URLs</td>
  </tr>
  <tr>
    <td>debug</td>
    <td>Prepends additional debug information to the Markdown output</td>
  </tr>
</table>

### Miscellaneous

`md.noConflict()` returns `md` in a no-conflict state, reallocating the `md`
global variable name to its previous owner, where possible.

`md.VERSION` returns the current version.

## Bugs

If you have any problems with this library or would like to see the changes
currently in development you can do so here;

https://github.com/neocotic/html.md/issues

## Questions?

Take a look at `docs/md.html` to get a better understanding of what the code is
doing.

If that doesn't help, feel free to follow me on Twitter, [@neocotic][].

However, if you want more information or examples of using this library please
visit the project's homepage;

http://neocotic.com/html.md

[@neocotic]: https://twitter.com/neocotic
[html]: http://en.wikipedia.org/wiki/HTML
[html.md]: http://neocotic.com/html.md
[markdown]: http://en.wikipedia.org/wiki/Markdown
[node.js]: http://nodejs.org
[npm]: http://npmjs.org