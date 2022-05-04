/*
 * Copyright (C) 2022 neocotic
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

import { Europa } from 'europa-core/Europa';
import { AnchorPlugin } from 'europa-core/plugin/predefined/AnchorPlugin';
import { BlockQuotePlugin } from 'europa-core/plugin/predefined/BlockQuotePlugin';
import { BreakPlugin } from 'europa-core/plugin/predefined/BreakPlugin';
import { CodePlugin } from 'europa-core/plugin/predefined/CodePlugin';
import { DefinitionTermPlugin } from 'europa-core/plugin/predefined/DefinitionTermPlugin';
import { DetailsPlugin } from 'europa-core/plugin/predefined/DetailsPlugin';
import { EmphasisPlugin } from 'europa-core/plugin/predefined/EmphasisPlugin';
import { EmptyPlugin } from 'europa-core/plugin/predefined/EmptyPlugin';
import { FramePlugin } from 'europa-core/plugin/predefined/FramePlugin';
import { HeadingPlugin } from 'europa-core/plugin/predefined/HeadingPlugin';
import { HorizontalRulePlugin } from 'europa-core/plugin/predefined/HorizontalRulePlugin';
import { ImagePlugin } from 'europa-core/plugin/predefined/ImagePlugin';
import { ListItemPlugin } from 'europa-core/plugin/predefined/ListItemPlugin';
import { OrderedListPlugin } from 'europa-core/plugin/predefined/OrderedListPlugin';
import { ParagraphPlugin } from 'europa-core/plugin/predefined/ParagraphPlugin';
import { PreformattedPlugin } from 'europa-core/plugin/predefined/PreformattedPlugin';
import { QuotePlugin } from 'europa-core/plugin/predefined/QuotePlugin';
import { StrongPlugin } from 'europa-core/plugin/predefined/StrongPlugin';
import { UnorderedListPlugin } from 'europa-core/plugin/predefined/UnorderedListPlugin';

const plugins = [
  new AnchorPlugin(),
  new BlockQuotePlugin(),
  new BreakPlugin(),
  new CodePlugin(),
  new DefinitionTermPlugin(),
  new DetailsPlugin(),
  new EmphasisPlugin(),
  new EmptyPlugin(),
  new FramePlugin(),
  new HeadingPlugin(),
  new HorizontalRulePlugin(),
  new ImagePlugin(),
  new ListItemPlugin(),
  new OrderedListPlugin(),
  new ParagraphPlugin(),
  new PreformattedPlugin(),
  new QuotePlugin(),
  new StrongPlugin(),
  new UnorderedListPlugin(),
];

plugins.forEach(Europa.register);
