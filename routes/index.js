var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
	app.get('/', require('./frontpage').get);
	app.get('/login', require('./login').get);
	app.post('/login', require('./login').post);
	app.post('/logout', require('./logout').post);
	app.get('/clients', checkAuth, require('./clients').get);
	app.get('/newclientn', require('./newNaturalClient').get);
	app.post('/newclientn', require('./newNaturalClient').post);
	app.get('/newclientj', require('./newJuridicalClient').get);
};