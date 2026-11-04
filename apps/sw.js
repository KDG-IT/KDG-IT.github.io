/* Your Apps launcher only. Does not intercept any other application's routes or data. */
const NAME='app-ecosystem-launcher-apps-v2';
const FILES=['./','./index.html','./style.css','./app.js','./registry.json','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(NAME).then(c=>c.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith('/apps/'))return;
 if(event.request.mode==='navigate')event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));
 else event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request)));
});