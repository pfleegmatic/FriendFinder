var friends = require('../data/friends.js');
	
	module.exports = function(app){
	
	  // API GET (read)
	  app.get('/api/friends', function(req, res){
	    res.json(friends);
	  });
	
	
	  // POST (create) user submits a form and it submits data to the server.
	  app.post('/api/friends', function(req, res){
	
	  // "server" to respond to a user survey results
	    // Compares those results against every user in the database.
	    // Calculate the difference between each of the numbers and the user"s numbers.
	    // Choose the user with the least differences as the "best friend match."
	    // It will push the user to the database after.
	
	    // Use object to hold the "best match". update it as it loops through all of the options
	    var bestMatch = {
	      name: "",
	      photo: "",
	      friendDifference: 1000
	    };
	
	    // Take the result of the user survey POST and parse it.
	    var userData = req.body;
	    var userScores = userData.scores;
	
	    // calculate the difference between the user's scores and scores of each user in the database
	    var totalDifference = 0;
	
	    // Loop through all the friend possibilities in the database.
	    for (var i = 0; i < friends.length; i++) {
	
	      console.log(friends[i].name);
	      totalDifference = 0;
	
	      // Loop through all the scores of each friend
	      for (var j = 0; j < friends[i].scores[j]; j++) {
	
	        // Calculate difference between the scores and sum them into the totalDifference
	        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
	
	        // If the sum of differences is less then the differences of the current "best match"
	        if (totalDifference <= bestMatch.friendDifference) {
	
	          // Reset the bestMatch to be the new friend.
	          bestMatch.name = friends[i].name;
	          bestMatch.photo = friends[i].photo;
	          bestMatch.friendDifference = totalDifference;
	        }
	      }
	    }
	
	    // save user's data to the database (happens AFTER the check. otherwise,
	    // or database will always return that the user is the user's best friend).
	    friends.push(userData);
	
	    // Return a JSON with the user's bestMatch. Used by the HTML in next page
	    res.json(bestMatch);
	
	  });
	
	};
