const CACHE_NAME = 'boomklim-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installeer de service worker en sla de bestanden op in de cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Zorg dat de app de opgeslagen bestanden gebruikt als er geen internet is
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Geef de offline versie
        }
        return fetch(event.request); // Haal live op als er wel internet is
      })
  );
});
