const db = require('../db');
const pgp = require("pg-promise")({capSQL:true});
const cart_items  = require('./CartItem');
const cartItem = require('./CartItem');
const moment = require('moment'); 
const OrderItems = require('./OrderItems');
module.exports = class Orders {
    constructor(data = {}) {   
        this.status = data.status || "pending";
        this.items = data.items || [];    
        this.created = moment.utc() || data.modified; 
        this.modified =  moment.utc()
        this.userID = data.userID || null;
        this.cartID = data.cartID;


                                                      
    }

    
    
    /**
     * @param {any} data
     */

    async create() {
        try {

            const { order_items, ...order } = this;

            // Generate SQL statement - using helper for dynamic parameter injection
            const statement = pgp.helpers.insert(this, null, 'orders') + ' RETURNING *';

            // Execute SQL statment
            const result = await db.query(statement);

            if (result) {

                // Add new information generated in the database (ie: id) to the Order instance properties
                Object.assign(this, result[0]);

                return result[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * @param {any} userID
     */
    async getUserOrder(userID) {

        //SQL- Get User Order   
        const statement = `SELECT * 
                            FROM orders 
                            WHERE userID = $1`;
        const values = [userID];

        //Execute 
        const result = db.query(statement, values);


        if (!result) {
            throw new Error('Error- Accessing User Cart')
        };
        
        return result;


    

    }

    async updateOrder(data) {
        //SQL STATEMENT
        const { orderID, ...props } = data
        const condition = 'WHERE orderID = ${orderID}';
        const statement = pgp.helpers.update(props, null, 'orders');
        
        //Execute(

        const result = db.query(statement, condition);

        if (!result) {
            throw new Error('Error Updating Order');
        }
      
        return result;
    }


    async addItems(items){
        //SQL

        this.order_items = items.map(item => new OrderItems(item));
    }


    

};

