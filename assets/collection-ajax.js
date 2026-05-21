/**
 * Filtros de colección AJAX — Section Rendering API
 */
(function () {
  const root = document.querySelector('[data-collection-root]');
  if (!root?.querySelector('.collection-layout--ajax')) return;

  const sectionId = root.dataset.collectionSection;
  const baseUrl = root.dataset.collectionUrl || window.location.pathname;

  const $ = (sel, ctx = root) => ctx.querySelector(sel);
  const $$ = (sel, ctx = root) => [...(ctx || root).querySelectorAll(sel)];

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function buildUrlFromForm() {
    const form = $('[data-collection-filters]');
    const url = new URL(baseUrl, window.location.origin);
    if (!form) return url.toString();

    const params = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (value !== '') params.append(key, value);
    });
    const sort = $('[data-sort-select]')?.value;
    if (sort) params.set('sort_by', sort);

    const qs = params.toString();
    return qs ? `${url.pathname}?${qs}` : url.pathname;
  }

  async function renderCollection(pageUrl) {
    const loading = $('[data-collection-loading]');
    const wrap = $('[data-collection-grid-wrap]');
    loading && (loading.hidden = false);
    wrap?.classList.add('is-loading');

    try {
      const url = new URL(pageUrl, window.location.origin);
      url.searchParams.set('section_id', sectionId);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const fresh = doc.querySelector('[data-collection-ajax-results]');
      const current = $('[data-collection-ajax-results]');

      if (fresh && current) {
        current.replaceWith(fresh);
        bindEvents();
        const clean = new URL(pageUrl, window.location.origin);
        history.pushState({ collectionAjax: true }, '', clean.pathname + clean.search);
        const countEl = document.querySelector('[data-collection-header-count]');
        const countText = $('[data-results-count]')?.textContent;
        if (countEl && countText) countEl.textContent = countText;
      }
    } catch (err) {
      console.error('Collection AJAX:', err);
      window.location.href = pageUrl;
    } finally {
      loading && (loading.hidden = true);
      $('[data-collection-grid-wrap]')?.classList.remove('is-loading');
    }
  }

  function bindEvents() {
    const form = $('[data-collection-filters]');
    const debouncedFilter = debounce(() => renderCollection(buildUrlFromForm()), 400);

    form?.querySelectorAll('[data-filter-input]').forEach((input) => {
      if (input.type === 'checkbox') {
        input.addEventListener('change', debouncedFilter);
      } else {
        input.addEventListener('change', debouncedFilter);
        input.addEventListener('blur', debouncedFilter);
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      renderCollection(buildUrlFromForm());
    });

    $('[data-filter-clear]')?.addEventListener('click', (e) => {
      e.preventDefault();
      renderCollection(baseUrl);
    });

    $('[data-sort-select]')?.addEventListener('change', () => {
      renderCollection(buildUrlFromForm());
    });

    $('[data-collection-pagination]')?.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link?.href) {
        e.preventDefault();
        renderCollection(link.href);
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    document.querySelectorAll('[data-filter-remove]').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        if (pill.href) renderCollection(pill.href);
      });
    });

    bindGridToggle();
    bindQuickAdd();
    bindFilterDrawer();
  }

  function bindFilterDrawer() {
    const drawer = document.querySelector('[data-filter-drawer]');
    const open = () => {
      drawer?.classList.add('is-open');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('filter-drawer-open');
    };
    const close = () => {
      drawer?.classList.remove('is-open');
      drawer?.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('filter-drawer-open');
    };
    document.querySelectorAll('[data-filter-drawer-open]').forEach((b) => {
      b.addEventListener('click', open);
    });
    document.querySelectorAll('[data-filter-drawer-close]').forEach((b) => {
      b.addEventListener('click', close);
    });
    document.querySelector('[data-filter-drawer-apply]')?.addEventListener('click', () => {
      renderCollection(buildUrlFromForm());
      close();
    });
  }

  function bindGridToggle() {
    const grid = $('[data-collection-grid]', root);
    const setGridCols = (cols) => {
      if (!grid) return;
      grid.style.setProperty('--cols-m', cols);
      grid.style.setProperty('--cols-t', cols);
      grid.style.setProperty('--cols-d', cols);
    };
    $$('[data-grid-toggle] [data-cols]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        setGridCols(btn.dataset.cols);
        $$('[data-grid-toggle] [data-cols]', root).forEach((b) => b.classList.toggle('is-active', b === btn));
      });
    });
  }

  function bindQuickAdd() {
    $$('[data-quick-add]', root).forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.quickAdd;
        const cartRoot = window.Shopify?.routes?.root || '/';
        await fetch(`${cartRoot}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: Number(id), quantity: 1 }] }),
        });
        document.querySelector('[data-cart-drawer]')?.classList.add('is-open');
        const res = await fetch(`${cartRoot}cart.js`);
        const cart = await res.json();
        document.querySelectorAll('[data-cart-count]').forEach((c) => { c.textContent = cart.item_count; });
      });
    });
  }

  window.addEventListener('popstate', (e) => {
    if (e.state?.collectionAjax) renderCollection(window.location.href);
  });

  bindEvents();
})();
