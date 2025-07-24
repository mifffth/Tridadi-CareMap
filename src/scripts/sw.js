import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

registerRoute(
  ({ url }) => url.origin === 'https://cdnjs.cloudflare.com' || url.origin.includes('fontawesome'),
  new CacheFirst({
    cacheName: 'fontawesome',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

registerRoute(
  ({ request }) => ['script', 'style'].includes(request.destination),
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

registerRoute(
  ({ url }) => url.origin.includes('tile.openstreetmap.org'),
  new StaleWhileRevalidate({
    cacheName: 'osm-tiles',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

registerRoute(
  ({ request, url }) => request.mode === 'navigate' &&
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

setCatchHandler(async ({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match('/offline.html');
  }
  return Response.error();
});

self.addEventListener('install', () => {
  console.log('Service Worker: Menginstall');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Mengaktifkan');
  event.waitUntil(self.clients.claim());
});