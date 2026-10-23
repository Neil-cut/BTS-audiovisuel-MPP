/* js/core/state.js — état de l’application et sauvegarde (localStorage) */

let st={g:{},b:{},n:{}};
try{const r=localStorage.getItem("btsapp");if(r)st=Object.assign(st,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem("btsapp",JSON.stringify(st))}catch(e){}};
st.bk=st.bk||{};
let cur="home",tab="cours";
let sub="quiz";
