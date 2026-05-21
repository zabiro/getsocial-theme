(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* --- Cart drawer --- */
  const cartDrawer = $('[data-cart-drawer]');
  const cartCount = $$('[data-cart-count]');
  const openCart = () => { cartDrawer?.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const closeCart = () => { cartDrawer?.classList.remove('is-open'); document.body.style.overflow = ''; };
  $$('[data-cart-open]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openCart(); }));
  $$('[data-cart-close]').forEach((el) => el.addEventListener('click', closeCart));

  const addToCart = async (variantId, qty = 1) => {
    const root = window.Shopify?.routes?.root || '/';
    await fetch(`${root}cart/add.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(variantId), quantity: qty }] }),
    });
    const cart = await (await fetch(`${root}cart.js`)).json();
    cartCount.forEach((c) => {
      c.textContent = cart.item_count;
      c.hidden = cart.item_count === 0;
    });
    openCart();
  };

  $$('[data-quick-add]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try { await addToCart(btn.dataset.quickAdd); } catch (err) { console.error(err); }
    });
  });

  /* --- Mobile menu --- */
  const mobileMenu = $('[data-mobile-menu]');
  $$('[data-mobile-menu-open]').forEach((b) => b.addEventListener('click', () => mobileMenu?.classList.add('is-open')));
  $$('[data-mobile-menu-close]').forEach((b) => b.addEventListener('click', () => mobileMenu?.classList.remove('is-open')));

  /* --- Search modal --- */
  const searchModal = $('[data-search-modal]');
  $$('[data-search-open]').forEach((b) => b.addEventListener('click', () => { searchModal.hidden = false; $('[data-search-input]', searchModal)?.focus(); }));
  $$('[data-search-close]').forEach((b) => b.addEventListener('click', () => { searchModal.hidden = true; }));

  /* --- Slideshow --- */
  const slideshow = $('[data-slideshow]');
  if (slideshow) {
    const slides = $$('[data-slide]', slideshow);
    const dots = $$('[data-slide-dot]', slideshow);
    let index = 0;
    const show = (i) => {
      slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
      dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
      index = i;
    };
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    if (slides.length > 1) setInterval(() => show((index + 1) % slides.length), 6000);
    show(0);
  }

  /* --- Testimonials --- */
  const testimonialRoot = $('[data-testimonials]');
  if (testimonialRoot) {
    const slides = $$('.testimonials__slide', testimonialRoot);
    let ti = 0;
    const showT = (i) => { slides.forEach((s, n) => s.classList.toggle('is-active', n === i)); ti = i; };
    $('[data-testimonial-prev]', testimonialRoot)?.addEventListener('click', () => showT((ti - 1 + slides.length) % slides.length));
    $('[data-testimonial-next]', testimonialRoot)?.addEventListener('click', () => showT((ti + 1) % slides.length));
  }

  /* --- Countdown --- */
  $$('[data-countdown]').forEach((el) => {
    const endStr = el.dataset.end?.replace(' ', 'T');
    const end = new Date(endStr).getTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n) => String(n).padStart(2, '0');
      if ($('[data-days]', el)) $('[data-days]', el).textContent = pad(d);
      if ($('[data-hours]', el)) $('[data-hours]', el).textContent = pad(h);
      if ($('[data-minutes]', el)) $('[data-minutes]', el).textContent = pad(m);
      if ($('[data-seconds]', el)) $('[data-seconds]', el).textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  });

  /* --- Gallery lightbox --- */
  const lightbox = $('[data-gallery-lightbox]');
  if (lightbox) {
    const lbImg = $('[data-gallery-lightbox-img]', lightbox);
    $$('[data-gallery-item]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const img = $('img', btn);
        if (img) { lbImg.src = img.src.replace(/width=\d+/, 'width=1400'); lightbox.hidden = false; }
      });
    });
    $('[data-gallery-close]', lightbox)?.addEventListener('click', () => { lightbox.hidden = true; });
  }

  /* Newsletter popup: sections/newsletter-popup.liquid */

  /* --- Cookie bar --- */
  const cookieBar = $('[data-cookie-bar]');
  if (cookieBar && !localStorage.getItem('getsocial_cookies')) {
    cookieBar.hidden = false;
    $('[data-cookie-accept]', cookieBar)?.addEventListener('click', () => {
      localStorage.setItem('getsocial_cookies', '1');
      cookieBar.hidden = true;
    });
  }

  /* --- Back to top --- */
  const backToTop = $('[data-back-to-top]');
  if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('is-visible', window.scrollY > 400));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* --- Sticky ATC --- */
  const stickyAtc = $('[data-sticky-atc]');
  const productFormEl = $('[data-product-form-el]');
  if (stickyAtc && productFormEl) {
    new IntersectionObserver(([e]) => stickyAtc.classList.toggle('is-visible', !e.isIntersecting)).observe(productFormEl);
  }

  /* --- Product gallery thumbs --- */
  $$('[data-thumb]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.thumb;
      $$('[data-gallery-slide]').forEach((s) => s.classList.toggle('hidden', s.dataset.index !== idx));
      $$('[data-thumb]').forEach((t) => t.classList.toggle('is-active', t === btn));
    });
  });

  /* --- Qty buttons --- */
  const qtyInput = $('[data-qty-input]');
  $('[data-qty-minus]')?.addEventListener('click', () => { if (qtyInput) qtyInput.value = Math.max(1, Number(qtyInput.value) - 1); });
  $('[data-qty-plus]')?.addEventListener('click', () => { if (qtyInput) qtyInput.value = Number(qtyInput.value) + 1; });

  /* --- Collection grid toggle --- */
  const grid = $('[data-collection-grid]');
  $$('[data-grid-toggle] [data-cols]').forEach((btn) => {
    btn.addEventListener('click', () => {
      grid?.classList.remove('grid--2', 'grid--3', 'grid--4');
      grid?.classList.add(`grid--${btn.dataset.cols}`);
      $$('[data-cols]', btn.parentElement).forEach((b) => b.classList.toggle('is-active', b === btn));
    });
  });

  if (!$('[data-collection-root]') && $('[data-sort-select]')) {
    $('[data-sort-select]').addEventListener('change', (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', e.target.value);
      window.location.href = url.toString();
    });
  }

  /* --- Copy link --- */
  $$('[data-copy-link]').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(btn.dataset.url);
      btn.textContent = '✓';
    });
  });

  /* --- Recently viewed --- */
  const rvSection = $('[data-recently-viewed]');
  const productSection = $('[data-product-section]');
  if (productSection) {
    const handle = productSection.dataset.productHandle;
    const key = 'getsocial_recently_viewed';
    let handles = JSON.parse(localStorage.getItem(key) || '[]').filter((x) => x !== handle);
    handles.unshift(handle);
    handles = handles.slice(0, 12);
    localStorage.setItem(key, JSON.stringify(handles));
  }
  if (rvSection) {
    const limit = Number(rvSection.dataset.limit) || 4;
    const handles = JSON.parse(localStorage.getItem('getsocial_recently_viewed') || '[]').slice(0, limit);
    if (handles.length) {
      rvSection.hidden = false;
      const gridRv = $('[data-recently-viewed-grid]', rvSection);
      const formatMoney = (cents) => {
        if (window.Shopify?.formatMoney) return Shopify.formatMoney(cents);
        return (cents / 100).toFixed(2);
      };
      Promise.all(handles.map((handle) =>
        fetch(`/products/${handle}.js`).then((r) => r.json()).catch(() => null)
      )).then((products) => {
        products.filter(Boolean).forEach((p) => {
          const card = document.createElement('article');
          card.className = 'product-card ratio-portrait';
          card.innerHTML = `
            <a href="${p.url}" class="product-card__media">
              <img src="${p.featured_image}" alt="${p.title}" loading="lazy" class="product-card__image">
            </a>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="${p.url}">${p.title}</a></h3>
              <span class="price__current">${formatMoney(p.price)}</span>
            </div>`;
          gridRv?.appendChild(card);
        });
      });
    }
  }

  /* --- Product JSON variants (basic) --- */
  const productJson = $('[data-product-json]');
  if (productJson) {
    try {
      const product = JSON.parse(productJson.textContent);
      const variantInput = $('[data-variant-input]');
      $$('.product-option input[type=radio]').forEach((input) => {
        input.addEventListener('change', () => {
          const options = $$('.product-option').map((fieldset) => {
            const checked = $('input:checked', fieldset);
            return checked ? checked.value : null;
          });
          const variant = product.variants.find((v) =>
            v.options.every((opt, i) => opt === options[i])
          );
          if (variant && variantInput) {
            variantInput.value = variant.id;
            const priceEl = $('[data-product-price]');
            if (priceEl) {
              priceEl.innerHTML = `<span class="price__current">${Shopify.formatMoney(variant.price)}</span>`;
            }
            const atc = $('[data-add-to-cart]');
            if (atc) {
              atc.disabled = !variant.available;
              atc.textContent = variant.available ? atc.dataset.labelInStock || 'Añadir al carrito' : 'Agotado';
            }
          }
        });
      });
    } catch (e) { /* noop */ }
  }

  /* --- Header hide on scroll --- */
  if (window.themeSettings?.headerScrollHide) {
    const header = document.querySelector('[data-site-header]');
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 120 && y > lastY) header?.classList.add('site-header--hidden');
      else header?.classList.remove('site-header--hidden');
      lastY = y;
    }, { passive: true });
  }

  /* --- Before / after --- */
  document.querySelectorAll('[data-before-after-slider]').forEach((slider) => {
    const wrap = slider.closest('[data-before-after]');
    slider.addEventListener('input', () => {
      wrap?.style.setProperty('--position', `${slider.value}%`);
    });
  });

  /* --- Age verifier --- */
  const ageVerifier = document.querySelector('[data-age-verifier]');
  if (ageVerifier && !localStorage.getItem('getsocial_age_ok')) {
    ageVerifier.hidden = false;
    document.body.style.overflow = 'hidden';
    ageVerifier.querySelector('[data-age-yes]')?.addEventListener('click', () => {
      localStorage.setItem('getsocial_age_ok', '1');
      ageVerifier.hidden = true;
      document.body.style.overflow = '';
    });
    ageVerifier.querySelector('[data-age-no]')?.addEventListener('click', (e) => {
      const url = e.currentTarget.dataset.redirect;
      window.location.href = url || 'https://www.google.com';
    });
  }

  /* --- Size chart modal --- */
  const sizeModal = document.querySelector('[data-size-chart-modal]');
  const sizeContent = document.querySelector('[data-size-chart-content]');
  document.querySelectorAll('[data-size-chart-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.sizeChartTarget;
      const source = id ? document.getElementById(id) : null;
      if (source && sizeContent && sizeModal) {
        sizeContent.innerHTML = source.innerHTML;
        sizeModal.hidden = false;
      }
    });
  });
  document.querySelectorAll('[data-size-chart-close]').forEach((b) => {
    b.addEventListener('click', () => { if (sizeModal) sizeModal.hidden = true; });
  });
})();
