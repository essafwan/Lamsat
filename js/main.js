// ===== Lamsat Studio — main.js =====

document.getElementById('year').textContent = new Date().getFullYear();

// Progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
});

// Navbar scrolled state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Hero parallax
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroBg.style.transform = `translateY(${offset * 0.15}px)`;
  });
}

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// RDV form -> WhatsApp
const PHONE = '32485569890';
const rdvForm = document.getElementById('rdvForm');
const formConfirm = document.getElementById('formConfirm');

rdvForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nom = document.getElementById('nom').value.trim();
  const telephone = document.getElementById('telephone').value.trim();
  const soin = document.getElementById('soin').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value.trim();

  let text = `Bonjour, je souhaite prendre rendez-vous chez Låmsat Studio.%0A`;
  text += `Nom : ${nom}%0A`;
  text += `Téléphone : ${telephone}%0A`;
  text += `Soin souhaité : ${soin}%0A`;
  if (date) text += `Date souhaitée : ${date}%0A`;
  if (message) text += `Message : ${message}%0A`;

  window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');

  formConfirm.textContent = 'Merci ! Votre demande a été préparée sur WhatsApp — envoyez le message pour la confirmer.';
  rdvForm.reset();
});
