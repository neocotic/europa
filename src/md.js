/*
 * html.md
 * https://github.com/neocotic/html.md
 *
 * Copyright (c) 2015 Alasdair Mercer
 *
 * Based on Make.text 1.5
 * http://homepage.mac.com/tjim/
 *
 * Copyright (c) 2007 Trevor Jim
 *
 * Licensed under the MIT license.
 * https://github.com/neocotic/html.md/blob/master/LICENSE.md
 */

'use strict'

// Default option values.
const defaultOptions = {
  absolute: false,
  base: typeof window !== 'undefined' && window != null ? window.document.baseURI : `file://${process.cwd()}`,
  debug: false,
  inline: false
}
// Save the previous value of the global `md` variable for *noConflict* mode.
const previousMd = this.md
// Map of replacement strings for *special* Markdown characters.
const replacements = {
  '\\\\': '\\\\',
  '\\[': '\\[',
  '\\]': '\\]',
  '>': '\\>',
  '_': '\\_',
  '\\*': '\\*',
  '`': '\\`',
  '#': '\\#',
  '([0-9])\\.(\\s|$)': '$1\\.$2',
  '\u00a9': '(c)',
  '\u00ae': '(r)',
  '\u2122': '(tm)',
  '\u00a0': ' ',
  '\u00b7': '\\*',
  '\u2002': ' ',
  '\u2003': ' ',
  '\u2009': ' ',
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201c': '"',
  '\u201d': '"',
  '\u2026': '...',
  '\u2013': '--',
  '\u2014': '---'
}
// Regular expression to extract all `display` and `visibility` CSS properties from an inline style attribute.
const rHiddenStyles = /(display|visibility)\s*:\s*[a-z]+/gi
// Regular expression to check for *hidden* values of CSS properties.
const rHiddenValue = /(none|hidden)\s*$/i
// Regular expression to identify elements to be generally ignored, along with their children.
const rIgnoreChildren = /^(APPLET|AREA|AUDIO|BUTTON|CANVAS|DATALIST|EMBED|HEAD|INPUT|MAP|MENU|METER|NOFRAMES|NOSCRIPT|OBJECT|OPTGROUP|OPTION|PARAM|PROGRESS|RP|RT|RUBY|SCRIPT|SELECT|STYLE|TEXTAREA|TITLE|VIDEO)$/
// Regular expression to identify elements to be parsed as simple paragraphs.
const rParagraphOnly = /^(ADDRESS|ARTICLE|ASIDE|DIV|FIELDSET|FOOTER|HEADER|NAV|P|SECTION)$/
// Create a map of regular expressions for all of the *special* Markdown characters to simplify access.
const regex = {}
for (let key in replacements) {
  if (replacements.hasOwnProperty(key)) {
    regex[key] = new RegExp(key, 'g')
  }
}

// Left pad `str` with the given padding string for the specified number of `times`.
function padLeft(str, times, padStr) {
  if (str == null) {
    str = ''
  }
  if (times == null) {
    times = 0
  }
  if (padStr == null) {
    padStr = ' '
  }

  if (!padStr) {
    return str
  }

  for (let i = 0; i < times; i++) {
    str = padStr + str
  }

  return str
}

// Remove whitespace from both ends of `str`.
// This tries to use the native `String.prototype.trim` function where possible.
function trim(str) {
  if (str == null) {
    str = ''
  }

  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
}

// Parses HTML code and/or elements into valid Markdown.
// Elements are parsed recursively, meaning their children are also parsed.
class HtmlParser {

  // Creates a new `HtmlParser` for the arguments provided.
  constructor(html, options) {
    this.html = html != null ? html : ''
    this.options = Object.assign({}, defaultOptions, options)
    this.atLeft = this.atNoWS = this.atP = true
    this.buffer = ''
    this.exceptions = []
    this.order = 1
    this.listDepth = 0
    this.inCode = this.inPre = this.inOrderedList = false
    this.last = null
    this.left = '\n'
    this.links = []
    this.linkMap = {}
    this.unhandled = {}

    // Create a DOM if `window` doesn't exist (i.e. when running in node).
    this.win = typeof window !== 'undefined' ? window : null
    if (this.win != null) {
      let doc = require('jsdom').jsdom(undefined, {
        features: {
          FetchExternalResources: false
        },
        url: this.options.base
      })
      this.win = doc.defaultView
    }

    // Create the Node constants if Node doesn't exist (i.e. when running in IE < 9).
    if (this.win.Node != null) {
      this.win.Node = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3
      }
    }
  }

  // Append `str` to the buffer string.
  append(str) {
    if (this.last != null) {
      this.buffer += this.last
    }
    this.last = str
  }

  // Access the value of `attribute` either directly or using `getAttribute` if possible.
  attr(ele, attribute, direct) {
    if (direct == null) {
      direct = true
    }

    let value = direct || typeof ele.getAttribute !== 'function' ? ele[attribute] : ele.getAttribute(attribute)

    return value != null ? value : ''
  }

  // Append a Markdown line break to the buffer string.
  br() {
    this.append(`  ${this.left}`)
    this.atLeft = this.atNoWS = true
  }

  // Prepare the parser for a `code` element.
  code() {
    let old = this.inCode
    this.inCode = true

    return () => {
      this.inCode = old
    }
  }

  // Determine whether the specified element  has the `attribute` provided either directory or using `hasAttribute` if
  // possible.
  has(ele, attribute, direct) {
    if (direct == null) {
      direct = true
    }

    if (direct || typeof ele.hasAttribute !== 'function') {
      return ele.hasOwnProperty(attribute)
    }

    return ele.hasAttribute(attribute)
  }

  // Replace any special characters that can cause problems within code sections.
  inCodeProcess(str) {
    return str.replace(/`/g, '\\`')
  }

  // Determine whether or not the specified element is visible based on its CSS style.
  isVisible(ele) {
    let style = this.attr(ele, 'style', false)
    let properties = style != null && typeof style.match === 'function' ? style.match(rHiddenStyles) : null
    let visible = true

    // Test all relevant CSS properties for possible hiding behaviours.
    if (properties != null) {
      for (let property of properties) {
        visible = !rHiddenValue.test(property)
      }
    }

    // Attempt to derive elements visibility based on its computed CSS style where appropriate.
    if (visible && typeof this.win.getComputedStyle === 'function') {
      try {
        style = this.win.getComputedStyle(ele, null)

        if (style != null && typeof style.getPropertyValue === 'function') {
          let display = style.getPropertyValue('display')
          let visibility = style.getPropertyValue('visibility')

          visible = display !== 'none' && visibility !== 'hidden'
        }
      } catch (error) {
        this.thrown(error, 'getComputedStyle')
      }
    }

    return visible
  }

  // Append a Markdown list item based on the context of the current list.
  li() {
    let str = this.inOrderedList ? `${this.order++}. ` : '* '
    str = padLeft(str, (this.listDepth - 1) * 2)

    this.append(str)
  }

  // Replace any special characters that can cause problems in normal Markdown blocks.
  nonPreProcess(str) {
    str = str.replace(/\n([ \t]*\n)+/g, '\n')
    str = str.replace(/\n[ \t]+/g, '\n')
    str = str.replace(/[ \t]+/g, ' ')

    for (let key in replacements) {
      if (replacements.hasOwnProperty(key)) {
        let value = replacements[key]

        str = str.replace(regex[key], value)
      }
    }

    return str
  }

  // Prepare the parser for an `ol` element.
  ol() {
    if (this.listDepth === 0) {
      this.p()
    }

    let inOrderedList = this.inOrderedList
    let order = this.order

    this.inOrderedList = true
    this.order = 1
    this.listDepth++

    return () => {
      this.inOrderedList = inOrderedList
      this.order = order
      this.listDepth--
    }
  }

  // Append `str` to the buffer string.
  output(str) {
    if (!str) {
      return
    }

    // Strip leading whitespace when code blocks accordingly.
    if (!this.inPre) {
      if (this.atNoWS) {
        str = str.replace(/^[ \t\n]+/, '')
      } else if (/^[ \t]*\n/.test(str)) {
        str = str.replace(/^[ \t\n]+/, '\n')
      } else {
        str = str.replace(/^[ \t]+/, ' ')
      }
    }

    if (str === '') {
      return
    }

    // Ensure this parser is in the correct context.
    this.atP = /\n\n$/.test(str)
    this.atLeft = /\n$/.test(str)
    this.atNoWS = /[ \t\n]$/.test(str)
    this.append(str.replace(/\n/g, this.left))
  }

  // Create a function that can be called later to append `str` to the buffer string while keeping the parser in
  // context.
  // This function is just a lazy shorthand.
  outputLater(str) {
    return () => {
      this.output(str)
    }
  }

  // Append a Markdown paragraph section to the buffer string.
  p() {
    if (this.atP) {
      return
    }

    if (!this.atLeft) {
      this.append(this.left)
      this.atLeft = true
    }

    this.append(this.left)
    this.atNoWS = this.atP = true
  }

  // Parse the configured HTML into valid Markdown.
  parse() {
    this.buffer = ''

    if (!this.html) {
      return this.buffer
    }

    // Create a wrapper element to insert the configured HTML into.
    let container = this.win.document.createElement('div')
    if (typeof this.html === 'string') {
      container.innerHTML = this.html
    } else {
      container.appendChild(this.html)
    }

    // Process the contents (i.e. the preconfigured HTML) of the wrapper element.
    this.process(container)

    // Ensure all link references are correctly appended to be end of the buffer string.
    if (this.links.length) {
      this.append('\n\n')
      this.links.forEach((link, i) => {
        if (link) {
          this.append(`[${i}]: ${link}\n`)
        }
      })
    }

    // This isn't nice and I wouldn't really recommend users use this option but, when `debug` is enabled, output all
    // debug information either to the console (e.g. `stdout` in node).
    if (this.options.debug) {
      // List any tags that were ignored during processing.
      let unhandledTags = Object.keys(this.unhandled).sort()
      if (unhandledTags.length) {
        console.log(`
          Ignored tags;
          ${unhandledTags.join(', ')}
        `)
      } else {
        console.log('No tags were ignored')
      }

      // List any exceptions that were caught (and swallowed) during processing.
      if (this.exceptions.length) {
        console.log(`
          Exceptions;
          ${this.exceptions.join('\n')}
        `)
      } else {
        console.log('No exceptions were thrown')
      }
    }

    // End the buffer string cleanly and we're done!
    this.append('')
    this.buffer = trim(this.buffer)
  }

  // Prepare the parser for a `pre` element.
  pre() {
    let old = this.inPre
    this.inPre = true

    return () => {
      this.inPre = old
    }
  }

  // Parse the specified element and append the generated Markdown to the buffer string.
  process(ele) {
    // Only *visible* elements are processed. Doing our best to identify those that are hidden.
    if (!this.isVisible(ele)) {
      return
    }

    if (ele.nodeType === this.win.Node.ELEMENT_NODE) {
      let after
      // Handle typical node elements (e.g. `<span>foo bar</span>`).
      let skipChildren = false

      // Determine the best way (if any) to handle `ele`.
      try {
        if (rIgnoreChildren.test(ele.tagName)) {
          // Don't process the element or any of its children.
          skipChildren = true
        } else if (/^H[1-6]$/.test(ele.tagName)) {
          // Convert HTML headers (e.g. `h3`) to their Markdown equivalents (e.g. `###`).
          let level = parseInt(ele.tagName.match(/([1-6])$/)[1], 10)
          let headerPrefix = ''
          for (let i = 0; i < level; i++) {
            headerPrefix += '#'
          }

          this.p()
          this.output(`${headerPrefix} `)
        } else if (rParagraphOnly.test(ele.tagName)) {
          // Paragraphs are easy as Pi.
          this.p()
        } else {
          switch (ele.tagName) {
          // Ignore the element, but we still want to process their children (obviously).
          case 'BODY':
          case 'FORM':
            break
          // Can be a simple paragraph but, if `ele` doesn't have an `open` attribute specified, we don't want to
          // process anything other than the first nested `summary` element.
          case 'DETAILS':
            this.p()

            if (!this.has(ele, 'open', false)) {
              skipChildren = true

              let summary = ele.getElementsByTagName('summary')[0]
              if (summary) {
                this.process(summary)
              }
            }

            break
          // Easiest of the bunch... just a Markdown line break.
          case 'BR':
            this.br()

            break
          // Insert a horizontal ruler padded on before and after.
          case 'HR':
            this.p()
            this.output('---')
            this.p()

            break
          // Any element that is commonly displayed in italics as well as `U` (i.e. underline) since vanilla Markdown
          // does not support this but the site did try to highlight the contents.
          case 'CITE':
          case 'DFN':
          case 'EM':
          case 'I':
          case 'U':
          case 'VAR':
            this.output('_')
            this.atNoWS = true

            after = this.outputLater('_')

            break
          // Any element that is commonly display in bold.
          case 'DT':
          case 'B':
          case 'STRONG':
            if (ele.tagName === 'DT') {
              this.p()
            }

            this.output('**')
            this.atNoWS = true

            after = this.outputLater('**')

            break
          // Uncommon element but just wrap its contens in quotation marks. Job done!
          case 'Q':
            this.output('"')
            this.atNoWS = true

            after = this.outputLater('"')

            break
          // Lists need their items to be displayed correctly depending on their type while also ensuring nested lists
          // are indented properly.
          case 'OL':
            after = this.ol()

            break
          case 'UL':
            after = this.ul()

            break
          // List items are displayed differently depending on what kind of list they're parent is (i.e. ordered or
          // unordered).
          case 'LI':
            this.replaceLeft('\n')
            this.li()

            break
          // A pre-formatted element just needs to have its contents properly indented.
          case 'PRE':
            let preAfter1 = this.pushLeft('    ')
            let preAfter2 = this.pre()

            after = () => {
              preAfter1()
              preAfter2()
            }

            break
          // Inline code elements translate pretty easily but we need to make sure we don't do anything dumb inside a
          // `pre` element.
          case 'CODE':
          case 'KBD':
          case 'SAMP':
            if (this.inPre) {
              break
            }

            this.output('`')

            let codeAfter1 = this.code()
            let codeAfter2 = this.outputLater('`')

            after = () => {
              codeAfter1()
              codeAfter2()
            }

            break
          // Block quotes (and similar elements) are relatively straight forward.
          case 'BLOCKQUOTE':
          case 'DD':
            after = this.pushLeft('> ')

            break
          // Links on the other hand are probably the trickiest.
          case 'A':
            // Extract the link URL from `ele`.
            // Links with no URLs are treated just like text-containing elements (e.g. `span`).
            // `a.href` always returns an absolute URL while `a.getAttribute('href')` always returns the exact value
            // of the `href` attribute. For this reason we need to be sure that we extract the URL correctly based on
            // the state of the `absolute` option.
            let href = this.attr(ele, 'href', this.options.absolute)
            if (!href) {
              break
            }

            // Be sure to include the title after each link reference that will be displayed at the end of the
            // Markdown output, where possible.
            let title = this.attr(ele, 'title')
            if (title) {
              href = `${href} "${title}"`
            }

            // Determine what style the link should be generated in (i.e. *inline* or *reference*) depending on the
            // state of the `inline` option.
            let suffix
            if (this.options.inline) {
              // *Inline* style means all links have their URLs (and possible titles) included immediately after their
              // contents (e.g. `[my link](/path/to/page.html "My title")`).
              suffix = `(${href})`
            } else {
              // *Reference* style means all links have an index included immediately after their contents that
              // directly maps to their URL (and possible title) which are displayed at the end of the buffer string
              // (e.g. `[my link][0]` and then later `[0]: /path/to/page.html "My title"`).
              // Duplicate link/title combination references are avoided for a cleaner result.
              if (this.linkMap[href] == null) {
                this.linkMap[href] = this.links.push(href) - 1
              }

              suffix = `[${this.linkMap[href]}]`
            }

            this.output('[')
            this.atNoWS = true

            after = this.outputLater(`]${suffix}`)

            break
          // Images are very similar to links, just without the added complexity of references.
          case 'IMG':
            // Extract the image URL from `ele`.
            // Unlike links, any image without a URL is just ignored. Obviously, any contents of an `img` element are
            // always ignored since they can never contain anything valid.
            // `img.src` always returns an absolute URL while `img.getAttribute('src')` always returns the exact value
            // of the `src` attribute. For this reason we need to be sure that we extract the URL correctly based on
            // the state of the `absolute` option.
            skipChildren = true

            let src = this.attr(ele, 'src', this.options.absolute)
            if (src) {
              this.output(`![${this.attr(ele, 'alt')}](${src})`)
            }

            break
          // Frames are **HELL** (fact!), but we'll do our best to support their contents.
          case 'FRAME':
          case 'IFRAME':
            skipChildren = true

            try {
              if (ele.contentDocument != null && ele.contentDocument.documentElement) {
                this.process(ele.contentDocument.documentElement)
              }
            } catch (error) {
              this.thrown(error, 'contentDocument')
            }

            break
          // Table rows should just be separated, that's all.
          case 'TR':
            after = this.p()

            break
          // Couldn't find a suitable match for `ele` so let's ignore it, but we'll still process any children it has.
          default:
            if (this.options.debug) {
              this.unhandled[ele.tagName] = null
            }
          }
        }
      } catch (error) {
        this.thrown(error, ele.tagName)
      }

      // Process all child elements of `ele` if it has any and we've not been told to ignore them.
      if (!skipChildren) {
        for (let childNode of Array.from(ele.childNodes)) {
          this.process(childNode)
        }
      }

      // Ensure any callback are invoked being proceeding **if** they are specified.
      if (after != null) {
        after()
      }
    } else if (ele.nodeType === this.win.Node.TEXT_NODE) {
      // Handle simple text nodes (e.g. `"foo bar"`) according to the current context.
      if (this.inPre) {
        this.output(ele.nodeValue)
      } else if (this.inCode) {
        this.output(this.inCodeProcess(ele.nodeValue))
      } else {
        this.output(this.nonPreProcess(ele.nodeValue))
      }
    }
  }

  // Attach `str` to the start of the current line.
  pushLeft(str) {
    let old = this.left
    this.left += str

    if (this.atP) {
      this.append(str)
    } else {
      this.p()
    }

    return () => {
      this.left = old
      this.atLeft = this.atP = false

      this.p()
    }
  }

  // Replace the left indent with `str`.
  replaceLeft(str) {
    if (!this.atLeft) {
      this.append(this.left.replace(/[ ]{2,4}$/, str))

      this.atLeft = this.atNoWS = this.atP = true
    } else if (this.last) {
      this.last = this.last.replace(/[ ]{2,4}$/, str)
    }
  }

  // Ensure that the `exception` and the corresponding `message` is logged if the `debug` option is enabled.
  thrown(exception, message) {
    if (this.options.debug) {
      this.exceptions.push(`${message}: ${exception}`)
    }
  }

  // Prepare the parser for a `ul` element.
  ul() {
    if (this.listDepth === 0) {
      this.p()
    }

    let inOrderedList = this.inOrderedList
    let order = this.order
    this.inOrderedList = false
    this.order = 1
    this.listDepth++

    return () => {
      this.inOrderedList = inOrderedList
      this.order = order
      this.listDepth--
    }
  }
}

// Build the publicly exposed API.
const md = this.md = (html, options) => {
  return new HtmlParser(html, options).parse()
}

// Export `md` for NodeJS and CommonJS.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = md
} else if (typeof define === 'function' && define.amd) {
  define('md', () => md)
}

// Current version of html.md.
md.version = md.VERSION = '3.0.2'

// Run html.md in *noConflict* mode, returning the `md` variable to its previous owner.
// Returns a reference to our `md`.
md.noConflict = function() {
  this.md = previousMd
  return md
}