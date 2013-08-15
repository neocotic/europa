# [html.md](http://neocotic.com/html.md)  
# (c) 2013 Alasdair Mercer  
# Freely distributable under the MIT license.  
# Based on [Make.text](http://homepage.mac.com/tjim/) 1.5  
# (c) 2007 Trevor Jim  
# For all details and documentation:  
# <http://neocotic.com/html.md>

# Module dependencies
# -------------------

fs      = require 'fs-extra'
md      = require './md'
path    = require 'path'
program = require 'commander'

# Private constants
# -----------------

# Error code used by node when a file/directory could not be found.
NOT_FOUND  = 'ENOENT'
# Regular expression used to identify HTML files using common extensions.
R_HTML_EXT = /\.s?html?$/i

# Private variables
# -----------------

# File extension to be applied to any Markdown files that are created.
extension = '.md'
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
outputPath = (source, root) ->
  fileName = path.basename(source, path.extname(source)) + extension
  srcDir   = path.dirname source
  dir      = if program.output
    path.join program.output, if root is '.' then srcDir else srcDir[root.length..]
  else
    srcDir

  path.join dir, fileName

# Attempt to either parse the contents of the `source` path or, if it's a directory, the contents
# of its children HTML files.
parsePath = (source, topLevel, root) ->
  fs.stat source, (err, stats) ->
    if err
      # We only care about `ENOENT` errors so everything else is thrown.
      throw err if err.code isnt NOT_FOUND
      # Either exit stating the file could not be found or attempt to make improve the file name's
      # searchability and trying again.
      if topLevel and not R_HTML_EXT.test source
        source = sources[sources.indexOf(source)] = "#{source}.html"
        parsePath source, topLevel, root
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
        parsePath file, no, root for file in files
    else if topLevel or R_HTML_EXT.test source
      # Possible source file found so read its contents.
      fs.readFile source, (err, html) ->
        throw err if err

        # Treat the files contents as HTML and try to parse it using `md`.
        parseHtml source, html.toString(), root
    else
      # Doesn't appear to have a recognizable HTML file extension so just ignore the file and
      # remove it from the list of `sources`.
      sources.splice sources.indexOf(source), 1

# Parse the HTML `input` and write it out accordingly.
parseHtml = (file, input, root) ->
  try
    # Extract only relevant options from `program`.
    {absolute, base,  debug, inline} = program
    # Let `md` work its magic on the HTML `input`.
    output                           = md input, {absolute, base, debug, inline}

    # Either write the output to `stdout` or to a corresponding Markdown file depending on whether
    # the `print` option was enabled.
    if program.print then console.log output
    else if file     then writeMarkdown file, output, root
  catch err
    # An error occured while parsing `input`, so stop processing all sources and exit, while also
    # letting the user know why.
    exit 1, err

# Parse the options that could have been provided at runtime.
parseOptions = ->
  # Parse the specified options/switches/flags/whatever.
  program
    .version(md.version)
    .usage('[options] [ -e html | <file ...> ]')
    .option('-a, --absolute',     'always use absolute URLs for links and images')
    .option('-b, --base <url>',   'set base URL to resolve relative URLs from')
    .option('-d, --debug',        'print additional debug information')
    .option('-e, --eval',         'pass a string from the command line as input')
    .option('-i, --inline',       'generate inline style links')
    .option('-l, --long-ext',     'use long extension for Markdown files')
    .option('-o, --output <dir>', 'set the output directory for converted Markdown')
    .option('-p, --print',        'print out the converted Markdown')
    .parse process.argv

  # Ensure that the longer Markdown file extension is used if/when the associated option is
  # enabled.
  extension = '.markdown' if program.longExt
  # All left-over arguments are considered potential HTML source files/input and will be handled as
  # such.
  sources   = program.args[..]

  # No additional arguments were specified? Then simply print out the usage as the user might not
  # know how to use this command.
  program.help() unless sources.length

# Write the `markdown` converted from `source` to its relative output file.
writeMarkdown = (source, markdown, root) ->
  # Derive the best output file path based on the name of the `source` file.
  mdPath = outputPath source, root
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

    if program.eval
      # Parse the arguments as direct HTML input and print the output to `stdout`.
      parseHtml null, sources[0], process.cwd()
    else
      # Read each of the relevant targeted source files and parse them into HTML, sending each
      # output either to `stdout` or a corresponding Markdown file, depending on what options are
      # enabled.
      parsePath source, yes, path.normalize source for source in sources
  catch err
    exit 1, err
