// Verificar si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
    // Registrar el Service Worker al cargar la página
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
} else {
    console.log('Service Worker no es compatible con este navegador.');
}
