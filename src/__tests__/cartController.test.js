const mongoose = require('mongoose');
const { createCart, removeItemFromCart } = require('../controller/cartController');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { NotFoundError, BadRequestError } = require('../errors');

jest.mock('../models/Cart');
jest.mock('../models/Product');

describe('Cart Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { user: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            _getRenderView: jest.fn(),
            _getRenderData: jest.fn()
        };
        next = jest.fn();
    });

    describe('createCart', () => {
        it('could create a new cart if no cart exists', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const productId = new mongoose.Types.ObjectId().toString();
            const product = { _id: productId, price: 100, quantity: 10 };

            req.user = { userId };
            req.body = { productId, quantity: 1 };

            Cart.findOne.mockResolvedValue(null);
            Product.findOne.mockResolvedValue(product);

            await createCart(req, res, next);

            expect(Cart.findOne).toHaveBeenCalledWith({ user: userId });
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('could add a new item to the existing cart', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const productId = new mongoose.Types.ObjectId().toString();
            const product = { _id: productId, price: 100, quantity: 10 };
            const cart = {
                user: userId,
                cartItems: [],
                totalPrice: 0,
                save: jest.fn()
            };

            req.user = { userId };
            req.body = { productId, quantity: 1 };

            Cart.findOne.mockResolvedValue(cart);
            Product.findOne.mockResolvedValue(product);

            await createCart(req, res, next);

            expect(cart.cartItems.length).toBe(1);
            expect(cart.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ cart });
        });

        it('could throw BadRequestError if the quantity exceeds available stock', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const productId = new mongoose.Types.ObjectId().toString();
            const product = { _id: productId, price: 100, quantity: 5 };
            const cart = {
                user: userId,
                cartItems: [],
                save: jest.fn()
            };

            req.user = { userId };
            req.body = { productId, quantity: 10 };

            Cart.findOne.mockResolvedValue(cart);
            Product.findOne.mockResolvedValue(product);

            await expect(createCart(req, res, next)).rejects.toThrow(BadRequestError);
        });

        it('could remove item from cart and return updated cart', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const productId = new mongoose.Types.ObjectId().toString();
            const cart = {
                user: userId,
                cartItems: [
                    { product: productId, quantity: 1 }
                ],
                save: jest.fn()
            };
        
            req.user = { userId };
            req.body = { productId };
        
            Cart.findOne.mockResolvedValue(cart);
        
            await removeItemFromCart(req, res, next);
        
            expect(Cart.findOne).toHaveBeenCalledWith({ user: userId });
            expect(cart.cartItems.length).toBe(0);
            expect(cart.save).toHaveBeenCalled();
        
            const expectedResponse = {
                cart: {
                    user: userId,
                    cartItems: [],
                    save: expect.any(Function)
                }
            };
        
            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it('could throw NotFoundError if cart does not exist', async () => {
            console.log('Testing: could throw NotFoundError if cart does not exist');
            req.user = { userId: new mongoose.Types.ObjectId().toString() };
            req.body = { productId: new mongoose.Types.ObjectId().toString() };
    
            Cart.findOne.mockResolvedValue(null);
    
            await expect(removeItemFromCart(req, res, next)).rejects.toThrow('Your cart has no items!');
        });
    
        it('could throw NotFoundError if item is not found in the cart', async () => {
            console.log('Testing: could throw NotFoundError if item is not found in the cart');
            const userId = new mongoose.Types.ObjectId().toString();
            const productId = new mongoose.Types.ObjectId().toString();
            const cart = {
                user: userId,
                cartItems: [],
                save: jest.fn()
            };
    
            req.user = { userId };
            req.body = { productId };
    
            Cart.findOne.mockResolvedValue(cart);
    
            await expect(removeItemFromCart(req, res, next)).rejects.toThrow(NotFoundError);
            await expect(removeItemFromCart(req, res, next)).rejects.toThrow('Item not found in the cart!');
        });
    });

});