/* js/features/exercices.js — onglet S’entraîner : accueil (révision + cartes) puis l’exercice choisi, avec bouton de retour */

const EXO={quiz:["📝","Quiz rapide","QCM rapide sur la matière"],bk:["🧠","Banques de questions","Par thème, avec niveaux et bilan"],sit:["🎯","Mises en situation","Réponses libres, corrigées par mots-clés"]};
function exoGo(u){sub=u;subj()}
function exo(s){
 if(!sub||(!EXO[sub]&&sub!="rev")){
  const due=srDue(s);
  $("sub").innerHTML=`<button class="card rdc" style="width:100%;margin-bottom:12px" onclick="exoGo('rev')"><b>🔁 À réviser${due?" ("+due+")":""}</b><span class="mu">${due?due+" question"+(due>1?"s":"")+" à revoir aujourd’hui":"Rien à revoir aujourd’hui : tes erreurs reviendront ici"}</span></button><div class="rdg">${Object.keys(EXO).map(k=>`<button class="card rdc" onclick="exoGo('${k}')"><b>${EXO[k][0]} ${EXO[k][1]}</b><span class="mu">${EXO[k][2]}</span></button>`).join("")}</div>`;
  $("sb").innerHTML="";
  return;
 }
 $("sub").innerHTML=`<p><button class="btn" onclick="exoGo('')">← S’entraîner</button></p>`;
 sub=="bk"?banks(s):sub=="quiz"?quiz(s):sub=="rev"?rev(s):sit(s);
}
