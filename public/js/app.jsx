/**
 * @jsx React.DOM
 */

/* globals document: true */

/* app code below this line */
'use strict';

var React = require('react'),
	$ = require('jquery-browserify');

var Comment = React.createClass({
	render: function () {
		return (
			<div className='comment'>
				<blockquote>
					<p>
						{this.props.children}
					</p>
					<footer>
						{this.props.author}
					</footer>
				</blockquote>
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function () {
		var commentNodes = this.props.data.map(function (comment) {
			return <Comment author={comment.author}>{comment.text}</Comment>;
		});

		return (
			<div className='commentList'>
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();

		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		var csrf = $('body').data('csrf');

		if (!text || !author) {
			return false;
		}

		this.props.onCommentSubmit({author: author, text: text, _csrf: csrf});
		this.refs.text.getDOMNode().value = '';
		this.refs.text.getDOMNode().focus();
	},

	render: function () {
		return (
			<form className='commentForm' onSubmit={this.handleSubmit} role='form'>
				<fieldset>
					<legend>Add a comment</legend>
					<p>
						<label htmlFor='commentFormName'>Your name</label>
						<input type='text' id='commentFormName' ref='author' />
					</p>

					<p>
						<label htmlFor='commentFormText'>Say something...</label>
						<input type='text' id='commentFormText' ref='text' />
					</p>

					<p>
						<input type='submit' value='Post' />
					</p>
				</fieldset>
			</form>
		);
	}
});

var CommentBox = React.createClass({
	loadCommentsFromServer: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function (data) {
				this.setState({data: data});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	handleCommentSubmit: function (comment) {
		var comments = this.state.data;
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function (data) {
				this.setState({data: data});
			}.bind(this),
			error: function (err, status) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function () {
		return {data: []};
	},

	componentWillMount: function () {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},

	render: function() {
		return (
			<div className='commentBox'>
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

React.renderComponent(
	<CommentBox url='comments.json' pollInterval={2000} />,
	document.getElementById('content')
);

