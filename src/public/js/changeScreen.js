

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

let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.querySelector('.menu')

document.addEventListener("DOMContentLoaded", function() {

card.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e){
    newX = startX - e.clientX 
    newY = startY - e.clientY 
  
    startX = e.clientX
    startY = e.clientY

    card.style.top = (card.offsetTop - newY) + 'px'
    card.style.left = (card.offsetLeft - newX) + 'px'
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}
    window.addEventListener('resize', handleResize);
    handleResize()
});
