document.addEventListener("DOMContentLoaded", function() {
    const buy = document.querySelector('.choose1');
    const cart = document.querySelector('.choose2');
    const login = document.querySelector('.choose3');
    const c1 = document.querySelector('.c1');
    const c2 = document.querySelector('.c2');
    const c3 = document.querySelector('.c3');
    const c4 = document.querySelector('.c4');

    const selectedButton = sessionStorage.getItem('selectedButton');

    updateSelectedButton(selectedButton);

    buy.onclick = () => {
        sessionStorage.setItem('selectedButton', 'buy');
        updateSelectedButton('buy');
    };

    cart.onclick = () => {
        sessionStorage.setItem('selectedButton', 'cart');
        updateSelectedButton('cart');
    };

    login.onclick = () => {
        sessionStorage.setItem('selectedButton', 'login');
        updateSelectedButton('login');
    };

    c1.onclick = () => {
        sessionStorage.setItem('selectedButton', 'c');
        updateSelectedButton('c');
    };

    c2.onclick = () => {
        sessionStorage.setItem('selectedButton', 'c');
        updateSelectedButton('c');
    };

    c3.onclick = () => {
        sessionStorage.setItem('selectedButton', 'c');
        updateSelectedButton('c');
    };

    c4.onclick = () => {
        sessionStorage.setItem('selectedButton', 'c');
        updateSelectedButton('c');
    };


    function updateSelectedButton(selected) {
        buy.classList.remove('select');
        cart.classList.remove('select');
        login.classList.remove('select');
        if (selected === 'buy') {
            buy.classList.add('select');
        } else if (selected === 'cart') {
            cart.classList.add('select');
        } else if (selected === 'login') {
            login.classList.add('select');
        }
    }
});
