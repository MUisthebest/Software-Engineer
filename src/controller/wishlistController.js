const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

const getWishlist = async (req,res)=>{
    const userId = req.user.userId;
    const wishlist = await Wishlist.findOne({userID: userId}).populate('items.product')

    if (!wishlist || wishlist.items.length < 1){
        return res.status(StatusCodes.OK).render('Layout.ejs',{filename: "Lovepage.ejs", wishlist:null})
    }

    res.status(StatusCodes.OK).render('Layout.ejs', {filename: "Lovepage.ejs", wishlist: wishlist})
}

const createWishlist = async (req, res) => {
    const userId = req.user.userId;
    const {productId} = req.body;
    const wishlist = await Wishlist.findOne({userID: userId});
    const product = await Product.findOne({_id: productId});

    if (!product){
        throw new NotFoundError(`No product with id ${productId}`)
    }

    if (wishlist){
        const existingProduct = await wishlist.items.find((item)=>item.product == productId)
        if (existingProduct){
            const itemIndex = wishlist.items.findIndex(
                (item) => item.product.toString() === productId
            );
            wishlist.items.splice(itemIndex, 1);
            await wishlist.save();

            return res.status(StatusCodes.OK).json({wishlist})
        }
        const singleCartItem = {
            product: productId,
        }

        wishlist.items.push(singleCartItem)
        await wishlist.save()
        
        return res.status(StatusCodes.OK).json({wishlist})
    }

    const newWishlist = await Wishlist.create({
        items:[{
            product: productId,
        }],
        userID: userId,
    })

    res.status(StatusCodes.CREATED).json({newWishlist})
}

const removeItemFromWishlist = async (req, res) =>{
    const userId = req.user.userId;
    const productId = req.body.productId
    
    const wishlist = await Wishlist.findOne({user: userId})

    if (!wishlist){
        throw new NotFoundError('Your wishlist has no items!')
    }

    const itemIndex = wishlist.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        throw new NotFoundError('Item not found in the wishlist!');
    }
    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    res.status(200).json({wishlist})
}

module.exports = {
    getWishlist,
    createWishlist,
    removeItemFromWishlist
}