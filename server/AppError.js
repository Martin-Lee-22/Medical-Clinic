module.exports = class AppError extends Error{
    constructor(errorCode){
        super();
        this.errorCode = errorCode
    }
}