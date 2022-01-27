const userRouter = require('./User');
const authRouter = require('./Auth');
const storeRouter = require('./Store')

module.exports = (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    storeRouter(app);
  
}