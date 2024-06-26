const loginFormDOM = document.querySelector('.form')
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')

loginFormDOM.addEventListener('submit', function(e){
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password)
        return;

    const user = {username, password}
    try {
        axios.post('/login', {...user})
        usernameInput.value = ''
        passwordInput.value = ''

        window.location.href = '/'
    } catch (error) {
        console.log(error);
    }
})