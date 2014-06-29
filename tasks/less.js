'use strict';


module.exports = function less(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-less');

	// Options
	return {
		build: {
			files: [{
				expand: true,
				cwd: 'public/css',
				src: ['app.less'],
				dest: '.build/css/',
				ext: '.css'
			}]
		}
	};
};
