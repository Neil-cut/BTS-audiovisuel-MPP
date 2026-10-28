/* js/features/quiz.js — quiz rapide (QCM de la matière) : même présentation que les banques (colonnes, barre fixe, pastilles, ✓ / ✗) ; les fonctions qz* viennent de banks.js */

function quiz(s){
 let i=0,score=0,fresh=-1;const A=[];
 /* ordre des questions ET des réponses mélangé à chaque partie */
 const Q=s.quiz.map(q=>{const o=q.o.map((x,k)=>[x,k==q.a]).sort(()=>Math.random()-.5);return{q:q.q,e:q.e,o:o.map(x=>x[0]),a:o.findIndex(x=>x[1])}}).sort(()=>Math.random()-.5);
 const ans=k=>{
  if(A[i]!=null)return;
  const q=Q[i];A[i]=k;fresh=k;
  srRec(srKeyQ(s.id,q.q),k==q.a);
  if(k==q.a){score++;st.xp=(st.xp||0)+10;save();sfx.ok();fxPulse()}else sfx.ko();
  show();fresh=-1;
 };
 const show=()=>{
  if(i>=Q.length){
   qzBarOff();
   if(st.b[s.id]==null||score>st.b[s.id])st.b[s.id]=score;save();
   $("sb").innerHTML=`<div class="card"><h3>Résultat : ${score} / ${Q.length}</h3><button class="btn p" id="again">Recommencer</button></div>`;
   $("again").onclick=()=>quiz(s);fxDone(score,Q.length);return;
  }
  const q=Q[i],a=A[i];
  $("sb").innerHTML=`<div class="card qz"><span class="mu">Question ${i+1}/${Q.length}</span>
  <div class="qzg"><div class="qzl"><h3>${esc(q.q)}</h3>
  <div class="opts">${q.o.map((o,k)=>`<button class="opt${a!=null?(k==q.a?" ok":k==a?" ko":""):""}${k==fresh?" fresh":""}" ${a!=null?"disabled":""} data-k="${k}">${esc(o)}${a!=null&&k==q.a?qzIcon(1):a!=null&&k==a?qzIcon(0):""}${k==fresh&&k!=q.a?`<i class="crack-overlay" style="background-image:url('${crack()}')"></i>`:""}</button>`).join("")}</div></div>
  <aside class="qzr${a!=null?" on "+(a==q.a?"ok":"ko"):""}" id="fb" aria-live="polite">${a!=null?`<p><b>${a==q.a?"✅ Bonne réponse !":"❌ Raté."}</b><br><span class="mu">${esc(q.e||"")}</span></p>`:`<p class="mu">Répondez pour afficher la correction et l’explication.</p>`}</aside></div></div>
  <div class="qzd" role="group" aria-label="Progression dans les questions">${qzDots(Q.length,n=>A[n]==null?"":A[n]==Q[n].a?"g":"r",i,n=>n+1)}</div><div class="qzsp" aria-hidden="true"></div>`;
  qzBarSet(i+1,Q.length,i==0,a==null,i==Q.length-1?"Résultat →":"Suivant →");
  $("sb").querySelectorAll(".opt").forEach(b=>b.onclick=()=>ans(+b.dataset.k));
  $("sb").querySelectorAll(".dot").forEach(b=>b.onclick=()=>{const n=+b.dataset.n;if(n<=A.length){i=n;show()}});
  $("pv").onclick=()=>{if(i>0){i--;show()}};
  $("nx").onclick=()=>{if(A[i]!=null){i++;show()}};
 };
 show();
}
