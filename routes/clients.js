var NaturalClient = require('../models/naturalClient').NaturalClient;

exports.get = function(req, res, next) {
	NaturalClient.find({}, function(err, clients) {
		req.clients = res.locals.clients = null;

	 	if (err) return next(err);
	 	req.clients = res.locals.clients = clients;
	 	res.render('clients');
	});


}

