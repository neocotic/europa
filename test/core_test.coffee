# Module dependencies
# -------------------

fs   = require 'fs'
md   = require '../lib/md'
path = require 'path'

# Constants
# ---------

ENCODING     = 'utf8'
FIXTURES_DIR = path.join __dirname, 'fixtures'
HTML_EXT     = '.html'

# Helpers
# -------

getPackage = ->
  JSON.parse fs.readFileSync path.resolve('package.json'), ENCODING

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
      html     = fs.readFileSync path.join(FIXTURES_DIR, "#{name}.html"), ENCODING
      markdown = fs.readFileSync path.join(FIXTURES_DIR, "#{name}.md"),   ENCODING

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

exports.version = (test) ->
  test.equal md.VERSION, getPackage().version, 'Version should match descriptor'
  test.done()
