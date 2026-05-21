(function () {
  if (!window.themeSettings?.predictiveSearch) return;
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-predictive-results]');
  if (!input || !results) return;

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 2) { results.innerHTML = ''; return; }
    timer = setTimeout(async () => {
      try {
        const res = await fetch(`/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product&resources[limit]=6`);
        const data = await res.json();
        const products = data.resources?.results?.products || [];
        if (!products.length) {
          results.innerHTML = '<p class="predictive-empty">Sin resultados</p>';
          return;
        }
        results.innerHTML = `<ul class="predictive-list">${products.map((p) =>
          `<li><a href="${p.url}"><img src="${p.featured_image?.url || ''}" alt="" width="48" height="48">${p.title}</a></li>`
        ).join('')}</ul>`;
      } catch (e) {
        results.innerHTML = '';
      }
    }, 280);
  });
})();
