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
 const quiz=lastPage?`<p style="text-align:center;margin-top:28px"><button class="btn p" onclick="rdrClose();toggleLes()">Passer au quiz →</button></p>`:"";
 const b=o.querySelector(".rdb");
 b.innerHTML=`<div class="rdp">${R.pg[R.p]}${quiz}</div>`;
 b.scrollTop=0;
 const pv=o.querySelector(".rdv"),nx=o.querySelector(".rdx");
 pv.disabled=R.p==0&&R.i==0;
 pv.textContent=R.p==0&&R.i>0?"← Chapitre précédent":"← Précédent";
 nx.disabled=lastPage&&lastCh;
 nx.textContent=lastPage&&!lastCh?"Chapitre suivant →":"Suivant →";
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

/* ---- Onglet Cours ---- */
function cours(s){
 const L=LESSONS[s.id],ls=L?(typeof L[0]=="string"?[L]:L):[],memo=COURS[s.id]||[];
 RDR.ls=ls;
 $("sb").innerHTML=(ls.length?`<h3 style="margin:6px 0 10px">📚 Chapitres détaillés (${ls.length})</h3><div class="rdg">`+ls.map((l,i)=>`<button class="card rdc" onclick="rdrOpen(${i})"><b>${l[0]}</b><span class="mu">Lire en plein écran →</span></button>`).join("")+`</div>`:"")
 +`<details class="card memo"${ls.length?"":" open"}><summary><b>🧠 Aide-mémoire (${memo.length} fiches)</b></summary>${memo.map(([t,p])=>`<h3>${t}</h3><ul>${p.map(x=>`<li>${x}</li>`).join("")}</ul>`).join("")}</details>`;
}
