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

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: [ 'dist/*' ],
      test: [ 'tmp' ]
    },

    eslint: {
      target: [ 'src/**/*.js', 'test/**/*.js', 'Gruntfile.js' ]
    },

    nodeunit: {
      test: [ 'test/**/*_test.js' ]
    },

    uglify: {
      all: {
        files: {
          'dist/md.min.js': [ 'src/md.js' ]
        },
        options: {
          banner: `
            /*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | <%= pkg.license %> License
                Make.text v1.5 | (c) 2007 Trevor Jim
             */
          `
        }
      }
    }
  })

  require('grunt-task-loader')(grunt)

  grunt.registerTask('default', [ 'test' ])
  grunt.registerTask('dist', [ 'default', 'clean:dist', 'uglify' ])
  grunt.registerTask('test', [ 'eslint', 'clean:test', 'nodeunit' ])
}