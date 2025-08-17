import { apiRes } from "./apiRes.js";

class apiError extends apiRes {
    constructor(statusCode, message = "Something went wrong"){
        super(statusCode , null , message)
    }
}

export {
    apiError
}