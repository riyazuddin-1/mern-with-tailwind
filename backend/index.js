const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors());

const routes = require('./routes');
app.use('/', routes);

app.listen(process.env.PORT,() => {
    console.log(`listening at port ${process.env.PORT}`);
})