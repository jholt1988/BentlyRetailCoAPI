const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authService = require('../Services/AuthService');
const authServiceInstance = new authService();

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, { id });
    });
    
    passport.use('local', new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await authServiceInstance.Login({username:username, password:password });

                return done(null, user);

            } catch (err) {
                done(err);
            }
        })

    );

    return passport  
    
}
