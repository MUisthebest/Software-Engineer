const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'Please provide product name'],
        maxlength:[100, 'Name cannot be more than 100 characters'],
    },
    price:{
        type:Number,
        default:0,
        required:true
    },
    desc:{
        type:String,
        required: [true, 'Please provide product description'],
        maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    image:{
        data: Buffer,
        contentType: String,
    },
    quantity:{
        type:Number,
        default:0,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Product',ProductSchema)