
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
	//In environments (e.g. Heroku), and as convention, set the environment variable PORT to tell your web server what port to listen on.
    //process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.


	var PORT = process.env.PORT || 8080;
	
	// BodyParser makes it possible for our server to interpret data sent to it.
	//BP is middleware - software that acts as a bridge between an operating system or database and applications, especially on a network.
	// The code below is provided at https://www.npmjs.com/package/body-parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	//application/vnd.api+json - specification for how a client should request that resources be fetched or modified, and how a server should respond to those requests.
	//is API specific media type. The vendor prefix (vnd.) indicates that it is custom for this vendor. 
	//+ json indicates that it can be parsed as JSON, but the media type should define further semantics on top of JSON.

	

	//application/json just means that the content is JSON. Not useful, it does not define what the JSON values mean.
	
	app.use('/static', express.static(path.join(__dirname, 'app/public')))
			
	
	// ROUTER
	// These route files/routes when users visit or request data from various URLs.
	// ===========================================================================
	
	require("./app/routing/api-route.js")(app);
	require("./app/routing/html-route.js")(app);
	
	
	// LISTENER
	// starts server
	// =================
	
	app.listen(PORT, function() {
	  console.log("App listening on PORT: " + PORT);
	});
