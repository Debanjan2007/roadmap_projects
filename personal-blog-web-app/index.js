const express = require('express')
const path = require('path')

const app = express() ;

// routes import 
const router = require('./routes/index.route.js')

// app parsing 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// conecting static files and markup files 
app.use(express.static(path.join(__dirname , 'public')))
// ejs setup
app.set('view engine', 'ejs')
app.use('/api/v1/blog' , router)

app.listen(6800 , () => {
    console.log("App listening at port 6800");
})