const expressLoader = require('./express')
const passportLoader = require('./passport')
const swaggerLoader = require('./swagger')

module.exports = async (app) => {
    //Load express middleware
    const expressApp = await expressLoader(app);

    const passport = await passportLoader(expressApp)


    //Load swagger middleware
    await swaggerLoader(app)


    //Error Handling

    app.use((err, req, res, next) => {

        const { errorMessage, status } = err;

        return res.status(status | 500).send({ errorMessage });
        

    });
    return app;


}