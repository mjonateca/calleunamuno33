# Finca Unamuno 33

Dos versiones de la web de la vivienda de Calle Unamuno 33, Peñasolana, Carrascal de Barregas, Salamanca. Ambas sin precio, valoraciones ni referencias económicas en su contenido o metadatos.

- `/`: versión editorial original actualizada, con portada panorámica, paleta pergamino/bronce y Fraunces/Inter.
- `/v2`: nueva versión cálida, con composición asimétrica, fotografía en arco, blanco cálido, terracota y verde oliva. Tipografía Cormorant Garamond/DM Sans.

HTML, CSS y JavaScript sin dependencias de compilación. La configuración existente de Vercel sirve los archivos estáticos. Repositorio: `mjonateca/calleunamuno33`, proyecto Vercel: `calleunamuno33`.

## Fotografías

29 fotografías seleccionadas, descritas en `photos.json`. 22 proceden del ZIP facilitado por el propietario. Se conservan siete fotos de archivo de la web anterior para espacios no cubiertos por las nuevas tomas. Estas fotos de archivo tienen 600 × 450 píxeles; no se han ampliado artificialmente ni se han eliminado sus marcas de agua.

`images/v2/` contiene WebP a 480, 900 y hasta 1.800 píxeles, según la resolución original. `srcset`, dimensiones explícitas y carga diferida en imágenes secundarias. Se ha conservado el contenido y color de los originales, sin recrear arquitectura, mobiliario ni jardines. Las fotografías no seleccionadas por duplicidad, desenfoque o escaso valor descriptivo se conservan en el ZIP original del propietario.

La galería compartida ofrece filtros, ampliación con diálogo nativo, teclado (flechas/Escape), retorno del foco y gesto horizontal en móvil. Sin JavaScript, los enlaces abren las fotografías directamente.

## Contacto y contenido

Las visitas enlazan con la página oficial de contacto de Premiere Inmobiliaria: https://premiereinmo.com/contacto/. No se almacenan datos personales ni se simula un envío de formulario.

Se ha retirado el enlace Matterport antiguo porque el proveedor devolvía «Model not found (404)». Se ha sustituido por un recorrido fotográfico. Para restaurar un tour se necesita la URL de un modelo activo.

Los datos físicos de la vivienda proceden de la ficha de la web anterior. La documentación y superficies deben confirmarse con la agencia. La nueva versión no incorpora estimaciones de mercado, licencias, rendimientos ni garantías.

## Verificación

`python checks.py` valida ambas páginas: ausencia de importes, referencias al tour retirado y formularios ficticios; un H1 por página, IDs únicos, destinos de anclas, 29 fotos y existencia de imágenes y recursos. Comprueba también la sintaxis de los scripts inline con Node. `node --check gallery.js` revisa el script compartido.

Previsualización: `python -m http.server 8765 --bind 127.0.0.1`. Abrir `/` y `/v2/`. Comprobar escritorio, móvil, filtros, ampliación, navegación y contacto antes de publicar.

Un selector fijo en la parte superior permite alternar entre V1 (original mejorada) y V2 (Calma), también en móvil. La dirección anterior `/calma` redirige a `/v2`.
