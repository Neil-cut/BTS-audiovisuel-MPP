/* js/features/cours.js — onglet Cours : chapitres détaillés (LESSONS) lus en plein écran, paginés, + aide-mémoire repliable (COURS) */

function toggleLes(){tab="exo";sub="quiz";subj()}

/* ---- Lecteur plein écran ---- */
const noNum=t=>t.replace(/^(📖\s*)\d+\.\s*/,"$1");
const RDR={ls:[],i:0,p:0,pg:[],x:0,y:0,mask:""};

/* ---- Taille du texte du lecteur : paliers de 10 %, mémorisée (clé localStorage « btsrdz ») ---- */
const RZ={min:-3,max:6};
let RZL=0;try{RZL=Math.max(RZ.min,Math.min(RZ.max,parseInt(localStorage.getItem("btsrdz"))||0))}catch(e){}
function rdrZoomApply(){
 const o=$("rdr");if(!o)return;
 o.style.setProperty("--rdz",(1+RZL/10).toFixed(2));
 const m=o.querySelector(".rdzm"),p=o.querySelector(".rdzp"),r=o.querySelector(".rdzr");
 if(m)m.disabled=RZL<=RZ.min;
 if(p)p.disabled=RZL>=RZ.max;
 if(r)r.title="Taille du texte : "+Math.round((1+RZL/10)*100)+" % (cliquer pour revenir à 100 %)";
}
/* ---- Mode lecture calme : masque les décors du thème (navire, fumée, fond du lecteur…) pendant la lecture ; préférence mémorisée (clé localStorage « btsrdc ») ---- */
let RCM=false;try{RCM=localStorage.getItem("btsrdc")==="1"}catch(e){}
function rdrCalmApply(){
 const o=$("rdr");if(!o)return;
 o.classList.toggle("calm",RCM);
 const b=o.querySelector(".rdcm");
 if(b){b.setAttribute("aria-pressed",RCM?"true":"false");b.classList.toggle("p",RCM);b.title="Mode lecture calme : "+(RCM?"activé":"désactivé")+" (touche C)"}
}
function rdrCalm(){RCM=!RCM;try{localStorage.setItem("btsrdc",RCM?"1":"0")}catch(e){}rdrCalmApply()}
/* ---- Sommaire latéral : leçons de la liste ouverte, pages de la leçon courante ; ouvert par défaut sur grand écran (≥ 1100 px, préférence « btsrds »), tiroir sur petit écran ---- */
let RSW=true;try{RSW=localStorage.getItem("btsrds")!=="0"}catch(e){}
let RSN=false;
const rdrWide=()=>window.innerWidth>=1100;
function rdrTitles(pg){
 return pg.map((h,k)=>{const d=document.createElement("div");d.innerHTML=h;const t=d.querySelector("h3");return t?t.textContent.trim():(k==0?"Introduction":"Page "+(k+1))});
}
function rdrTocApply(){
 const o=$("rdr");if(!o)return;
 const on=rdrWide()?RSW:RSN;
 o.classList.toggle("rds-on",on);
 const b=o.querySelector(".rdst");
 if(b){b.setAttribute("aria-expanded",on?"true":"false");b.classList.toggle("p",on)}
}
function rdrToc(){
 const o=$("rdr"),R=RDR,box=o&&o.querySelector(".rds");if(!box)return;
 const keep=box.scrollTop;
 let h='<div class="rdsh">Sommaire</div>';
 R.ls.forEach((l,j)=>{
  const t=esc(noNum(l[0]).replace(/^📖\s*/,""));
  h+=`<button class="rdsk${j==R.i?" on":""}" onclick="rdrTocGo(${j},0)"${j==R.i?' aria-current="true"':""}>${t}</button>`;
  if(j==R.i)(R.tt||[]).forEach((x,k)=>{h+=`<button class="rdsp${k==R.p?" on":""}" onclick="rdrTocGo(${j},${k})">${k+1}. ${esc(x)}</button>`});
 });
 box.innerHTML=h;box.scrollTop=keep;
 const c=box.querySelector(".rdsp.on");
 if(c){const t=c.offsetTop,bh=box.clientHeight;if(t<box.scrollTop+20)box.scrollTop=Math.max(0,t-20);else if(t+c.offsetHeight>box.scrollTop+bh-20)box.scrollTop=t+c.offsetHeight-bh+20}
}
function rdrTocGo(j,k){
 if(!rdrWide()){RSN=false;rdrTocApply()}
 if(j==RDR.i)rdrPage(k);else rdrLoad(j,k);
}
function rdrTocToggle(){
 if(rdrWide()){RSW=!RSW;try{localStorage.setItem("btsrds",RSW?"1":"0")}catch(e){}}else RSN=!RSN;
 rdrTocApply();
}

/* ---- Barre de progression de lecture : avancement dans toute la liste de leçons ouverte, repères entre les leçons, cliquable ---- */
function rdrCounts(){const R=RDR;if(!R.cnt||R.cnt.length!=R.ls.length)R.cnt=R.ls.map(l=>rdrPages(l[1]).length);return R.cnt}
function rdrProgress(){
 const o=$("rdr"),R=RDR,bar=o&&o.querySelector(".rdpr");if(!bar)return;
 const c=rdrCounts(),tot=c.reduce((a,b)=>a+b,0)||1;
 let before=0;for(let j=0;j<R.i;j++)before+=c[j];
 const pos=Math.min(tot,before+R.p+1),pct=Math.round(pos/tot*100);
 bar.querySelector("i").style.width=(pos/tot*100)+"%";
 bar.setAttribute("aria-valuenow",String(pct));
 bar.title="Progression : page "+pos+" sur "+tot+" ("+pct+" %). Cliquer pour aller à un endroit.";
 const key=c.join(",");
 if(bar.dataset.t!==key){
  bar.dataset.t=key;
  bar.querySelectorAll("b").forEach(x=>x.remove());
  let acc=0;
  c.forEach((n,j)=>{if(j>0){const t=document.createElement("b");t.style.left=(acc/tot*100)+"%";bar.appendChild(t)}acc+=n});
 }
 const l=o.querySelector(".rdl");
 if(l)l.textContent=R.ls.length>1?" · leçon "+(R.i+1)+" / "+R.ls.length:"";
}
function rdrProgressGo(e){
 const bar=e.currentTarget,c=rdrCounts(),tot=c.reduce((a,b)=>a+b,0),r=bar.getBoundingClientRect();
 if(!tot||!r.width)return;
 let g=Math.min(tot-1,Math.max(0,Math.floor((e.clientX-r.left)/r.width*tot)));
 for(let j=0;j<c.length;j++){
  if(g<c[j]){if(j==RDR.i)rdrPage(g);else rdrLoad(j,g);return}
  g-=c[j];
 }
}

/* ---- Reprise de lecture : dernière page lue par matière (clé localStorage « btsrdp »), proposée en tête de l'onglet Cours ---- */
const rdrLT=l=>noNum(l[0]).replace(/^📖\s*/,"");
function rdrResumeAll(){let m={};try{m=JSON.parse(localStorage.getItem("btsrdp")||"{}")||{}}catch(e){}return m}
function rdrSave(){
 const R=RDR;
 if(!R.ls||!R.ls[R.i]||typeof cur!="string"||cur=="home")return;
 const m=rdrResumeAll();
 m[cur]={k:R.k,i:R.i,p:R.p,n:R.pg.length,lt:rdrLT(R.ls[R.i]),pt:(R.tt||[])[R.p]||"",t:Date.now()};
 try{localStorage.setItem("btsrdp",JSON.stringify(m))}catch(e){}
}
function rdrResumeFind(sid){
 const e=rdrResumeAll()[sid],S=RDR.sets;
 if(!e||!S)return null;
 let k=e.k,i=e.i;
 if(!(S[k]&&S[k][i]&&rdrLT(S[k][i])===e.lt)){
  /* la liste a changé : on retrouve la leçon par son titre (chapitres d'abord, « en vrac » en dernier) */
  const keys=Object.keys(S).sort((a,b)=>(a=="a")-(b=="a"));
  k=null;
  for(const kk of keys){const j=S[kk].findIndex(l=>rdrLT(l)===e.lt);if(j>=0){k=kk;i=j;break}}
  if(k==null)return null;
 }
 return Object.assign({},e,{k,i});
}
function rdrAgo(t){
 const a=new Date(t),b=new Date();a.setHours(0,0,0,0);b.setHours(0,0,0,0);
 const d=Math.round((b-a)/864e5);
 return d<=0?"aujourd’hui":d==1?"hier":"il y a "+d+" jours";
}
function rdrResume(){
 const r=rdrResumeFind(cur);if(!r)return;
 rdrOpen(r.i,r.k);
 RDR.p=Math.max(0,Math.min(r.p,RDR.pg.length-1));rdrShow();
}
function rdrResumeForget(){
 const m=rdrResumeAll();delete m[cur];
 try{localStorage.setItem("btsrdp",JSON.stringify(m))}catch(e){}
 const y=window.scrollY;subj();window.scrollTo(0,y);
}

function rdrZoom(d){
 RZL=d==0?0:Math.max(RZ.min,Math.min(RZ.max,RZL+d));
 try{localStorage.setItem("btsrdz",String(RZL))}catch(e){}
 rdrZoomApply();
}

/* Découpe un chapitre en pages : une page par titre <h3>, les pages trop courtes sont fusionnées. */
function rdrPages(h){
 const d=document.createElement("div");d.innerHTML=h;
 const q=d.querySelector('button[onclick="toggleLes()"]');
 if(q){const w=q.closest("p");(w||q).remove()}
 const groups=[];let cur=[];
 [...d.childNodes].forEach(n=>{if(n.nodeName=="H3"&&cur.length){groups.push(cur);cur=[]}cur.push(n)});
 if(cur.length)groups.push(cur);
 const pages=[];
 groups.forEach(g=>{
  const w=document.createElement("div");g.forEach(n=>w.appendChild(n));
  const len=w.textContent.length,last=pages[pages.length-1];
  if(last&&last.len+len<700){last.html+=w.innerHTML;last.len+=len}
  else pages.push({html:w.innerHTML,len})
 });
 return pages.length?pages.map(p=>p.html):[""];
}

function rdrLoad(i,p){
 RDR.i=i;RDR.pg=rdrPages(RDR.ls[i][1]);RDR.tt=rdrTitles(RDR.pg);
 RDR.p=p<0?RDR.pg.length-1:p;
 rdrShow();
}

function rdrShow(){
 const o=$("rdr");if(!o)return;
 const R=RDR,n=R.pg.length,lastPage=R.p==n-1,lastCh=R.i==R.ls.length-1;
 o.querySelector(".rdt").innerHTML=noNum(R.ls[R.i][0]);
 o.querySelector(".rdn").textContent=(R.p+1)+" / "+n;
 const quiz=lastPage?`<p style="text-align:center;margin-top:28px"><button class="btn p" onclick="rdrToQuiz()">Passer au quiz →</button></p>`:"";
 const b=o.querySelector(".rdb");
 b.innerHTML=`<div class="rdp">${R.pg[R.p]}${quiz}</div>`;
 rdrMaskUI(b);
 b.scrollTop=0;
 const pv=o.querySelector(".rdv"),nx=o.querySelector(".rdx");
 pv.disabled=R.p==0&&R.i==0;
 pv.textContent=R.p==0&&R.i>0?"← Leçon précédente":"← Précédent";
 nx.disabled=lastPage&&lastCh;
 nx.textContent=lastPage&&!lastCh?"Leçon suivante →":"Suivant →";
 rdrToc();rdrProgress();rdrSave();
 o.querySelector(".rdd").innerHTML=n>1&&n<=12?R.pg.map((_,k)=>`<button class="dot${k==R.p?" c":""}" onclick="rdrPage(${k})" aria-label="Page ${k+1}"></button>`).join(""):"";
}

function rdrPage(k){RDR.p=k;rdrShow()}

/* ---- Feuille blanche : masque la colonne gauche ou droite des tableaux à deux colonnes (vocabulaire) ; clic sur une case = la révéler ---- */
function rdrMaskStyle(){
 if(document.getElementById("rdmks"))return;
 const s=document.createElement("style");s.id="rdmks";
 s.textContent=`.rdmk{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 16px;font-size:.85rem}
.rdmk>span{opacity:.8;margin-right:4px}
.rdp td.mk{filter:blur(7px);cursor:pointer;user-select:none;-webkit-user-select:none;transition:filter .2s}
.rdp td.mk.show{filter:none;user-select:auto;-webkit-user-select:auto}`;
 document.head.appendChild(s);
}
function rdrMask(m){
 RDR.mask=RDR.mask===m?"":m;
 const b=$("rdr")&&$("rdr").querySelector(".rdb"),y=b?b.scrollTop:0;
 rdrShow();
 if(b)b.scrollTop=y;
}
function rdrMaskUI(b){
 const p=b.querySelector(".rdp"),rows=[];
 p.querySelectorAll("table tr").forEach(r=>{const c=r.querySelectorAll(":scope>td");if(c.length==2)rows.push(c)});
 if(!rows.length)return;
 rdrMaskStyle();
 const m=RDR.mask;
 rows.forEach(c=>{const h=m=="l"?c[0]:m=="r"?c[1]:null;if(h){h.classList.add("mk");h.title="Cliquer pour révéler";h.onclick=()=>h.classList.toggle("show")}});
 const bar=document.createElement("div");bar.className="rdmk";
 bar.innerHTML=`<span>📝 Feuille blanche :</span><button class="btn${m=="l"?" p":""}" onclick="rdrMask('l')">Masquer la gauche</button><button class="btn${m=="r"?" p":""}" onclick="rdrMask('r')">Masquer la droite</button>${m?`<button class="btn" onclick="rdrMask('')">Tout afficher</button><span>Cliquez sur une case floue pour la révéler.</span>`:""}`;
 p.insertBefore(bar,p.firstChild);
}

function rdrGo(d){
 const R=RDR,np=R.p+d;
 if(np>=0&&np<R.pg.length){R.p=np;rdrShow();return}
 const ni=R.i+d;
 if(ni<0||ni>=R.ls.length)return;
 rdrLoad(ni,d<0?-1:0);
}

function rdrKey(e){
 if(e.key=="Escape")rdrClose();
 else if(e.key=="ArrowRight"||e.key=="PageDown"){e.preventDefault();rdrGo(1)}
 else if(e.key=="ArrowLeft"||e.key=="PageUp"){e.preventDefault();rdrGo(-1)}
 else if(!e.ctrlKey&&!e.metaKey&&!e.altKey){if(e.key=="+"||e.key=="=")rdrZoom(1);else if(e.key=="-")rdrZoom(-1);else if(e.key=="0")rdrZoom(0);else if(e.key=="s"||e.key=="S")rdrTocToggle();else if(e.key=="c"||e.key=="C")rdrCalm()}
}

function rdrOpen(i,k){
 rdrClose();
 RDR.k=k||"c";if(RDR.sets&&RDR.sets[RDR.k])RDR.ls=RDR.sets[RDR.k];
 RDR.cnt=null;
 const o=document.createElement("div");
 o.id="rdr";o.className="rdr";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");
 o.innerHTML=`<div class="rdh"><button class="btn rdst" onclick="rdrTocToggle()" aria-label="Afficher ou masquer le sommaire" title="Sommaire (touche S)">☰<span class="rdtx"> Sommaire</span></button><span class="rdt"></span><span class="rdn mu"></span><span class="rdl mu"></span><span class="rdza"><button class="btn rdzm" onclick="rdrZoom(-1)" aria-label="Réduire le texte" title="Réduire le texte (touche -)">A−</button><button class="btn rdzr" onclick="rdrZoom(0)" aria-label="Taille normale du texte">A</button><button class="btn rdzp" onclick="rdrZoom(1)" aria-label="Agrandir le texte" title="Agrandir le texte (touche +)">A+</button></span><button class="btn rdcm" onclick="rdrCalm()" aria-pressed="false" aria-label="Mode lecture calme" title="Mode lecture calme (touche C)">🌙<span class="rdtx"> Calme</span></button><button class="btn rdcf" onclick="if(window.cfOpen)cfOpen()" aria-label="Réglages de confort" title="Réglages de confort">⚙<span class="rdtx"> Confort</span></button><button class="btn" onclick="rdrClose()" aria-label="Fermer le cours">✕ Fermer</button></div><div class="rdpr" role="progressbar" aria-label="Progression de la lecture" aria-valuemin="0" aria-valuemax="100" onclick="rdrProgressGo(event)"><i></i></div><div class="rdm"><nav class="rds" aria-label="Sommaire du cours"></nav><div class="rdb"></div></div><div class="rdf"><button class="btn rdv" onclick="rdrGo(-1)"></button><span class="rdd"></span><button class="btn p rdx" onclick="rdrGo(1)"></button></div>`;
 o.addEventListener("touchstart",e=>{RDR.x=e.changedTouches[0].clientX;RDR.y=e.changedTouches[0].clientY},{passive:true});
 o.addEventListener("touchend",e=>{
  if(e.target.closest&&e.target.closest(".rds"))return;
  const dx=e.changedTouches[0].clientX-RDR.x,dy=e.changedTouches[0].clientY-RDR.y;
  if(Math.abs(dx)>70&&Math.abs(dx)>2*Math.abs(dy))rdrGo(dx<0?1:-1);
 },{passive:true});
 document.body.appendChild(o);
 rdrZoomApply();rdrTocApply();rdrCalmApply();
 window.addEventListener("resize",rdrTocApply);
 document.body.style.overflow="hidden";
 document.addEventListener("keydown",rdrKey);
 if(OP())sfx.room();
 rdrLoad(i,0);
}

function rdrClose(){
 const o=$("rdr");if(o)o.remove();
 window.removeEventListener("resize",rdrTocApply);
 document.body.style.overflow="";
 document.removeEventListener("keydown",rdrKey);
}

/* ---- Retour au cours depuis le quiz : mémorise chapitre et page, affiche un bouton flottant ---- */
let RDB=null;
function rdrToQuiz(){
 const R=RDR;
 RDB={s:cur,i:R.i,p:R.p,n:R.pg.length,k:R.k};
 rdrClose();toggleLes();rdrBackSync();
}
function rdrBackSync(){
 let b=$("rdback");
 const on=RDB&&cur===RDB.s&&tab!="cours"&&!$("rdr");
 if(!on){if(b)b.remove();if(RDB&&cur!==RDB.s)RDB=null;return}
 if(b)return;
 b=document.createElement("div");b.id="rdback";b.className="rdback";
 b.innerHTML=`<button class="btn p" onclick="rdrBack()">↩ Retour au cours<small>Leçon ${RDB.i+1}, page ${RDB.p+1} / ${RDB.n}</small></button><button class="btn" onclick="rdrBackHide()" aria-label="Masquer">✕</button>`;
 document.body.appendChild(b);
}
function rdrBackHide(){RDB=null;rdrBackSync()}
function rdrBack(){
 const R=RDB;RDB=null;rdrBackSync();
 if(!R||cur!==R.s)return;
 tab="cours";subj();
 if(RDR.sets&&RDR.sets[R.k]&&R.i<RDR.sets[R.k].length){rdrOpen(R.i,R.k);RDR.p=Math.min(R.p,RDR.pg.length-1);rdrShow()}
}
new MutationObserver(rdrBackSync).observe($("main"),{childList:true,subtree:true});

/* ---- Onglet Cours : une seule page, chapitres du programme avec leurs leçons dessous ; « Toutes les leçons » (en vrac) et aide-mémoire repliables ---- */
const CV={s:"",o:null};
function crsList(id,n){
 const raw=(typeof CHAPTERS!="undefined"&&CHAPTERS[id])||[];
 if(!raw.length)return [];
 const used=new Set();raw.forEach(c=>c.l.forEach(k=>used.add(k)));
 const out=raw.map(c=>({t:c.t,d:c.d||"",l:c.l.filter(k=>k<n)})),rest=[];
 for(let k=0;k<n;k++)if(!used.has(k))rest.push(k);
 if(rest.length)out.push({t:"📖 Autres leçons",d:"Leçons non rattachées à un chapitre du programme.",l:rest});
 return out;
}
function crsStyle(){
 if(document.getElementById("crss"))return;
 const s=document.createElement("style");s.id="crss";
 s.textContent=`.acc{margin:0 0 10px;padding:0;overflow:hidden}
.acc.open{border-color:var(--ac)}
.acc>.ah{display:flex;align-items:center;gap:14px;width:100%;padding:16px 18px;background:none;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer}
.acc>.ah:hover{background:rgba(255,255,255,.05)}
.acc .at{flex:1;min-width:0}.acc .at b{display:block;font-size:1.08rem}
.acc .at span{display:block;font-size:.85rem;margin-top:2px}
.acc .an{flex:none;font-size:.78rem;padding:3px 10px;border:1px solid var(--bd);border-radius:20px;opacity:.85}
.acc .ac{flex:none;width:34px;height:34px;border-radius:50%;border:1px solid var(--ac);display:grid;place-items:center;font-size:1.1rem;transition:transform .2s}
.acc.open .ac{transform:rotate(90deg);background:var(--ac);color:#111}
.acc .ab{padding:2px 14px 14px;border-top:1px solid var(--bd)}
.lrow{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;margin-top:8px;padding:11px 14px;border:1px solid var(--bd);border-radius:10px;background:rgba(255,255,255,.04);color:inherit;font:inherit;text-align:left;cursor:pointer}
.lrow:hover{border-color:var(--ac)}
.lrow span{opacity:.7;font-size:.85rem;flex:none}
.sec{display:flex;align-items:center;gap:12px;margin:6px 0 12px;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.8}
.sec::after{content:"";flex:1;border-top:2px solid var(--bd)}
.sec.r{margin-top:34px}
.rsm{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 14px;padding:14px 18px;border-color:var(--ac)}
.rsm .rsmt{flex:1;min-width:220px}.rsm .rsmt b{display:block;font-size:1.05rem}.rsm .rsmt span{display:block;font-size:.88rem;margin-top:2px}
.acc .ab:has(>.lrow){display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));column-gap:10px}
.acc .ab:not(:has(>.lrow)){column-width:420px;column-gap:32px}
.acc .ab h3{break-after:avoid}.acc .ab ul{break-inside:avoid}`;
 document.head.appendChild(s);
}
function crsToggle(id){CV.o=CV.o===id?null:id;const y=window.scrollY;subj();window.scrollTo(0,y)}
function cours(s){
 crsStyle();
 const L=LESSONS[s.id],all=L?(typeof L[0]=="string"?[L]:L):[],memo=COURS[s.id]||[],chs=crsList(s.id,all.length);
 if(CV.s!=s.id){CV.s=s.id;CV.o=null}
 const sets={a:all};
 chs.forEach((x,ci)=>{sets["c"+ci]=x.l.map(j=>all[j])});
 if(!chs.length)sets.c=all;
 RDR.sets=sets;RDR.ls=all;
 if(!all.length&&CV.o==null)CV.o="memo";
 const row=(l,i,k)=>`<button class="lrow" onclick="rdrOpen(${i},'${k}')"><b>${noNum(l[0])}</b><span>Lire →</span></button>`;
 const acc=(id,t,d,nb,body)=>{const o=CV.o===id;return `<div class="card acc${o?" open":""}"><button class="ah" onclick="crsToggle('${id}')" aria-expanded="${o}"><span class="at"><b>${t}</b><span class="mu">${d}</span></span><span class="an">${nb}</span><span class="ac">▸</span></button>${o?`<div class="ab">${body}</div>`:""}</div>`};
 let h="";
 const rs=rdrResumeFind(s.id);
 if(rs)h+=`<div class="card rsm"><div class="rsmt"><b>↩ Reprendre la lecture</b><span class="mu">${esc(rs.lt)} · page ${rs.p+1} / ${rs.n}${rs.pt?" · "+esc(rs.pt):""} · ${rdrAgo(rs.t)}</span></div><button class="btn p" onclick="rdrResume()">Reprendre</button><button class="btn" onclick="rdrResumeForget()" aria-label="Oublier la reprise" title="Oublier la reprise">✕</button></div>`;
 if(chs.length){
  h+=`<div class="sec">📚 Chapitres du programme</div>`+chs.map((x,ci)=>acc("c"+ci,x.t,x.d,x.l.length+" leçon"+(x.l.length>1?"s":""),sets["c"+ci].map((l,j)=>row(l,j,"c"+ci)).join(""))).join("");
  h+=`<div class="sec r">🗂️ Ressources</div>`;
  h+=acc("all","📖 Toutes les leçons en vrac","Lecture à la suite, dans l’ordre d’origine.",all.length+" leçons",all.map((l,i)=>row(l,i,"a")).join(""));
 }else if(all.length)h+=acc("all","📖 Leçons","Toutes les leçons de la matière.",all.length+" leçon"+(all.length>1?"s":""),all.map((l,i)=>row(l,i,"c")).join(""));
 h+=acc("memo","🧠 Aide-mémoire","Les points clés à retenir.",memo.length+" fiches",memo.map(([t,p])=>`<h3>${t}</h3><ul>${p.map(x=>`<li>${x}</li>`).join("")}</ul>`).join(""));
 $("sb").innerHTML=h;
}
