const citis = document.getElementById("city");
const districts = document.getElementById("district");
const wards = document.getElementById("ward");


axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
   .then(response => response.data)
   .then(data => renderCity(data))
   .catch(error => console.error(error));

function renderCity(data) {
    citis.options.length = 1; // Reset options
    data.forEach(city => citis.options.add(new Option(city.Name, city.Id)));

    citis.onchange = function () {
        districts.options.length = 1; // Reset options
        wards.options.length = 1; // Reset options
        if (this.value!== "") {
            const selectedCity = data.find(city => city.Id === this.value);
            selectedCity.Districts.forEach(district => districts.options.add(new Option(district.Name, district.Id)));
        }
    };

    districts.onchange = function () {
        wards.options.length = 1; // Reset options
        if (this.value!== "") {
            const selectedCity = data.find(city => city.Id === citis.value);
            const selectedDistrict = selectedCity.Districts.find(district => district.Id === this.value);
            selectedDistrict.Wards.forEach(ward => wards.options.add(new Option(ward.Name, ward.Id)));
        }
    };
}