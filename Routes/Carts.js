
const express = require('express');
const OrderService = require('../Services/OrderService');

const router = express.Router();
const cartService = require('../Services/CartService');
const cartServiceInstance = new cartService();

module.exports = (app, passport) => {
    app.use('/carts', router);

    router.get('/user', async (req, res, next) => {
        const { userID } = req.user;
        
    

        try {
            
        
            //get user cart

            const userCart = await cartServiceInstance.loadCart({ userId: userId });


            if (!userCart) {
                throw new Error('Cart Not Found');
            }

            return res.status(200).send(userCart);

        } catch (err) {
            next(err);
        }
    });

    router.post('/user', async (req, res, next) => {
        const { userID } = req.user
    
        try {
            const newCart = await cartServiceInstance.create({ userId: userId });

            if (!newCart) {
                throw new Error('Error Creating Cart');
            }
            
            return res.status(200).send(newCart);
        } catch (err) {
            next(err);
           
        }
       
    });

    router.put('/user/items', async (req, res, next) => {
        const { userID } = req.user
        
        const item = req.body;
                    
        try {
            
            const updatedCartItem = await cartServiceInstance.addItems(userID, item);

            res.status(200).send(updatedCartItem)
        } catch (err) {
            next(err);
        }
    });


    router.post('/user/checkout',async (req, res, next) => {

        const { userID } = req.user;
        const {customer, cartID } = req.body;
        
        
        console.log(cartID);
        const order = await cartServiceInstance.checkout(cartID, userID, customer );
        console.log(order);
        if (!order) { 
            throw new Error();
        }
        res.status(200).send(order);


        
    })
}; 