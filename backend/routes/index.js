const express = require('express');
const app = express();

const authentication = require('./authentication');

app.use('/auth', authentication);

module.exports = app;