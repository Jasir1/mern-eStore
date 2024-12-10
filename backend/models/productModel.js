const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true, // remove white spaces before and after the full text
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
        // default:0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: [true, "Please enter product description"]
            }
        }],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: ['Electronics', 'Mobile Phones', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home Decor'],
            message: "Please select correct category"
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [100, "Product stock cannot exceed 100"],
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            rating: {
                type: String,
                required: [true, "Please enter product review rating"]
            },
            comment: {
                type: String,
                required: [true, "Please enter product review comment"]
            },
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
},{timestamps:true})

const schema = mongoose.model('Product',productSchema)

module.exports = schema