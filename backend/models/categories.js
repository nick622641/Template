const mongoose = require('mongoose')

const categoryOneSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})
const CategoryOne = mongoose.model('CategoryOne', categoryOneSchema)

const categoryTwoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})
const CategoryTwo = mongoose.model('CategoryTwo', categoryTwoSchema)

const categoryThreeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    }
})
const CategoryThree = mongoose.model('CategoryThree', categoryThreeSchema)

module.exports = { CategoryOne, CategoryTwo, CategoryThree }