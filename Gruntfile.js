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

module.exports = function(grunt) {
  var commonjs
  var nodeResolve
  var semver = require('semver')
  var uglify

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      all: {
        files: [ 'lib/**/*.js' ],
        tasks: [ 'build' ]
      }
    }
  })

  var buildTasks = [ 'compile' ]
  var compileTasks = []
  var testTasks = [ 'compile' ]

  if (semver.satisfies(process.version, '>=0.12')) {
    commonjs = require('rollup-plugin-commonjs')
    nodeResolve = require('rollup-plugin-node-resolve')
    uglify = require('rollup-plugin-uglify')

    compileTasks.push('clean', 'rollup')

    grunt.config.merge({
      clean: {
        build: [ 'dist/**' ]
      },

      rollup: {
        umdDevelopment: {
          options: {
            format: 'umd',
            moduleId: 'europa',
            moduleName: 'europa',
            sourceMap: true,
            sourceMapRelativePaths: true,
            plugins: function() {
              return [
                nodeResolve({
                  browser: true,
                  main: true
                }),
                commonjs()
              ]
            }
          },
          files: {
            'dist/europa.js': 'lib/index.js'
          }
        },
        umdProduction: {
          options: {
            format: 'umd',
            moduleId: 'europa',
            moduleName: 'europa',
            sourceMap: true,
            sourceMapRelativePaths: true,
            banner: '/*! Europa v<%= pkg.version %> | (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | MIT License */',
            plugins: function() {
              return [
                nodeResolve({
                  browser: true,
                  main: true
                }),
                commonjs(),
                uglify({
                  output: {
                    comments: function(node, comment) {
                      return comment.type === 'comment2' && /^\!/.test(comment.value)
                    }
                  }
                })
              ]
            }
          },
          files: {
            'dist/europa.min.js': 'lib/index.js'
          }
        }
      }
    })

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-rollup')
  } else {
    grunt.log.writeln('"clean" and "rollup" tasks are disabled because Node.js version is <0.12! Please consider upgrading Node.js...')
  }

  if (semver.satisfies(process.version, '>=4')) {
    buildTasks.unshift('eslint')
    testTasks.unshift('eslint')

    grunt.config.set('eslint', {
      target: [ 'lib/**/*.js' ]
    })

    grunt.loadNpmTasks('grunt-eslint')
  } else {
    grunt.log.writeln('"eslint" task is disabled because Node.js version is <4! Please consider upgrading Node.js...')
  }

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')

  grunt.registerTask('default', [ 'build' ])
  grunt.registerTask('build', buildTasks)
  grunt.registerTask('compile', compileTasks)
  grunt.registerTask('test', testTasks)
}
