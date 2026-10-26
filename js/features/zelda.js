/* js/features/zelda.js — extras du thème Zelda : Navi, rubis, jingles (à charger après fx.js et avant app.js) */

const ZL=()=>document.documentElement.dataset.theme=="zelda";

/* sons : jingle de secret sur bonne réponse, fanfare à la fin d’un niveau */
const _ok=sfx.ok,_win=sfx.win;
sfx.ok=()=>ZL()?[784,740,622,440,415,659,831,1047].forEach((f,i)=>tone(f,f,.12,"triangle",.11,i*.085)):_ok();
sfx.win=()=>ZL()?[523,659,784,1047,1319].forEach((f,i)=>tone(f,f,i==4?.5:.2,"triangle",.13,i*.12)):_win();

/* rubis (vert 1, bleu 5, rouge 20) à chaque bonne réponse */
const _pulse=fxPulse;
fxPulse=function(){
 _pulse();
 if(!ZL()||REDUCE)return;
 const v=[[1,"#6ee86e"],[5,"#4da6ff"],[20,"#ff6b6b"]][Math.random()*3|0],e=document.createElement("div");
 e.className="rupee";e.style.color=v[1];e.textContent="◆ +"+v[0];
 e.style.left=Math.max(8,PX-30)+"px";e.style.top=(PY-20)+"px";
 document.body.appendChild(e);setTimeout(()=>e.remove(),1000);
};

/* Navi : fée qui suit le curseur avec un peu de retard et de flottement */
document.body.insertAdjacentHTML("beforeend",'<div id="navi"><i></i><i></i></div>');
const NV=$("navi");let nx=innerWidth/2,ny=innerHeight/3,tx=nx,ty=ny;
const nTarget=e=>{tx=e.clientX+34;ty=e.clientY-34};
addEventListener("pointermove",nTarget);addEventListener("pointerdown",nTarget);
(function loop(t){
 requestAnimationFrame(loop);
 if(!ZL()||REDUCE)return;
 nx+=(tx-nx)*.05;ny+=(ty-ny)*.05;
 NV.style.transform="translate("+(nx+Math.sin(t/330)*9).toFixed(1)+"px,"+(ny+Math.cos(t/270)*9).toFixed(1)+"px)";
})(0);

/* « Hey ! Listen ! » quand on bascule sur le thème */
let prevT=document.documentElement.dataset.theme;
new MutationObserver(()=>{const t=document.documentElement.dataset.theme;if(t=="zelda"&&prevT&&prevT!="zelda")toast("🧚 Hey ! Listen !");prevT=t}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
