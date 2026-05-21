/**
 * Galería de producto: miniaturas + lightbox al hacer clic (zoom)
 */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const gallery = $('[data-product-gallery]');
  if (!gallery) return;

  $$('[data-thumb]', gallery).forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.thumb;
      $$('[data-gallery-slide]', gallery).forEach((s) => {
        s.classList.toggle('hidden', s.dataset.index !== idx);
      });
      $$('[data-thumb]', gallery).forEach((t) => t.classList.toggle('is-active', t === btn));
    });
  });

  const lightbox = $('[data-product-lightbox]');
  const lbImg = $('[data-product-lightbox-img]', lightbox);
  const main = $('[data-gallery-main]', gallery);
  if (!lightbox || !lbImg || !main?.classList.contains('product-gallery__main--zoom')) return;

  const openLightbox = (img) => {
    if (!img?.src) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  main.addEventListener('click', (e) => {
    const img = e.target.closest('.product-gallery__image');
    if (!img || e.target.closest('.product-gallery__video')) return;
    openLightbox(img);
  });

  $$('[data-product-lightbox-close]', lightbox).forEach((b) => {
    b.addEventListener('click', closeLightbox);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();
