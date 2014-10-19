module.exports = function(grunt) {

  browsers = [{
    browserName: 'firefox',
    version: '19',
    platform: 'XP'
  }, {
    browserName: 'chrome',
    version: '30',
    platform: 'XP'
  }, {
    browserName: 'internet explorer',
    version: '10',
    platform: 'Windows 7'
  }];

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
      all:{
        src: 'reports/coverage/lcov/lcov.info',
        options: {
          force: false
        }
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
            'http://127.0.0.1:9999/test/SpecRunner.core.html',
            'http://127.0.0.1:9999/test/SpecRunner.digest.html',
            'http://127.0.0.1:9999/test/SpecRunner.pbkdf.html',
          ],
          tunnelArgs: ['--verbose'],
          browsers: browsers,
          testname: 'digest.js Tests',
          throttled: 3,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-release');

  // Test task(s).
  grunt.registerTask('test', ['jshint', 'jasmine']);
  // Saucelabs taks.
  grunt.registerTask('saucelabs', ['default', 'connect', 'saucelabs-jasmine']);
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

};
