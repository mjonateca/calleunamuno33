# Finca Unamuno 33

> Landing page para la propiedad situada en Calle Unamuno 33, Peñasolana, Carrascal de Barregas, Salamanca.

Una residencia familiar de 563 m² sobre parcela de 2.130 m² en el corazón del Campo Charro, a diez minutos del casco histórico de Salamanca (Patrimonio de la Humanidad UNESCO).

## Stack

- HTML / CSS / JS vanilla — sin frameworks ni build step
- [Leaflet](https://leafletjs.com/) (CDN) para el mapa interactivo
- Google Fonts: `Fraunces` (variable serif editorial) + `Inter`
- Imágenes en `/images/` servidas como assets estáticos

## Arquitectura visual

- **Paleta**: pergamino cálido (`#EFE7D4`), tinta marrón profunda (`#1A1612`), bronce mate (`#8B7548`), oliva (campo charro) y terracota como acentos
- **Tipografía**: jerarquía editorial estilo revista — Fraunces variable para display + Inter para small-caps/UI
- **Glassmorphism** real (no flat) en elementos flotantes sobre imágenes: price card del hero, sticky bar inferior, stat cards, captions del feature, lightbox, overlays del mapa, formulario de contacto
- **Cinema-style hero**: Ken Burns automático + parallax + reveal por líneas
- **Cursor personalizado** en desktop con modo "Ver" en imágenes clicables
- **Lightbox** completo con navegación teclado/click
- **Mapa interactivo Leaflet** con marker animado de la propiedad y landmarks (catedral, AVE, aeropuerto, hospital)
- **Smooth scroll** nativo con anchors animados
- **Contadores animados** al entrar en viewport
- **Reveal-on-scroll** con stagger
- **Plano isométrico SVG** custom de la parcela
- **Índice lateral derecho** con sección activa marcada
- **Sticky price bar** glassmorphic que aparece tras la sección de cifras

## Estructura

```
.
├── index.html              # Página única, ~100 KB
├── images/                 # 20 fotografías de la propiedad (~900 KB total)
│   ├── 01-hero-sunset-terrace.jpg
│   ├── 02-terrace-lantern.jpg
│   ├── ...
│   └── 20-hallway.jpg
├── vercel.json             # Configuración Vercel (cache headers + clean URLs)
└── README.md
```

## Deploy en Vercel

El repo está listo para deploy directo:

1. Importar en [vercel.com/new](https://vercel.com/new) seleccionando este repositorio
2. Framework Preset: **Other** (no requiere build)
3. Root directory: `./`
4. Vercel sirve `index.html` por defecto y entrega las imágenes desde `/images/`

Tras el deploy, asignar dominio personalizado si se desea (`unamuno33.com`, `finca-unamuno.es`, etc.) desde la configuración del proyecto en Vercel.

## Crédito

Fotografías cortesía de **Premiere Inmobiliaria** (Salamanca).
Anuncio original en [idealista](https://www.idealista.com/inmueble/108498107/).
