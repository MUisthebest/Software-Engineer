const purchaseBtn = document.getElementById('purchase_btn');
const quantityInput = document.getElementById('product_qty');

purchaseBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = window.location.pathname.split('/').pop()
    const quantity = quantityInput.value;
    try {
        await axios.post('cart', {productId:productId, quantity:quantity});
        window.location.href = '/Cart'
    } catch(error){
        console.log(error.response.data.msg);
    }

});