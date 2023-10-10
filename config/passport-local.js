const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const User = require('../model/user');

// authentication using passport
passport.use(new localStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        // finding user and establish the identity
        console.log(email);

        User.findOne({email:email})
        .then((user)=>{
            console.log(user);
            if(!user || user.password != password){
                console.log('User Not Found');
                return done(null, false);
            }

            return done(null, user)
        }).catch((err)=>{
            console.log('Eroor in passport');
                return done(err);
        })
    }   
))


// serialising the user to decide which key to be kept for cookies
passport.serializeUser((user, done)=>{
    done(null, user.id)
})


// deserialising the user from the key in the cookies
passport.deserializeUser((id, done)=>{

    User.findById(id)
    .then((user)=>{
        return done(null, user);
    })
    .catch((err)=>{
        console.log('Eroor in passport');
        return done(err);
    })
})


passport.checkAuthentication = (req, res, next)=>{
    // if the user is authenticated
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not Authenticated
    return res.redirect(('/users/sign-in'));

};

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;