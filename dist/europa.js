/*
 * Copyright (C) 2016 Alasdair Mercer, Skelp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('europa', factory) :
  (global.europa = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * Contains contextual information for a single transformation process.
   *
   * @public
   */
  var Transformation = function () {

    /**
     * Creates an instance of {@link Transformation} for the specified <code>transformer</code> and using the
     * <code>options</code> provided.
     *
     * @param {Transformer} transformer - the {@link Transformer} responsible for this transformation
     * @param {Transformation~Options} options - the options to be used
     * @public
     */
    function Transformation(transformer, options) {
      classCallCheck(this, Transformation);

      /**
       * The {@link Transformation} responsible for this {@link Transformation}.
       *
       * @public
       * @type {Transformer}
       */
      this.transformer = transformer;

      /**
       * The options for this {@link Transformation}.
       *
       * @public
       * @type {Transformation~Options}
       */
      this.options = options;

      /**
       * Indicates whether the buffer is at the start of the current line.
       *
       * @public
       * @type {boolean}
       */
      this.atLeft = true;

      /**
       * Indicates whether any white space should be removed from the start of the next output.
       *
       * @public
       * @type {boolean}
       */
      this.atNoWhiteSpace = true;

      /**
       * Indicates whether the buffer is at the start of a paragraph.
       *
       * @public
       * @type {boolean}
       */
      this.atParagraph = true;

      /**
       * The transformation output buffer to which the Markdown will be written.
       *
       * @public
       * @type {string}
       */
      this.buffer = '';

      /**
       * Indicates whether the buffer is currently within a code block.
       *
       * @public
       * @type {boolean}
       */
      this.inCodeBlock = false;

      /**
       * Indicates whether the buffer is currently within an ordered list.
       *
       * @public
       * @type {boolean}
       */
      this.inOrderedList = false;

      /**
       * Indicates whether the buffer is currently within a preformatted block.
       *
       * @public
       * @type {boolean}
       */
      this.inPreformattedBlock = false;

      /**
       * The last string to be output next to the buffer.
       *
       * @public
       * @type {string}
       */
      this.last = null;

      /**
       * The start of the current line.
       *
       * @public
       * @type {string}
       */
      this.left = '\n';

      /**
       * The depth of nested lists.
       *
       * @public
       * @type {number}
       */
      this.listDepth = 0;

      /**
       * The one-based index for the current list item within the current list.
       *
       * @public
       * @type {number}
       */
      this.listIndex = 1;

      /**
       * The current stack of plugins.
       *
       * @public
       * @type {Plugin[]}
       */
      this.pluginStack = [];

      /**
       * Indicates whether transformation of the children of the current element should be skippped.
       *
       * @public
       * @type {boolean}
       */
      this.skipChildren = false;

      /**
       * The current document for this {@link Transformation}.
       *
       * @private
       * @type {HTMLDocument}
       */
      this._document = transformer.document;

      /**
       * The current element for this {@link Transformation}.
       *
       * @private
       * @type {Element}
       */
      this._element = null;

      /**
       * The name of the tag for the current element for this {@link Transformation}.
       *
       * @private
       * @type {string}
       */
      this._tagName = null;

      /**
       * The current window for this {@link Transformation}.
       *
       * @private
       * @type {Window}
       */
      this._window = transformer.window;
    }

    /**
     * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
     *
     * @param {string} string - the string to be appended
     * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
     * @public
     */


    createClass(Transformation, [{
      key: 'append',
      value: function append(string) {
        if (this.last != null) {
          this.buffer += this.last;
        }

        this.last = string;

        return this;
      }

      /**
       * Appends a paragraph to the output buffer.
       *
       * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
       * @public
       */

    }, {
      key: 'appendParagraph',
      value: function appendParagraph() {
        if (this.atParagraph) {
          return this;
        }

        if (!this.atLeft) {
          this.append(this.left);

          this.atLeft = true;
        }

        this.append(this.left);

        this.atNoWhiteSpace = true;
        this.atParagraph = true;

        return this;
      }

      /**
       * Outputs the specified <code>string</code> to the buffer.
       *
       * Optionally, <code>string</code> can be "cleaned" before being output. Doing so will replace any certain special
       * characters as well as some white space.
       *
       * @param {string} string - the string to be output
       * @param {boolean} [clean=false] - <code>true</code> to clean <code>string</code>; otherwise <code>false</code>
       * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
       * @public
       */

    }, {
      key: 'output',
      value: function output(string, clean) {
        if (!string) {
          return this;
        }

        string = string.replace(/\r\n/g, '\n');

        if (clean) {
          string = string.replace(/\n([ \t]*\n)+/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/[ \t]+/g, ' ');

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.entries(Transformation.REPLACEMENTS)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = slicedToArray(_step.value, 2);

              var key = _step$value[0];
              var expression = _step$value[1];

              string = string.replace(Transformation.REPLACEMENTS_REGEXP[key], expression);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        if (!this.inPreformattedBlock) {
          if (this.atNoWhiteSpace) {
            string = string.replace(/^[ \t\n]+/, '');
          } else if (/^[ \t]*\n/.test(string)) {
            string = string.replace(/^[ \t\n]+/, '\n');
          } else {
            string = string.replace(/^[ \t]+/, ' ');
          }
        }

        if (!string) {
          return this;
        }

        this.atLeft = /\n$/.test(string);
        this.atNoWhiteSpace = /[ \t\n]$/.test(string);
        this.atParagraph = /\n{2}$/.test(string);

        return this.append(string.replace(/\n/g, this.left));
      }

      /**
       * Replaces the start of the current line with the <code>string</code> provided.
       *
       * @param {string} string - the string to replace the start of the current line
       * @return {Transformation} A reference to this {@link Transformation} for chaining purposes.
       * @public
       */

    }, {
      key: 'replaceLeft',
      value: function replaceLeft(string) {
        if (!this.atLeft) {
          this.append(this.left.replace(/[ ]{2,4}$/, string));

          this.atLeft = true;
          this.atNoWhiteSpace = true;
          this.atParagraph = true;
        } else if (this.last) {
          this.last = this.last.replace(/[ ]{2,4}$/, string);
        }

        return this;
      }

      /**
       * Returns the HTML document for this {@link Transformation}.
       *
       * This may not be the same document as is associated with the {@link Transformer} as this document may be nested
       * (e.g. a frame).
       *
       * @return {HTMLDocument} The HTML document.
       * @public
       */

    }, {
      key: 'document',
      get: function get() {
        return this._document;
      }

      /**
       * Returns the element for this {@link Transformation}.
       *
       * @return {Element} The element.
       * @public
       */

    }, {
      key: 'element',
      get: function get() {
        return this._element;
      }

      /**
       * Sets the element for this {@link Transformation} to <code>value</code>.
       *
       * @param {Element} value - the element to be set
       * @public
       */
      ,
      set: function set(value) {
        this._element = value;
        this._tagName = value && value.tagName ? value.tagName.toLowerCase() : null;
      }

      /**
       * Returns the name of the tag for this {@link Transformation}.
       *
       * This will be the lower case tag name.
       *
       * @return {string} The tag name.
       * @public
       */

    }, {
      key: 'tagName',
      get: function get() {
        return this._tagName;
      }

      /**
       * Returns the window for this {@link Transformation}.
       *
       * This may not be the same window as is associated with the {@link Transformer} as this window may be nested (e.g. a
       * frame).
       *
       * @return {Window} The window.
       * @public
       */

    }, {
      key: 'window',
      get: function get() {
        return this._window;
      }

      /**
       * Sets the window for this {@link Transformation} to <code>value</code>.
       *
       * @param {Window} value - the window to be set
       * @public
       */
      ,
      set: function set(value) {
        this._window = value;
        this._document = value ? value.document : null;
      }
    }]);
    return Transformation;
  }();

  /**
   * A map of special characters and their replacements.
   *
   * @public
   * @static
   * @type {Object<string, string>}
   */


  Transformation.REPLACEMENTS = {
    '\\\\': '\\\\',
    '\\[': '\\[',
    '\\]': '\\]',
    '>': '\\>',
    '_': '\\_',
    '\\*': '\\*',
    '`': '\\`',
    '#': '\\#',
    '([0-9])\\.(\\s|$)': '$1\\.$2',
    '©': '(c)',
    '®': '(r)',
    '™': '(tm)',
    ' ': ' ',
    '·': '\\*',
    ' ': ' ',
    ' ': ' ',
    ' ': ' ',
    '‘': '\'',
    '’': '\'',
    '“': '"',
    '”': '"',
    '…': '...',
    '–': '--',
    '—': '---'
  };

  /**
   * A map of special characters and the regular expression used to identify them.
   *
   * @public
   * @static
   * @type {Object<string, RegExp>}
   */
  Transformation.REPLACEMENTS_REGEXP = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(Transformation.REPLACEMENTS)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      Transformation.REPLACEMENTS_REGEXP[key] = new RegExp(key, 'g');
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  /**
   * The options for {@link Transformation}.
   *
   * @typedef {Object} Transformation~Options
   * @property {boolean} [absolute=false] - <code>true</code> if absolute URLs should be used for anchors/images;
   * otherwise <code>false</code>.
   * @property {string} [baseUri] - the base URI for the window
   * @property {boolean} [inline=false] - <code>true</code> if anchor/image URLs are to be inserted inline; otherwise
   * <code>false</code>.
   */

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * Transforms an HTML string or DOM element into Markdown.
   *
   * @public
   */

  var Transformer = function () {

    /**
     * Creates an instance of {@link Transformer} using the specified <code>window</code> and <code>plugins</code>.
     *
     * @param {Window} window - the <code>Window</code> to be used
     * @param {Map<string, Plugin>} plugins - the plugins to be used
     * @public
     */
    function Transformer(window, plugins) {
      classCallCheck(this, Transformer);

      /**
       * The <code>Window</code> for this {@link Transformer}.
       *
       * @public
       * @type {Window}
       */
      this.window = window;

      /**
       * The <code>HTMLDocument</code> for this {@link Transformer}.
       *
       * @public
       * @type {HTMLDocument}
       */
      this.document = window.document;

      /**
       * The plugins for this {@link Transformer}.
       *
       * @private
       * @type {Map<string, Plugin>}
       */
      this._plugins = plugins;
    }

    /**
     * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
     *
     * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
     * Markdown.
     *
     * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
     * @param {Transformation~Options} options - the options to be used
     * @return {string} The transformed Markdown.
     * @public
     */


    createClass(Transformer, [{
      key: 'transform',
      value: function transform(html, options) {
        if (!html) {
          return '';
        }

        var root = void 0;
        if (typeof html === 'string') {
          root = this._document.createElement('div');
          root.innerHTML = html;
        } else {
          root = html;
        }

        var transformation = new Transformation(this, options);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._plugins.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var plugin = _step.value;

            plugin.beforeAll(transformation);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.transformElement(root, transformation);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._plugins.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _plugin = _step2.value;

            _plugin.afterAll(transformation);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return transformation.append('').buffer.trim();
      }

      /**
       * Transforms the specified <code>element</code> and it's children into Markdown using the <code>transformation</code>
       * provided.
       *
       * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
       *
       * @param {Element} element - the element to be transformed into Markdown as well as it's children
       * @param {Transformation} transformation - the current {@link Transformation}
       * @return {void}
       * @public
       */

    }, {
      key: 'transformElement',
      value: function transformElement(element, transformation) {
        if (!(element && this._isVisible(element))) {
          return;
        }

        if (element.nodeType === this.window.Node.ELEMENT_NODE) {
          transformation.element = element;

          var context = new Map();
          var plugin = this._plugins.get(transformation.tagName);
          if (plugin) {
            transformation.pluginStack.push(plugin);

            plugin.before(transformation, context);
            plugin.transform(transformation, context);
          }

          if (!transformation.skipChildren) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = Array.from(element.childNodes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var child = _step3.value;

                this.transformElement(child, transformation);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }

          if (plugin) {
            plugin.after(transformation, context);

            transformation.pluginStack.pop();
          }
        } else if (element.nodeType === this.window.Node.TEXT_NODE) {
          var value = element.nodeValue || '';

          if (transformation.inPreformattedBlock) {
            transformation.output(value);
          } else if (transformation.inCodeBlock) {
            transformation.output(value.replace(/`/g, '\\`'));
          } else {
            transformation.output(value, true);
          }
        }
      }

      /**
       * Checks whether the specified <code>element</code> is currently visible.
       *
       * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
       * cases.
       *
       * @param {Element} element - the element whose visibility is to be checked
       * @return {boolean} <code>true</code> if <code>element</code> is visible; otherwise <code>false</code>.
       * @private
       */

    }, {
      key: '_isVisible',
      value: function _isVisible(element) {
        var style = this.window.getComputedStyle(element);

        return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
      }
    }]);
    return Transformer;
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-empty-function: "off", no-unused-vars: "off" */

  /**
   * A plugin that can tap into multiple parts in the transformation process.
   *
   * @public
   */
  var Plugin = function () {
    function Plugin() {
      classCallCheck(this, Plugin);
    }

    createClass(Plugin, [{
      key: "after",


      /**
       * Called after {@link Plugin#transform} <b>and</b> only once all children elements have been transformed as well,
       * provided they weren't skipped, and intended for tidying up after the transformation.
       *
       * <code>context</code> can be used to receive any state for a single element transformation from
       * {@link Plugin#before} and {@link Plugin#transform}.
       *
       * @param {Transformation} transformation - the current {@link Transformation}
       * @param {Map<string, *>} context - the current context for this {@link Plugin}
       * @return {void}
       * @public
       */
      value: function after(transformation, context) {}

      /**
       * Called before any elements are transformed and intended to setup this {@link Plugin} initially.
       *
       * @param {Transformation} transformation - the current {@link Transformation}.
       * @return {void}
       * @public
       */

    }, {
      key: "afterAll",
      value: function afterAll(transformation) {}

      /**
       * Called immediately before {@link Plugin#transform} and intended for preparing this {@link Plugin} for
       * transformation.
       *
       * <code>context</code> can be used to pass any state for a single element transformation to {@link Plugin#transform}
       * and then to {@link Plugin#after}.
       *
       * @param {Transformation} transformation - the current {@link Transformation}
       * @param {Map<string, *>} context - the current context for this {@link Plugin}
       * @return {void}
       * @public
       */

    }, {
      key: "before",
      value: function before(transformation, context) {}

      /**
       * Called after all elements have been transformed and intended to completing any steps for this {@link Plugin}.
       *
       * @param {Transformation} transformation - the current {@link Transformation}
       * @return {void}
       * @public
       */

    }, {
      key: "beforeAll",
      value: function beforeAll(transformation) {}

      /**
       * Transforms the current element within the specified <code>transformation</code> which can be used to provide
       * control over the transformation.
       *
       * <code>context</code> can be used to pass any state for a single element transformation from {@link Plugin#before}
       * to {@link Plugin#after}.
       *
       * @param {Transformation} transformation - the current {@link Transformation}
       * @param {Map<string, *>} context - the current context for this {@link Plugin}
       * @return {void}
       * @public
       */

    }, {
      key: "transform",
      value: function transform(transformation, context) {}
    }]);
    return Plugin;
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
   * text.
   *
   * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
   * the URL will be exactly as it is in the <code>href</code> attribute.
   *
   * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
   * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
   * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
   *
   * @public
   * @extends {Plugin}
   */

  var AnchorPlugin = function (_Plugin) {
    inherits(AnchorPlugin, _Plugin);

    function AnchorPlugin() {
      classCallCheck(this, AnchorPlugin);
      return possibleConstructorReturn(this, (AnchorPlugin.__proto__ || Object.getPrototypeOf(AnchorPlugin)).apply(this, arguments));
    }

    createClass(AnchorPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        if (context.has('value')) {
          transformation.output(']' + context.get('value'));
        }
      }

      /**
       * @override
       */

    }, {
      key: 'afterAll',
      value: function afterAll(transformation) {
        if (!this._anchors.length) {
          return;
        }

        transformation.append('\n\n');

        for (var i = 0; i < this._anchors.length; i++) {
          transformation.append('[anchor' + i + ']: ' + this._anchors[i] + '\n');
        }
      }

      /**
       * @override
       */

    }, {
      key: 'beforeAll',
      value: function beforeAll(transformation) {
        /**
         * The anchor values (which will contain the HREF and any title) mapped to their index.
         *
         * This is only used when the <code>inline</code> option is enabled.
         *
         * @private
         * @type {Map<string, number>}
         */
        this._anchorMap = new Map();

        /**
         * The indexed anchor values.
         *
         * This is only used when the <code>inline</code> option is enabled.
         *
         * @private
         * @type {string[]}
         */
        this._anchors = [];
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        var element = transformation.element;
        var options = transformation.options;

        var href = options.absolute ? element.href : element.getAttribute('href');
        if (!href) {
          return;
        }

        var title = element.getAttribute('title');
        var value = title ? href + ' "' + title + '"' : href;

        if (options.inline) {
          context.set('value', '(' + value + ')');
        } else {
          var index = this._anchorMap.get(value);
          if (index == null) {
            index = this._anchors.push(value) - 1;

            this._anchorMap.set(value, index);
          }

          context.set('value', '[anchor' + index + ']');
        }

        transformation.output('[');

        transformation.atNoWhiteSpace = true;
      }
    }]);
    return AnchorPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs the contents in a block quote.
   *
   * @public
   * @extends {Plugin}
   */

  var BlockQuotePlugin = function (_Plugin) {
    inherits(BlockQuotePlugin, _Plugin);

    function BlockQuotePlugin() {
      classCallCheck(this, BlockQuotePlugin);
      return possibleConstructorReturn(this, (BlockQuotePlugin.__proto__ || Object.getPrototypeOf(BlockQuotePlugin)).apply(this, arguments));
    }

    createClass(BlockQuotePlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.atLeft = false;
        transformation.atParagraph = false;
        transformation.left = context.get('previousLeft');

        transformation.appendParagraph();
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousLeft', transformation.left);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        var value = '> ';

        transformation.left += value;

        if (transformation.atParagraph) {
          transformation.append(value);
        } else {
          transformation.appendParagraph();
        }
      }
    }]);
    return BlockQuotePlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs an inline line break.
   *
   * @public
   * @extends {Plugin}
   */

  var BreakPlugin = function (_Plugin) {
    inherits(BreakPlugin, _Plugin);

    function BreakPlugin() {
      classCallCheck(this, BreakPlugin);
      return possibleConstructorReturn(this, (BreakPlugin.__proto__ || Object.getPrototypeOf(BreakPlugin)).apply(this, arguments));
    }

    createClass(BreakPlugin, [{
      key: 'transform',


      /**
       * @override
       */
      value: function transform(transformation, context) {
        transformation.append('  ' + transformation.left);

        transformation.atLeft = true;
        transformation.atNoWhiteSpace = true;
      }
    }]);
    return BreakPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A {@link Plugin} which outputs the contents in a code block.
   *
   * @public
   * @extends {Plugin}
   */

  var CodePlugin = function (_Plugin) {
    inherits(CodePlugin, _Plugin);

    function CodePlugin() {
      classCallCheck(this, CodePlugin);
      return possibleConstructorReturn(this, (CodePlugin.__proto__ || Object.getPrototypeOf(CodePlugin)).apply(this, arguments));
    }

    createClass(CodePlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        if (!context.get('skipped')) {
          transformation.inCodeBlock = context.get('previousInCodeBlock');

          transformation.output('`');
        }
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousInCodeBlock', transformation.inCodeBlock);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        if (transformation.inPreformattedBlock) {
          context.set('skipped', true);
        } else {
          transformation.output('`');

          transformation.inCodeBlock = true;
        }
      }
    }]);
    return CodePlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs as strong text.
   *
   * @public
   * @extends {Plugin}
   */

  var StrongPlugin = function (_Plugin) {
    inherits(StrongPlugin, _Plugin);

    function StrongPlugin() {
      classCallCheck(this, StrongPlugin);
      return possibleConstructorReturn(this, (StrongPlugin.__proto__ || Object.getPrototypeOf(StrongPlugin)).apply(this, arguments));
    }

    createClass(StrongPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.output('**');
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        transformation.output('**');

        transformation.atNoWhiteSpace = true;
      }
    }]);
    return StrongPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A {@link Plugin} which outputs a definition term as strong text.
   *
   * @public
   * @extends {StrongPlugin}
   */

  var DefinitionTermPlugin = function (_StrongPlugin) {
    inherits(DefinitionTermPlugin, _StrongPlugin);

    function DefinitionTermPlugin() {
      classCallCheck(this, DefinitionTermPlugin);
      return possibleConstructorReturn(this, (DefinitionTermPlugin.__proto__ || Object.getPrototypeOf(DefinitionTermPlugin)).apply(this, arguments));
    }

    createClass(DefinitionTermPlugin, [{
      key: 'transform',


      /**
       * @override
       */
      value: function transform(transformation, context) {
        transformation.appendParagraph();

        get(DefinitionTermPlugin.prototype.__proto__ || Object.getPrototypeOf(DefinitionTermPlugin.prototype), 'transform', this).call(this, transformation, context);
      }
    }]);
    return DefinitionTermPlugin;
  }(StrongPlugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs a details section.
   *
   * If the details has an <code>open</code> attribute then all of its children are transformed. Otherwise, only the
   * nested <code>summary</code>, if any, will be transformed.
   *
   * @public
   * @extends {Plugin}
   */

  var DetailsPlugin = function (_Plugin) {
    inherits(DetailsPlugin, _Plugin);

    function DetailsPlugin() {
      classCallCheck(this, DetailsPlugin);
      return possibleConstructorReturn(this, (DetailsPlugin.__proto__ || Object.getPrototypeOf(DetailsPlugin)).apply(this, arguments));
    }

    createClass(DetailsPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.skipChildren = context.get('previousSkipChildren');
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousSkipChildren', transformation.skipChildren);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        var element = transformation.element;


        transformation.appendParagraph();

        if (!element.hasAttribute('open')) {
          transformation.skipChildren = true;

          var summary = element.querySelector('summary');
          transformation.transformer.transformElement(summary, transformation);
        }
      }
    }]);
    return DetailsPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs as emphasised text.
   *
   * @public
   * @extends {Plugin}
   */

  var EmphasisPlugin = function (_Plugin) {
    inherits(EmphasisPlugin, _Plugin);

    function EmphasisPlugin() {
      classCallCheck(this, EmphasisPlugin);
      return possibleConstructorReturn(this, (EmphasisPlugin.__proto__ || Object.getPrototypeOf(EmphasisPlugin)).apply(this, arguments));
    }

    createClass(EmphasisPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.output('_');
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        transformation.output('_');

        transformation.atNoWhiteSpace = true;
      }
    }]);
    return EmphasisPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which simply ensures that all children elements are not transformed.
   *
   * @public
   * @extends {Plugin}
   */

  var EmptyPlugin = function (_Plugin) {
    inherits(EmptyPlugin, _Plugin);

    function EmptyPlugin() {
      classCallCheck(this, EmptyPlugin);
      return possibleConstructorReturn(this, (EmptyPlugin.__proto__ || Object.getPrototypeOf(EmptyPlugin)).apply(this, arguments));
    }

    createClass(EmptyPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.skipChildren = context.get('previousSkipChildren');
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousSkipChildren', transformation.skipChildren);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        transformation.skipChildren = true;
      }
    }]);
    return EmptyPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs a heading of various levels.
   *
   * @public
   * @extends {Plugin}
   */

  var HeadingPlugin = function (_Plugin) {
    inherits(HeadingPlugin, _Plugin);

    function HeadingPlugin() {
      classCallCheck(this, HeadingPlugin);
      return possibleConstructorReturn(this, (HeadingPlugin.__proto__ || Object.getPrototypeOf(HeadingPlugin)).apply(this, arguments));
    }

    createClass(HeadingPlugin, [{
      key: 'transform',


      /**
       * @override
       */
      value: function transform(transformation, context) {
        var level = parseInt(transformation.tagName.match(/([1-6])$/)[1], 10);

        transformation.appendParagraph();

        var heading = '';
        for (var i = 0; i < level; i++) {
          heading += '#';
        }

        transformation.output(heading + ' ');
      }
    }]);
    return HeadingPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs a horizontal rule.
   *
   * @public
   * @extends {Plugin}
   */

  var HorizontalRulePlugin = function (_Plugin) {
    inherits(HorizontalRulePlugin, _Plugin);

    function HorizontalRulePlugin() {
      classCallCheck(this, HorizontalRulePlugin);
      return possibleConstructorReturn(this, (HorizontalRulePlugin.__proto__ || Object.getPrototypeOf(HorizontalRulePlugin)).apply(this, arguments));
    }

    createClass(HorizontalRulePlugin, [{
      key: 'transform',


      /**
       * @override
       */
      value: function transform(transformation, context) {
        transformation.appendParagraph().output('---').appendParagraph();
      }
    }]);
    return HorizontalRulePlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which extracts the URL from an image.
   *
   * If the <code>absolute</code> option is enabled, then the URL extracted from the image will be absolute. Otherwise,
   * the URL will be exactly as it is in the <code>src</code> attribute.
   *
   * If the <code>inline</code> option is enabled, then the URL will be inserted immediately after the <code>alt</code> on
   * the image (e.g. <code>![foo](/bar.png)</code>). Otherwise, all unique URLs will be indexed
   * (e.g. <code>![foo][image0]</code>) and the references will be output at the very end.
   *
   * @public
   * @extends {Plugin}
   */

  var ImagePlugin = function (_Plugin) {
    inherits(ImagePlugin, _Plugin);

    function ImagePlugin() {
      classCallCheck(this, ImagePlugin);
      return possibleConstructorReturn(this, (ImagePlugin.__proto__ || Object.getPrototypeOf(ImagePlugin)).apply(this, arguments));
    }

    createClass(ImagePlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.skipChildren = context.get('previousSkipChildren');
      }

      /**
       * @override
       */

    }, {
      key: 'afterAll',
      value: function afterAll(transformation) {
        if (!this._images.length) {
          return;
        }

        transformation.append('\n\n');

        for (var i = 0; i < this._images.length; i++) {
          transformation.append('[image' + i + ']: ' + this._images[i] + '\n');
        }
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousSkipChildren', transformation.skipChildren);
      }

      /**
       * @override
       */

    }, {
      key: 'beforeAll',
      value: function beforeAll(transformation) {
        /**
         * The image values (which will contain the HREF) mapped to their index.
         *
         * This is only used when the <code>inline</code> option is enabled.
         *
         * @private
         * @type {Map<string, number>}
         */
        this._imageMap = new Map();

        /**
         * The indexed image values.
         *
         * This is only used when the <code>inline</code> option is enabled.
         *
         * @private
         * @type {string[]}
         */
        this._images = [];
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        transformation.skipChildren = true;

        var element = transformation.element;
        var options = transformation.options;

        var source = options.absolute ? element.src : element.getAttribute('src');
        if (!source) {
          return;
        }

        var alternativeText = element.getAttribute('alt') || '';
        var title = element.getAttribute('title');
        var value = title ? source + ' "' + title + '"' : source;

        if (options.inline) {
          value = '(' + value + ')';
        } else {
          var index = this._imageMap.get(value);
          if (index == null) {
            index = this._images.push(value) - 1;

            this._imageMap.set(value, index);
          }

          value = '[image' + index + ']';
        }

        transformation.output('![' + alternativeText + ']' + value);
      }
    }]);
    return ImagePlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * Contains utility methods that are useful throughout the library.
   *
   * @public
   */
  var Utilities = function () {
    function Utilities() {
      classCallCheck(this, Utilities);
    }

    createClass(Utilities, null, [{
      key: 'leftPad',


      /**
       * Left pads the <code>string</code> provided with the given padding string for the specified number of
       * <code>times</code>.
       *
       * @param {string} [string=""] - the string to be padded
       * @param {number} [times=0] - the number of times to pad <code>string</code>
       * @param {string} [padding=" "] - the padding string
       * @return {string} The padded <code>string</code>.
       * @public
       * @static
       */
      value: function leftPad() {
        var string = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var times = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var padding = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];

        if (!padding) {
          return string;
        }

        for (var i = 0; i < times; i++) {
          string = padding + string;
        }

        return string;
      }

      /**
       * Throws an error indicating that the a given method on a specific class has not been implemented.
       *
       * @param {string} className - the name of the class on which the method has not been implemented
       * @param {string} methodName - the name of the method which has not been implemented
       * @return {void}
       * @throws {Error} The error describing the class method which has not been implemented.
       * @public
       * @static
       */

    }, {
      key: 'throwUnimplemented',
      value: function throwUnimplemented(className, methodName) {
        throw new Error('"' + methodName + '" method must be implemented on the ' + className + ' class');
      }
    }]);
    return Utilities;
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
   * item is contained within.
   *
   * @public
   * @extends {Plugin}
   */

  var ListItemPlugin = function (_Plugin) {
    inherits(ListItemPlugin, _Plugin);

    function ListItemPlugin() {
      classCallCheck(this, ListItemPlugin);
      return possibleConstructorReturn(this, (ListItemPlugin.__proto__ || Object.getPrototypeOf(ListItemPlugin)).apply(this, arguments));
    }

    createClass(ListItemPlugin, [{
      key: 'transform',


      /**
       * @override
       */
      value: function transform(transformation, context) {
        var value = transformation.inOrderedList ? transformation.listIndex++ + '. ' : '* ';

        if (!transformation.atLeft) {
          transformation.append(transformation.left.replace(/[ ]{2,4}$/, '\n'));

          transformation.atLeft = true;
          transformation.atNoWhiteSpace = true;
          transformation.atParagraph = true;
        } else if (transformation.last) {
          transformation.last = transformation.last.replace(/[ ]{2,4}$/, '\n');
        }

        transformation.append(Utilities.leftPad(value, (transformation.listDepth - 1) * 2));
      }
    }]);
    return ListItemPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs an ordered list.
   *
   * @public
   * @extends {Plugin}
   */

  var OrderedListPlugin = function (_Plugin) {
    inherits(OrderedListPlugin, _Plugin);

    function OrderedListPlugin() {
      classCallCheck(this, OrderedListPlugin);
      return possibleConstructorReturn(this, (OrderedListPlugin.__proto__ || Object.getPrototypeOf(OrderedListPlugin)).apply(this, arguments));
    }

    createClass(OrderedListPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.inOrderedList = context.get('previousInOrderedList');
        transformation.listIndex = context.get('previousListIndex');
        transformation.listDepth--;
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousInOrderedList', transformation.inOrderedList);
        context.set('previousListIndex', transformation.listIndex);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        if (transformation.listDepth === 0) {
          transformation.appendParagraph();
        }

        transformation.inOrderedList = true;
        transformation.listIndex = 1;
        transformation.listDepth++;
      }
    }]);
    return OrderedListPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs a paragraph.
   *
   * @public
   * @extends {Plugin}
   */

  var ParagraphPlugin = function (_Plugin) {
    inherits(ParagraphPlugin, _Plugin);

    function ParagraphPlugin() {
      classCallCheck(this, ParagraphPlugin);
      return possibleConstructorReturn(this, (ParagraphPlugin.__proto__ || Object.getPrototypeOf(ParagraphPlugin)).apply(this, arguments));
    }

    createClass(ParagraphPlugin, [{
      key: 'transform',


      /**
       * @override
       */
      value: function transform(transformation, context) {
        transformation.appendParagraph();
      }
    }]);
    return ParagraphPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs the contents in a preformatted block.
   *
   * @public
   * @extends {Plugin}
   */

  var PreformattedPlugin = function (_Plugin) {
    inherits(PreformattedPlugin, _Plugin);

    function PreformattedPlugin() {
      classCallCheck(this, PreformattedPlugin);
      return possibleConstructorReturn(this, (PreformattedPlugin.__proto__ || Object.getPrototypeOf(PreformattedPlugin)).apply(this, arguments));
    }

    createClass(PreformattedPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.atLeft = false;
        transformation.atParagraph = false;
        transformation.inPreformattedBlock = context.get('previousInPreformattedBlock');
        transformation.left = context.get('previousLeft');

        transformation.appendParagraph();
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousInPreformattedBlock', transformation.inPreformattedBlock);
        context.set('previousLeft', transformation.left);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        var value = '    ';

        transformation.left += value;

        if (transformation.atParagraph) {
          transformation.append(value);
        } else {
          transformation.appendParagraph();
        }
      }
    }]);
    return PreformattedPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A preset of plugins usually grouped for a specific purpose.
   *
   * @public
   */
  var Preset = function () {

    /**
     * Creates an instance of {@link Preset}.
     *
     * @public
     */
    function Preset() {
      classCallCheck(this, Preset);

      /**
       * The plugins for this {@link Preset}.
       *
       * @private
       * @type {Map<string[], Plugin>}
       */
      this._plugins = new Map();
    }

    /**
     * Sets the specified <code>plugin</code> for the <code>tags</code> provided.
     *
     * @param {string[]} tags - the tag names to which <code>plugin</code> will be registered
     * @param {Plugin} plugin - the {@link Plugin} to be registered against <code>tags</code>
     * @return {Preset} A reference to this {@link Preset} for chaining purposes.
     * @public
     */


    createClass(Preset, [{
      key: "set",
      value: function set(tags, plugin) {
        this._plugins.set(tags, plugin);

        return this;
      }

      /**
       * Sets all of the specified <code>plugins</code> to be registered against their mapped tag names.
       *
       * @param {Map<string[], Plugin>} plugins - a <code>Map</code> of plugins and tag names to which they are
       * to be registered
       * @return {Preset} A reference to this {@link Preset} for chaining purposes.
       * @public
       */

    }, {
      key: "setAll",
      value: function setAll(plugins) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = slicedToArray(_step.value, 2);

            var tags = _step$value[0];
            var plugin = _step$value[1];

            this._plugins.set(tags, plugin);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this;
      }

      /**
       * Returns the plugins for this {@link Preset}.
       *
       * @return {Map<string[], Plugin>} The plugins.
       * @public
       */

    }, {
      key: "plugins",
      get: function get() {
        return new Map(this._plugins);
      }
    }]);
    return Preset;
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs as quoted text.
   *
   * @public
   * @extends {Plugin}
   */

  var QuotePlugin = function (_Plugin) {
    inherits(QuotePlugin, _Plugin);

    function QuotePlugin() {
      classCallCheck(this, QuotePlugin);
      return possibleConstructorReturn(this, (QuotePlugin.__proto__ || Object.getPrototypeOf(QuotePlugin)).apply(this, arguments));
    }

    createClass(QuotePlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.output('"');
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        transformation.output('"');

        transformation.atNoWhiteSpace = true;
      }
    }]);
    return QuotePlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A {@link Plugin} which outputs an unordered list.
   *
   * @public
   * @extends {Plugin}
   */

  var UnorderedListPlugin = function (_Plugin) {
    inherits(UnorderedListPlugin, _Plugin);

    function UnorderedListPlugin() {
      classCallCheck(this, UnorderedListPlugin);
      return possibleConstructorReturn(this, (UnorderedListPlugin.__proto__ || Object.getPrototypeOf(UnorderedListPlugin)).apply(this, arguments));
    }

    createClass(UnorderedListPlugin, [{
      key: 'after',


      /**
       * @override
       */
      value: function after(transformation, context) {
        transformation.inOrderedList = context.get('previousInOrderedList');
        transformation.listIndex = context.get('previousListIndex');
        transformation.listDepth--;
      }

      /**
       * @override
       */

    }, {
      key: 'before',
      value: function before(transformation, context) {
        context.set('previousInOrderedList', transformation.inOrderedList);
        context.set('previousListIndex', transformation.listIndex);
      }

      /**
       * @override
       */

    }, {
      key: 'transform',
      value: function transform(transformation, context) {
        if (transformation.listDepth === 0) {
          transformation.appendParagraph();
        }

        transformation.inOrderedList = false;
        transformation.listIndex = 1;
        transformation.listDepth++;
      }
    }]);
    return UnorderedListPlugin;
  }(Plugin);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  var defaultPreset = new Preset().set(['a'], new AnchorPlugin()).set(['blockquote', 'dd'], new BlockQuotePlugin()).set(['br'], new BreakPlugin()).set(['code', 'kbd', 'samp'], new CodePlugin()).set(['dt'], new DefinitionTermPlugin()).set(['details'], new DetailsPlugin()).set(['cite', 'dfn', 'em', 'i', 'u', 'var'], new EmphasisPlugin()).set(['applet', 'area', 'audio', 'button', 'canvas', 'datalist', 'embed', 'head', 'input', 'map', 'menu', 'meter', 'noframes', 'noscript', 'object', 'optgroup', 'option', 'param', 'progress', 'rp', 'rt', 'ruby', 'script', 'select', 'style', 'textarea', 'title', 'video'], new EmptyPlugin()).set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], new HeadingPlugin()).set(['hr'], new HorizontalRulePlugin()).set(['img'], new ImagePlugin()).set(['li'], new ListItemPlugin()).set(['ol'], new OrderedListPlugin()).set(['address', 'article', 'aside', 'div', 'fieldset', 'footer', 'header', 'nav', 'p', 'section'], new ParagraphPlugin()).set(['pre'], new PreformattedPlugin()).set(['q'], new QuotePlugin()).set(['b', 'strong'], new StrongPlugin()).set(['ul'], new UnorderedListPlugin());

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * An HTML to Markdown transformation library that supports HTML strings and DOM elements.
   *
   * @public
   */

  var Europa = function () {

    /**
     * Creates an instance of {@link Europa} using the window service provided.
     *
     * @param {WindowService} windowService - the {@link WindowService} to be used for HTML to Markdown transformation
     * @public
     */
    function Europa(windowService) {
      classCallCheck(this, Europa);

      /**
       * The {@link WindowService} for this {@link Europa} instance.
       *
       * @private
       * @type {WindowService}
       */
      this._windowService = windowService;

      /**
       * The <code>Window</code> to be used for HTML to Markdown transformation.
       *
       * @private
       * @type {Window}
       */
      this._window = null;

      /**
       * The plugins for this {@link Europa} instance.
       *
       * @private
       * @type {Map<string, Plugin>}
       */
      this._plugins = new Map();

      this.registerPreset(defaultPreset);
    }

    /**
     * Destroys the <code>Window</code> used by this {@link Europa} instance.
     *
     * This allows closeable {@link WindowService} implementations to close the <code>Window</code> and free up resources.
     * However, this instance can and will simply retrieve another <code>Window</code> from the {@link WindowService} the
     * next time it is required.
     *
     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
     * @public
     */


    createClass(Europa, [{
      key: 'destroy',
      value: function destroy() {
        if (this._window) {
          this._windowService.closeWindow(this._window);
          this._window = null;
        }

        return this;
      }

      /**
       * Registers the specified <code>plugin</code> for the <code>tags</code> provided.
       *
       * <code>tags</code> can be an array of tag names or a single string containing white-space separated tag names.
       *
       * @param {string|string[]} tags - the tag names for which <code>plugin</code> is to be registered
       * @param {Plugin} plugin - the {@link Plugin} to be registered
       * @return {Europa} A reference to this {@link Europa} for chaining purposes.
       * @public
       */

    }, {
      key: 'register',
      value: function register(tags, plugin) {
        if (typeof tags === 'string') {
          tags = tags.trim().split(/\s+/);
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tag = _step.value;

            this._plugins.set(tag.toLowerCase(), plugin);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this;
      }

      /**
       * Registers all of the plugins within the specified <code>preset</code>.
       *
       * @param {Preset} preset - the {@link Preset} whose plugins are to be registered
       * @return {Europa} A reference to this {@link Europa} for chaining purposes.
       * @public
       */

    }, {
      key: 'registerPreset',
      value: function registerPreset(preset) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = preset.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = slicedToArray(_step2.value, 2);

            var tags = _step2$value[0];
            var plugin = _step2$value[1];

            this.register(tags, plugin);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return this;
      }

      /**
       * Transforms the specified <code>html</code> into Markdown using the <code>options</code> provided.
       *
       * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be transformed into
       * Markdown.
       *
       * @param {Element|string} html - the HTML (or element whose inner HTML) to be transformed into Markdown
       * @param {Transformation~Options} [options] - the options to be used
       * @return {string} The transformed Markdown.
       * @public
       */

    }, {
      key: 'transform',
      value: function transform(html, options) {
        var window = this.window;

        var transformer = new Transformer(window, this._plugins);

        options = this._createTransformationOptions(options);

        return transformer.transform(html, options);
      }

      /**
       * Creates the options, including their default values, for the {@link Transformer#transform} method based on the
       * <code>options</code> provided.
       *
       * @param {Transformation~Options} [options] - the options that were passed in
       * @return {Transformation~Options} The complete options.
       * @private
       */

    }, {
      key: '_createTransformationOptions',
      value: function _createTransformationOptions(options) {
        return Object.assign({
          absolute: false,
          baseUri: this._windowService.getBaseUri(this.window),
          inline: false
        }, options);
      }

      /**
       * Returns the <code>Window</code> for this {@link Europa} instance.
       *
       * If no <code>Window</code> has been allocated, one is retrieved from the {@link WindowService} and allocated.
       *
       * @return {Window} The <code>Window</code>.
       * @public
       */

    }, {
      key: 'window',
      get: function get() {
        if (this._window == null) {
          this._window = this._windowService.getWindow();
        }

        return this._window;
      }
    }]);
    return Europa;
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /* eslint no-unused-vars: "off" */

  /**
   * A service used to retrieve the <code>Window</code> object for transforming HTML to Markdown and, optionally, to close
   * it upon destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an
   * artificial browser environment.
   *
   * @public
   */

  var WindowService = function () {
    function WindowService() {
      classCallCheck(this, WindowService);
    }

    createClass(WindowService, [{
      key: 'closeWindow',


      /**
       * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
       *
       * @param {Window} window - the <code>Window</code> to be closed
       * @return {void}
       * @public
       */
      value: function closeWindow(window) {
        if (this.isCloseable(window)) {
          window.close();
        }
      }

      /**
       * Returns the base URI for the specified <code>window</code>.
       *
       * Implementations <b>must</b> override this method.
       *
       * @param {Window} window - the <code>Window</code> for which the base URI is to be returned
       * @return {string} The base URI for <code>window</code>.
       * @public
       * @abstract
       */

    }, {
      key: 'getBaseUri',
      value: function getBaseUri(window) {
        Utilities.throwUnimplemented('WindowService', 'getBaseUri');
      }

      /**
       * Returns a <code>Window</code> to be used for transforming HTML to Markdown.
       *
       * Implementations <b>must</b> override this method.
       *
       * @return {Window} The <code>Window</code>.
       * @public
       * @abstract
       */

    }, {
      key: 'getWindow',
      value: function getWindow() {
        Utilities.throwUnimplemented('WindowService', 'getWindow');
      }

      /**
       * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
       *
       * @param {Window} window - the <code>Window</code> to be checked
       * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
       * @public
       */

    }, {
      key: 'isCloseable',
      value: function isCloseable(window) {
        return false;
      }
    }]);
    return WindowService;
  }();

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A very simplistic implementation of {@link WindowService} that returns the global <code>Window</code> object to be
   * used for transforming HTML into Markdown.
   *
   * @public
   * @extends {WindowService}
   */

  var NativeWindowService = function (_WindowService) {
    inherits(NativeWindowService, _WindowService);

    function NativeWindowService() {
      classCallCheck(this, NativeWindowService);
      return possibleConstructorReturn(this, (NativeWindowService.__proto__ || Object.getPrototypeOf(NativeWindowService)).apply(this, arguments));
    }

    createClass(NativeWindowService, [{
      key: 'getBaseUri',


      /**
       * @override
       */
      value: function getBaseUri(window) {
        return window.document.baseURI;
      }

      /**
       * @override
       */

    }, {
      key: 'getWindow',
      value: function getWindow() {
        return window;
      }
    }]);
    return NativeWindowService;
  }(WindowService);

  /*
   * Copyright (C) 2016 Alasdair Mercer, Skelp
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  var index = new Europa(new NativeWindowService());

  return index;

})));
//# sourceMappingURL=europa.js.map