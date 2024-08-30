const express = require('express')
const router = express.Router()

const {getAllOrders, createOrder, getAllOrdersOfUser} = require('../controller/orderController')
const {authenticationMiddleware} = require('../middleware/authentication')

router.route('/orders').post(authenticationMiddleware, createOrder)

module.exports = router