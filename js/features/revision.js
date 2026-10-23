/* js/features/revision.js — répétition espacée (paliers de 1, 3 et 7 jours) et mode « questions ratées »
   Données : st.sr[clé] = {b: palier 1-3, d: date d’échéance (ms), r: 1 si dans la liste des ratées, n: nombre d’erreurs}
   Clés : "b|idBanque|niveau|n°" (banques) · "q|idMatière|empreinte" (quiz rapide) */

const SR_DAYS=[1,3,7],DAY=864e5,SR_MAX=25;
st.sr=st.sr||{};
const srHash=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return(h>>>0).toString(36)};
const srKeyB=(b,l,i)=>"b|"+b.id+"|"+l+"|"+i;
const srKeyQ=(sid,q)=>"q|"+sid+"|"+srHash(q);
const srWhen=d=>{const n=Math.ceil((d-Date.now())/DAY);return n<=0?"aujourd’hui":n==1?"demain":"dans "+n+" jours"};

/* enregistre une réponse : une erreur programme un retour à J+1 ; une réussite à l’échéance fait avancer le palier */
function srRec(key,ok){
 const now=Date.now(),e=st.sr[key];
 if(!ok){st.sr[key]={b:1,d:now+DAY*SR_DAYS[0],r:1,n:(e&&e.n||0)+1};save();return}
 if(!e)return;
 e.r=0;
 if(e.d<=now){if(e.b>=SR_DAYS.length)delete st.sr[key];else{e.b++;e.d=now+DAY*SR_DAYS[e.b-1]}}
 save();
}

/* reprise de l’existant : les erreurs déjà enregistrées dans les banques sont à revoir dès maintenant */
function srMigrate(){
 if(st.srInit)return;const now=Date.now();
 Object.keys(BANKS).forEach(id=>BANKS[id].forEach(b=>b.levels.forEach((lv,l)=>{
  const P=st.bk[b.id+l];if(!P)return;
  lv.q.forEach((q,i)=>{if(P.a[i]!=null&&P.a[i]!==q.c){const k=srKeyB(b,l,i);if(!st.sr[k])st.sr[k]={b:1,d:now,r:1,n:1}}});
 })));
 st.srInit=1;save();
}
srMigrate();

/* toutes les questions d’une matière, sous une forme unique */
function srItems(s){
 const out=[];
 (BANKS[s.id]||[]).forEach(b=>b.levels.forEach((lv,l)=>{
  const pk=b.id+l,P=st.bk[pk]||{a:{},f:[]};
  lv.q.forEach((q,i)=>out.push({k:srKeyB(b,l,i),q:q.q,o:q.o,c:q.c,e:q.e||"",t:b.n,pk,i,fl:(P.f||[]).includes(i)}));
 }));
 (s.quiz||[]).forEach(q=>out.push({k:srKeyQ(s.id,q.q),q:q.q,o:q.o,c:q.a,e:q.e||"",t:"Quiz rapide",fl:false}));
 return out;
}
const srIsDue=x=>{const e=st.sr[x.k];return !!e&&e.d<=Date.now()};
const srIsBad=x=>{const e=st.sr[x.k];return (!!e&&!!e.r)||x.fl};
const srDue=s=>srItems(s).filter(srIsDue).length;

/* ---------- écran d’accueil de l’onglet ---------- */
let RV=null;
function rev(s){
 CB=null;clearInterval(window.CT);RV=null;
 const all=srItems(s),due=all.filter(srIsDue),bad=all.filter(srIsBad),tr=all.filter(x=>st.sr[x.k]);
 const pal=[1,2,3].map(p=>tr.filter(x=>st.sr[x.k].b==p).length);
 const nx=tr.map(x=>st.sr[x.k].d).filter(d=>d>Date.now()).sort((a,b)=>a-b)[0];
 $("sb").innerHTML=`<div class="rvgrid">
 <div class="card"><h3>📅 Révision du jour</h3><div class="rvn">${due.length}</div>
 <p class="mu">${due.length?"question"+(due.length>1?"s":"")+" à revoir aujourd’hui (séance de "+SR_MAX+" au maximum).":"Rien à revoir pour l’instant."+(nx?" Prochaine échéance : "+srWhen(nx)+".":" Les questions ratées apparaîtront ici.")}</p>
 ${due.length?`<button class="btn p" id="rvd">▶ Lancer la révision</button>`:""}</div>
 <div class="card"><h3>❌ Questions ratées et ⭐</h3><div class="rvn">${bad.length}</div>
 <p class="mu">${bad.length?"question"+(bad.length>1?"s":"")+" ratée"+(bad.length>1?"s":"")+" ou marquée"+(bad.length>1?"s":"")+" ⭐ (séance de "+SR_MAX+" au maximum).":"Aucune erreur en attente : bravo !"}</p>
 ${bad.length?`<button class="btn p" id="rvb">▶ Réviser mes erreurs</button>`:""}</div></div>
 <div class="card"><h3>🧠 Comment ça marche</h3>
 <p class="mu">Une question ratée dans un quiz ou une banque revient le lendemain. Réussie, elle revient 3 jours plus tard, à nouveau 7 jours plus tard ; à la suite de cette troisième réussite, elle est considérée comme maîtrisée. Une nouvelle erreur la ramène au premier palier.</p>
 <p class="mu">Les questions ⭐ restent dans la liste des erreurs tant que l’étoile n’est pas retirée (bouton ★ pendant la séance).</p>
 <p><span class="tag">1 jour : ${pal[0]}</span><span class="tag">3 jours : ${pal[1]}</span><span class="tag">7 jours : ${pal[2]}</span></p></div>`;
 if($("rvd"))$("rvd").onclick=()=>revStart(s,"due");
 if($("rvb"))$("rvb").onclick=()=>revStart(s,"bad");
}

/* ---------- séance ---------- */
function revStart(s,mode){
 const all=srItems(s),L=all.filter(mode=="due"?srIsDue:srIsBad).sort(()=>Math.random()-.5).slice(0,SR_MAX);
 if(!L.length)return rev(s);
 L.forEach(x=>{const o=x.o.map((t,k)=>[t,k==x.c]).sort(()=>Math.random()-.5);x.o=o.map(z=>z[0]);x.c=o.findIndex(z=>z[1])});
 RV={s,mode,L,i:0,good:0,a:null,msg:""};revShow();
}
function revShow(){
 const R=RV,x=R.L[R.i];if(!x)return revEnd();
 const a=R.a,done=R.i+(a!=null?1:0);
 $("sb").innerHTML=`<div class="tabs"><button id="rvq">← Révision</button></div>
 <div class="mu">Question ${R.i+1}/${R.L.length} · ✓ ${R.good}</div><div class="bar"><i style="width:${done/R.L.length*100}%"></i></div>
 <div class="card"><span class="tag">${esc(x.t)}</span>${x.pk?`<button class="btn" id="rvf" style="float:right" title="Marquer ou retirer l’étoile">${x.fl?"★":"☆"}</button>`:""}<h3>${esc(x.q)}</h3>
 <div id="rvo">${x.o.map((o,j)=>`<button class="opt ${a!=null?(j==x.c?"ok":j==a?"ko":""):""}${j==a&&a!=x.c?" fresh":""}" ${a!=null?"disabled":""} data-j="${j}"><b>${"ABCDE"[j]}</b> ${esc(o)}${j==a&&a!=x.c?`<i class="crack-overlay" style="background-image:url('${crack()}')"></i>`:""}</button>`).join("")}</div>
 ${a!=null?`<p><b>${a==x.c?"✅ Bonne réponse !":"❌ Raté."}</b><br><span class="mu">${esc(x.e)}</span><br><span class="mu">${R.msg}</span></p><button class="btn p" id="rvn">${R.i<R.L.length-1?"Suivant →":"Terminer"}</button>`:""}</div>
 <p class="mu">Raccourcis : A–E ou 1–5 pour répondre, Entrée pour continuer.</p>`;
 $("rvq").onclick=()=>{RV=null;rev(R.s)};
 $("sb").querySelectorAll(".opt").forEach(b=>b.onclick=()=>revAns(+b.dataset.j));
 if($("rvn"))$("rvn").onclick=revNext;
 if($("rvf"))$("rvf").onclick=()=>{const P=st.bk[x.pk]||(st.bk[x.pk]={a:{},f:[]}),p=P.f.indexOf(x.i);p<0?P.f.push(x.i):P.f.splice(p,1);x.fl=!x.fl;save();revShow()};
}
function revAns(j){
 const R=RV,x=R.L[R.i];if(!R||R.a!=null)return;
 const ok=j==x.c;R.a=j;srRec(x.k,ok);
 if(ok){R.good++;st.xp=(st.xp||0)+5;sfx.ok();fxPulse()}else sfx.ko();
 const e=st.sr[x.k];
 R.msg=ok?(e?"🔁 Prochaine révision : "+srWhen(e.d)+".":"🎓 Question maîtrisée."):"🔁 Elle reviendra demain.";
 save();revShow();
}
function revNext(){RV.i++;RV.a=null;revShow()}
function revEnd(){
 const R=RV,tot=R.L.length,rest=srItems(R.s).filter(R.mode=="due"?srIsDue:srIsBad).length;
 st.rvc=(st.rvc||0)+tot;save();
 $("sb").innerHTML=`<div class="card"><h3>🏁 Séance terminée : ${R.good}/${tot}</h3>
 <p class="mu">${rest?rest+" question"+(rest>1?"s":"")+" encore en attente.":"Plus rien en attente pour cette séance."}</p>
 <button class="btn p" id="rvr">← Retour</button>${rest?` <button class="btn" id="rvm">Séance suivante (${rest})</button>`:""}</div>`;
 const s=R.s,mode=R.mode;
 $("rvr").onclick=()=>{RV=null;rev(s)};
 if($("rvm"))$("rvm").onclick=()=>revStart(s,mode);
 fxDone(R.good,tot);fxAch("rev1","🔁 Première séance de révision");if(st.rvc>=100)fxAch("rev100","📅 100 questions révisées");
}
document.addEventListener("keydown",e=>{
 if(!RV||!$("rvo")||/INPUT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey)return;
 const kk=e.key.toLowerCase(),n="abcde".indexOf(kk),m=n>=0?n:"12345".indexOf(kk);
 if(RV.a==null){if(m>=0&&m<RV.L[RV.i].o.length)revAns(m)}else if(kk=="enter"||kk=="arrowright")revNext();
});
