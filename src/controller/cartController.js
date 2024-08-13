const Cart = require('../models/Cart')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

const getCart = async (req,res)=>{
    const cart = await Cart.findOne({user:req.user.userId}).populate('cartItems.product')

    if (!cart || cart.cartItems.length < 1) {
        return res.status(StatusCodes.OK).render('Layout.ejs',{filename: "Cartpage.ejs", products:null})
    }

    res.status(StatusCodes.OK).render('Layout.ejs', {filename: "Cartpage.ejs", products: cart.cartItems})
    // res.status(StatusCodes.OK).json({products: cart.cartItems})
}

const createCart = async (req, res) => {
    const userId = req.user.userId;
    const {productId, quantity} = req.body;
    
    const cart = await Cart.findOne({user: userId});
    const product = await Product.findOne({_id: productId});
    const productQuantity = product.quantity

    if (!product){
        throw new NotFoundError(`No product with id ${productId}`)
    }

    if (quantity > productQuantity){
        throw new BadRequestError('Invalid quantity')
    }

    if (cart){
        const existingProduct = await cart.cartItems.find((cartItem)=>cartItem.product == productId)

        if (existingProduct){
            existingProduct.quantity += quantity;
            if (existingProduct.quantity > productQuantity){
                existingProduct.quantity = productQuantity;
            }
            await cart.save()

            return res.status(StatusCodes.OK).json({cart})
        }

        const singleCartItem = {
            product: productId,
            quantity: quantity,
        }

        cart.cartItems.push(singleCartItem)
        await cart.save()
        
        return res.status(StatusCodes.OK).json({cart})
    }

    const newCart = await Cart.create({
        cartItems:[{
            product: productId,
            quantity: quantity,
        }],
        user: userId
    })

    return res.status(StatusCodes.CREATED).json({newCart})
}

const removeItemFromCart = async (req, res) =>{
    const userId = req.user.userId;
    const productId = req.body.productId
    
    const cart = await Cart.findOneAndUpdate(
        {user: userId},
        {$pull:{cartItems: {product: productId}}}
    )

    if (!cart){
        throw new NotFoundError('Your cart has no items!')
    }

    res.status(200).json({cart})
}

module.exports = {
    getCart,
    createCart,
    removeItemFromCart
}