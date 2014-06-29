'use strict';


module.exports = function jshint(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Options
	return {
		server: [
			'controllers/**/*.js',
			'lib/**/*.js',
			'models/**/*.js'
		],
		client: [
			'public/js/app.js'
		],
		gruntfile: [
			'Gruntfile.js',
			'tasks/*js'
		],
		options: {
			jshintrc: '.jshintrc'
		}
	};
};
