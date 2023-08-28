const staticDevCoffee = "MIPE-site-v2";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/opera.jpg",
  "/images/registro.jpg",
  "/images/reporte.jpg",
  "/images/clientes.jpg",
  "/images/apoyo.jpg",
  "/images/objetivo.jpg",
  "/images/motivo.jpg",
  "/images/info.jpg",
  "/images/actualiza.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
