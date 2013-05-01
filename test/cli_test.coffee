# Module dependencies
# -------------------

fs     = require 'fs'
md     = require '../lib/md'
path   = require 'path'
{exec} = require 'child_process'

# Constants
# ---------

COMMAND      = '../bin/md'
ENCODING     = 'utf8'
FIXTURES_DIR = path.join __dirname, 'fixtures'
HTML_EXT     = '.html'
MD_EXT       = '.md'
MD_FULL_EXT  = '.markdown'
OUTPUT_DIR   = path.join __dirname, 'output'
USAGE        = """
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

"""
VERSION      = """
  html.md version #{md.VERSION}

"""

# Configuration
# -------------

module.exports =
  tearDown: (callback) ->
    return do callback unless fs.existsSync OUTPUT_DIR

    fs.readdirSync(OUTPUT_DIR).forEach (file) ->
      fs.unlinkSync path.join OUTPUT_DIR, file

    fs.rmdirSync OUTPUT_DIR

    do callback

# Helpers
# -------

toFileUrl = (relativePath) ->
  "file://#{toPathName relativePath}"

toPathName = (relativePath) ->
  pathName = path.resolve('lib', relativePath).replace ///\\///g, '/'
  if pathName[0] isnt '/' then "/#{pathName}" else pathName

# Tests
# -----

exports.fixtures = (
  testFixture = (name) ->
    (test) ->
      htmlPath = path.join FIXTURES_DIR, "#{name}#{HTML_EXT}"
      html     = fs.readFileSync htmlPath, ENCODING

      test.expect 3 * 2

      exec "#{COMMAND} -o #{OUTPUT_DIR} #{htmlPath}", (err) ->
        test.ifError err, "Error should not be thrown using -o flag for #{name} fixture"
        markdownPath = path.join OUTPUT_DIR, "#{name}#{MD_EXT}"
        markdown     = fs.readFileSync markdownPath, ENCODING
        test.equal markdown, md(html), "#{name} fixture should match using -o flag"

      exec "#{COMMAND} -lo #{OUTPUT_DIR} #{htmlPath}", (err) ->
        test.ifError err, "Error should not be thrown using -lo flags for #{name} fixture"
        markdownPath = path.join OUTPUT_DIR, "#{name}#{MD_FULL_EXT}"
        markdown     = fs.readFileSync markdownPath, ENCODING
        test.equal markdown, md(html), "#{name} fixture should match using -lo flags"

      exec "#{COMMAND} -p #{htmlPath}", (err, stdout) ->
        test.ifError err, "Error should not be thrown using -p flag for #{name} fixture"
        test.equal stdout, """
          #{md html}

        """, "#{name} fixture should match using -p flag"

      test.done()

  fixtures = (
    for file in fs.readdirSync FIXTURES_DIR when HTML_EXT is path.extname file
      path.basename file, HTML_EXT
  )

  tests = {}
  tests[fixture] = testFixture fixture for fixture in fixtures
  tests
)

exports.absolute = (test) ->
  testAbsolute = (expected, desc, flags) ->
    (err, stdout) ->
      test.ifError err, "Error should not be thrown using '#{flags}' flags"
      test.equal stdout, expected, "#{desc} using #{flags} flags"

  test.expect 6 * 2

  exec "#{COMMAND} -ep \"<a href='mock'>anchor</a>\"", testAbsolute """
    [anchor][0]

    [0]: mock

  """, 'Link should be relative', '-ep'

  exec "#{COMMAND} -ep \"<a href='/mock'>anchor</a>\"", testAbsolute """
    [anchor][0]

    [0]: /mock

  """, 'Root link should be relative', '-ep'

  exec "#{COMMAND} -epa \"<a href='mock'>anchor</a>\"", testAbsolute """
    [anchor][0]

    [0]: #{toFileUrl 'mock'}

  """, 'Link should be absolute', '-epa'

  exec "#{COMMAND} -epa \"<a href='/mock'>anchor</a>\"", testAbsolute """
    [anchor][0]

    [0]: #{toFileUrl '/mock'}

  """, 'Root link should be absolute', '-epa'

  exec "#{COMMAND} -ep \"<img src='mock'>\"", testAbsolute """
    ![](mock)

  """, 'Image should be relative', '-ep'

  exec "#{COMMAND} -epa \"<img src='mock'>\"", testAbsolute """
    ![](mock)

  """, 'Absolute option should not affect images', '-epa'

  test.done()

exports.stdio = (test) ->
  test.expect 2

  exec "#{COMMAND} -ep \"<strong>strong</strong>\"", (err, stdout) ->
    test.ifError err, 'Error should not be thrown using -ep flags'
    test.equal stdout, """
      **strong**

    """, 'Output should match expected markdown using -ep flags'

  test.done()

exports.usage = (test) ->
  testUsage = (desc) ->
    (err, stdout) ->
      test.ifError err, "Error should not be thrown using #{desc}"
      test.equal stdout, USAGE, "Output should match expected usage using #{desc}"

  test.expect 2 * 2

  exec COMMAND,         testUsage 'no flags'
  exec "#{COMMAND} -h", testUsage '-h flag'

  test.done()

exports.version = (test) ->
  test.expect 2

  exec "#{COMMAND} -v", (err, stdout) ->
    test.ifError err, 'Error should not be thrown using -v flag'
    test.equal stdout, VERSION, 'Output should match known version using -v flag'

  test.done()
