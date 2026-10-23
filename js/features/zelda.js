/* js/features/zelda.js — extras du thème Zelda (à charger après fx.js et avant app.js) */

const ZL=()=>document.documentElement.dataset.theme=="zelda";

/* polices : Cinzel (titres) + Press Start 2P (chiffres) */
(function(){const l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Press+Start+2P&display=swap";document.head.appendChild(l)})();

/* ---------- état : cœurs (en quarts) et rubis ---------- */
const ZH={hp:12,max:12,rup:0,wrong:0,inv:false};
try{const s=JSON.parse(localStorage.getItem("zhud")||"{}");if(s.hp>0)ZH.hp=Math.min(12,s.hp|0);ZH.rup=s.rup|0}catch(e){}
const zSave=()=>{try{localStorage.setItem("zhud",JSON.stringify({hp:ZH.hp,rup:ZH.rup}))}catch(e){}};

/* ---------- cœurs pixel-art dans la barre latérale ---------- */
const ZG=[".##.##.","#######","#######","#######",".#####.","..###..","...#..."];
const zHeart=(i,q)=>{
 let b="";
 ZG.forEach((r,y)=>[...r].forEach((c,x)=>{if(c=="#")b+='<rect x="'+x+'" y="'+y+'" width="1" height="1"/>'}));
 return '<svg viewBox="0 0 7 7" width="22" height="22" shape-rendering="crispEdges"><defs><clipPath id="zc'+i+'"><rect width="'+(q*7/4)+'" height="7"/></clipPath></defs><g fill="#3b1216">'+b+'</g><g fill="#e8232d" clip-path="url(#zc'+i+')">'+b+'</g><rect x="1" y="1" width="1" height="1" fill="#ffb3b8" opacity="'+(q>=2?1:0)+'"/></svg>';
};
const zRender=()=>{
 const h=$("zhud");if(!h)return;
 let s="";for(let i=0;i<3;i++)s+=zHeart(i,Math.max(0,Math.min(4,ZH.hp-i*4)));
 h.innerHTML='<div class="zh">'+s+'</div><div class="zr">◆ '+String(ZH.rup).padStart(3,"0")+'</div>';
};
const zs=document.querySelector("aside small");
if(zs){zs.insertAdjacentHTML("afterend",'<div id="zhud"></div>');zRender()}
const zHeal=n=>{ZH.hp=Math.min(ZH.max,ZH.hp+n);zSave();zRender()};

/* coup reçu (mauvaise réponse) : -1 quart, puis ~2 s d'invincibilité (clignotement) */
const zHit=()=>{
 if(!ZL()||ZH.inv)return;
 ZH.inv=true;ZH.hp=Math.max(0,ZH.hp-1);
 const h=$("zhud");if(h)h.classList.add("hit");
 setTimeout(()=>{ZH.inv=false;const k=$("zhud");if(k)k.classList.remove("hit")},2000);
 if(ZH.hp<=0){toast("💀 Game Over… Link se relève avec 3 cœurs");setTimeout(()=>{ZH.hp=ZH.max;zSave();zRender()},1500)}
 zSave();zRender();
};

/* 3 mauvaises réponses d'affilée : Bois Perdus */
const zLost=()=>{
 toast("🌲 Perdu dans les Bois Perdus… tu deviens un Skull Kid 💀");
 const f=document.createElement("div");f.className="zfog";document.body.appendChild(f);setTimeout(()=>f.remove(),3200);
};
let zLW=0;
const zWrong=()=>{
 const n=Date.now();if(n-zLW<600)return;zLW=n;
 ZH.wrong++;
 if(ZH.wrong>=3){ZH.wrong=0;zLost()}
 zHit();
};

/* détection d'une mauvaise réponse : une option qui reçoit la classe « ko » */
const zSeen=new WeakSet();
const zKo=el=>{if(!ZL()||zSeen.has(el))return;zSeen.add(el);zWrong()};
new MutationObserver(ms=>{
 for(const m of ms){
  if(m.type=="attributes"){
   const t=m.target;
   if(t.classList&&t.classList.contains("opt")&&t.classList.contains("ko")&&!(m.oldValue||"").split(/\s+/).includes("ko"))zKo(t);
  }else m.addedNodes.forEach(n=>{
   if(n.nodeType!=1)return;
   if(n.matches&&n.matches(".opt.ko"))zKo(n);
   if(n.querySelectorAll)n.querySelectorAll(".opt.ko").forEach(zKo);
  });
 }
}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class"],attributeOldValue:true});

/* ---------- sons : jingle de secret, fanfare, coffre ---------- */
const _ok=sfx.ok,_win=sfx.win;
sfx.ok=()=>ZL()?[784,740,622,440,415,659,831,1047].forEach((f,i)=>tone(f,f,.12,"triangle",.11,i*.085)):_ok();
sfx.win=()=>{
 if(ZL()){[523,659,784,1047,1319].forEach((f,i)=>tone(f,f,i==4?.5:.2,"triangle",.13,i*.12));zChest()}
 else _win();
};

/* ---------- bonne réponse : loot intelligent (cœur si peu de vie, sinon rubis) ---------- */
const _pulse=fxPulse;
fxPulse=function(){
 _pulse();
 if(!ZL())return;
 ZH.wrong=0;
 const p=ZH.hp<=4?1:ZH.hp<=8?.6:ZH.hp<12?.2:0,heart=Math.random()<p,
  v=[[1,"#6ee86e"],[5,"#4da6ff"],[20,"#ff6b6b"]][Math.random()*3|0];
 if(heart)zHeal(2);else{ZH.rup=Math.min(999,ZH.rup+v[0]);zSave();zRender()}
 if(REDUCE)return;
 const e=document.createElement("div");
 e.className="rupee";e.style.color=heart?"#ff5a64":v[1];e.textContent=heart?"❤ +½":"◆ +"+v[0];
 e.style.left=Math.max(8,PX-30)+"px";e.style.top=(PY-20)+"px";
 document.body.appendChild(e);setTimeout(()=>e.remove(),1000);
};

/* ---------- coffre : le temps se fige, l'objet est brandi ---------- */
let zTC=0,zCT=0;
$("theme").addEventListener("click",()=>{zTC=Date.now()},true);
const zItems=[["🔺","la <span class=y>Triforce du Savoir</span>"],["❤️","un <span class=r>Réceptacle de Cœur</span>"],["🎵","l’<span class=g>Ocarina du Temps</span>"],["🗡️","l’<span class=y>Épée de Légende</span>"],["🏹","l’<span class=g>Arc des Fées</span>"]];
const zChest=()=>{
 const n=Date.now();
 if(n-zTC<800||n-zCT<15000||REDUCE||document.querySelector(".zchest"))return;
 zCT=n;
 const i=Math.random()*zItems.length|0,it=zItems[i];
 if(i==1)zHeal(12);
 const d=document.createElement("div");d.className="zchest";
 d.innerHTML='<div class="zbox"><div class="zitem">'+it[0]+'</div><div class="zdlg">Tu obtiens '+it[1]+' !</div></div>';
 d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),2600);
};

/* ---------- Z-Targeting + sons de curseur ---------- */
const zSel=".btn,.tabs button,nav button,.opt,.stat";
document.body.insertAdjacentHTML("beforeend",'<div id="ztg"><i></i><i></i><i></i><i></i></div>');
const ZT=$("ztg");
const zTick=(a,b)=>{if(!ZL())return;try{tone(a,a,.035,"square",.035,0);if(b)tone(b,b,.05,"square",.035,.05)}catch(e){}};
const zHide=()=>ZT.classList.remove("on");
let zLast=null,zLT=0;
document.addEventListener("pointerover",e=>{
 if(e.pointerType=="touch"||!ZL())return;
 const t=e.target.closest?e.target.closest(zSel):null;
 if(!t||t.disabled){zLast=null;zHide();return}
 if(t===zLast)return;
 zLast=t;
 const n=Date.now();if(n-zLT>40){zLT=n;zTick(1318)}
 if(REDUCE)return;
 const r=t.getBoundingClientRect();
 ZT.style.cssText="left:"+(r.left-8)+"px;top:"+(r.top-8)+"px;width:"+(r.width+16)+"px;height:"+(r.height+16)+"px";
 ZT.classList.remove("on");void ZT.offsetWidth;ZT.classList.add("on");
});
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(zSel))zTick(1568,2093)});
addEventListener("scroll",zHide,true);

/* ---------- papillon : reste dessus 1,3 s et il devient une fée (+1 cœur) ---------- */
const zBf=()=>{
 if(!ZL()||REDUCE||document.hidden||document.querySelector(".zbf"))return;
 const b=document.createElement("div");b.className="zbf";b.textContent="🦋";document.body.appendChild(b);
 let x=-40,base=innerHeight*(.25+Math.random()*.4),t0=performance.now(),hov=false,done=false,tm=null;
 b.onpointerenter=()=>{hov=true;tm=setTimeout(()=>{done=true;b.textContent="🧚";b.classList.add("fairy");zHeal(4);toast("🦋 Le papillon s’est changé en fée ! +1 ❤️");setTimeout(()=>b.remove(),1500)},1300)};
 b.onpointerleave=()=>{hov=false;clearTimeout(tm)};
 (function f(t){
  if(!b.isConnected)return;
  if(!done&&!hov)x+=1.1;
  b.style.transform="translate("+x.toFixed(1)+"px,"+(base+Math.sin((t-t0)/500)*40).toFixed(1)+"px)";
  if(x>innerWidth+40){b.remove();return}
  requestAnimationFrame(f);
 })(t0);
};
setTimeout(function lp(){zBf();setTimeout(lp,40000+Math.random()*30000)},20000);

/* ---------- Arwing de Star Fox : ↑ ↑ ↓ ↓ ← → ← → B A ---------- */
const zK=["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"];
let zKi=0;
const zArwing=()=>{
 if(!ZL())return;
 const a=document.createElement("div");a.className="zarw";a.textContent="🛩️";document.body.appendChild(a);
 toast("🦊 Do a barrel roll !");
 const iv=setInterval(()=>{
  const r=a.getBoundingClientRect(),l=document.createElement("div");
  l.className="zlaser";l.style.left=(r.left+r.width/2)+"px";l.style.top=(r.top+r.height/2)+"px";
  document.body.appendChild(l);setTimeout(()=>l.remove(),700);
  try{tone(1900,200,.12,"sawtooth",.04,0)}catch(e){}
 },160);
 setTimeout(()=>{clearInterval(iv);a.remove()},3600);
};
addEventListener("keydown",e=>{
 const k=(e.key||"").toLowerCase();
 zKi=k==zK[zKi]?zKi+1:(k==zK[0]?1:0);
 if(zKi==zK.length){zKi=0;zArwing()}
});

/* ---------- Navi : fée qui suit le curseur ---------- */
document.body.insertAdjacentHTML("beforeend",'<div id="navi"><i></i><i></i></div>');
const NV=$("navi");let nx=innerWidth/2,ny=innerHeight/3,tx=nx,ty=ny;
const nTarget=e=>{tx=e.clientX+34;ty=e.clientY-34};
addEventListener("pointermove",nTarget);addEventListener("pointerdown",nTarget);
(function loop(t){
 requestAnimationFrame(loop);
 if(!ZL()||REDUCE)return;
 nx+=(tx-nx)*.05;ny+=(ty-ny)*.05;
 NV.style.transform="translate("+(nx+Math.sin(t/330)*9).toFixed(1)+"px,"+(ny+Math.cos(t/270)*9).toFixed(1)+"px)";
})(0);

/* « Hey ! Listen ! » quand on bascule sur le thème */
let prevT=document.documentElement.dataset.theme;
new MutationObserver(()=>{const t=document.documentElement.dataset.theme;if(t=="zelda"&&prevT&&prevT!="zelda")toast("🧚 Hey ! Listen !");prevT=t}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
