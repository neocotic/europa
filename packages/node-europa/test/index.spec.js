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

/* eslint "no-underscore-dangle": "off" */

import { expect } from 'chai'
import { Europa } from 'europa-core/lib/europa'
import fs from 'fs'
import glob from 'glob'
import path from 'path'

import europa from '../lib/index'
import { NodeWindowService } from '../lib/service/node-window-service'

describe('index', () => {
  describe('default', () => {
    const htmlFiles = glob.sync('test/fixtures/**.html')

    it('should be an instance of Europa', () => {
      expect(europa).to.be.an.instanceof(Europa)
    })

    it('should be using NodeWindowService', () => {
      expect(europa._windowService).to.be.an.instanceof(NodeWindowService)
    })

    for (const htmlFile of htmlFiles) {
      const fixture = path.basename(htmlFile, '.html')

      it(`should transform HTML to Markdown for fixture "${fixture}"`, () => {
        const markdownFile = `${path.join(path.dirname(htmlFile), fixture)}.md`
        const html = fs.readFileSync(htmlFile, 'utf8')
        const expected = fs.readFileSync(markdownFile, 'utf8')

        expect(europa.transform(html)).to.equal(expected)
      })
    }
  })
})
