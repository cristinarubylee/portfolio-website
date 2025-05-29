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

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
});