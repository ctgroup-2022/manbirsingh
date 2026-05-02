// =========================================
// LOAD ANIMATION
// =========================================

window.addEventListener("load", () => {

    document.querySelectorAll(".hero-image img, .hero-title")
        .forEach(el => {
            el.style.opacity = "1";
        });

});


// =========================================
// SCROLL ANIMATIONS
// =========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            // COUNTER ANIMATION
            if (entry.target.classList.contains("stat-item")) {

                const counter = entry.target.querySelector(".stat-number");

                if (counter) {
                    animateCounter(counter);
                }

            }

        }

    });

}, observerOptions);


// OBSERVE ELEMENTS

document.querySelectorAll(".fade-up, .fade-left, .fade-right, .stat-item")
    .forEach(el => observer.observe(el));


// =========================================
// ABOUT SECTION OBSERVER
// =========================================

const aboutHeaderObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            const counters = entry.target.querySelectorAll(".stat-number");

            counters.forEach(counter => {

                if (!counter.classList.contains("counted")) {

                    animateCounter(counter);
                    counter.classList.add("counted");

                }

            });

        }

    });

}, { threshold: 0.3 });


// ABOUT SECTION

const aboutSection = document.querySelector(".about-section");

if (aboutSection) {
    aboutHeaderObserver.observe(aboutSection);
}


// =========================================
// COUNTER FUNCTION
// =========================================

function animateCounter(element) {

    const target = parseInt(element.getAttribute("data-count"));

    const duration = 2000;

    const increment = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {

        current += increment;

        if (current < target) {

            element.textContent =
                Math.floor(current).toLocaleString();

            requestAnimationFrame(updateCounter);

        } else {

            element.textContent =
                target.toLocaleString();

        }

    };

    updateCounter();

}


// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");

const navClose = document.getElementById("navClose");

const navLinks = document.getElementById("navLinks");


// OPEN MENU

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.add("active");

    });

}


// CLOSE MENU

if (navClose && navLinks) {

    navClose.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

}


// CLOSE MENU ON LINK CLICK

if (navLinks) {

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


// =========================================
// ABOUT SINGLE CARD ANIMATION
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".about-single-card");

    if (!section) return;

    function revealSection() {

        const sectionTop =
            section.getBoundingClientRect().top;

        const triggerPoint =
            window.innerHeight - 100;

        if (sectionTop < triggerPoint) {

            section.classList.add("about-show");

        }

    }

    window.addEventListener("scroll", revealSection);

    revealSection();

});


// =========================================
// ADVANCED PORTFOLIO SLIDER
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTS

    const slides =
        document.querySelectorAll(".portfolio-slide");

    const numbers =
        document.querySelectorAll(".slide-number");

    const nextBtn =
        document.querySelector(".next-btn");

    const prevBtn =
        document.querySelector(".prev-btn");

    const sliderWrapper =
        document.querySelector(".creative-wrapper");


    // CHECK IF EXISTS

    if (!slides.length) return;


    // VARIABLES

    let currentSlide = 0;

    let autoSlide;


    // =====================================
    // SHOW SLIDE
    // =====================================

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        numbers.forEach(num => {
            num.classList.remove("active-num");
        });

        slides[index].classList.add("active");

        if (numbers[index]) {
            numbers[index].classList.add("active-num");
        }

    }


    // =====================================
    // NEXT SLIDE
    // =====================================

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }


    // =====================================
    // PREVIOUS SLIDE
    // =====================================

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }


    // =====================================
    // AUTO SLIDE
    // =====================================

    function startSlider() {

        stopSlider();

        autoSlide = setInterval(() => {

            nextSlide();

        }, 6000);

    }


    // =====================================
    // STOP AUTO SLIDE
    // =====================================

    function stopSlider() {

        clearInterval(autoSlide);

    }


    // =====================================
    // NUMBER CLICK
    // =====================================

    numbers.forEach((num, index) => {

        num.addEventListener("click", () => {

            currentSlide = index;

            showSlide(currentSlide);

        });

    });


    // =====================================
    // BUTTON EVENTS
    // =====================================

    if (nextBtn) {
        nextBtn.addEventListener("click", nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevSlide);
    }


    // =====================================
    // STOP ON HOVER
    // =====================================

    if (sliderWrapper) {

        sliderWrapper.addEventListener(
            "mouseenter",
            stopSlider
        );

        sliderWrapper.addEventListener(
            "mouseleave",
            startSlider
        );

    }


    // =====================================
    // START
    // =====================================

    showSlide(currentSlide);

    startSlider();

});