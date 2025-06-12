
class apiError {
    constructor(statusCode , error , msg ){
        this.statusCode = statusCode ,
        this.error = error,
        this.msg = msg 
    }
    success() {
            return {
                statusCode : this.statusCode ,
                error : this.error ,
                msg : this.msg
            }
        }
}

export {
    apiError 
}