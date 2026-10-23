/* js/features/quiz.js — quiz rapide (QCM de la matière) */

function quiz(s){
 let i=0,score=0;
 /* ordre des questions ET des réponses mélangé à chaque partie */
 const Q=s.quiz.map(q=>{const o=q.o.map((x,k)=>[x,k==q.a]).sort(()=>Math.random()-.5);return{q:q.q,e:q.e,o:o.map(x=>x[0]),a:o.findIndex(x=>x[1])}}).sort(()=>Math.random()-.5);
 const show=()=>{
  if(i>=Q.length){
   if(st.b[s.id]==null||score>st.b[s.id])st.b[s.id]=score;save();
   $("sb").innerHTML=`<div class="card"><h3>Résultat : ${score} / ${Q.length}</h3><button class="btn p" id="again">Recommencer</button></div>`;
   $("again").onclick=()=>quiz(s);fxDone(score,Q.length);return;
  }
  const q=Q[i];
  $("sb").innerHTML=`<div class="card"><span class="mu">Question ${i+1}/${Q.length}</span><h3>${esc(q.q)}</h3>${q.o.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}<p id="fb"></p></div>`;
  document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
   const k=+b.dataset.k;
   document.querySelectorAll(".opt").forEach((x,j)=>{x.disabled=true;if(j==q.a)x.classList.add("ok")});
   srRec(srKeyQ(s.id,q.q),k==q.a);if(k==q.a){score++;st.xp=(st.xp||0)+10;save();b.classList.add("fresh");sfx.ok();fxPulse()}else{b.classList.add("ko","fresh");b.insertAdjacentHTML("beforeend",`<i class="crack-overlay" style="background-image:url('${crack()}')"></i>`);sfx.ko()}
   $("fb").innerHTML=`${esc(q.e)}<br><button class="btn p" id="nx">Suivant →</button>`;
   $("nx").onclick=()=>{i++;show()};
  });
 };
 show();
}

