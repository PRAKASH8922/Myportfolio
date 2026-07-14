/* ==========================================
   PORTFOLIO INTERACTIVE LOGIC (main.js)
   ========================================== */

/* ----- MOBILE MENU TRIGGER ----- */
function myMenuFunction() {
    const menuBtn = document.getElementById("myNavMenu");
    const menuIcon = document.querySelector(".nav-menu-btn i");
    
    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
        menuIcon.className = "uil uil-times"; // Change menu icon to Close icon
    } else {
        menuBtn.className = "nav-menu";
        menuIcon.className = "uil uil-bars"; // Reset to burger icon
    }
}

// Close mobile navigation menu on clicking a nav link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        const menuBtn = document.getElementById("myNavMenu");
        const menuIcon = document.querySelector(".nav-menu-btn i");
        if (menuBtn.classList.contains("responsive")) {
            menuBtn.className = "nav-menu";
            menuIcon.className = "uil uil-bars";
        }
    });
});

/* ----- NAVIGATION BAR SHADOW & SLIGHT SHRINK ON SCROLL ----- */
window.addEventListener("scroll", headerShadow);

function headerShadow() {
    const navHeader = document.getElementById("header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
        navHeader.style.background = "rgba(3, 0, 20, 0.85)";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.background = "rgba(3, 0, 20, 0.6)";
    }
}

/* ----- TYPING EFFECT ----- */
const typingEffect = new Typed(".typedText", {
    strings: ["Python Developer", "Django Developer", "Full Stack Developer"],
    loop: true,
    typeSpeed: 100, 
    backSpeed: 60,
    backDelay: 2000
});

/* ----- BACK TO TOP BUTTON VISIBILITY ----- */
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add("active");
    } else {
        backToTopBtn.classList.remove("active");
    }
});

/* ----- SCROLL REVEAL ANIMATIONS ----- */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 100,
    reset: false // Do not repeat animations on scroll up
});

// Home Page Elements
sr.reveal('.hero-badge', {});
sr.reveal('.hero-name', { delay: 100 });
sr.reveal('.hero-title', { delay: 200 });
sr.reveal('.hero-desc', { delay: 250 });
sr.reveal('.hero-buttons', { delay: 300 });
sr.reveal('.hero-socials', { delay: 350 });
sr.reveal('.hero-image-wrapper', { origin: 'bottom', delay: 400 });

// Headings & Section Titles
sr.reveal('.section-title', { origin: 'left' });

// About Section
sr.reveal('.about-card', { origin: 'left', delay: 200 });
sr.reveal('.highlight-box', { interval: 150, origin: 'right' });

// Skills Section
sr.reveal('.skills-card', { interval: 150, origin: 'bottom' });

// Experience Section
sr.reveal('.timeline-item', { interval: 200, origin: 'left' });
sr.reveal('.achievement-card', { interval: 150, origin: 'right' });

// Projects Section
sr.reveal('.project-card', { origin: 'bottom', delay: 200 });

// Certificates Section
sr.reveal('.certificate-item', { interval: 150, origin: 'bottom' });

// Resume Section
sr.reveal('.resume-preview-container', { origin: 'bottom', delay: 150 });

// Contact Section
sr.reveal('.contact-card', { interval: 150, origin: 'left' });
sr.reveal('.contact-form-panel', { origin: 'right', delay: 200 });

/* ----- SCROLL ACTIVE LINK NAVIGATION HIGHLIGHT ----- */
const sections = document.querySelectorAll('.id-section, section[id]');

function scrollActive() {
    const scrollY = window.scrollY;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120; // Offset for sticky navbar
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ----- CERTIFICATE LIGHTBOX MODAL FUNCTIONALITY ----- */
const modal = document.getElementById("cert-modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const modalDownload = document.getElementById("modal-download");

function openCertModal(imageSrc, captionText) {
    modalImg.src = imageSrc;
    modalCaption.innerText = captionText;
    modalDownload.href = imageSrc;
    modalDownload.download = captionText.replace(/\s+/g, '_') + '.jpg';
    modalImg.classList.remove("zoomed"); // Reset zoom state
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeCertModal() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scroll
}

function toggleModalZoom() {
    modalImg.classList.toggle("zoomed");
}

// Make functions globally accessible (since event handlers are in inline HTML attributes)
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;
window.toggleModalZoom = toggleModalZoom;

// Close modal on escape key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeCertModal();
    }
});

// Close modal when clicking outside the certificate content wrapper
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeCertModal();
    }
});

/* ----- CONTACT FORM & EMAILJS SUBMISSION ----- */
document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS with client key (from old main.js)
    emailjs.init("O2wBdJUG9L20MI6_v"); 

    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("form-submit-btn");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent standard submission
            
            // Set loading button state
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i class="uil uil-spinner-alt"></i>`;
            submitBtn.style.opacity = "0.7";

            // Submit values using EmailJS
            emailjs.sendForm('service_f34yowf', 'template_4xjakv6', form)
                .then(function (response) {
                    console.log("SUCCESS EmailJS response:", response);
                    alert("Your message was sent successfully!");
                    form.reset();
                })
                .catch(function (error) {
                    console.error("FAILED EmailJS error:", error);
                    alert("Oops! Failed to send message. Please check connection and try again.");
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.style.opacity = "1";
                });
        });
    }
});
