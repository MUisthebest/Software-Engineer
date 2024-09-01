const citis = document.getElementById("city");
const districts = document.getElementById("district");
const wards = document.getElementById("ward");

const registerFormDOM = document.querySelector('.form')
const nameInput = document.querySelector('.name-input')
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const confirmInput = document.querySelector('.confirm-pass-input')
const phoneInput = document.querySelector('.phone-input')


axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
   .then(response => response.data)
   .then(data => renderCity(data))
   .catch(error => console.error(error));

function renderCity(data) {
    citis.options.length = 1; // Reset options
    data.forEach(city => citis.options.add(new Option(city.Name, city.Name)));

    citis.onchange = function () {
        districts.options.length = 1; // Reset options
        wards.options.length = 1; // Reset options
        if (this.value!== "") {
            const selectedCity = data.find(city => city.Name === this.value);
            selectedCity.Districts.forEach(district => districts.options.add(new Option(district.Name, district.Name)));
        }
    };

    districts.onchange = function () {
        wards.options.length = 1; // Reset options
        if (this.value!== "") {
            const selectedCity = data.find(city => city.Name === citis.value);
            const selectedDistrict = selectedCity.Districts.find(district => district.Name === this.value);
            selectedDistrict.Wards.forEach(ward => wards.options.add(new Option(ward.Name, ward.Name)));
        }
    };
}

// Register Form
registerFormDOM.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const name = nameInput.value
    const username = usernameInput.value
    const password = passwordInput.value
    const confirmPassword = confirmInput.value
    const phone = phoneInput.value
    const city = citis.value;
    const district = districts.value
    const ward = wards.value
    const user = {
        name, username, password, confirmPassword, phone, city, district, ward
    }

    try {
        const {data} = await axios.post('/register', {...user})
        nameInput.value = '';
        usernameInput.value = '';
        passwordInput.value = '';
        confirmInput.value = '';
        phoneInput.value = '';
        citis.value = '';
        districts.value = '';
        wards.value = '';
        alert('Successfully registered account!')
        console.log(data);
        
        window.location.href = '/login'
    } catch (error) {
        alert(error.response.data.msg)
    }   
})