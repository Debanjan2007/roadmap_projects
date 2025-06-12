import express from 'express' ;
import { router } from './src/routes/routes.js';
import 'dotenv/config'

const app = express();





app.use(express.json()) ;
app.use(express.urlencoded({extended : true}))
app.use("/weather/v1/api" , router) ;



const port = process.env.PORT 



app.listen(port ,() => {
    console.log("App listening");
})