/**
 * Galería PDP estilo Sunny: carrusel de miniaturas con flechas + navegación imagen principal
 */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const gallery = $('[data-product-gallery]');
  if (!gallery) return;

  const slides = () => $$('[data-gallery-slide]', gallery);
  const thumbs = () => $$('[data-thumb]', gallery);
  let activeIndex = 0;

  const updateMainArrows = () => {
    const prev = $('[data-gallery-prev]', gallery);
    const next = $('[data-gallery-next]', gallery);
    const last = slides().length - 1;
    if (prev) prev.disabled = activeIndex <= 0;
    if (next) next.disabled = activeIndex >= last;
  };

  const setActive = (idx) => {
    const i = Math.max(0, Math.min(idx, slides().length - 1));
    activeIndex = i;
    slides().forEach((s) => s.classList.toggle('hidden', s.dataset.index !== String(i)));
    thumbs().forEach((t) => t.classList.toggle('is-active', t.dataset.thumb === String(i)));
    const activeThumb = $(`[data-thumb="${i}"]`, gallery);
    activeThumb?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    updateMainArrows();
  };

  thumbs().forEach((btn) => {
    btn.addEventListener('click', () => setActive(Number(btn.dataset.thumb)));
  });

  $('[data-gallery-prev]', gallery)?.addEventListener('click', () => setActive(activeIndex - 1));
  $('[data-gallery-next]', gallery)?.addEventListener('click', () => setActive(activeIndex + 1));
  updateMainArrows();

  const initThumbsCarousel = (root) => {
    const track = $('[data-thumbs-track]', root);
    const viewport = $('[data-thumbs-viewport]', root);
    const prev = $('[data-thumbs-prev]', root);
    const next = $('[data-thumbs-next]', root);
    if (!track || !viewport) return;

    const vertical = root.classList.contains('product-gallery__thumbs-carousel--vertical');
    const thumb = () => $('.product-gallery__thumb', track);
    if (!thumb()) return;

    const step = () => {
      const gap = parseFloat(getComputedStyle(track).gap) || 10;
      const el = thumb();
      return (vertical ? el.offsetHeight : el.offsetWidth) + gap;
    };

    const maxScroll = () => (vertical ? track.scrollHeight - viewport.clientHeight : track.scrollWidth - viewport.clientWidth);

    const updateArrows = () => {
      const max = maxScroll();
      const needsNav = max > 4;
      if (prev) {
        prev.hidden = !needsNav;
        prev.disabled = track.scrollTop <= 0 && track.scrollLeft <= 0;
      }
      if (next) {
        next.hidden = !needsNav;
        const atEnd = vertical
          ? track.scrollTop >= max - 2
          : track.scrollLeft >= max - 2;
        next.disabled = atEnd;
      }
    };

    const scrollBy = (dir) => {
      const delta = step() * (vertical ? 2 : 2) * dir;
      if (vertical) track.scrollBy({ top: delta, behavior: 'smooth' });
      else track.scrollBy({ left: delta, behavior: 'smooth' });
    };

    prev?.addEventListener('click', () => scrollBy(-1));
    next?.addEventListener('click', () => scrollBy(1));
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  };

  $$('[data-thumbs-carousel]', gallery).forEach(initThumbsCarousel);

  const lightbox = $('[data-product-lightbox]');
  const lbImg = $('[data-product-lightbox-img]', lightbox);
  const main = $('[data-gallery-main]', gallery);

  if (lightbox && lbImg && main?.classList.contains('product-gallery__main--zoom')) {
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
      if (e.target.closest('.product-gallery__arrow')) return;
      const img = e.target.closest('.product-gallery__image');
      if (!img || e.target.closest('.product-gallery__video')) return;
      openLightbox(img);
    });

    $$('[data-product-lightbox-close]', lightbox).forEach((b) => b.addEventListener('click', closeLightbox));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }
})();
