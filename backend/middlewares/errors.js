const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {    

    err.statusCode = err.statusCode || 500

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message)
        err = new ErrorHandler(message, 400)
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }

    // Handling wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!'
        err = new ErrorHandler(message, 400)
    }

    // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!'
        err = new ErrorHandler(message, 400)
    }

    if(process.env.NODE_ENV === 'DEVELOPMENT') {

        console.log(err)

        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message || 'Internal dev Server Error',
            stack: err.stack
        })
        
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {     

        res.status(err.statusCode).json({
            success: false,
            message: err.message || 'Internal prod Server Error'
        })
        
    }
    
}