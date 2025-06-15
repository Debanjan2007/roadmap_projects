const asyncHandler = require('../utils/asynchandler.js')
const ApiResponse = require('../utils/apiresponse.js')
const ApiError = require('../utils/apierror.js')

const fs = require('fs') ;
const UserObj = require('../utils/userclass.js') ;

function ifUserExist(userName , userArr){
    userArr.forEach(user => {
        if(user.userName === userName){
            return res
            .status(200)
            .json(
                new ApiResponse(200 , user , `${userName} log in sucessfully`)
            )
        }
    return 0 ;
    });
}


const loginhandler = asyncHandler( async (req , res) => {
    try {
        const {userName , password} = req.body ;
        if([userName , password].some(field => field.trim() === "" )){
            return res
            .status(401)
            .json(
                new ApiError(401 , "please enter the fields!")
            )
        }
        if(!fs.existsSync('users.json')){
            let user = null ; 
            if(userName == 'Deba_13' && password == 'Deba@13_07'){
                user = [
                new UserObj(userName , password , 'admin')
            ]
        }else{
            user = [
                new UserObj(userName , password )
            ]
        }
            fs.writeFileSync('users.json' , JSON.stringify(user , null , 2))
            return res
            .status(200)
            .json(
                new ApiResponse(200 , user , `${userName} log in sucessfully`)
            )
        }
        const users = JSON.parse(fs.readFileSync('users.json' , 'utf-8' , (error) => {
            if(error){
                return res 
                .status(500)
                .json(
                    new ApiError(500 , 'Something went wrong while reading the users!')
                )
            }
        }))
        ifUserExist(userName , users) ;
        let user = null ;
        if(userName == 'Deba_13' && password == 'Deba@13_07'){
            user = new UserObj(userName , password , 'admin')
        }
        else{
            user = new UserObj(userName , password )
        }
        console.log(typeof users);
        users.push(user) ;
        fs.writeFileSync('users.json' , JSON.stringify(users , null , 2))
        return res
        .status(200)
        .json(
            new ApiResponse(200 , user , `${userName} log in sucessfully`)
        )
        
    } catch (error) {
        return res
        .status(500)
        .json(
            new ApiError(500 , 'something went wrong in login!')
        )
    }

}) ;

module.exports = loginhandler ;