/**
 * Pestañas de colección — cambia panel de productos
 */
(function () {
  document.querySelectorAll('[data-collection-tabs]').forEach((root) => {
    const tabs = root.querySelectorAll('[data-tab]');
    const panels = root.querySelectorAll('[data-tab-panel]');
    if (!tabs.length) return;

    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.tab;
        tabs.forEach((t) => {
          const active = t === btn;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach((p) => {
          p.classList.toggle('hidden', p.dataset.tabPanel !== idx);
        });
      });
    });
  });
})();
