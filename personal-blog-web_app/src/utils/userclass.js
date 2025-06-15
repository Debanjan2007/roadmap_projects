class UserObj {
    constructor(userName , passWord , role = 'client'){
        this.userName = userName ,
        this.passWord = passWord ,
        this.role = role 
    }
}

module.exports = UserObj ;