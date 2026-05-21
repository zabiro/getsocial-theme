/**
 * Interacciones tropicales (inspiradas en UX beauty premium)
 * Respeta prefers-reduced-motion
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sunnyBody = document.body.classList.contains('color-preset--sunny') ||
    document.body.classList.contains('color-preset--beauty');
  const animOn = window.themeSettings?.animations !== false;

  if (reduced || !animOn) return;

  /* Cursor suave (solo desktop, preset tropical) */
  if (sunnyBody && window.matchMedia('(pointer: fine)').matches) {
    const ring = document.createElement('div');
    ring.className = 'sunny-cursor';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf;

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      ring.classList.add('is-visible');
    }, { passive: true });

    document.addEventListener('mouseleave', () => ring.classList.remove('is-visible'));
    tick();

    document.querySelectorAll('a, button, .product-card, input, [data-cart-open]').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
  }

  /* Aparición al scroll */
  const revealEls = document.querySelectorAll(
    '.hero, .featured-collection, .tropical-showcase, .featured-product, .image-with-text, .site-footer, .product-card'
  );
  if (revealEls.length && 'IntersectionObserver' in window) {
    revealEls.forEach((el) => el.classList.add('sunny-reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* Decoraciones flotantes en escaparate tropical */
  document.querySelectorAll('.tropical-showcase__decor').forEach((decor, i) => {
    decor.classList.add('tropical-float');
    decor.style.animationDelay = `${i * 0.6}s`;
  });

  /* Hover imagen producto — zoom suave */
  document.querySelectorAll('.product-card__media').forEach((media) => {
    media.addEventListener('mouseenter', () => media.classList.add('is-zoomed'));
    media.addEventListener('mouseleave', () => media.classList.remove('is-zoomed'));
  });
})();
