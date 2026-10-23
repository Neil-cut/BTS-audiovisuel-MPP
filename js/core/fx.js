/* js/core/fx.js — effets : sons synthétisés, fissures, toasts, succès, confettis, fond animé */

st.snd=st.snd!==false;st.ach=st.ach||[];
const REDUCE=matchMedia("(prefers-reduced-motion: reduce)").matches;
const OP=()=>document.documentElement.dataset.theme=="onepiece";
let AC=null;
const actx=()=>{if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}if(AC&&AC.state=="suspended")AC.resume();return AC};
function tone(f1,f2,d,type,v,delay){
 if(!st.snd)return;const c=actx();if(!c)return;
 const t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();
 o.type=type||"sine";o.frequency.setValueAtTime(f1,t);o.frequency.linearRampToValueAtTime(f2,t+d);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v||.15,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(g).connect(c.destination);o.start(t);o.stop(t+d+.03);
}
const sfx={
 ok:()=>{if(OP()){tone(988,988,.08,"square",.07);tone(1319,1319,.3,"square",.07,.08);tone(1760,1760,.25,"triangle",.06,.16)}else{tone(520,780,.16,"triangle",.16);tone(780,1040,.18,"triangle",.13,.1)}},
 ko:()=>tone(260,140,.3,"sawtooth",.13),
 click:()=>tone(340,300,.06,"sine",.05),
 puru:()=>{for(let i=0;i<6;i++)tone(i%2?820:700,i%2?820:700,.07,"square",.05,i*.09)},
 gacha:()=>{tone(180,90,.08,"square",.08);tone(120,70,.1,"square",.08,.09)},
 boing:()=>tone(180,620,.28,"sine",.1),
 win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,f*1.02,.22,"triangle",.14,i*.12))
};

/* fissure SVG aléatoire (réponse fausse) */
function crack(){
 const col=getComputedStyle(document.documentElement).getPropertyValue("--tx").trim()||"#fff",r=Math.random,
 jag=(x0,y0,x1,y1,n)=>{let d=`M${x0.toFixed(1)} ${y0.toFixed(1)}`;for(let s=1;s<=n;s++){const t=s/n;d+=` L${(x0+(x1-x0)*t+(r()-.5)*16).toFixed(1)} ${(y0+(y1-y0)*t+(r()-.5)*16).toFixed(1)}`}return d},
 cx=40+r()*20,cy=40+r()*20;let p="";
 for(let b=0,n=3+(r()*3|0);b<n;b++){
  const a=r()*6.283,l=30+r()*35,x1=cx+Math.cos(a)*l,y1=cy+Math.sin(a)*l,w=1+r()*1.8,o=.45+r()*.45;
  p+=`<path d='${jag(cx,cy,x1,y1,2+(r()*3|0))}' stroke='${col}' stroke-width='${w.toFixed(1)}' fill='none' opacity='${o.toFixed(2)}' stroke-linecap='round'/>`;
  if(r()<.6){const mx=(cx+x1)/2,my=(cy+y1)/2,a2=a+(r()-.5)*1.6,l2=10+r()*15;
   p+=`<path d='${jag(mx,my,mx+Math.cos(a2)*l2,my+Math.sin(a2)*l2,2)}' stroke='${col}' stroke-width='${(w*.6).toFixed(1)}' fill='none' opacity='${(o*.7).toFixed(2)}' stroke-linecap='round'/>`}
 }
 return"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>${p}</svg>`).replace(/'/g,"%27");
}

/* notifications, succès, fin de niveau */
function toast(m){
 let c=$("toasts");if(!c){c=document.createElement("div");c.id="toasts";document.body.appendChild(c)}
 const t=document.createElement("div");t.className="toast";t.textContent=m;c.appendChild(t);if(OP())setTimeout(sfx.puru,350);setTimeout(()=>{t.remove();if(OP())sfx.gacha()},3000);
}
function fxAch(k,label){if(st.ach.includes(k))return;st.ach.push(k);save();toast("🏆 Succès débloqué : "+label)}
function fxDone(good,total){
 sfx.win();if(OP())setTimeout(()=>toast("🥤 SUUUUPER !"),1300);
 if(good==total){confetti();fxAch("perfect","💯 Sans faute")}else toast((OP()?"🏴‍☠️ Butin : ":"🏁 Bilan : ")+good+"/"+total);
}
function fxEnter(){const m=$("main");m.classList.remove("enter");void m.offsetWidth;m.classList.add("enter")}
function confetti(){
 if(REDUCE)return;
 const c=document.createElement("canvas");c.className="fxc";c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);
 const g=c.getContext("2d");if(!g){c.remove();return}
 const cols=OP()?["#f0b429","#e63946","#fff3d1","#1a6aa8","#d4a017"]:["#7c5cff","#18a058","#f5a524","#e5484d","#00b8d9"],
 P=Array.from({length:90},()=>({x:innerWidth/2,y:innerHeight*.4,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,s:4+Math.random()*5,c:cols[Math.random()*5|0],r:Math.random()*6}));
 let n=0;(function f(){
  g.clearRect(0,0,c.width,c.height);
  P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;g.fillStyle=p.c;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);g.restore()});
  ++n<110?requestAnimationFrame(f):c.remove();
 })();
}

/* bouton son + clic sonore global */
$("theme").insertAdjacentHTML("afterend",'<button class="btn" id="snd" style="margin:14px 0 0 6px"></button>');
const sndLabel=()=>$("snd").textContent=st.snd?"🔊 Son":"🔇 Son";sndLabel();
$("snd").onclick=()=>{st.snd=!st.snd;save();sndLabel();sfx.click()};
document.addEventListener("click",e=>{if(e.target.closest(".tabs button,nav button,.stat,.btn,.dot"))sfx.click()});

/* fond animé : vagues + points, pulsation à chaque bonne réponse */
let pulse=null,pulseT=0;
let PX=innerWidth/2,PY=innerHeight/2;addEventListener("pointerdown",e=>{PX=e.clientX;PY=e.clientY});
function berry(){
 if(REDUCE)return;const e=document.createElement("div");e.className="berry";
 e.textContent="+"+["100 000","500 000","1 000 000"][Math.random()*3|0]+" ฿";e.style.left=Math.max(8,PX-50)+"px";e.style.top=(PY-20)+"px";
 document.body.appendChild(e);setTimeout(()=>e.remove(),1000);
}
function fxPulse(){if(OP())berry();if(REDUCE)return;pulseT=performance.now();pulse={f:1.6+Math.random()*1.8,d:4+Math.random()*2.2,s:.7+Math.random()*.6,sg:Math.random()<.5?1:-1,dur:1400+Math.random()*600}}
(function(){
 const cv=document.createElement("canvas");cv.id="bgc";document.body.prepend(cv);
 const g=cv.getContext&&cv.getContext("2d");if(!g)return;
 let w,h,dots=[];
 const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
 const size=()=>{const d=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;cv.width=w*d;cv.height=h*d;g.setTransform(d,0,0,d,0,0);
  dots=Array.from({length:Math.max(40,Math.round(w*h/16000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+.6,a:Math.random()*.35+.15,p:Math.random()*6.283,s:Math.random()*.6+.3}))};
 addEventListener("resize",size);size();
 (function draw(t){
  g.fillStyle=css("--bg")||"#f4f4f8";g.fillRect(0,0,w,h);
  const rgb=css("--pr")||"255,255,255";let pf=0;
  if(pulse){const k=performance.now()-pulseT;if(k<pulse.dur){const q=k/pulse.dur;pf=Math.sin(q*Math.PI*pulse.f)*Math.exp(-pulse.d*q)*pulse.s*pulse.sg}else pulse=null}
  for(let i=0;i<3;i++){
   g.beginPath();const amp=(22+i*10)*(1+pf*.9),yb=h*(.32+i*.22*(1-pf*.5)),sp=.00035+i*.00012,fr=(.006+i*.002)*(1-pf*.25);
   for(let x=0;x<=w;x+=12){const y=yb+Math.sin(x*fr+t*sp+i*2)*amp;x?g.lineTo(x,y):g.moveTo(x,y)}
   g.strokeStyle=`rgba(${rgb},${.05+i*.02+Math.abs(pf)*.08})`;g.lineWidth=1.2+Math.abs(pf)*1.6;g.stroke();
  }
  dots.forEach(d=>{g.beginPath();g.arc(d.x+Math.sin(t*.0002+d.p)*10,d.y+Math.sin(t*.0009*d.s+d.p)*8*(1+pf*.6),d.r*(1+pf*.5),0,6.283);
   g.fillStyle=`rgba(${rgb},${Math.max(0,d.a+Math.sin(t*.001*d.s+d.p)*.08+Math.abs(pf)*.1)})`;g.fill()});
  requestAnimationFrame(draw);
 })(0);
})();

/* One Piece : jargon pirate, Pandaman caché, chapeau de retour en haut, avis de recherche */
const JM={"Vérifier":"Lancer l’abordage","Ajouter":"Inscrire la prime","Recommencer":"Reprendre la mer","Aller à":"Mettre le cap","← Banques":"← Retour au port"};
const JR=Object.fromEntries(Object.entries(JM).map(([a,b])=>[b,a]));
function jar(){const m=OP()?JM:JR;document.querySelectorAll("main button").forEach(b=>{const t=b.textContent.trim();if(m[t])b.textContent=m[t]})}
new MutationObserver(jar).observe($("main"),{childList:true,subtree:true});
document.body.insertAdjacentHTML("beforeend",'<button id="topbtn" title="Retour en haut">👒</button>');
$("topbtn").onclick=()=>{sfx.boing();scrollTo({top:0,behavior:"smooth"});const b=$("topbtn");b.classList.remove("gomu");void b.offsetWidth;b.classList.add("gomu")};
addEventListener("scroll",()=>$("topbtn").classList.toggle("show",scrollY>200));
document.querySelector("aside").insertAdjacentHTML("beforeend",'<span id="pnd" title="?">🐼</span>');
$("pnd").onclick=()=>{fxAch("pandaman","🐼 Pandaman retrouvé");sfx.win()};
function fxWanted(t,n){
 if(!OP())return;sfx.win();
 const p=document.createElement("div");p.className="poster";
 p.innerHTML=`<b>WANTED</b><i>${esc(t)}</i><u>PRIME : ${Math.round(n*5e6).toLocaleString("fr-FR")} ฿</u><small>Note : ${fmt(n)}/20</small>`;
 p.onclick=()=>p.remove();document.body.appendChild(p);setTimeout(()=>p.remove(),2800);
}

/* One Piece : navire pirate qui navigue en bas de l'écran (remplaçable par img/ship.png) */
(function(){
 const svg='<svg viewBox="0 0 160 110" width="140" height="96"><path d="M12 70H140L128 94Q80 104 30 94Z" fill="#6b3f1d"/><path d="M18 78H134M24 86H128" stroke="#4a2c12" stroke-width="1.5"/><path d="M12 70H140" stroke="#d4a017" stroke-width="3"/><path d="M12 70V56H36V70Z" fill="#7a4a24"/><circle cx="24" cy="63" r="2.5" fill="#f0b429"/><path d="M140 66L158 52" stroke="#6b3f1d" stroke-width="3.5" stroke-linecap="round"/><path d="M78 14L12 58M78 14L140 66M125 32L152 56" stroke="#4a2c12" stroke-width="1"/><rect x="76" y="14" width="4" height="56" fill="#4a2c12"/><rect x="123" y="30" width="3" height="40" fill="#4a2c12"/><path d="M48 20Q78 32 108 20V54Q78 66 48 54Z" fill="#fff3d1" stroke="#c9b27a"/><circle cx="78" cy="36" r="7" fill="#222"/><circle cx="75.5" cy="35" r="1.7" fill="#fff3d1"/><circle cx="80.5" cy="35" r="1.7" fill="#fff3d1"/><path d="M68 47L88 54M88 47L68 54" stroke="#222" stroke-width="2" stroke-linecap="round"/><path d="M110 36Q125 42 141 36V58Q125 64 110 58Z" fill="#fff3d1" stroke="#c9b27a"/><path d="M78 14L100 8L78 2Z" fill="#111"/><path d="M125 30L140 25L125 20Z" fill="#c0392b"/></svg>';
 document.body.insertAdjacentHTML("beforeend",'<div class="ship">'+svg+'</div>');
 const im=new Image(),b=document.querySelector(".ship");
 im.onload=()=>{b.innerHTML="";im.className="shipimg";b.appendChild(im)};im.src="img/ship.png";
 /* houle : les deux vagues sont pilotées ici (positions --wa / --wb) et le bateau suit la vague arrière.
    hw(u) = hauteur de la surface au-dessus du bas de l'écran, même formule que le tracé SVG (période 300 px, milieu 45 px, ±17,5 px) */
 const hw=u=>{u=((u%300)+300)%300;const k=u<150?1:-1,t=(u%150)/150;return 45+k*70*t*(1-t)};
 let sy=45,sa=0;
 (function loop(now){
  requestAnimationFrame(loop);
  if(!OP()||REDUCE)return;
  const t=now/1000,st0=document.documentElement.style,oa=-((t*60)%600),ob=-((t*80)%400);
  st0.setProperty("--wa",oa.toFixed(1)+"px");st0.setProperty("--wb",ob.toFixed(1)+"px");
  const W=b.offsetWidth||140,cx=b.offsetLeft+W/2,L=W*.38,
   hS=hw(cx-L-oa),hC=hw(cx-oa),hB=hw(cx+L-oa),
   ty=(hS+hC+hB)/3,ta=Math.max(-9,Math.min(9,-Math.atan((hB-hS)/(2*L))*57.3*.6));
  sy+=(ty-sy)*.2;sa+=(ta-sa)*.2;
  b.style.transform="translateY("+(-(sy-24)).toFixed(1)+"px) rotate("+sa.toFixed(2)+"deg)";
 })(0);
})();
