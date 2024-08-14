const Cart = require('../models/Cart')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

const getCart = async (req,res)=>{
    const cart = await Cart.findOne({user:req.user.userId}).populate('cartItems.product')

    if (!cart || cart.cartItems.length < 1) {
        return res.status(StatusCodes.OK).render('Layout.ejs',{filename: "Cartpage.ejs", cart:null})
    }

    res.status(StatusCodes.OK).render('Layout.ejs', {filename: "Cartpage.ejs", cart: cart})
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
        throw new BadRequestError('Out of stock!')
    }

    if (cart){
        const existingProduct = await cart.cartItems.find((cartItem)=>cartItem.product == productId)

        if (existingProduct){
            existingProduct.quantity += quantity;
            if (existingProduct.quantity > productQuantity){
                existingProduct.quantity = productQuantity;
            }
            cart.totalPrice += quantity * product.price

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
        user: userId,
        totalPrice: quantity * product.price
    })

    return res.status(StatusCodes.CREATED).json({newCart})
}

const removeItemFromCart = async (req, res) =>{
    const userId = req.user.userId;
    const productId = req.body.productId
    
    const cart = await Cart.findOne(
        {user: userId}
    )

    if (!cart){
        throw new NotFoundError('Your cart has no items!')
    }

    const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        throw new NotFoundError('Item not found in the cart!');
    }

    // Remove the item from the cart
    cart.cartItems.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({cart})
}

module.exports = {
    getCart,
    createCart,
    removeItemFromCart
}