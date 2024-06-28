const express = require('express');
const router = express.Router();

const {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
} = require('../controller/productsController')

router.route('/products').get(getAllProductsStatic).post(createProduct)

module.exports = router