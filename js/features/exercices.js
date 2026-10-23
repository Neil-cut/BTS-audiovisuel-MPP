/* js/features/exercices.js — onglet Exercices et ses sous-onglets */

function exo(s){
 $("sub").innerHTML=`<div class="tabs">${[["quiz","📝 Quiz rapide"],["bk","🧠 Banques de questions"],["rev","🔁 À réviser"+(srDue(s)?" ("+srDue(s)+")":"")],["sit","🎯 Mises en situation"]].map(t=>`<button class="${sub==t[0]?"on":""}" data-u="${t[0]}">${t[1]}</button>`).join("")}</div>`;
 $("sub").querySelectorAll("button").forEach(b=>b.onclick=()=>{sub=b.dataset.u;exo(s)});
 sub=="bk"?banks(s):sub=="quiz"?quiz(s):sub=="rev"?rev(s):sit(s);
}
