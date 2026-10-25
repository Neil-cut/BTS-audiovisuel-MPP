/* js/ui/nav.js — barre latérale, navigation et ordre des matières (glisser-déposer, sauvegardé dans st.order) */

let LASTDRAG=0;
/* matières triées selon l’ordre choisi ; les nouvelles matières (absentes de st.order) restent à la fin */
const SO=()=>{const o=st.order||[];return [...S].sort((a,b)=>{const i=o.indexOf(a.id),j=o.indexOf(b.id);return(i<0?1e3:i)-(j<0?1e3:j)})};
function setOrder(ids,focus){
 st.order=ids;save();nav();if(cur=="home")home();
 if(focus){const f=$("nav").querySelector('[data-id="'+focus+'"]');if(f)f.focus()}
}
function nav(){
 $("nav").innerHTML=`<button class="${cur=="home"?"on":""}" data-id="home">🏠 Tableau de bord</button>`
 +SO().map(s=>`<button class="${cur==s.id?"on":""}" data-id="${s.id}" title="Glisse pour réorganiser (ou Alt + flèches)">${s.i} ${s.n}</button>`).join("")
 +`<button class="${cur=="cine"?"on":""}" data-id="cine">🎞️ Ciné-club</button>`
 +`<small class="navx mu">↕ Glisse les matières pour les réorganiser${st.order&&st.order.length?` · <a href="#" id="nreset">↺ ordre par défaut</a>`:""}</small>`;
 $("nav").querySelectorAll("button").forEach(b=>b.onclick=()=>{if(performance.now()-LASTDRAG<400)return;cur=b.dataset.id;tab="cours";go()});
 const r=$("nreset");if(r)r.onclick=e=>{e.preventDefault();delete st.order;save();nav();if(cur=="home")home()};
 dragNav();
}

/* glisser-déposer au pointeur : souris (dès 5 px de déplacement) et tactile (appui long 0,3 s) ; Alt + flèches au clavier */
function dragNav(){
 const box=$("nav"),items=()=>[...box.querySelectorAll("button[data-id]:not([data-id=home]):not([data-id=cine])")];
 items().forEach(b=>{
  b.onkeydown=e=>{
   if(!e.altKey)return;
   const k=e.key,d=(k=="ArrowUp"||k=="ArrowLeft")?-1:(k=="ArrowDown"||k=="ArrowRight")?1:0;
   if(!d)return;e.preventDefault();
   const ids=SO().map(s=>s.id),i=ids.indexOf(b.dataset.id),j=i+d;
   if(j<0||j>=ids.length)return;
   ids.splice(j,0,ids.splice(i,1)[0]);setOrder(ids,b.dataset.id);
  };
  b.onpointerdown=e=>{
   if(e.pointerType=="mouse"&&e.button!==0)return;
   const touch=e.pointerType!="mouse",sx=e.clientX,sy=e.clientY,pid=e.pointerId,id=b.dataset.id,horiz=getComputedStyle(box).display=="flex";
   let on=false,tm=0,rects=[],others=[],t=0;
   const mark=()=>{others.forEach(o=>o.classList.remove("ins-before","ins-after"));if(t<others.length)others[t].classList.add("ins-before");else if(others.length)others[others.length-1].classList.add("ins-after")};
   const pos=(x,y)=>{const p=horiz?x:y;let n=0;rects.forEach(r=>{if(p>(horiz?r.left+r.width/2:r.top+r.height/2))n++});return n};
   const clean=()=>{b.classList.remove("drag");b.style.transform="";document.body.classList.remove("dragging");others.forEach(o=>o.classList.remove("ins-before","ins-after"))};
   const begin=()=>{
    on=true;others=items().filter(x=>x!==b);rects=others.map(x=>x.getBoundingClientRect());
    b.classList.add("drag");document.body.classList.add("dragging");box.classList.toggle("horiz",horiz);
    try{b.setPointerCapture(pid)}catch(_){}
    if(navigator.vibrate)navigator.vibrate(12);
   };
   const stop=()=>{clearTimeout(tm);removeEventListener("pointermove",move);removeEventListener("pointerup",up);removeEventListener("pointercancel",cancel);removeEventListener("touchmove",tmv)};
   const move=ev=>{
    if(ev.pointerId!==pid)return;
    const dx=ev.clientX-sx,dy=ev.clientY-sy;
    if(!on){
     if(touch){if(Math.hypot(dx,dy)>8)stop()}   /* le doigt défile : ce n’est pas un glisser */
     else if(Math.hypot(dx,dy)>5)begin();
     if(!on)return;
    }
    b.style.transform=`translate(${horiz?dx:0}px,${horiz?0:dy}px)`;
    t=pos(ev.clientX,ev.clientY);mark();
   };
   const up=ev=>{
    if(ev.pointerId!==pid)return;
    const was=on;stop();if(!was)return;
    LASTDRAG=performance.now();clean();
    const ids=others.map(x=>x.dataset.id);ids.splice(t,0,id);
    if(ids.join()!==SO().map(s=>s.id).join())setOrder(ids,id);
   };
   const cancel=ev=>{if(ev.pointerId!==pid)return;const was=on;stop();if(was){LASTDRAG=performance.now();clean()}};
   const tmv=ev=>{if(on&&ev.cancelable)ev.preventDefault()};
   b.oncontextmenu=ev=>{if(on)ev.preventDefault()};
   addEventListener("pointermove",move);addEventListener("pointerup",up);addEventListener("pointercancel",cancel);
   addEventListener("touchmove",tmv,{passive:false});
   if(touch)tm=setTimeout(begin,320);
  };
 });
}

function go(){nav();cur=="home"?home():cur=="cine"?cine():subj();window.scrollTo(0,0);fxEnter()}
