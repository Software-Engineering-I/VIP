// modules =================================================
var path			= require('path');
var qs				= require('querystring');
var async			= require('async');
var bcrypt			= require('bcryptjs');
var bodyParser		= require('body-parser');
var colors			= require('colors');
var cors			= require('cors');
var express			= require('express');
var logger			= require('morgan');
var jwt				= require('jwt-simple');
var moment			= require('moment');
var mongoose		= require('mongoose');
var request			= require('request');
var config			= require('./config/config.js');

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err){
  console.log('Error: could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

 //Force HTTPS on Heroku :: example specific, maybe unnecessary
 if(app.get('env') === 'production'){
 	app.use(function(req, res, next){
    var protocol = req.get('x-forward-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  }); 
 }

 app.use(express.static(__dirname + '/public'));

 var reportRoutes = require('./app/routes/reportRoutes')(app, express);
 var apiRoutes = require('./app/routes/apiRoutes')(app, express);
 var authRoutes = require('./app/routes/authRoutes')(app, express);
 app.use('/report', reportRoutes);
 app.use('/api', apiRoutes);
 app.use('/auth', authRoutes);

 app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

 app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
