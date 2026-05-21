# API de licencias GetSocial — Hosting propio

Servidor mínimo que valida **1 clave = 1 tienda Shopify**.

## Cómo funciona

```
[Tema en Shopify]  --fetch-->  [tu-hosting.com/api/verify.php?key=XXX&shop=tienda.myshopify.com]
                                      |
                                      v
                               licenses.json (clave → tienda)
```

1. **Primera vez** que una tienda usa la clave → se **activa** y queda ligada a `tienda.myshopify.com`.
2. **Misma tienda** otra vez → `valid: true`.
3. **Otra tienda** con la misma clave → `valid: false` (“ya usada en otra tienda”).

## Instalación en hosting (cPanel / PHP)

1. Sube la carpeta `public/` a tu hosting, por ejemplo:
   - `https://tudominio.com/getsocial-license/verify.php`
2. Crea la carpeta `storage/` **fuera** de `public_html` (o protegida con `.htaccess`):
   - Ruta: `/home/usuario/getsocial-license-storage/licenses.json`
3. Edita `public/verify.php` línea `STORAGE_FILE` con la ruta absoluta al JSON.
4. Copia `storage/licenses.example.json` → `licenses.json` y añade claves tras cada venta.

### Añadir una licencia manualmente

En `licenses.json`:

```json
{
  "GS-A1B2-C3D4": {
    "email": "cliente@mail.com",
    "shop": null,
    "max_shops": 1,
    "created": "2026-05-21"
  }
}
```

`shop: null` = aún no activada. La primera petición desde una tienda la fija.

### Configurar el tema Shopify

**Configuración del tema → Licencia (opcional)**

| Campo | Valor |
|-------|--------|
| Activar comprobación | ✓ |
| Clave de licencia | (la envía el cliente) |
| URL API | `https://tudominio.com/getsocial-license/verify.php?key={key}&shop={shop}` |

## Seguridad recomendada

- Usa **HTTPS** obligatorio.
- Opcional: define `API_SECRET` en `verify.php` y pasa `&secret=TU_SECRETO` (actualiza `license-check.js` si lo usas).
- No subas `licenses.json` a una URL pública.
- Haz copia de seguridad del JSON.

## Probar en el navegador

```
https://tudominio.com/getsocial-license/verify.php?key=GS-TEST-0001&shop=mitienda.myshopify.com
```

Respuesta esperada:

```json
{ "valid": true, "message": "Licencia activada para mitienda.myshopify.com" }
```

Segunda tienda con la misma clave:

```json
{ "valid": false, "message": "Esta clave ya está activada en otra-tienda.myshopify.com" }
```

## Automatizar con Gumroad / Lemon (avanzado)

Configura un **webhook** post-compra que llame a `admin/add-key.php` (incluido) o edites el JSON con un script.

## Límites

- Un desarrollador puede borrar el chequeo del tema (como cualquier tema).
- La API no “apaga” la tienda pública; solo avisa en el editor (recomendado).
- Si quieres bloqueo fuerte → App Shopify (ver `docs/CONTROL-LICENCIAS.md`).
