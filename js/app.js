/* js/app.js — démarrage : thème, sélecteur de thème, écran d’accueil, premier affichage (toujours chargé en dernier) */

const TH=["dark","light","onepiece","zelda","panther"],TL={dark:"🌙 Sombre",light:"☀️ Clair",onepiece:"🏴‍☠️ One Piece",zelda:"🔺 Zelda",panther:"🎩 Panthère Rose"};
/* textes propres à chaque thème : icône du logo, texte de l’écran d’accueil, bouton Démarrer */
const TX={
 dark:{i:"🎬",r:"● REC",s:"▶ Démarrer"},
 light:{i:"🎬",r:"● REC",s:"▶ Démarrer"},
 onepiece:{i:"🏴‍☠️",r:"⚓ LEVER L’ANCRE",s:"⚓ Prendre le large"},
 zelda:{i:"🔺",r:"🔺 HYRULE",s:"🗡️ Partir à l’aventure"},
 panther:{i:"🎩",r:"◆ DOSSIER CONFIDENTIEL ◆",s:"🔍 Ouvrir le dossier"}
};
/* aperçu des couleurs de chaque thème dans le sélecteur : fond, carte, accent */
const TS={dark:["#0f0f17","#181824","#7c5cff"],light:["#f4f4f8","#ffffff","#7c5cff"],onepiece:["#06223f","#d4a017","#e63946"],zelda:["#1E2B1F","#5C6B4E","#3A7D44"],panther:["#9A1A0C","#1d0709","#F08CA0"]};
const curTh=()=>document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
const setTh=t=>{
 const x=TX[t]||TX.dark;document.documentElement.dataset.theme=t;st.theme=t;save();$("theme").textContent=TL[t];
 $("logo").textContent=x.i+" BTS Audiovisuel";document.querySelector(".rec").textContent=x.r;$("start").textContent=x.s;if(window.jar)jar();
};
if(TH.includes(st.theme))setTh(st.theme);

/* style du sélecteur : intégré ici, donc aucune ligne à ajouter dans index.html */
document.head.insertAdjacentHTML("beforeend",`<style id="pkcss">
#picker{position:fixed;inset:0;z-index:700;display:grid;place-items:center;padding:16px;background:rgba(3,8,16,.55);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);animation:pkin .18s ease}
#picker .pk-box{width:min(460px,100%);max-height:88vh;overflow:auto;background:var(--card);color:var(--tx);border:1px solid var(--bd);border-radius:16px;padding:20px 22px;box-shadow:0 20px 60px rgba(0,0,0,.55);animation:pkpop .22s ease}
#picker .pk-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:14px;border-bottom:1px solid var(--bd);font-size:.95rem;letter-spacing:.12em;text-transform:uppercase}
#picker .pk-x{border:0;background:none;color:var(--tx);width:34px;height:34px;border-radius:50%;cursor:pointer;font:inherit;font-size:1.2rem}
#picker .pk-x:hover,#picker .pk-x:focus-visible{background:rgba(128,128,128,.2);outline:none}
#picker .pk-t{display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 8px;border:0;border-bottom:1px solid var(--bd);border-radius:0;background:none;color:var(--tx);font:inherit;text-align:left;cursor:pointer}
#picker .pk-t:last-child{border-bottom:0}
#picker .pk-t:hover,#picker .pk-t:focus-visible{background:rgba(128,128,128,.14);outline:none}
#picker .pk-t.on{color:var(--ac);font-weight:700}
#picker .pk-r{display:flex;align-items:center;gap:12px}
#picker .pk-s{display:flex}
#picker .pk-s i{display:block;width:26px;height:16px;border:1px solid rgba(128,128,128,.5);margin-right:-1px}
#picker .pk-s i:first-child{border-radius:5px 0 0 5px}#picker .pk-s i:last-child{border-radius:0 5px 5px 0}
#picker .pk-c{width:1em;visibility:hidden}#picker .pk-t.on .pk-c{visibility:visible}
@keyframes pkin{from{opacity:0}}
@keyframes pkpop{from{opacity:0;transform:translateY(10px) scale(.97)}}
</style>`);

/* sélecteur : fenêtre centrée, fond flouté ; se ferme avec ✕, un clic à côté ou Échap */
function pick(){
 if($("picker"))return;
 const c=curTh(),o=document.createElement("div");o.id="picker";
 o.innerHTML=`<div class="pk-box" role="dialog" aria-modal="true" aria-label="Choisir un thème"><div class="pk-h"><b>🎨 Choisis ton thème</b><button class="pk-x" aria-label="Fermer">✕</button></div><div class="pk-g">`
  +TH.map(t=>`<button class="pk-t${t==c?" on":""}" data-t="${t}"><span>${TL[t]}</span><span class="pk-r"><span class="pk-s">${TS[t].map(x=>`<i style="background:${x}"></i>`).join("")}</span><b class="pk-c">✓</b></span></button>`).join("")
  +`</div></div>`;
 const close=()=>{document.removeEventListener("keydown",esc2);o.remove();$("theme").focus()};
 const esc2=e=>{if(e.key=="Escape")close()};
 document.addEventListener("keydown",esc2);
 o.onclick=e=>{if(e.target===o)close()};
 o.querySelector(".pk-x").onclick=close;
 o.querySelectorAll(".pk-t").forEach(b=>b.onclick=()=>{
  const t=b.dataset.t;setTh(t);
  if(t=="onepiece"||t=="zelda"||t=="panther")sfx.win();else sfx.click();
  close();
 });
 document.body.appendChild(o);
 o.querySelector(".pk-t.on").focus();
}
$("theme").onclick=pick;

$("lvl").textContent=lv();
$("start").onclick=()=>{$("intro").style.display="none";go()};
$("logo").onclick=()=>{$("lvl").textContent=lv();$("intro").style.display="grid"};
go();
