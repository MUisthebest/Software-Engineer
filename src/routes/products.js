const express = require('express');
const path = require('path');
const multer = require('multer')
const router = express.Router();
const {authenticationMiddleware, authorizePermissions} = require('../middleware/authentication')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/Media/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
    createProductWithMulter,
    getProduct,
    deleteProduct,
} = require('../controller/productsController')

router.route('/products')
.get(getAllProducts)
.post(createProduct)
router.get('/Buy', getAllProductsStatic)
router.get('/products/:id',getProduct)
router.get('/search', getAllProducts)
router.route('/admin/products-management')
.post(authenticationMiddleware, authorizePermissions('admin'), upload.single('image'), createProductWithMulter)
.patch(authenticationMiddleware, authorizePermissions('admin'), deleteProduct)

module.exports = router