# mmotdrpg

Usage:

var login = require('./login');

login.init(<firebase url>);

myForm.on('submit', function(e){
  e.preventDefault();
  login.registerEmailUser(email, password);
});

login.logout();
