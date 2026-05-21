# GitHub + Shopify — actualizar el tema con push

Dos formas. La **A** es la más simple si tu plan de Shopify lo permite.

---

## A) Integración nativa Shopify ↔ GitHub (recomendada)

1. Sube el proyecto a un repo en GitHub (rama `main`).
2. En Shopify: **Tienda online → Temas**.
3. **Añadir tema → Conectar desde GitHub** (o “Connect to GitHub”).
4. Autoriza GitHub, elige el repo y la rama `main`.
5. Cada **push** a esa rama actualiza el tema en Shopify automáticamente.

Solo deben estar en el repo las carpetas del tema (`assets`, `config`, `layout`, etc.). Los ZIP y `license-server/` no hacen falta en GitHub.

---

## B) GitHub Actions (este repo ya incluye el workflow)

Archivo: `.github/workflows/deploy-theme.yml`

### 1. Token de tema en Shopify

1. **Configuración → Apps y canales de venta → Desarrollar apps**.
2. Crea una app personalizada (o usa una existente).
3. Configura acceso a **Temas** → lectura y escritura.
4. Instala la app en la tienda.
5. Copia el **Admin API access token** (o usa Theme Access / CLI token según tu flujo).

Documentación: [Shopify CLI - theme environments](https://shopify.dev/docs/storefronts/themes/tools/cli)

### 2. Secrets en GitHub

En el repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Valor |
|--------|--------|
| `SHOPIFY_CLI_THEME_TOKEN` | Token con permiso de temas |
| `SHOPIFY_STORE` | `prueba-tienda-3bmgzfei.myshopify.com` |

### 3. Push a `main`

Cada push ejecuta `shopify theme push --unpublished` y actualiza un tema **sin publicar** en la tienda. Revisa en **Temas** y publica cuando quieras.

---

## Subir el proyecto a GitHub (primera vez)

En PowerShell, desde la carpeta del tema:

```powershell
cd "D:\informacion\Nueva carpeta - copia\tema shopify custom"
git init
git add .
git commit -m "GetSocial Theme v1.6.0"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/getsocial-theme.git
git push -u origin main
```

Crea antes el repo vacío en GitHub (sin README si ya tienes uno local).

---

## Popup / cambios que no se ven

Si cambias código pero la tienda no se actualiza:

1. Confirma que el push llegó a GitHub (Actions en verde).
2. En Shopify, el tema conectado debe ser el de GitHub o el que actualiza Actions.
3. **Ctrl+F5** en el navegador y borra caché, o prueba ventana privada.
4. Para el popup: en consola (F12): `localStorage.removeItem('getsocial_newsletter_popup')`

---

## Sin GitHub

Sigue usando `getsocial-theme-v1.6.0.zip` o `.\scripts\dev-theme.ps1` cuando el CLI funcione.
