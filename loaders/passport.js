const passport = require('passport'),
        LocalStrategy = require('passport-local') ;
const UserModel = require('../Models/User');


module.exports = async (app) => {
   //initialize passport and passport session 
    app.use(passport.initialize());
    app.use(passport.session());
    
   
    //serialize user to session
    passport.serializeUser(function (user, done) {
    
        done(null, user.id)
    })

    //deserialize user from session

    passport.deserializeUser(function (id, done){
        done(null, {id})
    })


    //user authentication

    passport.use(new LocalStrategy(function (username, password, done) {
        
        
    }

    ))
}