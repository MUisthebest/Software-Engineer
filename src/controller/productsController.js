const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Wishlist = require('../models/Wishlist')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require('../errors')
const fs = require('fs')
const path = require('path');

const getAllProductsStatic = async(req,res)=>{
    const cookies = req.cookies
    const products = await Product.find({}).sort('createdAt')

    if (cookies && Object.keys(req.cookies).length !== 0){
        const userId = JSON.parse(cookies.user).userId
        const cart = await Cart.findOne({user: userId}).populate('cartItems.product')
        return res.status(StatusCodes.OK).render("Layout.ejs",{filename: "Buypage.ejs", products:products, cart: cart})
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "Buypage.ejs", products:products, cart: null})
}

const getAllProducts = async(req,res)=>{
    const {name, sort, fields, numericFilters} = req.query
    const queryObject = {}

    if (name){
        queryObject.name = {$regex:name, $options:'i'}
    }

    if (numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',         
            '<':'$lt',         
            '<=':'$lte',         
            '=':'$eq',         
        }

        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        const options = ['price', 'quantity'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-');
            if (options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }

    let result = Product.find(queryObject);
    if (sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if (fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1)*limit;

    result = result.skip(skip).limit(limit)
    const products = await result
    // res.status(StatusCodes.OK).json({products})
    const cookies = req.cookies
    if (cookies && Object.keys(req.cookies).length !== 0){
        const userId = JSON.parse(cookies.user).userId
        const cart = await Cart.findOne({user: userId}).populate('cartItems.product')
        return res.status(StatusCodes.OK).render("Layout.ejs",{filename: "search.ejs", products:products, cart: cart})
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "search.ejs", products:products, cart: null})
}

const createProduct = async (req,res)=>{
    const imagePath = path.join(__dirname, '../' + req.body.image)
    const obj = {
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        image:{
            data: fs.readFileSync(imagePath),
            contentType: 'image/png'
        },
        quantity: req.body.quantity
    }
    const product = await Product.create(obj)
    res.status(StatusCodes.CREATED).json(product)
}

const createProductWithMulter = async (req, res) => {
    const file = req.file
    
    if (!file){
        throw new BadRequestError('No file uploaded!')
    }

    const obj = {
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        image:{
            data: fs.readFileSync(path.join(__dirname, '../public/Media/' + file.filename)),
            contentType: 'image/png'
        },
        quantity: req.body.quantity
    }

    if (!obj.name || !obj.price || !obj.desc || !obj.image || !obj.quantity){
        throw new BadRequestError('Please fill out all the fields!')
    }

    const product = await Product.create(obj)
    fs.unlink(file.path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('File processing error');
        }
    });
    res.status(StatusCodes.CREATED).json(product)
}

const getProduct = async (req,res)=>{
    const cookies = req.cookies
    const {id:productId} = req.params
    const product = await Product.findOne({_id:productId})

    if (!product){
        throw new NotFoundError(`No product with id: ${productId}`)
    }
    
    if (cookies && Object.keys(req.cookies).length !== 0){
        const userId = JSON.parse(cookies.user).userId
        const cart = await Cart.findOne({user: userId}).populate('cartItems.product')
        const wishlist = await Wishlist.findOne({ userID: userId }).populate('items.product');
        return res.status(StatusCodes.OK).render("Layout.ejs",{filename: "boxItem.ejs", product:product, productId, cart: cart, wishlist: wishlist})
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "boxItem.ejs", product:product, productId, cart: null, wishlist: null})
}

const deleteProduct = async(req, res) => {
    const productId = req.body.productId
    const product = await Product.findOneAndDelete({_id: productId});
    if (!product){
        throw new NotFoundError(`There is no product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({product})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
    createProductWithMulter,
    getProduct,
    deleteProduct
}