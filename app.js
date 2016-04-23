var login = require('./login');
user = require('./user'); //@todo should not be global

login.init('http://mmotd-login.firebaseio.com');

var loginForm = document.getElementById('login-form');
var signupForm = document.getElementById('signup-form');
var saveDataForm = document.getElementById('save-data-form');
var logoutButton = document.getElementById('logout');

if (logoutButton) {
    logoutButton.addEventListener('click', function(){
        login.logout();
    })
}

if (loginForm) {
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        login.emailLogin(
            document.querySelector("[name=login-email]").value,
            document.querySelector("[name=login-password]").value
        );
    })
}

if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        login.registerEmailUser(
            document.querySelector("[name=signup-email]").value,
            document.querySelector("[name=signup-password]").value
        );
    })
}

if (saveDataForm) {
    saveDataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        login.saveData(
            document.querySelector("[name=data]").value
        );
    })
}