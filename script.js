/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});



/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 70) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon =
        menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});



/* =====================================================
   MOBILE DROPDOWNS
===================================================== */

const dropdownButtons =
    document.querySelectorAll(".dropdown-btn");


dropdownButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (window.innerWidth <= 768) {

            const dropdown =
                button.parentElement;

            document
                .querySelectorAll(".dropdown")
                .forEach(item => {

                    if (item !== dropdown) {

                        item.classList.remove("active");

                    }

                });

            dropdown.classList.toggle("active");

        }

    });

});



/* =====================================================
   CLOSE MOBILE MENU AFTER LINK
===================================================== */

document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });



/* =====================================================
   HERO PARALLAX
===================================================== */

const hero =
    document.querySelector(".hero");

const heroBackground =
    document.querySelector(".hero-background");


window.addEventListener("mousemove", event => {

    if (!heroBackground) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 80;

    const y =
        (window.innerHeight / 2 - event.clientY) / 80;

    heroBackground.style.transform =
        `scale(1.05) translate(${x}px, ${y}px)`;

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   3D ROOM CARD TILT
===================================================== */

const tiltCards =
    document.querySelectorAll(".tilt-card");


tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});



/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll("[data-count]");


let counterStarted = false;


function animateCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target =
            parseFloat(
                counter.getAttribute("data-count")
            );

        const isDecimal =
            target % 1 !== 0;

        let current = 0;

        const increment =
            target / 70;


        const update = () => {

            current += increment;

            if (current >= target) {

                current = target;

                counter.textContent =
                    isDecimal
                        ? current.toFixed(1)
                        : Math.floor(current).toLocaleString();

                return;

            }

            counter.textContent =
                isDecimal
                    ? current.toFixed(1)
                    : Math.floor(current).toLocaleString();

            requestAnimationFrame(update);

        };

        update();

    });

}


const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                animateCounters();

            }

        },

        {
            threshold: .4
        }

    );


statsObserver.observe(statsSection);



/* =====================================================
   RESTAURANT FILTER
===================================================== */

const menuTabs =
    document.querySelectorAll(".menu-tab");

const foodCards =
    document.querySelectorAll(".food-card");


menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        menuTabs.forEach(item => {

            item.classList.remove("active");

        });

        tab.classList.add("active");


        const category =
            tab.getAttribute("data-category");


        foodCards.forEach(card => {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.style.display = "block";

                requestAnimationFrame(() => {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                });

            } else {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(20px)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 300);

            }

        });

    });

});



/* =====================================================
   BOOKING MODAL
===================================================== */

const bookingModal =
    document.getElementById("bookingModal");


function openBooking() {

    bookingModal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeBooking() {

    bookingModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}



/* =====================================================
   RESERVATION MODAL
===================================================== */

const reservationModal =
    document.getElementById("reservationModal");


function openReservation() {

    reservationModal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeReservation() {

    reservationModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}



/* =====================================================
   CLOSE MODALS OUTSIDE
===================================================== */

window.addEventListener("click", event => {

    if (event.target === bookingModal) {

        closeBooking();

    }

    if (event.target === reservationModal) {

        closeReservation();

    }

});



/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeBooking();

        closeReservation();

        closeLightbox();

    }

});



/* =====================================================
   BOOKING FORM
===================================================== */

function submitBooking(event) {

    event.preventDefault();

    alert(
        "Thank you! Your booking request has been received. Our team will contact you shortly."
    );

    event.target.reset();

    closeBooking();

}



/* =====================================================
   TABLE RESERVATION
===================================================== */

function submitReservation(event) {

    event.preventDefault();

    alert(
        "Your table reservation request has been received. We will contact you shortly."
    );

    event.target.reset();

    closeReservation();

}



/* =====================================================
   CONTACT FORM
===================================================== */

function sendMessage(event) {

    event.preventDefault();

    alert(
        "Thank you! Your message has been received. We will contact you shortly."
    );

    event.target.reset();

}



/* =====================================================
   MINIMUM DATE
===================================================== */

const today =
    new Date().toISOString().split("T")[0];


document
    .querySelectorAll('input[type="date"]')
    .forEach(input => {

        input.setAttribute("min", today);

    });



/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src =
            image.src;

        lightbox.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("modal-open");

}



/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =====================================================
   SMOOTH ANCHOR SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function(event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });