const getRandomString = require('./randoToken.js');
const randNo = getRandomString(64) ;
class UserObj {
    constructor(userName , passWord , role ){
        this.userName = userName ,
        this.passWord = passWord ,
        this.token = randNo , 
        this.role = role  || 'client' 
    }
}

module.exports = UserObj ;