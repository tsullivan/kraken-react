'use strict';


var kraken = require('kraken-js'),
	express = require('express'),
	app = express(),
	options = {
		onconfig: function (config, next) {
			//any config setup/overrides here
			next(null, config);
		}
	},
	port = process.env.PORT || 8000;


app.use(kraken(options));

app.listen(port, function (err) {
	console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
