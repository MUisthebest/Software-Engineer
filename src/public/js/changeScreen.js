const toggle = document.querySelector('.toggle');
const point = document.querySelector('section');
const menu = document.querySelector('.menu');

const handleResize = () => {
    const screenWidth = window.innerWidth;
    const nav = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');
    if (screenWidth < 900) {
        nav.classList.add('but');
        toggle.classList.add('but');
        if (!menu) {
            alert('ok');
            point.appendChild(menu);
        }
        if (menu) {
            menu.onclick = function() {
                menu.classList.toggle('open');
            };
        }
    } else {
        point.appendChild(menu);
        if (menu) {
            menu.onclick = function() {
                menu.classList.toggle('open');
            };
        }
        nav.classList.remove('but');
    }
};

let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.querySelector('.menu');

document.addEventListener("DOMContentLoaded", function() {
    card.addEventListener('mousedown', mouseDown);
    card.addEventListener('touchstart', touchStart);

    function mouseDown(e) {
        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function touchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', touchEnd);
    }

    function mouseMove(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        card.style.top = (card.offsetTop - newY) + 'px';
        card.style.left = (card.offsetLeft - newX) + 'px';
    }

    function touchMove(e) {
        newX = startX - e.touches[0].clientX;
        newY = startY - e.touches[0].clientY;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        card.style.top = (card.offsetTop - newY) + 'px';
        card.style.left = (card.offsetLeft - newX) + 'px';
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
    }

    function touchEnd() {
        document.removeEventListener('touchmove', touchMove);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
