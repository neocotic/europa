# Module dependencies
# -------------------

fs   = require 'fs'
md   = require '../lib/md'
path = require 'path'

# Constants
# ---------

ENCODING     = 'utf8'
EXPECTED_DIR = path.join __dirname, 'expected'
FIXTURES_DIR = path.join __dirname, 'fixtures'
HTML_EXT     = '.html'

# Helpers
# -------

getPackage = ->
  JSON.parse fs.readFileSync path.resolve('package.json'), ENCODING

toFileUrl = (relativePath) ->
  "file://#{toPathName relativePath}"

toPathName = (relativePath) ->
  pathName = path.resolve(process.cwd(), '..', relativePath).replace ///\\///g, '/'
  if pathName[0] isnt '/' then "/#{pathName}" else pathName

# Tests
# -----

exports.fixtures = (
  testFixture = (name) ->
    (test) ->
      html     = fs.readFileSync path.join(FIXTURES_DIR, "#{name}.html"), ENCODING
      markdown = fs.readFileSync path.join(EXPECTED_DIR, "#{name}.md"),   ENCODING

      test.equal md(html), markdown, "#{name} fixtures should match"
      test.done()

  fixtures = (
    for file in fs.readdirSync FIXTURES_DIR when HTML_EXT is path.extname file
      path.basename file, HTML_EXT
  )

  tests = {}
  tests[fixture] = testFixture fixture for fixture in fixtures
  tests
)

exports.options =
  absolute: (test) ->
    options = absolute: on

    test.equal md('<a href="mock">anchor</a>'), """
      [anchor][0]

      [0]: mock
    """, 'Link should be relative'

    test.equal md('<a href="/mock">anchor</a>'), """
      [anchor][0]

      [0]: /mock
    """, 'Root link should be relative'

    test.equal md('<a href="mock">anchor</a>', options), """
      [anchor][0]

      [0]: #{toFileUrl 'mock'}
    """, 'Link should be absolute'

    test.equal md('<a href="/mock">anchor</a>', options), """
      [anchor][0]

      [0]: #{toFileUrl '/mock'}
    """, 'Root link should be absolute'

    test.equal md('<img src="mock">'), '![](mock)', 'Image should be relative'

    test.equal md('<img src="mock">', options), "![](#{toFileUrl 'mock'})",
      'Image should be absolute'

    test.done()

  base: (test) ->
    absolute = on
    base     = 'http://example.com/path/to/page/'

    test.equal md('<a href="mock">anchor</a>', {absolute}), """
      [anchor][0]

      [0]: #{toFileUrl 'mock'}
    """, 'Link should be relative to the current working directory'

    test.equal md('<a href="/mock">anchor</a>', {absolute}), """
      [anchor][0]

      [0]: #{toFileUrl '/mock'}
    """, 'Root link should be relative to the current working directory'

    test.equal md('<img src="mock">', {absolute}), "![](#{toFileUrl 'mock'})",
      'Image should be relative to the current working directory'

    test.equal md('<a href="mock">anchor</a>', {absolute, base}), """
      [anchor][0]

      [0]: #{base}mock
    """, 'Link should be relative to custom URL'

    test.equal md('<a href="/mock">anchor</a>', {absolute, base}), """
      [anchor][0]

      [0]: http://example.com/mock
    """, 'Root link should be relative to custom URL'

    test.equal md('<img src="mock">', {absolute, base}), "![](#{base}mock)",
      'Image should be relative to custom URL'

    test.done()

  inline: (test) ->
    options = inline: on

    test.equal md('<a href="mock">anchor</a>'), """
      [anchor][0]

      [0]: mock
    """, 'Link should be in reference style'

    test.equal md('<a href="mock" title="mocker">anchor</a>'), """
      [anchor][0]

      [0]: mock "mocker"
    """, 'Link should be in reference style with title'

    test.equal md('<a href="mock">anchor</a>', options), '[anchor](mock)',
      'Link should be in inline style'

    test.equal md('<a href="mock" title="mocker">anchor</a>', options), '[anchor](mock "mocker")',
      'Link should be in inline style with title'

    test.done()

exports.version = (test) ->
  test.equal md.version, getPackage().version, 'Version should match descriptor'
  test.done()
