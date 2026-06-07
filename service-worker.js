const CACHE_NAME = 'un-v2';
const STATIC_ASSETS = [
  '/','/index.html','/css/style.css','/js/data.js','/js/utils.js',
  '/js/tools/date-converter.js','/js/tools/currency.js','/js/tools/weather.js',
  '/js/tools/notes.js','/js/tools/study.js','/js/tools/radio.js',
  '/js/tools/news.js','/js/tools/career.js','/js/app.js','/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) {
      fetch(e.request).then(r => { if (r.ok) caches.open(CACHE_NAME).then(c => c.put(e.request, r.clone())); }).catch(()=>{});
      return cached;
    }
    return fetch(e.request).then(r => {
      if (!r || r.status !== 200) return r;
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return r;
    }).catch(() => {
      if (e.request.mode === 'navigate') return caches.match('/index.html');
      return new Response('<h1>Offline</h1><p>You are offline. Some features may not work.</p>', { headers: {'Content-Type':'text/html'} });
    });
  }));
});
