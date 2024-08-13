const mongoose = require('mongoose')

const SingleCartItemSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    }
})

const CartSchema = mongoose.Schema({
    cartItems:[SingleCartItemSchema],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps:true});

module.exports = mongoose.model('Cart', CartSchema);