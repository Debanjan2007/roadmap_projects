const express = require('express')
const { markDown } = require('../controller/index.controller.js') ;

const appRouter = express.Router() ;

appRouter.route('/home').get(
    (req , res) => {
        res.render('shareFile' , {
            title: 'Home'
        });
    }
)

appRouter.route('/markDown').post(
    markDown
)

module.exports = {
    appRouter
}