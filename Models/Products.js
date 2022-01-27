const pgp = require('pg-promise')({capSQL:true});
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

module.exports = class ProductsModel {
    constructor(data = {}) {
        this.id = uuidv4() || data.id;
        this.productName = data.productName;
        this.description = data.description;
        this.price = data.price;
        this.categoryId = data.categoryId;
        this.vendorId = data.vendorId;
        this.quantity = data.quantity;

    }

     /**
      * Create a new Product Record
      * @param {object} data 
      * @returns {object|Null} Created Product Record
      */
    async create(data) {
        try {
            const { id, productName, ...props } = data;

            //SQL Statement

            const statement = pgp.helpers.insert({ id:uuidv4(), productName, ...props }, null, 'Products');

            // Execute Statement

            const result = db.query(statement);

        
                return result;
            

        
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Update A Product Record
     * @param {Object} data Changes/Updates Product Records
     * @returns {Object|Null} Updated Product 
     */
    async update(data) {
        try{
            const { id, ...props } = data;

            //SQL
            const condition = pgp.as.format("WHERE id = id", { id });
            const statement = pgp.helpers.update(props, null, 'Products');

            //Execute

            const result = db.query(statement, condition);

            
                return result[0]
            
            
        } catch (err) {
            throw new Error(err)
        }
    }
    /**
     * Find one product record by productName
     * @param {Object} productName 
     * @returns {Object|Null} Product Record That Cooresponds With productName
     */
    async getOne(productName) {
        try {
            //SQL
            const statement = pgp.as.format('SELECT * FROM "Products" WHERE "productName" = $1 ');
            const values = [productName]

            //Execute

         const result = await db.query(statement, values);

         
            if (result) {
                return result[0];
            }  
            
            return null;
        } catch (err) {
            throw new Error(err);
        }

    }
    /**
     * Get Complete List Of Products 
     *@returns {Array} Returns All Products 
     */
    async getAll() {
        try {
            //SQL
            const statement = pgp.as.format('SELECT * FROM "Products"');

            //Execute 
            const result = await db.query(statement);

            if (result) {
                return result
            }
            
        } catch (err) {
            throw new Error(err)
        }
                
    }

    async createVendor(data) {
        try {
            const{id,...vendor} = data
            //SQL
            const statement = pgp.helpers.insert({id:uuidv4(), ...vendor}, null, 'Vendors');

            //Execute
            const result = await db.query(statement);

            if (result) {
                return result[0];
            }
            return null;
        } catch (err) {
            throw new Error(err);
        }
    }
    async getOneVendor(vendorName) {
        try {
            //SQL
            const statement = pgp.as.format('SELECT * FROM "Vendors" WHERE "vendorName" = $1 ');
            const values = [vendorName]

            //Execute

            const result = db.query(statement, values);


        
                return result[0];
            

        
        } catch (err) {
            throw new Error(err);
        }

    }
}