const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')

const getWishlist = async (req,res)=>{
    const userId = req.user.userId;
    try {
        let wishlist = await Wishlist.findOne({ userID: userId }).populate('wishlist.product');
        if (wishlist) {
            return res.status(StatusCodes.OK).render('Layout.ejs', {filename: "Lovepage.ejs", wishlist: wishlist})
        } else {
            return res.status(StatusCodes.OK).render('Layout.ejs', {filename: "Lovepage.ejs", wishlist: null})
        }
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
}

const createWishlist = async (req, res) => {
    const userId = req.user.userId;
    const {productId} = req.body;
    const product = await Product.findOne({_id: productId});

    if (!product){
        throw new NotFoundError(`No product with id ${productId}`)
    }

    try {
        let wishlist = await Wishlist.findOne({ userID: userId });
        const existingProduct = await wishlist.wishlist.find((wishlist)=>wishlist.product == productId)
        if (!wishlist) {
            const newWishList = await Wishlist.create({                
            wishlist:[{
                product: productId,
            }],
            user: userId
        })
            return res.status(StatusCodes.CREATED).json({newWishList})
        }
        const SingleProductSchema = {
            product: productId
            }
        if (!existingProduct){
            wishlist.wishlist.push(SingleProductSchema);
            await wishlist.save();
        }
        return res.status(StatusCodes.CREATED).json({wishlist})
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
    }

}

const removeItemFromWishlist = async (req, res) =>{
    const userId = req.user.userId;
    const productId = req.body.productId
    
    try {
        const wishlist = await Wishlist.findOne({ userID: userId });

        if (wishlist) {
            wishlist.wishlist = wishlist.wishlist.filter(item => item.product.toString() !== productId);
            await wishlist.save();
        } else {
            alert('Wishlist not found');
        }
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
    }
    res.status(200).json({cart})
}

module.exports = {
    getWishlist,
    createWishlist,
    removeItemFromWishlist
}