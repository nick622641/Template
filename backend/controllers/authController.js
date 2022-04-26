const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
const axios = require('axios')

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Register a User => /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { name, email, password, avatar, key } = req.body

    const secret = process.env.RECAPTCHA_SECRET_KEY
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${key}`
    )
    const { success } = response.data
    if ( !success ) { return next(new ErrorHandler('Nice try!', 500)) }  

    // Checks if name, email and password is entered by user
    if(!avatar) {
        return next(new ErrorHandler('Please choose an avatar', 400))
    }
    if(!name) {
        return next(new ErrorHandler('Please enter a name', 400))
    }
    if(!email) {
        return next(new ErrorHandler('Please enter your email', 400))
    }
    if(!password) {
        return next(new ErrorHandler('Please enter a password', 400))
    }
    if(password.length < 6) {
        return next(new ErrorHandler('Password must contain at least 6 characters', 400))
    }
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    })
    
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })    
    sendToken(user, 200, res)    
})

// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // Update avatar 
    if(req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id
        const res = await cloudinary.v2.uploader.destroy(image_id)
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body
    // Checks if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter Email & Password', 400))
    }
    // Finding user in database
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    sendToken(user, 200, res)   
})

// Logout User => /api/v1/logout
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const secret = process.env.RECAPTCHA_SECRET_KEY
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.key}`
    )
    const { success } = response.data
    if ( !success ) { return next(new ErrorHandler('Nice try!', 500)) }  

    const user = await User.findOne({ email: req.body.email })
    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })
    // Create password reset url
    const resetUrl = process.env.NODE_ENV === "DEVELOPMENT"
        ? `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
        : `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested a password reset please ignore this email.`
    try {
        await sendEmail({
            type: 'forgot',
            email: user.email,
            subject: `${process.env.SITE_NAME} Password Recovery`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }        
    })
    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has expired', 400))
    }
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))   
    }
     // Setup new password
     user.password = req.body.password

     user.resetPasswordToken = undefined
     user.resetPasswordExpire = undefined

     await user.save()

     sendToken(user, 200, res)
})

// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400))  
    }
    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

// Admin Routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

// Get User Details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors( async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`))
    }

})

// Update User Profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete User => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors( async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        // Remove avatar from Cloudinary         
        const id = user.avatar.public_id
        await cloudinary.v2.uploader.destroy(id)  
        await user.remove()
        res.status(200).json({
            success: true
        })
    } catch (error) {
        return next( new ErrorHandler(`User not found with id: ${req.params.id}`) )
    }
})
