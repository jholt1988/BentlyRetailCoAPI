const db = require('./index')
async () => {


 
 const createDatabase = `CREATE DATABASE[IF NOT EXISTS]BENTLYRETAILDB;`


const  userStatement =` CREATE TABLE [IF NOT EXISTS] Users (
    id  uuid NOT NULL,
    userName varchar NOT NULL UNIQUE, 
    password password NOT NULL, 
    firstName varchar NOT NULL,
    lastName varchar NOT NULL, 
    email email NOT NULL,
    dateOfBirth date NOT NULL, 
    created datestring NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);`

const productsStatement = `CREATE TABLE [IF NOT EXISTS] Products(
    id integer NOT NULL, 
    productName varchar NOT NULL, 
    description varchar NOT NULL, 
    price decimal NOT NULL,
    quantity integer NOT NULL, 
    created date NOT NULL, 
    modified datestring,
    CONSTRAINT Products_pk PRIMARY KEY (id)
);`

const cartsStatement = `CREATE TABLE [IF NOT EXISTS] Carts(
    id integer NOT NULL, 
    userID uuid NOT NULL,
    created string NOT NULL,
    modified date, 
    status varchar NOT NULL,
    CONSTRAINT Carts_pk PRIMARY KEY (id),
    CONSTRAINT Carts_fk FOREIGN KEY (userID)
        REFERENCES Users.id
);`
    
    try {

        db.connect()
        createDatabase()
    
        await db.query(userStatement)
        await db.query(productsStatement)
        await db.query(cartsStatement)
    }
    catch (err) {
        throw new Error(err)
    }
}
