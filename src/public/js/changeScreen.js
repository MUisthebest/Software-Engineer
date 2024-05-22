const showMenu = (idToggle,Idnav) =>{
    const toggle = document.getElementById(idToggle),
          nav = document.getElementById(Idnav)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }

showMenu('nav-toggle','nav-menu');

function change(){

    document.querySelector("#re").innerHTML = "Profile";
}