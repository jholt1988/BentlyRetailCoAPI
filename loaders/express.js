const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const SESSION_SECRET = require('../config')


module.exports = (app) => {

    //Cross-Origin Resource Sharing To All Origins By Default

    app.use(cors());

    //Parses strings into JSON objects

    app.use(bodyParser.json());

    //Parses URL Encoded bodies

    app.use(bodyParser.urlencoded({ extended: true }))
    
    //Create Session

    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }
    }))
    return app
}