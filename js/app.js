/* js/app.js — démarrage : thème, écran d’accueil, premier affichage (toujours chargé en dernier) */

const TH=["dark","light","onepiece"],TL={dark:"🌙 Sombre",light:"☀️ Clair",onepiece:"🏴‍☠️ One Piece"};
const setTh=t=>{
 const op=t=="onepiece";document.documentElement.dataset.theme=t;st.theme=t;save();$("theme").textContent=TL[t];
 $("logo").textContent=(op?"🏴‍☠️":"🎬")+" BTS Audiovisuel";document.querySelector(".rec").textContent=op?"⚓ LEVER L’ANCRE":"● REC";$("start").textContent=op?"⚓ Prendre le large":"▶ Démarrer";if(window.jar)jar();
};
if(TH.includes(st.theme))setTh(st.theme);
$("theme").onclick=()=>{
 const c=document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),n=TH[(TH.indexOf(c)+1)%TH.length];
 setTh(n);if(n=="onepiece")sfx.win();
};
$("lvl").textContent=lv();
$("start").onclick=()=>{$("intro").style.display="none";go()};
$("logo").onclick=()=>{$("lvl").textContent=lv();$("intro").style.display="grid"};
go();
