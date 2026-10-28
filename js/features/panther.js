/* js/features/panther.js — extras du thème Panthère Rose : sons jazz, notes, fumée, vocabulaire d’enquête
   (à charger après fx.js et avant app.js ; tout est dans une fonction pour ne pas gêner zelda.js) */

(function(){
 const ZP=()=>document.documentElement.dataset.theme=="panther";

 /* sons : accord de jazz (Cm7) sur une basse qui descend ; cadence finale à la fin d’un niveau */
 const _ok=sfx.ok,_win=sfx.win,_ko=sfx.ko,_click=sfx.click,_boing=sfx.boing;
 /* boîte à sons du thème (même principe que OPS dans fx.js) : machine à écrire, briquet, trompette bouchée, caisse enregistreuse… */
 const PS={
  /* clic d’interface : frappe de machine à écrire */
  type:()=>{noi(.018,.14,3200,0,3,"highpass");tone(160,110,.05,"triangle",.08);noi(.03,.06,900,.012,2)},
  /* frappe au clavier : légère variation à chaque touche */
  key:()=>{noi(.016,.12,2600+Math.random()*1200,0,3,"highpass");tone(140+Math.random()*50,100,.045,"triangle",.06)},
  space:()=>{tone(100,70,.07,"triangle",.1);noi(.03,.1,1200,0,2)},
  /* Entrée : retour chariot qui glisse, puis timbre de fin de ligne */
  bell:()=>{tone(2093,2093,.5,"sine",.05);tone(4186,4186,.3,"sine",.015)},
  carriage:()=>{noi(.22,.07,1800,0,1,"bandpass");PS.bell.call(null);tone(2093,2093,.6,"sine",.03,.22)},
  /* briquet Zippo : couvercle qui tinte, molette, flamme qui s’allume */
  zippo:()=>{tone(3300,2900,.18,"sine",.06);tone(4950,4350,.1,"sine",.02);noi(.06,.14,4200,.22,2,"highpass");noi(.35,.07,1100,.3,.8,"bandpass");noi(.5,.04,350,.3,.7,"lowpass")},
  /* trompette bouchée qui s’affaisse : « wah wah waaah » + bruit sourd */
  wah:()=>{[[311,0,.12],[294,.13,.12],[247,.26,.3]].forEach(([f,t,d])=>{tone(f,f*.97,d,"sawtooth",.045,t);tone(f*2,f*2,d,"square",.01,t)});tone(90,50,.15,"sine",.15)},
  /* caisse enregistreuse : tiroir « ka », clochette, pluie de pièces (sans-faute) */
  register:()=>{noi(.04,.15,5000,0,2,"highpass");tone(1568,1568,.5,"sine",.08,.04);tone(2093,2093,.6,"sine",.07,.1);tone(3136,3136,.4,"sine",.025,.1);for(let i=0;i<8;i++)tone(3500+Math.random()*2500,3000,.04,"triangle",.03,.2+i*.045+Math.random()*.03)},
  /* glissando de saxo (bouton retour en haut) */
  slide:()=>{tone(180,520,.24,"triangle",.07);tone(360,1040,.24,"sine",.03)},
  /* dossier qu’on ouvre : feuilles qui glissent, claquement de la chemise */
  folder:()=>{noi(.18,.1,4000,0,.8,"highpass");noi(.06,.1,700,.15,2)}
 };
 sfx.ok=()=>{if(!ZP())return _ok();
  [261.6,311.1,392,466.2].forEach(f=>tone(f,f,.5,"triangle",.05));
  [98,92.5,87.3,82.4].forEach((f,i)=>tone(f,f,.18,"sine",.13,i*.14))};
 sfx.win=()=>{if(!ZP())return _win();
  [174.6,207.7,261.6,311.1].forEach(f=>tone(f,f,.4,"triangle",.05));
  [130.8,196,261.6,311.1,392].forEach(f=>tone(f,f,1,"triangle",.05,.4));
  tone(65.4,65.4,1,"sine",.14,.4)};
 let ke=0;
 sfx.ko=()=>{if(ZP())PS.wah();else _ko();if(ZP()&&ke++%3==0)toast("🎩 Always check your back")};
 /* clic d’interface = machine à écrire ; bouton « retour en haut » = glissando de saxo */
 sfx.click=()=>ZP()?PS.type():_click();
 sfx.boing=()=>ZP()?PS.slide():_boing();
 /* toasts (succès, bilan…) : timbre de machine à écrire */
 const _toast=toast;
 toast=function(m){_toast(m);if(ZP())PS.bell()};
 /* frappe au clavier dans les champs de texte : machine à écrire (Entrée = retour chariot) */
 document.addEventListener("keydown",e=>{
  if(!ZP()||e.ctrlKey||e.metaKey||e.altKey||!/^(INPUT|TEXTAREA)$/.test(e.target.tagName))return;
  e.key=="Enter"?PS.carriage():e.key==" "?PS.space():e.key.length==1||e.key=="Backspace"?PS.key():0;
 });
 /* « Ouvrir le dossier » sur l’écran d’accueil */
 $("start").addEventListener("click",()=>{if(ZP())PS.folder()});

 /* notes de jazz à chaque bonne réponse */
 const _pulse=fxPulse;
 fxPulse=function(){
  _pulse();
  if(!ZP()||REDUCE)return;
  const e=document.createElement("div");
  e.className="jazznote";e.textContent=["♪","♫","♩"][Math.random()*3|0];
  e.style.left=Math.max(8,PX-14)+"px";e.style.top=(PY-20)+"px";
  document.body.appendChild(e);setTimeout(()=>e.remove(),1000);
 };

 /* « Affaire classée » sur un sans-faute */
 const _done=fxDone;
 fxDone=function(g,t){_done(g,t);if(ZP()&&g==t){setTimeout(()=>toast("🔍 Affaire classée !"),700);setTimeout(PS.register,900)}};

 /* fumée de cigarette qui monte lentement */
 [[8,0,16],[26,5,21],[47,9,18],[63,2,23],[81,12,19],[93,7,25]].forEach(a=>{
  const s=document.createElement("div");
  s.className="smoke";s.style.left=a[0]+"%";s.style.animationDelay="-"+a[1]+"s";s.style.animationDuration=a[2]+"s";
  document.body.appendChild(s);
 });

 /* vocabulaire d’enquête (remis à l’état normal quand on quitte le thème) */
 const PM={"Vérifier":"Mener l’enquête","Ajouter":"Verser au dossier","Recommencer":"Rouvrir le dossier","Aller à":"Suivre la piste","← Banques":"← Retour au bureau"};
 const PR=Object.fromEntries(Object.entries(PM).map(([a,b])=>[b,a]));
 const vocab=()=>{const m=ZP()?PM:PR;document.querySelectorAll("main button").forEach(b=>{const t=b.textContent.trim();if(m[t])b.textContent=m[t]})};
 new MutationObserver(vocab).observe($("main"),{childList:true,subtree:true});

 /* message d’ouverture quand on bascule sur le thème + mise à jour du vocabulaire */
 let prev=document.documentElement.dataset.theme;
 new MutationObserver(()=>{
  const t=document.documentElement.dataset.theme;
  if(t=="panther"&&prev&&prev!="panther"){toast("🎩 Le dossier est ouvert…");PS.zippo()}
  prev=t;vocab();
 }).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});

 /* poursuite en arrière-plan : voleur au sac d’argent (à droite) poursuivi par un détective au fusil (à gauche), tous deux courent sur place */
 document.body.insertAdjacentHTML("beforeend",'<div id="chase" aria-hidden="true"><svg viewBox="0 0 480 180" preserveAspectRatio="xMinYMax meet"><line class="ch-ground" x1="0" y1="168" x2="480" y2="168"/><g class="ch-det"><g class="ch-bob"><g transform="translate(90 112)"><g transform="translate(0 4)"><g class="ch-th2"><path class="ch-limb" style="stroke-width:11" d="M0 0L0 26"/><g transform="translate(0 26)"><g class="ch-sh2"><path class="ch-limb" d="M0 0L0 26L9 27"/></g></g></g></g><g transform="translate(0 4)"><g class="ch-th1"><path class="ch-limb" style="stroke-width:11" d="M0 0L0 26"/><g transform="translate(0 26)"><g class="ch-sh1"><path class="ch-limb" d="M0 0L0 26L9 27"/></g></g></g></g><g transform="rotate(14)"><rect class="ch-fill" x="-11" y="-44" width="22" height="58" rx="4"/><g transform="translate(-9 8)"><g class="ch-coat"><path class="ch-fill" d="M0 0L-24 14L-4 18Z"/></g></g><circle class="ch-fill" cx="2" cy="-54" r="8"/><ellipse class="ch-fill" cx="2" cy="-60" rx="17" ry="3.5"/><path class="ch-fill" d="M-8 -61L-8 -72Q2 -77 12 -72L12 -61Z"/><g transform="translate(2 -40) rotate(-14)"><path class="ch-limb" style="stroke-width:8" d="M0 0L28 -2"/><rect class="ch-fill" x="-4" y="-9" width="82" height="5" rx="2"/><path class="ch-fill" d="M-8 -11L8 -11L8 -1L-3 -1Z"/></g></g></g></g></g><g class="ch-thief"><g class="ch-bob"><g transform="translate(300 112)"><g transform="translate(0 4)"><g class="ch-th2"><path class="ch-limb" style="stroke-width:11" d="M0 0L0 26"/><g transform="translate(0 26)"><g class="ch-sh2"><path class="ch-limb" d="M0 0L0 26L9 27"/></g></g></g></g><g transform="translate(0 4)"><g class="ch-th1"><path class="ch-limb" style="stroke-width:11" d="M0 0L0 26"/><g transform="translate(0 26)"><g class="ch-sh1"><path class="ch-limb" d="M0 0L0 26L9 27"/></g></g></g></g><g transform="rotate(18)"><rect class="ch-fill" x="-9" y="-42" width="18" height="50" rx="4"/><circle class="ch-fill" cx="2" cy="-52" r="8"/><path class="ch-fill" d="M-6 -55Q2 -68 10 -55Z"/><g transform="translate(-4 -54)"><g class="ch-scarf"><path class="ch-fill" d="M0 0L-22 -3L-12 5Z"/></g></g><g transform="translate(3 -38)"><g class="ch-a1"><path class="ch-limb" style="stroke-width:8" d="M0 0L8 15L20 11"/></g></g><g transform="translate(3 -38)"><g class="ch-bagarm"><path class="ch-limb" style="stroke-width:8" d="M0 0L-14 14L-26 10"/><ellipse class="ch-fill" cx="-37" cy="24" rx="16" ry="18"/><path class="ch-fill" d="M-42 8L-37 1L-31 8Z"/><text x="-37" y="30" text-anchor="middle" font-size="19" font-weight="900" fill="#F7E8D0" font-family="Georgia,serif">$</text></g></g></g></g></g></g></svg></div>');
})();
