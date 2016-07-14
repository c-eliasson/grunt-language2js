# grunt-language2js [![npm version](https://badge.fury.io/js/grunt-language2js.svg)](https://badge.fury.io/js/grunt-language2js)

> Grunt plugin for converting .properties language files into an AngularJS module

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-language2js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-language2js');
```

## The "language2js" task

### Overview
In your project's Gruntfile, add a section named `language2js` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  language2js: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.module
Type: `String`
Default value: `'language-properties'`

A string value that is used as the module name for the AngularJS module

### Usage Examples

#### Default Options
In this example, the default options are used to generate an AngularJS module from all `*.properties` files in the solution.

```js
grunt.initConfig({
  language2js: {
    options: {},
    files: {
      'dest/angular-language-module.js': ['**/*.properties'],
    },
  },
});
```

#### Default AngularJS module name
In this example, the generated AngularJS module will get `my-language-module` as its module name.

```js
grunt.initConfig({
  language2js: {
    options: {
        module: "my-language-module"
    },
    files: {
      'dest/angular-language-module.js': ['**/*.properties'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
