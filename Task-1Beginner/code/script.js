let currentIdx = 0;
const slides = 5;
let isScrolling = false;
const windowWidth = window.innerWidth;

// -------------------------------------------------------------------------------------------------------------------------------------------
// DESKTOP VIEW - 1100 and above
if (windowWidth >= 1100) {

    // The single "Brain" function for all movement and styling
    function slide(index) {
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
            logo.style.color = "#c9c9c9";
            navButtons[index].style.borderColor = "#515151";
            navButtons[index].style.color = "#515151";
        } else {
            logo.style.color = "#515151";
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

    // Unified Wheel Listener
    window.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            let targetIdx = currentIdx;

            if (e.deltaY > 0 && currentIdx < slides - 1) {
                targetIdx = currentIdx + 1;
            } else if (e.deltaY < 0 && currentIdx > 0) {
                targetIdx = currentIdx - 1;
            }

            if (targetIdx !== currentIdx) {
                isScrolling = true;
                slide(targetIdx);
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        }
    }, { passive: false });

    // PROJECT SECTION LOGIC -------------------------------------------------------
    const projectData = [
        {
            title: "Vision-Based Virtual UI",
            desc: "Real-time hand tracking using MediaPipe and OpenCV. This system detects index finger coordinates to interact with virtual UI elements with zero latency",
            tags: ["Python", "OpenCV", "MediaPipe"],
            num: "01 / 03",
            link: "https://github.com/Dkachangal/AI-ML-with-Python"
        },
        {
            title: "Synthetic Script Generator",
            desc: "An image processing tool that converts digital text into realistic handwriting using KivyMD. Employs character-spacing algorithms to mimic human script",
            tags: ["Python", "KivyMD", "Pillow"],
            num: "02 / 03",
            link: "https://github.com/Dkachangal/Text-To-Handwriting"
        },
        {
            title: "Real-time FX Dashboard",
            desc: "A modular currency converter built with JS. Features asynchronous API fetching and a responsive interface",
            tags: ["JS", "CSS", "API"],
            num: "03 / 03",
            link: "https://github.com/Dkachangal/CurrencyConvertor",
        }
    ];

    let currentProj = 0;
    const pCards = document.querySelectorAll('.p-card');

    function updateProjectSection(idx) {
        pCards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            if (i === idx) card.classList.add('active');
            else if (i === idx - 1) card.classList.add('prev');
            else if (i === idx + 1) card.classList.add('next');
        });

        const container = document.getElementById('project-info-container');
        const liveLinkBtn = document.getElementById('currencyConvertorLive');

        container.style.opacity = 0;

        setTimeout(() => {
            const data = projectData[idx];
            document.getElementById('p-title').innerText = data.title;
            document.getElementById('p-desc').innerText = data.desc;
            document.querySelector('.p-num').innerText = data.num;
            document.getElementById('p-link').href = data.link;

            if (idx === 2) {
                liveLinkBtn.style.display = "inline-block";
            } else {
                liveLinkBtn.style.display = "none";
            }

            const tagContainer = document.getElementById('p-tags');
            tagContainer.innerHTML = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
            container.style.opacity = 1;
        }, 400);
    }

    // EXPERIENCE SECTION LOGIC ----------------------------------------------------
    /* --- EXPERIENCE DATA & MULTI-SLIDESHOW ENGINE --- */
    let currentIdx = 0;
    const slides = 5;
    let isScrolling = false;
    const windowWidth = window.innerWidth;

    // --- EXPERIENCE GLOBALS ---
    let slideshowInterval = null;
    let currentSubImg = 0;
    let currentMilestoneIdx = 0;

    const expMilestones = [
        {
            tag: "2025", count: "01 / 03", headline: "REHEARSING<br>LOGIC.",
            subDescriptions: [
                "PHASE 01: Problem identification and architectural mapping for the SIH '25 challenge.",
                "PHASE 02: Intensive development sprint, establishing core system logic and data flow.",
                "PHASE 03: Integrating real-time AI pipelines and optimizing processing latency.",
                "PHASE 04: UI/UX refinement to bridge technical backend complexity with user-centric design.",
                "PHASE 05: Final system audit of the Level 1 prototype submission.",
                "MILESTONE: Successfully cleared initial screening, placing within the top performing teams."
            ],
            images: [
                "./../assets/Experience/DCode6.jpg", "./../assets/Experience/DCode1.jpg",
                "./../assets/Experience/DCode3.jpg", "./../assets/Experience/DCode4.jpg",
                "./../assets/Experience/DCode5.jpg", "./../assets/Experience/DCode2.jpg"
            ],
            btn: "View SIH Solution —>", url: "https://github.com/Dkachangal/SIH-2025-26"
        },
        {
            tag: "2022", count: "02 / 03", headline: "COMMANDING<br>THE STAGE.",
            subDescriptions: [
                "In discussion with the Director during the residency phase of 'Fandi'.",
                "On stage at Shree Ram Centre (SRC) during the live performance.",
                "Final curtain call with the cast at the SRC main auditorium."
            ],
            images: [
                "./../assets/Experience/sir-src.jpg",
                "./../assets/Experience/stage-src.jpg",
                "./../assets/Experience/team-src.jpg"
            ],
            // Inside expMilestones[1] (SRC THEATRE)
            btn: `Watch Performance <img src='./../assets/yticon.png' alt='YouTube' class='yt-icon'> —>`,
            url: "https://www.youtube.com/watch?v=Q81t36LaJkc"
        },
        {
            tag: "2026", count: "03 / 03", headline: "PITCHING<br>CONCEPTS.",
            subDescriptions: ["Conceptualizing tech-driven solutions at the GLBITM Ideathon."],
            images: ["./../assets/Experience/ideathon.jpg"],
            btn: "View Certificate —>", url: "https://drive.google.com/file/d/1tTXVpO4V5-oDn0SFG605ofF9BdqycUqq/view?usp=drive_link"
        }
    ];

    // ---------------------------------------------------------------------------------------------------------
    // DESKTOP VIEW - 1100 and above
    if (windowWidth >= 1100) {

        // 1. MAIN NAVIGATION (VERTICAL SLIDE)
        function slide(index) {
            currentIdx = index;
            const logo = document.querySelector('.logo');
            const navButtons = document.querySelectorAll('.nav-links button');

            navButtons.forEach((btn, i) => {
                btn.classList.toggle('active-nav', i === index);
                btn.style.color = (currentIdx % 2 === 0) ? "#515151" : "#c9c9c9";
                btn.style.borderColor = (i === index) ? (currentIdx % 2 === 0 ? "#515151" : "#c9c9c9") : "transparent";
            });

            logo.style.color = (currentIdx % 2 === 0) ? "#c9c9c9" : "#515151";

            document.getElementById('left-wrapper').style.transform = `translateY(-${currentIdx * 100}vh)`;
            document.getElementById('right-wrapper').style.transform = `translateY(-${(slides - 1 - currentIdx) * 100}vh)`;
        }

        window.addEventListener('wheel', (e) => {
            if (!isScrolling) {
                let targetIdx = currentIdx;
                if (e.deltaY > 0 && currentIdx < slides - 1) targetIdx++;
                else if (e.deltaY < 0 && currentIdx > 0) targetIdx--;

                if (targetIdx !== currentIdx) {
                    isScrolling = true;
                    slide(targetIdx);
                    setTimeout(() => { isScrolling = false; }, 1000);
                }
            }
        }, { passive: false });

        // 2. PROJECT SECTION LOGIC
        const projectData = [
            { title: "Vision-Based Virtual UI", desc: "Real-time hand tracking using MediaPipe and OpenCV.", tags: ["Python", "OpenCV"], num: "01 / 03", link: "https://github.com/Dkachangal/AI-ML-with-Python" },
            { title: "Synthetic Script Generator", desc: "Converts digital text into realistic handwriting.", tags: ["Python", "KivyMD"], num: "02 / 03", link: "https://github.com/Dkachangal/Text-To-Handwriting" },
            { title: "Real-time FX Dashboard", desc: "Modular currency converter built with JS.", tags: ["JS", "API"], num: "03 / 03", link: "https://divyanshk-currency-converter.netlify.app/" }
        ];

        let currentProj = 0;
        function updateProjectSection(idx) {
            const pCards = document.querySelectorAll('.p-card');
            pCards.forEach((card, i) => {
                card.classList.remove('active', 'prev', 'next');
                if (i === idx) card.classList.add('active');
                else if (i === idx - 1) card.classList.add('prev');
                else if (i === idx + 1) card.classList.add('next');
            });

            const container = document.getElementById('project-info-container');
            container.style.opacity = 0;

            setTimeout(() => {
                const data = projectData[idx];
                document.getElementById('p-title').innerText = data.title;
                document.getElementById('p-desc').innerText = data.desc;
                document.querySelector('.p-num').innerText = data.num;
                document.getElementById('p-link').href = data.link;
                document.getElementById('p-tags').innerHTML = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
                container.style.opacity = 1;
            }, 400);
        }

        // 3. EXPERIENCE SECTION LOGIC (THE SYNCED SLIDESHOW)
        function updateDots(total, activeIdx) {
            const dotsContainer = document.getElementById('nav-dots-container');
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div');
                dot.className = i === activeIdx ? 'dot active' : 'dot';
                dotsContainer.appendChild(dot);
            }
        }

        function moveSlide(direction, milestoneData) {
            const mainImg = document.getElementById('main-exp-img');
            const summaryEl = document.getElementById('exp-summary');
            currentSubImg = (currentSubImg + direction + milestoneData.images.length) % milestoneData.images.length;

            mainImg.style.opacity = 0;
            summaryEl.style.opacity = 0;
            setTimeout(() => {
                mainImg.src = milestoneData.images[currentSubImg];
                summaryEl.innerText = milestoneData.subDescriptions[currentSubImg];
                updateDots(milestoneData.images.length, currentSubImg);
                mainImg.style.opacity = 1;
                summaryEl.style.opacity = 0.8;
            }, 400);
        }

        function swapExp(idx) {
            currentMilestoneIdx = idx;
            const data = expMilestones[idx];
            const mainImg = document.getElementById('main-exp-img');
            const infoBlock = document.getElementById('experience-info-block');

            clearInterval(slideshowInterval);
            document.querySelectorAll('.exp-thumb').forEach((t, i) => i === idx ? t.classList.add('active') : t.classList.remove('active'));

            infoBlock.style.opacity = 0;
            mainImg.style.opacity = 0;

            setTimeout(() => {
                document.getElementById('exp-count').innerText = data.count;
                document.getElementById('exp-headline').innerHTML = data.headline;
                document.getElementById('exp-summary').innerText = data.subDescriptions[0];
                document.getElementById('display-tag').innerText = data.tag;
                document.getElementById('exp-link').innerHTML = data.btn;
                document.getElementById('exp-link').href = data.url;

                currentSubImg = 0;
                mainImg.src = data.images[0];
                updateDots(data.images.length, 0);

                infoBlock.style.opacity = 1;
                mainImg.style.opacity = 1;

                if (data.images.length > 1) {
                    slideshowInterval = setInterval(() => moveSlide(1, data), 4000);
                }
            }, 400);
        }

        // Nav Listeners
        document.getElementById('nextBtn')?.addEventListener('click', () => { if (currentProj < projectData.length - 1) updateProjectSection(++currentProj); });
        document.getElementById('prevBtn')?.addEventListener('click', () => { if (currentProj > 0) updateProjectSection(--currentProj); });

        window.onload = () => {
            slide(0);
            updateProjectSection(0);
            swapExp(0);
        };

    }

    // Manual arrow clicks (Global scope for HTML onclick)
    function manualMove(dir) {
        clearInterval(slideshowInterval);
        const data = expMilestones[currentMilestoneIdx];
        moveSlide(dir, data);
        slideshowInterval = setInterval(() => moveSlide(1, data), 4000);
    }

    // Nav Listeners
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        if (currentProj < pCards.length - 1) {
            currentProj++;
            updateProjectSection(currentProj);
        }
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        if (currentProj > 0) {
            currentProj--;
            updateProjectSection(currentProj);
        }
    });

    // Initialize Desktop state
    window.onload = () => {
        slide(0);
        updateProjectSection(0);
        swapExp(0);
    };

} // END OF DESKTOP IF


// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MOBILE VIEW 
else {

    console.log("All mobile code is hrere!!!!");
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

    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('navLinks');
    if (toggle) {
        toggle.onclick = () => {
            nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
        };
    }

    initMobileScroll();
}