const staticCacheName = 'static-cache-v0';

const staticAssets = [
    './',
    './index.html',
    './content/images/icons/icon-128x128.png',
    './content/images/icons/icon-192x192.png',
    './style.css',
    './content/js/app.js',
    './content/js/script.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return new Response('Соединение потеряно. Пожалуйста, попробуйте позже.', {
                    headers: { 'Content-Type': 'text/html' },
                    status: 503,
                    statusText: 'Service Unavailable',
                    body: 'Соединение потеряно. Пожалуйста, попробуйте позже.',
                    headers: new Headers({
                        'Content-Type': 'text/html; charset=utf-8'
                    })
                });
            });
        })
    );
});