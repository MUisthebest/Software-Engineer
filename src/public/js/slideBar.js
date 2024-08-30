slideToggle = document.querySelector(".slidebar-toggle");
slideBar = document.querySelector(".slide-bar");
slideToggle.addEventListener("click", ()=>{
    slideBar.classList.toggle("hidden");
})

const changeObject = document.querySelector(".choose3");
const user = document.cookie.split(';').find(c => c.startsWith('user='));

document.addEventListener("DOMContentLoaded", function() {
    if (changeObject) {
        if(user){
            const data = user.split('user=')[1]
            const jsonData = JSON.parse(data);
            const userId = jsonData.userId;
            changeObject.innerHTML = `
                <li class="choose3">
                    <a href="/user" class="nav__link"><i class='bx bxs-user-badge'></i></a>
                </li> 
            `
        }
        else{
            changeObject.innerHTML = `<li class="choose3">
            <a href="/Login" class="nav__link"><i class='fas fa-sign-in-alt'></i></a>
        </li> 
    `        
        }
    }

})