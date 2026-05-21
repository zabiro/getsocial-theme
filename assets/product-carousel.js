(function () {
  document.querySelectorAll('[data-product-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    if (!track || root.classList.contains('product-carousel--grid')) return;

    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const slide = root.querySelector('.product-carousel__slide');
    if (!slide) return;

    const step = () => {
      const gap = parseFloat(getComputedStyle(track).gap) || 16;
      return slide.offsetWidth + gap;
    };

    prev?.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    next?.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });
  });
})();
