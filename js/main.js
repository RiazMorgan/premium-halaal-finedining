gsap.registerPlugin(ScrollTrigger);

/* ── Navbar scroll ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile menu ── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Hero parallax ── */
gsap.to('.hero-bg img', {
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  y: 120, ease: 'none'
});

/* ── Hero content entrance ── */
gsap.from('.hero-badge', { y: 30, duration: 1, delay: .3, ease: 'power3.out' });
gsap.from('.hero-title', { y: 50, duration: 1.1, delay: .5, ease: 'power3.out' });
gsap.from('.hero-sub',   { y: 30, duration: 1, delay: .75, ease: 'power3.out' });
gsap.from('.hero-btns',  { y: 25, duration: .9, delay: .95, ease: 'power3.out' });

/* ── Scroll reveal helper ── */
function reveal(selector, opts = {}) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  els.forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      y: opts.y ?? 40,
      scale: opts.scale ?? 1,
      duration: opts.duration ?? .9,
      delay: (opts.stagger ?? .12) * i,
      ease: 'power3.out'
    });
  });
}

reveal('.overline');
reveal('.section-title');
reveal('.feature-card', { stagger: .1 });
reveal('.product-card', { stagger: .12 });
reveal('.why-item', { stagger: .1 });
reveal('.testimonial-card', { stagger: .12 });
reveal('.stat-num', { y: 20, stagger: .1 });
reveal('.about-img-wrap', { y: 30 });
reveal('.about-content', { y: 30 });

/* ── Stats counter animation ── */
document.querySelectorAll('.stat-num[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.fromTo({ val: 0 }, { val: target, duration: 2, ease: 'power2.out',
        onUpdate: function() {
          el.textContent = (Number.isInteger(target) ? Math.round(this.targets()[0].val) : this.targets()[0].val.toFixed(1)) + suffix;
        }
      }, {});
    }
  });
});

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
});

/* ── Product card hover glow ── */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

/* ── Marquee pause on hover ── */
const marqueeTrack = document.querySelector('.marquee-track');
marqueeTrack?.closest('.marquee-strip')?.addEventListener('mouseenter', () => {
  marqueeTrack.style.animationPlayState = 'paused';
});
marqueeTrack?.closest('.marquee-strip')?.addEventListener('mouseleave', () => {
  marqueeTrack.style.animationPlayState = 'running';
});

/* ── Newsletter form ── */
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = 'Subscribed!';
  btn.style.background = '#2ecc71';
  input.value = '';
  setTimeout(() => { btn.textContent = 'Join Now'; btn.style.background = ''; }, 3000);
});
