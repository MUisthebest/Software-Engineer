const generalTabDOM = document.querySelector('#account-general')
const changePasswordTabDOM = document.querySelector('#account-change-password')
const saveChangesDOM = document.getElementById('save-changes')
const editProfileFormDOM = document.getElementById('profile-form')
const changePasswordFormDOM = document.getElementById('edit-form')
const usernameFieldDOM = document.getElementById('username')
const nameFieldDOM = document.getElementById('name')
const phoneFieldDOM = document.getElementById('phone')
const curPasswordField = document.getElementById('curPassword')
const newPasswordField = document.getElementById('newPassword')
const confirmPasswordField = document.getElementById('confirmPassword');
const params = window.location.search
const id = new URLSearchParams(params).get('id')

saveChangesDOM.addEventListener('click', (e)=>{
    e.preventDefault()
    if (generalTabDOM.classList.contains('active')){
        editProfileFormDOM.dispatchEvent(new Event('submit'));
    }
    if (changePasswordTabDOM.classList.contains('active')){
        changePasswordFormDOM.dispatchEvent(new Event('submit'));
    }
})

editProfileFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = usernameFieldDOM.value
    const name = nameFieldDOM.value
    const phone = phoneFieldDOM.value

    try {
        const {data} = await axios.patch(`/user/edit-profile`, {name, username, phone})
        alert(data.msg)
        window.location.href = '/user'
    } catch (error) {
        alert(error.response.data.msg)
    }
})

changePasswordFormDOM.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const currentPassword = curPasswordField.value;
    const newPassword = newPasswordField.value;
    const confirmPassword = confirmPasswordField.value;

    try {
        const {data} = await axios.patch(`/user/change-password`, {currentPassword, newPassword, confirmPassword})
        curPasswordField.value = '';
        newPasswordField.value = '';
        confirmPasswordField.value = '';
        alert(data.msg)
        window.location.href = '/user'
    } catch (error) {
        alert(error.response.data.msg)
    }
})