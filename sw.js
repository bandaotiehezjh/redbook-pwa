const NAME='english-commute-v12',FILES=['./','./index.html','./styles.css','./vocabulary-data.js','./app.js','./manifest.webmanifest','./icon.svg','./content-upgrade.css','./content-upgrade.js','./audio-upgrade.css','./audio-upgrade.js','./wife-upgrade.css','./wife-upgrade.js','./tap-dictionary.css','./tap-dictionary.js','./layout-fix.css','./queue-fix.css','./queue-fix.js','./vocabulary-ui.js','./priority-order.js','./top-reading.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(NAME).then(c=>c.addAll(FILES)));
self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==NAME).map(k=>caches.delete(k)))));
self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();
e.waitUntil(caches.open(NAME).then(c=>c.put(e.request,copy)));
return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});




