const userRouter = require('./User');


module.exports = (app, passport) => {
    userRouter(app)
    
}