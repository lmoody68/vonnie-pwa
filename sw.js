/* ============================================================
   V.O.N.N.I.E. — Service Worker
   Voice Output Neural Navigator Interface Environment
   Caches all app files for full offline operation.
   ============================================================ */

const CACHE_NAME = 'vonnie-v16';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

/* ---- INSTALL: pre-cache core files ---- */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    // Activate immediately without waiting for old SW to die
    self.skipWaiting();
});

/* ---- ACTIVATE: clean up old caches ---- */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    // Take control of all open pages immediately
    self.clients.claim();
});

/* ---- FETCH: cache-first strategy ---- */
self.addEventListener('fetch', event => {
    // Only handle GET requests for same-origin resources
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) {
                // Serve from cache; also update cache in background
                const networkFetch = fetch(event.request)
                    .then(response => {
                        if (response && response.status === 200) {
                            caches.open(CACHE_NAME).then(cache =>
                                cache.put(event.request, response.clone())
                            );
                        }
                        return response;
                    })
                    .catch(() => {});
                return cached;
            }

            // Not in cache — try network, cache on success
            return fetch(event.request).then(response => {
                if (!response || response.status !== 200) return response;
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            }).catch(() => {
                // If both cache and network fail, return offline fallback
                return caches.match('./index.html');
            });
        })
    );
});
