/**
 * Created by narac on 9/30/2015.
 */
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var path        = require('path');
var config      = require('./config');//contains environment config (DB info, port(s), ect..)
var morgan      = require('morgan');//console logging

/*  Config section
    Using body parser for POST request handling*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.use(express.static(__dirname + '/public'));//direct express to use /public folder for frontend

app.use(morgan('dev'));// log requests to console
mongoose.connect(config.database);

/*-- Routing --*/
var api = require('./app/routes')(app, express);//api routing
app.use('/api', api);//add api routes to our app

/* Catchall route if we haven't defined something specific in node routing
   Let angular/frontend deal with it
   THIS MUST HAPPEN AFTER NODE ROUTES ARE REQUIRED */
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
});


app.listen(config.port);
console.log('http://localhost:8088');
