document.addEventListener("DOMContentLoaded", function() {
    const productDiv = document.querySelectorAll('.product');
    let products = document.querySelectorAll(".wish");
    for (let i = 0; i < products.length; i++)
        {
            let temp = localStorage.getItem('select' + products[i].id);
            if(temp===products[i].getAttribute("id")){ 
            }
            else{
                const existingWishLink = productDiv[i].querySelector('a');
                existingWishLink.remove();
                productDiv[i].remove();
            }
        }                 
})