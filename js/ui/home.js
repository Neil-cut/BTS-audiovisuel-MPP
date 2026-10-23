/* js/ui/home.js — tableau de bord */

function home(){
 const all=S.map(s=>avg(s.id)).filter(v=>v!=null);
 const g=all.length?all.reduce((a,b)=>a+b)/all.length:null;
 $("main").innerHTML=`<h2>Bienvenue 👋 <span class="tag">${lv()}</span></h2><div class="card"><span class="mu">Moyenne générale</span><br><b style="font-size:2.2rem">${fmt(g)}</b> / 20</div>
 <div class="grid">${SO().map(s=>{const a=avg(s.id),b=st.b[s.id];return `<div class="card stat" style="--c:${s.c}" data-id="${s.id}">${s.i} <b>${s.n}</b><span class="mu">Moyenne : ${fmt(a)}/20<br>Meilleur quiz : ${b==null?"–":b+"/"+s.quiz.length}${BANKS[s.id]?"<br>Banques : "+bs(s.id):""}</span><div class="bar"><i style="width:${(a||0)*5}%"></i></div></div>`}).join("")}</div>`;
 document.querySelectorAll(".stat").forEach(c=>c.onclick=()=>{cur=c.dataset.id;tab="cours";go()});
}

