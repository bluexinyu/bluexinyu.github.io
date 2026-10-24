(() => {
 const bar=document.querySelector('.network-tabs');
 if(!bar)return;
 const tabs=[...bar.querySelectorAll('[role=tab]')];
 function activate(tab,focus=false){
  tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});
  if(focus)tab.focus();
 }
 bar.hidden=false;
 activate(tabs[0]);
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>activate(tab));
  tab.addEventListener('keydown',e=>{
   const target=e.key==='Home'?0:e.key==='End'?tabs.length-1:e.key==='ArrowRight'?(i+1)%tabs.length:e.key==='ArrowLeft'?(i+tabs.length-1)%tabs.length:null;
   if(target!==null){e.preventDefault();activate(tabs[target],true);}
  });
 });
})();
// Highlight all observed connections of a focused or hovered researcher.
(() => {
 const map=document.querySelector('.coauthor-map');
 if(!map)return;
 const edges=[...map.querySelectorAll('.network-edge')];
 const nodes=[...map.querySelectorAll('.network-person')];
 let hovered=null,focused=null;
 function highlight(){
  const key=hovered||focused,related=new Set(key?[key]:[]);
  map.classList.toggle('is-exploring',!!key);
  edges.forEach(edge=>{
   const active=!!key&&(edge.dataset.a===key||edge.dataset.b===key);
   edge.classList.toggle('edge-active',active);
   if(active){related.add(edge.dataset.a);related.add(edge.dataset.b);}
  });
  nodes.forEach(node=>{
   node.classList.toggle('node-related',related.has(node.dataset.author));
   node.classList.toggle('node-selected',node.dataset.author===key);
  });
 }
 nodes.forEach(node=>{
  node.addEventListener('mouseenter',()=>{hovered=node.dataset.author;highlight();});
  node.addEventListener('mouseleave',()=>{hovered=null;highlight();});
  node.addEventListener('focusin',()=>{focused=node.dataset.author;highlight();});
  node.addEventListener('focusout',()=>{focused=null;highlight();});
 });
 const institutions=document.querySelector('.network-institutions');
 const networkTab=document.getElementById('network-tab');
 const compactView=window.matchMedia('(max-width:1000px)');
 function syncView(){
  const compact=compactView.matches;
  if(networkTab)networkTab.textContent=compact?'By institution':'Network';
  if(institutions)institutions.open=compact;
  if(compact){
   if(map.contains(document.activeElement)&&networkTab)networkTab.focus();
   hovered=null;
   focused=null;
   highlight();
  }
 }
 syncView();
 compactView.addEventListener('change',syncView);
})();
// Scale nodes by shared works on the Research page, add a hover card, and draw the network in once.
(() => {
 const map=document.querySelector('.coauthor-map');
 if(!map)return;
 const edges=[...map.querySelectorAll('.network-edge')],nodes=[...map.querySelectorAll('.network-person')];
 edges.forEach(edge=>{const n=+((edge.querySelector('title')?.textContent.match(/(\d+) shared work/)||[])[1]||1);edge.style.strokeWidth=Math.min(1+n*.45,4.5);});
 const card=document.createElement('div');card.className='network-card';card.hidden=true;
 map.parentNode.style.position='relative';map.parentNode.append(card);
 nodes.forEach(node=>{
  const me=node.dataset.author==='X Zhang',n=+node.dataset.works||0;
  const halo=node.querySelector('.network-halo'),dot=node.querySelector('.network-dot'),text=node.querySelector('text');
  const r=me?20:Math.min(9+n*1.4,20);
  halo.setAttribute('r',r);dot.setAttribute('r',me?8:Math.min(4+n*.4,8));
  text.setAttribute('y',+text.getAttribute('y')-(r-12));
  const label=(node.querySelector('a')?.getAttribute('aria-label')||'').split('. Open')[0];
  const [name,...place]=label.split(', ');
  node.addEventListener('mouseenter',()=>{
   card.replaceChildren();
   const add=(tag,txt)=>{const el=document.createElement(tag);el.textContent=txt;card.append(el);};
   add('strong',name);add('span',place.join(', '));
   add('em',me?n+' works listed on this site':n?n+' shared work'+(n>1?'s':'')+' with Xinyu':'Connected through co-authors');
   const box=halo.getBoundingClientRect(),host=map.parentNode.getBoundingClientRect();
   card.style.left=(box.left-host.left+box.width/2)+'px';card.style.top=(box.bottom-host.top+10)+'px';card.hidden=false;
  });
  node.addEventListener('mouseleave',()=>{card.hidden=true;});
 });
 if(matchMedia('(prefers-reduced-motion:reduce)').matches||!Element.prototype.animate)return;
 let drawn=false;
 function draw(){
  if(drawn||!map.getBoundingClientRect().width)return;drawn=true;
  edges.forEach((edge,i)=>{const len=edge.getTotalLength?edge.getTotalLength():300;edge.animate([{strokeDasharray:len,strokeDashoffset:len},{strokeDasharray:len,strokeDashoffset:0}],{duration:900,delay:i*30,easing:'ease-out',fill:'backwards'});});
  nodes.forEach((node,i)=>node.animate([{opacity:0},{opacity:1}],{duration:450,delay:150+i*55,easing:'ease-out',fill:'backwards'}));
 }
 const panel=map.closest('[role=tabpanel]');
 if(panel)new MutationObserver(()=>{if(!panel.hidden)requestAnimationFrame(draw);}).observe(panel,{attributes:true,attributeFilter:['hidden']});
 draw();
})();
