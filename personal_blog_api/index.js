import { app } from "./app.js";
import 'dotenv/config'
import { connectDb } from "./db/mongo.db.connect.js";

const PORT = process.env.PORT

connectDb()
    .then(() => {
        app.on('error', () => {
            console.log(console.error);            
        })
        app.listen(PORT, () => {
            console.log(`App is listening at Port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })