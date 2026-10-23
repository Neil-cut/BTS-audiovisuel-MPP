/* js/core/utils.js — petites fonctions partagées : esc, $, moyenne, formats, niveau XP */

const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $=id=>document.getElementById(id);
const avg=id=>{const g=st.g[id]||[];const c=g.reduce((a,x)=>a+x.c,0);return c?g.reduce((a,x)=>a+x.n*x.c,0)/c:null};
const fmt=v=>v==null?"–":v.toFixed(1).replace(".",",");
const lv=()=>{const x=st.xp||0;return "Niveau "+(Math.floor(x/50)+1)+" · "+x+" XP"};
