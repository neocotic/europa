# Module dependencies
# -------------------

fs     = require 'fs'
md     = require '../lib/md'
path   = require 'path'
{exec} = require 'child_process'

# Constants
# ---------

COMMAND      = './bin/md'
ENCODING     = 'utf8'
FIXTURES_DIR = path.join __dirname, 'fixtures'
HTML_EXT     = '.html'
MD_EXT       = '.md'
MD_FULL_EXT  = '.markdown'
OUTPUT_DIR   = path.join __dirname, 'output'
USAGE        = """

  Usage: md Usage: md [options] [ -e html | <file ...> ]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -a, --absolute      always use absolute URLs for links
    -d, --debug         print additional debug information
    -e, --eval          pass a string from the command line as input
    -l, --long-ext      use long extension for Markdown files
    -o, --output <dir>  set the output directory for converted Markdown
    -p, --print         print out the converted Markdown


""".replace /\n(?!\n)(?=.+)/g, '\n  '
VERSION      = """
  #{md.version}

"""

# Helpers
# -------

toFileUrl = (relativePath) ->
  "file://#{toPathName relativePath}"

toPathName = (relativePath) ->
  pathName = path.resolve('lib', relativePath).replace ///\\///g, '/'
  if pathName[0] isnt '/' then "/#{pathName}" else pathName

# Tests
# -----

exports.fixtures = do ->
  testFixture = (name) ->
    htmlPath = path.join FIXTURES_DIR, "#{name}#{HTML_EXT}"
    expected = md fs.readFileSync htmlPath, ENCODING

    standard: (test) ->
      test.expect 2

      exec "#{COMMAND} -o #{OUTPUT_DIR} #{htmlPath}", (err) ->
        test.ifError err, "Error should not be thrown using -o flag for #{name} fixture"
        markdownPath = path.join OUTPUT_DIR, "#{name}#{MD_EXT}"
        markdown     = fs.readFileSync markdownPath, ENCODING
        test.equal markdown, expected, "#{name} fixture should match using -o flag"

        test.done()

    long: (test) ->
      test.expect 2

      exec "#{COMMAND} -lo #{OUTPUT_DIR} #{htmlPath}", (err) ->
        test.ifError err, "Error should not be thrown using -lo flags for #{name} fixture"
        markdownPath = path.join OUTPUT_DIR, "#{name}#{MD_FULL_EXT}"
        markdown     = fs.readFileSync markdownPath, ENCODING
        test.equal markdown, expected, "#{name} fixture should match using -lo flags"

        test.done()

    print: (test) ->
      test.expect 2

      exec "#{COMMAND} -p #{htmlPath}", (err, stdout) ->
        test.ifError err, "Error should not be thrown using -p flag for #{name} fixture"
        test.equal stdout, """
          #{expected}

        """, "#{name} fixture should match using -p flag"

        test.done()

  fixtures = (
    for file in fs.readdirSync FIXTURES_DIR when HTML_EXT is path.extname file
      path.basename file, HTML_EXT
  )

  tests =
    tearDown:(callback) ->
      return do callback unless fs.existsSync OUTPUT_DIR

      fs.readdirSync(OUTPUT_DIR).forEach (file) ->
        fs.unlinkSync path.join OUTPUT_DIR, file

      fs.rmdirSync OUTPUT_DIR

      do callback

  tests[fixture] = testFixture fixture for fixture in fixtures
  tests

exports.absolute = do ->
  testAbsolute = (command, expected, desc, flags) ->
    (test) ->
      test.expect 2

      exec command, (err, stdout) ->
        test.ifError err, "Error should not be thrown using '#{flags}' flags"
        test.equal stdout, expected, "#{desc} using #{flags} flags"

        test.done()

  relativeLink: testAbsolute "#{COMMAND} -ep \"<a href='mock'>anchor</a>\"", """
    [anchor][0]

    [0]: mock

  """, 'Link should be relative', '-ep'

  relativeRootLink: testAbsolute "#{COMMAND} -ep \"<a href='/mock'>anchor</a>\"", """
    [anchor][0]

    [0]: /mock

  """, 'Root link should be relative', '-ep'

  absoluteLink: testAbsolute "#{COMMAND} -epa \"<a href='mock'>anchor</a>\"", """
    [anchor][0]

    [0]: #{toFileUrl 'mock'}

  """, 'Link should be absolute', '-epa'

  absoluteRootLink: testAbsolute "#{COMMAND} -epa \"<a href='/mock'>anchor</a>\"", """
    [anchor][0]

    [0]: #{toFileUrl '/mock'}

  """, 'Root link should be absolute', '-epa'

  relativeImage: testAbsolute "#{COMMAND} -ep \"<img src='mock'>\"", """
    ![](mock)

  """, 'Image should be relative', '-ep'

  absoluteImage: testAbsolute "#{COMMAND} -epa \"<img src='mock'>\"", """
    ![](#{toFileUrl 'mock'})

  """, 'Image should be absolute', '-epa'

exports.stdio = (test) ->
  test.expect 2

  exec "#{COMMAND} -ep \"<strong>strong</strong>\"", (err, stdout) ->
    test.ifError err, 'Error should not be thrown using -ep flags'
    test.equal stdout, """
      **strong**

    """, 'Output should match expected markdown using -ep flags'

    test.done()

exports.usage =
  help: (test) ->
    test.expect 2

    exec "#{COMMAND} -h", (err, stdout) ->
      test.ifError err, "Error should not be thrown using the -h flag"
      test.equal stdout, USAGE, "Output should match expected usage using the -h flag"

      test.done()

  noArgs: (test) ->
    test.expect 2

    exec COMMAND, (err, stdout) ->
      test.ifError err, "Error should not be thrown using no flags"
      test.equal stdout, USAGE, "Output should match expected usage using no flags"

      test.done()

exports.version = (test) ->
  test.expect 2

  exec "#{COMMAND} -V", (err, stdout) ->
    test.ifError err, 'Error should not be thrown using -v flag'
    test.equal stdout, VERSION, 'Output should match known version using -v flag'

    test.done()
