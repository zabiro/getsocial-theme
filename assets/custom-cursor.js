/**
 * Cursor personalizable (estilo Sunny Hunny) — imagen, anillo o punto
 */
(function () {
  const cfg = window.themeSettings?.customCursor;
  if (!cfg?.enabled) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (cfg.hideOnProduct && document.body.classList.contains('template-product')) return;

  let style = cfg.style || 'ring';
  if (style === 'image' && !cfg.imageUrl) style = 'ring';

  const root = document.createElement('div');
  root.className = `custom-cursor custom-cursor--${style}`;
  root.setAttribute('aria-hidden', 'true');

  const inner = document.createElement('span');
  inner.className = 'custom-cursor__inner';
  root.appendChild(inner);
  document.body.appendChild(root);

  if (style === 'image' && cfg.imageUrl) {
    inner.style.backgroundImage = `url(${cfg.imageUrl})`;
  }

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;
  const smooth = cfg.smooth !== false;
  const ease = 0.18;

  const loop = () => {
    if (smooth) {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
    } else {
      rx = mx;
      ry = my;
    }
    root.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();

  document.addEventListener(
    'mousemove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!smooth) {
        rx = mx;
        ry = my;
      }
      root.classList.add('is-visible');
    },
    { passive: true }
  );

  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && e.target === document.documentElement) {
      root.classList.remove('is-visible');
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) root.classList.add('is-visible');
  });

  const hoverSel = 'a, button, .button, .product-card, input, select, textarea, [data-cart-open], [role="button"]';
  const setHover = (on) => {
    root.classList.toggle('is-hover', on);
    if (cfg.style === 'image' && cfg.imageHoverUrl) {
      inner.style.backgroundImage = on ? `url(${cfg.imageHoverUrl})` : `url(${cfg.imageUrl})`;
    }
  };

  document.addEventListener(
    'mouseover',
    (e) => {
      if (e.target.closest(hoverSel)) setHover(true);
    },
    { passive: true }
  );
  document.addEventListener(
    'mouseout',
    (e) => {
      if (e.target.closest(hoverSel)) setHover(false);
    },
    { passive: true }
  );
})();
