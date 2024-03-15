const staticCacheName = 'static-cache-v0';
const dynamicCacheName = 'dynamic-cache-v0';

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
<<<<<<< HEAD
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

function handleCacheAddError(error) {
    console.error('Failed to add to cache:', error);
  }

  async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        }
    }
}
=======
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
>>>>>>> 3a4fee605f27d6ed0f224bbcf5ddb8e86803ad98
