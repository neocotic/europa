module.exports = (grunt) ->

  # Configure
  # ---------

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    clean:
      docs: ['docs/*']
      lib:  ['lib/*']
      dist: ['dist/*']

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
        src:     ['src/**/*.coffee']

    nodeunit:
      all: ['test/**/*_test.coffee']

    uglify:
      all:
        files: 'dist/md.min.js': ['lib/md.js']
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

  grunt.registerTask 'build',   ['clean', 'coffee', 'docco', 'uglify']
  grunt.registerTask 'default', ['build', 'test']
  grunt.registerTask 'test',    ['nodeunit']
