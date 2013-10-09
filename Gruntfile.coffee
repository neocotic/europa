module.exports = (grunt) ->

  # Configuration
  # -------------

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    clean:
      lib:  [ 'lib/*' ]
      dist: [ 'dist/*', 'docs/*' ]
      test: [ 'tmp' ]

    coffee:
      all:
        expand: yes
        cwd:    'src'
        src:    '**/*.coffee'
        dest:   'lib'
        ext:    '.js'

    docco:
      all:
        options: output: 'docs'
        src:     [ 'src/**/*.coffee' ]

    nodeunit:
      all: [ 'test/**/*_test.coffee' ]

    uglify:
      all:
        files: 'dist/md.min.js': [ 'lib/md.js' ]
        options:
            banner: """
              /*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | <%= pkg.licenses[0].type %> License
                  Make.text v1.5 | (c) 2007 Trevor Jim
              */ 
            """

  # Tasks
  # -----

  for dependency of grunt.config.data.pkg.devDependencies when ~dependency.indexOf 'grunt-'
    grunt.loadNpmTasks dependency

  grunt.registerTask 'build',   [ 'clean:lib', 'coffee' ]
  grunt.registerTask 'default', [ 'build', 'test' ]
  grunt.registerTask 'dist',    [ 'default', 'clean:dist', 'docco', 'uglify' ]
  grunt.registerTask 'test',    [ 'clean:test', 'nodeunit' ]
