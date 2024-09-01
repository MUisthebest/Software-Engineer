const loginFormDOM = document.querySelector('.form')
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')

const oneDay = 1000 * 60 * 60 * 24

loginFormDOM.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = {username, password}
    try {
        const {data} = await axios.post('/login', {...user})
        document.cookie = `user=${JSON.stringify(data.user)}; expires=${new Date(Date.now() + oneDay)}`
        usernameInput.value = ''
        passwordInput.value = ''
        alert('Successfully logged in!')
        if (data.user.role === 'user'){
            window.location.href = '/'
        } else {
            window.location.href = '/admin'
        }

    } catch (error) {
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        alert(error.response.data.msg)
        passwordInput.value = ''
    }
})