var mongoose = require('./lib/mongoose');
mongoose.set('debug', true);
var async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers
], function(err, results) {
	mongoose.disconnect();
});


function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('./models/user');

	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback) {
	var users = [
		{username: 'Ирина', password: 'admin'},
		{username: 'Марина', password: 'userM'},
		{username: 'Надежда', password: 'userN'}
	];

	async.each(users, function(userData, callback) {
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
}