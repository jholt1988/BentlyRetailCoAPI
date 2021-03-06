const express = require('express');
const router = express.Router();
const UserService = require('../Services/UserService');
const userServiceInstance = new UserService;

module.exports = (app) => {
    //Router
    app.use('/users', router);

    router.get('/:userId', async (req, res, done) => {
        try {
            const { userId } = req.params
            const user = await userServiceInstance.findOneByUserId(userId);

            if (user) {
               return res.status(200).send(user)
            }

            if (!user) {
                throw new Error('UH OH! User Not Found')
            }

          
        } catch (err) {
            done(err)
        }
    });


    router.put('/:userId', async (req, res, done) => {
        try {
            const { userId } = req.params;
            const { ...user } = req.body;
            
            //Verify and Load User
            const existingUser = await userServiceInstance.findOneByUserId(userId);

            //Update User Record
            const updateUser = await userServiceInstance.updateUser({ userId: userId, ...user })
            
            if (!existingUser) {
                throw new Error('User Not Found')
            }

            if (updateUser) {
              return  res.status(200).send(updateUser)
            }
            
            
        } catch (err) {
            done(err)
        }
    })


}