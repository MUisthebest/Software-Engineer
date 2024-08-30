document.addEventListener('DOMContentLoaded', () => {
    const removeBtns = document.querySelectorAll('.remove_btn');
    const purchaseBtn = document.getElementById('order');

    removeBtns.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const productId = button.getAttribute('id');
            try {
                await axios.patch('/cart', { productId: productId });
                window.location.href = '/Cart';
            } catch (error) {
                alert(error.response.data.msg);
            }
        });
    });

    purchaseBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        try {
            await axios.post('/orders');
            alert('Order checked out!')
            await axios.delete('/cart');
            window.location.href = '/cart';
        } catch (error) {
            alert(error.response.data.msg);
        }
    })
});