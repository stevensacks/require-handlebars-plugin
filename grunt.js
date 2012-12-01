/*global module:false*/
'use strict';
var opt = require('./options');
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    clean: {
      pre: ['www'],
      post: [
          'www/css',
          'www/js/app',
          'www/js/lib/Backbone.js',
          'www/js/lib/Handlebars.js',
          'www/js/lib/hbs.js',
          'www/js/lib/i18nprecompile.js',
          'www/js/lib/jquery.1.8.3.js',
          'www/js/lib/json2.js',
          'www/js/lib/underscore.js',
          'www/js/template'
      ]
    },
    mincss: {
      compile: {
        files: {
          'www/css/template.css': 'src/css/*'
        }
      }
    },
    requirejs: {
      compile: {
        options: opt
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('default', 'clean:pre requirejs clean:post mincss');
};