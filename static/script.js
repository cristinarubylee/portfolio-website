function toggleTheme() {
  event?.preventDefault();
  const html = document.documentElement;
  html.classList.toggle('dark');

  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  document.getElementById('icon-sun').classList.toggle('hidden', isDark);
  document.getElementById('icon-moon').classList.toggle('hidden', !isDark);
}


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitButton = form?.querySelector('button[type="submit"]');
  
  if (form && submitButton) {
      form.addEventListener('submit', async function(event) {
          event.preventDefault(); 
          
          submitButton.disabled = true;
          const originalText = submitButton.textContent;
          submitButton.textContent = 'Loading...'

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
          } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
      });
  }
});