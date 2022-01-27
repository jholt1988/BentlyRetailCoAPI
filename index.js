const express = require("express");
const app  = express();
const { PORT } = require('./config');
const loaders = require('./loaders')




const startServer = () => {
    
    //Load Middleware
    loaders(app)

   //Server listening on Port
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)
})
}

startServer();