/*global module:false*/
'use strict';

var opt = require('./options');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      pre: ['www'],
      post: [
          'www/css/one.css',
          'www/css/two.css',
          'www/js/app/utils',
          'www/js/app/views',
          'www/js/lib/Handlebars.js',
          'www/js/lib/hbs.js',
          'www/js/lib/i18nprecompile.js',
          'www/js/lib/jquery.1.8.3.js',
          'www/js/lib/json2.js',
          'www/js/lib/underscore.js',
          'www/js/template'
      ]
    },

    requirejs: {
      compile: {
        options: opt
      }
    },

    mincss: {
      compile: {
        files: {
          'www/css/template.css': ['src/css/one.css','src/css/two.css']
        }
      }
    }
  });

  // Load tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-mincss');

  // Default task.
  grunt.registerTask('default', 'clean:pre requirejs mincss clean:post');

};