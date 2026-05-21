# GetSocial Theme v1.6

Tema Shopify **OS 2.0** para venta comercial — paquete premium con demos, landings y documentación de licencias.

## ZIPs (qué va en cada uno)

| Archivo | Para quién | Contenido |
|---------|------------|-----------|
| **`getsocial-theme-v1.6.0.zip`** | Subir a Shopify | Solo carpetas del tema (`assets`, `config`, `layout`, etc.) — **sin `docs/`** |
| **`getsocial-theme-client-v1.6.0.zip`** | Entregar al comprador | Tema + `LICENSE.md` + `LEEME.md` + `docs/` (guía, demos, landings) + `SECTIONS.md` |
| **Repositorio completo** | Tú (GetSocial) | Todo lo anterior + `docs/LICENCIAS.md`, `docs/CONTROL-LICENCIAS.md`, `license-server/` |

Regenerar ZIPs: `.\scripts\build-zips.ps1`

## GitHub → Shopify (push y se actualiza)

Ver **[docs/GITHUB-DEPLOY.md](docs/GITHUB-DEPLOY.md)** — integración nativa en admin o GitHub Actions (`.github/workflows/deploy-theme.yml`).

## Pack de 12 landing pages

Plantillas `page.landing-*` listas para campañas (ads, email, lanzamientos).

| Landing | Uso |
|---------|-----|
| flash-sale | Ofertas / Black Friday |
| launch | Lanzamiento producto |
| lead | Captación email |
| brand | Historia de marca |
| webinar | Registro evento |
| collection | Drop de colección |
| trust | Reseñas y prueba social |
| minimal | Un solo producto |
| holiday | Navidad / regalos |
| b2b | Mayoristas |
| preorder *(bonus)* | Pre-order |
| giveaway *(bonus)* | Sorteos |

**Cómo usar:** Páginas → Crear página → Plantilla → `landing-flash-sale` (etc.)  
Catálogo completo: **[docs/LANDING-PAGES.md](docs/LANDING-PAGES.md)**

## Cómo vender el tema (licencias)

| Documento | Para quién |
|-----------|------------|
| **[docs/LICENCIAS.md](docs/LICENCIAS.md)** | Tú — modelos de precio, Gumroad, claves, Theme Store |
| **[docs/CONTROL-LICENCIAS.md](docs/CONTROL-LICENCIAS.md)** | Cómo limitar uso en 2ª tienda / piratería |
| **[LICENSE.md](LICENSE.md)** | Comprador — contrato corto (personaliza nombre y email) |

Resumen rápido:

- **Licencia estándar** → 1 tienda, sin reventa del ZIP  
- **Licencia extendida** → varias tiendas o agencia  
- **Venta directa** (Gumroad, web propia) vs **Shopify Theme Store** (revisión oficial, comisión)

## Instalación

**Tienda de prueba:** `prueba-tienda-3bmgzfei.myshopify.com` (ver `shopify.theme.toml`)

```powershell
cd "ruta\al\tema shopify custom"
.\scripts\dev-theme.ps1
```

Si aparece **`unable to verify the first certificate`**, usa ese script o lee **[docs/CLI-SOLUCION-SSL.md](docs/CLI-SOLUCION-SSL.md)**.

Sin `shopify.theme.toml`: `shopify theme dev --store prueba-tienda-3bmgzfei.myshopify.com`

## Documentación

- [docs/GUIA-COMPRADOR.md](docs/GUIA-COMPRADOR.md) — Manual (exportar a PDF)  
- [docs/DEMOS.md](docs/DEMOS.md) — 6 demos inicio + colores  
- [SECTIONS.md](SECTIONS.md) — Catálogo de secciones  

## v1.5–v1.6

Quick view · AJAX filtros · Wishlist · Comparador · 6 demos home · Presets color · Filtros móvil · SEO JSON-LD · WhatsApp · +40 secciones

---

**GetSocial Theme** — desarrollado por **Luciano De Luque** para **GetSocial**.  
*Antes de vender: completa el email de soporte en `LICENSE.md`.*
