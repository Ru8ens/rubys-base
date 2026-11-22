# Ruby's Base

App personal de Rubén: entreno y nutrición del plan de Chema, lista de la compra, progreso y WHOOP.

- Web app estática (sin build). Se publica con Cloudflare Pages desde la raíz del repositorio.
- Datos: Supabase, tabla `docs`, con Row Level Security (cada cuenta solo ve sus datos).
- Funciona sin conexión gracias a `sw.js`. Al actualizar, sube `VERSION` en `sw.js`.
- Cada mes se actualiza el plan (entreno y menú) dentro de `index.html`.

## HQ calendar (`hq-calendar`)

Ruby's HQ keeps one Supabase `docs` row per section. This week's calendar is a new row named `hq-calendar`. A morning job may overwrite that row only. It must not write any other key, and nothing in the repo should contain real events.

`weekOf` is the Monday (`YYYY-MM-DD`). `days` lists the seven dates from that Monday. A day with an empty `events` list shows "Nothing scheduled". The app also fills any date you leave out.

```json
{
  "weekOf": "YYYY-MM-DD",
  "updated": "2026-01-05T06:00:00Z",
  "days": [
    {
      "date": "YYYY-MM-DD",
      "events": [
        {
          "title": "Weekly meeting",
          "start": "11:00",
          "end": "12:30",
          "allDay": false,
          "venture": "arowana",
          "with": "",
          "where": "",
          "note": "",
          "status": "confirmed",
          "calendar": ""
        }
      ]
    }
  ]
}
```

`venture` is `arowana`, `tfw`, `business` or `personal`. `status` `tentative` shows "Not yet accepted". `calendar` is optional source text, shown only when it differs from the venture (for example a TFW event that lives on the Business calendar). Omit empty optional fields.

In the app: Home, This week's calendar, Update, then paste this JSON. Settings, Import data file, also loads a Ruby's HQ backup whose `docs` object contains `hq-calendar`. Either path replaces that one document and leaves every other section alone.
