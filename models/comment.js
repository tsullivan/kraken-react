'use strict';

module.exports = function CommentModel(options) {
	return {
		author: options.author,
		text: options.text
	};
};
