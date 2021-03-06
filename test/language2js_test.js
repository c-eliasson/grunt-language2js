'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.language2js = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    default_options_module: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default_options_module.js');
        var expected = grunt.file.read('test/expected/default_options_module.js');
        test.equal(actual, expected, 'should give the module the default module name.');

        test.done();
    },
    custom_options_module: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom_options_module.js');
        var expected = grunt.file.read('test/expected/custom_options_module.js');
        test.equal(actual, expected, 'should give the module the custom module name.');

        test.done();
    },
    ignore_incorrect_filenames: function (test) {
        test.expect(1);
        
        var actual = grunt.file.read('tmp/ignore_incorrect_filenames.js');
        var expected = grunt.file.read('test/expected/empty_module.js');
        test.equal(actual, expected, 'should have ignored the file with incorrect file name and generated an empty module.');
        
        test.done();
    },
    add_one_provider_per_locale: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/add_one_provider_per_locale.js');
        var expected = grunt.file.read('test/expected/two_locales.js');
        test.equal(actual, expected, 'should have created two translationProviders, one for each locale.');

        test.done();
    },
    underscore_locale_separator: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/underscore_as_locale_separator.js');
        var expected = grunt.file.read('test/expected/custom_options_separator_module.js');
        test.equal(actual, expected, 'should accept files with _ used as locale separator.');

        test.done();
    }
};
