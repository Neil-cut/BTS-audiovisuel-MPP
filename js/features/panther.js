/* js/features/panther.js — extras du thème Panthère Rose : sons jazz, notes, fumée, vocabulaire d’enquête
   (à charger après fx.js et avant app.js ; tout est dans une fonction pour ne pas gêner zelda.js) */

(function(){
 const ZP=()=>document.documentElement.dataset.theme=="panther";

 /* sons : accord de jazz (Cm7) sur une basse qui descend ; cadence finale à la fin d’un niveau */
 const _ok=sfx.ok,_win=sfx.win,_ko=sfx.ko;
 sfx.ok=()=>{if(!ZP())return _ok();
  [261.6,311.1,392,466.2].forEach(f=>tone(f,f,.5,"triangle",.05));
  [98,92.5,87.3,82.4].forEach((f,i)=>tone(f,f,.18,"sine",.13,i*.14))};
 sfx.win=()=>{if(!ZP())return _win();
  [174.6,207.7,261.6,311.1].forEach(f=>tone(f,f,.4,"triangle",.05));
  [130.8,196,261.6,311.1,392].forEach(f=>tone(f,f,1,"triangle",.05,.4));
  tone(65.4,65.4,1,"sine",.14,.4)};
 let ke=0;
 sfx.ko=()=>{_ko();if(ZP()&&ke++%3==0)toast("🎩 Always check your back")};

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
 fxDone=function(g,t){_done(g,t);if(ZP()&&g==t)setTimeout(()=>toast("🔍 Affaire classée !"),700)};

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
  if(t=="panther"&&prev&&prev!="panther")toast("🎩 Le dossier est ouvert…");
  prev=t;vocab();
 }).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
})();
