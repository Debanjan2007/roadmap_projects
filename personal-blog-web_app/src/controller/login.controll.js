const asyncHandler = require('../utils/asynchandler.js')

const loginhandler = asyncHandler( async (req , res) => {
    console.log("hello");
}) ;

module.exports = loginhandler ;