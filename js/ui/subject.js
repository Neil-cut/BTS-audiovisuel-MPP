/* js/ui/subject.js — page d’une matière et ses onglets */

function subj(){
 const s=S.find(x=>x.id==cur);
 $("main").innerHTML=`<h2 style="color:${s.c}">${s.i} ${s.n}</h2>
 <div class="tabs">${[["cours","📖 Cours"],["exo","✍️ S’entraîner"],["dev","📊 Notes"]].map(t=>`<button class="${tab==t[0]?"on":""}" data-t="${t[0]}">${t[1]}</button>`).join("")}</div><div id="sub"></div><div id="sb"></div>`;
 document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;if(tab=="exo")sub="";subj()});
 ({cours:()=>cours(s),exo:()=>exo(s),dev:()=>dev(s)})[tab]();
}
