import { apiError } from "../../utils/apierr.js";
import { asyncHandler } from "../../utils/asynchandler.js";
import { client } from "../db/redis.db.js";
import { apiResponse } from "../../utils/apiresp.js";

const getWeatherDetail = asyncHandler( async (req , res) => {
    if(!req.params){
        return res
        .status(404)
        .json(
            new apiError(404 , { success : false } , "Please tell your location!")
        )
    }
    let { LOCATION } = req.params ;

    // api key & url for the third party weather api 
    const apiKey = process.env.API_KEY ;
    const URL =`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LOCATION.trim()}/today?unitGroup=metric&include=days,current&key=${apiKey}&contentType=json`

    fetch(URL)
    .then(async (event) => {
        const data = await event.json() ;        
        

        await client.set(LOCATION , data) ;
        await client.expire(LOCATION , process.env.REDIS_EXPIY)
        
        console.log(data);


        console.log(clientSet , clientExpirySet);
        
        if(!clientExpirySet && !clientSet){
            return res
            .status(501)
            .json(
                apiError(501 , {success : false} , "something went wrong! in DB")
            )
        }
        

        return res
        .status(200)
        .json(
            apiResponse(200 , data , "Data has been added the the db")
        )
    })
    .catch((err) => {
        return res
        .status(500)
        .json(
            new apiError(500 , err , "Something went , You may entered a wrong location!")
        )
    })

}) ;


export {
    getWeatherDetail
}