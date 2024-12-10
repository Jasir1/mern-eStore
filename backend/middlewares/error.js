const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV == 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV == 'production') {
        let message = err.message;
        let error = new Error(message);

        if(err.name == "ValidationError"){
            message = Object.values(err.errors).map(value => value.message)
            // error = new ErrorHandler(message,400)
            error = new Error(message)
            err.statusCode = 400
        }
        //cast error not working\/\/\/\/
        if(err.name == "CastError"){
            message = `Resource not found: ${err.path}`
            // error = new ErrorHandler(message,400)
            error = new Error(message)
            err.statusCode = 400
        }
        //duplicate database data entry error
        if(err.code == 11000){
            message = `Duplicate ${Object.keys(err.keyValue)} error`
            // error = new ErrorHandler(message,400)
            error = new Error(message)
            err.statusCode = 400
        }
        //JSONWebTokenError error
        if(err.name == 'JSONWebTokenError'){
            message = `JSON Web Token is invalid. Try again`
            // error = new ErrorHandler(message,400)
            error = new Error(message)
            err.statusCode = 400
        }
        //JSONWebTokenExpiredError error
        if(err.name == 'TokenExpiredError'){
            message = `JSON Web Token is expired. Try again`
            // error = new ErrorHandler(message,400)
            error = new Error(message)
            err.statusCode = 400
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}