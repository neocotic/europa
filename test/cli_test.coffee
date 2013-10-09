# Module dependencies
# -------------------

fs     = require 'fs'
md     = require '../lib/md'
path   = require 'path'
{exec} = require 'child_process'

# Constants
# ---------

COMMAND      = './bin/htmlmd'
ENCODING     = 'utf8'
EXPECTED_DIR = path.join __dirname, 'expected'
FIXTURES_DIR = path.join __dirname, 'fixtures'
HTML_EXT     = '.html'
MD_EXT       = '.md'
MD_FULL_EXT  = '.markdown'
OUTPUT_DIR   = 'tmp'
USAGE        = """

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


""".replace /\n(?!\n)(?=.+)/g, '\n  '
VERSION      = """
  #{md.version}

"""

# Helpers
# -------

toFileUrl = (relativePath) ->
  "file://#{toPathName relativePath}"

toPathName = (relativePath) ->
  pathName = path.resolve(process.cwd(), '..', relativePath).replace ///\\///g, '/'
  if pathName[0] isnt '/' then "/#{pathName}" else pathName

# Tests
# -----

exports.fixtures = do ->
  testFixture = (name) ->
    htmlPath = path.join FIXTURES_DIR, "#{name}#{HTML_EXT}"
    expected = fs.readFileSync path.join(EXPECTED_DIR, "#{name}#{MD_EXT}"), ENCODING

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
    setUp: (callback) ->
      fs.exists OUTPUT_DIR, (exists) ->
        if exists then do callback else fs.mkdir OUTPUT_DIR, callback

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

  relativeLink: testAbsolute("#{COMMAND} -ep \"<a href='mock'>anchor</a>\"", """
    [anchor][0]

    [0]: mock

  """, 'Link should be relative', '-ep')

  relativeRootLink: testAbsolute("#{COMMAND} -ep \"<a href='/mock'>anchor</a>\"", """
    [anchor][0]

    [0]: /mock

  """, 'Root link should be relative', '-ep')

  absoluteLink: testAbsolute("#{COMMAND} -epa \"<a href='mock'>anchor</a>\"", """
    [anchor][0]

    [0]: #{toFileUrl 'mock'}

  """, 'Link should be absolute', '-epa')

  absoluteRootLink: testAbsolute("#{COMMAND} -epa \"<a href='/mock'>anchor</a>\"", """
    [anchor][0]

    [0]: #{toFileUrl '/mock'}

  """, 'Root link should be absolute', '-epa')

  relativeImage: testAbsolute("#{COMMAND} -ep \"<img src='mock'>\"", """
    ![](mock)

  """, 'Image should be relative', '-ep')

  absoluteImage: testAbsolute("#{COMMAND} -epa \"<img src='mock'>\"", """
    ![](#{toFileUrl 'mock'})

  """, 'Image should be absolute', '-epa')

exports.base = do ->
  testBase = (command, expected, desc, flags) ->
    (test) ->
      test.expect 2

      exec command, (err, stdout) ->
        test.ifError err, "Error should not be thrown using '#{flags}' flags"
        test.equal stdout, expected, "#{desc} using #{flags} flags"

        test.done()

  defaultLink: testBase("#{COMMAND} -epa \"<a href='mock'>anchor</a>\"", """
    [anchor][0]

    [0]: #{toFileUrl 'mock'}

  """, 'Link should be relative to the current working directory', '-epa')

  defaultRootLink: testBase("#{COMMAND} -epa \"<a href='/mock'>anchor</a>\"", """
    [anchor][0]

    [0]: #{toFileUrl '/mock'}

  """, 'Root link should be relative to the current working directory', '-epa')

  defaultImage: testBase("#{COMMAND} -epa \"<img src='mock'>\"", """
    ![](#{toFileUrl 'mock'})

  """, 'Image should be relative to the current working directory', '-epa')

  baseLink: testBase("""
    #{COMMAND} -epab "http://example.com/path/to/page/" "<a href='mock'>anchor</a>"
  """, """
    [anchor][0]

    [0]: http://example.com/path/to/page/mock

  """, 'Link should be relative to custom URL', '-epab')

  baseRootLink: testBase("""
      #{COMMAND} -epab "http://example.com/path/to/page/" "<a href='/mock'>anchor</a>"
  """, """
    [anchor][0]

    [0]: http://example.com/mock

  """, 'Link should be relative to custom URL', '-epab')

  baseImage: testBase("""
    #{COMMAND} -epab "http://example.com/path/to/page/" "<img src='mock'>"
  """, """
    ![](http://example.com/path/to/page/mock)

  """, 'Image should be relative to custom URL', '-epab')

exports.inline = do ->
  testInline = (command, expected, desc, flags) ->
    (test) ->
      test.expect 2

      exec command, (err, stdout) ->
        test.ifError err, "Error should not be thrown using '#{flags}' flags"
        test.equal stdout, expected, "#{desc} using #{flags} flags"

        test.done()

  referenceLink: testInline("#{COMMAND} -ep \"<a href='mock'>anchor</a>\"", """
    [anchor][0]

    [0]: mock

  """, 'Link should be in reference style', '-ep')

  referenceLinkWithTitle: testInline("#{COMMAND} -ep \"<a href='mock' title='mocker'>anchor</a>\"",
    """
      [anchor][0]

      [0]: mock "mocker"

    """, 'Link should be in reference style with title', '-ep')

  inlineLink: testInline("#{COMMAND} -epi \"<a href='mock'>anchor</a>\"", """
    [anchor](mock)

  """, 'Link should be in inline style', '-epi')

  inlineLinkWithTitle: testInline("#{COMMAND} -epi \"<a href='mock' title='mocker'>anchor</a>\"",
    """
      [anchor](mock "mocker")

    """, 'Link should be in inline style with title', '-epi')

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
