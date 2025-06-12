class apiResponse {
    constructor(statusCode , data , msg ){
        this.statusCode = statusCode ,
        this.data = data,
        this.msg = msg 
    }
    success() {
            return {
                statusCode : this.statusCode ,
                data : this.data ,
                msg : this.msg
            }
        }
}

export {
    apiResponse
}