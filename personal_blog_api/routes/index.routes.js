import express from 'express' 
import multer from 'multer'
import { userCreate } from '../controller/user.js';

const router = express.Router() 
const uploader = multer() ;

router.route('/user')
.post(
    uploader.none(),
    userCreate
)

export {
    router
}