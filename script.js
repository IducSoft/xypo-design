
if("serviceWorker" in navigator){

    navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("si tiene service worker", reg))
        .catch(err => console.warn("error", err))
    
}

