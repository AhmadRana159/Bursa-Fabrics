self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.use('bursa-store').then((cache) => {
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
