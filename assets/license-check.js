/**
 * Verificación opcional de licencia — solo en theme editor (design mode).
 * El dueño del tema debe configurar license_api_url que devuelva { valid: boolean, message?: string }
 *
 * Ejemplo API (pseudo):
 * GET /api/verify?key=ABC&shop=mitienda.myshopify.com
 * → { "valid": true }  o  { "valid": false, "message": "Clave ya usada en otra tienda" }
 */
(function () {
  const cfg = window.getsocialLicense;
  const box = document.getElementById('getsocial-license-notice');
  const msg = document.querySelector('[data-license-msg]');
  if (!cfg || !box) return;

  const show = (text, invalid) => {
    box.hidden = false;
    if (msg) msg.textContent = text;
    box.classList.toggle('getsocial-license-notice--invalid', !!invalid);
  };

  if (!cfg.key) {
    show('Introduce tu clave de licencia en Configuración del tema → Licencia (opcional).', true);
    return;
  }

  if (!cfg.apiTemplate) return;

  let url = cfg.apiTemplate
    .replace(/\{key\}/g, encodeURIComponent(cfg.key))
    .replace(/\{shop\}/g, encodeURIComponent(cfg.shop));

  if (cfg.apiSecret) {
    url += (url.includes('?') ? '&' : '?') + 'secret=' + encodeURIComponent(cfg.apiSecret);
  }

  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (!data.valid) show(data.message || 'Licencia no válida para esta tienda.', true);
    })
    .catch(() => {
      show('No se pudo verificar la licencia (revisa la URL API).', true);
    });
})();
