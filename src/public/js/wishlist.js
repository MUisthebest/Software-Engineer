let wishList = [];


function setup() 
{
    let products = document.querySelector(".luv");
    let productId = products.getAttribute("id");
    let heart = document.querySelector('.heart');
    const selectedButton = localStorage.getItem('select'+productId);
    updateSelectedButton(selectedButton);
    products.onclick = function(e) {
        localStorage.setItem('select'+productId, productId);
        updateSelectedButton(productId);
    }

    function updateSelectedButton(selected) {
                if(heart.classList.contains('heart-active')){
                    heart.classList.toggle("heart-active");
                    localStorage.setItem('select'+productId, 'x');
                }
                else if(productId===selected ){
                    heart.classList.toggle("heart-active");
                }
            }     
    }

window.addEventListener("DOMContentLoaded", setup);