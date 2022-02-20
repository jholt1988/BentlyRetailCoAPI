const db = require('../db');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const pgp = require('pg-promise')({capSQL:true});

module.exports = class CartModel {
    constructor(data = {}) {
        this.id = uuidv4() || data.id;
        this.userId = data.userId;
        this.status = data.status;
        this.created = data.created || moment.utc();
        this.modified = moment.utc();
    }

    /**
     * Create User Cart Object
     * @param {Object} data [user data] 
     * @returns {Object| null } user record
     */
    async create( data ) {
       
        try {
            const {id, userId,...props} = data
            //Sql
            const statement = pgp.helpers.insert({id:uuidv4(), userId:this.userId, created:this.created,...props}, null, 'Carts') + 'RETURNING *';
           
            //Execute
            const result = await db.query(statement);
                
            if (!result) {
                throw new Error('Error Creating Cart ')
            }
                return result;

            

        } catch(err) {
            throw new Error(err);
        }

    }
     async loadCartByUser(userID) {
        
        try {
            const statement = `SELECT * 
                               FROM "Carts"
                             WHERE "userId" = $1 AND "status" = $2`;
            const values = [userID, 'active'];
                console.log(userID)
            //execute
            
            const result = await db.query(statement, values);
            ;
            if (result) {
                return result[0];
            }
            return null;
        } catch (err) {
            throw new Error(err);
        }

    }
    async loadCartByCartID(data) {
        const { cartId } = data;
        try {
            const statement = `SELECT *
                        FROM carts
                        WHERE "cartID" = $1`;
            const values = [cartID];

            const result = await db.query(statement, values);

            if (result) {
                return result[0];
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

         async delete(cartId) {
        //SQL
        const statement = `DELETE FROM carts
                            WHERE "cartId" = $1`;
        const values = [cartId];

        //Execute

        const result = await db.query(statement, values);

        if (result) {
            return result;
        }

        return null;
    }

    
};