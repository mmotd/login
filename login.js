var Firebase = require('firebase');

var ref = new Firebase('http://mmotd-login.firebaseio.com');

//Grab form values
//createEmailUser();
//If click Google button
//run google register method ref.onAuthWithPopup('Google', function(autData), if(!error){registerUser()}))

function registerUser(ref, authData){
	//Assume ref is the root database
	//Check to see if the user already exists
	ref.child('users').once('value', function(snap){
          if(!snap.child(authData.uid).exists()){
              ref.child('users').child(authData.uid).set({
                  provider: authData.provider || '',
                  name: authData.google.displayName
              });
          };
          //Otherwise the user exists
      });
}

function createEmailUser(ref, email, password) {
  ref.createUser({
    email: email,
    password: password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    }
    else {
	//If no error, we still need to put the created user into our "users" table
      	console.log("Successfully created user account with uid:", userData.uid);
	registerUser(ref, userData);
    }
  });
}
