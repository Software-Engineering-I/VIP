module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	/* new route 
	app.set('appPath', 'public');
	app.use(express.static(__dirname + '/public'));

	app.route('/*')
	  .get(function(req, res){
	    res.sendfile(app.get('appPath') + '/index.html');
	});*/

	//old app route
	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
};
