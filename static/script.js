function toggleMenu() {
  const nav = document.querySelector('.nav ul');
  nav.classList.toggle('show');
}

function toggleDarkMode() {
  console.log("trying to switch!");
  const html = document.documentElement;
  html.classList.toggle('dark');

  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (form) {
      form.addEventListener('submit', async function(event) {
          event.preventDefault(); 
          
          const formData = new FormData(form);
          
          try {
              const response = await fetch('/contact', {
                  method: 'POST',
                  body: formData
              });
              
              const result = await response.json();

              alert(result.message);
              
              if (result.success) {
                  form.reset()
                  if (typeof grecaptcha !== 'undefined') {
                      grecaptcha.reset();
                  }
              }
          } catch (error) {
              alert("An error occurred while sending the message.");
          }
      });
  }
});

// Code for scrolling through sections with mouse and arrow keys
document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('keydown', handleKeyDown);

let isScrolling = false;
let currentSection = "top";
let isCentered = true;
const sectionOrder = ["top", "portfolio", "contact"];

function handleScroll(event) {
  if (isScrolling) {
    event.preventDefault();
    return;
  }
  const direction = event.deltaY > 0 ? 1 : -1;
  navigateToSection(direction, event);
}

function handleKeyDown(event) {
  if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
    return;
  }

  if (isScrolling) {
    event.preventDefault();
    return;
  }

  const direction = event.key === 'ArrowDown' ? 1 : -1;
  navigateToSection(direction, event);
}

function navigateToSection(direction, event) {
  const currentIndex = sectionOrder.indexOf(currentSection);
  const nextIndex = currentIndex + direction;

  if (nextIndex < 0 || nextIndex >= sectionOrder.length) {
    isCentered = false;
    return;
  }

  event.preventDefault();
  const nextSection = isCentered ? sectionOrder[nextIndex] : currentSection;
  isScrolling = true;

  smoothScroll(event, nextSection, () => {
    currentSection = nextSection;
    isScrolling = false;
    isCentered = true;
    accumulatedDelta = 0;
  });
}

function smoothScroll(event, sectionId, callback) {  
  event.preventDefault(); 

  if (sectionId == 'top'){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (callback && typeof callback === 'function') {
    detectScrollEnd(callback);
  }
}

function detectScrollEnd(callback) {
  let lastScrollTop = window.pageYOffset;
  
  function checkScrollEnd() {
    const currentScrollTop = window.pageYOffset;
    
    if (currentScrollTop === lastScrollTop) {
      callback();
    } else {
      lastScrollTop = currentScrollTop;
      setTimeout(checkScrollEnd, 20);
    }
  }
  
  setTimeout(checkScrollEnd, 80);
}
