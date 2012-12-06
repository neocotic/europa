# Module dependencies
# -------------------

coffee = require 'coffee-script'
{exec} = require 'child_process'
fs = require 'fs'
{minify} = require 'uglify-js'
path = require 'path'

# Constants
# ---------

COMMENT_COFFEE = '#'
COMMENT_JS = '//'
DIST_DIR = 'dist'
DIST_FILE = 'md.min.js'
DIST_PATH = path.join DIST_DIR, DIST_FILE
DOCS_DIR = 'docs'
ENCODING = 'utf8'
LIB_DIR = 'lib'
LIB_FILE = 'md.js'
LIB_PATH = path.join LIB_DIR, LIB_FILE
R_COMMENT_COFFEE = /^#/
R_COMMENT_JS = /^\/\//
SRC_DIR = 'src'
SRC_FILE = 'md.coffee'
SRC_PATH = path.join SRC_DIR, SRC_FILE
WRITE_MODE = 0o777

# Helpers
# -------

compile = (cb) ->
  console.log "Compiling CoffeeScript: #{SRC_PATH}..."
  code = fs.readFileSync SRC_PATH, ENCODING
  header = extractHeader code, R_COMMENT_COFFEE, COMMENT_JS
  ws = fs.createWriteStream LIB_PATH,
    encoding: ENCODING
    mode: WRITE_MODE
  ws.on 'close', ->
    console.log "Successfully compiled to #{LIB_PATH}!"
    cb?()
  ws.on 'error', (err) -> throw err if err
  ws.write header
  ws.end coffee.compile(code), ENCODING

distribution = (cb) ->
  console.log "Minifying JavaScript: #{LIB_PATH}..."
  code = fs.readFileSync LIB_PATH, ENCODING
  header = extractHeader code, R_COMMENT_JS
  ws = fs.createWriteStream DIST_PATH,
    encoding: ENCODING
    mode: WRITE_MODE
  ws.on 'close', ->
    console.log "Successfully minified to #{DIST_PATH}!"
    cb?()
  ws.on 'error', (err) -> throw err if err
  ws.write header
  ws.end minify(code, fromString: yes).code, ENCODING

extractHeader = (code = '', r_comment, replacement) ->
  header = ''
  inComment = no
  for line in code.split '\n'
    if r_comment.test line
      inComment = yes
      line = line.replace r_comment, replacement if replacement
      header += "#{line.trim()}\n"
    else if inComment
      break
  header

# Tasks
# -----

task 'build', 'Build library', ->
  console.log 'Building html.md...'
  compile -> distribution -> console.log 'Build completed!'

task 'docs', 'Create documentation', ->
  console.log 'Generating documentation...'
  exec "docco -o #{DOCS_DIR} #{SRC_PATH}", (err) ->
    throw err if err
    console.log 'Documentation created!'