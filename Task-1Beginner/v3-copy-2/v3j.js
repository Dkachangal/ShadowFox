let currentIdx = 0;
const slides = 5;
let isScrolling = false;
const windowWidth = window.innerWidth;


// -------------------------------------------------------------------------------------------------------------------------------------------
// dekstop view - 1100 and above
if (windowWidth > 1100 || windowWidth === 1100) {
    // The single "Brain" function for all movement and styling
    function slide(index) {
        if (window.innerWidth < 1100) {
            const sections = document.querySelectorAll('.left-side section');
            sections[index]?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        currentIdx = index;
        const logo = document.querySelector('.logo');
        const navButtons = document.querySelectorAll('.nav-links button'); 

        // Update Nav Highlights
        navButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active-nav');
            } else {
                btn.classList.remove('active-nav');
            }
        });

        // Handle Colors based on Even/Odd index
        if (currentIdx % 2 === 0) {
            logo.style.color = "#c9c9c9"; // Light color for dark bg
            navButtons[index].style.borderColor = "#515151";
            navButtons[index].style.color = "#515151";
        } else {
            logo.style.color = "#515151"; // Dark color for light bg
            navButtons[index].style.borderColor = "#c9c9c9";
            navButtons[index].style.color = "#c9c9c9";
        }

        // Set other buttons to the theme color
        navButtons.forEach((btn, i) => {
            if (i !== index) {
                btn.style.color = (currentIdx % 2 === 0) ? "#515151" : "#c9c9c9";
                btn.style.borderColor = "transparent";
            }
        });

        const leftWrapper = document.getElementById('left-wrapper');
        const rightWrapper = document.getElementById('right-wrapper');

        leftWrapper.style.transform = `translateY(-${currentIdx * 100}vh)`;
        rightWrapper.style.transform = `translateY(-${(slides - 1 - currentIdx) * 100}vh)`;
    }

    // Unified Wheel Listener - ONE block, ONE call
    window.addEventListener('wheel', (e) => {
        if (window.innerWidth >= 1100 && !isScrolling) {
            let targetIdx = currentIdx;

            if (e.deltaY > 0 && currentIdx < slides - 1) {
                targetIdx = currentIdx + 1;
            } else if (e.deltaY < 0 && currentIdx > 0) {
                targetIdx = currentIdx - 1;
            }

            if (targetIdx !== currentIdx) {
                isScrolling = true;
                slide(targetIdx); // Only call slide once
                setTimeout(() => { isScrolling = false; }, 1000); 
            }
        }
    }, { passive: false });

    function initAnimations() {
        if (window.innerWidth < 1100) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('active');
                });
            }, { threshold: 0.2 });
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }
    }

    window.onload = () => {
        if (window.innerWidth >= 1100) {
            slide(0); // Initialize everything
        }
        initAnimations();
    };

    const toggle = document.getElementById('mobile-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const links = document.getElementById('navLinks');
            links.style.display = (links.style.display === 'flex') ? 'none' : 'flex';
        });
    }
} 
// -------------------------------------------------------------------------------------------------------------------------------------------


// MOBILE VIEW 
else {
    // MOBILE VIEW LOGIC
    console.log("Mobile Engine Active");

    function initMobileScroll() {
        const reveals = document.querySelectorAll('.m-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('m-active');
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(r => observer.observe(r));
    }

    // Toggle Menu
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('navLinks');
    if (toggle) {
        toggle.onclick = () => {
            nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
            nav.style.cssText = `
                display: ${nav.style.display === 'flex' ? 'flex' : 'none'};
                position: fixed; top: 8vh; right: 0; width: 60%;
                background: #515151; flex-direction: column; padding: 20px; z-index: 3000;
            `;
        };
    }

    initMobileScroll();
}
