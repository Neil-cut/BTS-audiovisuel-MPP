/* js/features/situations.js — mises en situation (réponses libres + mots-clés) */

function sit(s){
 const t=s.sit,key="sit_"+s.id;
 $("sb").innerHTML=`<div class="card"><h3>${esc(t.t)}</h3><textarea id="ans" rows="6" placeholder="Écris ta réponse…">${esc(st.n[key]||"")}</textarea>
 <div style="margin-top:10px"><button class="btn p" id="chk">Vérifier</button></div><div id="res"></div></div>`;
 $("chk").onclick=()=>{
  const v=$("ans").value;st.n[key]=v;save();
  const low=v.toLowerCase();
  const hit=t.k.filter(k=>low.includes(k.toLowerCase()));
  $("res").innerHTML=`<p><b>Mots-clés trouvés : ${hit.length}/${t.k.length}</b><br>${t.k.map(k=>`<span class="tag ${hit.includes(k)?"ok":""}">${esc(k)}</span>`).join("")}</p><p class="mu"><b>Exemple de réponse :</b> ${esc(t.m)}</p>`;
  if(hit.length==t.k.length){sfx.win();confetti()}else hit.length?sfx.ok():sfx.ko();
 };
}

