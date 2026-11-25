# Resultado de verificación

Fecha: 25 de noviembre de 2026.

## Pruebas automatizadas

`npm test`: 8 pruebas aprobadas. Cubren entradas inválidas y límites, rondas de 1, 5, 8 y 1000 sin repetición, historial en orden, agotamiento, reinicio y muestreo aleatorio sin sesgo de módulo.

`npm run build`: correcto; genera cinco archivos estáticos en dist/. El servidor local devuelve HTTP 200.

## Comprobaciones en navegador

- Ronda de 5 completa: historial observado #1, #5, #4, #3, #2. Cinco fichas tachadas y extracción desactivada al agotarse.
- Durante la animación se desactivan extracción, rango, presets y reinicio.
- Reinicio y preset 8: historial vacío y ocho números disponibles.
- Rango cero: mensaje de validación, sin alterar la ronda de ocho.
- Proyección: activa el diseño ampliado, oculta la configuración y permite salir.
- Inspección visual en disposiciones de una y dos columnas.

No se ejecutó una comprobación independiente de movimiento reducido, Escape, confeti en movimiento ni un recorrido exhaustivo de accesibilidad. La implementación contiene soporte para estos comportamientos.

## Despliegue

Vercel redirigió a su pantalla de inicio de sesión. No hay sesión autenticada ni credenciales CLI configuradas. No se creó ningún proyecto ni despliegue en Vercel. Se dejó abierta la pantalla de acceso para continuar con la cuenta del usuario.

## Actualización visual según captura

Se replicó la captura adjunta a 1204 px de ancho. Se verificaron extracción, contador de restantes, ficha tachada e historial, además del preset de 15. Se comprobó en viewport móvil que el ancho del contenido coincide con el disponible (375 px), sin desbordamiento horizontal. Se conserva captura de la versión actual en CapiSorteo-mockup.jpg. La fuente Lilita One y su licencia se incluyen localmente.
