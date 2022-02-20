
const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class OrderItems {
    constructor(data = {}) {
        this.orderItemID = data.orderItemID;
        this.orderID = data.orderID;
        this.cartItem = data.cartItemID;

        
    }

    async create(data) {
        
        //Sql
        const statement = pgp.helpers.insert(data, null, 'OrderItems') + 'RETURNING *';

        //Execute   
        const result = db.query(statement);

        if (result) {
            return result
        }

        if (!result) {
            throw new Error('Error Processing Request');
        }

        return null;

    }

    async delete(cartitemID) {
        
        //SQL

        const statement = `DELETE 
                            FROM "CartsItems"
                            WHERE Id = $1`;


        const values = [Id];


        const result = db.query(statement, values);

        if (!result) {
            throw new Error();
        }
        return result;
    }
};