require('@dotenvx/dotenvx').config() // new dotenv '@dotenvx/dotenvx' anybody can go on npm.js and read about it more 

const express = require('express')

const app = express() ;
const port = process.env.PORT ;

app.listen(port , () => {
    console.log(`App is running on port ${port}`);
})