const { JSDOM } = require('jsdom');
const axios = require('axios');
const { updateCartDisplay, addProductToCart } = require('../utils/cartUntil'); // Adjust the path as necessary
jest.mock('axios');

describe('addProductToCart', () => {
    let dom;
    let buyNowButtonDOM;
    let cartItems;

    beforeEach(() => {
        dom = new JSDOM(`
            <html>
                <body>
                    <div class="product">
                        <h5>Product Name</h5>
                        <p class="p2">Product Price</p>
                        <img src="product-image.jpg" alt="Product Image">
                        <button class="buy_now" data-product-id="123">Add to Cart</button>
                    </div>
                    <div id="cart-items"></div>
                    <div id="cart-dropdown" class="hide5"></div>
                    <div id="cart-count"></div>
                    <div id="cart-icon"></div>
                </body>
            </html>`, 
            { url: 'http://localhost:8080' });

        global.window = dom.window;
        global.document = dom.window.document;
        global.alert = jest.fn(); // Mock window.alert
        global.console.log = jest.fn();

        buyNowButtonDOM = document.querySelector('.buy_now');
        cartItems = document.getElementById('cart-items');

        addProductToCart(); // Initialize the cart handler
    });

    it('Could add product to cart successfully', async () => {
        axios.post.mockResolvedValue({ data: true });

        const event = new window.Event('click');
        buyNowButtonDOM.dispatchEvent(event);

        await new Promise(process.nextTick); 

        expect(axios.post).toHaveBeenCalledWith('/cart', { productId: '123', quantity: 1 });
    });

    it('Could handle error when adding product to cart fails', async () => {
        axios.post.mockRejectedValue({ response: { data: { msg: 'Failed to add product to cart' } } });

        const event = new window.Event('click');
        buyNowButtonDOM.dispatchEvent(event);

        await new Promise(process.nextTick); 

        expect(axios.post).toHaveBeenCalledWith('/cart', { productId: '123', quantity: 1 });
        expect(console.log).toHaveBeenCalledWith('Failed to add product to cart');
    });

    it('Could handle error when adding product with wrong ID to cart', async () => {
        axios.post.mockRejectedValue({ response: { data: { msg: 'Product ID not found' } } });

        const event = new window.Event('click');
        buyNowButtonDOM.setAttribute('data-product-id', 'wrong-id');
        buyNowButtonDOM.dispatchEvent(event);

        await new Promise(process.nextTick); 

        expect(axios.post).toHaveBeenCalledWith('/cart', { productId: 'wrong-id', quantity: 1 });
        expect(console.log).toHaveBeenCalledWith('Product ID not found');
    });

    it('Could update cart display correctly', () => {
        const cart = [
            { id: '123', name: 'Product Name', price: 'Product Price', image: 'product-image.jpg', quantity: 1 }
        ];

        updateCartDisplay(cart, cartItems);

        expect(cartItems.innerHTML).toContain('Product Name');
        expect(cartItems.innerHTML).toContain('Product Price');
        expect(cartItems.innerHTML).toContain('product-image.jpg');
        expect(cartItems.innerHTML).toContain('1');
    });
});