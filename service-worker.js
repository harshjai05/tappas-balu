// A name for the cache
const CACHE_NAME = 'fireworks-app-v1';

// All the files to be saved for offline use
const urlsToCache = [
  '.', // This refers to the index.html file
  'index.html',
  'wallpaper.jpg',
  'boom.mp3',
  'song.mp3',
  'icon-192.png',
  'icon-512.png'
];

// When the service worker is installed, open the cache and add the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_-NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// When the browser requests a file, try to serve it from the cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it. Otherwise, fetch it from the network.
        return response || fetch(event.request);
      }
    )
  );
});
