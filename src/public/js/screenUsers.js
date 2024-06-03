slideToggle = document.querySelector(".slidebar-toggle");
slideBar = document.querySelector("nav");
slideToggle.addEventListener("click", ()=>{
    slideBar.classList.toggle("close");
})