// Service Worker do English Class System
// Faz cache do "app shell" (o próprio index.html) para abrir mais rápido
// e continuar funcionando mesmo com internet instável ou momentaneamente offline.
// Atualize CACHE_VERSION sempre que publicar uma nova versão do index.html,
// assim o app busca a versão nova em vez de usar o cache antigo.
const CACHE_VERSION = 'ec-system-v5';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL).catch(()=>{}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navegação (abrir/recarregar o app): tenta a rede primeiro, para sempre
  // pegar a versão mais nova; se falhar (offline), usa o que está em cache.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Demais arquivos do próprio site (ícones, manifest): cache-first.
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => cached))
    );
  }
});
