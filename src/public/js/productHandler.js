const purchaseBtn = document.querySelector('#purchase_btn');
const quantityInput = document.getElementById('product_qty');
const formAlertDOM = document.querySelector('.form-alert')

document.addEventListener('DOMContentLoaded', function() {
    const purchasedItemsList = document.getElementById('purchased_items');

    const productName = document.querySelector('.text_box h2')
    const productPrice = document.querySelector('.cost p')
    const productImage = document.querySelector('.img_product_box img')
    const productId = window.location.pathname.split('/').pop();
    let purchasedItems = {};

    purchaseBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const quantity = quantityInput.value;
        try {
            addOrUpdatePurchasedItem(productId, productName.textContent, productPrice.textContent, productImage.src, quantity);
            await axios.post('/cart', {productId: productId, quantity: quantity});
        } catch(error){
            alert(error.response.data.msg)
        }
    });

    function addOrUpdatePurchasedItem(id, name, price, image, quantity) {
        if (purchasedItems[id]) {
            purchasedItems[id].quantity += parseInt(quantity);
        } else {
            purchasedItems[id] = { id, name, price, image, quantity: parseInt(quantity) };
        }

        if (purchasedItems[id].quantity <= 0) {
            delete purchasedItems[id];
        }

        updatePurchasedItemsDisplay();
        saveCartToStorage();
    }

    function updatePurchasedItemsDisplay() {
        purchasedItemsList.innerHTML = '';
        Object.values(purchasedItems).forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} - ${item.quantity} pcs - $${item.price * item.quantity}</span>
                <button class="remove-item" data-item-id="${item.id}">Remove</button>
            `;
            purchasedItemsList.appendChild(li);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault()
                const itemId = button.getAttribute('data-item-id');
                await axios.patch('/cart', { productId: productId });
                removePurchasedItem(itemId);
            });
        });
    }

    function removePurchasedItem(id) {
        delete purchasedItems[id];
        updatePurchasedItemsDisplay();
        saveCartToStorage();
    }

    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(purchasedItems));
    }

    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            purchasedItems = JSON.parse(storedCart);
            updatePurchasedItemsDisplay();
        }
    }

    loadCartFromStorage(); // Load the cart when the page loads
});
