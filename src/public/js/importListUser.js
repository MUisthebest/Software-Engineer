var typed = new Typed(".input",{
    strings:[`Welcome to our online web store, your one-stop shop for electronic purchases. 
    We are here to cater to your needs and preferences with our curated selection of electronics. 
    No matter if you are seeking for a specific product or just browsing, our website has it all. `,
            `Our team has dedicated to making the website as easy and comfortable for you to use and enjoy. 
            We offer fair prices, security and scam-free store so you don't need to worry about anything and just experience the wonders of shopping. 
            `,
        `Join our growing community of satisfied customers and discover the joy of shopping online with us.
So what are you waiting for? Go find the product of your liking and be satisfied with it! 
If you have any problems or questions, you can email us and we will help with it. `],
        typeSpeed: 40,
        backSpeed: 8,
        loop: true
})

document.addEventListener("DOMContentLoaded", function() {
    const c5 = document.querySelector('.hp-btn');
    c5.onclick = () => {
        sessionStorage.setItem('selectedButton', 'buy');
        updateSelectedButton('buy');
    };
})