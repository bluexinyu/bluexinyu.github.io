(() => {
 const directory=document.querySelector('.research-directory');
 if(!directory)return;
 const tabs=[...directory.querySelectorAll('a')];
 const panels=tabs.map(tab=>document.getElementById(tab.hash.slice(1)));
 const compact=window.matchMedia('(max-width:800px)');
 directory.setAttribute('role','tablist');
 function orientation(){directory.setAttribute('aria-orientation',compact.matches?'horizontal':'vertical');}
 orientation();compact.addEventListener('change',orientation);
 tabs.forEach((tab,i)=>{
  tab.setAttribute('role','tab');
  tab.setAttribute('aria-controls',panels[i].id);
  panels[i].setAttribute('role','tabpanel');
  panels[i].setAttribute('aria-labelledby',tab.id);
  panels[i].tabIndex=0;
 });
 function activate(index,focus=false,updateURL=false){
  tabs.forEach((tab,i)=>{
   const selected=i===index;
   tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
   panels[i].hidden=!selected;
  });
  if(focus)tabs[index].focus();
  if(updateURL)history.pushState(null,'',tabs[index].hash);
 }
 function fromURL(){
  const index=tabs.findIndex(tab=>tab.hash===location.hash);
  activate(index>=0?index:tabs.findIndex(tab=>tab.hash==='#human-ai-interaction'));
 }
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',event=>{event.preventDefault();activate(i,false,true);});
  tab.addEventListener('keydown',event=>{
   const forward=compact.matches?'ArrowRight':'ArrowDown',back=compact.matches?'ArrowLeft':'ArrowUp';
   const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:event.key===forward?(i+1)%tabs.length:event.key===back?(i+tabs.length-1)%tabs.length:null;
   if(next!==null){event.preventDefault();activate(next,true,true);}
   else if(event.key===' '){event.preventDefault();activate(i,false,true);}
  });
 });
 window.addEventListener('popstate',fromURL);window.addEventListener('hashchange',fromURL);
 fromURL();
})();

(() => {
 // Research: filter the single publication list by area; #area hashes keep old links working.
 const bar=document.querySelector('.pub-filters');
 if(!bar)return;
 const buttons=[...bar.querySelectorAll('button')];
 const sections=[...document.querySelectorAll('.pub-section')];
 function apply(area,updateURL){
  if(!buttons.some(b=>b.dataset.filter===area))area='all';
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===area)));
  let total=0;
  sections.forEach(section=>{
   let shown=0;
   section.querySelectorAll('.pub-year').forEach(group=>{
    let n=0;group.querySelectorAll('.pub').forEach(li=>{const on=area==='all'||li.dataset.area===area;li.hidden=!on;n+=on;});
    group.hidden=!n;shown+=n;
   });
   section.hidden=!shown;total+=shown;
   const count=section.querySelector('.pub-count');if(count)count.textContent=shown;
  });
  document.querySelector('.pub-empty').hidden=total>0;
  if(updateURL)history.replaceState(null,'',area==='all'?location.pathname:'#'+area);
 }
 buttons.forEach(b=>b.addEventListener('click',()=>apply(b.dataset.filter,true)));
 window.addEventListener('hashchange',()=>apply(location.hash.slice(1),false));
 apply(location.hash.slice(1),false);
})();
