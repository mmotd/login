var Firebase = require('firebase');

  var ref;
  var uid; //@todo should be separate user class
  
  function init(url, handler){
    ref = new Firebase(url);
    
    var authHandler = handler || function(authData) {
      if (authData) {
        console.log("Authenticated with uid:", authData.uid);
        
        //Will want to pull the username from the "users" table at this point, given the uid
        var user = '';
        ref.child('users/' + authData.uid).once('value', function(snapshot){
          user = snapshot.val();
        });
        console.log('username: ' + user.username || 'nothing');

        uid = authData.uid; //@todo
        window.user.setId(authData.uid); //@todo
        
      } else {
        console.log("Client unauthenticated.")
        uid = false; //@todo
        window.user.setId('please sign in'); //@todo
      }
    }
    
    //Event listener for changes in authentication
    //authHandler should be passed into this library for custom handling
    ref.onAuth(authHandler);
  }

  function saveData(data) {
    ref.child('data').push({
      user_id: uid,
      data: data
    });
  }
  
  /**
   * Create new user if user doesn't exist 
   */
  function saveUser(authData, username){
    
    /*
    if(authData.provider){ 
      provider = authData.provider;
      username = authData.provider.displayName;
    }
    else { 
      //provider = '';
      //username = authData.password.email;
    };
    */
    
  	//Get user table
  	ref.child('users').once('value', function(snapshot){
      //If user doesn't exist
      if(!snapshot.child(authData.uid).exists()){
        //Create new user
        ref.child('users').child(authData.uid).set({
          username: username
        });
      };
    });
  }
  
  function handleRegister(error, authData){
    if (error) {
        console.log("Error creating user:", error);
        //Flash error
      }
      else {
        console.log("Successfully created user account with uid:", authData.uid);
      }
  }
  
  function handleLogin(error, authData){
    if (error) {
        console.log("Error logging in user:", error);
        //Flash an error
      }
      else {
        console.log("Successfully logged in user:", authData);
        //Let the auth monitor handle whatever happens...
      }
  }
  
  function registerOauthUser(provider){
    ref.authWithOAuthPopup(provider, handleRegister)
  }
  
  function registerEmailUser(email, password){
    //This does not authenticate the user... ref.authWithPassword() must be called after.
    ref.createUser({ email: email, password: password }, function(error, authData){
      if (!error){
        emailLogin(email, password);
        saveUser(authData, email.replace(/@.*/, ''));
      }
      else {
        console.log("Error from ref.createUser in login.registerEmailUser:", error);
      }
    });
    //If no error, we still need to put the created user into our "users" table
    
  }
  
  function oauthLogin(provider){ 
    ref.authWithOAuthPopup(provider, handleLogin);
  }
  
  function emailLogin(email, password){
    ref.authWithPassword({ email: email, password: password }, handleLogin);
  }
  
  function logout(){
    ref.unauth();
  }

exports.init = init;
exports.registerEmailUser = registerEmailUser;
exports.emailLogin = emailLogin;
exports.logout = logout;
exports.saveData = saveData;
