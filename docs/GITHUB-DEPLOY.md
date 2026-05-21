# GitHub + Shopify — actualizar el tema con push

Dos formas. La **A** es la más simple si tu plan de Shopify lo permite.

---

## A) Integración nativa Shopify ↔ GitHub (recomendada)

1. Repo en GitHub, rama `main`.
2. **Tienda online → Temas → Añadir tema → Conectar desde GitHub**.
3. Repo: `zabiro/getsocial-theme`, rama `main`.
4. Cada push actualiza el tema.

No necesitas GitHub Actions si usas esta opción.

---

## B) GitHub Actions (`deploy-theme.yml`)

Si el workflow **falla en rojo**, casi siempre faltan los **secrets** o el token no es de Theme Access.

### Paso 1 — App Theme Access (obligatorio)

1. En la tienda: instala **[Theme Access](https://apps.shopify.com/theme-access)** (gratis).
2. Abre la app → **Create theme access password**.
3. Permisos: al menos **Read and write themes**.
4. Copia la contraseña generada (solo se muestra una vez).

Documentación oficial: [Shopify CLI en CI/CD](https://shopify.dev/docs/storefronts/themes/tools/cli/ci-cd)

> No uses el Admin API token de una app custom para `theme push` en CI; usa la contraseña de **Theme Access**.

### Paso 2 — Secrets en GitHub

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Valor | Ejemplo |
|--------|--------|---------|
| `SHOPIFY_CLI_THEME_TOKEN` | Contraseña de Theme Access | `shpat_...` o la que da la app |
| `SHOPIFY_STORE` | Dominio de la tienda | `prueba-tienda-3bmgzfei.myshopify.com` |
| `SHOPIFY_THEME_ID` | *(opcional)* ID numérico del tema a actualizar | `123456789012` |

Para ver el **ID del tema**: en el admin, abre el tema → la URL contiene `themes/123456789012`.

Sin `SHOPIFY_THEME_ID`, el workflow crea/actualiza un **tema sin publicar**.

### Paso 3 — Probar de nuevo

1. Guarda los secrets.
2. **Actions → Deploy GetSocial Theme → Run workflow** (workflow_dispatch).
3. Debe quedar en verde. En **Temas** verás el tema actualizado.

### Errores frecuentes

| Error | Solución |
|-------|----------|
| `Missing secret SHOPIFY_CLI_THEME_TOKEN` | Crear el secret (paso 2) |
| `Invalid password` / `401` | Regenerar contraseña en Theme Access |
| `403` / permisos | La app Theme Access debe tener write themes |
| Workflow verde pero tienda igual | Usas otro tema en preview; publica o abre el tema correcto |

---

## Subir cambios desde tu PC

```powershell
cd "D:\informacion\Nueva carpeta - copia\tema shopify custom"
git add .
git commit -m "Descripción del cambio"
$env:GIT_SSL_NO_VERIFY = 'true'
git push origin main
```

---

## Sin GitHub Actions

- ZIP: `getsocial-theme-v1.6.0.zip`
- CLI local: `.\scripts\dev-theme.ps1` (cuando SSL lo permita)
