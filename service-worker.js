// SAnA Boutique — Service Worker
//
// This exists mainly to satisfy Chrome's PWA install criteria
// (an installable site needs a registered service worker with a
// fetch handler). Strategy is network-first: always try the
// network first so you never get served stale JS/CSS while
// actively developing, and only fall back to the cache when
// there's no network at all (basic offline support).
//
// Bump CACHE_NAME whenever you want to force old cached files
// to be discarded on the next visit.

const CACHE_NAME = 'sana-boutique-v1';

const APP_SHELL = [
    './',
    './index.html',
    './main.css',
    './app.js',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Best-effort — don't fail install if one file 404s
            return Promise.allSettled(
                APP_SHELL.map((url) => cache.add(url))
            );
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Only handle GET requests — let POST/DELETE (e.g. product
    // publish/delete) go straight to the network, untouched
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Stash a copy of successful responses for offline use
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
