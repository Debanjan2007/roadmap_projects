require('@dotenvx/dotenvx').config() // new dotenv '@dotenvx/dotenvx' anybody can go on npm.js and read about it more 

const express = require('express')
const path = require('path')
const { appRouter } = require('./routes/app.routes.js')

const app = express() ;
const port = process.env.PORT ;




// express middlewares and ejs and static files
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.set('view engine', 'ejs') 
app.use(express.static(path.join(__dirname , 'public')))


// app routing 
app.use('/api/v1/note' , appRouter);

// app running in port 
app.listen(port , () => {
    console.log(`App is running on port ${port}`);
})