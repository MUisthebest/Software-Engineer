const mongoose = require('mongoose')
const SingleItemSchema = require('./SingleItem')

const CartSchema = mongoose.Schema({
    cartItems:[SingleItemSchema],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    totalPrice:{
        type:Number,
        required:true,
    }
}, {timestamps:true});

module.exports = mongoose.model('Cart', CartSchema);