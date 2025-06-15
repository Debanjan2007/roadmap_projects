const asyncHandler = require('../utils/asynchandler.js')
const ApiResponse = require('../utils/apiresponse.js')
const ApiError = require('../utils/apierror.js')

const fs = require('fs') ;
const UserObj = require('../utils/userclass.js') ;

const loginhandler = asyncHandler( async (req , res) => {
    const {userName , password} = req.body ;
    if([userName , password].some(field => field.trim() === "" )){
        return res
        .status(401)
        .json(
            new ApiError(401 , "please enter the fields!")
        )
    }
    const user = new UserObj(userName , password) ;
    if(fs.existsSync())
    if(userName === 'Deba_13' && password === 'Deba@13_07'){
        user.role = 'admin' ; 
    }
    console.log(user);
    
}) ;

module.exports = loginhandler ;