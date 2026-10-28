/* js/core/state.js — état de l’application et sauvegarde (localStorage) */

let st={g:{},b:{},n:{}};
try{const r=localStorage.getItem("btsapp");if(r)st=Object.assign(st,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem("btsapp",JSON.stringify(st))}catch(e){}};
st.bk=st.bk||{};
/* réglages de confort (panneau « Confort », confort.js) : clé localStorage « btscf », hors de st
   rdw = largeur de la page de lecture (em), lh = interligne, bg = fond animé (1/0), tm = chronomètre visible, dl = délai du passage automatique (ms) */
const CF=Object.assign({rdw:54,lh:1.8,bg:1,tm:1,dl:900},(()=>{try{return JSON.parse(localStorage.getItem("btscf"))||{}}catch(e){return{}}})());
const cfSave=()=>{try{localStorage.setItem("btscf",JSON.stringify(CF))}catch(e){}};
let cur="home",tab="cours";
let sub="quiz";
