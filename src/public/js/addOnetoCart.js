document.addEventListener('DOMContentLoaded', function() {
    const buyNowButtons = document.querySelectorAll('.buy_now');
    const cartIcon = document.getElementById('cart');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItems = document.getElementById('cart-items');
    const removeBtns = document.querySelectorAll('.remove-item')
    const cartCount = document.getElementById('cart-count');

    let cart = [];

    buyNowButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const productId = e.currentTarget.getAttribute('data-product-id');
            const productName = e.currentTarget.parentElement.querySelector('h5').textContent;
            const productPrice = e.currentTarget.querySelector('.p2').textContent;
            const productImage = e.currentTarget.closest('.product').querySelector('img').src;
            const quantity = 1;
            try {
                await axios.post('/cart', {productId: productId, quantity: quantity});
                window.location.href = `/Buy`
            } catch(error){
                alert(error.response.data.msg)
            }
            addToCart(productId, productName, productPrice, productImage);
        });
    });
    
    cartIcon.addEventListener('click', function() {
        cartDropdown.classList.toggle('hide5');
    });

    function addToCart(productId, productName, productPrice, productImage) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
        }
    }
    removeBtns.forEach(button=>{
        button.addEventListener('click', async (e)=>{
            e.preventDefault();
            const id = button.getAttribute('data-item-id');
            try {
                await axios.patch('/cart', { productId: id });
                window.location.href = `/Buy`
            } catch (error) {
                alert(error.response.data.msg);
            }
        })
    })
});
