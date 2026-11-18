# Distribuidora de Gas El Volcán (versión HTML)

Sitio web estático de una distribuidora de gas, hecho con HTML, CSS y JavaScript sin librerías. Es la versión original del proyecto; después la migré a React en [distribuidora-gas-REACT](https://github.com/CristobalViveros/distribuidora-gas-REACT).

Proyecto académico, desarrollado de forma individual.

## Páginas

- `index.html`: inicio con video de la distribuidora
- `productos.html` y `producto.html`: catálogo y detalle con selector de cantidad
- `contacto.html`: formulario de solicitud de información
- `login.html` y `registro.html`: formularios de acceso y creación de cuenta

## Qué hace el JavaScript (`js/script.js`)

- Calcula el total según la cantidad elegida y lo muestra en pesos chilenos.
- Botones para subir y bajar la cantidad.
- Validación de los formularios de login, registro y contacto, con el mensaje de error bajo cada campo.

## Tecnologías

HTML5, CSS3 y JavaScript.

## Cómo verlo

No necesita instalación. Clona el repositorio y abre `Distribuidora_Gas/index.html` en el navegador.

```bash
git clone https://github.com/CristobalViveros/Distribuidora_Gas.git
```

## Nota

Proyecto con fines educativos. No tiene servidor: el login, el registro y el contacto solo validan los datos en el navegador.
