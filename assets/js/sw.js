//Asignar nombre y version de la cache

const CACHE_NAME = 'redtexas-cache-v1';

//Archivos que se incluyen en la cache

const urlsToCache = [
    '/',
    '/index.html',
    '/menu.html',
    '/encuesta.html',
    '/assets/css/main.css',
    '/assets/css/menu.css',
    '/assets/css/encuesta.css',
    '/assets/css/colorbox.css',
    '/assets/js/main.js',
    '/assets/js/locales.js',
    '/assets/js/jquery.colorbox.js',
    '/assets/fonts',
    '/assets/pdfs',
    '/assets/img/cruz-19.png',
    '/assets/img/FAVICON-12.png',
    '/assets/img/fondo-10.jpg',
    '/assets/img/fondo-rojo.jpg',
    '/assets/img/fotos-04.png',
    '/assets/img/fotos-05.png',
    '/assets/img/fotos-06.png',
    '/assets/img/fotos-07.png',
    '/assets/img/fotos-08.png',
    '/assets/img/fotos-09.png',
    '/assets/img/fotos-11.png',
    'assets/img/LOGO-04.png',
    'assets/img/LOGO-05.png',
    '/assets/img/movil-04.jpeg',
    '/assets/img/movil-05.jpeg',
    '/assets/img/movil-06.jpeg',
    '/assets/img/menus/1-ENTRADAS.jpg',
    '/assets/img/menus/2-ENSALADAS.jpg',
    '/assets/img/menus/3-CORTES.jpg',
    '/assets/img/menus/4-PLATILLOS.jpg',
    '/assets/img/menus/5-TACOS.jpg',
    '/assets/img/menus/6-PARRILLADAS.jpg',
    '/assets/img/menus/7-OTROS.jpg',
    '/assets/img/menus/8-COMPLEMENTOS.jpg',
    '/assets/img/menus/9-POSTRES.jpg',
    '/assets/img/menus/10-CERVEZA.jpg',
    '/assets/img/menus/11-SHOTS.jpg',
    '/assets/img/menus/12-DRINKS.jpg',
    '/assets/img/menus/13-DRINKS-2.jpg',
    '/assets/img/menus/14-DIGESTIVOS.jpg',
    '/assets/img/menus/15-VINOS.jpg',
    '/assets/img/menus/16-SIN-ALCOHOL.jpg',
    '/assets/img/imagenes/resized_image_aspect_16x16.png',
    'assets/img/imagenes/resized_image_aspect_32x32.png',
    'assets/img/imagenes/resized_image_aspect_64x64.png',
    'assets/img/imagenes/resized_image_aspect_96x96.png',
    'assets/img/imagenes/resized_image_aspect_128x128.png',
    'assets/img/imagenes/resized_image_aspect_192x192.png',
    'assets/img/imagenes/resized_image_aspect_256x256.png',
    'assets/img/imagenes/resized_image_aspect_384x384.png',
    'assets/img/imagenes/resized_image_aspect_512x512.png',
    'assets/img/imagenes/resized_image_aspect_1024x1024.png',
]

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
        .then(() =>{
            self.skipWaiting();
        })
        .catch(err => {
            console.log('No se a cargado la cache', err);
        })
    );
});

self.addEventListener('activate', e=>{
    //Añadimos todos los elementos en la cache
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => 
        {
            return Promise.all(
                cacheNames.map(cacheName => 
                {
                    if (cacheWhitelist.indexOf(cacheName) === -1) 
                    {
                        //Borrar los elementos que ya no estan en la cache o no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );           
        })
        //Activar el cache en el dispositivo
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
       .then(res => {
            if (res){
                //Devuelve datos desde la cache
                return res;
            }
            return fetch(e.request);
       })
    );
});