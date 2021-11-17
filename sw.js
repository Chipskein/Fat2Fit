//constantes utilizadas
const CACHE_NAME = 'fat2fit-cache';
const urlsToCache = [
  './index.html',
  './',
  './manifest.json'
];

//-----------Ao instalar-------
self.addEventListener('install', event =>
  event.waitUntil(cacheResources())
)

async function cacheResources() {
  const cache = await caches.open(CACHE_NAME)
  return cache.addAll(urlsToCache)
}

//-----Ao fazer uma requisição (fetch)-----

self.addEventListener('fetch', event =>
  event.respondWith(cachedResource(event.request))
)

async function cachedResource (req) {
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(req)
  if (response) {
    return response;
  }
  return fetch(req);
}



