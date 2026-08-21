‎const CACHE_NAME = 'bursa-tailor-v2';
‎const urlsToCache = [
‎  './',
‎  './index.html',
‎  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
‎  'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js'
‎];
‎
‎self.addEventListener('install', event => {
‎  event.waitUntil(
‎    caches.open(CACHE_NAME).then(cache => {
‎      return cache.addAll(urlsToCache);
‎    })
‎  );
‎});
‎
‎self.addEventListener('fetch', event => {
‎  event.respondWith(
‎    caches.match(event.request).then(response => {
‎      return response || fetch(event.request);
‎    })
‎  );
‎});
