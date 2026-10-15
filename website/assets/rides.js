(() => {
 const container=document.getElementById('rides-map');
 if(!container)return;
 if(!window.L){container.querySelector('.map-fallback').textContent='The map could not load. Trip descriptions are available below.';return;}
 const trips={
  hainan:{number:'01',title:'Around Hainan Island',region:'Southern China',description:'A cycling circuit around Hainan Island.',points:[[20.03,110.33],[18.25,109.51]],names:['Northern Hainan','Southern Hainan'],label:[18.7,113.5],bounds:[[17.7,108],[20.7,113]]},
  kunming:{number:'02',title:'Kunming → Hekou',region:'Yunnan · China–Vietnam border',description:'From Kunming to Hekou, ending on the Chinese side of the border with Vietnam.',points:[[25.04,102.72],[22.53,103.94]],names:['Kunming','Hekou'],label:[27,94],bounds:[[21.8,101],[25.7,105]]},
  gannan:{number:'03',title:'Hohhot → Chengdu',region:'Via Gannan',description:'From Hohhot to Chengdu, via Gannan.',points:[[40.84,111.75],[34.6,102.6],[30.57,104.07]],names:['Hohhot','Gannan region','Chengdu'],label:[37.6,111],bounds:[[29.8,101],[41.5,113]]},
  duku:{number:'04',title:'Duku Highway',region:'Xinjiang · Tian Shan mountains',description:'From Dushanzi to Kuqa, across the Tian Shan mountains in Xinjiang.',points:[[44.33,84.89],[41.72,82.96]],names:['Dushanzi','Kuqa'],label:[43.3,88.7],bounds:[[41,82],[45,87]]},
  wuhan:{number:'05',title:'Wuhan → Enshi',region:'Hubei · Central China',description:'A cycling trip from Wuhan to Enshi, across Hubei.',points:[[30.59,114.31],[30.27,109.49]],names:['Wuhan','Enshi'],label:[32.5,116],bounds:[[29.4,108.5],[32,115.5]]}
 };
 container.replaceChildren();
 const map=L.map(container,{scrollWheelZoom:false,minZoom:3,maxZoom:8,zoomSnap:.25});
 map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
 map.attributionControl.addAttribution('Geography: <a href="https://www.naturalearthdata.com/">Natural Earth</a>');
 map.createPane('land');map.getPane('land').style.zIndex=250;
 const allBounds=[[17,73],[54,135]];
 const detail=document.getElementById('ride-detail');
 const choices=[...document.querySelectorAll('[data-ride]')];
 const layers={};let selected='all';
 fetch('../assets/cycling/countries.geojson').then(r=>{if(!r.ok)throw Error('Map unavailable');return r.json()}).then(data=>{
  L.geoJSON(data,{pane:'land',style:f=>({color:f.properties.name==="People's Republic of China"?'#9bad9e':'#dbe2df',weight:f.properties.name==="People's Republic of China"?1.3:.7,fillColor:f.properties.name==="People's Republic of China"?'#edf3ea':'#fafbf9',fillOpacity:1}),interactive:false}).addTo(map);
 }).catch(()=>container.classList.add('map-tiles-unavailable'));
 // Smooth, deliberately schematic connections between user-confirmed places.
 function curve(a,b,bend=.35){
  const mid=[(a[0]+b[0])/2+bend,(a[1]+b[1])/2+bend];
  return Array.from({length:41},(_,i)=>{const t=i/40;return [(1-t)**2*a[0]+2*(1-t)*t*mid[0]+t*t*b[0],(1-t)**2*a[1]+2*(1-t)*t*mid[1]+t*t*b[1]]});
 }
 for(const [key,trip] of Object.entries(trips)){
  let geometry=[];
  if(key==='hainan')geometry=Array.from({length:65},(_,i)=>{const t=i/64*Math.PI*2;return [19.15+1.05*Math.cos(t),109.75+.85*Math.sin(t)]});
  else for(let i=1;i<trip.points.length;i++)geometry.push(...curve(trip.points[i-1],trip.points[i],key==='gannan'?-.45:.18));
  L.polyline(geometry,{color:'#fff',weight:7,opacity:.95,interactive:false}).addTo(map);
  const line=L.polyline(geometry,{color:'#2b6752',weight:3,opacity:.9,className:'ride-route',lineCap:'round'}).addTo(map);
  const hit=L.polyline(geometry,{weight:22,opacity:0}).addTo(map);
  const badge=L.marker(trip.label,{title:trip.title,alt:trip.title,icon:L.divIcon({className:'route-badge',html:'<span>'+trip.number+'</span><b>'+trip.title+'</b>',iconSize:[174,34],iconAnchor:[0,17]})}).addTo(map);
  const dots=[];
  trip.points.forEach((point,i)=>{
   if(key==='hainan')return;
   const dot=L.circleMarker(point,{radius:4,color:'#fff',weight:2,fillColor:'#18453b',fillOpacity:1}).addTo(map);
   dot.bindTooltip(trip.names[i],{direction:'top',offset:[0,-6],className:'ride-label'});
   dots.push(dot);
  });
  layers[key]={line,badge,dots};
  for(const item of [hit,badge]){
   item.on('click',()=>select(key));
   item.on('mouseover',()=>paint(key));item.on('mouseout',()=>paint(selected));
  }
  badge.getElement()?.addEventListener('focus',()=>paint(key));
  badge.getElement()?.addEventListener('blur',()=>paint(selected));
 }
 function paint(key){
  for(const [id,item] of Object.entries(layers)){
   const active=id===key;
   item.line.setStyle({weight:active?4.5:3,opacity:key==='all'||active?1:.55});
   item.line.getElement()?.classList.toggle('route-active',active);
   item.badge.getElement()?.classList.toggle('badge-active',active);
   item.dots.forEach(dot=>active?dot.openTooltip():dot.closeTooltip());
  }
 }
 function select(key){
  selected=key;paint(key);
  choices.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.ride===key)));
  const trip=trips[key],h=document.createElement('h3'),p=document.createElement('p');
  detail.hidden=!trip;
  h.textContent=trip?trip.title:'';
  p.textContent=trip?trip.description:'';
  detail.replaceChildren(...(trip?[h,p]:[]));
  if(trip){
   const zoom=document.createElement('button');zoom.type='button';zoom.className='ride-zoom';zoom.textContent='Explore this area';
   zoom.addEventListener('click',()=>map.flyToBounds(trip.bounds,{padding:[45,45],maxZoom:7,animate:!window.matchMedia('(prefers-reduced-motion: reduce)').matches,duration:.7}));detail.append(zoom);
  }else map.fitBounds(allBounds,{padding:[16,16]});
 }
 choices.forEach(button=>{button.addEventListener('click',()=>select(button.dataset.ride));button.addEventListener('mouseenter',()=>paint(button.dataset.ride));button.addEventListener('mouseleave',()=>paint(selected));});
 new ResizeObserver(()=>{map.invalidateSize({pan:false});if(selected==='all')map.fitBounds(allBounds,{padding:[16,16]});}).observe(container);
 document.querySelector('.ride-notes').hidden=true;
 select('all');
})();
