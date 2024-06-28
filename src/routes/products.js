const express = require('express');
const router = express.Router();

const {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
} = require('../controller/productsController')

router.route('/products').get(getAllProducts).post(createProduct)
router.get('/Buy', getAllProductsStatic)

module.exports = router