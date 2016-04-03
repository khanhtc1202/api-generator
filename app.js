var config   = require('./config');
var mongoose = require('mongoose');
var express = require('express');
var utils = require('./app/lib/utils')(config);

var app = express();
var models = {};

mongoose.connect(config.db, { server: { keepAlive: 1, auto_reconnect: true } });
var conn = mongoose.connection;

// mongoose connection 'error'
conn.on('error', function () {
	console.log('\nMongoose failed to connect:',  config.db);
	mongoose.disconnect();
})

conn.on('open', function () {
  	console.log('\nMongoose connection opened:', config.db);

	models = utils.loadModels(mongoose);

  	require('./config/express')(app, config);
  	require('./config/routes')(app, utils, models);

	app.listen(config.port, function () {
	  console.log('Blog API is listening on port ', config.port);
	});
})

