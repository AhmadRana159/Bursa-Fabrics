const CACHE_NAME = 'bursa-cache-v2'; // یہاں ورژن v1 سے v2 کر دیا گیا ہے
const urlsToCache = [
    './',
    './index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js'
];

// انسٹالیشن کے وقت پُرانا کیش صاف کرنا
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// ایکٹیو ہونے پر پرانے تمام کیش ڈیلیٹ کر دینا
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Purana cache delete kiya ja raha hai:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// فیچ کرنے کا طریقہ (نئی فائل کو ترجیح دینا)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // اگر نیٹ ورک سے تازہ فائل مل جائے تو اسے کیش میں بھی اپ ڈیٹ کر دو
                let responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // اگر انٹرنیٹ نہ ہو تبھی کیش سے فائل دکھاؤ (آف لائن موڈ)
                return caches.match(event.request);
            })
    );
});
