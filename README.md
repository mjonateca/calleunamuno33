# Finca Unamuno 33

Web de la vivienda de Calle Unamuno 33, Peñasolana, Carrascal de Barregas, Salamanca. Se conserva exclusivamente el diseño editorial original.

- `/`: versión editorial original, con portada panorámica, paleta pergamino/bronce y Fraunces/Inter.

HTML, CSS y JavaScript sin dependencias de compilación. La configuración existente de Vercel sirve los archivos estáticos. Repositorio: `mjonateca/calleunamuno33`, proyecto Vercel: `calleunamuno33`.

## Fotografías

22 fotografías seleccionadas del ZIP facilitado por el propietario, descritas en `photos.json`. Se han retirado las siete fotografías de archivo que ocupaban los puestos 23 a 29, junto con sus variantes y las copias de archivo asociadas. La galería pública utiliza exclusivamente las fotos originales seleccionadas del propietario.

`images/v2/` contiene WebP a 480, 900 y hasta 1.800 píxeles, según la resolución original. `srcset`, dimensiones explícitas y carga diferida en imágenes secundarias. Se ha conservado el contenido y color de los originales, sin recrear arquitectura, mobiliario ni jardines. Las fotografías no seleccionadas por duplicidad, desenfoque o escaso valor descriptivo se conservan en el ZIP original del propietario.

La galería compartida ofrece filtros, ampliación con diálogo nativo, teclado (flechas/Escape), retorno del foco y gesto horizontal en móvil. Sin JavaScript, los enlaces abren las fotografías directamente.

## Contacto y contenido

La sección «Más información» ofrece contacto directo con Javier: correo `javiergarridonovoa@gmail.com` (enlace mailto) y teléfono `+34625066889` (enlace tel). Los accesos de la cabecera, barra flotante y pie de página utilizan este contacto. No se almacenan datos de visitantes ni se simula un envío de formulario.

Se ha retirado el enlace Matterport antiguo porque el proveedor devolvía «Model not found (404)». Se ha sustituido por un recorrido fotográfico. Para restaurar un tour se necesita la URL de un modelo activo.

Los datos físicos de la vivienda proceden de la ficha de la web anterior. La documentación y superficies deben confirmarse con Javier. La nueva versión no incorpora estimaciones de mercado, licencias, rendimientos ni garantías.

## Verificación

`python checks.py` valida la V1: ausencia de importes, referencias al tour retirado y formularios ficticios; un H1, IDs únicos, destinos de anclas, 22 fotos y existencia de imágenes y recursos. Comprueba los enlaces de correo y teléfono de Javier, la ausencia de enlaces a la agencia y la sintaxis de los scripts inline con Node. `node --check gallery.js` revisa la galería.

Previsualización: `python -m http.server 8765 --bind 127.0.0.1`. Abrir `/`. Comprobar escritorio, móvil, filtros, ampliación, navegación y contacto antes de publicar.

Se conserva solo la V1. Las direcciones retiradas `/v2` y `/calma` redirigen a la página principal; no hay selector de versiones.
