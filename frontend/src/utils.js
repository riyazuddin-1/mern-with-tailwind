const config = require('./config.json');

const utilities = {}

utilities.getAuthCredentials = () => {
    return sessionStorage.getItem('Credentials');
}

utilities.setAuthCredentials = (data) => {
    sessionStorage.setItem('Credentials', JSON.stringify(data));
    window.location.reload();
}

utilities.isSignedIn = sessionStorage.getItem('Credentials') ? true : false;

utilities.showMessage = (message) => {
    const msgField = document.getElementById('notify');
    msgField.innerHTML = "&#x2022; " + message;
    setTimeout(()=>{
        msgField.innerHTML = '';
    }, 10000)
}

module.exports = utilities;