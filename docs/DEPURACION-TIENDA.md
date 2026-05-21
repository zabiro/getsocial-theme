# Depuración — errores en la tienda de prueba

## Errores que viste

| Mensaje | Causa | Arreglo |
|---------|--------|---------|
| `font_face can only be used with a font drop` | Fuentes en `settings_data` inválidas + `font_face` sin comprobar | `css-variables.liquid` corregido |
| `Could not find asset snippets/card-product.liquid` | Snippet no sincronizado o nombre distinto | Uso de `product-card.liquid` (estándar) |

## Qué hacer en Shopify (importante)

1. **Temas** → tema conectado a GitHub (`getsocial-theme`) → menú **⋯** → **Actualizar desde GitHub** / **Sync**.
2. Espera a que termine (rama `main`, último commit).
3. Abre **Personalizar** → **Configuración del tema** → **Tipografía** → elige fuentes y **Guardar**.
4. En el navegador: **Ctrl+F5** en la colección `/collections/all`.

## Si sigue fallando

### Opción A — Subir ZIP (más rápido para probar)

1. Descarga o genera `getsocial-theme-v1.6.0.zip` (`.\scripts\build-zips.ps1`).
2. **Temas → Añadir tema → Subir ZIP**.
3. **Publicar** o previsualizar ese tema.

### Opción B — Verificar archivos en GitHub

En https://github.com/zabiro/getsocial-theme debe existir:

- `snippets/product-card.liquid`
- `snippets/product-media.liquid`
- `snippets/css-variables.liquid`
- `config/settings_schema.json` (no vacío `[]`)

## GitHub Actions

El workflow es **opcional**. Si el tema está **Conectado desde GitHub**, no necesitas secrets ni Actions.

## No necesito de ti

- Contraseña de la tienda (solo si quieres que revise algo en admin).
- Acceso al repo (ya está en `zabiro/getsocial-theme`).

Sí ayuda: confirmar si tras **Sync desde GitHub** desaparecen los errores.
