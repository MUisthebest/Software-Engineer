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
        // addItem (e)
        // products[i].classList.add('heart')
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

// function addItem (e) {
//     let productId = e.target.getAttribute("id");
//     if(!wishList.find(element => element === productId)){
//         let productDiv = document.getElementById("product" + productId);

//         let wishDiv = document.createElement("div");
//         wishDiv.setAttribute("id", "wish" + productId);
//         wishDiv.setAttribute("class", "product");
//         wishDiv.setAttribute("style", "margin-bottom: 10px;")
//         // wishDiv.innerHTML += productDiv.innerHTML;
//         let removeBtn = document.createElement("input");
//         removeBtn.setAttribute("id", "remove" + productId);
//         removeBtn.setAttribute("type", "button");
//         removeBtn.setAttribute("value", "Remove");
//         // removeBtn.setAttribute("class", "removebut");
//         removeBtn.onclick = () => removeItem(productId);
//         wishDiv.appendChild(removeBtn);

//         let aside = document.getElementById("wishlist");
//         // aside.appendChild(wishDiv);

//         wishList.push(productId);
//     }
// }

// function removeItem(productId) {
//     document.getElementById("wish" + productId).remove();
//     wishList = wishList.filter(element => element !== productId)
// }
