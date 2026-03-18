// =============================================
// COFIADULCES — SCRIPTS
// =============================================

// ---------- NAVBAR scroll effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---------- Menu tabs ----------
const tabBtns   = document.querySelectorAll('.tab-btn');
const menuGrids = document.querySelectorAll('.menu-grid');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;

    tabBtns.forEach(b => b.classList.remove('active'));
    menuGrids.forEach(g => g.classList.remove('active'));

    btn.classList.add('active');
    document.querySelector(`.menu-grid[data-cat="${cat}"]`).classList.add('active');
  });
});

// ---------- Fade-in on scroll ----------
const fadeEls = document.querySelectorAll(
  '.historia-grid, .menu-card, .gal-item, .contacto-grid, h2, .section-eyebrow'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ---------- Form submit ----------
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('¡Mensaje enviado! Pronto nos pondremos en contacto.');
    form.reset();
  });
}
