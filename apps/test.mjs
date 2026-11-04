import fs from 'node:fs';
import assert from 'node:assert/strict';
const text=(file)=>fs.readFileSync(new URL('./'+file,import.meta.url),'utf8');
const r=JSON.parse(text('registry.json'));
const html=text('index.html'), script=text('app.js'), worker=text('sw.js');
assert.equal(r.schema,'app-ecosystem.launch.v1');
assert.deepEqual(r.apps.map(a=>a.id).sort(),['keepit','liveit','thinkit','travelit']);
const wanted={keepit:'https://kdg-007.github.io/',thinkit:'/thinkit/',liveit:'https://kdg-007.github.io/partners/liveit/thinkit/1a26c53e24e1b903260b/index.html',travelit:'/'};
for(const a of r.apps){
 assert.equal(a.url,wanted[a.id]);
 const u=new URL(a.url,'https://kdg-it.github.io');
 assert.ok(a.mode==='embedded'&&u.origin==='https://kdg-it.github.io'||a.mode==='external'&&u.origin==='https://kdg-007.github.io');
 assert.ok(html.includes('data-app="'+a.id+'"'));
}
assert.ok(html.includes('Open TravelIt')&&html.includes('Open ThinkIt')&&html.includes('Open KeepIt')&&html.includes('Open LiveIt'));
assert.ok(!/localStorage\.(clear|removeItem)|indexedDB\.deleteDatabase|caches\.delete/.test(script+worker));
assert.ok(worker.includes("url.pathname.startsWith('/apps/')")&&!worker.includes('skipWaiting'));
assert.ok(!worker.includes('travelit-foundation-shell'));
assert.ok(html.includes('frame-src \'self\''));
assert.deepEqual(JSON.parse(text('manifest.webmanifest')).scope,'/apps/');
console.log('PASS: shared suite routing, original owners, scoped worker, no app data migration');
