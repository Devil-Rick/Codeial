const express = require('express');
const app = express();
const port = 3000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');



// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// for storing cookie sessions in mongo
const mongoStore = require('connect-mongo')(session);

// for styling the pages
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

// use express router
app.use(express.static('./assets'))
app.use(expresslayouts);

app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

// extract style and script from sub ejs files
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)


// setup the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(session({
    name : "codeial",
    //  change encryption key before deploying
    secret: "anime",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },

    store: new mongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }),

    function (err) { 
        console.log(err);
     }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser);

app.use('/' , require('./routes'))

app.listen(port, (err)=>{
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port: ${port}`); //interpolation 
})
