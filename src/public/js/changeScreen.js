const showMenu = (idToggle,Idnav) =>{
    const toggle = document.getElementById(idToggle),
          nav = document.getElementById(Idnav)
 
    toggle.addEventListener('click', () =>{
        nav.classList.toggle('show-menu')
 
        toggle.classList.toggle('show-icon')
    })
 }

showMenu('nav-toggle','nav-menu');


function adjustNavMenu() {
    const navList = document.querySelector('.nav__list');
    const screenWidth = window.innerWidth;
    const navMenu = document.querySelector('.nav__menu');
    navMenu.classList.toggle('remove-menu')
    if (screenWidth <= 1118) {
        if (!document.querySelector('.choose4')) {
            const btn4 = document.createElement('li');
            btn4.className = 'choose4';
            btn4.innerHTML = '<a href="/Trending" class="nav__link"><i class="bx bx-trending-up"></i></a>';
            
            const btn5 = document.createElement('li');
            btn5.className = 'choose5';
            btn5.innerHTML = '<a href="/Contact" class="nav__link"><i class="bx bxs-contact"></i></a>';
            
            const btn6 = document.createElement('li');
            btn6.className = 'choose6';
            btn6.innerHTML = '<a href="/" class="nav__link"><i class="bx bxs-home-circle"></i></a>';

            const btn7 = document.createElement('li');
            btn7.className = 'choose7';
            btn7.innerHTML = '<a href="/Love" class="nav__link"><i class="bx bxs-book-heart"></i></a>';
            
            const indicate = document.querySelector('.indicate');
            navList.insertBefore(btn4, indicate);
            navList.insertBefore(btn5, indicate);
            navList.insertBefore(btn6, indicate);
            navList.insertBefore(btn7, indicate);
        }
    } else {
        const btn4 = document.querySelector('.choose4');
        const btn5 = document.querySelector('.choose5');
        const btn6 = document.querySelector('.choose6');
        const btn7 = document.querySelector('.choose7');
        navMenu.classList.toggle('remove-menu')
        if (btn4) btn4.remove();
        if (btn5) btn5.remove();
        if (btn6) btn6.remove();
        if (btn7) btn7.remove();
    }

}

adjustNavMenu();

window.addEventListener('resize', adjustNavMenu);
