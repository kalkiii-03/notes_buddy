const CACHE_NAME = 'notesbuddy-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/home.html',
  '/css/style.css',
  '/js/app.js',
  '/js/data.js',
  '/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
