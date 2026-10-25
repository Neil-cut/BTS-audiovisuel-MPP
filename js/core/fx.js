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
/* bruit filtré (coups, froissement, craquement) : d = durée, v = volume, fc = fréquence du filtre */
function noi(d,v,fc,delay,q,type){
 if(!st.snd)return;const c=actx();if(!c)return;
 const t=c.currentTime+(delay||0),n=Math.max(1,c.sampleRate*d|0),buf=c.createBuffer(1,n,c.sampleRate),a=buf.getChannelData(0);
 for(let i=0;i<n;i++)a[i]=Math.random()*2-1;
 const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
 s.buffer=buf;f.type=type||"bandpass";f.frequency.value=fc;f.Q.value=q||1;
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 s.connect(f).connect(g).connect(c.destination);s.start(t);s.stop(t+d+.02);
}
/* sons du thème One Piece (appelés par sfx seulement quand OP() est vrai) : Fruits du Démon, Haki, ambiance marine, gags */
const rnd=Math.random;
const OPS={
 /* Gomu Gomu : caoutchouc tendu à l'extrême, puis claquement élastique */
 gomu:()=>{tone(200,720,.3,"triangle",.07);tone(210,740,.3,"sine",.05,.01);noi(.3,.035,2600,0,7);noi(.03,.2,3500,.32,1,"highpass");tone(900,140,.14,"sine",.12,.32);tone(300,420,.08,"sine",.04,.5)},
 /* Logia : sifflement soudain + crépitement de flammes, étincelles électriques, sable qui glisse */
 logia:()=>{noi(.3,.12,3200,0,.7,"bandpass");noi(.55,.08,1800,.05,.8,"highpass");for(let i=0;i<9;i++)noi(.02,.13,2000+rnd()*3500,.08+rnd()*.5,3,"highpass");for(let i=0;i<4;i++)tone(1900,160,.07,"sawtooth",.035,.12+i*.09);noi(.5,.05,900,.25,.8,"lowpass")},
 /* Gura Gura : verre épais qui se brise en mille morceaux, grondement sismique */
 gura:()=>{noi(.06,.28,5200,0,1,"highpass");tone(70,38,.6,"sine",.2);noi(.55,.16,90,0,.7,"lowpass");for(let i=0;i<16;i++)tone(2400+rnd()*4200,2400+rnd()*3000,.05+rnd()*.1,"triangle",.025+rnd()*.03,.02+i*.018+rnd()*.15)},
 /* Ope Ope no Mi, Room : bourdonnement aérien d'une bulle d'énergie qui se déploie */
 room:()=>{tone(220,880,.7,"sine",.05);tone(223,886,.7,"sine",.04);tone(1320,1980,.5,"sine",.03,.2);tone(2640,2640,.5,"sine",.015,.35);tone(1760,1760,.45,"sine",.03,.55)},
 /* Haki des rois : détonation sourde, crépitement de foudre noire, puis silence */
 haki:()=>{tone(60,34,.28,"sine",.32);noi(.12,.22,1400,0,.8,"lowpass");noi(.04,.2,4200,0,2,"highpass");for(let i=0;i<6;i++)tone(120+rnd()*1500,60+rnd()*400,.03,"sawtooth",.05,i*.018)},
 /* Haki de l'armement : tintement métallique lourd et cristallin */
 armament:()=>{tone(1175,1175,.7,"triangle",.07);tone(1760,1760,.6,"sine",.05);tone(2349,2349,.5,"sine",.03,.02);tone(3520,3520,.4,"sine",.02,.03);noi(.05,.12,6000,0,3,"highpass");tone(150,90,.14,"triangle",.1)},
 /* Sabre : sifflement tranchant, puis écho métallique vibrant */
 slash:()=>{noi(.1,.12,6000,0,2,"highpass");tone(2800,5400,.09,"sine",.05);tone(1320,1320,.8,"sine",.05,.1);tone(1980,1980,.6,"sine",.03,.1);tone(2640,2640,.5,"sine",.02,.12)},
 /* Soru : aspiration d'air ultra-rapide « shhhwoop » */
 soru:()=>{noi(.15,.16,6000,0,1.2,"highpass");tone(900,200,.14,"sine",.08);tone(200,520,.07,"sine",.06,.14)},
 /* Escargophone : « purupurupuru » nasillard, puis raccroché sec « gacha » */
 puru:()=>{for(let i=0;i<4;i++){tone(660,700,.09,"sawtooth",.04,i*.22);tone(520,560,.09,"sawtooth",.04,i*.22+.11);tone(1320,1320,.05,"square",.012,i*.22)}},
 gacha:()=>{noi(.02,.15,2500,0,4,"highpass");tone(900,500,.03,"square",.05);noi(.015,.1,1800,.05,4,"highpass")},
 /* Coque du Thousand Sunny : grincement lourd et rythmé du bois */
 creak:()=>{tone(80,60,.6,"sawtooth",.03);tone(85,125,.35,"sawtooth",.025,.2);noi(.5,.05,300,0,6,"bandpass");noi(.05,.1,900,.55,3)},
 /* Boulet : explosion lourde en infra-basses, puis sifflement dans l'air */
 cannon:()=>{noi(.5,.3,160,0,.7,"lowpass");tone(90,28,.6,"sine",.32);tone(55,25,.7,"sine",.2,.02);noi(.08,.12,1800,.06,1.5);tone(2400,600,.4,"sine",.025,.15)},
 /* Yeux qui sortent des orbites : ressort « boing » */
 eyepop:()=>{tone(150,900,.12,"sine",.1);tone(900,200,.25,"sine",.08,.12);tone(200,520,.12,"sine",.05,.34)},
 /* Tintement aigu de prise de conscience */
 ding:()=>{tone(2637,2637,.5,"sine",.09);tone(3951,3951,.35,"sine",.035);tone(1976,1976,.25,"triangle",.035,.08);noi(.04,.04,7000,0,3,"highpass")},
 /* Fuite à petits pas rapides et glissants (Usopp, Chopper) */
 run:()=>{for(let i=0;i<10;i++){noi(.035,.1,1500+(i%2)*600,i*.055,2);tone(1300+(i%3)*200,1100,.02,"sine",.012,i*.055)}},
 wood:()=>{noi(.05,.12,1100,0,3);tone(220,130,.05,"triangle",.07)},
 horn:()=>{tone(110,104,1.1,"sawtooth",.045);tone(55,52,1.1,"triangle",.1);tone(165,156,1,"triangle",.04);[[1500,2200,.12,1.3],[2200,1400,.18,1.42],[1700,2500,.1,1.75],[2500,1600,.15,1.85]].forEach(([a,b,d,t])=>tone(a,b,d,"sine",.05,t))},
 paper:()=>{noi(.2,.12,5000,0,.8,"highpass");tone(880,880,.9,"sine",.1,.2);tone(1760,1760,.6,"sine",.04,.2);tone(880,880,.8,"sine",.08,.6)},
 /* victoire : tintement d'armement puis trois « ding » ascendants */
 fanfare:()=>{OPS.armament();[[1568,.25],[2093,.4],[2637,.55]].forEach(([f,t])=>{tone(f,f,.35,"sine",.07,t);tone(f*1.5,f*1.5,.25,"sine",.02,t)})},
 coin:()=>OPS.ding()
};
const sfx={
 ok:()=>{if(OP())OPS.ding();else{tone(520,780,.16,"triangle",.16);tone(780,1040,.18,"triangle",.13,.1)}},
 ko:()=>{if(OP())OPS.gura();else tone(260,140,.3,"sawtooth",.13)},
 click:()=>{if(OP())OPS.wood();else tone(340,300,.06,"sine",.05)},
 puru:()=>OPS.puru(),
 gacha:()=>OPS.gacha(),
 boing:()=>{if(OP())OPS.gomu();else tone(180,620,.28,"sine",.1)},
 win:()=>{if(OP())OPS.fanfare();else[523,659,784,1047].forEach((f,i)=>tone(f,f*1.02,.22,"triangle",.14,i*.12))},
 horn:()=>OPS.horn(),
 wanted:()=>{OPS.slash();setTimeout(OPS.paper,260)},
 logia:()=>OPS.logia(),room:()=>OPS.room(),haki:()=>OPS.haki(),armament:()=>OPS.armament(),
 slash:()=>OPS.slash(),soru:()=>OPS.soru(),creak:()=>OPS.creak(),cannon:()=>OPS.cannon(),
 eyepop:()=>OPS.eyepop(),ding:()=>OPS.ding(),run:()=>OPS.run()
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
function fxAch(k,label){if(st.ach.includes(k))return;st.ach.push(k);save();toast("🏆 Succès débloqué : "+label);if(OP())setTimeout(sfx.armament,1000)}
function fxDone(good,total){
 sfx.win();if(OP()){setTimeout(()=>toast("🥤 SUUUUPER !"),1300);if(good==total)setTimeout(sfx.logia,900);else if(good<total/2)setTimeout(sfx.haki,900)}
 if(good==total){confetti();fxAch("perfect","💯 Sans faute")}else toast((OP()?"🏴‍☠️ Butin : ":"🏁 Bilan : ")+good+"/"+total);
}
function fxEnter(){if(OP())sfx.soru();const m=$("main");m.classList.remove("enter");void m.offsetWidth;m.classList.add("enter")}
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
$("pnd").onclick=()=>{fxAch("pandaman","🐼 Pandaman retrouvé");sfx.eyepop();setTimeout(sfx.run,350)};
function fxWanted(t,n){
 if(!OP())return;sfx.wanted();
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
