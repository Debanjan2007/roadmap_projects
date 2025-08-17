import express from "express";
import { router } from "./routes/index.routes.js"
const app = express() ;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/v1',router)

export {
    app
}