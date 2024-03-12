const staticCacheName = 'static-cache-v0';

const staticAssets = [
    './',
    './index.html',
    './content/images/icons/icon-128x128.png',
    './content/images/icons/icon-192x192.png',
    '.style.css',
    './content/js/app.js',
    './content/js/main.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});