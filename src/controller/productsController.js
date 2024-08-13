const Product = require('../models/Product')
const Cart = require('../models/Cart')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors')
const fs = require('fs')
const path = require('path');

const getAllProductsStatic = async(req,res)=>{
    const products = await Product.find({}).sort('createdAt')
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "Buypage.ejs", products:products})
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
    res.status(StatusCodes.OK).json({products})
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

const getProduct = async (req,res)=>{
    const {id:productId} = req.params
    const product = await Product.findOne({_id:productId})
    if (!product){
        throw new NotFoundError(`No product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "boxItem.ejs", product:product, productId})
}


module.exports = {
    getAllProductsStatic,
    getAllProducts,
    createProduct,
    getProduct,
}