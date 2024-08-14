document.addEventListener('DOMContentLoaded', () => {
    const removeBtns = document.querySelectorAll('.remove_btn');

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
});