const express = require('express');
const app = express();
const port = 3000;
const expresslayouts = require('express-ejs-layouts');


// use express router
app.use(express.static('./assets'))
app.use(expresslayouts);
app.use('/' , require('./routes'))


// setup the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// extract style and script from sub ejs files
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.listen(port, (err)=>{
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port: ${port}`); //interpolation 
})
