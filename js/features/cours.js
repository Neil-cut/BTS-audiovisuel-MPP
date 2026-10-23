/* js/features/cours.js — onglet Cours : fiches (COURS) + chapitres détaillés (LESSONS, un ou plusieurs par matière) */

function toggleLes(){tab="exo";sub="quiz";subj()}
function cours(s){
 const L=LESSONS[s.id],ls=L?(typeof L[0]=="string"?[L]:L):[];
 $("sb").innerHTML=COURS[s.id].map(([t,p])=>`<div class="card"><h3>${t}</h3><ul>${p.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")
 +(ls.length?`<h3 style="margin:22px 0 8px">📚 Chapitres détaillés (${ls.length})</h3>`+ls.map(l=>`<details class="card les"><summary><b>${l[0]}</b></summary>${l[1]}</details>`).join(""):"");
}
