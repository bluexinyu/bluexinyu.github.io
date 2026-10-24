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
