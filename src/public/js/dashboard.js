const welcomeDOM = document.querySelector('h1')

const showDashboard = () => {
    const token = localStorage.getItem('token')
    if (token){
        try {
            const data = axios.get('/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            welcomeDOM.innerHTML = `<h1>${data.msg}</h1>`

        } catch (error) {
            localStorage.removeItem('token')
        }
    }
}

showDashboard()