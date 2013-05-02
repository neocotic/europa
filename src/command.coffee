# [html.md](http://neocotic.com/html.md)  
# (c) 2013 Alasdair Mercer  
# Freely distributable under the MIT license.  
# Based on [Make.text](http://homepage.mac.com/tjim/) 1.5  
# (c) 2007 Trevor Jim  
# For all details and documentation:  
# <http://neocotic.com/html.md>

# Module dependencies
# -------------------

fs             = require 'fs-extra'
md             = require './md'
path           = require 'path'
{OptionParser} = require 'optparse'

# Private constants
# -----------------

# Error code used by node when a file/directory could not be found.
NOT_FOUND  = 'ENOENT'
# Regular expression used to identify HTML files using common extensions.
R_HTML_EXT = /\.s?html?$/i
# Available command options/switches.
SWITCHES   = [
  ['-a', '--absolute',   'always use absolute URLs for links']
  ['-d', '--debug',      'print additional debug information']
  ['-e', '--eval',       'pass a string from the command line as input']
  ['-h', '--help',       'display this help information']
  ['-l', '--long-ext',   'use long extension for Markdown files']
  ['-o', '--output DIR', 'set the output directory for converted Markdown']
  ['-p', '--print',      'print out the converted Markdown']
  ['-v', '--version',    'display the version number']
]

# Private variables
# -----------------

# File extension to be applied to any Markdown files that are created.
extension = '.md'
# Options, including their defaults, that are possibly changed by switches passed in at runtime.
opts      =
  absolute: no
  debug:    no
  eval:     no
  longExt:  no
  output:   null
  print:    no
# List of HTML sources passed in at runtime.  
# These can either be paths or a single HTML input (if `eval` option was enabled).
sources   = []

# Private functions
# -----------------

# Exit the process *gracefully*, optionally displaying `message` before doing so.
exit = (code, message) ->
  if typeof code is 'string'
    message = code
    code    = null

  code ?= 0

  console[if code then 'error' else 'log'] message if message
  process.exit code

# Resolve the output path for `source`.
outputPath = (source, base) ->
  fileName = path.basename(source, path.extname(source)) + extension
  srcDir   = path.dirname source
  dir      = if opts.output
    path.join opts.output, if base is '.' then srcDir else srcDir[base.length..]
  else
    srcDir

  path.join dir, fileName

# Attempt to either parse the contents of path or, if it's a directory, the contents of its
# children HTML files.
parsePath = (source, topLevel, base) ->
  fs.stat source, (err, stats) ->
    throw err if err and err.code isnt NOT_FOUND

    if err?.code is NOT_FOUND
      if topLevel and not R_HTML_EXT.test source
        source = sources[sources.indexOf(source)] = "#{source}.html"
        parsePath source, topLevel, base
      else if topLevel
        exit 1, "File not found: #{source}"
      return

    if stats.isDirectory()
      fs.readdir source, (err, files) ->
        throw err if err and err.code isnt NOT_FOUND
        return if err?.code is NOT_FOUND

        index = sources.indexOf source
        sources[index..index] = (path.join source, file for file in files)

        files.forEach (file) ->
          parsePath (path.join source, file), no, base
    else if topLevel or R_HTML_EXT.test source
      fs.readFile source, (err, html) ->
        throw err if err and err.code isnt NOT_FOUND
        return if err?.code is NOT_FOUND

        parseHtml source, html.toString(), base
    else
      sources.splice sources.indexOf(source), 1

# Parse `input` and write it to a Markdown file, where appropriate.
parseHtml = (file, input, base) ->
  try
    output = md input, opts

    if opts.print then console.log output
    else if file  then writeMarkdown file, output, base
  catch err
    exit 1, err

# Parse the options provided at runtime.
parseOptions = ->
  parser = new OptionParser SWITCHES
  parser.banner        = 'Usage: md [options] [ -e html | file.html ] [arguments]'
  parser.options_title = 'Options:'

  toCamelCase = (str) ->
    str.replace /-([a-z])/gi, (match, char) ->
      char.toUpperCase()

  parser.on '*', (opt, val) ->
    opt = toCamelCase opt

    if typeof opts[opt] is 'boolean' then opts[opt] = not opts[opt]
    else if val?                     then opts[opt] = val

  parser.on 'help', ->
    exit parser.toString()

  parser.on 'version', ->
    exit "html.md version #{md.VERSION}"

  extension = '.markdown' if opts.longExt

  args = parser.parse(process.argv)[2..]
  if args.length
    sources = args
  else
    exit parser.toString()

# Write the `markdown` converted from `source` to its relative output file.
writeMarkdown = (source, markdown, base) ->
  mdPath = outputPath source, base
  mdDir  = path.dirname mdPath

  parse = (err) ->
    console.error err if err

    markdown = ' ' if markdown.length <= 0
    fs.writeFile mdPath, markdown, (err) ->
      console.error err if err

  fs.exists mdDir, (exists) ->
    if exists then do parse else fs.mkdirs mdDir, parse

# Public API
# ----------

# Handle the runtime arguments accordingly.
exports.run = ->
  unless process.platform is 'win32'
    process.on 'SIGTERM', ->
      do exit

  try
    do parseOptions

    return parseHtml null, sources[0], opts if opts.eval

    parsePath source, yes, path.normalize source for source in sources
  catch err
    exit 1, err
