/* js/features/confort.js — panneau « Confort » : taille du texte, largeur, interligne, mode calme, fond animé, sons, chronomètre et délai du quiz
   (à charger après panther.js et avant app.js ; réglages dans CF, state.js, clé localStorage « btscf ») */

(function(){
 const root=document.documentElement;
 const DEF={rdw:54,lh:1.8,bg:1,tm:1,dl:900};
 let ov=null,box=null,back=null;

 /* applique les réglages à la page : largeur et interligne du lecteur, fond calme */
 function apply(){
  root.style.setProperty("--rdw",CF.rdw+"em");
  root.style.setProperty("--rdlh",String(CF.lh));
  root.classList.toggle("still",!CF.bg);
 }

 const TG={
  snd:{get:()=>st.snd,set:()=>{st.snd=!st.snd;save();if(typeof sndLabel=="function")sndLabel()}},
  calm:{get:()=>RCM,set:()=>rdrCalm()},
  bg:{get:()=>CF.bg,set:()=>{CF.bg=CF.bg?0:1}},
  tm:{get:()=>CF.tm,set:()=>{CF.tm=CF.tm?0:1}}
 };
 const seg=(k,o)=>`<div class="cfs" role="group">${o.map(([l,v])=>`<button class="btn" data-k="${k}" data-v="${v}">${l}</button>`).join("")}</div>`;
 const tog=t=>`<button class="btn" data-t="${t}"></button>`;
 const row=(l,d,c)=>`<div class="cfr"><span>${l}${d?`<small class="mu">${d}</small>`:""}</span>${c}</div>`;

 function build(){
  ov=document.createElement("div");ov.className="cfp";ov.hidden=true;
  ov.innerHTML=`<div class="cfb" role="dialog" aria-modal="true" aria-labelledby="cft">
  <div class="cfh"><h2 id="cft">⚙ Confort</h2><button class="btn" data-a="x" aria-label="Fermer">✕</button></div>
  <div class="cfg">Lecture des cours</div>
  ${row("Taille du texte","Aussi : touches + − 0 dans le lecteur",`<div class="cfs"><button class="btn" data-a="z-" aria-label="Réduire le texte">A−</button><span class="cfz" aria-live="polite"></span><button class="btn" data-a="z+" aria-label="Agrandir le texte">A+</button></div>`)}
  ${row("Largeur de la page","",seg("rdw",[["Étroite",44],["Normale",54],["Large",66],["Très large",80]]))}
  ${row("Interligne","",seg("lh",[["Serré",1.5],["Normal",1.8],["Aéré",2.1]]))}
  ${row("Lecture calme","Masque les décors du thème dans le lecteur (touche C)",tog("calm"))}
  <div class="cfg">Ambiance</div>
  ${row("Fond animé","Vagues, navire, fumée, Navi… désactivés si coupé",tog("bg"))}
  ${row("Sons","",tog("snd"))}
  <div class="cfg">Quiz</div>
  ${row("Chronomètre","Affiché dans les banques de questions",tog("tm"))}
  ${row("Passage automatique","Délai après une bonne réponse (mode ⏭ Auto)",seg("dl",[["0,5 s",500],["0,9 s",900],["1,5 s",1500],["2,5 s",2500]]))}
  <div class="cfr"><span></span><button class="btn" data-a="reset">Rétablir les réglages par défaut</button></div></div>`;
  box=ov.firstElementChild;
  ov.addEventListener("click",e=>{
   if(e.target===ov){close();return}
   const b=e.target.closest("button");if(!b)return;
   const d=b.dataset;
   if(d.k)CF[d.k]=+d.v;
   else if(d.t)TG[d.t].set();
   else if(d.a=="x"){close();return}
   else if(d.a=="z-")rdrZoom(-1);
   else if(d.a=="z+")rdrZoom(1);
   else if(d.a=="reset"){Object.assign(CF,DEF);rdrZoom(0);if(RCM)rdrCalm()}
   cfSave();apply();sync();
   /* le chronomètre se remet à jour tout de suite dans une banque ouverte */
   if((d.t=="tm"||d.a=="reset")&&CB&&$("fl"))CB.ren();
  });
  document.body.appendChild(ov);
 }

 /* met à jour l'état visuel des boutons (classe p + aria-pressed) sans reconstruire le panneau, pour garder le focus */
 function sync(){
  box.querySelectorAll("[data-k]").forEach(b=>{const on=String(CF[b.dataset.k])==b.dataset.v;b.classList.toggle("p",on);b.setAttribute("aria-pressed",on)});
  box.querySelectorAll("[data-t]").forEach(b=>{const on=!!TG[b.dataset.t].get();b.classList.toggle("p",on);b.setAttribute("aria-pressed",on);b.textContent=on?"Activé":"Désactivé"});
  box.querySelector(".cfz").textContent=Math.round((1+RZL/10)*100)+" %";
 }

 function open(){
  if(!ov)build();
  back=document.activeElement;
  sync();ov.hidden=false;
  const f=box.querySelector("[data-a=x]");if(f)f.focus();
 }
 function close(){
  if(!ov)return;
  ov.hidden=true;
  if(back&&back.focus&&document.contains(back))back.focus();
 }
 window.cfOpen=open;window.cfClose=close;

 /* panneau ouvert : Échap le ferme sans fermer le lecteur, et aucune autre touche n'atteint les raccourcis du lecteur ou du quiz */
 document.addEventListener("keydown",e=>{
  if(!ov||ov.hidden)return;
  if(e.key=="Escape")close();
  e.stopPropagation();
 },true);

 /* bouton dans la barre latérale, sous « Son » */
 const sn=$("snd");
 if(sn)sn.insertAdjacentHTML("afterend",'<button class="btn" id="cfo" style="display:block;margin:8px 0 0 0">⚙ Confort</button>');
 const cb=$("cfo");if(cb)cb.onclick=open;

 apply();
})();
