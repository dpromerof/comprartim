const cacheName = 'comprartim-v2.0.0';
const filesToCache = [
  './',
  './index.html',
  './main.js',
  './styles.css',
  './manifest.json',
  './fonts',
  './icons',
  './styles/',
];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});
self.addEventListener('activate', (event) => {
  var cacheKeepList = [cacheName];
  console.log('activate service worker');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeepList.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    }),
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch:true }).then((response) => (
      response || fetch(event.request)
    )),
  );
});
