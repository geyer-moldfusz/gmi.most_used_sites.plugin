module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine_firefoxaddon: {
      helpers: [],
      tests: ["spec/**/*Spec.js"],
      resources: []
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-firefoxaddon');
};
