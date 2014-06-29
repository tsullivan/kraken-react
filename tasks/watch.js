'use strict';

module.exports = function watch(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Options
	return {
		server: {
			files: [
				'controllers/**/*.js',
				'lib/**/*.js',
				'models/**/*.js'
			],
			tasks: ['jshint:server']
		},
		client: {
			files: ['public/js/app.js'],
			tasks: ['jshint:client', 'browserify']
		},
		styles: {
			files: ['public/css/app.less'],
			tasks: ['less']
		},
		gruntfile: {
			files: ['Gruntfile.js', 'tasks/*js', '!lib/dontwatch.js'],
			tasks: ['jshint:gruntfile']
		},
		templates: {
			files: ['public/templates'],
			tasks: ['i18n']
		}
	};
};

