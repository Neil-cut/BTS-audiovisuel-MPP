/* js/features/cours.js — onglet Cours : chapitres détaillés (LESSONS) lus en plein écran, paginés, + aide-mémoire repliable (COURS) */

function toggleLes(){tab="exo";sub="quiz";subj()}

/* ---- Lecteur plein écran ---- */
const RDR={ls:[],i:0,p:0,pg:[],x:0,y:0};

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
 RDR.i=i;RDR.pg=rdrPages(RDR.ls[i][1]);
 RDR.p=p<0?RDR.pg.length-1:p;
 rdrShow();
}

function rdrShow(){
 const o=$("rdr");if(!o)return;
 const R=RDR,n=R.pg.length,lastPage=R.p==n-1,lastCh=R.i==R.ls.length-1;
 o.querySelector(".rdt").innerHTML=R.ls[R.i][0];
 o.querySelector(".rdn").textContent=(R.p+1)+" / "+n;
 const quiz=lastPage?`<p style="text-align:center;margin-top:28px"><button class="btn p" onclick="rdrToQuiz()">Passer au quiz →</button></p>`:"";
 const b=o.querySelector(".rdb");
 b.innerHTML=`<div class="rdp">${R.pg[R.p]}${quiz}</div>`;
 b.scrollTop=0;
 const pv=o.querySelector(".rdv"),nx=o.querySelector(".rdx");
 pv.disabled=R.p==0&&R.i==0;
 pv.textContent=R.p==0&&R.i>0?"← Leçon précédente":"← Précédent";
 nx.disabled=lastPage&&lastCh;
 nx.textContent=lastPage&&!lastCh?"Leçon suivante →":"Suivant →";
 o.querySelector(".rdd").innerHTML=n>1&&n<=12?R.pg.map((_,k)=>`<button class="dot${k==R.p?" c":""}" onclick="rdrPage(${k})" aria-label="Page ${k+1}"></button>`).join(""):"";
}

function rdrPage(k){RDR.p=k;rdrShow()}

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
}

function rdrOpen(i){
 rdrClose();
 const o=document.createElement("div");
 o.id="rdr";o.className="rdr";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");
 o.innerHTML=`<div class="rdh"><span class="rdt"></span><span class="rdn mu"></span><button class="btn" onclick="rdrClose()" aria-label="Fermer le cours">✕ Fermer</button></div><div class="rdb"></div><div class="rdf"><button class="btn rdv" onclick="rdrGo(-1)"></button><span class="rdd"></span><button class="btn p rdx" onclick="rdrGo(1)"></button></div>`;
 o.addEventListener("touchstart",e=>{RDR.x=e.changedTouches[0].clientX;RDR.y=e.changedTouches[0].clientY},{passive:true});
 o.addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].clientX-RDR.x,dy=e.changedTouches[0].clientY-RDR.y;
  if(Math.abs(dx)>70&&Math.abs(dx)>2*Math.abs(dy))rdrGo(dx<0?1:-1);
 },{passive:true});
 document.body.appendChild(o);
 document.body.style.overflow="hidden";
 document.addEventListener("keydown",rdrKey);
 if(OP())sfx.room();
 rdrLoad(i,0);
}

function rdrClose(){
 const o=$("rdr");if(o)o.remove();
 document.body.style.overflow="";
 document.removeEventListener("keydown",rdrKey);
}

/* ---- Retour au cours depuis le quiz : mémorise chapitre et page, affiche un bouton flottant ---- */
let RDB=null;
function rdrToQuiz(){
 const R=RDR;
 RDB={s:cur,i:R.i,p:R.p,n:R.pg.length,m:CV.m,c:CV.c};
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
 tab="cours";CV.m=R.m;CV.c=R.c;subj();
 if(R.i<RDR.ls.length){rdrOpen(R.i);RDR.p=Math.min(R.p,RDR.pg.length-1);rdrShow()}
}
new MutationObserver(rdrBackSync).observe($("main"),{childList:true,subtree:true});

/* ---- Onglet Cours : « Chapitres » (programme, avec leurs leçons) et « Leçons » (toutes, en vrac) + aide-mémoire ---- */
const CV={s:"",m:"chap",c:null};
function crsList(id,n){
 const raw=(typeof CHAPTERS!="undefined"&&CHAPTERS[id])||[];
 if(!raw.length)return [];
 const used=new Set();raw.forEach(c=>c.l.forEach(k=>used.add(k)));
 const out=raw.map(c=>({t:c.t,d:c.d||"",l:c.l.filter(k=>k<n)})),rest=[];
 for(let k=0;k<n;k++)if(!used.has(k))rest.push(k);
 if(rest.length)out.push({t:"📖 Autres leçons",d:"Leçons non rattachées à un chapitre du programme.",l:rest});
 return out;
}
function crsMode(m){CV.m=m;CV.c=null;subj()}
function crsOpen(c){CV.c=c;subj()}
function crsBack(){CV.c=null;subj()}
function cours(s){
 const L=LESSONS[s.id],all=L?(typeof L[0]=="string"?[L]:L):[],memo=COURS[s.id]||[],chs=crsList(s.id,all.length);
 if(CV.s!=s.id){CV.s=s.id;CV.m="chap";CV.c=null}
 if(!chs.length)CV.m="les";
 if(CV.c!=null&&!chs[CV.c])CV.c=null;
 const inCh=CV.m=="chap"&&CV.c!=null,ch=inCh?chs[CV.c]:null;
 RDR.ls=inCh?ch.l.map(k=>all[k]):all;
 const card=(l,i)=>`<button class="card rdc" onclick="rdrOpen(${i})"><b>${l[0]}</b><span class="mu">Lire en plein écran →</span></button>`;
 let h="";
 if(chs.length)h+=`<div class="tabs">${[["chap","📚 Chapitres ("+chs.length+")"],["les","📖 Leçons ("+all.length+")"]].map(t=>`<button class="${CV.m==t[0]?"on":""}" onclick="crsMode('${t[0]}')">${t[1]}</button>`).join("")}</div>`;
 if(inCh)h+=`<p><button class="btn" onclick="crsBack()">← Chapitres</button></p><h3 style="margin:6px 0 4px">${ch.t}</h3><p class="mu" style="margin:0 0 12px">${ch.d}</p><div class="rdg">${RDR.ls.map(card).join("")}</div>`;
 else if(CV.m=="chap")h+=`<div class="rdg">${chs.map((c,i)=>`<button class="card rdc" onclick="crsOpen(${i})"><b>${c.t}</b><span class="mu">${c.d}</span><span class="mu">${c.l.length} leçon${c.l.length>1?"s":""} →</span></button>`).join("")}</div>`;
 else if(all.length)h+=`<h3 style="margin:6px 0 10px">📖 Toutes les leçons (${all.length})</h3><div class="rdg">${all.map(card).join("")}</div>`;
 h+=`<details class="card memo"${all.length?"":" open"}><summary><b>🧠 Aide-mémoire (${memo.length} fiches)</b></summary>${memo.map(([t,p])=>`<h3>${t}</h3><ul>${p.map(x=>`<li>${x}</li>`).join("")}</ul>`).join("")}</details>`;
 $("sb").innerHTML=h;
}
