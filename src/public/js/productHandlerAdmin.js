const addProductFormDOM = document.getElementById('product-form')
const removeProductFormDOM = document.getElementById('remove-product-form')
const idFieldDOM = document.getElementById('id')
const nameFieldDOM = document.getElementById('name')
const priceFieldDOM = document.getElementById('price')
const descFieldDOM = document.getElementById('desc')
const quantityFieldDOM = document.getElementById('quantity')
const imageDOM = document.getElementById('image')

document.getElementById('addProductBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('formPanel').style.display = 'block';
});

document.getElementById('removeProductBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('removeFormPanel').style.display = 'block';
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('formPanel').style.display = 'none';
    document.getElementById('removeFormPanel').style.display = 'none';
});

addProductFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    productName = nameFieldDOM.value
    price = priceFieldDOM.value
    desc = descFieldDOM.value
    quantity = quantityFieldDOM.value
    imageFile = imageDOM.files[0]

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('desc', desc);
    formData.append('quantity', quantity);
    formData.append('image', imageFile);
    
    try{
        const {data} = await axios.post('/admin/products-management', formData)
        nameFieldDOM.value = ''
        priceFieldDOM.value = ''
        descFieldDOM.value = ''
        quantityFieldDOM.value = ''
        imageDOM.value = ''
        alert('Successfully added new product!')
        window.location.href = '/admin/products-management'
    } catch (error) {
        alert(error.response.data.msg)
    }
})

removeProductFormDOM.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const productId = idFieldDOM.value
    try {
        const {data} = await axios.patch('/admin/products-management', {productId: productId})
        idFieldDOM.value = ''
        alert('Successfully removed product!')
        window.location.href = '/admin/products-management'
    } catch (error) {
        alert(error.response.data.msg)
    }
})