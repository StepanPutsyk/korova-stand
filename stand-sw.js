// Сервис-воркер стенда: файлы движка из engine/<хеш>/ — из своего кеша.
// По такому адресу содержимое не меняется никогда, сверять с сервером незачем
const CACHE = 'stand-engine-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || !url.pathname.includes('/engine/')) return;
  e.respondWith(caches.open(CACHE).then((c) => c.match(url.href).then((hit) => hit || fetch(url.href).then((r) => {
    if (r.ok) c.put(url.href, r.clone());
    return r;
  }))));
});
