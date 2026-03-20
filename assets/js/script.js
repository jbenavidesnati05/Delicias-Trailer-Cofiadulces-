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

// ---------- SLIDER GALERÍA ----------
(function () {
  const track   = document.getElementById('sliderTrack');
  const dotsEl  = document.getElementById('sliderDots');
  if (!track) return;

  const slides  = track.querySelectorAll('.slide');
  const total   = slides.length;
  let current   = 0;
  let autoTimer = null;

  // Crear puntos
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot-btn' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Foto ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(index) {
    const prev = current;
    current = (index + total) % total;
    if (prev === current) return;

    // Fade out la slide que sale
    slides[prev].classList.add('leaving');
    setTimeout(() => slides[prev].classList.remove('leaving'), 400);

    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.dot-btn').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 3500);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  // Flechas
  document.querySelector('.slider-prev').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  document.querySelector('.slider-next').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Swipe táctil
  let touchStartX = 0;
  let touchDeltaX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (Math.abs(touchDeltaX) > 50) {
      goTo(touchDeltaX < 0 ? current + 1 : current - 1);
    }
    touchDeltaX = 0;
    startAuto();
  });

  // Drag en desktop
  let mouseStartX = 0;
  let isDragging  = false;

  track.addEventListener('mousedown', e => {
    mouseStartX = e.clientX;
    isDragging  = true;
    track.classList.add('dragging');
    stopAuto();
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    track.style.transform = `translateX(calc(-${current * 100}% + ${e.clientX - mouseStartX}px))`;
  });
  window.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const delta = e.clientX - mouseStartX;
    if (Math.abs(delta) > 60) goTo(delta < 0 ? current + 1 : current - 1);
    else goTo(current);
    startAuto();
  });

  startAuto();
})();

// ---------- Fade-in on scroll ----------
const fadeEls = document.querySelectorAll(
  '.historia-grid, .menu-card, .contacto-grid, h2, .section-eyebrow'
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

// ---------- Form validacion ----------
const form = document.getElementById('contactForm');
if (form) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById('error-' + fieldId);
    field.classList.add('invalid');
    if (err) err.textContent = msg;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById('error-' + fieldId);
    field.classList.remove('invalid');
    if (err) err.textContent = '';
  }

  // Limpiar error al escribir
  ['nombre', 'email', 'mensaje'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
  });

  form.addEventListener('submit', e => {
    let valid = true;

    const nombre  = document.getElementById('nombre').value.trim();
    const email   = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    clearError('nombre'); clearError('email'); clearError('mensaje');

    if (!nombre) {
      showError('nombre', 'Por favor ingresa tu nombre.');
      valid = false;
    }
    if (!email) {
      showError('email', 'Por favor ingresa tu correo electrónico.');
      valid = false;
    } else if (!EMAIL_RE.test(email)) {
      showError('email', 'Ingresa un correo electrónico válido.');
      valid = false;
    }
    if (!mensaje) {
      showError('mensaje', 'Por favor escribe tu mensaje.');
      valid = false;
    }

    if (!valid) e.preventDefault();
  });
}
