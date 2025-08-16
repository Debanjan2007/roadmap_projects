import mongoose, { mongo } from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type:  String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const User = mongoose.model('User' , UserSchema)
export {
    User
}