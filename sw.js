const NAME='english-commute-v20',FILES=['./','./index.html','./styles.css','./vocabulary-data.js','./app.js','./manifest.webmanifest','./icon.svg','./content-upgrade.css','./content-upgrade.js','./audio-upgrade.css','./audio-upgrade.js','./wife-upgrade.css','./wife-upgrade.js','./tap-dictionary.css','./tap-dictionary.js','./layout-fix.css','./queue-fix.css','./queue-fix.js','./vocabulary-ui.js','./base-extras.js','./exam-priority-data.js','./priority-order.js','./top-reading.js','./word-auto-read.css','./word-auto-read.js','./exam-priority-ui.css','./exam-priority-ui.js','./word-inline-controls.css','./phonetic-data.js','./word-inline-controls.js','./full-dictionary-data.js','./dictionary-expansion.js','./recall-layout.css','./recall-layout.js','./offline-cache.css','./offline-cache.js','./fixed-audio.js','./fixed-audio-manifest.json','./special-study.css','./special-study.js','./study-detail.css','./medical353.html','./medical353.js','./medical353-data.js','./english-expansion.html','./english-expansion.js','./english-expansion-data.js','./resources/medical353.txt','./resources/essay-topics.txt','./LICENSE-ECDICT.txt'];
async function cacheAll(){const cache=await caches.open(NAME);await cache.addAll(FILES);const manifest=await fetch('./fixed-audio-manifest.json').then(r=>r.json());const resources=['./resources/root-affix-map.pdf','./resources/essay-topic-vocabulary.pdf','./resources/medical353.pdf'];const urls=[...new Set([...Object.values(manifest.words),...Object.values(manifest.content)].map(x=>x.file).concat(resources))];for(let i=0;i<urls.length;i+=8)await Promise.allSettled(urls.slice(i,i+8).map(url=>cache.add(url)));for(const client of await self.clients.matchAll())client.postMessage({type:'CACHE_COMPLETE'});}
self.addEventListener('install',e=>{e.waitUntil(caches.open(NAME).then(c=>c.addAll(FILES)));
self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==NAME).map(k=>caches.delete(k)))));
self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();
e.waitUntil(caches.open(NAME).then(c=>c.put(e.request,copy)));
return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
self.addEventListener('message',e=>{if(e.data?.type==='CACHE_ALL')e.waitUntil(cacheAll());if(e.data?.type==='CLEAR_CACHE')e.waitUntil(caches.delete(NAME))});




