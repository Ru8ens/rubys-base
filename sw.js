// Ruby's Base: funciona sin conexión. Sube VERSION en cada actualización.
const VERSION = "rb-2026-11-08";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./supabase.js", "./591.supabase.js",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png",
  "./fonts/syne-latin-700-normal.woff2", "./fonts/syne-latin-800-normal.woff2",
  "./fonts/outfit-latin-400-normal.woff2", "./fonts/outfit-latin-500-normal.woff2",
  "./fonts/outfit-latin-600-normal.woff2", "./fonts/outfit-latin-700-normal.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/")) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })));
});
