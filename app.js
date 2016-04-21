var login = require('./login');

login.init('http://mmotd-login.firebaseio.com');

var loginForm = document.getElementById('login-form'); console.log(loginForm);
var signupForm = document.getElementById('signup-form');
var loginButton = document.getElementById('login-button');
var signupButton = document.getElementById('signup-button');

document.getElementById('logout').addEventListener('click', function(){
    login.logout();
})

loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    login.emailLogin(
        document.querySelector("[name=login-email]").value,
        document.querySelector("[name=login-password]").value
    );
})

signupForm.addEventListener('submit', function(e){
    e.preventDefault();
    login.registerEmailUser(
        document.querySelector("[name=signup-email]").value,
        document.querySelector("[name=signup-password]").value
    );
})