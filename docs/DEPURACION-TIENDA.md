# Depuración — errores en la tienda de prueba

## Errores que viste

| Mensaje | Causa | Arreglo |
|---------|--------|---------|
| `font_face can only be used with a font drop` | Fuentes inválidas en settings | Usar `snippets/theme-fonts.liquid` desde `theme.liquid` |
| CSS `@font-face` visible arriba de la página | `font_face` fuera de `<style>` o Liquid sin `endunless` | Solo `theme-fonts.liquid` en `<head>`; `css-variables` sin font_face |
| `Nesting too deep` en card-product | Bucle infinito card-product ↔ product-card | Eliminado `card-product.liquid`; solo `product-card.liquid` |
| `Could not find asset snippets/card-product.liquid` | `product-card.liquid` quedó como alias tras sync Shopify→GitHub | Restaurar contenido completo en `product-card.liquid` (no llamar a `card-product`) |

## Sync GitHub ↔ Shopify

Si en GitHub aparece el commit **"Update from Shopify"**, puede sobrescribir `product-card.liquid` y romper colecciones. Tras cada fix en GitHub: **Temas → Actualizar desde GitHub** (no editar snippets en el editor de código de Shopify si usas GitHub como fuente).

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
