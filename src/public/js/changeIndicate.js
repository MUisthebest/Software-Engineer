document.addEventListener("DOMContentLoaded", function() {
    const buy = document.querySelector('.choose1');
    const cart = document.querySelector('.choose2');
    const login = document.querySelector('.choose3');
    const currentUrl = window.location.href;

    updateSelectedButton(currentUrl);


    function updateSelectedButton(selected) {
        if (buy || cart || login){
            buy.classList.remove('select');
            cart.classList.remove('select');
            login.classList.remove('select');
            if (currentUrl.includes("Buy")) {
                buy.classList.add('select');
            } else if (currentUrl.includes("Cart")) {
                cart.classList.add('select');
            } else if (currentUrl.includes("Login")||currentUrl.includes("user")||currentUrl.includes("Register")) {
                login.classList.add('select');
            } 
        }
            

        
    }

});


