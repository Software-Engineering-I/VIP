// modules =================================================
var express			= require('express');
var app				= express();
var mongoose		= require('mongoose');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var path			= require('path');
var config			= require('./config');
var morgan			= require('morgan')

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));


// connect to our database (hosted on modulus.io)
mongoose.connect(config.database);


var port = process.env.PORT || 3000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
var apiRoutes = require('./app/routes/routes')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port);