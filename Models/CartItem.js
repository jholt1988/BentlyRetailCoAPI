const db = require('../db');
const pgp = require('pg-promise')({capSQL:true});
const ProductModel = require('../Models/Products');
const moment = require('moment');
const productModelInstance = new ProductModel(); 

module.exports = class CartItemModel {
    constructor(data = {}) {
        this.id = data.id;
        this.productId = data.id;
        this.quantity = data.quantity;
        this.created = moment.utc() || data.created
     }

    static async create(id, productId, quantity, created) {
     
       const data = {id:this.data, product:this.productId, quantity:quantity, created:created}
        //Add Product To Cart
        //SQL
    
        const statement = pgp.helpers.insert( data,  null, 'CartItem') + 'RETURNING *';

        //Execute SQL
        const result = await db.query(statement);

        if (result) {
            return result;
        }

        return null;
        
    }

   static async update(data) {
       const { id, quantity } = data; 

        //SQL Statement
        const condition = pgp.as.format('WHERE id = ${id}', { id });
        const statement = pgp.helpers.update(quantity, 'quantity' , 'CartItems');

        //Execute 
        const result = await db.query(statement, condition);

        

        return result[0];
    }

  static  async delete(id) {
        
        //SQL

        const statement = `DELETE FROM "CartItem"
                            WHERE "id" = $1`;
        const values = [id];

        //Execute 
        
        const result = await db.query(statement, values);

        if (result) {
            return result[0];
        }

        return null;
    }

  static  async getAllCartItems(id) {
        //SQL
      const statement = `SELECT 
                           "Products"."productName", "Products"."price", "CartItems"."quantity"
                         FROM "Products"
                         JOIN
                          "CartItems"
                         ON "Products"."Id"="CartItems"."productId"`;    
    
                                     


        //Execute

        const result = await db.query(statement);

        if (result) {
            return result;
        }
    }


};