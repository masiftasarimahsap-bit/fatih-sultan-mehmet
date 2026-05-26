// NAV scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// Quotes slider
const quotes = document.querySelectorAll('.quote');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showQuote(idx) {
  quotes[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + quotes.length) % quotes.length;
  quotes[current].classList.add('active');
  dots[current].classList.add('active');
}

document.querySelector('.q-next').addEventListener('click', () => showQuote(current + 1));
document.querySelector('.q-prev').addEventListener('click', () => showQuote(current - 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showQuote(i)));

// Auto-advance quotes
setInterval(() => showQuote(current + 1), 6000);

// Smooth active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) currentSection = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${currentSection}`
      ? 'var(--gold)'
      : '';
  });
});
