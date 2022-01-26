const UserModel = require('../Models/User');
const userModelInstance = new UserModel();

module.exports = class  UserService {

    // Create a new user 
    async create(data) {
        try {
            const { username, ...user } = data;
            //Check if user exists
            const existUser = await userModelInstance.findOneByUserId(username);
            //New user variable
            const newUser = await userModelInstance.create({ username: username, user });

            if (existUser) {
                throw new Error('Username already exists')
            }

            return newUser 
            

        } catch (err) {
            throw new Error(err)
    }
}

    async findOneByUserId(userId) {
        try {
            const user = await userModelInstance.findOneById(userId)

            if (user) {
                return user
            }

            if (!user) {
                throw new Error('User Not Found ')
            }


        } catch (err) {
            throw new Error()
        }
    }
 
    async findOneByUsername(username) {
        try {
            const user = await userModelInstance.findOneByUsername(username)

            if (user) {
                return user
            }

            if (!user) {
                throw new Error('User Not Found ')
            }


        } catch (err) {
            throw new Error()
        }
    }
    async updateUser(data) {
        try {
            const updateUser = userModelInstance.Update(data)
            
            if (!updateUser) {
                throw new Error('ERROR! User Not Updated')
            }

            return updateUser

        } catch (err) {
            throw new Error(err)
     }
    }
    
    async delete(userId) {
        try {
            const deleteUser = userModelInstance.delete(userId)

            if (!deleteUser) {
                throw new Error('ERROR! User Not Deleted')
            }

            return deleteUser
        } catch (err) {
            throw new Error(err)
        }
    
    }
}