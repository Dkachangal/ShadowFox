let currentIdx = 0;
const slides = 4;
let isScrolling = false;


function slide(index) {
    if (window.innerWidth < 1300) {
        const sections = document.querySelectorAll('.left-side section');
        sections[index]?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    currentIdx = index;
    const logo = document.querySelector('.logo');
    const navButtons = document.querySelectorAll('.nav-links button'); 

    
    navButtons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active-nav');
        } else {
            btn.classList.remove('active-nav');
        }
    });

    
    if (currentIdx % 2 === 0) {
        logo.style.color = "#c9c9c9";

        navButtons[index].style.borderColor = "black";
        navButtons[index].style.color = "black";
    } else {
        logo.style.color = "#515151";
        navButtons[index].style.borderColor = "#c9c9c9";
        navButtons[index].style.color = "#c9c9c9";
    }

    
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


window.addEventListener('wheel', (e) => {
    if (window.innerWidth >= 1300 && !isScrolling) {
        isScrolling = true;
        if (e.deltaY > 0 && currentIdx < slides - 1) slide(currentIdx + 1);
        else if (e.deltaY < 0 && currentIdx > 0) slide(currentIdx - 1);
        
        setTimeout(() => { isScrolling = false; }, 900); 
    }
    const logoColor = document.querySelector('.logo');
    if (!isScrolling) {
            

            
            const logoColor = document.querySelector('.logo');
        let targetIdx = currentIdx; 

        if (e.deltaY > 0 && currentIdx < slides - 1) {
            targetIdx = currentIdx + 1; 
            isScrolling = true;
            
            
            if (targetIdx % 2 !== 0) {
                logoColor.style.color = "white";
            } else {
                logoColor.style.color = "black";
            }
            
            slide(targetIdx);
            setTimeout(() => { isScrolling = false; }, 900);
        } 
        else if (e.deltaY < 0 && currentIdx > 0) {
            targetIdx = currentIdx - 1; 
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