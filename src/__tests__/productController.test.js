const { getAllProductsStatic, getAllProducts, createProduct, getProduct } = require('../controller/productsController');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const fs = require('fs');
const path = require('path');

jest.mock('../models/Product');
jest.mock('../models/Cart');
jest.mock('fs');
jest.mock('path');

describe('Products Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {},
            params: {},
            body: {},
            cookies: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            render: jest.fn()
        };
        next = jest.fn();
    });

    test('getAllProductsStatic could fetch all products and render the correct view', async () => {
        Product.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue([{ name: 'Product1' }, { name: 'Product2' }])
        });
        await getAllProductsStatic(req, res);
        expect(Product.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.render).toHaveBeenCalledWith("Layout.ejs", { filename: "Buypage.ejs", products: [{ name: 'Product1' }, { name: 'Product2' }] });
    });

    test('getAllProducts could fetch products based on query parameters and render the correct view', async () => {
        req.query = { name: 'Product', sort: 'price', fields: 'name,price', numericFilters: 'price>10' };
        Product.find.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{ name: 'Product1', price: 20 }])
        });
        await getAllProducts(req, res);
        expect(Product.find).toHaveBeenCalledWith({ name: { $regex: 'Product', $options: 'i' }, price: { $gt: 10 } });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.render).toHaveBeenCalledWith("Layout.ejs", { filename: "search.ejs", products: [{ name: 'Product1', price: 20 }] });
    });

    test('createProduct could create a new product and return the correct response', async () => {
        req.body = { name: 'new product', price: 100, desc: 'Description', image: 'path/to/image.png', quantity: 10 };
        const imagePath = path.join(__dirname, '../path/to/image.png');
        fs.readFileSync.mockReturnValue('image data');
        Product.create.mockResolvedValue({ name: 'new product', price: 100, desc: 'Description', image: { data: 'image data', contentType: 'image/png' }, quantity: 10 });
        await createProduct(req, res);
        expect(Product.create).toHaveBeenCalledWith({
            name: 'new product',
            price: 100,
            desc: 'Description',
            image: { data: 'image data', contentType: 'image/png' },
            quantity: 10
        });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith({ name: 'new product', price: 100, desc: 'Description', image: { data: 'image data', contentType: 'image/png' }, quantity: 10 });
    });

    test('getProduct could fetch a product by ID and render the correct view', async () => {
        req.params.id = '123';
        req.cookies = { user: JSON.stringify({ userId: 'user312' }) };
        Product.findOne.mockResolvedValue({ name: 'Product1', _id: '123' });
        Cart.findOne.mockReturnValue({
            populate: jest.fn().mockResolvedValue({ cartItems: [{ product: { name: 'Product1', _id: '123' }, quantity: 2 }] })
        });
        await getProduct(req, res);
        expect(Product.findOne).toHaveBeenCalledWith({ _id: '123' });
        expect(Cart.findOne).toHaveBeenCalledWith({ user: 'user312' });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.render).toHaveBeenCalledWith("Layout.ejs", { filename: "boxItem.ejs", product: { name: 'Product1', _id: '123' }, productId: '123', cart: { cartItems: [{ product: { name: 'Product1', _id: '123' }, quantity: 2 }] } });
    });

    test('getProduct could throw NotFoundError when product ID does not exist', async () => {
        const productId = '123';
        req.params = { id: productId };
        Product.findOne.mockResolvedValue(null);
    
        await expect(getProduct(req, res)).rejects.toThrow(`No product with id: ${productId}`);
    });

    test('getAllProducts could handle database connection error', async () => {
        Product.find.mockImplementation(() => {
            throw new Error('Database connection error');
        });
        await expect(getAllProducts(req, res)).rejects.toThrow('Database connection error');
    });

    test('getAllProducts could eturns an empty array when the provided query parameters do not match any products in the database', async () => {
        req.query = { name: 'NonExistentProduct' };
        Product.find.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([])
        });
        await getAllProducts(req, res);
        expect(Product.find).toHaveBeenCalledWith({ name: { $regex: 'NonExistentProduct', $options: 'i' } });
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.render).toHaveBeenCalledWith("Layout.ejs", { filename: "search.ejs", products: [] });
    });

});

