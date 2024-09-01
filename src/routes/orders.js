const express = require('express')
const router = express.Router()

const {getAllOrders, createOrder, getAllOrdersOfUser} = require('../controller/orderController')
const {authenticationMiddleware} = require('../middleware/authentication')

router.route('/orders').post(authenticationMiddleware, createOrder)
router.route('/Order-Admin').get(authenticationMiddleware, getAllOrders)
router.route('/user/view-orders').get(authenticationMiddleware,getAllOrdersOfUser);
module.exports = router