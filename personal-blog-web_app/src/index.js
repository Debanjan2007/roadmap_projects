const express = require('express') 
const router = require('./routes/index.routes.js')


const app = express() ;
const port = process.env.PORT || 6800 ;


app.use(express.json({extends : false})) ;
app.use("/api/v1/blog", router) ;

app.listen(port , () => {
    console.log("App listeninig on port : ", port);
})