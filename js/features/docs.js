/* js/features/docs.js — documents PDF des matières : liste (volet « Documents PDF » de l'onglet Cours, appelée par cours.js) et visionneuse plein écran
   Données : DOCS (js/data/docs.js) ; fichiers dans docs/. Aperçu = <iframe> (le site s'ouvre sans serveur) ; téléchargement = lien « download » */

let PDFV=null;
function docsStyle(){
 if(document.getElementById("docss"))return;
 const s=document.createElement("style");s.id="docss";
 s.textContent=`.dcl{column-span:all;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:10px;padding-top:12px}
.dcr{display:flex;flex-direction:column;justify-content:space-between;gap:12px;padding:14px 16px;border:1px solid var(--bd);border-radius:10px;background:rgba(255,255,255,.04)}
.dct b{display:block;font-size:1.02rem;margin-bottom:4px}.dct span{display:block;font-size:.9rem;line-height:1.5}.dct small{display:block;margin-top:6px;font-size:.78rem}
.dca{display:flex;flex-wrap:wrap;gap:8px}.dca .btn{text-decoration:none;display:inline-block}
.vdc{margin-top:12px;padding:14px 16px;border:1px solid var(--bd);border-radius:10px;background:rgba(255,255,255,.04)}
.vdc h3{margin:0 0 4px;font-size:1.05rem}.vdc p{margin:4px 0;font-size:.92rem;line-height:1.55}
.vdq{margin:10px 0 4px}.vdq label{display:flex;align-items:flex-start;gap:10px;margin:6px 0;cursor:pointer;line-height:1.45}
.vdq input[type=checkbox]{flex:none;width:18px;height:18px;margin:2px 0 0;padding:0;accent-color:var(--ac)}
.vdh{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:10px 0 4px}.vdh .btn{text-decoration:none;display:inline-block}
.vdn{display:block;margin:10px 0 4px;font-size:.85rem;font-weight:700}
.vdc textarea{min-height:5.5em;resize:vertical}
.vdr{margin-top:14px;padding-top:2px}
.pdfv{position:fixed;inset:0;z-index:9100;display:flex;flex-direction:column;background:var(--bg);color:var(--tx)}
.pdfh{display:flex;align-items:center;gap:10px;padding:8px 14px;padding-top:max(8px,env(safe-area-inset-top));background:var(--card);border-bottom:1px solid var(--bd)}
.pdft{flex:1;min-width:0;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pdfh .btn{padding:6px 14px;font-size:.95rem;text-decoration:none;white-space:nowrap;display:inline-block}
.pdfv iframe{flex:1;width:100%;min-height:0;border:0;background:#fff}
.pdfn{margin:0;padding:6px 14px;padding-bottom:max(6px,env(safe-area-inset-bottom));font-size:.85rem;text-align:center;background:var(--card);border-top:1px solid var(--bd)}`;
 document.head.appendChild(s);
}
/* lignes de la liste d'une matière (corps du volet de l'onglet Cours) */
function docsRows(id){
 docsStyle();
 const L=(typeof DOCS!="undefined"&&DOCS[id])||[];
 return `<div class="dcl">`+L.map((d,i)=>`<div class="dcr"><div class="dct"><b>${esc(d.t)}</b><span class="mu">${esc(d.d)}</span><small class="mu">PDF · ${d.p} page${d.p>1?"s":""} · ${d.k} Ko</small></div><div class="dca"><button class="btn p" onclick="pdfOpen('${id}',${i})">👁 Aperçu</button><a class="btn" href="${esc(d.f)}" download aria-label="Télécharger : ${esc(d.t)}">⬇ Télécharger</a></div></div>`).join("")+`</div>`;
}
function pdfOpen(id,i){
 const d=((typeof DOCS!="undefined"&&DOCS[id])||[])[i];if(!d)return;
 docsStyle();pdfClose(true);
 const v=document.createElement("div");v.className="pdfv";v.id="pdfv";v.setAttribute("role","dialog");v.setAttribute("aria-modal","true");v.setAttribute("aria-label","Aperçu : "+d.t);
 v.innerHTML=`<div class="pdfh"><span class="pdft">${esc(d.t)}</span><a class="btn" href="${esc(d.f)}" download aria-label="Télécharger">⬇<span class="rdtx"> Télécharger</span></a><a class="btn" href="${esc(d.f)}" target="_blank" rel="noopener" aria-label="Ouvrir dans un nouvel onglet">↗<span class="rdtx"> Nouvel onglet</span></a><button class="btn" id="pdfx" aria-label="Fermer l’aperçu">✕<span class="rdtx"> Fermer</span></button></div><iframe title="${esc(d.t)}" src="${esc(d.f)}#view=FitH&navpanes=0"></iframe><p class="pdfn mu">Si l’aperçu reste vide (certains navigateurs de téléphone n’affichent qu’une page), utilisez « Nouvel onglet » ou « Télécharger ».</p>`;
 document.body.appendChild(v);
 PDFV={el:v,back:document.activeElement,ov:document.body.style.overflow};
 document.body.style.overflow="hidden";
 $("pdfx").onclick=()=>pdfClose();
 $("pdfx").focus();
 if(typeof sfx!="undefined"&&sfx.fx)sfx.fx("open");
}
function pdfClose(quiet){
 if(!PDFV)return;
 const p=PDFV;PDFV=null;
 p.el.remove();document.body.style.overflow=p.ov;
 if(p.back&&p.back.focus&&document.contains(p.back))p.back.focus();
 if(!quiet&&typeof sfx!="undefined"&&sfx.fx)sfx.fx("close");
}
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&PDFV)pdfClose()});

/* ---- tutos vidéo : liste, questions à noter (cases) et notes personnelles, enregistrées dans st.vd ---- */
function vdGet(id){st.vd=st.vd||{};return st.vd[id]||(st.vd[id]={c:{},n:""})}
function vdFx(on){if(typeof sfx!="undefined"&&sfx.fx)sfx.fx(on?"check":"uncheck")}
function vdCk(id,i,on,tot){
 const o=vdGet(id);if(on)o.c[i]=true;else delete o.c[i];save();vdFx(on);
 const e=$("vdp-"+id);if(e)e.textContent=Object.keys(o.c).length+" / "+tot+" notée"+(tot>1?"s":"");
}
let VDT=null;
function vdNote(id,v){const o=vdGet(id);o.n=v;clearTimeout(VDT);VDT=setTimeout(save,400)}
function vdRows(id){
 docsStyle();
 const V=(typeof VIDEOS!="undefined"&&VIDEOS[id])||{v:[],c:[]};
 const card=d=>{
  const o=vdGet(d.id),n=Object.keys(o.c).length;
  return `<div class="vdc"><h3>${esc(d.t)}</h3><p class="mu">${esc(d.o)}</p>${d.r?`<p><b>Rappel :</b> ${esc(d.r)}</p>`:""}
  <div class="vdh"><a class="btn p" href="${esc(d.u)}" target="_blank" rel="noopener">▶ Regarder sur YouTube</a><span class="mu" id="vdp-${d.id}">${n} / ${d.q.length} notée${d.q.length>1?"s":""}</span></div>
  <span class="vdn">À noter pendant le visionnage</span><div class="vdq">${d.q.map((q,i)=>`<label><input type="checkbox" ${o.c[i]?"checked":""} onchange="vdCk('${d.id}',${i},this.checked,${d.q.length})"><span>${esc(q)}</span></label>`).join("")}</div>
  <label class="vdn" for="vdn-${d.id}">Mes notes</label><textarea id="vdn-${d.id}" placeholder="Étapes retenues, raccourcis utiles, pièges rencontrés…" oninput="vdNote('${d.id}',this.value)">${esc(o.n||"")}</textarea></div>`};
 const g=vdGet("_");
 return `<div class="dcl vdl">${V.v.map(card).join("")}`+
  (V.c&&V.c.length?`<div class="vdc"><h3>Chaînes à suivre</h3>${V.c.map(c=>`<p><b>${esc(c.t)}</b><br><span class="mu">${esc(c.d)}</span></p><div class="vdh"><a class="btn" href="${esc(c.u)}" target="_blank" rel="noopener">↗ Ouvrir</a></div>`).join("")}</div>`:"")+
  `<div class="vdc"><h3>Notes personnelles</h3><p class="mu">À compléter après visionnage : étapes retenues, raccourcis utiles, pièges rencontrés.</p><textarea id="vdn-_" aria-label="Notes personnelles sur les tutos vidéo" oninput="vdNote('_',this.value)">${esc(g.n||"")}</textarea></div></div>`;
}
