const mongoose = require('mongoose');

const SingleProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const OrderSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [SingleProductSchema],
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
