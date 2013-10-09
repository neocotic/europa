# [html.md](http://neocotic.com/html.md)  
# (c) 2013 Alasdair Mercer  
# Freely distributable under the MIT license.  
# Based on [Make.text](http://homepage.mac.com/tjim/) 1.5  
# (c) 2007 Trevor Jim  
# For all details and documentation:  
# <http://neocotic.com/html.md>

# Private constants
# -----------------

# Default option values.
DEFAULT_OPTIONS   =
  absolute: no
  base:     if window? then window.document.baseURI else "file://#{process.cwd()}"
  debug:    no
  inline:   no
# Save the previous value of the global `md` variable for *noConflict* mode.
PREVIOUS_MD       = @md
# Map of replacement strings for *special* Markdown characters.
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
# Regular expression to extract all `display` and `visibility` CSS properties from an inline style
# attribute.
R_HIDDEN_STYLES   = /(display|visibility)\s*:\s*[a-z]+/gi
# Regular expression to check for *hidden* values of CSS properties.
R_HIDDEN_VALUE    = /(none|hidden)\s*$/i
# Regular expression to identify elements to be generally ignored, along with their children.
R_IGNORE_CHILDREN = /// ^ (
    APPLET
  | AREA
  | AUDIO
  | BUTTON
  | CANVAS
  | DATALIST
  | EMBED
  | HEAD
  | INPUT
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
  | STYLE
  | TEXTAREA
  | TITLE
  | VIDEO
) $ ///
# Regular expression to identify elements to be parsed as simple paragraphs.
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
# Create a map of regular expressions for all of the *special* Markdown characters to simplify
# access.
REGEX             = (
  result = {}
  result[key] = new RegExp key, 'g' for own key of REPLACEMENTS
  result
)

# Helper functions
# ----------------

# Left pad `str` with the given padding string for the specified number of `times`.
padLeft = (str = '', times = 0, padStr = ' ') ->
  return str unless padStr

  str = padStr + str for i in [0...times]
  str

# Remove whitespace from both ends of `str`.  
# This tries to use the native `String.prototype.trim` function where possible.
trim = (str = '') ->
  if str.trim then str.trim() else str.replace /^\s+|\s+$/g, ''

# HTML Parser
# -----------

# Parses HTML code and/or elements into valid Markdown.  
# Elements are parsed recursively, meaning their children are also parsed.
class HtmlParser

  # Creates a new `HtmlParser` for the arguments provided.
  constructor: (@html = '', @options = {}) ->
    @atLeft     = @atNoWS = @atP           = yes
    @buffer     = ''
    @exceptions = []
    @order      = 1
    @listDepth  = 0
    @inCode     = @inPre  = @inOrderedList = no
    @last       = null
    @left       = '\n'
    @links      = []
    @linkMap    = {}
    @unhandled  = {}
    @options    = {} if typeof @options isnt 'object'

    # Copy all default option values across to `options` only where they were not specified.
    for own key, defaultValue of DEFAULT_OPTIONS
      @options[key] = defaultValue if typeof @options[key] is 'undefined'

    # Create a DOM if `window` doesn't exist (i.e. when running in node).
    @win = window ? null
    unless @win?
      doc  = require('jsdom').jsdom null, null,
        features: FetchExternalResources: no
        url:      @options.base
      @win = doc.createWindow()

    # Create the Node constants if Node doesn't exist (i.e. when running in IE < 9).
    unless @win.Node?
      @win.Node =
        ELEMENT_NODE: 1
        TEXT_NODE:    3

  # Append `str` to the buffer string.
  append: (str) ->
    @buffer += @last if @last?
    @last    = str

  # Access the value of `attribute` either directly or using `getAttribute` if possible.
  attr: (ele, attribute, direct = yes) ->
    value = if direct or typeof ele.getAttribute isnt 'function'
      ele[attribute]
    else
      ele.getAttribute attribute

    value ? ''

  # Append a Markdown line break to the buffer string.
  br: ->
    @append "  #{@left}"
    @atLeft = @atNoWS = yes

  # Prepare the parser for a `code` element.
  code: ->
    old     = @inCode
    @inCode = yes

    => @inCode = old

  # Determine whether the specified element  has the `attribute` provided either directory or using
  # `hasAttribute` if possible.
  has: (ele, attribute, direct = yes) ->
    if direct or typeof ele.hasAttribute isnt 'function'
      ele.hasOwnProperty attribute
    else
      ele.hasAttribute attribute

  # Replace any special characters that can cause problems within code sections.
  inCodeProcess: (str) ->
    str.replace /`/g, '\\`'

  # Determine whether or not the specified element is visible based on its CSS style.
  isVisible: (ele) ->
    style      = @attr ele, 'style', no
    properties = style?.match? R_HIDDEN_STYLES
    visible    = yes

    # Test all relevant CSS properties for possible hiding behaviours.
    if properties?
      visible = not R_HIDDEN_VALUE.test property for property in properties

    # Attempt to derive elements visibility based on its computed CSS style where appropriate.
    if visible and typeof @win.getComputedStyle is 'function'
      try
        style = @win.getComputedStyle ele, null

        if typeof style?.getPropertyValue is 'function'
          display    = style.getPropertyValue 'display'
          visibility = style.getPropertyValue 'visibility'
          visible    = display isnt 'none' and visibility isnt 'hidden'
      catch err
        @thrown err, 'getComputedStyle'

    visible

  # Append a Markdown list item based on the context of the current list.
  li: ->
    str = if @inOrderedList then "#{@order++}. " else '* '
    str = padLeft str, (@listDepth - 1) * 2

    @append str

  # Replace any special characters that can cause problems in normal Markdown blocks.
  nonPreProcess: (str) ->
    str = str.replace /\n([ \t]*\n)+/g, '\n'
    str = str.replace /\n[ \t]+/g,      '\n'
    str = str.replace /[ \t]+/g,        ' '
    str = str.replace REGEX[key], value for own key, value of REPLACEMENTS
    str

  # Prepare the parser for an `ol` element.
  ol: ->
    do @p if @listDepth is 0

    inOrderedList  = @inOrderedList
    order          = @order
    @inOrderedList = yes
    @order         = 1
    @listDepth++

    =>
      @inOrderedList = inOrderedList
      @order         = order
      @listDepth--

  # Append `str` to the buffer string.
  output: (str) ->
    return unless str

    # Strip leading whitespace when code blocks accordingly.
    unless @inPre
      str = if @atNoWS
        str.replace /^[ \t\n]+/, ''
      else if /^[ \t]*\n/.test str
        str.replace /^[ \t\n]+/, '\n'
      else
        str.replace /^[ \t]+/, ' '

    return if str is ''

    # Ensure this parser is in the correct context.
    @atP    = /\n\n$/.test str
    @atLeft = /\n$/.test str
    @atNoWS = /[ \t\n]$/.test str
    @append str.replace /\n/g, @left

  # Create a function that can be called later to append `str` to the buffer string while keeping
  # the parser in context.  
  # This function is just a lazy shorthand.
  outputLater: (str) ->
    => @output str

  # Append a Markdown paragraph section to the buffer string.
  p: ->
    return if @atP

    unless @atLeft
      @append @left
      @atLeft = yes

    @append @left
    @atNoWS = @atP = yes

  # Parse the configured HTML into valid Markdown.
  parse: ->
    @buffer = ''

    return @buffer unless @html

    # Create a wrapper element to insert the configured HTML into.
    container = @win.document.createElement 'div'
    if typeof @html is 'string'
      container.innerHTML = @html
    else
      container.appendChild @html

    # Process the contents (i.e. the preconfigured HTML) of the wrapper element.
    @process container

    # Ensure all link references are correctly appended to be end of the buffer string.
    if @links.length
      @append '\n\n'
      @append "[#{i}]: #{link}\n" for link, i in @links when link

    # This isn't nice and I wouldn't really recommend users use this option but, when `debug` is
    # enabled, output all debug information either to the console (e.g. `stdout` in node).
    if @options.debug
      # List any tags that were ignored during processing.
      unhandledTags = (tag for own tag of @unhandled).sort()
      console.log if unhandledTags.length
        """
          Ignored tags;
          #{unhandledTags.join ', '}
        """
      else
        'No tags were ignored'

      # List any exceptions that were caught (and swallowed) during processing.
      console.log if @exceptions.length
        """
          Exceptions;
          #{@exceptions.join '\n'}
        """
      else
        'No exceptions were thrown'

    # End the buffer string cleanly and we're done!
    @append ''
    @buffer = trim @buffer

  # Prepare the parser for a `pre` element.
  pre: ->
    old    = @inPre
    @inPre = yes

    => @inPre = old

  # Parse the specified element and append the generated Markdown to the buffer string.
  process: (ele) ->
    # Only *visible* elements are processed. Doing our best to identify those that are hidden.
    return unless @isVisible ele

    if ele.nodeType is @win.Node.ELEMENT_NODE
      # Handle typical node elements (e.g. `<span>foo bar</span>`).
      skipChildren = no

      # Determine the best way (if any) to handle `ele`.
      try
        if R_IGNORE_CHILDREN.test ele.tagName
          # Don't process the element or any of its children.
          skipChildren = yes
        else if /^H[1-6]$/.test ele.tagName
          # Convert HTML headers (e.g. `h3`) to their Markdown equivalents (e.g. `###`).
          level = parseInt ele.tagName.match(/([1-6])$/)[1]

          do @p
          @output "#{('#' for i in [1..level]).join ''} "
        else if R_PARAGRAPH_ONLY.test ele.tagName
          # Paragraphs are easy as Pi.
          do @p
        else
          switch ele.tagName
            # Ignore the element, but we still want to process their children (obviously).
            when 'BODY', 'FORM' then break
            # Can be a simple paragraph but, if `ele` doesn't have an `open` attribute specified,
            # we don't want to process anything other than the first nested `summary` element.
            when 'DETAILS'
              do @p

              unless @has ele, 'open', no
                skipChildren = yes
                summary      = ele.getElementsByTagName('summary')[0]
                @process summary if summary
            # Easiest of the bunch... just a Markdown line break.
            when 'BR' then do @br
            # Insert a horizontal ruler padded on before and after.
            when 'HR'
              do @p
              @output '---'
              do @p
            # Any element that is commonly displayed in italics as well as `U` (i.e. underline)
            # since vanilla Markdown does not support this but the site did try to highlight the
            # contents.
            when 'CITE', 'DFN', 'EM', 'I', 'U', 'VAR'
              @output '_'
              @atNoWS = yes
              after   = @outputLater '_'
            # Any element that is commonly display in bold.
            when 'DT', 'B', 'STRONG'
              do @p if ele.tagName is 'DT'

              @output '**'
              @atNoWS = yes
              after   = @outputLater '**'
            # Uncommon element but just wrap its contens in quotation marks. Job done!
            when 'Q'
              @output '"'
              @atNoWS = yes
              after   = @outputLater '"'
            # Lists need their items to be displayed correctly depending on their type while also
            # ensuring nested lists are indented properly.
            when 'OL', 'UL'
              after = if ele.tagName is 'OL' then do @ol else do @ul
            # List items are displayed differently depending on what kind of list they're parent
            # is (i.e. ordered or unordered).
            when 'LI'
              @replaceLeft '\n'
              do @li
            # A pre-formatted element just needs to have its contents properly indented.
            when 'PRE'
              after1 = @pushLeft '    '
              after2 = do @pre

              after  = ->
                do after1
                do after2
            # Inline code elements translate pretty easily but we need to make sure we don't do
            # anything dumb inside a `pre` element.
            when 'CODE', 'KBD', 'SAMP'
              break if @inPre

              @output '`'

              after1 = do @code
              after2 = @outputLater '`'

              after  = ->
                do after1
                do after2
            # Block quotes (and similar elements) are relatively straight forward.
            when 'BLOCKQUOTE', 'DD' then after = @pushLeft '> '
            # Links on the other hand are probably the trickiest.
            when 'A'
              # Extract the link URL from `ele`.  
              # Links with no URLs are treated just like text-containing elements (e.g. `span`).  
              # `a.href` always returns an absolute URL while `a.getAttribute('href')` always
              # returns the exact value of the `href` attribute. For this reason we need to be sure
              # that we extract the URL correctly based on the state of the `absolute` option.
              href = @attr ele, 'href', @options.absolute
              break unless href

              # Be sure to include the title after each link reference that will be displayed at
              # the end of the Markdown output, where possible.
              title  = @attr ele, 'title'
              href  += " \"#{title}\"" if title

              # Determine what style the link should be generated in (i.e. *inline* or
              # *reference*) depending on the state of the `inline` option.
              suffix = if @options.inline
                # *Inline* style means all links have their URLs (and possible titles) included
                # immediately after their contents (e.g.
                # `[my link](/path/to/page.html "My title")`).
                "(#{href})"
              else
                # *Reference* style means all links have an index included immediately after their
                # contents that directly maps to their URL (and possible title) which are displayed
                # at the end of the buffer string (e.g. `[my link][0]` and then later
                # `[0]: /path/to/page.html "My title"`).  
                # Duplicate link/title combination references are avoided for a cleaner result.
                "[#{@linkMap[href] ?= @links.push(href) - 1}]"

              @output '['
              @atNoWS = yes
              after   = @outputLater "]#{suffix}"
            # Images are very similar to links, just without the added complexity of references.
            when 'IMG'
              # Extract the image URL from `ele`.  
              # Unlike links, any image without a URL is just ignored. Obviously, any contents of
              # an `img` element are always ignored since they can never contain anything valid.  
              # `img.src` always returns an absolute URL while `img.getAttribute('src')` always
              # returns the exact value of the `src` attribute. For this reason we need to be sure
              # that we extract the URL correctly based on the state of the `absolute` option.
              skipChildren = yes
              src          = @attr ele, 'src', @options.absolute
              break unless src

              @output "![#{@attr ele, 'alt'}](#{src})"
            # Frames are **HELL** (fact!), but we'll do our best to support their contents.
            when 'FRAME', 'IFRAME'
              skipChildren = yes

              try
                if ele.contentDocument?.documentElement
                  @process ele.contentDocument.documentElement
              catch err
                @thrown err, 'contentDocument'
            # Table rows should just be separated, that's all.
            when 'TR' then after = @p
            # Couldn't find a suitable match for `ele` so let's ignore it, but we'll still process
            # any children it has.
            else
              @unhandled[ele.tagName] = null if @options.debug
      catch err
        @thrown err, ele.tagName

      # Process all child elements of `ele` if it has any and we've not been told to ignore them.
      @process childNode for childNode in ele.childNodes unless skipChildren

      # Ensure any callback are invoked being proceeding **if** they are specified.
      after?.call this
    else if ele.nodeType is @win.Node.TEXT_NODE
      # Handle simple text nodes (e.g. `"foo bar"`) according to the current context.
      @output if @inPre
        ele.nodeValue
      else if @inCode
        @inCodeProcess ele.nodeValue
      else
        @nonPreProcess ele.nodeValue

  # Attach `str` to the start of the current line.
  pushLeft: (str) ->
    old    = @left
    @left += str

    if @atP then @append str else do @p

    =>
      @left   = old
      @atLeft = @atP = no

      do @p

  # Replace the left indent with `str`.
  replaceLeft: (str) ->
    unless @atLeft
      @append @left.replace /[ ]{2,4}$/, str

      @atLeft = @atNoWS = @atP = yes
    else if @last
      @last   = @last.replace /[ ]{2,4}$/, str

  # Ensure that the `exception` and the corresponding `message` is logged if the `debug` option is
  # enabled.
  thrown: (exception, message) ->
    @exceptions.push "#{message}: #{exception}" if @options.debug

  # Prepare the parser for a `ul` element.
  ul: ->
    do @p if @listDepth is 0

    inOrderedList  = @inOrderedList
    order          = @order
    @inOrderedList = no
    @order         = 1
    @listDepth++

    =>
      @inOrderedList = inOrderedList
      @order         = order
      @listDepth--

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
md.version = md.VERSION = '3.0.2'

# Public functions
# ----------------

# Run html.md in *noConflict* mode, returning the `md` variable to its previous owner.  
# Returns a reference to our `md`.
md.noConflict = =>
  @md = PREVIOUS_MD
  md
