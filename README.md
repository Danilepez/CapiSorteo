# CapiSorteo Instantáneo

Aplicación estática en español, 100% frontend. Sin servicios externos, fuentes remotas, base de datos ni login. Node.js 22+ solo se usa para desarrollo, pruebas y empaquetado.

## Usar y comprobar

```sh
npm run dev
npm test
npm run build
```

Abrir http://127.0.0.1:4173. Escribir un entero entre 1 y 1000 y pulsar Listo o Enter, o elegir 1 al 5 / 1 al 8 / 1 al 10 / 1 al 15. Espacio o Sacar Número inicia el sorteo. Los números usados quedan tachados y el historial muestra su orden. Reiniciar restaura el rango aplicado. La ronda vive en memoria: recargar inicia otra ronda.

Modo proyección amplía el resultado y solicita pantalla completa; Escape sale. Si el navegador no permite pantalla completa, conserva el diseño ampliado. Se respeta la preferencia de movimiento reducido. Los controles de configuración se bloquean mientras se sortea. Cambiar un preset o aplicar otro rango inicia una nueva ronda.

## Publicar en tu cuenta Vercel

Desde esta carpeta, en una terminal de tu computadora:

```sh
npx vercel login
npx vercel
```

Inicia sesión en tu cuenta, selecciona tu equipo y crea un proyecto. Usa esta carpeta como raíz. `vercel.json` configura automáticamente el build `npm run build` y la salida `dist`. Revisa la URL de preview que devuelve Vercel. Cuando esté correcta:

```sh
npx vercel --prod
```

También puedes subir esta carpeta a un repositorio e importarlo desde Vercel: framework Other, build `npm run build`, output `dist`. No se requieren variables de entorno. No subas credenciales ni archivos de sesión.

Referencias oficiales: https://vercel.com/docs/cli/deploy y https://vercel.com/docs/project-configuration

## Verificación manual en navegador

- Preset 5: sortear cinco veces; verificar cinco valores distintos de 1 a 5, fichas tachadas, historial ordinal y botón final desactivado.
- Reiniciar: historial vacío, cinco fichas disponibles y resultado `?`.
- Preset 8: ocho fichas; Enter aplica un rango nuevo. Probar N=1 y N=1000.
- Rechazar vacío, cero, negativos, decimales y más de 1000 sin alterar la ronda.
- Doble clic y Espacio repetido durante animación: solo una extracción.
- Proyección, Escape, ancho móvil y preferencia de movimiento reducido.

## Referencia visual

Diseño actualizado a partir de la captura del mockup aportada por el usuario: configuración a la izquierda, sorteo a la derecha, fondo punteado, paleta naranja y amarilla, mascota SVG y tipografía Lilita One incluida localmente con su licencia OFL. En pantallas pequeñas los paneles se apilan. Historial y proyección permanecen debajo del botón de sorteo.
