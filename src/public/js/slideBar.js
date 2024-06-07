slideToggle = document.querySelector(".slidebar-toggle");
slideBar = document.querySelector(".slide-bar");
slideToggle.addEventListener("click", ()=>{
    slideBar.classList.toggle("hidden");
})