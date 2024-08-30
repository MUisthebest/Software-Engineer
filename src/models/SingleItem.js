const mongoose = require('mongoose')

const SingleItemSchema = mongoose.Schema({
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

module.exports = SingleItemSchema