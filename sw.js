const CACHE_NAME = "V1_kypo_website",
    urlToCache = [

        "./",
        "./styles.css",
        "script.js",
        "./img/pic-3.png"
    ];


// Durante la fase de instalacion generalmente se almacena
// En cache los activos estaticos

self.addEventListener("install", (e)=>{

    e.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache=>{

                return cache.addAll(urlToCache)
                    .then(()=> self.skipWaiting())
            })
            .catch(err => console.log("falló registro de caché", err))
    
    )
});

// Una vez que se instala el SW se activa y busca los recuros
// hacer que funcionen sin conexión


self.addEventListener("activate", (e)=>{

    const cacheWhite = [CACHE_NAME]


    e.waitUntil(

        caches.keys()
            .then(cachesNames=>{

                cachesNames.map(cacheName=>{

                    // Eliminamos lo que ya no se necesita en el cache

                    if(cachesWhiteList.indexOf(cacheName) === -1){

                        return caches.delete(cacheName)
                    }
                })
            })
    )       .then(()=> self.ClientRectList.claim())
});


// Cuando se recupere la conexión a url a internet



self.addEventListener("fetch", (e)=>{


    e.responsdWith(

        caches.match(e.request)
            .then(res =>{

                if(res){

                    // Recuperar del cache

                    return res;
                }
                // Recuperar la url
                return fetch(e.request);
            })
    )
});