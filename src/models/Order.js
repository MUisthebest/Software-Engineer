const mongoose = require('mongoose');
const SingleItemSchema = require('./SingleItem')

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [SingleItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    },
    coupon: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);