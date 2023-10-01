const express = require('express');
const app = express();
const port = 3000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');


// use express router
app.use(express.static('./assets'))
app.use(expresslayouts);

app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());


// setup the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// extract style and script from sub ejs files
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.use('/' , require('./routes'))
app.listen(port, (err)=>{
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port: ${port}`); //interpolation 
})
