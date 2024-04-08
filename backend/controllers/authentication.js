const { getImages } = require('./image_management');
const bcrypt = require('bcryptjs');

// Database connection establishment
const {db, collections } = require('../database');
const collectionName = collections.users;

const authControllers = {};

authControllers.login = async (req, res) => {
    username = req.body.username;
    password = req.body.password;

    // Verifying if the user already exists
    var result = await db.collection(collectionName).findOne({ username: username });
    if(result) {
        // Comparing the password
        bcrypt.compare(password, result.password).then( (matched)=> {
            if(matched) {
                delete result.password;
                res.status(200).json(result).send();
            } else {
                res.status(300).send('password is incorrect');
            }
        })
    } else {
        res.status(300).send(`The id: ${userID} does not exist`);
    }
}

authControllers.register = async (req, res) => {
    password = req.body.password;

    // Hashing the password before storing in the DB
    bcrypt.hash(password, 10).then( async (hash) => {
        const payload = {
            name: req.body.name,
            username: req.body.username, 
            mail: mail.toLowerCase(), 
            password: hash
        };
        // String the user credentials
        await db.collection(collectionName).insertOne(payload);
        delete payload.password;
        res.status(200).json(payload).send();
    })
}

// Controller to checj if the username provided already exists
authControllers.checkUsername = async (req, res) => {
    username = req.body.username;
    var result = await db.collection(collectionName).findOne({ uid: username });
    if(result) {
        res.status(300).send();
    } else {
        res.status(200).send();
    }
}

module.exports = authControllers;