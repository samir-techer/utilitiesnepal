/**
 * Utilities Nepal - Service Worker
 * Provides offline support and caching for PWA functionality
 */

const CACHE_NAME = 'utilities-nepal-v1';
const STATIC_CACHE = 'utilities-nepal-static-v1';
const DYNAMIC_CACHE = 'utilities-nepal-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (except for our product links)
  if (url.origin !== self.location.origin) {
    // Allow external product links to pass through
    if (url.hostname.includes('github.io')) {
      return;
    }
    return;
  }

  // Strategy: Cache First for static assets, Network First for dynamic
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached response and update in background
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => cache.put(request, responseClone));
              }
            })
            .catch(() => {
              // Network failed, cached response is already returned
            });

          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();

            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, responseClone));

            return networkResponse;
          })
          .catch(() => {
            // Network failed, return offline fallback
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }

            // Return a simple offline response for other requests
            return new Response(
              '<!DOCTYPE html><html><head><title>Offline</title></head><body style="font-family:Inter,sans-serif;text-align:center;padding:50px;background:#0A0E17;color:#fff;"><h1>You are offline</h1><p>Please check your internet connection and try again.</p><a href="/" style="color:#06B6D4;">Go to Homepage</a></body></html>',
              {
                headers: { 'Content-Type': 'text/html' }
              }
            );
          });
      })
  );
});

// Background sync for form submissions (future feature)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(handleContactFormSync());
  }
});

async function handleContactFormSync() {
  // Future: sync queued form submissions
  console.log('[SW] Background sync triggered');
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from Utilities Nepal',
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"%3E%3Crect width="192" height="192" rx="48" fill="%230E7490"/%3E%3Ctext x="96" y="120" text-anchor="middle" fill="white" font-family="Arial" font-size="80"%3EUN%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" rx="24" fill="%230E7490"/%3E%3Ctext x="48" y="60" text-anchor="middle" fill="white" font-family="Arial" font-size="40"%3EUN%3C/text%3E%3C/svg%3E',
    tag: 'utilities-nepal-update',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('Utilities Nepal', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
