// PWA Organizer no longer uses a service worker.
// This file exists only to immediately unregister itself on any client
// that still has an old registration active, then get out of the way.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clear any caches this SW (or a prior version) may have created.
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      // Unregister self so future loads skip the SW entirely.
      await self.registration.unregister();
      // Force any open clients to reload without a controlling SW.
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((client) => client.navigate(client.url));
    })()
  );
});
