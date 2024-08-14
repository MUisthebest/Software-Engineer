const purchaseBtn = document.querySelector('#purchase_btn');
const quantityInput = document.getElementById('product_qty');
const removeBtns = document.querySelectorAll('.remove-item')

document.addEventListener('DOMContentLoaded', function() {

    const productId = window.location.pathname.split('/').pop();
    let purchasedItems = {};

    purchaseBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const quantity = Number(quantityInput.value);
        try {
            await axios.post('/cart', {productId: productId, quantity: quantity});
            window.location.href = `/products/${productId}`
        } catch(error){
            alert(error.response.data.msg)
        }
    });


    removeBtns.forEach(button=>{
        button.addEventListener('click', async (e)=>{
            e.preventDefault();
            const id = button.getAttribute('data-item-id');
            try {
                await axios.patch('/cart', { productId: id });
                window.location.href = `/products/${productId}`
            } catch (error) {
                alert(error.response.data.msg);
            }
        })
    })
});
