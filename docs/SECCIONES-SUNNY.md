# Estructura de secciones — referencia Sunny Hunny

Mapa de cómo está organizado [sunny.com.co](https://sunny.com.co/) y qué sección del tema usar.

## Página de inicio

| Orden Sunny | Sección GetSocial | Qué configurar |
|-------------|-------------------|----------------|
| Hero + video/imagen + logo + título | **Hero con productos** | Video o imagen, logo, texto, colección para el carrusel |
| Carrusel de productos bajo el hero | *(incluido en Hero con productos)* | Misma colección, 5 productos, flechas |
| «FOOD FOR YOUR SKIN» | **Escaparate tropical** | Textos + flores decorativas (opcional) |
| Producto destacado + bullets + CTA | **Producto destacado** | Elegir 1 producto + bloques Beneficio |
| Banner collage ancho | **Imagen con texto** → estilo *Banner ancho* | Solo imagen, sin texto |
| Logo grande al final | **Banner logo / collage** | Imagen full width |

**Plantilla:** `index.json` o `index.sunny.json` (misma estructura).

## Página de producto

| Orden Sunny | Sección GetSocial | Bloques |
|-------------|-------------------|---------|
| Galería + título + precio + variantes + CTA | **Producto** (`main-product`) | Beneficio (bullets), Confianza |
| «¡Aclaremos todo!» acordeón | **FAQ / Acordeón** | Pregunta × N |
| «El match perfecto para tu rutina» | **Carrusel de productos** | Colección relacionada |

**Plantilla:** `product.json` o `product.sunny.json`.

En el editor: **Producto → Personalizar** → bloques *Beneficio* debajo del precio.

## Colección / catálogo

| Sunny | GetSocial |
|-------|-----------|
| Grid + filtros | **Colección** (`main-collection`) |
| Carrusel opcional abajo | **Carrusel de productos** (plantilla `collection.sunny.json`) |

## Pie de página (header-group / footer-group)

| Sunny | GetSocial |
|-------|-----------|
| Enlaces legales en línea | Footer → bloque **Menú** |
| Síguenos + iconos | Footer → **Síguenos** + redes en ajustes tema |
| Newsletter centrada | Footer → bloque **Newsletter** |

## Cómo aplicar en tu tienda

1. **Inicio:** Tema → Personalizar → Inicio. Debe verse: Hero con productos → Escaparate tropical → Producto destacado → Banner → Logo.
2. Asigna **colección** en Hero con productos y en Producto destacado elige un producto real.
3. **Producto:** Personalizar cualquier PDP; añade FAQ y Carrusel si no aparecen (plantilla `product.json`).
4. Para solo belleza: en Ajustes del tema elige preset **Belleza tropical (Sunny)**.

## Secciones nuevas (v1.6+)

- `hero-with-products.liquid`
- `product-carousel.liquid`
- `logo-banner.liquid`
- Bloque `benefit` en `main-product.liquid`
