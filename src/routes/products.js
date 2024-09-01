const express = require('express');
const router = express.Router();

const {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
    getProduct,
    addProduct,
    removeProduct
} = require('../controller/productsController')

router.route('/products').get(getAllProducts).post(createProduct)
router.get('/Buy', getAllProductsStatic)
router.get('/products/:id',getProduct)
router.get('/search', getAllProducts)


module.exports = router