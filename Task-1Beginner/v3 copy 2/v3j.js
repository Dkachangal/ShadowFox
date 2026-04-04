let currentIdx = 0;
const slides = 4;
let isScrolling = false;

// Slide Logic
// function slide(index) {
//     // Switch to scroll behavior if width is less than 1300px
//     if (window.innerWidth < 1300) {
//         const sections = document.querySelectorAll('.left-side section');
//         sections[index].scrollIntoView({ behavior: 'smooth' });
//         return;
//     }

//     currentIdx = index;
//     const leftWrapper = document.getElementById('left-wrapper');
//     const rightWrapper = document.getElementById('right-wrapper');

//     leftWrapper.style.transform = `translateY(-${currentIdx * 100}vh)`;
//     rightWrapper.style.transform = `translateY(-${(slides - 1 - currentIdx) * 100}vh)`;
// }

function slide(index) {
    if (window.innerWidth < 1300) {
        const sections = document.querySelectorAll('.left-side section');
        sections[index]?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    currentIdx = index;
    const logo = document.querySelector('.logo');
    const navButtons = document.querySelectorAll('.nav-links button'); // Get all buttons

    // --- 1. NAV HIGHLIGHTER LOGIC ---
    navButtons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active-nav');
        } else {
            btn.classList.remove('active-nav');
        }
    });

    // --- 2. COLOR TOGGLE LOGIC ---
    if (currentIdx % 2 === 0) {
        logo.style.color = "#c9c9c9";
        // Also update the active border color to match the theme
        navButtons[index].style.borderColor = "black";
        navButtons[index].style.color = "black";
    } else {
        logo.style.color = "#515151";
        navButtons[index].style.borderColor = "#c9c9c9";
        navButtons[index].style.color = "#c9c9c9";
    }

    // Clean up other buttons' colors so they don't stay black on a dark background
    navButtons.forEach((btn, i) => {
        if (i !== index) {
            btn.style.color = (currentIdx % 2 === 0) ? "black" : "#c9c9c9";
            btn.style.borderColor = "transparent";
        }
    });

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
    const logoColor = document.querySelector('.logo');
    if (!isScrolling) {
            // const logo = document.querySelector('.logo');

            // --- SCROLLED DOWN ---
            const logoColor = document.querySelector('.logo');
        let targetIdx = currentIdx; // Create a temporary "Target"

        if (e.deltaY > 0 && currentIdx < slides - 1) {
            targetIdx = currentIdx + 1; // We are GOING to this index
            isScrolling = true;
            
            // Check color for the TARGET, not the current
            if (targetIdx % 2 !== 0) {
                logoColor.style.color = "white";
            } else {
                logoColor.style.color = "black";
            }
            
            slide(targetIdx);
            setTimeout(() => { isScrolling = false; }, 900);
        } 
        else if (e.deltaY < 0 && currentIdx > 0) {
            targetIdx = currentIdx - 1; // We are GOING back to this index
            isScrolling = true;
            
            if (targetIdx % 2 !== 0) {
                logoColor.style.color = "white";
            } else {
                logoColor.style.color = "black";
            }
            
            slide(targetIdx);
            setTimeout(() => { isScrolling = false; }, 900);
        }
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