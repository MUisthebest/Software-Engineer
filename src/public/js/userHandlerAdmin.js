const removeUserFormDOM = document.getElementById('remove-user-form')
const userIdFieldDOM = document.getElementById('userId')

document.getElementById('removeUserBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('removeFormPanel').style.display = 'block';
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('removeFormPanel').style.display = 'none';
    document.getElementById('authorityFormPanel').style.display = 'none';
});

removeUserFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    const userId = userIdFieldDOM.value
    try {
        const {data} = await axios.patch('/admin/users-management', {userId: userId})
        userIdFieldDOM.value = ''
        alert('Successfully removed user!')
        window.location.href = '/admin/users-management'
    } catch (error) {
        alert(error.response.data.msg)
    }
})