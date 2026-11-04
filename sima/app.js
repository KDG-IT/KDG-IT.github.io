import registry from './registry.json' with {type:'json'};
const apps=new Map(registry.apps.map(app=>[app.id,app]));
const $=id=>document.getElementById(id);
const nav=[...document.querySelectorAll('.nav button')];
if(registry.schema!=='app-ecosystem.launch.v1'||apps.size!==4)throw Error('Invalid shared application registry');
for(const app of apps.values()){
 const url=new URL(app.url,location.origin);
 if(!['embedded','external'].includes(app.mode)||app.mode==='embedded'&&url.origin!==location.origin||app.mode==='external'&&url.origin!=='https://kdg-007.github.io')throw Error('Unsafe application destination: '+app.id);
}
const selected=()=>new URL(location.href).searchParams.get('app')||'home';
function show(name,push=false){
 if(!apps.has(name))name='home';
 if(push){const u=new URL(location.href);if(name==='home')u.searchParams.delete('app');else u.searchParams.set('app',name);history.pushState({app:name},'',u);}
 for(const b of nav){if(b.dataset.app===name)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')}
 $('home').hidden=name!=='home';$('active').hidden=name==='home';
 if(name==='home'){$('appframe').removeAttribute('src');$('pane').hidden=true;return}
 const a=apps.get(name);
 $('group').textContent=a.group+' · '+a.release;$('appname').textContent=a.name;$('summary').textContent=a.summary;$('status').textContent=a.state;$('data').textContent='Storage: '+a.data;$('notes').textContent='Notes: '+a.notes;
 $('full').href=a.url;$('full').textContent='Open '+a.name+' full screen';
 if(a.mode==='embedded'){
  $('external').hidden=true;$('pane').hidden=false;
  const url=new URL(a.url,location.origin).href;
  if($('appframe').src!==url)$('appframe').src=url;
  $('appframe').title=a.name+' workspace';
 }else{
  $('appframe').removeAttribute('src');$('pane').hidden=true;$('external').hidden=false;
  $('externalname').textContent='Open '+a.name+' in its existing app';
  $('externalurl').href=a.url;$('externalurl').textContent='Open '+a.name;
 }
}
nav.forEach(b=>b.addEventListener('click',()=>show(b.dataset.app,true)));
window.addEventListener('popstate',()=>show(selected()));
show(selected());
if('serviceWorker' in navigator && location.protocol==='https:' && location.pathname.startsWith('/sima/')){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{}),{once:true});
}