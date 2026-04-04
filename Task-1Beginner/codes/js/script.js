let currentIdx = 0;
const slides = 6; // Updated to match your 6 HTML sections
const leftWrapper = document.getElementById('left-wrapper');
const rightWrapper = document.getElementById('right-wrapper');

/**
 * The CORE Slide Function
 * Moves the left side normally (0 to 500vh)
 * Moves the right side inversely (500vh to 0)
 */
function slide(index) {
    // Safety check: stay within 0 and 5
    if (index < 0) index = 0;
    if (index >= slides) index = slides - 1;

    currentIdx = index;

    // LEFT SIDE: Standard sequence (0, 100, 200, 300, 400, 500)
    leftWrapper.style.transform = `translateY(-${currentIdx * 100}vh)`;

    // RIGHT SIDE: Inverted sequence (500, 400, 300, 200, 100, 0)
    // Formula: (Total Slides - 1 - Current Index) * 100
    rightWrapper.style.transform = `translateY(-${(slides - 1 - currentIdx) * 100}vh)`;

    // Update active state in Navbar if you want
    updateNav(currentIdx);
}

/**
 * MOUSE WHEEL SUPPORT
 * Detects scroll direction and moves one slide at a time
 */
let isScrolling = false;
window.addEventListener('wheel', (e) => {
    if (window.innerWidth < 1300) return; // Disable on mobile
    if (isScrolling) return; // Debounce to prevent rapid skipping

    isScrolling = true;
    if (e.deltaY > 0) {
        slide(currentIdx + 1); // Scroll Down
    } else {
        slide(currentIdx - 1); // Scroll Up
    }

    // Wait for the CSS transition (0.85s) to finish before allowing next scroll
    setTimeout(() => {
        isScrolling = false;
    }, 1000); 
});

/**
 * NAVBAR HIGHLIGHTING
 */
function updateNav(index) {
    const buttons = document.querySelectorAll('.nav-links button');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.style.opacity = "1";
            btn.style.borderBottom = "2px solid white";
        } else {
            btn.style.opacity = "0.6";
            btn.style.borderBottom = "none";
        }
    });
}

// Initialize the first slide position on load
window.onload = () => {
    slide(0);
};