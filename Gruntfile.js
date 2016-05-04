/*
 * grunt-language2js
 * https://github.com/c-eliasson/grunt-language2js
 *
 * Copyright (c) 2016 Christofer Eliasson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
            'Gruntfile.js',
            'tasks/*.js',
            '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        language2js: {
            default_options_module: {
                options: { },
                files: { 'tmp/default_options_module.js': ['test/fixtures/one_line.en.properties'] }
            },
            custom_options_module: {
                options: {
                    module: "custom-module-name"
                },
                files: { 'tmp/custom_options_module.js': ['test/fixtures/one_line.en.properties'] }
            },
            ignore_incorrect_filenames: {
                files: { 'tmp/ignore_incorrect_filenames.js': ['test/fixtures/no_locale.properties'] }
            },
            add_one_provider_per_locale: {
                files: { 'tmp/add_one_provider_per_locale.js': ['test/fixtures/one_line.en.properties', 'test/fixtures/one_line.de.properties'] }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'language2js', 'nodeunit']);
    
    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
