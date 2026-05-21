# Cómo controlar el uso de la licencia (realidad + opciones)

Si alguien **descarga el ZIP y lo instala en otra tienda sin pagar**, no hay forma 100% de impedirlo solo con archivos Liquid: el comprador recibe el código y puede copiarlo. Lo que sí puedes hacer es **disuadir**, **detectar** y **limitar valor** para quien piratea.

---

## La verdad en 30 segundos

| Método | ¿Bloquea uso en 2ª tienda? | ¿Vale la pena? |
|--------|----------------------------|----------------|
| `LICENSE.md` + contrato | No técnicamente; sí legalmente | ✅ Siempre |
| Soporte/updates solo con compra | No bloquea la tienda | ✅ Muy recomendado |
| Registro manual (email + URL tienda) | No | ✅ Fácil |
| Clave en ajustes + API tuya | Parcial (se puede borrar del código) | ⚠️ Medio |
| App Shopify de licencias | Más fuerte | ⚠️ Requiere desarrollo app |
| Código único por cliente | No bloquea; ayuda a rastrear filtraciones | ⚠️ Avanzado |

**Conclusión:** Vendes **licencia + soporte + actualizaciones**, no solo un ZIP. El pirateo pierde updates, soporte y tranquilidad legal.

---

## Nivel 1 — Lo mínimo que debes hacer (recomendado)

### 1. Contrato claro (`LICENSE.md`)

- 1 licencia = 1 tienda  
- Prohibida redistribución del ZIP  
- Consecuencias: retirada de soporte, reclamación legal, etc.

No evita el uso, pero es tu base si contactas a alguien o a Shopify.

### 2. Registro post-compra

Tras cada venta, guarda:

| Campo | Ejemplo |
|-------|---------|
| Email comprador | cliente@mail.com |
| ID pedido | Gumroad #12345 |
| URL tienda | `mitienda.myshopify.com` |
| Tipo licencia | Estándar / Extendida |
| Fecha | 2026-05-21 |

Herramientas: Notion, Google Sheets, Airtable.

**Opcional:** formulario Typeform/Google después del pago: “Pega la URL de tu tienda para activar soporte”.

### 3. Soporte y updates ligados al pedido

Política clara en email de bienvenida:

> “Para soporte o nueva versión, indica tu **email de compra** y **URL de la tienda** registrada.”

Quien piratea no tiene pedido → no recibe ayuda ni v1.7.

### 4. Venta por plataforma con identidad

**Gumroad, Lemon Squeezy, Payhip** dejan constancia de quién compró. Evita enviar el ZIP por Telegram “sin registro”.

---

## Nivel 2 — Verificación suave en el tema (opcional)

Puedes pedir una **clave de licencia** en Configuración del tema. El tema comprueba una API tuya al cargar el admin o la tienda.

### Limitaciones importantes

- Un desarrollador puede **borrar** el snippet de verificación en 2 minutos.  
- No debe **romper la tienda del cliente honesto** si tu servidor cae.  
- Mejor: aviso en editor + registro, no “apagar” la tienda pública.

### Flujo típico

```
Compra → Recibe LICENSE_KEY (Gumroad puede generarla)
      → En tema: Configuración → "Clave de licencia"
      → Tema hace fetch a https://tu-api.com/verify?key=XXX&shop=mitienda.myshopify.com
      → API responde { "valid": true }
```

**API incluida en este proyecto:** carpeta `license-server/` (PHP para hosting barato).

Instalación: `license-server/README.md`

**Tu API** guarda:

- `key` → email, tienda activada (`shop`), max_shops

Si instalan en 2ª tienda con la misma clave → API devuelve `valid: false` → muestran banner “Licencia ya usada en otra tienda”.

### Servicios que ya dan licencias

- **Gumroad** — claves por producto  
- **Lemon Squeezy** — license keys API  
- **Keygen.sh** — API de licencias (de pago)  
- **Freemius** — orientado a plugins/temas  

Investiga “Lemon Squeezy license key validation API” si vendes ahí.

---

## Nivel 3 — App Shopify “validador” (más profesional)

Publicas una **app gratuita** pequeña: “GetSocial License”.

1. El merchant instala la app  
2. Introduce clave de compra  
3. La app guarda en metafields `shop` si está validado  
4. El tema lee `shop.metafields.getsocial.licensed` (solo funciona si no borran la app)

**Ventaja:** Más difícil de saltarse que un snippet.  
**Inconveniente:** Hay que desarrollar y mantener la app (Partner Dashboard).

---

## Nivel 4 — Build único por cliente (rastrear filtraciones)

Al vender, generas un ZIP con un **ID oculto** distinto por comprador:

```liquid
{%- comment -%} build: c7f2a9b1- comprador@email.com {%- endcomment -%}
```

O un string en `settings_schema` / `config/settings_data.json` que solo tú conoces.

Si el tema aparece filtrado en internet, buscas ese ID y sabes **qué pedido filtró**.

No bloquea uso, pero **identifica al responsable**.

---

## Cómo detectar uso no autorizado

### Búsqueda manual

- `site:myshopify.com "GetSocial Theme"` (nombre del tema en comentario HTML si lo dejas)  
- Revisar tiendas que usan **exactamente** tu demo sin personalizar  
- Google Lens / comparar capturas de tu demo de venta  

### Herramientas

- **Visualping** en tu página de demo  
- Comunidades donde comparten temas nulled (no enlazar; solo vigilar)  

### Shopify

Si es copia **literal** de tu marketing o marca registrada, puedes contactar:

- Abuse del dominio / hosting  
- Shopify si infringen marca (caso a caso)

---

## Qué hacer si encuentras pirata

1. Documenta: URL tienda, capturas, fecha  
2. Comprueba si es **cliente tuyo** con 2 tiendas (error) o pirateo  
3. Email amable: “No encontramos licencia para esta URL; compra o desinstala”  
4. Si persiste y tienes registro DMCA/marca, escalas según tu país  
5. **No amenaces** sin base legal; sé profesional  

---

## Modelo de negocio que reduce piratería

| Estrategia | Efecto |
|----------|--------|
| Precio razonable + landings incluidas | Menos incentivo a buscar nulled |
| Updates frecuentes (v1.7, v1.8) | Pirateo queda obsoleto |
| Comunidad Discord solo compradores | Valor extra |
| Instalación incluida en plan Pro | Compran servicio, no solo ZIP |
| Theme Store (futuro) | Shopify gestiona copia en su ecosistema |

---

## Recomendación para GetSocial Theme

**Corto plazo (esta semana)**

1. `LICENSE.md` firmado con tu nombre  
2. Venta solo Gumroad/Lemon + email automático  
3. Hoja de registro tienda + pedido  
4. Soporte solo con número de pedido  

**Medio plazo**

5. Campo `license_key` en tema + API Lemon Squeezy (si usas Lemon)  
6. Banner en personalizador si clave inválida (no tumbar la tienda)  

**Largo plazo**

7. App de licencia o Theme Store  

---

## Preguntas frecuentes

**¿Puedo bloquear el ZIP con contraseña?**  
Solo retrasa; al instalar en Shopify el código queda en claro.

**¿Cifrado del tema?**  
Shopify necesita Liquid legible; no es viable.

**¿Un solo dominio permitido?**  
Sí vía API: primera activación guarda `shop` domain; la segunda rechaza.

**¿Y si cambian de dominio custom?**  
Tu API debe permitir “transferir” licencia con email de soporte.

---

*Documento complementario a `docs/LICENCIAS.md` — GetSocial Theme.*
