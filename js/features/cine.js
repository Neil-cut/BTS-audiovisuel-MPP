/* js/features/cine.js — onglet Ciné-club : séances à voir (CINECLUB), case « vu » sauvegardée dans st.cc */

st.cc=st.cc||{};
const ccDate=d=>new Date(d+"T12:00:00");
const ccFmt=d=>ccDate(d).toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"}).replace(".","");
function cineToggle(d){
 if(st.cc[d])delete st.cc[d];else st.cc[d]=1;
 save();const y=window.scrollY;cine();window.scrollTo(0,y);
}
function ccStyle(){
 if(document.getElementById("ccs"))return;
 const s=document.createElement("style");s.id="ccs";
 s.textContent=`.cc{width:calc(100vw - 310px);max-width:1500px}
.ccg{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-bottom:6px}
.cch{margin:12px 0 8px;font-size:1rem}
.ccc{margin:0;padding:10px 12px;display:flex;flex-direction:column;gap:3px;cursor:pointer;font-size:.88rem;line-height:1.3}
.ccc.nx{border-color:var(--ac)}.ccc.ps{opacity:.8}
.ccc .top{display:flex;justify-content:space-between;align-items:center;gap:8px}
.ccc .dt{font-size:.78rem;opacity:.75;text-transform:capitalize}
.ccc input{width:16px;height:16px;margin:0;flex:none;cursor:pointer}
.ccc b{font-size:.95rem}
.ccc .ds{font-size:.8rem;opacity:.8}
@media(max-width:900px){.cc{width:auto}}`;
 document.head.appendChild(s);
}
function cine(){
 ccStyle();
 const today=new Date();today.setHours(0,0,0,0);
 const all=CINECLUB.slice().sort((a,b)=>a.d<b.d?-1:1);
 const up=all.filter(f=>ccDate(f.d)>=today),past=all.filter(f=>ccDate(f.d)<today);
 const seen=all.filter(f=>st.cc[f.d]).length;
 const card=(f,cls,desc)=>`<label class="card ccc ${cls}"><span class="top"><span class="dt">${ccFmt(f.d)}${cls=="nx"?" · prochaine":""}</span><input type="checkbox" title="Vu" aria-label="Vu" ${st.cc[f.d]?"checked":""} onchange="cineToggle('${f.d}')"></span><b>${esc(f.t)}</b><span class="mu">${esc(f.r)}</span>${desc?`<span class="ds">${esc(f.x)}</span>`:""}</label>`;
 let h=`<div class="cc"><h2 style="margin:0">🎞️ Ciné-club <small class="mu" style="font-size:.8rem">${seen} / ${all.length} vus</small></h2>`;
 if(up.length)h+=`<h3 class="cch">À venir (${up.length})</h3><div class="ccg">${up.map((f,i)=>card(f,i==0?"nx":"",true)).join("")}</div>`;
 if(past.length)h+=`<h3 class="cch">Séances passées (${past.length})</h3><div class="ccg">${past.map(f=>card(f,"ps",true)).join("")}</div>`;
 $("main").innerHTML=h+"</div>";
}
