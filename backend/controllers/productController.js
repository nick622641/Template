const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary')

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const { name, stock, price, width, height, datePublished, artist, orientation, media, description } = req.body
    
    let images = []
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = []

    if( !name          ) { return next( new ErrorHandler( 'Please enter a title'        , 400 )) }
    if( !images        ) { return next( new ErrorHandler( 'Please add an image'         , 400 )) }
    if( price  === '0' ) { return next( new ErrorHandler( 'Price must be over 0'        , 400 )) }
    if( !datePublished ) { return next( new ErrorHandler( 'Please enter a date'         , 400 )) }
    if( width  === '0' ) { return next( new ErrorHandler( 'Width must be over 0'        , 400 )) }
    if( height === '0' ) { return next( new ErrorHandler( 'Height must be over 0'       , 400 )) }    
    if( !artist        ) { return next( new ErrorHandler( 'Please select an artist'     , 400 )) }
    if( !orientation   ) { return next( new ErrorHandler( 'Please select a orientation' , 400 )) }
    if( !media         ) { return next( new ErrorHandler( 'Please select a media type'  , 400 )) }    
    if( !description   ) { return next( new ErrorHandler( 'Please provide a description', 400 )) }    

    for(let i = 0; i < images.length; i++) {
        const thumb = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",            
            width: 240,
            crop: "scale" 
        })
        const image = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",                    
            height: 1080,
            crop: "scale" 
        })
        imagesLinks.push({
            public_id: image.public_id,
            url: image.secure_url,
            thumb_id: thumb.public_id,
            thumbUrl: thumb.secure_url
        })
    }

    req.body.images = imagesLinks    
    req.body.user = req.user.id
    
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})
// Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {    

    try {    
        let product = await Product.findById(req.params.id)  

        const { name, stock, price, width, height, datePublished, artist, orientation, media, description } = req.body

        let images = []        
        if (typeof req.body.images === 'string') {   // if a new image has been added          
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if(!name)  { return next(new ErrorHandler('Please enter a title',    400)) }
        if(price === '0') { return next(new ErrorHandler('Price must be over 0', 400)) }
        if(!datePublished) { return next(new ErrorHandler('Please enter a date', 400)) }
        if(width === '0') { return next(new ErrorHandler('Width must be over 0', 400)) }
        if(height === '0') { return next(new ErrorHandler('Height must be over 0', 400)) }    
        if(!artist)  { return next(new ErrorHandler('Please select an artist', 400)) }
        if(!orientation)  { return next(new ErrorHandler('Please select a orientation', 400)) }
        if(!media)  { return next(new ErrorHandler('Please select a media type', 400)) }    
        if(!description)  { return next(new ErrorHandler('Please provide a description', 400)) }

        if (images !== undefined) {         
            let imagesLinks = product.images
            for (let i = 0; i < images.length; i++) {
                const thumb = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",            
                    width: 240,
                    crop: "scale" 
                })
                const image = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",                    
                    height: 1080,
                    crop: "scale" 
                })
                imagesLinks.push({
                    public_id: image.public_id,
                    url: image.secure_url,
                    thumb_id: thumb.public_id,
                    thumbUrl: thumb.secure_url
                })
            }
            req.body.images = imagesLinks
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            product
        })  
    } catch(error) {

        return next(new ErrorHandler('Product not found', 404))        
    }
})
// Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {       

    const resPerPage = 12
    
    const productsCount = await Product.countDocuments()
    const apiFeatures = new APIFeatures(Product.find({ visible: {$ne: 0}}).sort({ createdAt: -1 }), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query
    let filteredProductsCount = products.length

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query.clone()
   
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,        
        products  
    })  
    
})
// Get latest product details => /api/v1/product/latest
exports.getLatestProduct = catchAsyncErrors(async (req, res, next) => {      

    const latestProduct = await Product.find( 
        { visible: {$ne: 0}})
            .sort({ createdAt: -1 })
            .limit(1)

    res.status(200).json({
        success: true,       
        latestProduct
    })
})
// Get random products => /api/v1/product/random
exports.getRandomProducts = async (req, res, next) => {  

    const quantity = Number(req.params.quantity)
     
    const randomProducts = await Product.aggregate([ 
        { $match: { visible: {$ne: 0}} }, 
        { $sample: { size: quantity } } 
    ])

    res.status(200).json({
        success: true,       
        randomProducts
    })    
}
// Get all products (Admin) => /api/v1/admin/products
exports.getAdminProducts = async (req, res, next) => {   

    const productsCount = await Product.countDocuments()

    const products = await Product.find().sort({ createdAt: -1 })
    
    res.status(200).json({
        success: true,  
        productsCount,     
        products
    })      
}
// Get single product details => /api/v1/product/:slug
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {   
    try {  

        const product = await Product.findOne({ slug: req.params.slug })

        res.status(200).json({
            success: true,
            product
        })
    } catch(error) {
        return next(new ErrorHandler('Product not found', 404))    
    }
})
// Get single Product details (Admin) => /api/v1/admin/product/:id
exports.getAdminProduct = catchAsyncErrors(async (req, res, next) => { 
    try {   
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product
        })
    } catch(error) {
        return next(new ErrorHandler('Product not found', 404))    
    }
})
// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try { 
        const product = await Product.findById(req.params.id)   
        // Deleting images
        for(let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            await cloudinary.v2.uploader.destroy(product.images[i].thumb_id)
        }        
        await product.remove() 
        res.status(200).json({
            success: true,
            message: 'Product was deleted'
        })
    } catch (error) {
        return next(new ErrorHandler('Product not found', 404)) 
    }
})
// Delete Image => /api/v1/image
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {

    try { 
        const product = await Product.findById(req.query.id)
        const images  = product.images.filter(image => image._id.toString() !== req.query.imgId.toString())

        await cloudinary.v2.uploader.destroy(product.images[req.query.imgIndex].public_id)
        await cloudinary.v2.uploader.destroy(product.images[req.query.imgIndex].thumb_id)               
        
        await Product.findByIdAndUpdate(req.query.id, {
            images
            
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        return next(new ErrorHandler('Product not found', 404)) 
    }
})
// Update images => /api/v1/image
exports.updateImages = catchAsyncErrors(async (req, res, next) => {

    try { 
        const product = await Product.findById(req.query.id)
        const init = req.query.initPos
        const img = product.images[init]
        const final = req.query.finPos
        
        let images  = product.images.filter( image => product.images[init] !== image )  
        
        images.splice(final, 0, img)
        
        await Product.findByIdAndUpdate(req.query.id, {
            images
            
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        return next(new ErrorHandler('Product not found', 404)) 
    }
})
// Create New Review => /api/v1/review
exports.createProductReview = catchAsyncErrors( async (req, res, next) => {

    const { rating, comment, productId } = req.body

    if(rating === '0') { return next(new ErrorHandler('Please enter a rating',  400)) }
    if(!comment)       { return next(new ErrorHandler('Please enter a comment', 400)) }

    const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: {
            public_id: req.user.avatar.public_id,
            url: req.user.avatar.url
        },
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating           
            }
        })      
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})
// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})
// Delete Product Review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})