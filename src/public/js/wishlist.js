let wishList = [];

function setup() 
{
    let products = document.querySelectorAll(".luv");
    for (let i = 0; i < products.length; i++)
    {
        products[i].onclick = function(e) {
            addItem (e)
            products[i].classList.add('heart')
        }
    }
}

window.addEventListener("load", setup);

// function addItem (e) {
//     let productId = e.target.getAttribute("id");
//     if(!wishList.find(element => element === productId)){
//         let productDiv = document.getElementById("product" + productId);

//         let wishDiv = document.createElement("div");
//         wishDiv.setAttribute("id", "wish" + productId);
//         wishDiv.setAttribute("class", "product");
//         wishDiv.setAttribute("style", "margin-bottom: 10px;")
//         wishDiv.innerHTML += productDiv.innerHTML;
//         let removeBtn = document.createElement("input");
//         removeBtn.setAttribute("id", "remove" + productId);
//         removeBtn.setAttribute("type", "button");
//         removeBtn.setAttribute("value", "Remove");
//         // removeBtn.setAttribute("class", "removebut");
//         removeBtn.onclick = () => removeItem(productId);
//         wishDiv.appendChild(removeBtn);

//         let aside = document.getElementById("wishlist");
//         aside.appendChild(wishDiv);

//         wishList.push(productId);
//     }
// }