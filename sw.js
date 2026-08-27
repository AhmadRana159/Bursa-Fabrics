const CACHE_NAME = 'bursa-store-v1';
const urlsToCache = [
    './',
    './index.html',
    './qrcode.png'  // یہ والی لائن ہم نے کیو آر کی تصویر کو آف لائن کرنے کے لیے پکی ایڈ کر دی ہے
];

// 1. انسٹال کرتے وقت فائلیں کیش کرنا
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache successfully');
            return cache.addAll(urlsToCache);
        })
    );
});

// 2. فچ (Fetch) کرتے وقت آف لائن یا آن لائن ڈیٹا سنبھالنا
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // اگر نیٹ موجود ہے تو نیٹ سے لو، ورنہ کیش (آف لائن) سے دکھا دو
            return response || fetch(e.request);
        })
    );
});
