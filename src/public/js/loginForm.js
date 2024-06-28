const loginFormDOM = document.querySelector('.form')
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')

loginFormDOM.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = {username, password}
    try {
        const {data} = await axios.post('/login', {...user})
        localStorage.setItem('token', data.token)
        usernameInput.value = ''
        passwordInput.value = ''
        formAlertDOM.textContent = 'success'

        window.location.href = '/'

    } catch (error) {
        formAlertDOM.textContent = error.response.data.msg
        localStorage.removeItem('token')
        usernameInput.value = ''
        passwordInput.value = ''
    }
})