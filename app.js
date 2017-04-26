var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var tunnukset = require('./credentials.js');


var index = require('./routes/index');
var tuotteet = require('./routes/tuotteet');
var tilaus = require('./routes/tilaus');
var yhteystiedot = require('./routes/yhteystiedot');

var app = express();

var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};

//Mongoose ja Mlabiin kytkeytyminen
switch(app.get('env')){
	case 'development':
		mongoose.connect(tunnukset.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(tunnukset.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error('Tuntematon ympäristö: ' + app.get('env'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pääsivun reititys
app.use('/', index);

//Käyttäjäsivun reititys
app.use('/tuotteet', tuotteet);

//Tilaussivun reititys
app.use('/tilaus', tilaus);

//Yhteystietojen reititys
app.use('/yhteystiedot', yhteystiedot);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), function(){
	console.log('Palvelin käynnissä osoitteessa http://localhost:' + 
		app.get('port') + '; paina Ctrl+C sammuttaaksesi palvelimen.');
});
