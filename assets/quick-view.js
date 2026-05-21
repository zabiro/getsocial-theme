(function () {
  const modal = document.querySelector('[data-quick-view]');
  const body = document.querySelector('[data-quick-view-body]');
  if (!modal || !body) return;

  const close = () => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-quick-view-close]').forEach((b) => b.addEventListener('click', close));

  const formatMoney = (c) => (window.Shopify?.formatMoney ? Shopify.formatMoney(c) : (c / 100).toFixed(2));

  async function openQuickView(handle) {
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    body.innerHTML = `<p class="quick-view__loading">${window.themeStrings?.loading || 'Loading…'}</p>`;

    try {
      const p = await fetch(`/products/${handle}.js`).then((r) => r.json());
      const v = p.variants[0];
      let optionsHtml = '';
      if (p.variants.length > 1) {
        optionsHtml = `<select data-qv-variant>${p.variants.map((vr) =>
          `<option value="${vr.id}" data-price="${vr.price}" ${!vr.available ? 'disabled' : ''}>${vr.title}</option>`
        ).join('')}</select>`;
      } else {
        optionsHtml = `<input type="hidden" data-qv-variant value="${v.id}">`;
      }
      body.innerHTML = `
        <div class="quick-view__grid">
          <img src="${p.featured_image}" alt="${p.title}" width="400" height="500">
          <div>
            <h2>${p.title}</h2>
            <p class="quick-view__price" data-qv-price>${formatMoney(v.price)}</p>
            <div class="quick-view__desc">${p.description?.substring(0, 200) || ''}…</div>
            ${optionsHtml}
            <button type="button" class="button" data-qv-add ${!v.available ? 'disabled' : ''}>${window.themeStrings?.addToCart || 'Add to cart'}</button>
            <a href="${p.url}" class="button button--secondary">${window.themeStrings?.viewProduct || 'Ver producto'}</a>
          </div>
        </div>`;

      const variantEl = body.querySelector('[data-qv-variant]');
      const priceEl = body.querySelector('[data-qv-price]');
      const addBtn = body.querySelector('[data-qv-add]');

      variantEl?.addEventListener('change', () => {
        const opt = variantEl.selectedOptions[0];
        priceEl.textContent = formatMoney(Number(opt.dataset.price));
        addBtn.disabled = opt.disabled;
        addBtn.dataset.variantId = opt.value;
      });
      if (variantEl?.tagName === 'SELECT') addBtn.dataset.variantId = variantEl.value;
      else addBtn.dataset.variantId = variantEl.value;

      addBtn.addEventListener('click', async () => {
        const root = window.Shopify?.routes?.root || '/';
        await fetch(`${root}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: Number(addBtn.dataset.variantId), quantity: 1 }] }),
        });
        close();
        document.querySelector('[data-cart-drawer]')?.classList.add('is-open');
        const cart = await (await fetch(`${root}cart.js`)).json();
        document.querySelectorAll('[data-cart-count]').forEach((c) => {
          c.textContent = cart.item_count;
          c.hidden = cart.item_count === 0;
        });
      });
    } catch (e) {
      body.innerHTML = '<p>Error loading product</p>';
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quick-view]');
    if (btn?.dataset?.quickView) {
      e.preventDefault();
      openQuickView(btn.dataset.quickView);
    }
  });
})();
