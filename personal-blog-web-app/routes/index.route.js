const express = require('express')
const { loginUser , addPost , dashBoard , myPosts} = require('../controller/login.controll.js')
const verifyJwt = require('../middleware/verifyjwt.js')

const router = express.Router() ;

// routes
router.route('/').get(
    (req , res) => {
        res.render('indexLogin' , {title : 'Login'})
    }
)

router.route('/login').post(
    loginUser
)
router.route('/login').get(
    verifyJwt ,
    dashBoard
)
router.route('/contact').get(
    (req , res) => {
        return res.render('contact' , {title : 'contact'})
    }
)

router.route('/post').get(
    (req , res) => {
        return res.render('blogpost')
    }
)
router.route('/My-posts').get(
    verifyJwt ,
    myPosts
)
router.route('/post/publish').post(
    verifyJwt ,
    addPost
)
module.exports = router ;