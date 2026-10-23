/* js/features/devoirs.js — devoirs, notes et moyennes pondérées */

function dev(s){
 const g=st.g[s.id]||(st.g[s.id]=[]);
 $("sb").innerHTML=`<div class="card"><h3>Moyenne : ${fmt(avg(s.id))} / 20</h3>
 <table><tr><th>Devoir</th><th>Note</th><th>Coef.</th><th></th></tr>${g.map((x,k)=>`<tr><td>${esc(x.t)}</td><td>${fmt(x.n)}/20</td><td>${x.c}</td><td><button class="btn" data-d="${k}">✕</button></td></tr>`).join("")||`<tr><td colspan="4" class="mu">Aucun devoir pour l’instant.</td></tr>`}</table>
 <div class="row"><input id="dt" placeholder="Titre du devoir"><input id="dn" type="number" min="0" max="20" step="0.25" placeholder="Note /20"><input id="dc" type="number" min="1" step="1" value="1" placeholder="Coef."><button class="btn p" id="da">Ajouter</button></div></div>`;
 $("da").onclick=()=>{
  const n=parseFloat($("dn").value),c=parseFloat($("dc").value)||1;
  if(isNaN(n)||n<0||n>20)return;
  g.push({t:$("dt").value||"Devoir",n,c});save();fxWanted($("dt").value||"Devoir",n);dev(s);
 };
 document.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{g.splice(+b.dataset.d,1);save();dev(s)});
}
