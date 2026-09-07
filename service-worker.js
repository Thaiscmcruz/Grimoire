/* Grimoire offline shell cache.
   Strategy: network-first for the app shell (index.html / manifest / this file),
   so an online launch always gets the latest build and the cache is only a
   fallback when offline. Bump CACHE whenever you want to guarantee old caches
   are dropped on activate. */
var CACHE = "grimoire-2026-09-07";
var ASSETS = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("message", function (e) {
  if (e.data === "skip-waiting") self.skipWaiting();
});

function putCache(req, res) {
  var copy = res.clone();
  caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
  return res;
}

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url;
  try { url = new URL(e.request.url); } catch (err) { return; }
  if (url.origin !== location.origin) return;

  var p = url.pathname;
  var isShell = e.request.mode === "navigate" ||
    p === "/" || p.endsWith("/") ||
    p.endsWith("/index.html") ||
    p.endsWith("/manifest.webmanifest") ||
    p.endsWith("/service-worker.js");

  if (isShell) {
    // network-first: fresh when online, cached copy (or index.html) when offline
    e.respondWith(
      fetch(e.request).then(function (res) { return putCache(e.request, res); }).catch(function () {
        return caches.match(e.request).then(function (hit) { return hit || caches.match("./index.html"); });
      })
    );
    return;
  }

  // everything else: cache-first (there are no other bundled assets today)
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (res) { return putCache(e.request, res); })
        .catch(function () { return caches.match("./index.html"); });
    })
  );
});
