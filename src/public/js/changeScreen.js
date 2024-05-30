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

let cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        let selectedMonster = joinData[index];
        console.log(`You clicked on: ${selectedMonster.name}`);
        // Now you can use the selectedMonster as needed (e.g., display its details).
    });
});