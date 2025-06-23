const express = require('express')
const { loginUser , addPost , dashBoard , myPosts , delPost , gotoUpdatePage} = require('../controller/login.controll.js')
const verifyJwt = require('../middleware/verifyjwt.js')

const router = express.Router() ;

// routes
// log in page 
router.route('/').get(
    (req , res) => {
        res.render('indexLogin' , {title : 'Login'})
    }
)
// log in a user
router.route('/login').post(
    loginUser
)
// get requests on ligin page for the redirection handler 
router.route('/login').get(
    verifyJwt ,
    dashBoard
)
// to the contact page 
router.route('/contact').get(
    (req , res) => {
        return res.render('contact' , {title : 'contact'})
    }
)

// to see the blog post web page
router.route('/post').get(
    (req , res) => {
        return res.render('blogpost')
    }
)

// to see all posts that arepublished by yourself
router.route('/My-posts').get(
    verifyJwt ,
    myPosts
)
// to publish any blog post
router.route('/post/publish').post(
    verifyJwt ,
    addPost
)

// to delete a post of your own if a user is logged in and is the author of the post
router.route('/post/del/:id').post(
    verifyJwt ,
    delPost
)

// go to the update page of a post
router.route('/post/update/:id').get(
    verifyJwt ,
    gotoUpdatePage
)
module.exports = router ;