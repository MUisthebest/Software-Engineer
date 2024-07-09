slideToggle = document.querySelector(".slidebar-toggle");
slideBar = document.querySelector(".slide-bar");
slideToggle.addEventListener("click", ()=>{
    slideBar.classList.toggle("hidden");
})

const changeObject = document.querySelector(".choose3");
const login = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", function() {
    if(login!==null){
        changeObject.innerHTML = `
            <li class="choose3">
                <a href="/User" class="nav__link"><i class='bx bxs-user-badge'></i></a>
            </li> 
        `
    }
    else{
        changeObject.innerHTML = `<li class="choose3">
        <a href="/Login" class="nav__link"><i class='fas fa-sign-in-alt'></i></a>
    </li> 
`        
    }
})