# login

## Quick Guide
`clone <this_repository>`
`npm i`
`serve`

For login.js
    `npm i firebase`
    
For bundling
    `npm i browserify`
    `browserify app.js -o bundle.js`

include "bundle.js" in index.html file

Serve can be used for quickly running a web server (port 8080 necessary for c9)
    `npm i serve`
    `serve -p 8080`

## Usage:

var login = require('./login');

login.init(firebase_url);

myForm.on('submit', function(e){
  e.preventDefault();
  login.registerEmailUser(email, password);
});

login.logout()