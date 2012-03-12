// [html.md](http://neocotic.com/html.md) 1.0.0  
// (c) 2012 Alasdair Mercer  
// Freely distributable under the MIT license.  
// Based on [Make.text](http://homepage.mac.com/tjim/) 1.5  
// (c) 2007 Trevor Jim  
// Licensed under the GPL Version 2 license.  
// For all details and documentation:  
// <http://neocotic.com/html.md>

(function () {

  // Private constants
  // -----------------

  var
    // Default configuration values.
    DEFAULT_CONFIG = {
      debug: false
    },
    // Replacement strings for special Markdown characters.
    REPLACEMENTS   = {
      '\\\\':              '\\\\',
      '\\[':               '\\[',
      '\\]':               '\\]',
      '>':                 '\\>',
      '_':                 '\\_',
      '\\*':               '\\*',
      '`':                 '\\`',
      '#':                 '\\#',
      '([0-9])\\.(\\s|$)': '$1\\.$2',
      '\u00a9':            '(c)',
      '\u00ae':            '(r)',
      '\u2122':            '(tm)',
      '\u00a0':            ' ',
      '\u00b7':            '\\*',
      '\u2002':            ' ',
      '\u2003':            ' ',
      '\u2009':            ' ',
      '\u2018':            '\'',
      '\u2019':            '\'',
      '\u201c':            '"',
      '\u201d':            '"',
      '\u2026':            '...',
      '\u2013':            '--',
      '\u2014':            '---'
    },
    // Create regular expressions for all of the special Markdown characters.
    REGEX          = (function () {
      var result = {};
      for (var key in REPLACEMENTS) {
        if (REPLACEMENTS.hasOwnProperty(key)) {
          result[key] = new RegExp(key, 'g');
        }
      }
      return result;
    }());

  // Private variables
  // -----------------

  var
    // Indicate whether or not the parser is at the beginning of a new line.
    atLeft        = true,
    // Indicate whether or not the parser is at the beginning of an
    // indentation.
    atNoWS        = true,
    // Indicate whether or not the parser in at the beginning of a paragraph.
    atP           = true,
    // String buffer containing the parsed Markdown.
    buffer        = '',
    // Configuration, default or customized.
    config        = {},
    // List of exceptions thrown while parsing the HTML.  
    // This is only populated when debug mode is enabled.
    exceptions    = [],
    // Indicate whether or not the parser is within a `code` element.
    inCode        = false,
    // Indicate whether or not the parser is within a `pre` element.
    inPre         = false,
    // Indicate whether or not the parser is within an `ol` element.
    inOrderedList = false,
    // Markdown created from the last HTML parsed.
    last          = null,
    // Shortcut reference to append a new line.
    left          = '\n',
    // List of URLs for all previously parsed unique anchors.
    links         = [],
    // List of titles for all previously parsed unique anchors.
    linkTitles    = [],
    // Save the previous value of the `md` variable.
    previousMd    = window.md,
    // Map of anchor URLs to their corresponding reference index.
    rlinks        = {},
    // List of tag names that were not handled by the parser.  
    // This is only populated when debug mode is enabled.
    unhandled     = {};

  // Try to ensure Node is available with the required constants.
  var Node = (typeof Node === 'undefined') ? {} : Node;
  if (!Node.ELEMENT_NODE) Node.ELEMENT_NODE = 1;
  if (!Node.TEXT_NODE) Node.TEXT_NODE = 3;

  // Private functions
  // -----------------

  // Append `str` to the buffer string.
  function append(str) {
    if (last != null) buffer += last;
    last = str;
  }

  // Append a Markdown line break to the buffer string.
  function br() {
    append('  ' + left);
    atLeft = atNoWS = true;
  }

  // Prepare the parser for a `code` element.
  function code() {
    var old = inCode;
    inCode = true;
    return function () {
      inCode = old;
    };
  }

  // Replace any special characters that can cause problems within code.
  function inCodeProcess(str) {
    return str.replace(/`/g, '\\`');
  }

  // Replace any special characters that can cause problems in normal Markdown.
  function nonPreProcess(str) {
    str = str.replace(/\n([ \t]*\n)+/g, '\n');
    str = str.replace(/\n[ \t]+/g, '\n');
    str = str.replace(/[ \t]+/g, ' ');
    for (var key in REPLACEMENTS) {
      if (REPLACEMENTS.hasOwnProperty(key)) {
        str = str.replace(REGEX[key], REPLACEMENTS[key]);
      }
    }
    return str;
  }

  // Prepare the parser for an `ol` element.
  function ol() {
    var old = inOrderedList;
    inOrderedList = true;
    return function () {
      inOrderedList = old;
    };
  }

  // Append `str` to the buffer string while keeping the parser in context.
  function output(str) {
    if (!str) return;
    if (!inPre) {
      if (atNoWS) {
        str = str.replace(/^[ \t\n]+/, '');
      } else if (/^[ \t]*\n/.test(str)) {
        str = str.replace(/^[ \t\n]+/, '\n');
      } else {
        str = str.replace(/^[ \t]+/, ' ');
      }
    }
    if (str === '') return;
    atP    = /\n\n$/.test(str);
    atLeft = /\n$/.test(str);
    atNoWS = /[ \t\n]$/.test(str);
    append(str.replace(/\n/g, left));
  }

  // Create a function that can be called later to append `str` to the buffer
  // string while keeping the parser in context.
  function outputLater(str) {
    return function () {
      output(str);
    };
  }

  // Append a Markdown paragraph to the buffer string.
  function p() {
    if (atP) return;
    if (!atLeft) {
      append(left);
      atLeft = true;
    }
    append(left);
    atNoWS = atP = true;
  }

  // Prepare the parser for a `pre` element.
  function pre() {
    var old = inPre;
    inPre = true;
    return function () {
      inPre = old;
    };
  }

  // Parse the specified element and append the generated Markdown to the
  // buffer string.
  function process(e) {
    if (typeof getComputedStyle !== 'undefined') {
      try {
        var style = getComputedStyle(e, null);
        if (style && style.getPropertyValue &&
            style.getPropertyValue('display') === 'none') {
          return;
        }
      } catch (ex) {
        thrown(ex, 'getComputedStyle');
      }
    }
    if (e.nodeType === Node.ELEMENT_NODE) {
      var
        after        = null,
        after1       = null,
        after2       = null,
        skipChildren = false;
      try {
        switch (e.tagName) {
        case 'APPLET':
        case 'AREA':
        case 'AUDIO':
        case 'BUTTON':
        case 'CANVAS':
        case 'COMMAND':
        case 'DATALIST':
        case 'EMBED':
        case 'HEAD':
        case 'INPUT':
        case 'KEYGEN':
        case 'MAP':
        case 'MENU':
        case 'METER':
        case 'NOFRAMES':
        case 'NOSCRIPT':
        case 'OBJECT':
        case 'OPTION':
        case 'PARAM':
        case 'PROGRESS':
        case 'SCRIPT':
        case 'SELECT':
        case 'SOURCE':
        case 'STYLE':
        case 'TEXTAREA':
        case 'TRACK':
        case 'VIDEO':
          skipChildren = true;
          break;
        case 'BODY':
        case 'FORM':
          break;
        case 'H1':
          p();
          output('# ');
          break;
        case 'H2':
          p();
          output('## ');
          break;
        case 'H3':
          p();
          output('### ');
          break;
        case 'H4':
          p();
          output('#### ');
          break;
        case 'H5':
          p();
          output('##### ');
          break;
        case 'H6':
          p();
          output('###### ');
          break;
        case 'ADDRESS':
        case 'ARTICLE':
        case 'ASIDE':
        case 'DIV':
        case 'FOOTER':
        case 'HEADER':
        case 'P':
        case 'SECTION':
          p();
          break;
        case 'DETAILS':
          p();
          if (e.getAttribute('open') == null) {
            skipChildren = true;
            var summary = e.getElementsByTagName('summary')[0];
            if (summary) {
              process(summary);
            }
          }
          break;
        case 'BR':
          br();
          break;
        case 'HR':
          p();
          output('--------------------------------');
          p();
          break;
        case 'CITE':
        case 'DFN':
        case 'EM':
        case 'I':
        case 'U':
        case 'VAR':
          output('_');
          atNoWS = true;
          after  = outputLater('_');
          break;
        case 'DT':
          p();
        case 'B':
        case 'STRONG':
          output('**');
          atNoWS = true;
          after  = outputLater('**');
          break;
        case 'Q':
          output('"');
          atNoWS = true;
          after  = outputLater('"');
          break;
        case 'OL':
          after1 = pushLeft('    ');
          after2 = ol();
          after  = function () {
            after1();
            after2();
          };
          break;
        case 'UL':
          after1 = pushLeft('    ');
          after2 = ul();
          after  = function () {
            after1();
            after2();
          };
          break;
        case 'LI':
          if (inOrderedList) {
            replaceLeft('1.  ');
          } else {
            replaceLeft('*   ');
          }
          break;
        case 'PRE':
          after1 = pushLeft('    ');
          after2 = pre();
          after  = function () {
            after1();
            after2();
          };
          break;
        case 'CODE':
        case 'KBD':
        case 'SAMP':
          if (!inPre) {
            output('`');
            after1 = code();
            after2 = outputLater('`');
            after  = function () {
              after1();
              after2();
            };
          }
          break;
        case 'BLOCKQUOTE':
        case 'DD':
          after = pushLeft('> ');
          break;
        case 'A':
          if (!e.href) break;
          var index;
          if (rlinks[e.href]) {
            index = rlinks[e.href];
          } else {
            index = links.length;
            links[index]   = e.href;
            rlinks[e.href] = index;
            if (e.title) linkTitles[index] = e.title;
          }
          output('[');
          atNoWS = true;
          after  = outputLater('][' + index + ']');
          break;
        case 'IMG':
          skipChildren = true;
          if (!e.src) break;
          output('![' + e.alt + '](' + e.src + ')');
          break;
        case 'FRAME':
        case 'IFRAME':
          skipChildren = true;
          try {
            if (e.contentDocument && e.contentDocument.documentElement) {
              process(e.contentDocument.documentElement);
            }
          } catch (ex) {
            thrown(ex, 'contentDocument');
          }
          break;
        case 'TR':
          after = p;
          break;
        default:
          if (config.debug) unhandled[e.tagName] = null;
          break;
        }
      } catch (ex) {
        thrown(ex, e.tagName);
      }
      if (!skipChildren) {
        for (var i = 0; i < e.childNodes.length; i++) {
          process(e.childNodes[i]);
        }
      }
      if (after) after();
    } else if (e.nodeType === Node.TEXT_NODE) {
      if (inPre) {
        output(e.nodeValue);
      } else if (inCode) {
        output(inCodeProcess(e.nodeValue));
      } else {
        output(nonPreProcess(e.nodeValue));
      }
    }
  }

  // Attach `str` to the start of the current line.
  function pushLeft(str) {
    var oldLeft = left;
    left += str;
    if (atP) {
      append(str);
    } else {
      p();
    }
    return function () {
      left = oldLeft;
      atLeft = atP = false;
      p();
    };
  }

  // Replace the left indent with `str`.
  function replaceLeft(str) {
    if (!atLeft) {
      append(left.replace(/[ ]{4}$/, str));
      atLeft = atNoWS = atP = true;
    } else if (last) {
      last = last.replace(/[ ]{4}$/, str);
    }
  }

  // Reset the variables used by the parser and configure it using the
  // `options` provided.
  function resetAndConfigure(options) {
    // Reset necessary variables.
    atLeft        = true;
    atNoWS        = true;
    atP           = true;
    buffer        = '';
    exceptions    = [];
    inCode        = false;
    inPre         = false;
    inOrderedList = false;
    last          = null;
    left          = '\n';
    links         = [];
    linkTitles    = [];
    rlinks        = {};
    unhandled     = {};
    // Configure html.md.
    if (typeof options !== 'object') options = {};
    for (var property in DEFAULT_CONFIG) {
      if (DEFAULT_CONFIG.hasOwnProperty(property)) {
        if (options.hasOwnProperty(property)) {
          config[property] = options[property];
        } else {
          config[property] = DEFAULT_CONFIG[property];
        }
      }
    }
  }

  // Log the exception and the corresponding message if debug mode is enabled.
  function thrown(exception, message) {
    if (config.debug) exceptions.push(message + ': ' + exception);
  }

  // Prepare the parser for a `ul` element.
  function ul() {
    var old = inOrderedList;
    inOrderedList = false;
    return function () {
      inOrderedList = old;
    };
  }

  // html.md setup
  // -------------

  // Build the publicly exposed API.
  var md = window.md = function (html, options) {
    if (!html) return '';
    resetAndConfigure(options);
    var container = document.createElement('div');
    if (typeof html === 'string') {
      container.innerHTML = html;
    } else {
      container.appendChild(html);
    }
    process(container);
    append('\n\n');
    var title;
    for (var i = 0; i < links.length; i++) {
      title = '\n';
      if (linkTitles[i]) title = ' "' + linkTitles[i] + '"\n';
      if (links[i]) append('[' + i + ']: ' + links[i] + title);
    }
    if (config.debug) {
      var unhandledTags = [];
      for (var name in unhandled) {
        if (unhandled.hasOwnProperty(name)) {
          unhandledTags.push(name);
        }
      }
      unhandledTags.sort();
      if (unhandledTags.length) {
        console.log('Ignored tags;\n' + unhandledTags.join(', '));
      } else {
        console.log('No tags were ignored');
      }
      if (exceptions.length) console.log(exceptions.join('\n'));
    }
    append('');
    return buffer.trim();
  };

  // Public constants
  // ----------------

  // Current version of html.md.
  md.VERSION = '1.0.0';

  // Public functions
  // ----------------

  // Run html.md in *noConflict* mode, returning the `md` variable to its
  // previous owner.  
  // Returns a reference to `md`.
  md.noConflict = function () {
    window.md = previousMd;
    return this;
  };

}());