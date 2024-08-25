const mongoose = require('mongoose');

const SingleProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
});

const WishlistSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    wishlist: [SingleProductSchema]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
