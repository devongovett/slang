// package metadata file for Meteor.js
'use strict';

var packageName = 'devongovett:slang';
var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  version: packageJson.version,
  // Brief, one-line summary of the package.
  summary: 'Slang.js: A collection of utility functions for working with strings in JavaScript in the browser or Node.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/andyp22/slang',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('slang.min.js');
  api.addFiles('meteor/export.js');
  api.export("slang");
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('devongovett:slang');
  api.addFiles('meteor/slang-tests.js');
});
