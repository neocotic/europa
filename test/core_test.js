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

const fs = require('fs')
const path = require('path')

const md = require('../src/md')
const pkg = require('../package.json')

const encoding = 'utf8'
const expectedDirectory = path.join(__dirname, 'expected')
const fixturesDirectory = path.join(__dirname, 'fixtures')
const htmlExtension = '.html'

function toFileUrl(relativePath) {
  return `file://${toPathName(relativePath)}`
}

function toPathName(relativePath) {
  let pathName = path.resolve(process.cwd(), '..', relativePath).replace(/\\/g, '/')
  if (pathName[0] !== '/') {
    pathName = `/${pathName}`
  }

  return pathName
}

exports.fixtures = (() => {
  function testFixture(name) {
    return (test) => {
      let html = fs.readFileSync(path.join(fixturesDirectory, `${name}.html`), encoding)
      let markdown = fs.readFileSync(path.join(expectedDirectory, `${name}.md`), encoding)

      test.equal(md(html), markdown, `${name} fixtures should match`)
      test.done()
    }
  }

  let fixtures = fs.readdirSync(fixturesDirectory)
    .filter((file) => path.extname(file) === htmlExtension)
    .map((file) => path.basename(file, htmlExtension))

  let tests = {}

  for (let fixture of fixtures) {
    tests[fixture] = testFixture(fixture)
  }

  return tests
})()

exports.options = {
  absolute(test) {
    let options = { absolute: true }

    test.equal(md('<a href="mock">anchor</a>'), `
      [anchor][0]

      [0]: mock
    `, 'Link should be relative')

    test.equal(md('<a href="/mock">anchor</a>'), `
      [anchor][0]

      [0]: /mock
    `, 'Root link should be relative')

    test.equal(md('<a href="mock">anchor</a>', options), `
      [anchor][0]

      [0]: ${toFileUrl('mock')}
    `, 'Link should be absolute')

    test.equal(md('<a href="/mock">anchor</a>', options), `
      [anchor][0]

      [0]: ${toFileUrl('/mock')}
    `, 'Root link should be absolute')

    test.equal(md('<img src="mock">'), '![](mock)', 'Image should be relative')

    test.equal(md('<img src="mock">', options), `![](${toFileUrl('mock')})`, 'Image should be absolute')

    test.done()
  },

  base(test) {
    let base = 'http://example.com/path/to/page/'
    let options = { absolute: true }

    test.equal(md('<a href="mock">anchor</a>', options), `
      [anchor][0]

      [0]: ${toFileUrl('mock')}
    `, 'Link should be relative to the current working directory')

    test.equal(md('<a href="/mock">anchor</a>', options), `
      [anchor][0]

      [0]: ${toFileUrl('/mock')}
    `, 'Root link should be relative to the current working directory')

    test.equal(md('<img src="mock">', options), `![](${toFileUrl('mock')})`, 'Image should be relative to the current working directory')

    options.base = base

    test.equal(md('<a href="mock">anchor</a>', options), `
      [anchor][0]

      [0]: ${base}mock
    `, 'Link should be relative to custom URL')

    test.equal(md('<a href="/mock">anchor</a>', options), `
      [anchor][0]

      [0]: http://example.com/mock
    `, 'Root link should be relative to custom URL')

    test.equal(md('<img src="mock">', options), `![](${base}mock)`, 'Image should be relative to custom URL')

    test.done()
  },

  inline(test) {
    let options = { inline: true }

    test.equal(md('<a href="mock">anchor</a>'), `
      [anchor][0]

      [0]: mock
    `, 'Link should be in reference style')

    test.equal(md('<a href="mock" title="mocker">anchor</a>'), `
      [anchor][0]

      [0]: mock "mocker"
    `, 'Link should be in reference style with title')

    test.equal(md('<a href="mock">anchor</a>', options), '[anchor](mock)', 'Link should be in inline style')

    test.equal(md('<a href="mock" title="mocker">anchor</a>', options), '[anchor](mock "mocker")', 'Link should be in inline style with title')

    test.done()
  }
}

exports.version = (test) => {
  test.equal(md.version, pkg.version, 'Version should match descriptor')
  test.done()
}