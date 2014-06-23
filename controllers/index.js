'use strict';

var CommentModel = require('../models/comment');

module.exports = function (router) {
	var model = [
		new CommentModel({"author": "Pete Hunt", "text": "This is one comment"}),
		new CommentModel({"author": "Jordan Walke", "text": "This is *another* comment"})
	];

	router.get('/', function (req, res) {
		res.render('index');
	});

	router.get('/comments.json', function (req, res) {
		res.json(model);
	});

	router.post('/', function (req, res) {
		res.json({});
	});

};
