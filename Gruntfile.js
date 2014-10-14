module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean : ['build', 'reports'],
    jasmine : {
      coverage: {
        src : 'src/digest.js',
        options : {
          specs : 'test/spec/*.js',
          helpers: 'spec/helper.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage/coverage.json',
            report: [
              {type:'lcov',options: {dir: 'reports/coverage/lcov/'}},
              {type:'text-summary'}
            ]
          }
        }
      }
    },
    coveralls: {
      options: {
        src: 'reports/coverage/lcov/lcov.info',
        force: false
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/digest.js'],
      options: {
        reporter: require('jshint-stylish'),
        bitwise: true,
        plusplus: true,
        indent: 4,
        maxerr: 50,
        globals: {
          ArrayBuffer: true,
          Uint8Array: true,
          Uint32Array:true,
          DataView: true
        }
      }
    },
    uglify: {
      options: {
        preserveComments: 'some',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
      build: {
        src: 'src/digest.js',
        dest: 'build/digest.min.js'
      }
    },
    release: {
      options: {
        npm: false
      }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-release');

  // Test task(s).
  grunt.registerTask('test', ['jshint', 'jasmine', 'coveralls']);
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

};
