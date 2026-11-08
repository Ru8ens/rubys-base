# Ruby's Base

App personal de Rubén: entreno y nutrición del plan de Chema, lista de la compra, progreso y WHOOP.

- Web app estática (sin build). Se publica con Cloudflare Pages desde la raíz del repositorio.
- Datos: Supabase, tabla `docs`, con Row Level Security (cada cuenta solo ve sus datos).
- Funciona sin conexión gracias a `sw.js`. Al actualizar, sube `VERSION` en `sw.js`.
- Cada mes se actualiza el plan (entreno y menú) dentro de `index.html`.
