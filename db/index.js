const pgp = require('pg-promise');
const {DB} = require('../config')

module.exports = database => {
    const cn = {
        host: DB.HOST,
        port: DB.PORT,
        database: DB.DATABASE,
        user: DB.USER,
        password: DB.PASSWORD

    }
const db = pgp(cn)
    module.exports = {
        query: (text, params) => pool.query(text, params);
} 

}