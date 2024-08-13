const addToCartButtonDOM = document.querySelector('.bt');

addToCartButtonDOM.addEventListener('click', async event => {
    event.preventDefault();
    const productId = event.target.getAttribute('data-product-id');
    const quantity = 1;
    try {
        const {data} = await axios.post('/cart',{productId: productId, quantity: quantity})
        if (!data) {
            throw new Error('Failed to add product to cart')
        }
        alert('Product added to cart.')
        window.location.href = '/cart'
    } catch (error) {
        console.log(error.response.data.msg);
    }
})