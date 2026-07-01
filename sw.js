const CACHE_NAME = "cooperadora-v15";
const APP_SHELL = [
  "./",
  "index.html",
  "styles.css",
  "script.js",
  "manifest.webmanifest",
  "offline.html",
  "assets/brand/logo_isfd.jpg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("offline.html")),
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) return;

  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.url.endsWith("/index.html")
  ) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return networkResponse;
      });
    }),
  );
});
