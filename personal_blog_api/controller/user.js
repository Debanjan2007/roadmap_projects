import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../model/users.model.js';
import { apiError } from '../utils/apiError.js'
import { apiRes } from '../utils/apiRes.js';

const userCreate = asyncHandler(async (req , res) => {
    const {email , userName , password} = req.body ;
    [email , userName , password].some((entity) => {
        if(!entity){
            return res
            .status(404)
            .json(
                new apiError(404 , "some fields are not added!")
            )
        }
    })
    const user = await User.create({
        email ,
        userName,
        password
    })
    if(!user){
        return res
        .status(500)
        .json(
            new apiError(500 , "Database error")
        )
    }
    return res 
    .status(200)
    .json(
        new apiRes(200 , user , "User created successfully")
    )
})

export {
    userCreate
}