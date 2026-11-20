/* KAFV lecture PWA app shell. Remote Cloudflare PDF files are never cached. */
const CACHE_NAME = 'kafv-lecture-pwa-v211-20261120-mobile-pdf-fullscreen';
const CACHE_PREFIX = 'kafv-lecture-pwa-';
const APP_SHELL = [
  './index.html', './manifest.webmanifest',
  './assets/icon-192.png', './assets/icon-512.png',
  './assets/icon-maskable-512.png', './assets/apple-touch-icon.png',
  './assets/favicon-32.png', './assets/splash-portrait.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Worker API, PDFs and CDN: always network.
  const scopePath = new URL(self.registration.scope).pathname;
  if (!url.pathname.startsWith(scopePath)) return;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)));
        }
        return response;
      }).catch(async () => (await caches.match('./index.html')) || Response.error())
    );
    return;
  }
  const resource = url.pathname.slice(scopePath.length);
  if (resource === 'manifest.webmanifest' || resource.startsWith('assets/')) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
  }
});
