# Guía del comprador — GetSocial Theme v1.5

**Tema Shopify Online Store 2.0**  
*Documento para licenciatarios. Puedes exportar a PDF desde el navegador (Imprimir → Guardar como PDF).*

---

## 1. Requisitos

- Tienda Shopify activa (cualquier plan con tienda online)
- Acceso como propietario o staff con permisos de temas
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) (opcional, para desarrollo local)
- App gratuita **[Search & Discovery](https://apps.shopify.com/search-and-discovery)** para filtros de colección

---

## 2. Instalación

### Opción A — Subir ZIP

1. Comprime la carpeta del tema (sin incluir `.git` si no es necesario)
2. **Tienda online → Temas → Añadir tema → Subir archivo ZIP**
3. **Publicar** cuando hayas revisado la demo

### Opción B — Shopify CLI

```bash
cd ruta/al/tema
shopify theme push --store tu-tienda.myshopify.com
```

Desarrollo en vivo:

```bash
shopify theme dev --store tu-tienda.myshopify.com
```

---

## 3. Configuración inicial (checklist)

- [ ] **Configuración del tema** (engranaje): colores, tipografías, ancho de página
- [ ] **Cabecera**: sube logo, asigna menú `main-menu`
- [ ] **Filtros**: instala Search & Discovery y define filtros en colecciones
- [ ] Crea página **Wishlist** → plantilla `page.wishlist`
- [ ] Crea página **Comparar** → plantilla `page.compare`
- [ ] En tema → Tarjeta de producto: enlaza esas páginas
- [ ] Elige **demo de inicio** (ver `docs/DEMOS.md`)
- [ ] Revisa popup newsletter y barra de cookies

---

## 4. Funciones v1.3 – v1.5

### 4.0c Extras premium (v1.5)

**Configuración → Extras premium**

- Vista rápida, WhatsApp, cabecera al scroll, urgencia de stock

**Configuración → Carrito**

- Colección upsell en el drawer

**Secciones nuevas:** Antes/Después, Banner dividido, Verificador edad (activar en sección)

## 4. Funciones v1.3 y v1.4

### 4.0 Presets de color (v1.4)

En **Configuración del tema → Colores → Preset de color**:

- Moda, Belleza, Electrónica, Hogar, Gourmet, Deporte
- **Personalizado** = usas los campos de color manuales

Combina con la plantilla de inicio según `docs/DEMOS.md`.

### 4.0b Filtros en móvil (v1.4)

Botón **Filtrar** → panel lateral → **Ver resultados**. En desktop, columna izquierda.

## 4.1 Funciones v1.3

### 4.1 Filtros AJAX (colección)

- Activo por defecto en la sección **Colección**
- Al marcar filtros o cambiar orden, la cuadrícula se actualiza **sin recargar** la página
- Requiere filtros configurados en Shopify Admin
- Desactivar: sección Colección → desmarcar *Filtros AJAX*

### 4.2 Wishlist nativa

- Icono ♡ en tarjetas de producto y página de producto
- Datos guardados en el **navegador del cliente** (localStorage)
- Página dedicada con plantilla `wishlist`
- No sincroniza entre dispositivos (para sync multi-dispositivo usa una app de wishlist y desactiva *Wishlist nativa* en ajustes)

### 4.3 Comparador de productos

- Icono ⇄ en tarjetas (máximo configurable en tema, por defecto 4)
- Barra fija inferior cuando hay productos seleccionados
- Página **Comparar** con tabla: precio, marca, stock, tipo
- Vacía comparación desde la barra o la tabla

### 4.4 Demos por industria

Cinco plantillas de inicio: moda (default), belleza, electrónica, hogar, food, sport.  
Instrucciones: `docs/DEMOS.md`.

---

## 5. Secciones principales

Consulta el catálogo completo en `SECTIONS.md` en la raíz del tema.

**Más usadas en home:**

- Hero banner, Slideshow, Grid promocional  
- Colección destacada, Cuenta atrás, Shop the look  
- Testimonios, FAQ, Texto en scroll  
- Popup newsletter (sección global en `theme.liquid`)

---

## 6. Personalización avanzada

### CSS propio

**Configuración del tema → Avanzado → CSS personalizado**

### Scripts

**Avanzado → Scripts en &lt;head&gt;** (pixels, analytics)

### Cambiar textos

- Archivos `locales/es.json` y `locales/en.default.json`
- O traducciones en **Shopify Admin → Idiomas**

### Nombre comercial del tema

`config/settings_schema.json` → bloque `theme_info`

---

## 7. Preguntas frecuentes

**¿Por qué no aparecen filtros?**  
Instala y configura Search & Discovery. Sin filtros definidos, verás el mensaje informativo en la barra lateral.

**¿La wishlist se pierde?**  
Sí, si el usuario borra datos del navegador. Es el comportamiento esperado de la wishlist nativa.

**¿Puedo revender el tema?**  
No, salvo licencia agencia acordada. Ver `LICENSE.md`.

**¿Cumple Theme Store de Shopify?**  
Esta base está pensada para venta directa; la certificación oficial requiere revisión adicional (rendimiento, accesibilidad WCAG, documentación extendida).

---

## 8. Soporte

Define tu canal de soporte en el contrato de venta (email, plazo de respuesta, actualizaciones incluidas).

**Información útil al pedir ayuda:**

- URL de la tienda
- Captura del problema
- Pasos para reproducir
- Navegador y dispositivo

---

## 9. Changelog resumido

| Versión | Novedades |
|---------|-----------|
| 1.0 | Base OS 2.0, ajustes globales, secciones core |
| 1.2 | Mega menú, 20+ secciones, popup, cookies |
| 1.3 | Filtros AJAX, wishlist, comparador, 5 demos, guía comprador |
| 1.4 | Presets color por industria, cajón filtros móvil |
| 1.5 | Quick view, tipografía preset, SEO, WhatsApp, upsell carrito, +secciones |

---

*GetSocial Theme — Guía del comprador v1.4*
