# Shopify CLI — error de certificado SSL

Si ves:

```text
unable to verify the first certificate
```

Node no confía en la conexión HTTPS hacia Shopify. Suele pasar por **antivirus**, **VPN** o **proxy** que intercepta HTTPS (Kaspersky, ESET, Avast, Zscaler, red corporativa).

---

## Solución rápida (desarrollo local)

Desde la raíz del tema:

```powershell
.\scripts\dev-theme.ps1
```

Ese script ejecuta `shopify theme dev` con `NODE_TLS_REJECT_UNAUTHORIZED=0` **solo en esa ventana de PowerShell**. No uses esto en producción ni en servidores.

---

## Volver a iniciar sesión en Shopify

Si el CLI te preguntó por **logout** y aceptaste, cerraste sesión. Tras arreglar SSL:

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED = '0'
shopify theme dev --store prueba-tienda-3bmgzfei.myshopify.com
```

Se abrirá el navegador para autorizar de nuevo.

---

## Soluciones más seguras (recomendadas)

### 1. Desactivar inspección HTTPS del antivirus

En el antivirus, busca “escaneo HTTPS”, “SSL inspection” o “certificado raíz” y desactívalo **solo para desarrollo**, o añade excepción para `*.shopify.com`.

### 2. Actualizar Shopify CLI

```powershell
npm install -g @shopify/cli@latest
```

### 3. Certificado extra (empresa / proxy)

Exporta el certificado raíz de tu proxy en formato `.pem` y en PowerShell:

```powershell
$env:NODE_EXTRA_CA_CERTS = "C:\ruta\al\certificado-empresa.pem"
shopify theme dev
```

---

## Tienda con contraseña

```powershell
.\scripts\dev-theme.ps1 --store-password TU_CONTRASEÑA_ESCAPARATE
```

La contraseña está en **Configuración → Preferencias → Contraseña de la tienda**.

---

## Sin CLI

Sigue usando `getsocial-theme-v1.6.0.zip` en **Temas → Subir tema** cada vez que quieras probar cambios grandes.
