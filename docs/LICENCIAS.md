# Cómo vender GetSocial Theme — Guía de licencias

Guía práctica para **monetizar el tema** sin entrar en conflicto legal. No sustituye asesoría jurídica; adáptala a tu país y negocio.

---

## 1. Tres formas de vender

### A) Venta directa (la más habitual para este tema)

Tú vendes el ZIP + documentación por tu web, Gumroad, Lemon Squeezy, Payhip, factura directa, etc.

| Ventaja | Inconveniente |
|---------|----------------|
| Control total del precio y licencia | Tú gestionas soporte y actualizaciones |
| No paga comisión Theme Store (0%) | No apareces en el directorio oficial Shopify |
| Puedes incluir landings, demos, vídeo | El comprador debe confiar en ti |

### B) Shopify Theme Store (oficial)

Shopify revisa el tema, lo lista en [themes.shopify.com](https://themes.shopify.com).

| Ventaja | Inconveniente |
|---------|----------------|
| Credibilidad y tráfico | Proceso largo (semanas/meses) |
| Pagos integrados | **Revenue share** ~15% (consulta condiciones actuales) |
| Actualizaciones vía Shopify | Código y requisitos estrictos (rendimiento, accesibilidad) |

**Este paquete es base:** necesitarás auditoría extra antes de enviar a revisión.

### C) Agencia / white-label

Vendes **implementación + tema** al cliente final. El cliente recibe licencia de uso; tú conservas el copyright del código si el contrato lo dice.

---

## 2. Modelos de licencia recomendados

### Licencia estándar (Regular) — ~70–80% de ventas

**Qué permite**

- 1 tienda Shopify activa por licencia  
- Uso comercial de la tienda  
- Modificar Liquid/CSS/JS para esa tienda  
- Crear páginas, landings y presets para ese proyecto  

**Qué prohibe**

- Revender o regalar el ZIP  
- Usar en una segunda tienda sin otra licencia  
- Publicar el código en GitHub público o marketplaces  

**Precio orientativo (mercado independiente):** 180–350 USD (tema + landings + 6 demos)

---

### Licencia extendida (Extended)

**Qué añade**

- 3–5 tiendas **del mismo propietario**, o  
- Uso en proyectos de agencia para **X clientes** (define X: 5, 10, ilimitado con contrato)

**Precio orientativo:** 1.5× a 3× la licencia estándar

---

### Licencia agencia / desarrollador

Para estudios que montan muchas tiendas:

- Paquete anual: N instalaciones  
- Sin derecho a revender el archivo fuente  
- Soporte prioritario opcional  

**Precio orientativo:** 800–2.500 USD/año según volumen

---

## 3. Qué entregar al comprador

Checklist del paquete de venta:

```
getsocial-theme-v1.5.zip
├── Tema (carpeta completa)
├── LICENSE.md              ← Contrato corto
├── README.md
├── docs/
│   ├── GUIA-COMPRADOR.md   ← Manual (PDF)
│   ├── DEMOS.md
│   ├── LANDING-PAGES.md    ← Pack landings
│   └── LICENCIAS.md        ← Este archivo (opcional para ti)
└── (opcional) video-instalacion.mp4
```

**Tras el pago envías:**

1. Enlace de descarga (único o con expiración)  
2. Clave de licencia (opcional, ver §4)  
3. Email de bienvenida con enlaces a soporte  

---

## 4. Control si usan el tema en otra tienda sin pagar

**Lectura obligatoria:** [docs/CONTROL-LICENCIAS.md](CONTROL-LICENCIAS.md)

Resumen: no puedes bloquear un ZIP al 100%; combina contrato + registro de tienda + soporte/updates + (opcional) API de clave.

El tema incluye ajustes opcionales **Licencia → clave + URL API** para avisar en el editor si la clave no es válida.

---

## 5. Sistema de claves de licencia (opcional)

No es obligatorio para Shopify, pero **profesionaliza** la venta.

### Manual (simple)

- Gumroad / Lemon Squeezy generan el pedido  
- Email automático con ZIP + número de pedido = referencia de licencia  
- Base de datos en Notion: email | pedido | tienda URL | fecha  

### Semi-automático

- Plugin en WordPress o webhook Zapier: compra → email con link  
- Formulario post-compra: “Indica URL de tu tienda” para registro  

### Con verificación (avanzado)

- Servidor propio que valida `LICENSE_KEY` + dominio `.myshopify.com`  
- Requiere app o script externo (no incluido en el tema)  
- Usado por temas grandes; coste de desarrollo alto  

**Recomendación para empezar:** pedido + email + registro manual en hoja de cálculo.

---

## 5. Texto legal mínimo (plantilla)

Incluye en `LICENSE.md` y en la página de venta:

1. **Titular del copyright** — Tu nombre o SL  
2. **Tipo de licencia** — Uso no exclusivo, no transferible  
3. **Alcance** — 1 tienda / N tiendas  
4. **Prohibiciones** — Reventa, redistribución  
5. **Soporte** — 6 meses email, qué incluye y qué no  
6. **Actualizaciones** — 12 meses gratis vs de pago  
7. **Garantía limitada** — “Tal cual”, sin garantía de beneficios  
8. **Limitación de responsabilidad** — Tope = importe pagado  
9. **Ley aplicable** — Ej. legislación de España  

---

## 6. Precios y empaquetado sugerido

| Producto | Contenido | Precio sugerido |
|----------|-----------|-----------------|
| **Starter** | Tema + docs | 149–199 € |
| **Pro** | Tema + 12 landings + 6 demos + 1 año updates | 249–349 € |
| **Agency** | Pro + 10 tiendas + soporte prioritario 3 meses | 599–899 € |
| **Instalación** | Setup + 1 landing personalizada | +150–400 € |

Ofrece **cupón lanzamiento** y **licencia extendida** como upsell en checkout.

---

## 7. Shopify Theme Store vs tu licencia

Si más adelante publicas en Theme Store:

- Los compradores allí **no usan tu LICENSE.md**; aceptan términos de Shopify  
- No puedes vender el **mismo código** más barato fuera si hay conflicto de exclusividad (lee el acuerdo de partners)  
- Estrategia común: versión **“Pro” externa** con más secciones; versión **“Lite”** en Theme Store  

---

## 8. Preguntas frecuentes de compradores

**¿Puedo usar el tema en 2 tiendas?**  
Solo con licencia extendida o segunda licencia estándar.

**¿Puedo modificar el código?**  
Sí, para tu(s) tienda(s) licenciada(s). No puedes publicar el tema completo como plantilla rival.

**¿Las landings están incluidas?**  
Sí, son plantillas `page.landing-*` en el tema.

**¿Incluye soporte para apps?**  
Define en tu contrato: soporte del **tema**, no de apps de terceros.

**¿Puedo revender a mi cliente como agencia?**  
El **cliente** debe tener licencia (tú puedes comprar licencia extendida o una por cliente).

---

## 9. Pasos para empezar a vender esta semana

1. Personaliza `LICENSE.md` (nombre, email, precios)  
2. Graba un vídeo de 5 min: instalar + elegir demo + 1 landing  
3. Crea página de venta (beneficios, tabla de comparación, FAQ)  
4. Sube a Gumroad/Lemon con licencia estándar y extendida  
5. Publica en redes / comunidades Shopify (sin spam; aporta valor)  
6. Ofrece instalación como servicio adicional  

---

## 10. Resumen

| Pregunta | Respuesta corta |
|----------|-----------------|
| ¿Puedo vender este tema? | Sí, si **tú eres el autor** o tienes derechos |
| ¿Cómo limito el uso? | Licencia por tienda + prohibir redistribución |
| ¿Necesito empresa? | Recomendable; consulta Hacienda en tu país |
| ¿Theme Store? | Opcional; otro canal y otras reglas |

---

*Documento informativo para licenciatarios de GetSocial Theme. Versión 1.6.*
