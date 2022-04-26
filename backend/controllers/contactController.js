const nodemailer = require('nodemailer')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmail = require('../utils/sendEmail')
const axios = require('axios')

// Send email from contact form => /api/v1/contact
exports.contactEmail = catchAsyncErrors( async (req, res, next) => {      

    const { name, email, country, message, key } = req.body

    const secret = process.env.RECAPTCHA_SECRET_KEY
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${key}`
    )
    
    const { success } = response.data
    if ( !success ) { return next(new ErrorHandler(error.message, 500)) }  

    if ( !name || !email || !country || !message ) {
        return next(new ErrorHandler('Please fill out all fields', 500))  
    }
    
    try {
        await sendEmail({
            type: 'contact',
            name: name,
            email: email,    
            country: country,        
            message: message,            
            subject: `${process.env.SITE_NAME} Contact form`
        })
        res.status(200).json({
            success: true            
        })        
    } catch (error) { 
        return next(new ErrorHandler(error.message, 500))        
    }

})