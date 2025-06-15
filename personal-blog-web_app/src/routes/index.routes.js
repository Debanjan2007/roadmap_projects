const express = require('express') 
const loginhandler = require('../controller/login.controll.js') ;


const router = express.Router() ;

router.route('/login').post(
    loginhandler
)

module.exports = router ;