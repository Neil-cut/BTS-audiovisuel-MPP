/* js/features/cours.js — onglet Cours : chapitres détaillés (LESSONS) lus en plein écran, paginés, + aide-mémoire repliable (COURS) */

function toggleLes(){tab="exo";sub="quiz";subj()}

/* ---- Lecteur plein écran ---- */
const noNum=t=>t.replace(/^(📖\s*)\d+\.\s*/,"$1");
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
 o.querySelector(".rdt").innerHTML=noNum(R.ls[R.i][0]);
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

function rdrOpen(i,k){
 rdrClose();
 RDR.k=k||"c";if(RDR.sets&&RDR.sets[RDR.k])RDR.ls=RDR.sets[RDR.k];
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
.sec.r{margin-top:34px}`;
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
 if(chs.length){
  h+=`<div class="sec">📚 Chapitres du programme</div>`+chs.map((x,ci)=>acc("c"+ci,x.t,x.d,x.l.length+" leçon"+(x.l.length>1?"s":""),sets["c"+ci].map((l,j)=>row(l,j,"c"+ci)).join(""))).join("");
  h+=`<div class="sec r">🗂️ Ressources</div>`;
  h+=acc("all","📖 Toutes les leçons en vrac","Lecture à la suite, dans l’ordre d’origine.",all.length+" leçons",all.map((l,i)=>row(l,i,"a")).join(""));
 }else if(all.length)h+=acc("all","📖 Leçons","Toutes les leçons de la matière.",all.length+" leçon"+(all.length>1?"s":""),all.map((l,i)=>row(l,i,"c")).join(""));
 h+=acc("memo","🧠 Aide-mémoire","Les points clés à retenir.",memo.length+" fiches",memo.map(([t,p])=>`<h3>${t}</h3><ul>${p.map(x=>`<li>${x}</li>`).join("")}</ul>`).join(""));
 $("sb").innerHTML=h;
}
