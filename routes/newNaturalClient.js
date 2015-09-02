var NaturalClient = require('../models/naturalClient').NaturalClient;
var mongoose = require('../lib/mongoose');

exports.get = function(req, res) {
	res.render('newNaturalClient');
}

exports.post = function(req, res, next) {
	console.log('POST from new natural client');
	console.log('surname: ' + req.body.surname);
	console.log('name: ' + req.body.name);
	console.log('secondname: ' + req.body.secondname);

	// var client = new mongoose.models.NaturalClient({name:'name', surname:'surname'});
	// client.save(function(err) {
	// 	if (err) next(err);
	// });
	var client = new mongoose.models.NaturalClient({
		name: req.body.name,
		secondname: req.body.secondname,
		surname: req.body.surname
	});

	client.save(function(err) {
		if (err) next(err);

		res.end();
	});

	// var newClient = new NaturalClient();


}