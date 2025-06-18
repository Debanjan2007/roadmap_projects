class ApiError extends Error {
    constructor(
        statusCode , message , errs = [] , stack = "" ){
            super(message)
            this.statusCode = statusCode ,
            this.data = null ,
            this.message = message ||  "something went wrong"  ,
            this.success = false ,
            this.errors = errs 

            if(stack){
                this.stack = stack
            }else{
                Error.captureStackTrace(this , this.constructor)
            }
    }
}

module.exports = ApiError ;