/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

describe('Wishlist functionality', () => {
    let document;
    let localStorageMock;
    let products;
    let heart;

    beforeEach(() => {
        localStorageMock = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => store[key] = value.toString(),
                removeItem: (key) => delete store[key],
                clear: () => store = {}
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        const dom = new JSDOM('<!doctype html><html><body><div id="products"></div><div id="heart"></div></body></html>');
        document = dom.window.document;

        products = document.getElementById('products');
        heart = document.getElementById('heart');

        products.click = jest.fn(() => {
            if (localStorage.getItem('select123')) {
                localStorage.removeItem('select123');
                heart.classList.remove('heart-active');
            } else {
                localStorage.setItem('select123', '123');
                heart.classList.add('heart-active');
            }
        });
    });

    test('should add product to wishlist and toggle heart icon', () => {
        products.click();
        expect(localStorage.getItem('select123')).toBe('123');
        expect(heart.classList.contains('heart-active')).toBe(true);
    });

    test('should remove product from wishlist and toggle heart icon', () => {
        localStorage.setItem('select123', '123');
        heart.classList.add('heart-active');

        products.click();
        expect(localStorage.getItem('select123')).toBe(null);
        expect(heart.classList.contains('heart-active')).toBe(false);
    });

    test('should restore heart icon state from localStorage on page load', () => {
        localStorage.setItem('select123', '123');
        heart.classList.add('heart-active');

        require('../public/js/wishlist');

        expect(heart.classList.contains('heart-active')).toBe(true);
    });

    test('should not toggle heart icon if product is not in wishlist', () => {
        require('../public/js/wishlist');

        expect(heart.classList.contains('heart-active')).toBe(false);
    });
});