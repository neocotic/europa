/*
 * html.md
 * https://github.com/neocotic/html.md
 *
 * Copyright (c) 2015 Alasdair Mercer
 *
 * Based on Make.text 1.5
 * http://homepage.mac.com/tjim/
 *
 * Copyright (c) 2007 Trevor Jim
 *
 * Licensed under the MIT license.
 * https://github.com/neocotic/html.md/blob/master/LICENSE.md
 */

'use strict'

const program = require('commander')
const fs = require('fs-extra')
const path = require('path')

const md = require('./md')

// Error code used by node when a file/directory could not be found.
const notFoundCode = 'ENOENT'
// Regular expression used to identify HTML files using common extensions.
const rHtmlExtension = /\.s?html?$/i

// File extension to be applied to any Markdown files that are created.
let extension = '.md'
// List of HTML sources passed in at runtime.
// These can either be paths or a single HTML input (if `eval` option was enabled).
let sources = []

// Exit the process *gracefully*, optionally displaying `message` before doing so.
function exit(code, message) {
  if (typeof code === 'string') {
    message = code
    code = null
  }

  if (code == null) {
    code = 0
  }

  if (message) {
    console[code ? 'error' : 'log'](message)
  }

  process.exit(code)
}

// Resolve the output path for `source`.
function outputPath(source, root) {
  let fileName = path.basename(source, path.extname(source)) + extension
  let sourceDirectory = path.dirname(source)
  let directory = sourceDirectory
  if (program.output) {
    directory = path.join(program.output, root === '.' ? sourceDirectory : sourceDirectory.slice(root.length))
  }

  return path.join(directory, fileName)
}

// Attempt to either parse the contents of the `source` path or, if it's a directory, the contents of its children HTML
// files.
function parsePath(source, topLevel, root) {
  fs.stat(source, (error, stats) => {
    if (error) {
      // We only care about `ENOENT` errors so everything else is thrown.
      if (error.code !== notFoundCode) {
        throw error
      }

      // Either exit stating the file could not be found or attempt to make improve the file name's searchability and
      // trying again.
      if (topLevel && !rHtmlExtension.test(source)) {
        source = sources[sources.indexOf(source)] = `${source}.html`
        parsePath(source, topLevel, root)
      } else if (topLevel) {
        exit(1, `File not found: ${source}`)
      }

      return
    }

    if (stats.isDirectory()) {
      // `source` is a directory so we're going to expand it to include all of its children files and check each of
      // them.
      fs.readdir(source, (error, files) => {
        if (error) {
          throw error
        }

        // Ensure `files` are relative to their parent directory.
        files = files.map((file) => path.join(source, file))

        // Replace the directory in `sources` with all of its children files.
        let index = sources.indexOf(source)
        sources.splice.apply(sources, [ index, index - index + 1 ].concat(files))

        // Now finally try to parse all of the directory `files`.
        for (let file of files) {
          parsePath(file, false, root)
        }
      })
    } else if (topLevel || rHtmlExtension.test(source)) {
      // Possible source file found so read its contents.
      fs.readFile(source, (error, html) => {
        if (error) {
          throw error
        }

        // Treat the files contents as HTML and try to parse it using `md`.
        parseHtml(source, html.toString(), root)
      })
    } else {
      // Doesn't appear to have a recognizable HTML file extension so just ignore the file and remove it from the list
      // of `sources`.
      sources.splice(sources.indexOf(source), 1)
    }
  })
}

// Parse the HTML `input` and write it out accordingly.
function parseHtml(file, input, root) {
  try {
    // Let `md` work its magic on the HTML `input`.
    let output = md(input, {
      absolute: program.absolute,
      base: program.base,
      debug: program.debug,
      inline: program.inline
    })

    // Either write the output to `stdout` or to a corresponding Markdown file depending on whether the `print` option
    // was enabled.
    if (program.print) {
      console.log(output)
    } else if (file) {
      writeMarkdown(file, output, root)
    }
  } catch (error) {
    // An error occured while parsing `input`, so stop processing all sources and exit, while also letting the user know
    // why.
    exit(1, error)
  }
}

// Parse the options that could have been provided at runtime.
function parseOptions() {
  // Parse the specified options/switches/flags/whatever.
  program
    .version(md.version)
    .usage('[options] [ -e html | <file ...> ]')
    .option('-a, --absolute', 'always use absolute URLs for links and images')
    .option('-b, --base <url>', 'set base URL to resolve relative URLs from')
    .option('-d, --debug', 'print additional debug information')
    .option('-e, --eval', 'pass a string from the command line as input')
    .option('-i, --inline', 'generate inline style links')
    .option('-l, --long-ext', 'use long extension for Markdown files')
    .option('-o, --output <dir>', 'set the output directory for converted Markdown')
    .option('-p, --print', 'print out the converted Markdown')
    .parse(process.argv)

  // Ensure that the longer Markdown file extension is used if/when the associated option is enabled.
  if (program.longExt) {
    extension = '.markdown'
  }

  // All left-over arguments are considered potential HTML source files/input and will be handled as such.
  sources = program.args.slice(0)

  // No additional arguments were specified? Then simply print out the usage as the user might not know how to use this
  // command.
  if (!sources.length) {
    program.help()
  }
}

// Write the `markdown` converted from `source` to its relative output file.
function writeMarkdown(source, markdown, root) {
  // Derive the best output file path based on the name of the `source` file.
  let markdownPath = outputPath(source, root)
  let markdownDirectory = path.dirname(markdownPath)

  // Write `markdown` to its corresponding output file.
  function write(error) {
    if (error) {
      throw error
    }

    // Ensure something is always written in the file.
    if (!markdown) {
      markdown = ''
    }

    fs.writeFile(markdownPath, markdown, (error) => {
      if (error) {
        throw error
      }
    })
  }

  // If the target files parent directory doesn't already exists, create it before writing to the file itself.
  fs.exists(markdownDirectory, (exists) => {
    if (exists) {
      write()
    } else {
      fs.mkdirs(markdownDirectory, write)
    }
  })
}

// Handle the runtime arguments accordingly.
exports.run = () => {
  // Try to ensure *graceful* exits whenever possible.
  if (process.platform !== 'win32') {
    process.on('SIGTERM', () => exit())
  }

  try {
    // Parse the arguments passed in at runtime as options/switches.
    parseOptions()

    if (program.eval) {
      // Parse the arguments as direct HTML input and print the output to `stdout`.
      parseHtml(null, sources[0], process.cwd())
    } else {
      // Read each of the relevant targeted source files and parse them into HTML, sending each output either to
      // `stdout` or a corresponding Markdown file, depending on what options are enabled.
      for (let source of sources) {
        parsePath(source, true, path.normalize(source))
      }
    }
  } catch (error) {
    exit(1, error)
  }
}