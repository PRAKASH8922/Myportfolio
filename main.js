/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }


/* ----- TYPING EFFECT ----- */
 var typingEffect = new Typed(".typedText",{
    strings : ["Fresher","Fullstack Developer","Video Editor","Photo Editor",],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive)

document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("O2wBdJUG9L20MI6_v"); // Replace with your actual public key

  // Select the form
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      console.log("Form submission triggered");

      // Send form data using EmailJS
      emailjs.sendForm('service_f34yowf', 'template_4xjakv6', form)
          .then(function (response) {
              console.log("EmailJS response:", response);
              alert("Message sent successfully!");
              form.reset();
          })
          .catch(function (error) {
              console.error("EmailJS error:", error);
              alert("Failed to send message. Please try again.");
          });
  });
});

function showDetails(section) {
  const title = document.getElementById("details-title");
  const content = document.getElementById("details-content");

  const details = {
      education: {
          title: "Education",
          content: [
              "🎓 Bachelor's Degree in Computer Science.",
              "💻 Specialized in Full Stack Development.",
              "🏅 Completed a 3-month intensive training in server installation and quality analysis."
          ]
      },
      projects: {
          title: "Projects",
          content: [
              "🛒 E-commerce website with Django and React.",
              "🤖 Price negotiation system using AI in Django.",
              "📊 Data visualization dashboard for business analytics."
          ]
      },
      certificate: {
          title: "Certificates",
          content: [
              "📜 Python Full Stack Development Certification.",
              "🖥️ Advanced Django and REST API Certification.",
              "🔍 Quality Analysis and Software Testing Certificate."
          ]
      }
  };

  // Update the title
  title.innerText = details[section].title;

  // Convert array content into a list
  content.innerHTML = details[section].content.map(item => `<li>${item}</li>`).join('');
}
