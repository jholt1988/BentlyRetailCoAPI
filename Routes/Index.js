const userRouter = require('./User');
const authRouter = require('./Auth');
const storeRouter = require('./Store');
const cartRouter = require('./Carts')

module.exports = (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    storeRouter(app);
    cartRouter(app)
  
}