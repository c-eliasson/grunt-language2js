/*
 * grunt-language2js
 * https://github.com/c-eliasson/grunt-language2js
 *
 * Copyright (c) 2016 Christofer Eliasson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
            
    var propertiesParser = require('properties-parser');
    var path = require('path');

    var moduleTemplate = 'angular.module("{{module-name}}", [])' +
                            '.config(["$translateProvider", function ($translateProvider) {' +
                                '{{providers}}' +
                            '}]);';

    var providerTemplate = '$translateProvider.translations("{{locale}}", {{strings}} );';

    grunt.registerMultiTask('language2js', 'Grunt plugin for converting .properties language files into an AngularJS module', function () {
        
        var options = this.options({
            module: "language-properties",
            localeSeparator: "."
        });

        var strings = {};
        
        this.files.forEach(function (file) {
            
            file.src.filter(function (filepath) {
                // Ignore files that doesn't exist
                if (!grunt.file.exists(filepath)) {
                    grunt.verbose.writeln("File '" + filepath + "' does not exist and was ignored.");
                    return false;
                // Ignore files that doesn't match name pattern {somename}{localeSeparator}{locale}.properties
                } else if (!validFileName(path.basename(filepath), options.localeSeparator)) {
                    grunt.verbose.writeln("File '" + filepath + "' does not match correct filename pattern and was ignored.");
                    return false;
                } else {
                    return true;
                }             
            }).map(function (filepath) {
                extend(strings, propertiesParser.read(filepath), getLocaleFromFileName(path.basename(filepath), options.localeSeparator));
            });
            
            grunt.file.write(file.dest, createModule(options.module, strings));
            grunt.log.writeln('File "' + file.dest + '" created.');
        });

    });

    /**
     * Is the file name valid - i.e. does it contain a valid locale
     * @param fileName File name of localization file
     * @param localSeparator Character to use as locale separator
     * @returns {boolean} Is file name valid
     */
    function validFileName (fileName, localSeparator) {
        return !!getLocaleFromFileName(fileName, localSeparator);
    }

    /**
     * Get locale from file name
     * @param fileName File name of localization file
     * @param localeSeparator Character to use as locale separator
     * @returns {string} Locale or empty
     */
    function getLocaleFromFileName (fileName, localeSeparator) {
        var parts = fileName
            .replace(".properties", "")
            .split(localeSeparator);

        return (parts && parts.length === 2) ? parts[1] : "";
    }

    /**
     * Utility function to extend an object
     */
    function extend(obj, props, locale) {
        if (!obj[locale]) {
            obj[locale] = {};
        }

        for (var prop in props) {
            if (Object.prototype.hasOwnProperty.call(props, prop)) {
                obj[locale][prop] = props[prop];
            }
        }
    }
    
    function createModule(moduleName, strings) {
        var providers = [];

        for (var language in strings) {
            if (Object.prototype.hasOwnProperty.call(strings, language)) {
                providers.push(
                    providerTemplate
                        .replace("{{locale}}", language)
                        .replace("{{strings}}", JSON.stringify(strings[language])));
            }
        }

        return moduleTemplate
            .replace("{{module-name}}", moduleName)
            .replace("{{providers}}", providers.join(""));
    }
};