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

import { expect } from 'chai'
import os from 'os'
import sinon from 'sinon'
import WindowService from 'europa-core/lib/service/window-service'

import NodeWindowService from '../../lib/service/node-window-service'

describe('NodeWindowService', () => {
  let windowService

  beforeEach(() => {
    windowService = new NodeWindowService()
  })

  it('should extend from WindowService', () => {
    expect(windowService).to.be.an.instanceof(WindowService)
  })

  describe('#closeWindow', () => {
    it('should close the window', () => {
      const stubWindow = sinon.stub({ close() {} })

      windowService.closeWindow(stubWindow)

      expect(stubWindow.close.called).to.be.true
    })
  })

  describe('#getBaseUri', () => {
    let previousWorkingDirectory

    afterEach(() => {
      process.chdir(previousWorkingDirectory)
    })

    beforeEach(() => {
      previousWorkingDirectory = process.cwd()

      process.chdir(os.homedir())
    })

    it('should return file URI for current working directory', () => {
      expect(windowService.getBaseUri(null)).to.equal(`file:///${os.homedir().replace(/\\/g, '/')}`)
    })
  })

  describe('#getWindow', () => {
    let previousWorkingDirectory
    let window

    afterEach(() => {
      process.chdir(previousWorkingDirectory)

      window.close()
    })

    beforeEach(() => {
      previousWorkingDirectory = process.cwd()

      process.chdir(os.homedir())
    })

    it('should current window', () => {
      window = windowService.getWindow()

      expect(window).not.to.be.null
      expect(window.document).not.to.be.null
      expect(window.document.baseURI).to.equal(`file:///${os.homedir().replace(/\\/g, '/')}`)
    })
  })

  describe('#isCloseable', () => {
    it('should return true', () => {
      expect(windowService.isCloseable(null)).to.be.true
    })
  })
})
