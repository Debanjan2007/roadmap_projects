class UserObj {
    constructor(userName , passWord , role , token ){
        this.userName = userName ,
        this.passWord = passWord ,
        this.role = role  || 'client'
    }
}

module.exports = UserObj ;