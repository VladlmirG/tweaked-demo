const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close the menu and enable scrolling when a link is clicked
navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        navLinks.classList.remove('open');
        body.style.overflow = '';
    }
});

const cardBtn = document.querySelector('.card-btn');
const blogSection = document.querySelector('.blog');
let isCardVisible = false;

function applyScrollEffects() {
    const header = document.getElementById('header');

    // Apply effects based on visibility of .card-btn
    if (isCardVisible) {
        // Toggle .scroll-header class based on scroll position
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }

        const mainImage = document.querySelector('.main');
        const finalPositionMobile = 200; // For mobile screens (half the original)
        const finalPositionDesktop = 380; // For larger screens
        const maxScrollDistance = 600; // When the movement should stop

        // Calculate movement based on scroll
        const movePercentage = Math.min(window.scrollY / maxScrollDistance, 1); // Normalize to [0, 1]

        // Check if screen width is mobile
        if (window.innerWidth <= 768) { // Assuming mobile screens are 768px or less
            // Move the .main image up for mobile screens
            mainImage.style.transform = `translateY(-${finalPositionMobile * movePercentage}px)`;
        } else {
            // Move the .main image to the left for larger screens
            mainImage.style.transform = `translateX(-${finalPositionDesktop * movePercentage}px)`;
        }

        // Parallax effects
        document.querySelector(".saturn").style.marginTop = window.scrollY + "px";
        document.querySelector(".earth").style.marginTop = window.scrollY / 1.5 + "px";
        document.querySelector(".stars").style.marginTop = window.scrollY * 1 + "px";
        document.querySelector(".stars").style.marginRight = window.scrollY / 1 + "px";
        document.querySelector(".sat").style.transform = "rotate(-" + (window.scrollY / 20) + "deg)";
    } else {
        // Smoothly reset effects when .card-btn is not in view
        header.classList.remove('scroll-header');
        document.querySelector(".main").style.transform = "translate(0, 0)"; // Reset to original position
        cardBtn.style.transform = "translateX(0)"; // Reset to original position
        document.querySelector(".saturn").style.marginTop = "0px";
        document.querySelector(".earth").style.marginTop = "0px";
        document.querySelector(".stars").style.marginTop = "0px";
        document.querySelector(".stars").style.marginRight = "0px";
        document.querySelector(".sat").style.transform = "rotate(0deg)";
    }
}
// Observe when .card-btn enters or exits the viewport
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        isCardVisible = entry.isIntersecting;
        applyScrollEffects();
    });
}, { threshold: 0.01 });

cardObserver.observe(cardBtn);

// Always check for effects on scroll
window.addEventListener('scroll', applyScrollEffects);
