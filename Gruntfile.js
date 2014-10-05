module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean : ['build'],
    jasmine : {
      src : 'src/digest.js',
      options : {
        specs : 'test/spec/*.js',
        helpers: 'spec/helper.js'
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
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/digest.js',
        dest: 'build/digest.min.js'
      }
    },
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },
    'saucelabs-jasmine': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/test/SpecRunner.html',
          ],
          tunnelArgs: ['--debug'],
          browsers: [{
            browserName: 'firefox',
            version: '19',
            platform: 'XP'
          }],
          testname: 'jasmine tests',
          throttled: 3,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
      }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');

  // Test task(s).
  grunt.registerTask('test', ['jshint', 'jasmine']);
  // Saucelabs taks.
  grunt.registerTask('saucelabs', ['default', 'connect', 'saucelabs-jasmine']);
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

};
