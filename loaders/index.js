const expressLoader = require('./express')


const swaggerLoader = require('./swagger')

module.exports = async (app) => {
    //Load express middleware
const expressApp = await expressLoader(app)

    //Load swagger middleware
    await swaggerLoader(app)




}