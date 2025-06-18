const jwt = require('jsonwebtoken') 

const verifyJwt = (req , res , next) => {
    const token = req.cookies.auth_token ;
    const payload = jwt.verify(token , process.env.JWT_TOKEN_SECRET)
    if(!payload){
        return res
        .render(('errorpage', {
            title: 'Validation failed',
            statusCode: 404,
            error: null,
            data: "⚠️ Log in for doing any further click the link provided to go the login page ⚠️"
        }));
    }
    req.user = payload ;
    next() ;
}

module.exports = verifyJwt ;