const CACHE_NAME = 'ver-0';
const urlsToCache = ['../index.html', '../offline.html']

const self = this

// install SW

self.addEventListener("install", (e) => {
  e.waitUntill(caches.open(CACHE_NAME).then((cache) => {

    console.log('Cache Opened!');
   return cache.addAll(urlsToCache)
    
}).catch(err => console.log(err)))
})

// Linten for requests

self.addEventListener("fetch", (event) => {
  e.respondWith(caches.match(e.request).then(() => 
  (

   fetch(e.request).catch(() => (caches.match('../offline.html') ))
  )
  )
  )
  // event.respondWith(async () => {
  //   try {
  //     // First, try to use the navigation preload response if it's supported.
  //     const preloadResponse = await event.preloadResponse;
  //     if (preloadResponse) {
  //       return preloadResponse;
  //     }

  //     const networkResponse = await fetch(event.request);
  //     return networkResponse;
  //   } catch (error) {
  //     // catch is only triggered if an exception is thrown, which is likely
  //     // due to a network error.
  //     // If fetch() returns a valid HTTP response with a response code in
  //     // the 4xx or 5xx range, the catch() will NOT be called.
  //     console.log('Fetch failed; returning offline page instead.', error);

  //     const cache = await caches.open(CACHE_NAME);
  //     const cachedResponse = await cache.match(OFFLINE_URL);
  //     return cachedResponse;
  //   }
  // })

})

// Activate the SW

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntill(
    caches.keys().then((cacheNames) => Promise.all(cacheNames.map((cacheName) => {
      if (!cacheWhiteList.includes((cacheName))) {
        return caches.delete(cacheName)
      }
    })))
  )
})