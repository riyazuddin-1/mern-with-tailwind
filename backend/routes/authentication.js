const express = require('express');
const app = express();

const controllers = require('../controllers').auth;

app.post('/login', controllers.login);

app.post('/register', controllers.register);

app.post('/check-username', controllers.checkUsername);

module.exports = app;