const changePasswordFormDOM = document.querySelector('.edit-form')
const curPasswordField = document.getElementById('curPassword')
const newPasswordField = document.getElementById('newPassword')
const confirmPasswordField = document.getElementById('confirmPassword');
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')

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
        formAlertDOM.textContent = data.msg
    } catch (error) {
        formAlertDOM.textContent = error.response.data.msg
    }
})