# [html.md](http://neocotic.com/html.md) 2.0.2  
# (c) 2013 Alasdair Mercer  
# Freely distributable under the MIT license.  
# Based on [Make.text](http://homepage.mac.com/tjim/) 1.5  
# (c) 2007 Trevor Jim  
# Licensed under the GPL Version 2 license.  
# For all details and documentation:  
# <http://neocotic.com/html.md>

# Private constants
# -----------------

# Default option values.
DEFAULT_OPTIONS   =
  absolute: off
  debug:    off
# Save the previous value of the global `md` variable.
PREVIOUS_MD       = @md
# Replacement strings for special Markdown characters.
REPLACEMENTS      =
  '\\\\':              '\\\\'
  '\\[':               '\\['
  '\\]':               '\\]'
  '>':                 '\\>'
  '_':                 '\\_'
  '\\*':               '\\*'
  '`':                 '\\`'
  '#':                 '\\#'
  '([0-9])\\.(\\s|$)': '$1\\.$2'
  '\u00a9':            '(c)'
  '\u00ae':            '(r)'
  '\u2122':            '(tm)'
  '\u00a0':            ' '
  '\u00b7':            '\\*'
  '\u2002':            ' '
  '\u2003':            ' '
  '\u2009':            ' '
  '\u2018':            '\''
  '\u2019':            '\''
  '\u201c':            '"'
  '\u201d':            '"'
  '\u2026':            '...'
  '\u2013':            '--'
  '\u2014':            '---'
# Regular expression to extract all `display` and `visibility` CSS properties
# from an inline style attribute.
R_HIDDEN_STYLES   = /(display|visibility)\s*:\s*[a-z]+/gi
# Regular expression to check for *hidden* values of CSS properties.
R_HIDDEN_VALUE    = /(none|hidden)\s*$/i
# Regular expression to identify elements to be generally ignored along with
# their children.
R_IGNORE_CHILDREN = /// ^ (
    APPLET
  | AREA
  | AUDIO
  | BUTTON
  | CANVAS
  | COMMAND
  | DATALIST
  | EMBED
  | HEAD
  | INPUT
  | KEYGEN
  | MAP
  | MENU
  | METER
  | NOFRAMES
  | NOSCRIPT
  | OBJECT
  | OPTGROUP
  | OPTION
  | PARAM
  | PROGRESS
  | RP
  | RT
  | RUBY
  | SCRIPT
  | SELECT
  | SOURCE
  | STYLE
  | TEXTAREA
  | TITLE
  | TRACK
  | VIDEO
) $ ///
# Regular expression to identify elements to be parsed simply as paragraphs.
R_PARAGRAPH_ONLY  = /// ^ (
    ADDRESS
  | ARTICLE
  | ASIDE
  | DIV
  | FIELDSET
  | FOOTER
  | HEADER
  | NAV
  | P
  | SECTION
) $ ///
# Create regular expressions for all of the special Markdown characters.
REGEX             = (
  result = {}
  for own key, value of REPLACEMENTS
    result[key] = new RegExp key, 'g'
  result
)

# Environment Support
# -------------------

# Create a DOM for NodeJS environment.
win = window ? null
unless window?
  jsdom = require 'jsdom'
  doc   = jsdom.jsdom null, null, features: FetchExternalResources: no
  win   = doc.createWindow()

# Try to ensure Node is available with the required constants.
Node = win.Node ? {}
Node.ELEMENT_NODE ?= 1
Node.TEXT_NODE    ?= 3

# HTML Parser
# -----------

# Parses HTML code/elements into valid Markdown.
# Elements are parsed recursively, meaning their children are also parsed.
class HtmlParser

  # Creates a new `HtmlParser` for the arguments provided.
  constructor: (@html = '', @options = {}) ->
    @atLeft     = @atNoWS = @atP = yes
    @buffer     = ''
    @exceptions = []
    @inCode     = @inPre = @inOrderedList = @parsed = no
    @last       = null
    @left       = '\n'
    @links      = []
    @linkMap    = {}
    @unhandled  = {}
    @options    = {} if typeof @options isnt 'object'
    for own key, defaultValue of DEFAULT_OPTIONS
      @options[key] = defaultValue unless @options.hasOwnProperty key

  # Append `str` to the buffer string.
  append: (str) ->
    @buffer += @last if @last?
    @last    = str

  # Access the value of `attribute` either directly or using `getAttribute`.
  attr: (ele, attribute, direct = yes) ->
    if direct then ele[attribute] else ele.getAttribute? attribute

  # Append a Markdown line break to the buffer string.
  br: ->
    @append "  #{@left}"
    @atLeft = @atNoWS = yes

  # Prepare the parser for a `code` element.
  code: ->
    old     = @inCode
    @inCode = yes
    => @inCode = old

  # Replace any special characters that can cause problems within code.
  inCodeProcess: (str) ->
    str.replace /`/g, '\\`'

  # Determine whether or not `ele` is visible based on its style.
  isVisible: (ele) ->
    style      = @attr ele, 'style', no
    properties = style?.match R_HIDDEN_STYLES
    visible    = yes
    if properties?
      visible  = not R_HIDDEN_VALUE.test property for property in properties
    if visible and win.getComputedStyle?
      try
        style  = win.getComputedStyle ele, null
        if typeof style?.getPropertyValue is 'function'
          display     = style.getPropertyValue 'display'
          visibility  = style.getPropertyValue 'visibility'
          visible     = display isnt 'none' and visibility isnt 'hidden'
      catch err
        @thrown err, 'getComputedStyle'
    visible

  # Replace any special characters that can cause problems in normal Markdown.
  nonPreProcess: (str) ->
    str = str.replace /\n([ \t]*\n)+/g, '\n'
    str = str.replace /\n[ \t]+/g, '\n'
    str = str.replace /[ \t]+/g, ' '
    str = str.replace REGEX[key], value for own key, value of REPLACEMENTS
    str

  # Prepare the parser for an `ol` element.
  ol: ->
    old            = @inOrderedList
    @inOrderedList = yes
    => @inOrderedList = old

  # Append `str` to the buffer string while keeping the parser in context.
  output: (str) ->
    return unless str
    unless @inPre
      if @atNoWS
        str = str.replace /^[ \t\n]+/, ''
      else if /^[ \t]*\n/.test str
        str = str.replace /^[ \t\n]+/, '\n'
      else
        str = str.replace /^[ \t]+/, ' '
    return if str is ''
    @atP    = /\n\n$/.test str
    @atLeft = /\n$/.test str
    @atNoWS = /[ \t\n]$/.test str
    @append str.replace /\n/g, @left

  # Create a function that can be called later to append `str` to the buffer
  # string while keeping the parser in context.
  outputLater: (str) ->
    => @output str

  # Append a Markdown paragraph to the buffer string.
  p: ->
    return if @atP
    unless @atLeft
      @append @left
      @atLeft = yes
    @append @left
    @atNoWS = @atP = yes

  # Parse the HTML into valid Markdown.
  parse: ->
    return '' unless @html
    return @buffer if @parsed
    container = win.document.createElement 'div'
    if typeof @html is 'string'
      container.innerHTML = @html
    else
      container.appendChild @html
    @process container
    if @links.length
      @append '\n\n'
      @append "[#{i}]: #{link}\n" for link, i in @links when link
    if @options.debug
      unhandledTags = (tag for own tag of @unhandled).sort()
      if unhandledTags.length
        console.log """
          Ignored tags;
          #{unhandledTags.join ', '}
        """
      else
        console.log 'No tags were ignored'
      if @exceptions.length
        console.log """
          Exceptions;
          #{@exceptions.join '\n'}
        """
      else
        console.log 'No exceptions were thrown'
    @append ''
    @parsed = yes
    @buffer = @buffer.trim()

  # Prepare the parser for a `pre` element.
  pre: ->
    old    = @inPre
    @inPre = yes
    => @inPre = old

  # Parse the specified element and append the generated Markdown to the buffer
  # string.
  process: (ele) ->
    return unless @isVisible ele
    if ele.nodeType is Node.ELEMENT_NODE
      skipChildren = no
      try
        if R_IGNORE_CHILDREN.test ele.tagName
          skipChildren = yes
        else if /^H[1-6]$/.test ele.tagName
          level = parseInt ele.tagName.match(/([1-6])$/)[1]
          @p()
          @output "#{('#' for i in [1..level]).join ''} "
        else if R_PARAGRAPH_ONLY.test ele.tagName
          @p()
        else
          switch ele.tagName
            when 'BODY', 'FORM' then break
            when 'DETAILS'
              @p()
              unless @attr ele, 'open', no
                skipChildren = yes
                summary      = ele.getElementsByTagName('summary')[0]
                @process summary if summary
            when 'BR' then @br()
            when 'HR'
              @p()
              @output '---'
              @p()
            when 'CITE', 'DFN', 'EM', 'I', 'U', 'VAR'
              @output '_'
              @atNoWS = yes
              after   = @outputLater '_'
            when 'DT', 'B', 'STRONG'
              @p() if ele.tagName is 'DT'
              @output '**'
              @atNoWS = yes
              after   = @outputLater '**'
            when 'Q'
              @output '"'
              @atNoWS = yes
              after   = @outputLater '"'
            when 'OL', 'PRE', 'UL'
              after1 = @pushLeft '    '
              after2 = switch ele.tagName
                when 'OL'  then @ol()
                when 'PRE' then @pre()
                when 'UL'  then @ul()
              after  = ->
                after1()
                after2()
            when 'LI'
              @replaceLeft if @inOrderedList then '1.  ' else '*   '
            when 'CODE', 'KBD', 'SAMP'
              unless @inPre
                @output '`'
                after1 = @code()
                after2 = @outputLater '`'
                after  = ->
                  after1()
                  after2()
            when 'BLOCKQUOTE', 'DD' then after = @pushLeft '> '
            when 'A'
              href  = @attr ele, 'href', @options.absolute
              break unless href
              title = @attr ele, 'title'
              href += " \"#{title}\"" if title
              if @linkMap[href]?
                index          = @linkMap[href]
              else
                index          = @links.push(href) - 1
                @linkMap[href] = index
              @output '['
              @atNoWS = yes
              after   = @outputLater "][#{index}]"
            when 'IMG'
              skipChildren = yes
              src          = @attr ele, 'src', @options.absolute
              break unless src
              @output "![#{@attr ele, 'alt'}](#{src})"
            when 'FRAME', 'IFRAME'
              skipChildren = yes
              try
                if ele.contentDocument?.documentElement
                  @process ele.contentDocument.documentElement
              catch err
                @thrown err, 'contentDocument'
            when 'TR'
              after = @p
            else
              @unhandled[ele.tagName] = null if @options.debug
      catch err
        @thrown err, ele.tagName
      unless skipChildren
        @process childNode for childNode in ele.childNodes
      after?.call this
    else if ele.nodeType is Node.TEXT_NODE
      if @inPre
        @output ele.nodeValue
      else if @inCode
        @output @inCodeProcess ele.nodeValue
      else
        @output @nonPreProcess ele.nodeValue

  # Attach `str` to the start of the current line.
  pushLeft: (str) ->
    old    = @left
    @left += str
    if @atP
      @append str
    else
      @p()
    =>
      @left   = old
      @atLeft = @atP = no
      @p()

  # Replace the left indent with `str`.
  replaceLeft: (str) ->
    unless @atLeft
      @append @left.replace /[ ]{4}$/, str
      @atLeft = @atNoWS = @atP = yes
    else if @last
      @last   = @last.replace /[ ]{4}$/, str

  # Log the exception and the corresponding message if debug mode is enabled.
  thrown: (exception, message) ->
    @exceptions.push "#{message}: #{exception}" if @options.debug

  # Prepare the parser for a `ul` element.
  ul: ->
    old            = @inOrderedList
    @inOrderedList = no
    => @inOrderedList = old

# html.md setup
# -------------

# Build the publicly exposed API.
@md = md = (html, options) ->
  new HtmlParser(html, options).parse()

# Export `md` for NodeJS and CommonJS.
if module?.exports
  module.exports = md
else if typeof define is 'function' and define.amd
  define 'md', -> md

# Public constants
# ----------------

# Current version of html.md.
md.VERSION = '2.0.2'

# Public functions
# ----------------

# Run html.md in *noConflict* mode, returning the `md` variable to its
# previous owner.  
# Returns a reference to `md`.
md.noConflict = =>
  @md = PREVIOUS_MD
  md