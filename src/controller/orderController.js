const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const {NotFoundError, BadRequestError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const getAllOrders = async(req,res)=>{
    const orders = await Order.find({}).sort('createdAt')
    if (!orders){
        throw new NotFoundError('There is no orders!')
    }
    res.status(StatusCodes.OK).render("Admin.ejs",{filename: "Order-Admin.ejs", orders: orders})
}

const getAllOrdersOfUser = async(req, res)=>{
    const orders = await Order.find({user: req.user.userId}).populate('products.product')
    if (!orders){
        throw new NotFoundError('You currently have no orders!')
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "Order.ejs", orders: orders})
}

const createOrder = async(req,res)=>{
    const userId = req.user.userId;

    const cart = await Cart.findOne({user: userId});

    if (!cart || cart.cartItems.length < 1) {
        throw new BadRequestError(`There is no products in your cart!`);
    }

    const order = await Order.create({
        user: userId, 
        products: cart.cartItems,
        totalPrice: cart.totalPrice,
    });

    res.status(StatusCodes.CREATED).json({ order });
}

module.exports = {
    getAllOrders,
    getAllOrdersOfUser,
    createOrder,
}