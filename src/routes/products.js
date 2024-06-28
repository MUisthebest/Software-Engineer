const express = require('express');
const router = express.Router();

const {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
    getProduct
} = require('../controller/productsController')

router.route('/products').get(getAllProducts).post(createProduct)
router.get('/Buy', getAllProductsStatic)
router.get('/products/:id',getProduct)

module.exports = router