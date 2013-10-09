(function() {
  var DEFAULT_OPTIONS, HtmlParser, PREVIOUS_MD, REGEX, REPLACEMENTS, R_HIDDEN_STYLES, R_HIDDEN_VALUE, R_IGNORE_CHILDREN, R_PARAGRAPH_ONLY, key, md, padLeft, result, trim,
    __hasProp = {}.hasOwnProperty,
    _this = this;

  DEFAULT_OPTIONS = {
    absolute: false,
    base: typeof window !== "undefined" && window !== null ? window.document.baseURI : "file://" + (process.cwd()),
    debug: false,
    inline: false
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

  R_HIDDEN_STYLES = /(display|visibility)\s*:\s*[a-z]+/gi;

  R_HIDDEN_VALUE = /(none|hidden)\s*$/i;

  R_IGNORE_CHILDREN = /^(APPLET|AREA|AUDIO|BUTTON|CANVAS|DATALIST|EMBED|HEAD|INPUT|MAP|MENU|METER|NOFRAMES|NOSCRIPT|OBJECT|OPTGROUP|OPTION|PARAM|PROGRESS|RP|RT|RUBY|SCRIPT|SELECT|STYLE|TEXTAREA|TITLE|VIDEO)$/;

  R_PARAGRAPH_ONLY = /^(ADDRESS|ARTICLE|ASIDE|DIV|FIELDSET|FOOTER|HEADER|NAV|P|SECTION)$/;

  REGEX = ((function() {
    result = {};
    for (key in REPLACEMENTS) {
      if (!__hasProp.call(REPLACEMENTS, key)) continue;
      result[key] = new RegExp(key, 'g');
    }
    return result;
  })());

  padLeft = function(str, times, padStr) {
    var i, _i;

    if (str == null) {
      str = '';
    }
    if (times == null) {
      times = 0;
    }
    if (padStr == null) {
      padStr = ' ';
    }
    if (!padStr) {
      return str;
    }
    for (i = _i = 0; 0 <= times ? _i < times : _i > times; i = 0 <= times ? ++_i : --_i) {
      str = padStr + str;
    }
    return str;
  };

  trim = function(str) {
    if (str == null) {
      str = '';
    }
    if (str.trim) {
      return str.trim();
    } else {
      return str.replace(/^\s+|\s+$/g, '');
    }
  };

  HtmlParser = (function() {
    function HtmlParser(html, options) {
      var defaultValue, doc;

      this.html = html != null ? html : '';
      this.options = options != null ? options : {};
      this.atLeft = this.atNoWS = this.atP = true;
      this.buffer = '';
      this.exceptions = [];
      this.order = 1;
      this.listDepth = 0;
      this.inCode = this.inPre = this.inOrderedList = false;
      this.last = null;
      this.left = '\n';
      this.links = [];
      this.linkMap = {};
      this.unhandled = {};
      if (typeof this.options !== 'object') {
        this.options = {};
      }
      for (key in DEFAULT_OPTIONS) {
        if (!__hasProp.call(DEFAULT_OPTIONS, key)) continue;
        defaultValue = DEFAULT_OPTIONS[key];
        if (typeof this.options[key] === 'undefined') {
          this.options[key] = defaultValue;
        }
      }
      this.win = typeof window !== "undefined" && window !== null ? window : null;
      if (this.win == null) {
        doc = require('jsdom').jsdom(null, null, {
          features: {
            FetchExternalResources: false
          },
          url: this.options.base
        });
        this.win = doc.createWindow();
      }
      if (this.win.Node == null) {
        this.win.Node = {
          ELEMENT_NODE: 1,
          TEXT_NODE: 3
        };
      }
    }

    HtmlParser.prototype.append = function(str) {
      if (this.last != null) {
        this.buffer += this.last;
      }
      return this.last = str;
    };

    HtmlParser.prototype.attr = function(ele, attribute, direct) {
      var value;

      if (direct == null) {
        direct = true;
      }
      value = direct || typeof ele.getAttribute !== 'function' ? ele[attribute] : ele.getAttribute(attribute);
      return value != null ? value : '';
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

    HtmlParser.prototype.has = function(ele, attribute, direct) {
      if (direct == null) {
        direct = true;
      }
      if (direct || typeof ele.hasAttribute !== 'function') {
        return ele.hasOwnProperty(attribute);
      } else {
        return ele.hasAttribute(attribute);
      }
    };

    HtmlParser.prototype.inCodeProcess = function(str) {
      return str.replace(/`/g, '\\`');
    };

    HtmlParser.prototype.isVisible = function(ele) {
      var display, err, properties, property, style, visibility, visible, _i, _len;

      style = this.attr(ele, 'style', false);
      properties = style != null ? typeof style.match === "function" ? style.match(R_HIDDEN_STYLES) : void 0 : void 0;
      visible = true;
      if (properties != null) {
        for (_i = 0, _len = properties.length; _i < _len; _i++) {
          property = properties[_i];
          visible = !R_HIDDEN_VALUE.test(property);
        }
      }
      if (visible && typeof this.win.getComputedStyle === 'function') {
        try {
          style = this.win.getComputedStyle(ele, null);
          if (typeof (style != null ? style.getPropertyValue : void 0) === 'function') {
            display = style.getPropertyValue('display');
            visibility = style.getPropertyValue('visibility');
            visible = display !== 'none' && visibility !== 'hidden';
          }
        } catch (_error) {
          err = _error;
          this.thrown(err, 'getComputedStyle');
        }
      }
      return visible;
    };

    HtmlParser.prototype.li = function() {
      var str;

      str = this.inOrderedList ? "" + (this.order++) + ". " : '* ';
      str = padLeft(str, (this.listDepth - 1) * 2);
      return this.append(str);
    };

    HtmlParser.prototype.nonPreProcess = function(str) {
      var value;

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
      var inOrderedList, order,
        _this = this;

      if (this.listDepth === 0) {
        this.p();
      }
      inOrderedList = this.inOrderedList;
      order = this.order;
      this.inOrderedList = true;
      this.order = 1;
      this.listDepth++;
      return function() {
        _this.inOrderedList = inOrderedList;
        _this.order = order;
        return _this.listDepth--;
      };
    };

    HtmlParser.prototype.output = function(str) {
      if (!str) {
        return;
      }
      if (!this.inPre) {
        str = this.atNoWS ? str.replace(/^[ \t\n]+/, '') : /^[ \t]*\n/.test(str) ? str.replace(/^[ \t\n]+/, '\n') : str.replace(/^[ \t]+/, ' ');
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
      var container, i, link, tag, unhandledTags, _i, _len, _ref;

      this.buffer = '';
      if (!this.html) {
        return this.buffer;
      }
      container = this.win.document.createElement('div');
      if (typeof this.html === 'string') {
        container.innerHTML = this.html;
      } else {
        container.appendChild(this.html);
      }
      this.process(container);
      if (this.links.length) {
        this.append('\n\n');
        _ref = this.links;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          link = _ref[i];
          if (link) {
            this.append("[" + i + "]: " + link + "\n");
          }
        }
      }
      if (this.options.debug) {
        unhandledTags = ((function() {
          var _ref1, _results;

          _ref1 = this.unhandled;
          _results = [];
          for (tag in _ref1) {
            if (!__hasProp.call(_ref1, tag)) continue;
            _results.push(tag);
          }
          return _results;
        }).call(this)).sort();
        console.log(unhandledTags.length ? "Ignored tags;\n" + (unhandledTags.join(', ')) : 'No tags were ignored');
        console.log(this.exceptions.length ? "Exceptions;\n" + (this.exceptions.join('\n')) : 'No exceptions were thrown');
      }
      this.append('');
      return this.buffer = trim(this.buffer);
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
      var after, after1, after2, childNode, err, href, i, level, skipChildren, src, suffix, summary, title, _base, _i, _len, _ref, _ref1, _ref2;

      if (!this.isVisible(ele)) {
        return;
      }
      if (ele.nodeType === this.win.Node.ELEMENT_NODE) {
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
                if (!this.has(ele, 'open', false)) {
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
                this.output('---');
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
              case 'UL':
                after = ele.tagName === 'OL' ? this.ol() : this.ul();
                break;
              case 'LI':
                this.replaceLeft('\n');
                this.li();
                break;
              case 'PRE':
                after1 = this.pushLeft('    ');
                after2 = this.pre();
                after = function() {
                  after1();
                  return after2();
                };
                break;
              case 'CODE':
              case 'KBD':
              case 'SAMP':
                if (this.inPre) {
                  break;
                }
                this.output('`');
                after1 = this.code();
                after2 = this.outputLater('`');
                after = function() {
                  after1();
                  return after2();
                };
                break;
              case 'BLOCKQUOTE':
              case 'DD':
                after = this.pushLeft('> ');
                break;
              case 'A':
                href = this.attr(ele, 'href', this.options.absolute);
                if (!href) {
                  break;
                }
                title = this.attr(ele, 'title');
                if (title) {
                  href += " \"" + title + "\"";
                }
                suffix = this.options.inline ? "(" + href + ")" : "[" + ((_ref = (_base = this.linkMap)[href]) != null ? _ref : _base[href] = this.links.push(href) - 1) + "]";
                this.output('[');
                this.atNoWS = true;
                after = this.outputLater("]" + suffix);
                break;
              case 'IMG':
                skipChildren = true;
                src = this.attr(ele, 'src', this.options.absolute);
                if (!src) {
                  break;
                }
                this.output("![" + (this.attr(ele, 'alt')) + "](" + src + ")");
                break;
              case 'FRAME':
              case 'IFRAME':
                skipChildren = true;
                try {
                  if ((_ref1 = ele.contentDocument) != null ? _ref1.documentElement : void 0) {
                    this.process(ele.contentDocument.documentElement);
                  }
                } catch (_error) {
                  err = _error;
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
        } catch (_error) {
          err = _error;
          this.thrown(err, ele.tagName);
        }
        if (!skipChildren) {
          _ref2 = ele.childNodes;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            childNode = _ref2[_i];
            this.process(childNode);
          }
        }
        return after != null ? after.call(this) : void 0;
      } else if (ele.nodeType === this.win.Node.TEXT_NODE) {
        return this.output(this.inPre ? ele.nodeValue : this.inCode ? this.inCodeProcess(ele.nodeValue) : this.nonPreProcess(ele.nodeValue));
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
        this.append(this.left.replace(/[ ]{2,4}$/, str));
        return this.atLeft = this.atNoWS = this.atP = true;
      } else if (this.last) {
        return this.last = this.last.replace(/[ ]{2,4}$/, str);
      }
    };

    HtmlParser.prototype.thrown = function(exception, message) {
      if (this.options.debug) {
        return this.exceptions.push("" + message + ": " + exception);
      }
    };

    HtmlParser.prototype.ul = function() {
      var inOrderedList, order,
        _this = this;

      if (this.listDepth === 0) {
        this.p();
      }
      inOrderedList = this.inOrderedList;
      order = this.order;
      this.inOrderedList = false;
      this.order = 1;
      this.listDepth++;
      return function() {
        _this.inOrderedList = inOrderedList;
        _this.order = order;
        return _this.listDepth--;
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

  md.version = md.VERSION = '3.0.2';

  md.noConflict = function() {
    _this.md = PREVIOUS_MD;
    return md;
  };

}).call(this);
