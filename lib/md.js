// [html.md](http://neocotic.com/html.md) 1.0.0
// (c) 2012 Alasdair Mercer
// Freely distributable under the MIT license.
// Based on [Make.text](http://homepage.mac.com/tjim/) 1.5
// (c) 2007 Trevor Jim
// Licensed under the GPL Version 2 license.
// For all details and documentation:
// http://neocotic.com/html.md
(function() {
  var DEFAULT_OPTIONS, HtmlParser, Node, PREVIOUS_MD, REGEX, REPLACEMENTS, R_IGNORE_CHILDREN, R_PARAGRAPH_ONLY, doc, jsdom, key, md, result, value, win, _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    _this = this;

  DEFAULT_OPTIONS = {
    debug: false
  };

  PREVIOUS_MD = this.md;

  REPLACEMENTS = {
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
  };

  R_IGNORE_CHILDREN = /^(APPLET|AREA|AUDIO|BUTTON|CANVAS|COMMAND|DATALIST|EMBED|HEAD|INPUT|KEYGEN|MAP|MENU|METER|NOFRAMES|NOSCRIPT|OBJECT|OPTION|PARAM|PROGRESS|SCRIPT|SELECT|SOURCE|STYLE|TEXTAREA|TRACK|VIDEO)$/;

  R_PARAGRAPH_ONLY = /^(ADDRESS|ARTICLE|ASIDE|DIV|FOOTER|HEADER|P|SECTION)$/;

  REGEX = ((function() {
    result = {};
    for (key in REPLACEMENTS) {
      if (!__hasProp.call(REPLACEMENTS, key)) continue;
      value = REPLACEMENTS[key];
      result[key] = new RegExp(key, 'g');
    }
    return result;
  })());

  win = typeof window !== "undefined" && window !== null ? window : null;

  if (typeof window === "undefined" || window === null) {
    jsdom = require('jsdom');
    doc = jsdom.jsdom(null, null, {
      features: {
        FetchExternalResources: false
      }
    });
    win = doc.createWindow();
  }

  Node = (_ref = win.Node) != null ? _ref : {};

  if ((_ref1 = Node.ELEMENT_NODE) == null) {
    Node.ELEMENT_NODE = 1;
  }

  if ((_ref2 = Node.TEXT_NODE) == null) {
    Node.TEXT_NODE = 3;
  }

  HtmlParser = (function() {

    function HtmlParser(html, options) {
      var defaultValue;
      this.html = html != null ? html : '';
      this.options = options != null ? options : {};
      this.atLeft = this.atNoWS = this.atP = true;
      this.buffer = '';
      this.exceptions = [];
      this.inCode = this.inPre = this.inOrderedList = this.parsed = false;
      this.last = null;
      this.left = '\n';
      this.links = [];
      this.linkCache = {};
      this.linkTitles = [];
      this.unhandled = {};
      if (typeof this.options !== 'object') {
        this.options = {};
      }
      for (key in DEFAULT_OPTIONS) {
        if (!__hasProp.call(DEFAULT_OPTIONS, key)) continue;
        defaultValue = DEFAULT_OPTIONS[key];
        if (!this.options.hasOwnProperty(key)) {
          this.options[key] = defaultValue;
        }
      }
    }

    HtmlParser.prototype.append = function(str) {
      if (this.last != null) {
        this.buffer += this.last;
      }
      return this.last = str;
    };

    HtmlParser.prototype.br = function() {
      this.append("  " + this.left);
      return this.atLeft = this.atNoWS = true;
    };

    HtmlParser.prototype.code = function() {
      var old,
        _this = this;
      old = this.inCode;
      this.inCode = true;
      return function() {
        return _this.inCode = old;
      };
    };

    HtmlParser.prototype.inCodeProcess = function(str) {
      return str.replace(/`/g, '\\`');
    };

    HtmlParser.prototype.nonPreProcess = function(str) {
      str = str.replace(/\n([ \t]*\n)+/g, '\n');
      str = str.replace(/\n[ \t]+/g, '\n');
      str = str.replace(/[ \t]+/g, ' ');
      for (key in REPLACEMENTS) {
        if (!__hasProp.call(REPLACEMENTS, key)) continue;
        value = REPLACEMENTS[key];
        str = str.replace(REGEX[key], value);
      }
      return str;
    };

    HtmlParser.prototype.ol = function() {
      var old,
        _this = this;
      old = this.inOrderedList;
      this.inOrderedList = true;
      return function() {
        return _this.inOrderedList = old;
      };
    };

    HtmlParser.prototype.output = function(str) {
      if (!str) {
        return;
      }
      if (!this.inPre) {
        if (this.atNoWS) {
          str = str.replace(/^[ \t\n]+/, '');
        } else if (/^[ \t]*\n/.test(str)) {
          str = str.replace(/^[ \t\n]+/, '\n');
        } else {
          str = str.replace(/^[ \t]+/, ' ');
        }
      }
      if (str === '') {
        return;
      }
      this.atP = /\n\n$/.test(str);
      this.atLeft = /\n$/.test(str);
      this.atNoWS = /[ \t\n]$/.test(str);
      return this.append(str.replace(/\n/g, this.left));
    };

    HtmlParser.prototype.outputLater = function(str) {
      var _this = this;
      return function() {
        return _this.output(str);
      };
    };

    HtmlParser.prototype.p = function() {
      if (this.atP) {
        return;
      }
      if (!this.atLeft) {
        this.append(this.left);
        this.atLeft = true;
      }
      this.append(this.left);
      return this.atNoWS = this.atP = true;
    };

    HtmlParser.prototype.parse = function() {
      var container, i, link, tag, title, unhandledTags, _i, _len, _ref3;
      if (!this.html) {
        return '';
      }
      if (this.parsed) {
        return this.buffer;
      }
      container = win.document.createElement('div');
      if (typeof this.html === 'string') {
        container.innerHTML = this.html;
      } else {
        container.appendChild(this.html);
      }
      this.process(container);
      if (this.links.length) {
        this.append('\n\n');
        _ref3 = this.links;
        for (i = _i = 0, _len = _ref3.length; _i < _len; i = ++_i) {
          link = _ref3[i];
          title = this.linkTitles[i] ? " \"" + this.linkTitles[i] + "\"\n" : '\n';
          if (link) {
            this.append("[" + i + "]: " + link + title);
          }
        }
      }
      if (this.options.debug) {
        unhandledTags = ((function() {
          var _ref4, _results;
          _ref4 = this.unhandled;
          _results = [];
          for (tag in _ref4) {
            if (!__hasProp.call(_ref4, tag)) continue;
            _results.push(tag);
          }
          return _results;
        }).call(this)).sort();
        if (unhandledTags.length) {
          console.log("Ignored tags;\n" + (unhandledTags.join(', ')));
        } else {
          console.log('No tags were ignored');
        }
        if (this.exceptions.length) {
          console.log("Exceptions;\n" + (this.exceptions.join('\n')));
        } else {
          console.log('No exceptions were thrown');
        }
      }
      this.append('');
      this.parsed = true;
      return this.buffer = this.buffer.trim();
    };

    HtmlParser.prototype.pre = function() {
      var old,
        _this = this;
      old = this.inPre;
      this.inPre = true;
      return function() {
        return _this.inPre = old;
      };
    };

    HtmlParser.prototype.process = function(ele) {
      var after, after1, after2, childNode, i, index, level, skipChildren, style, summary, _i, _len, _ref3, _ref4;
      if (win.getComputedStyle != null) {
        try {
          style = win.getComputedStyle(ele, null);
          if ((style != null ? typeof style.getPropertyValue === "function" ? style.getPropertyValue('display') : void 0 : void 0) === 'none') {
            return;
          }
        } catch (err) {
          this.thrown(err, 'getComputedStyle');
        }
      }
      if (ele.nodeType === Node.ELEMENT_NODE) {
        skipChildren = false;
        try {
          if (R_IGNORE_CHILDREN.test(ele.tagName)) {
            skipChildren = true;
          } else if (/^H[1-6]$/.test(ele.tagName)) {
            level = parseInt(ele.tagName.match(/([1-6])$/)[1]);
            this.p();
            this.output("" + (((function() {
              var _i, _results;
              _results = [];
              for (i = _i = 1; 1 <= level ? _i <= level : _i >= level; i = 1 <= level ? ++_i : --_i) {
                _results.push('#');
              }
              return _results;
            })()).join('')) + " ");
          } else if (R_PARAGRAPH_ONLY.test(ele.tagName)) {
            this.p();
          } else {
            switch (ele.tagName) {
              case 'BODY':
              case 'FORM':
                break;
              case 'DETAILS':
                this.p();
                if (ele.getAttribute('open') == null) {
                  skipChildren = true;
                  summary = ele.getElementsByTagName('summary')[0];
                  if (summary) {
                    this.process(summary);
                  }
                }
                break;
              case 'BR':
                this.br();
                break;
              case 'HR':
                this.p();
                this.output('--------------------------------');
                this.p();
                break;
              case 'CITE':
              case 'DFN':
              case 'EM':
              case 'I':
              case 'U':
              case 'VAR':
                this.output('_');
                this.atNoWS = true;
                after = this.outputLater('_');
                break;
              case 'DT':
              case 'B':
              case 'STRONG':
                if (ele.tagName === 'DT') {
                  this.p();
                }
                this.output('**');
                this.atNoWS = true;
                after = this.outputLater('**');
                break;
              case 'Q':
                this.output('"');
                this.atNoWS = true;
                after = this.outputLater('"');
                break;
              case 'OL':
              case 'PRE':
              case 'UL':
                after1 = this.pushLeft('    ');
                after2 = (function() {
                  switch (ele.tagName) {
                    case 'OL':
                      return this.ol();
                    case 'PRE':
                      return this.pre();
                    case 'UL':
                      return this.ul();
                  }
                }).call(this);
                after = function() {
                  after1();
                  return after2();
                };
                break;
              case 'LI':
                this.replaceLeft(this.inOrderedList ? '1.  ' : '*   ');
                break;
              case 'CODE':
              case 'KBD':
              case 'SAMP':
                if (!this.inPre) {
                  this.output('`');
                  after1 = this.code();
                  after2 = this.outputLater('`');
                  after = function() {
                    after1();
                    return after2();
                  };
                }
                break;
              case 'BLOCKQUOTE':
              case 'DD':
                after = this.pushLeft('> ');
                break;
              case 'A':
                if (!ele.href) {
                  break;
                }
                if (this.linkCache[ele.href]) {
                  index = this.linkCache[ele.href];
                } else {
                  index = this.links.length;
                  this.links[index] = ele.href;
                  this.linkCache[ele.href] = index;
                  if (ele.title) {
                    this.linkTitles[index] = ele.title;
                  }
                }
                this.output('[');
                this.atNoWS = true;
                after = this.outputLater("][" + index + "]");
                break;
              case 'IMG':
                skipChildren = true;
                if (!ele.src) {
                  break;
                }
                this.output("![" + ele.alt + "](" + ele.src + ")");
                break;
              case 'FRAME':
              case 'IFRAME':
                skipChildren = true;
                try {
                  if ((_ref3 = ele.contentDocument) != null ? _ref3.documentElement : void 0) {
                    this.process(ele.contentDocument.documentElement);
                  }
                } catch (err) {
                  this.thrown(err, 'contentDocument');
                }
                break;
              case 'TR':
                after = this.p;
                break;
              default:
                if (this.options.debug) {
                  this.unhandled[ele.tagName] = null;
                }
            }
          }
        } catch (err) {
          this.thrown(err, ele.tagName);
        }
        if (!skipChildren) {
          _ref4 = ele.childNodes;
          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
            childNode = _ref4[_i];
            this.process(childNode);
          }
        }
        return typeof after === "function" ? after() : void 0;
      } else if (ele.nodeType === Node.TEXT_NODE) {
        if (this.inPre) {
          return this.output(ele.nodeValue);
        } else if (this.inCode) {
          return this.output(this.inCodeProcess(ele.nodeValue));
        } else {
          return this.output(this.nonPreProcess(ele.nodeValue));
        }
      }
    };

    HtmlParser.prototype.pushLeft = function(str) {
      var old,
        _this = this;
      old = this.left;
      this.left += str;
      if (this.atP) {
        this.append(str);
      } else {
        this.p();
      }
      return function() {
        _this.left = old;
        _this.atLeft = _this.atP = false;
        return _this.p();
      };
    };

    HtmlParser.prototype.replaceLeft = function(str) {
      if (!this.atLeft) {
        this.append(this.left.replace(/[ ]{4}$/, str));
        return this.atLeft = this.atNoWS = this.atP = true;
      } else if (this.last) {
        return this.last = this.last.replace(/[ ]{4}$/, str);
      }
    };

    HtmlParser.prototype.thrown = function(exception, message) {
      if (this.options.debug) {
        return this.exceptions.push("" + message + ": " + exception);
      }
    };

    HtmlParser.prototype.ul = function() {
      var old,
        _this = this;
      old = this.inOrderedList;
      this.inOrderedList = false;
      return function() {
        return _this.inOrderedList = old;
      };
    };

    return HtmlParser;

  })();

  this.md = md = function(html, options) {
    return new HtmlParser(html, options).parse();
  };

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = md;
  } else if (typeof define === 'function' && define.amd) {
    define('md', function() {
      return md;
    });
  }

  md.VERSION = '1.0.0';

  md.noConflict = function() {
    _this.md = PREVIOUS_MD;
    return md;
  };

}).call(this);
