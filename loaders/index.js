const expressLoader = require('./express');
const passportLoader = require('./passport');
const swaggerLoader = require('./swagger');
const routerLoader = require('../Routes');

module.exports = async (app) => {
    //Load express middleware
    const expressApp =  expressLoader(app);

    // Load passport authentication  middleware
    const passport =  await passportLoader(expressApp);

     routerLoader(app, passport)



    //Load swagger middleware
  await  swaggerLoader(app)


    //Error Handling

    app.use((err, req, res, next) => {

        const { errorMessage, status } = err;

         res.status(status | 500).send({ errorMessage });
        
        next(err)

    });
    return app;


}