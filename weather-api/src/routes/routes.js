import {Router} from 'express' ;
import { getWeatherDetail} from '../controller/weather.js'

const router = Router() ;

// get weather details 
router.post('/:LOCATION' ,
    getWeatherDetail 
)

export {
    router 
}