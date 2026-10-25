/* js/app.js — démarrage : thème, écran d’accueil, premier affichage (toujours chargé en dernier) */

const TH=["dark","light","onepiece","zelda"],TL={dark:"🌙 Sombre",light:"☀️ Clair",onepiece:"🏴‍☠️ One Piece",zelda:"🔺 Zelda"};
/* textes propres à chaque thème : icône du logo, texte de l’écran d’accueil, bouton Démarrer */
const TX={
 dark:{i:"🎬",r:"● REC",s:"▶ Démarrer"},
 light:{i:"🎬",r:"● REC",s:"▶ Démarrer"},
 onepiece:{i:"🏴‍☠️",r:"⚓ LEVER L’ANCRE",s:"⚓ Prendre le large"},
 zelda:{i:"🔺",r:"🔺 HYRULE",s:"🗡️ Partir à l’aventure"}
};
const setTh=t=>{
 const x=TX[t]||TX.dark;document.documentElement.dataset.theme=t;st.theme=t;save();$("theme").textContent=TL[t];
 $("logo").textContent=x.i+" BTS Audiovisuel";document.querySelector(".rec").textContent=x.r;$("start").textContent=x.s;if(window.jar)jar();
};
if(TH.includes(st.theme))setTh(st.theme);
$("theme").onclick=()=>{
 const c=document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),n=TH[(TH.indexOf(c)+1)%TH.length];
 setTh(n);if(n=="onepiece"){sfx.horn();setTimeout(sfx.creak,2000)}else if(n=="zelda")sfx.win();
};
$("lvl").textContent=lv();
$("start").onclick=()=>{if(OP())sfx.cannon();$("intro").style.display="none";go()};
$("logo").onclick=()=>{$("lvl").textContent=lv();$("intro").style.display="grid"};
go();
