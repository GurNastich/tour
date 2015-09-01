var express = require('express');
var http = require('http');
var path = require('path');
var HttpError = require('./error').HttpError;
var config = require('./config');
var mongoose = require('./lib/mongoose');

//app
var app = express();

//rendering
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

//app port
app.set('port', config.get('port'));

app.use(express.favicon(path.join(__dirname, 'public','images','favicon.ico'))); //favicon.ico

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(express.bodyParser());  //req.body
app.use(express.cookieParser());  //req.cookies

var MongoStore = require('connect-mongo')(express);

app.use(express.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongoose_connection: mongoose.connection})
})); 

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));
require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

//errors handling
app.use(function(err, req, res, next){
    if (typeof err == 'number'){
        err = new HttpError(err);
    }

    if (err instanceof HttpError){
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development'){
        var errorHandler = express.errorHandler();
        errorHandler(err,req,res,next);
    }else{
        log.error(err);
        err = new HttpError(500);
        res.sendHttpError(err);
        }
    }
});

module.exports = app;