const removeBtns = document.querySelectorAll('remove_btn');

removeBtns.forEach(button=>{
    button.addEventListener('click', async (e)=>{
        e.preventDefault();
        const productId = this.getAttribute('id');
        try {
            await axios.patch('cart',{productId: productId});
        } catch (error) {
            console.log(error.response.data.msg);
        }
    })
})