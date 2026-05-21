/**
 * Wishlist y comparador nativos (localStorage)
 */
(function () {
  const WISH_KEY = 'getsocial_wishlist';
  const CMP_KEY = 'getsocial_compare';
  const maxCompare = Number(window.themeSettings?.compareMax) || 4;

  const getWishlist = () => JSON.parse(localStorage.getItem(WISH_KEY) || '[]');
  const setWishlist = (arr) => localStorage.setItem(WISH_KEY, JSON.stringify(arr));
  const getCompare = () => JSON.parse(localStorage.getItem(CMP_KEY) || '[]');
  const setCompare = (arr) => localStorage.setItem(CMP_KEY, JSON.stringify(arr));

  const formatMoney = (cents) => {
    if (window.Shopify?.formatMoney) return Shopify.formatMoney(cents);
    return (cents / 100).toFixed(2);
  };

  function updateCounts() {
    const wish = getWishlist();
    const cmp = getCompare();
    document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
      el.textContent = wish.length;
      el.classList.toggle('has-items', wish.length > 0);
    });
    document.querySelectorAll('[data-compare-count]').forEach((el) => {
      el.textContent = cmp.length;
      el.classList.toggle('has-items', cmp.length > 0);
    });
    const bar = document.querySelector('[data-compare-bar]');
    if (bar) bar.classList.toggle('is-visible', cmp.length > 0);
    const barCount = document.querySelector('[data-compare-bar-count]');
    if (barCount) barCount.textContent = cmp.length;
  }

  function syncButtonStates() {
    const wish = getWishlist();
    const cmp = getCompare();
    document.querySelectorAll('[data-wishlist-toggle]').forEach((btn) => {
      const h = btn.dataset.productHandle;
      const on = wish.includes(h);
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on);
    });
    document.querySelectorAll('[data-compare-toggle]').forEach((btn) => {
      const h = btn.dataset.productHandle;
      btn.classList.toggle('is-active', cmp.includes(h));
      btn.disabled = !cmp.includes(h) && cmp.length >= maxCompare;
    });
  }

  document.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('[data-wishlist-toggle]');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const handle = wishBtn.dataset.productHandle;
      let list = getWishlist();
      if (list.includes(handle)) list = list.filter((h) => h !== handle);
      else list = [handle, ...list];
      setWishlist(list.slice(0, 50));
      updateCounts();
      syncButtonStates();
      document.dispatchEvent(new CustomEvent('getsocial:wishlist-updated'));
      return;
    }

    const cmpBtn = e.target.closest('[data-compare-toggle]');
    if (cmpBtn) {
      e.preventDefault();
      e.stopPropagation();
      const handle = cmpBtn.dataset.productHandle;
      let list = getCompare();
      if (list.includes(handle)) list = list.filter((h) => h !== handle);
      else {
        if (list.length >= maxCompare) return;
        list = [...list, handle];
      }
      setCompare(list);
      updateCounts();
      syncButtonStates();
      document.dispatchEvent(new CustomEvent('getsocial:compare-updated'));
    }
  });

  async function renderProductGrid(container, handles, emptyMsg) {
    if (!container) return;
    container.innerHTML = '';
    if (!handles.length) {
      container.innerHTML = `<p class="empty-state">${emptyMsg}</p>`;
      return;
    }
    const products = await Promise.all(
      handles.map((h) => fetch(`/products/${h}.js`).then((r) => r.json()).catch(() => null))
    );
    products.filter(Boolean).forEach((p) => {
      const el = document.createElement('article');
      el.className = 'product-card ratio-portrait';
      el.dataset.productHandle = p.handle;
      el.innerHTML = `
        <div class="product-card__actions-top">
          <button type="button" class="card-action is-active" data-wishlist-toggle data-product-handle="${p.handle}" aria-label="Wishlist">♥</button>
          <button type="button" class="card-action" data-compare-toggle data-product-handle="${p.handle}" aria-label="Compare">⇄</button>
        </div>
        <a href="${p.url}" class="product-card__media">
          <img src="${p.featured_image}" alt="${p.title}" loading="lazy" class="product-card__image">
        </a>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="${p.url}">${p.title}</a></h3>
          <span class="price__current">${formatMoney(p.price)}</span>
        </div>`;
      container.appendChild(el);
    });
    syncButtonStates();
  }

  async function renderCompareTable(container, handles) {
    if (!container) return;
    if (!handles.length) {
      container.innerHTML = `<p class="empty-state">${window.themeStrings?.compareEmpty || 'No hay productos'}</p>`;
      return;
    }
    const products = await Promise.all(
      handles.map((h) => fetch(`/products/${h}.js`).then((r) => r.json()).catch(() => null))
    );
    const valid = products.filter(Boolean);
    let html = '<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th></th>';
    valid.forEach((p) => {
      html += `<th><button type="button" data-compare-remove data-product-handle="${p.handle}">×</button><a href="${p.url}"><img src="${p.featured_image}" alt="" width="80"><br>${p.title}</a></th>`;
    });
    html += '</tr></thead><tbody>';
    html += '<tr><td>Precio</td>';
    valid.forEach((p) => { html += `<td>${formatMoney(p.price)}</td>`; });
    html += '</tr><tr><td>Marca</td>';
    valid.forEach((p) => { html += `<td>${p.vendor || '—'}</td>`; });
    html += '</tr><tr><td>Disponible</td>';
    valid.forEach((p) => { html += `<td>${p.available ? '✓' : '✗'}</td>`; });
    html += '</tr><tr><td>Tipo</td>';
    valid.forEach((p) => { html += `<td>${p.type || '—'}</td>`; });
    html += '</tr></tbody></table></div>';
    container.innerHTML = html;
    container.querySelectorAll('[data-compare-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setCompare(getCompare().filter((h) => h !== btn.dataset.productHandle));
        updateCounts();
        renderCompareTable(container, getCompare());
      });
    });
  }

  const wishlistGrid = document.querySelector('[data-wishlist-grid]');
  if (wishlistGrid) {
    const render = () => renderProductGrid(wishlistGrid, getWishlist(), window.themeStrings?.wishlistEmpty || 'Lista vacía');
    render();
    document.addEventListener('getsocial:wishlist-updated', render);
  }

  const compareTable = document.querySelector('[data-compare-table]');
  if (compareTable) {
    const render = () => renderCompareTable(compareTable, getCompare());
    render();
    document.addEventListener('getsocial:compare-updated', render);
  }

  document.querySelector('[data-compare-clear-all]')?.addEventListener('click', () => {
    setCompare([]);
    updateCounts();
    syncButtonStates();
    document.dispatchEvent(new CustomEvent('getsocial:compare-updated'));
  });

  window.themeSettings = window.themeSettings || {};
  window.themeSettings.compareMax = window.themeSettings.compareMax || maxCompare;

  updateCounts();
  syncButtonStates();
})();
