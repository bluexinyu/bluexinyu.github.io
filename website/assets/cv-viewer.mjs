import * as pdfjs from './pdfjs/pdf.min.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('./pdfjs/pdf.worker.min.mjs', import.meta.url).href;
const viewer=document.querySelector('#cv-viewer');
const canvas=document.querySelector('#cv-canvas');
const stage=document.querySelector('#cv-stage');
const sheet=document.querySelector('#cv-page');
const textContainer=document.querySelector('#cv-text-layer');
const links=document.querySelector('#cv-link-layer');
const status=document.querySelector('#cv-page-status');
const previous=document.querySelector('#cv-previous');
const next=document.querySelector('#cv-next');
const zoom=document.querySelector('#cv-zoom');
let doc,pageNumber=1,renderTask=null,textTask=null,version=0;
function reportError(e){
 if(e.name==='RenderingCancelledException'||e.name==='AbortException')return;
 status.textContent='Please use Open PDF above to read the CV.';
 viewer.setAttribute('aria-busy','false');console.error('CV viewer:',e);
}
async function render(){
 if(!doc)return;
 const current=++version,requestedPage=pageNumber;
 textTask?.cancel();textTask=null;
 if(renderTask){renderTask.cancel();try{await renderTask.promise}catch{}}
 if(current!==version)return;
 textContainer.replaceChildren();links.replaceChildren();
 viewer.setAttribute('aria-busy','true');
 const page=await doc.getPage(requestedPage);
 if(current!==version)return;
 const base=page.getViewport({scale:1});
 const available=Math.max(180,stage.clientWidth-32);
 const width=Math.min(available,1000)*Number(zoom.value);
 const viewport=page.getViewport({scale:width/base.width});
 const ratio=Math.min(window.devicePixelRatio||1,2);
 sheet.style.width=viewport.width+'px';sheet.style.height=viewport.height+'px';
 sheet.style.setProperty('--total-scale-factor',viewport.scale);
 sheet.setAttribute('aria-label',`CV page ${requestedPage} of ${doc.numPages}`);
 canvas.width=Math.ceil(viewport.width*ratio);canvas.height=Math.ceil(viewport.height*ratio);
 canvas.style.width=viewport.width+'px';canvas.style.height=viewport.height+'px';
 status.textContent=`Page ${requestedPage} of ${doc.numPages}`;
 previous.disabled=requestedPage===1;next.disabled=requestedPage===doc.numPages;
 renderTask=page.render({canvasContext:canvas.getContext('2d'),viewport,transform:[ratio,0,0,ratio,0,0]});
 await renderTask.promise;
 const [text,annotations]=await Promise.all([page.getTextContent(),page.getAnnotations({intent:'display'})]);
 if(current!==version)return;
 textTask=new pdfjs.TextLayer({textContentSource:text,container:textContainer,viewport});
 await textTask.render();
 if(current!==version)return;
 for(const annotation of annotations){
  if(annotation.subtype!=='Link'||!annotation.url)continue;
  let url;try{url=new URL(annotation.url)}catch{continue}
  if(!['https:','http:','mailto:','tel:'].includes(url.protocol))continue;
  const [x1,y1,x2,y2]=viewport.convertToViewportRectangle(annotation.rect);
  const a=document.createElement('a');
  a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';
  a.setAttribute('aria-label',`Open ${url.href}`);
  Object.assign(a.style,{left:Math.min(x1,x2)+'px',top:Math.min(y1,y2)+'px',width:Math.abs(x2-x1)+'px',height:Math.abs(y2-y1)+'px'});
  links.append(a);
 }
 viewer.setAttribute('aria-busy','false');
}
function refresh(){render().catch(reportError)}
previous.addEventListener('click',()=>{if(pageNumber>1){pageNumber--;stage.scrollTop=0;refresh();}});
next.addEventListener('click',()=>{if(pageNumber<doc.numPages){pageNumber++;stage.scrollTop=0;refresh();}});
zoom.addEventListener('change',refresh);
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(refresh,120);});
try{
 doc=await pdfjs.getDocument({url:viewer.dataset.pdf,standardFontDataUrl:new URL('./pdfjs/standard_fonts/',import.meta.url).href}).promise;
 await render();
}catch(e){reportError(e)}
