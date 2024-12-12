const CACHE_NAME = 'v1_cache_sop_products';
const urlsToCache = [
    '/',                  // Caché de la página principal
    '/index.html',        // Página de listado de productos
    '/registro.html',     // Página de registro de productos
    '/styles.css',        // Hoja de estilos
    '/script.js',         // Lógica de la página
    '/logo.png',
    '/offline.html'          // Logo de la página
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Archivos en caché');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché antigua', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes y servir desde la caché
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si hay caché, se devuelve, de lo contrario, se realiza la solicitud
                return response || fetch(event.request).catch(() => {
                    // Muestra una página personalizada si no hay conexión y no está en caché
                    if (event.request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});
