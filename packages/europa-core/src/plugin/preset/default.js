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

import AnchorPlugin from '../predefined/anchor'
import BlockQuotePlugin from '../predefined/block-quote'
import BreakPlugin from '../predefined/break'
import CodePlugin from '../predefined/code'
import DefinitionTermPlugin from '../predefined/definition-term'
import DetailsPlugin from '../predefined/details'
import EmphasisPlugin from '../predefined/emphasis'
import EmptyPlugin from '../predefined/empty'
import HeadingPlugin from '../predefined/heading'
import HorizontalRulePlugin from '../predefined/horizontal-rule'
import ImagePlugin from '../predefined/image'
import ListItemPlugin from '../predefined/list-item'
import OrderedListPlugin from '../predefined/ordered-list'
import ParagraphPlugin from '../predefined/paragraph'
import PreformattedPlugin from '../predefined/preformatted'
import Preset from './preset'
import QuotePlugin from '../predefined/quote'
import StrongPlugin from '../predefined/strong'
import UnorderedListPlugin from '../predefined/unordered-list'

export default new Preset()
  .set([ 'a' ], new AnchorPlugin())
  .set([
    'blockquote',
    'dd'
  ], new BlockQuotePlugin())
  .set([ 'br' ], new BreakPlugin())
  .set([
    'code',
    'kbd',
    'samp'
  ], new CodePlugin())
  .set([ 'dt' ], new DefinitionTermPlugin())
  .set([ 'details' ], new DetailsPlugin())
  .set([
    'cite',
    'dfn',
    'em',
    'i',
    'u',
    'var'
  ], new EmphasisPlugin())
  .set([
    'applet',
    'area',
    'audio',
    'button',
    'canvas',
    'datalist',
    'embed',
    'head',
    'input',
    'map',
    'menu',
    'meter',
    'noframes',
    'noscript',
    'object',
    'optgroup',
    'option',
    'param',
    'progress',
    'rp',
    'rt',
    'ruby',
    'script',
    'select',
    'style',
    'textarea',
    'title',
    'video'
  ], new EmptyPlugin())
  .set([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
  ], new HeadingPlugin())
  .set([ 'hr' ], new HorizontalRulePlugin())
  .set([ 'img' ], new ImagePlugin())
  .set([ 'li' ], new ListItemPlugin())
  .set([ 'ol' ], new OrderedListPlugin())
  .set([
    'address',
    'article',
    'aside',
    'div',
    'fieldset',
    'footer',
    'header',
    'nav',
    'p',
    'section'
  ], new ParagraphPlugin())
  .set([ 'pre' ], new PreformattedPlugin())
  .set([ 'q' ], new QuotePlugin())
  .set([
    'b',
    'strong'
  ], new StrongPlugin())
  .set([ 'ul' ], new UnorderedListPlugin())
