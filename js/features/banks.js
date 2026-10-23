/* js/features/banks.js — banques de questions : niveaux, bilan, raccourcis clavier */

const bs=id=>{let g=0,t=0;(BANKS[id]||[]).forEach(b=>b.levels.forEach((l,k)=>{const P=st.bk[b.id+k]||{a:{}};t+=l.q.length;l.q.forEach((q,i)=>{if(P.a[i]===q.c)g++})}));return t?g+"/"+t:"–"};
let CB=null;
function banks(s){
 const L=BANKS[s.id]||[];
 $("sb").innerHTML=L.length?L.map((b,i)=>`<div class="card stat" data-i="${i}" style="--c:${s.c}"><b style="font-size:1.1rem">${b.i} ${esc(b.n)}</b><span class="mu">${esc(b.d)}<br>${b.levels.reduce((a,l)=>a+l.q.length,0)} questions · réussies : ${bs(s.id)}</span></div>`).join(""):`<div class="card mu">Pas encore de banque de questions pour cette matière.</div>`;
 $("sb").querySelectorAll(".stat").forEach(c=>c.onclick=()=>openBank(s,L[+c.dataset.i],0));
}
function openBank(s,b,l){
 const lv=b.levels[l],k=b.id+l,P=st.bk[k]||(st.bk[k]={a:{},f:[]});
 let ord=lv.q.map((_,i)=>i),auto=true,str=0,fresh=-1,t0=Date.now(),cur=Math.max(0,ord.findIndex(i=>P.a[i]==null));
 const ok=i=>P.a[i]===lv.q[i].c,fmtT=()=>{const x=((Date.now()-t0)/1000)|0;return String(x/60|0).padStart(2,"0")+":"+String(x%60).padStart(2,"0")};
 clearInterval(window.CT);window.CT=setInterval(()=>{const e=$("tm");e?e.textContent=fmtT():clearInterval(window.CT)},1000);
 const ans=j=>{const i=ord[cur],q=lv.q[i];if(P.a[i]!=null)return;P.a[i]=j;fresh=j;srRec(srKeyB(b,l,i),j==q.c);if(j==q.c){str++;st.xp=(st.xp||0)+5;sfx.ok();fxPulse();if(str==5)fxAch("streak5","🔥 Série de 5");if(str==10)fxAch("streak10","⚡ Série de 10");if(str==20)fxAch("streak20","🌟 Série de 20")}else{str=0;sfx.ko()}save();R();fresh=-1;
  if(Object.keys(P.a).length==lv.q.length)fxDone(lv.q.filter((_,x)=>P.a[x]===lv.q[x].c).length,lv.q.length);
  if(j==q.c&&auto&&cur<ord.length-1)setTimeout(()=>{if(CB&&$("fl")&&ord[cur]==i){cur++;R()}},900)};
 const go=d=>{cur=Math.max(0,Math.min(ord.length-1,cur+d));R()};
 CB={ans,go,flag:()=>{const i=ord[cur],x=P.f.indexOf(i);x<0?P.f.push(i):P.f.splice(x,1);save();R()}};
 function R(){
  const i=ord[cur],q=lv.q[i],a=P.a[i],done=Object.keys(P.a).length,good=lv.q.filter((_,x)=>ok(x)).length,fin=done==lv.q.length;
  if(fin&&good>(P.best||0)){P.best=good;save()}
  const bad=lv.q.map((_,x)=>x).filter(x=>P.a[x]!=null&&!ok(x)).map(x=>x+1);
  $("sb").innerHTML=`<div class="tabs"><button id="b0">← Banques</button>${b.levels.length>1?b.levels.map((x,j)=>`<button class="${j==l?"on":""}" data-l="${j}">${x.n}</button>`).join(""):""}<button id="sh">🔀 Mélanger</button><button id="au" class="${auto?"on":""}">⏭ Auto</button><button id="rs">↺</button></div>
  <div class="mu">✓ ${good}/${lv.q.length} · <span class="${str>=5?"hot":""}">🔥 ${str}</span> · ⏱ <span id="tm">${fmtT()}</span></div><div class="bar"><i style="width:${done/lv.q.length*100}%"></i></div>
  ${fin?`<div class="card"><h3>🏁 Bilan : ${good}/${lv.q.length} (${Math.round(good/lv.q.length*100)}%)</h3><p class="mu">Record : ${P.best}/${lv.q.length}${bad.length?"<br>À revoir : n° "+bad.join(", "):""}${P.f.length?"<br>⭐ Marquées : n° "+P.f.map(x=>x+1).join(", "):""}</p>${l<b.levels.length-1?`<button class="btn p" id="nl">Niveau suivant →</button>`:""}</div>`:""}
  <div class="card"><span class="tag">${esc(q.s||lv.n)}</span> <span class="mu">Question ${cur+1}/${lv.q.length}</span><button class="btn" id="fl" style="float:right" title="Marquer à revoir (F)">${P.f.includes(i)?"★":"☆"}</button><h3>${esc(q.q)}</h3>
  ${q.o.map((o,j)=>`<button class="opt ${a!=null?(j==q.c?"ok":j==a?"ko":""):""}${j==fresh?" fresh":""}" ${a!=null?"disabled":""} data-j="${j}"><b>${"ABCDE"[j]}</b> ${esc(o)}${j==fresh&&j!=q.c?`<i class="crack-overlay" style="background-image:url('${crack()}')"></i>`:""}</button>`).join("")}
  ${a!=null?`<p><b>${a==q.c?"✅ Bonne réponse !":"❌ Raté."}</b><br><span class="mu">${esc(q.e||"")}</span></p>`:""}
  <div class="tabs"><button id="pv">← Préc.</button><button id="nx" class="p">Suiv. →</button></div></div>
  <div>${ord.map((x,n)=>`<button class="dot ${P.a[x]==null?"":ok(x)?"g":"r"} ${n==cur?"c":""}" data-n="${n}" title="${x+1}"></button>`).join("")}</div>
  <div class="row" style="grid-template-columns:1fr auto"><input id="jn" type="number" min="1" max="${lv.q.length}" placeholder="N° de question"><button class="btn" id="jb">Aller à</button></div>
  <p class="mu">Raccourcis : A–E ou 1–5 pour répondre, ← → pour naviguer, F pour marquer.</p>`;
  $("b0").onclick=()=>{clearInterval(window.CT);CB=null;banks(s)};
  $("sb").querySelectorAll("[data-l]").forEach(x=>x.onclick=()=>openBank(s,b,+x.dataset.l));
  $("sb").querySelectorAll(".opt").forEach(x=>x.onclick=()=>ans(+x.dataset.j));
  $("sb").querySelectorAll(".dot").forEach(x=>x.onclick=()=>{cur=+x.dataset.n;R()});
  $("sh").onclick=()=>{ord.sort(()=>Math.random()-.5);cur=0;R()};
  $("au").onclick=()=>{auto=!auto;R()};
  $("rs").onclick=()=>{if(confirm("Effacer les réponses de ce niveau ?")){st.bk[k]={a:{},f:[]};save();openBank(s,b,l)}};
  $("fl").onclick=CB.flag;$("pv").onclick=()=>go(-1);$("nx").onclick=()=>go(1);
  $("jb").onclick=()=>{const n=parseInt($("jn").value);if(n>=1&&n<=lv.q.length){cur=ord.indexOf(n-1);R()}};
  if($("nl"))$("nl").onclick=()=>openBank(s,b,l+1);
 }
 R();
}
document.addEventListener("keydown",e=>{
 if(!CB||!$("fl")||/INPUT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey)return;
 const kk=e.key.toLowerCase(),n="abcde".indexOf(kk),m=n>=0?n:"12345".indexOf(kk);
 if(m>=0)CB.ans(m);else if(kk=="arrowright")CB.go(1);else if(kk=="arrowleft")CB.go(-1);else if(kk=="f")CB.flag();
});
