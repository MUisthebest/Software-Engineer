const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slides = document.querySelectorAll('.next');

const numberOfSlides = slides.length;

let slideNumber = 0;

nextBtn.onclick = () =>{
    slides.forEach((slide) => {
        slide.classList.remove('active');
    })

    slideNumber++;
    
    if(slideNumber > (numberOfSlides-1)){
        slideNumber = 0;
    }

    slides[slideNumber].classList.add('active');
}

prevBtn.onclick = () =>{
    slides.forEach((slide) => {
        slide.classList.remove('active');
    })

    slideNumber--;
    
    if(slideNumber < 0){
        slideNumber = numberOfSlides-1;
    }

    slides[slideNumber].classList.add('active');
}