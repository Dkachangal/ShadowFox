let currentIdx = 0;
const slides = 4;
let isScrolling = false;

// Slide Logic
function slide(index) {
    // Switch to scroll behavior if width is less than 1300px
    if (window.innerWidth < 1300) {
        const sections = document.querySelectorAll('.left-side section');
        sections[index].scrollIntoView({ behavior: 'smooth' });
        return;
    }

    currentIdx = index;
    const leftWrapper = document.getElementById('left-wrapper');
    const rightWrapper = document.getElementById('right-wrapper');

    leftWrapper.style.transform = `translateY(-${currentIdx * 100}vh)`;
    rightWrapper.style.transform = `translateY(-${(slides - 1 - currentIdx) * 100}vh)`;
}

// Wheel Listener (Widescreen Only)
window.addEventListener('wheel', (e) => {
    if (window.innerWidth >= 1300 && !isScrolling) {
        isScrolling = true;
        if (e.deltaY > 0 && currentIdx < slides - 1) slide(currentIdx + 1);
        else if (e.deltaY < 0 && currentIdx > 0) slide(currentIdx - 1);
        
        setTimeout(() => { isScrolling = false; }, 900); 
    }
}, { passive: false });

// Reveal Observer for Vertical Scroll
function initAnimations() {
    if (window.innerWidth < 1300) {
        const observerOptions = { threshold: 0.2 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
}

window.onload = () => {
    if (window.innerWidth >= 1300) {
        const rightWrapper = document.getElementById('right-wrapper');
        rightWrapper.style.transform = `translateY(-${(slides - 1) * 100}vh)`;
    }
    initAnimations();
};

// Menu Toggle
const toggle = document.getElementById('mobile-toggle');
if (toggle) {
    toggle.addEventListener('click', () => {
        const links = document.getElementById('navLinks');
        links.style.display = (links.style.display === 'flex') ? 'none' : 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'fixed';
        links.style.top = '60px';
        links.style.left = '0';
        links.style.width = '100%';
        links.style.background = '#2d2d2d';
        links.style.padding = '20px 0';
    });
}