class apiRes{
    constructor(statusCode , data = null , message){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message
    }
}

export {
    apiRes
}