const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal sections as they enter the viewport; gracefully show everything without IntersectionObserver.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

// Small pointer parallax on desktop only. Disabled for touch and reduced-motion users.
const heroArt = document.querySelector('.hero-art');
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroArt.addEventListener('pointermove', event => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty('--pointer-x', `${x * 10}px`);
    heroArt.style.setProperty('--pointer-y', `${y * 10}px`);
  });
  heroArt.addEventListener('pointerleave', () => {
    heroArt.style.setProperty('--pointer-x', '0px');
    heroArt.style.setProperty('--pointer-y', '0px');
  });
}
