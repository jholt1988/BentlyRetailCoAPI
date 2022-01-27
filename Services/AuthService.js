const userService = require('./UserService');
const userServiceInstance = new userService();
const userModel = require('../Models/User');
const userModelInstance = new userModel();

module.exports = class AuthService {

    async  Login(data) {
        const { username, password } = data
        try {
            const user = await userModelInstance.findOneByUsername(username);
             
            if (user === null) {
                throw new Error('Username or password is incorrect');
            }

            if (user.password !== password) {
                throw new Error('Username or password is incorrect');
            }

            return user;
        } catch (err) {
            throw new Error(err)
        }

    }

    async Register(data) {
        const { username, password, ...user } = data;

        try{
            //verify that username doesn't already exist

            const existingUser = await userModelInstance.findOneByUsername(username);

            //throw error if user already exists
            console.log(existingUser);

            if(existingUser.username === username) {
                throw  Error('HOLD UP! Username already exists!');
            }

            const createUser = await userModelInstance.create({ username: username, password: password, ...user });

            if (!createUser) {
                throw new Error('User Not Created');
            }

            return createUser
        } catch (err) {
            throw new Error(err)
        }
    }
}