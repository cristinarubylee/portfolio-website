function toggleMenu() {
  const nav = document.querySelector('.header-nav ul');
  nav.classList.toggle('show');
}

function toggleDarkMode() {
  console.log("trying to switch!");
  const html = document.documentElement;
  html.classList.toggle('dark');

  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function smoothScroll(event, sectionId) {  
  event.preventDefault(); 

  if (sectionId == 'top'){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
});

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
                  form.reset();
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