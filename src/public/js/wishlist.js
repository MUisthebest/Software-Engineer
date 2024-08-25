let wishList = [];


function setup() 
{
    let products = document.querySelector(".luv");
    let productId = products.getAttribute("id");
    let heart = document.querySelector('.heart');
    products.onclick = async(e) => {
        await axios.post('/Love', { productId: productId });
        updateSelectedButton(productId);
    }

    async function updateSelectedButton(selected) {
                if(heart.classList.contains('heart-active')){
                    heart.classList.toggle("heart-active");
                    await axios.patch('/Love', { productId: productId });
                }
                else if(productId===selected ){
                    heart.classList.toggle("heart-active");
                }
            }     
    }

window.addEventListener("DOMContentLoaded", setup);