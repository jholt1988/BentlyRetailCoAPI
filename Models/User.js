
const { v4: uuid } = require('uuid')
const moment = require('moment')
const { db } = require('../index')
const pgp = require('pg-promise')({capSQL:true})

module.exports = class UserModel {
    constructor(data = {}) {
        this.id = uuid() || data.id;
        this.userName = data.userName;
        this.password = data.password;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.lastName;
        this.DOB = data.DOB;
        this.created = moment.utc().toDateString() || data.created;
    };


    /**
     * Creates a new user record
     * @param {Object} data New User Record Data
     * @returns {Object|Null} Created User Record
     */
    async create(data) {
    //Create a user record using pgp helper SQL injection
        const statement = pgp.helpers.insert(data, null, 'Users')
    
    //Execute SQL query 
        const result = await db.query(statement)

    //Result || Error Handling
        
        if (result) {
        return result
        }

        if (!result) {
           throw new Error('Error Creating User Object')
        }
        
        return null

    };

    /**
     * Find a user record by userId
     * @param {userId} userID 
     * @returns {Object} userRecord
     */
    async findOneById(userID) {
        // SQL Statement To Find User Record Corresponding With user Id Param

        const condition = 'SELECT * FROM users WHERE id = $1'
        const values = [userID]
        const statement = pgp.as.format(condition, values)
        //Execute SQL statement

        const result = await db.query(statement);

        if (result) {
            return result;
        }

        if (!result) {
            throw new Error('User Record Not Found');
        }
    }

    /**
     * 
     * @param {Object} data Fields That are being updated
     * @returns {Object|Null}
     */
    async Update(data) {

        const { userId, ...props } = data;
        //SQL Statement To Update User Record

        const condition = 'WHERE id = userId', [userId];
        const statement = pgp.helpers.update(props, null, 'users');

        //Result

        const result = await db.query(condition, statement)

        if (result) {
            return result
        }

        if (!result) {
            throw new Error('Error Updating User Record')
        }

       
    }

    /**
     * 
     * @param {Object} userName 
     * @returns {Object|Null} user record 
     */

    async findOneByUserId(username) {
        //SQL
        const statement = pgp.as.format('SELECT * FROM users WHERE username = $1')
        const values = [username]

        //Execute SQL

        const result = await db.query(statement, values)

        if (result) {
            return result
        }

        if (!result) {
            throw new Error('User Not Found!')
        }

        return null 
    }

    /**
     * Delete user record
     * @param {userId} userId 
     * @returns {Null}
     */
    async delete(userId) {
        //SQL statement

        const statement = pgp.as.format('DELETE * FROM users WHERE id  = userId', [userId]);

        //Execute User

        const result = db.query(statement);

        if (result) {
            return result;

        }
    
        if (!result) {
            throw new Error('Error deleting user record')
        }


    }
    
}