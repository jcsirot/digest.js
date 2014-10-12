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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-release');

  // Test task(s).
  grunt.registerTask('test', ['jshint', 'jasmine']);
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

};
