'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchor = require('../predefined/anchor');

var _blockQuote = require('../predefined/block-quote');

var _break = require('../predefined/break');

var _code = require('../predefined/code');

var _definitionTerm = require('../predefined/definition-term');

var _details = require('../predefined/details');

var _emphasis = require('../predefined/emphasis');

var _empty = require('../predefined/empty');

var _heading = require('../predefined/heading');

var _horizontalRule = require('../predefined/horizontal-rule');

var _image = require('../predefined/image');

var _listItem = require('../predefined/list-item');

var _orderedList = require('../predefined/ordered-list');

var _paragraph = require('../predefined/paragraph');

var _preformatted = require('../predefined/preformatted');

var _preset = require('./preset');

var _quote = require('../predefined/quote');

var _strong = require('../predefined/strong');

var _unorderedList = require('../predefined/unordered-list');

exports.default = new _preset.Preset().set(['a'], new _anchor.AnchorPlugin()).set(['blockquote', 'dd'], new _blockQuote.BlockQuotePlugin()).set(['br'], new _break.BreakPlugin()).set(['code', 'kbd', 'samp'], new _code.CodePlugin()).set(['dt'], new _definitionTerm.DefinitionTermPlugin()).set(['details'], new _details.DetailsPlugin()).set(['cite', 'dfn', 'em', 'i', 'u', 'var'], new _emphasis.EmphasisPlugin()).set(['applet', 'area', 'audio', 'button', 'canvas', 'datalist', 'embed', 'head', 'input', 'map', 'menu', 'meter', 'noframes', 'noscript', 'object', 'optgroup', 'option', 'param', 'progress', 'rp', 'rt', 'ruby', 'script', 'select', 'style', 'textarea', 'title', 'video'], new _empty.EmptyPlugin()).set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], new _heading.HeadingPlugin()).set(['hr'], new _horizontalRule.HorizontalRulePlugin()).set(['img'], new _image.ImagePlugin()).set(['li'], new _listItem.ListItemPlugin()).set(['ol'], new _orderedList.OrderedListPlugin()).set(['address', 'article', 'aside', 'div', 'fieldset', 'footer', 'header', 'nav', 'p', 'section'], new _paragraph.ParagraphPlugin()).set(['pre'], new _preformatted.PreformattedPlugin()).set(['q'], new _quote.QuotePlugin()).set(['b', 'strong'], new _strong.StrongPlugin()).set(['ul'], new _unorderedList.UnorderedListPlugin()); /*
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vcHJlc2V0L2RlZmF1bHQuanMiXSwibmFtZXMiOlsic2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFzQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O2tCQUVlLHFCQUNaQSxHQURZLENBQ1IsQ0FBRSxHQUFGLENBRFEsRUFDQywwQkFERCxFQUVaQSxHQUZZLENBRVIsQ0FDSCxZQURHLEVBRUgsSUFGRyxDQUZRLEVBS1Ysa0NBTFUsRUFNWkEsR0FOWSxDQU1SLENBQUUsSUFBRixDQU5RLEVBTUUsd0JBTkYsRUFPWkEsR0FQWSxDQU9SLENBQ0gsTUFERyxFQUVILEtBRkcsRUFHSCxNQUhHLENBUFEsRUFXVixzQkFYVSxFQVlaQSxHQVpZLENBWVIsQ0FBRSxJQUFGLENBWlEsRUFZRSwwQ0FaRixFQWFaQSxHQWJZLENBYVIsQ0FBRSxTQUFGLENBYlEsRUFhTyw0QkFiUCxFQWNaQSxHQWRZLENBY1IsQ0FDSCxNQURHLEVBRUgsS0FGRyxFQUdILElBSEcsRUFJSCxHQUpHLEVBS0gsR0FMRyxFQU1ILEtBTkcsQ0FkUSxFQXFCViw4QkFyQlUsRUFzQlpBLEdBdEJZLENBc0JSLENBQ0gsUUFERyxFQUVILE1BRkcsRUFHSCxPQUhHLEVBSUgsUUFKRyxFQUtILFFBTEcsRUFNSCxVQU5HLEVBT0gsT0FQRyxFQVFILE1BUkcsRUFTSCxPQVRHLEVBVUgsS0FWRyxFQVdILE1BWEcsRUFZSCxPQVpHLEVBYUgsVUFiRyxFQWNILFVBZEcsRUFlSCxRQWZHLEVBZ0JILFVBaEJHLEVBaUJILFFBakJHLEVBa0JILE9BbEJHLEVBbUJILFVBbkJHLEVBb0JILElBcEJHLEVBcUJILElBckJHLEVBc0JILE1BdEJHLEVBdUJILFFBdkJHLEVBd0JILFFBeEJHLEVBeUJILE9BekJHLEVBMEJILFVBMUJHLEVBMkJILE9BM0JHLEVBNEJILE9BNUJHLENBdEJRLEVBbURWLHdCQW5EVSxFQW9EWkEsR0FwRFksQ0FvRFIsQ0FDSCxJQURHLEVBRUgsSUFGRyxFQUdILElBSEcsRUFJSCxJQUpHLEVBS0gsSUFMRyxFQU1ILElBTkcsQ0FwRFEsRUEyRFYsNEJBM0RVLEVBNERaQSxHQTVEWSxDQTREUixDQUFFLElBQUYsQ0E1RFEsRUE0REUsMENBNURGLEVBNkRaQSxHQTdEWSxDQTZEUixDQUFFLEtBQUYsQ0E3RFEsRUE2REcsd0JBN0RILEVBOERaQSxHQTlEWSxDQThEUixDQUFFLElBQUYsQ0E5RFEsRUE4REUsOEJBOURGLEVBK0RaQSxHQS9EWSxDQStEUixDQUFFLElBQUYsQ0EvRFEsRUErREUsb0NBL0RGLEVBZ0VaQSxHQWhFWSxDQWdFUixDQUNILFNBREcsRUFFSCxTQUZHLEVBR0gsT0FIRyxFQUlILEtBSkcsRUFLSCxVQUxHLEVBTUgsUUFORyxFQU9ILFFBUEcsRUFRSCxLQVJHLEVBU0gsR0FURyxFQVVILFNBVkcsQ0FoRVEsRUEyRVYsZ0NBM0VVLEVBNEVaQSxHQTVFWSxDQTRFUixDQUFFLEtBQUYsQ0E1RVEsRUE0RUcsc0NBNUVILEVBNkVaQSxHQTdFWSxDQTZFUixDQUFFLEdBQUYsQ0E3RVEsRUE2RUMsd0JBN0VELEVBOEVaQSxHQTlFWSxDQThFUixDQUNILEdBREcsRUFFSCxRQUZHLENBOUVRLEVBaUZWLDBCQWpGVSxFQWtGWkEsR0FsRlksQ0FrRlIsQ0FBRSxJQUFGLENBbEZRLEVBa0ZFLHdDQWxGRixDLEVBMUNmIiwiZmlsZSI6ImRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IEFsYXNkYWlyIE1lcmNlciwgU2tlbHBcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB7IEFuY2hvclBsdWdpbiB9IGZyb20gJy4uL3ByZWRlZmluZWQvYW5jaG9yJ1xuaW1wb3J0IHsgQmxvY2tRdW90ZVBsdWdpbiB9IGZyb20gJy4uL3ByZWRlZmluZWQvYmxvY2stcXVvdGUnXG5pbXBvcnQgeyBCcmVha1BsdWdpbiB9IGZyb20gJy4uL3ByZWRlZmluZWQvYnJlYWsnXG5pbXBvcnQgeyBDb2RlUGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC9jb2RlJ1xuaW1wb3J0IHsgRGVmaW5pdGlvblRlcm1QbHVnaW4gfSBmcm9tICcuLi9wcmVkZWZpbmVkL2RlZmluaXRpb24tdGVybSdcbmltcG9ydCB7IERldGFpbHNQbHVnaW4gfSBmcm9tICcuLi9wcmVkZWZpbmVkL2RldGFpbHMnXG5pbXBvcnQgeyBFbXBoYXNpc1BsdWdpbiB9IGZyb20gJy4uL3ByZWRlZmluZWQvZW1waGFzaXMnXG5pbXBvcnQgeyBFbXB0eVBsdWdpbiB9IGZyb20gJy4uL3ByZWRlZmluZWQvZW1wdHknXG5pbXBvcnQgeyBIZWFkaW5nUGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC9oZWFkaW5nJ1xuaW1wb3J0IHsgSG9yaXpvbnRhbFJ1bGVQbHVnaW4gfSBmcm9tICcuLi9wcmVkZWZpbmVkL2hvcml6b250YWwtcnVsZSdcbmltcG9ydCB7IEltYWdlUGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC9pbWFnZSdcbmltcG9ydCB7IExpc3RJdGVtUGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC9saXN0LWl0ZW0nXG5pbXBvcnQgeyBPcmRlcmVkTGlzdFBsdWdpbiB9IGZyb20gJy4uL3ByZWRlZmluZWQvb3JkZXJlZC1saXN0J1xuaW1wb3J0IHsgUGFyYWdyYXBoUGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC9wYXJhZ3JhcGgnXG5pbXBvcnQgeyBQcmVmb3JtYXR0ZWRQbHVnaW4gfSBmcm9tICcuLi9wcmVkZWZpbmVkL3ByZWZvcm1hdHRlZCdcbmltcG9ydCB7IFByZXNldCB9IGZyb20gJy4vcHJlc2V0J1xuaW1wb3J0IHsgUXVvdGVQbHVnaW4gfSBmcm9tICcuLi9wcmVkZWZpbmVkL3F1b3RlJ1xuaW1wb3J0IHsgU3Ryb25nUGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC9zdHJvbmcnXG5pbXBvcnQgeyBVbm9yZGVyZWRMaXN0UGx1Z2luIH0gZnJvbSAnLi4vcHJlZGVmaW5lZC91bm9yZGVyZWQtbGlzdCdcblxuZXhwb3J0IGRlZmF1bHQgbmV3IFByZXNldCgpXG4gIC5zZXQoWyAnYScgXSwgbmV3IEFuY2hvclBsdWdpbigpKVxuICAuc2V0KFtcbiAgICAnYmxvY2txdW90ZScsXG4gICAgJ2RkJ1xuICBdLCBuZXcgQmxvY2tRdW90ZVBsdWdpbigpKVxuICAuc2V0KFsgJ2JyJyBdLCBuZXcgQnJlYWtQbHVnaW4oKSlcbiAgLnNldChbXG4gICAgJ2NvZGUnLFxuICAgICdrYmQnLFxuICAgICdzYW1wJ1xuICBdLCBuZXcgQ29kZVBsdWdpbigpKVxuICAuc2V0KFsgJ2R0JyBdLCBuZXcgRGVmaW5pdGlvblRlcm1QbHVnaW4oKSlcbiAgLnNldChbICdkZXRhaWxzJyBdLCBuZXcgRGV0YWlsc1BsdWdpbigpKVxuICAuc2V0KFtcbiAgICAnY2l0ZScsXG4gICAgJ2RmbicsXG4gICAgJ2VtJyxcbiAgICAnaScsXG4gICAgJ3UnLFxuICAgICd2YXInXG4gIF0sIG5ldyBFbXBoYXNpc1BsdWdpbigpKVxuICAuc2V0KFtcbiAgICAnYXBwbGV0JyxcbiAgICAnYXJlYScsXG4gICAgJ2F1ZGlvJyxcbiAgICAnYnV0dG9uJyxcbiAgICAnY2FudmFzJyxcbiAgICAnZGF0YWxpc3QnLFxuICAgICdlbWJlZCcsXG4gICAgJ2hlYWQnLFxuICAgICdpbnB1dCcsXG4gICAgJ21hcCcsXG4gICAgJ21lbnUnLFxuICAgICdtZXRlcicsXG4gICAgJ25vZnJhbWVzJyxcbiAgICAnbm9zY3JpcHQnLFxuICAgICdvYmplY3QnLFxuICAgICdvcHRncm91cCcsXG4gICAgJ29wdGlvbicsXG4gICAgJ3BhcmFtJyxcbiAgICAncHJvZ3Jlc3MnLFxuICAgICdycCcsXG4gICAgJ3J0JyxcbiAgICAncnVieScsXG4gICAgJ3NjcmlwdCcsXG4gICAgJ3NlbGVjdCcsXG4gICAgJ3N0eWxlJyxcbiAgICAndGV4dGFyZWEnLFxuICAgICd0aXRsZScsXG4gICAgJ3ZpZGVvJ1xuICBdLCBuZXcgRW1wdHlQbHVnaW4oKSlcbiAgLnNldChbXG4gICAgJ2gxJyxcbiAgICAnaDInLFxuICAgICdoMycsXG4gICAgJ2g0JyxcbiAgICAnaDUnLFxuICAgICdoNidcbiAgXSwgbmV3IEhlYWRpbmdQbHVnaW4oKSlcbiAgLnNldChbICdocicgXSwgbmV3IEhvcml6b250YWxSdWxlUGx1Z2luKCkpXG4gIC5zZXQoWyAnaW1nJyBdLCBuZXcgSW1hZ2VQbHVnaW4oKSlcbiAgLnNldChbICdsaScgXSwgbmV3IExpc3RJdGVtUGx1Z2luKCkpXG4gIC5zZXQoWyAnb2wnIF0sIG5ldyBPcmRlcmVkTGlzdFBsdWdpbigpKVxuICAuc2V0KFtcbiAgICAnYWRkcmVzcycsXG4gICAgJ2FydGljbGUnLFxuICAgICdhc2lkZScsXG4gICAgJ2RpdicsXG4gICAgJ2ZpZWxkc2V0JyxcbiAgICAnZm9vdGVyJyxcbiAgICAnaGVhZGVyJyxcbiAgICAnbmF2JyxcbiAgICAncCcsXG4gICAgJ3NlY3Rpb24nXG4gIF0sIG5ldyBQYXJhZ3JhcGhQbHVnaW4oKSlcbiAgLnNldChbICdwcmUnIF0sIG5ldyBQcmVmb3JtYXR0ZWRQbHVnaW4oKSlcbiAgLnNldChbICdxJyBdLCBuZXcgUXVvdGVQbHVnaW4oKSlcbiAgLnNldChbXG4gICAgJ2InLFxuICAgICdzdHJvbmcnXG4gIF0sIG5ldyBTdHJvbmdQbHVnaW4oKSlcbiAgLnNldChbICd1bCcgXSwgbmV3IFVub3JkZXJlZExpc3RQbHVnaW4oKSlcbiJdfQ==