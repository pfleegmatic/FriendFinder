
// DEPENDENCIES
// ==============================================================================
	
	var express = require("express");
	var bodyParser = require("body-parser");
	var path = require("path");
	
	
	//  express server configuration
	// ==============================================================================
	
	// Tells node that we are creating an "express" server
	var app = express();
	
	// Sets an initial port. use later in our listener
	var PORT = process.env.PORT || 8080;
	
	// BodyParser makes it possible for our server to interpret data sent to it.
	// The code below is pretty standard.
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));
	
	app.use('/static', express.static(path.join(__dirname, 'app/public')))
			
	
	// ROUTER
	// These route files/routes when users visit or request data from various URLs.
	// ===========================================================================
	
	require("./app/routing/api-routes.js")(app);
	require("./app/routing/html-routes.js")(app);
	
	
	// LISTENER
	// starts server
	// =================
	
	app.listen(PORT, function() {
	  console.log("App listening on PORT: " + PORT);
	});
