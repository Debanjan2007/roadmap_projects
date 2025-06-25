import { apiError } from "../../utils/apierr.js";
import { asyncHandler } from "../../utils/asynchandler.js";
import { client } from "../db/redis.db.js";
import { apiResponse } from "../../utils/apiresp.js";
import weatherResponse from "../../utils/weatherResponse.class.js";


const getWeatherDetail = asyncHandler( async (req , res) => {
    if(!req.params){
        return res
        .status(404)
        .json(
            new apiError(404 , { success : false } , "Please tell your location!")
        )
    }
    const { LOCATION } = req.params ;

    console.log(LOCATION);
    
    const cacheData = await client.get(LOCATION) ;
    console.log(cacheData);
    
    if(cacheData){
        return res 
        .status(200)
        .json(
            new apiResponse(200 , cacheData , "Data has been added the the db")
        )
    }
    // api key & url for the third party weather api 
    const apiKey = process.env.API_KEY ;
    const URL =`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LOCATION.trim()}/today?unitGroup=metric&include=days,current&key=${apiKey}&contentType=json`

    fetch(URL)
    .then(async (event) => {
        const data = await event.json() ;        
        const weatherData = new weatherResponse(
            data.resolvedAddress ,
            data.days[0].datetime ,
            data.days[0] ,
            data.currentConditions ,
        )

        await client.set(LOCATION , JSON.stringify(weatherData , null , 2)) ;
        await client.expire(LOCATION , parseInt(process.env.REDIS_EXPIY))
        

        return res
        .status(200)
        .json(
            new apiResponse(200 , weatherData , "Data has been added the the db")
        )
    })
    .catch((err) => {
        console.log(err);
        
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