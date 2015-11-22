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

const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const md = require('../src/md')

const command = './bin/htmlmd'
const encoding = 'utf8'
const expectedDirectory = path.join(__dirname, 'expected')
const fixturesDirectory = path.join(__dirname, 'fixtures')
const htmlExtension = '.html'
const markdownExtension = '.md'
const markdownFullExtension = '.markdown'
const outputDirectory = 'tmp'
const usage = `

  Usage: htmlmd [options] [ -e html | <file ...> ]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -a, --absolute      always use absolute URLs for links and images
    -b, --base <url>    set base URL to resolve relative URLs from
    -d, --debug         print additional debug information
    -e, --eval          pass a string from the command line as input
    -i, --inline        generate inline style links
    -l, --long-ext      use long extension for Markdown files
    -o, --output <dir>  set the output directory for converted Markdown
    -p, --print         print out the converted Markdown


`.replace(/\n(?!\n)(?=.+)/g, '\n  ')
const version = `
  ${md.version}

`

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
    let expected = fs.readFileSync(path.join(expectedDirectory, `${name}${markdownExtension}`), encoding)
    let htmlPath = path.join(fixturesDirectory, `${name}${htmlExtension}`)

    return {
      standard(test) {
        test.expect(2)

        exec(`${command} -o #{outputDirectory} #{htmlPath}`, (error) => {
          test.ifError(error, `Error should not be thrown using -o flag for ${name} fixture`)

          let markdownPath = path.join(outputDirectory, `${name}${markdownExtension}`)
          let markdown = fs.readFileSync(markdownPath, encoding)

          test.equal(markdown, expected, `${name} fixture should match using -o flag`)

          test.done()
        })
      },

      long(test) {
        test.expect(2)

        exec(`${command} -lo ${outputDirectory} ${htmlPath}`, (error) => {
          test.ifError(error, `Error should not be thrown using -lo flags for ${name} fixture`)

          let markdownPath = path.join(outputDirectory, `${name}${markdownFullExtension}`)
          let markdown = fs.readFileSync(markdownPath, encoding)

          test.equal(markdown, expected, `${name} fixture should match using -lo flags`)

          test.done()
        })
      },

      print(test) {
        test.expect(2)

        exec(`${command} -p ${htmlPath}`, (error, stdout) => {
          test.ifError(error, `Error should not be thrown using -p flag for ${name} fixture`)
          test.equal(stdout, `
            ${expected}

          `, `${name} fixture should match using -p flag`)

          test.done()
        })
      }
    }
  }

  let fixtures = fs.readdirSync(fixturesDirectory)
    .filter((file) => path.extname(file) === htmlExtension)
    .map((file) => path.basename(file, htmlExtension))

  let tests = {
    setUp(callback) {
      fs.exists(outputDirectory, (exists) => {
        if (exists) {
          callback()
        } else {
          fs.mkdir(outputDirectory, callback)
        }
      })
    }
  }

  for (let fixture of fixtures) {
    tests[fixture] = testFixture(fixture)
  }

  return tests
})()

exports.absolute = (() => {
  function testAbsolute(command, expected, desc, flags) {
    return (test) => {
      test.expect(2)

      exec(command, (error, stdout) => {
        test.ifError(error, `Error should not be thrown using '${flags}' flags`)
        test.equal(stdout, expected, `${desc} using ${flags} flags`)

        test.done()
      })
    }
  }

  return {
    relativeLink: testAbsolute(`${command} -ep "<a href='mock'>anchor</a>"`, `
      [anchor][0]

      [0]: mock

    `, 'Link should be relative', '-ep'),

    relativeRootLink: testAbsolute(`${command} -ep "<a href='/mock'>anchor</a>"`, `
      [anchor][0]

      [0]: /mock

    `, 'Root link should be relative', '-ep'),

    absoluteLink: testAbsolute(`${command} -epa "<a href='mock'>anchor</a>"`, `
      [anchor][0]

      [0]: ${toFileUrl('mock')}

    `, 'Link should be absolute', '-epa'),

    absoluteRootLink: testAbsolute(`${command} -epa "<a href='/mock'>anchor</a>"`, `
      [anchor][0]

      [0]: ${toFileUrl('/mock')}

    `, 'Root link should be absolute', '-epa'),

    relativeImage: testAbsolute(`${command} -ep "<img src='mock'>"`, `
      ![](mock)

    `, 'Image should be relative', '-ep'),

    absoluteImage: testAbsolute(`${command} -epa "<img src='mock'>"`, `
      ![](${toFileUrl('mock')})

    `, 'Image should be absolute', '-epa')
  }
})()

exports.base = (() => {
  function testBase(command, expected, desc, flags) {
    return (test) => {
      test.expect(2)

      exec(command, (error, stdout) => {
        test.ifError(error, `Error should not be thrown using '${flags}' flags`)
        test.equal(stdout, expected, `${desc} using ${flags} flags`)

        test.done()
      })
    }
  }

  return {
    defaultLink: testBase(`${command} -epa "<a href='mock'>anchor</a>"`, `
      [anchor][0]

      [0]: ${toFileUrl('mock')}

    `, 'Link should be relative to the current working directory', '-epa'),

    defaultRootLink: testBase(`${command} -epa "<a href='/mock'>anchor</a>"`, `
      [anchor][0]

      [0]: ${toFileUrl('/mock')}

    `, 'Root link should be relative to the current working directory', '-epa'),

    defaultImage: testBase(`${command} -epa "<img src='mock'>"`, `
      ![](${toFileUrl('mock')})

    `, 'Image should be relative to the current working directory', '-epa'),

    baseLink: testBase(`${command} -epab "http://example.com/path/to/page/" "<a href='mock'>anchor</a>"`, `
      [anchor][0]

      [0]: http://example.com/path/to/page/mock

    `, 'Link should be relative to custom URL', '-epab'),

    baseRootLink: testBase(`${command} -epab "http://example.com/path/to/page/" "<a href='/mock'>anchor</a>"`, `
      [anchor][0]

      [0]: http://example.com/mock

    `, 'Link should be relative to custom URL', '-epab'),

    baseImage: testBase(`${command} -epab "http://example.com/path/to/page/" "<img src='mock'>"`, `
      ![](http://example.com/path/to/page/mock)

    `, 'Image should be relative to custom URL', '-epab')
  }
})()

exports.inline = (() => {
  function testInline(command, expected, desc, flags) {
    return (test) => {
      test.expect(2)

      exec(command, (error, stdout) => {
        test.ifError(error, `Error should not be thrown using '${flags}' flags`)
        test.equal(stdout, expected, `${desc} using ${flags} flags`)

        test.done()
      })
    }
  }

  return {
    referenceLink: testInline(`${command} -ep "<a href='mock'>anchor</a>"`, `
      [anchor][0]

      [0]: mock

    `, 'Link should be in reference style', '-ep'),

    referenceLinkWithTitle: testInline(`${command} -ep "<a href='mock' title='mocker'>anchor</a>"`, `
      [anchor][0]

      [0]: mock "mocker"

    `, 'Link should be in reference style with title', '-ep'),

    inlineLink: testInline(`${command} -epi "<a href='mock'>anchor</a>"`, `
      [anchor](mock)

    `, 'Link should be in inline style', '-epi'),

    inlineLinkWithTitle: testInline(`${command} -epi "<a href='mock' title='mocker'>anchor</a>"`, `
      [anchor](mock "mocker")

    `, 'Link should be in inline style with title', '-epi')
  }
})()

exports.stdio = (test) => {
  test.expect(2)

  exec(`${command} -ep "<strong>strong</strong>"`, (error, stdout) => {
    test.ifError(error, 'Error should not be thrown using -ep flags')
    test.equal(stdout, `
      **strong**

    `, 'Output should match expected markdown using -ep flags')

    test.done()
  })
}

exports.usage = {
  help(test) {
    test.expect(2)

    exec(`${command} -h`, (error, stdout) => {
      test.ifError(error, 'Error should not be thrown using the -h flag')
      test.equal(stdout, usage, 'Output should match expected usage using the -h flag')

      test.done()
    })
  },

  noArgs(test) {
    test.expect(2)

    exec(command, (error, stdout) => {
      test.ifError(error, 'Error should not be thrown using no flags')
      test.equal(stdout, usage, 'Output should match expected usage using no flags')

      test.done()
    })
  }
}

exports.version = (test) => {
  test.expect(2)

  exec(`${command} -V`, (error, stdout) => {
    test.ifError(error, 'Error should not be thrown using -v flag')
    test.equal(stdout, version, 'Output should match known version using -v flag')

    test.done()
  })
}