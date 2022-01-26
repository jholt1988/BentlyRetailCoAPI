const dotenv = require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DB: {
        HOST: process.env.DBHOST,
        PORT: process.env.DBPORT,
        DATABASE: process.env.DBDATABASE, 
        USER: process.env.DBUSER,
        PASSWORD: process.env.DBPASSWORD
    }
}