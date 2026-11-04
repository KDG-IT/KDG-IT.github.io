/* ThinkIt immutable static-only offline cache; no user data. */
const CACHE="thinkit-static-t42c1-11eee8e45cad";
const ASSETS=["./","./assets/bubble-0.css","./assets/bubble-0.js","./assets/bubble-1.css","./assets/bubble-1.js","./assets/bubble-2.css","./assets/bubble-2.js","./assets/bubble-3.css","./assets/outline-print.css","./assets/outline-print.js","./assets/outline-wbs.js","./assets/outline-workspace.css","./assets/print-layout.js","./assets/thinkit-0.css","./assets/thinkit-0.js","./assets/thinkit-1.css","./assets/thinkit-1.js","./assets/thinkit-2.js","./bubble.html","./index.html","./manifest.webmanifest","./outline-print.html","./standalone-bootstrap.js"];
const PATHS=new Set(ASSETS.map(p=>new URL(p,self.registration.scope).pathname));
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.origin!==self.location.origin||!PATHS.has(url.pathname))return;e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request,{ignoreSearch:true}))||fetch(e.request)));});
