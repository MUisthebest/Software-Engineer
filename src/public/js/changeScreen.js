

const toggle = document.querySelector('.toggle');

const point = document.querySelector('section');
const menu = document.querySelector('.menu')

const handleResize = () => {
    const screenWidth = window.innerWidth;
    const nav = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (screenWidth < 900) {
        nav.classList.add('but');
        toggle.classList.add('but');
        point.appendChild(menu) 
        if (menu){
            menu.onclick = function(){
                menu.classList.toggle('open')
            }
        }   
    } else {
        point.appendChild(menu) 
        if (menu){
            menu.onclick = function(){
                menu.classList.toggle('open')
            }
        }  
        // if (menu){
        //     point.removeChild(menu)
        // }
        nav.classList.remove('but');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('resize', handleResize);
    handleResize()
});


// function adjustNavMenu() {
//     const navList = document.querySelector('.nav__list');
//     const screenWidth = window.innerWidth;
//     const navMenu = document.querySelector('.nav__menu');
//     navMenu.classList.toggle('remove-menu')
//     if (screenWidth <= 1118) {
//         if (!document.querySelector('.choose4')) {
//             const btn4 = document.createElement('li');
//             btn4.className = 'choose4';
//             btn4.innerHTML = '<a href="/Trending" class="nav__link"><i class="bx bx-trending-up"></i></a>';
            
//             const btn5 = document.createElement('li');
//             btn5.className = 'choose5';
//             btn5.innerHTML = '<a href="/Contact" class="nav__link"><i class="bx bxs-contact"></i></a>';
            
//             const btn6 = document.createElement('li');
//             btn6.className = 'choose6';
//             btn6.innerHTML = '<a href="/" class="nav__link"><i class="bx bxs-home-circle"></i></a>';

//             const btn7 = document.createElement('li');
//             btn7.className = 'choose7';
//             btn7.innerHTML = '<a href="/Love" class="nav__link"><i class="bx bxs-book-heart"></i></a>';
            
//             const indicate = document.querySelector('.indicate');
//             navList.insertBefore(btn4, indicate);
//             navList.insertBefore(btn5, indicate);
//             navList.insertBefore(btn6, indicate);
//             navList.insertBefore(btn7, indicate);
//         }
//     } else {
//         const btn4 = document.querySelector('.choose4');
//         const btn5 = document.querySelector('.choose5');
//         const btn6 = document.querySelector('.choose6');
//         const btn7 = document.querySelector('.choose7');
//         navMenu.classList.toggle('remove-menu')
//         if (btn4) btn4.remove();
//         if (btn5) btn5.remove();
//         if (btn6) btn6.remove();
//         if (btn7) btn7.remove();
//     }

// }

// adjustNavMenu();

// window.addEventListener('resize', adjustNavMenu);
