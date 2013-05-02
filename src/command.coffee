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

# Attempt to either parse the contents of the `source` path or, if it's a directory, the contents
# of its children HTML files.
parsePath = (source, topLevel, base) ->
  fs.stat source, (err, stats) ->
    if err
      # We only care about `ENOENT` errors so everything else is thrown.
      throw err if err.code isnt NOT_FOUND
      # Either exit stating the file could not be found or attempt to make improve the file name's
      # searchability and trying again.
      if topLevel and not R_HTML_EXT.test source
        source = sources[sources.indexOf(source)] = "#{source}.html"
        parsePath source, topLevel, base
      else if topLevel
        exit 1, "File not found: #{source}"
      return

    if stats.isDirectory()
      # `source` is a directory so we're going to expand it to include all of its children files
      # and check each of them.
      fs.readdir source, (err, files) ->
        throw err if err

        # Ensure `files` are relative to their parent directory.
        files = files.map (file) ->
          path.join source, file

        # Replace the directory in `sources` with all of its children files.
        index = sources.indexOf source
        sources[index..index] = files

        # Now finally try to parse all of the directory `files`.
        parsePath file, no, base for file in files
    else if topLevel or R_HTML_EXT.test source
      # Possible source file found so read its contents.
      fs.readFile source, (err, html) ->
        throw err if err

        # Treat the files contents as HTML and try to parse it using `md`.
        parseHtml source, html.toString(), base
    else
      # Doesn't appear to have a recognizable HTML file extension so just ignore the file and
      # remove it from the list of `sources`.
      sources.splice sources.indexOf(source), 1

# Parse the HTML `input` and write it out accordingly.
parseHtml = (file, input, base) ->
  try
    # Let `md` work its magic on the HTML `input`.
    output = md input, opts

    # Either write the output to `stdout` or to a corresponding Markdown file depending on whether
    # the `print` option was enabled.
    if opts.print then console.log output
    else if file  then writeMarkdown file, output, base
  catch err
    # An error occured while parsing `input`, so stop processing all sources and exit, while also
    # letting the user know why.
    exit 1, err

# Parse the options that could have been provided at runtime.
parseOptions = ->
  # Create the parser based on the predefined options/switches/flags/whatever.
  parser = new OptionParser SWITCHES
  parser.banner        = 'Usage: md [options] [ -e html | file.html ] [arguments]'
  parser.options_title = 'Options:'

  # Handle all general options that are specified.
  parser.on '*', (opt, val) ->
    # Transform long option names into camel case (e.g. `long-ext` becomes `longExt`).
    opt = opt.replace /-([a-z])/gi, (match, char) ->
      char.toUpperCase()

    # Map `opt` to its corresponding option while ensure `boolean` options are handled correctly.
    if typeof opts[opt] is 'boolean' then opts[opt] = not opts[opt]
    else if val?                     then opts[opt] = val

  # Exit while printing out the usage for this command.
  parser.on 'help', ->
    exit parser.toString()

  # Exit while printing out the current version of this command.
  parser.on 'version', ->
    exit "html.md version #{md.VERSION}"

  # Ensure that the longer Markdown file extension is used if/when the associated option is
  # enabled.
  extension = '.markdown' if opts.longExt
  # All left-over arguments are considered potential HTML source files/input and will be handled as
  # such.
  sources   = parser.parse(process.argv)[2..]

  # No additional arguments were specified? Then simply print out the usage as the user might not
  # know how to use this command.
  exit parser.toString() unless sources.length

# Write the `markdown` converted from `source` to its relative output file.
writeMarkdown = (source, markdown, base) ->
  # Derive the best output file path based on the name of the `source` file.
  mdPath = outputPath source, base
  mdDir  = path.dirname mdPath

  # Write `markdown` to its corresponding output file.
  write = (err) ->
    throw err if err

    # Ensure something is always written in the file.
    markdown = ' ' if markdown.length <= 0
    fs.writeFile mdPath, markdown, (err) ->
      throw err if err

  # If the target files parent directory doesn't already exists, create it before writing to the
  # file itself.
  fs.exists mdDir, (exists) ->
    if exists then do write else fs.mkdirs mdDir, write

# Public API
# ----------

# Handle the runtime arguments accordingly.
exports.run = ->
  # Try to ensure *graceful* exits whenever possible.
  unless process.platform is 'win32'
    process.on 'SIGTERM', ->
      do exit

  try
    # Parse the arguments passed in at runtime as options/switches.
    do parseOptions

    if opts.eval
      # Parse the arguments as direct HTML input and print the output to `stdout`.
      parseHtml null, sources[0], opts 
    else
      # Read each of the relevant targeted source files and parse them into HTML, sending each
      # output either to `stdout` or a corresponding Markdown file, depending on what options are
      # enabled.
      parsePath source, yes, path.normalize source for source in sources
  catch err
    exit 1, err
