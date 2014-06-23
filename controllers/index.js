'use strict';

var CommentModel = require('../models/comment');

module.exports = function (router) {

	var comments = [];

	router.get('/', function (req, res) {
		res.render('index');
	});

	router.get('/comments.json', function (req, res) {
		res.json(comments);
	});

	router.post('/comments.json', function (req, res) {
		comments[comments.length] = new CommentModel({'author': req.body.author, 'text': req.body.text});
		res.json(comments);
	});

};
