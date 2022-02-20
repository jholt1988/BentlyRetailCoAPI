const express = require('express');
const router = express.Router();
const AuthService = require('../Services/AuthService');
const authServiceInstance = new AuthService();
 

module.exports = (app, passport) => {
    //Create Router
    app.use('/auth', router);

    router.post('/register', async (req, res, done) => {
        try {
            const { username, password, ...userProps } = req.body;

            const user = await  authServiceInstance.Register({ username: username, password: password, ...userProps });

              return  res.status(200).send(user)
            
        
        } catch (err) {
            done(err);
        }
    });

    router.post('/login', passport.authenticate('local' ), async (req, res, done) => {
        try {
            const { username, password } = req.body;

            const user = await authServiceInstance.Login({ username: username, password: password });

           return  res.status(200).send(user)
           
        
        
        } catch (err) {
            done(err);
        }
    })
}