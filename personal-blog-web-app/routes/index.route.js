const express = require('express')
const { loginUser } = require('../controller/login.controll.js')


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

module.exports = router ;