/* js/features/sons.js — effets sonores de l'interface (lecteur, quiz, panneau Confort), avec une version par thème
   (à charger après panther.js et avant confort.js ; utilise tone(), noi(), OPS et sfx de fx.js ; tout est coupé par le réglage « Son »)
   Appel : sfx.fx("page"), sfx.fx("combo",5)… ; thèmes : d = sombre / clair, op = One Piece, ze = Zelda, pa = Panthère Rose */

(function(){
 const R=Math.random,N=(f,d,t,v,dl)=>tone(f,f,d,t||"sine",v||.05,dl||0);
 const seq=(a,d,t,v,gap)=>a.forEach((f,i)=>N(f,d,t||"triangle",v||.06,i*(gap||d*.8)));
 const th=()=>{const t=document.documentElement.dataset.theme;return t=="onepiece"?"op":t=="zelda"?"ze":t=="panther"?"pa":"d"};
 /* machine à écrire et vocabulaire sonore de Panthère Rose */
 const key=()=>{noi(.016,.1,2600+R()*1200,0,3,"highpass");tone(140+R()*50,100,.04,"triangle",.06)};
 const swish=(v)=>noi(.1,v||.06,4200,0,.8,"highpass");
 const coins=()=>{for(let i=0;i<6;i++)tone(3200+R()*2500,3000,.04,"triangle",.03,i*.045)};
 const fairy=()=>{for(let i=0;i<7;i++)tone(2000+R()*2600,2400+R()*1200,.1,"sine",.035,i*.06)};
 const wah=()=>[[311,0,.1],[294,.11,.1],[247,.22,.22]].forEach(([f,t,d])=>tone(f,f*.97,d,"sawtooth",.04,t));
 const none=()=>{};

 const SX={
  /* tourner une page du lecteur (suivante / précédente), changer de leçon */
  page:{d:()=>{swish(.05);tone(520,420,.06,"sine",.03)},op:()=>{swish(.06);OPS.wood()},ze:()=>tone(659,784,.07,"triangle",.07),pa:()=>{swish(.05);tone(140,110,.05,"triangle",.05)}},
  pageBack:{d:()=>{swish(.05);tone(420,520,.06,"sine",.03)},op:()=>{swish(.06);tone(200,120,.05,"triangle",.06)},ze:()=>tone(784,659,.07,"triangle",.07),pa:()=>{swish(.05);tone(110,85,.05,"triangle",.05)}},
  chapter:{d:()=>{swish(.05);seq([392,523,659],.14)},op:()=>OPS.soru(),ze:()=>seq([523,659,784],.1),pa:()=>{N(2093,.4,"sine",.04);noi(.15,.05,1800,0,1,"bandpass")}},
  /* ouvrir et fermer le lecteur (One Piece a déjà son « room » à l'ouverture) */
  open:{d:()=>{noi(.18,.07,2500,0,.7,"bandpass");tone(262,392,.22,"triangle",.06);N(523,.25,"sine",.04,.12)},op:none,ze:()=>seq([392,523,659,784],.09),pa:()=>{noi(.18,.08,4000,0,.8,"highpass");noi(.06,.08,700,.15,2)}},
  close:{d:()=>{noi(.12,.06,1800,0,.9,"bandpass");tone(392,262,.2,"triangle",.06)},op:()=>{OPS.gacha();OPS.wood()},ze:()=>seq([784,659,523,392],.08),pa:()=>{noi(.1,.08,900,0,2);tone(100,70,.08,"triangle",.07)}},
  /* barre Précédent / Suivant et pastilles du quiz */
  next:{d:()=>tone(480,620,.07,"sine",.07),op:()=>OPS.wood(),ze:()=>N(1047,.04,"square",.03),pa:key},
  prev:{d:()=>tone(620,480,.07,"sine",.07),op:()=>OPS.wood(),ze:()=>N(880,.04,"square",.03),pa:key},
  dot:{d:n=>N(600+(n%10)*45,.05,"sine",.06),op:()=>OPS.wood(),ze:n=>N(1000+(n%10)*40,.03,"square",.03),pa:key},
  pick:{d:()=>N(700,.03,"sine",.035),op:()=>OPS.wood(),ze:()=>N(1319,.04,"triangle",.05),pa:()=>{noi(.02,.06,2200,0,3,"highpass")}},
  flag:{d:()=>{tone(880,1175,.09,"triangle",.08);N(1760,.12,"sine",.03,.06)},op:()=>OPS.ding(),ze:()=>{N(1568,.08,"square",.04);N(2093,.15,"square",.04,.08)},pa:()=>{tone(3300,2900,.1,"sine",.04);noi(.03,.08,4200,.08,2,"highpass")}},
  shuffle:{d:()=>{for(let i=0;i<6;i++)noi(.025,.08,3000+R()*2000,i*.04,2,"highpass")},op:()=>{for(let i=0;i<6;i++){noi(.03,.09,1500+R()*900,i*.045,2);}},ze:()=>{for(let i=0;i<6;i++)N(800+R()*700,.03,"square",.025,i*.04)},pa:()=>{for(let i=0;i<6;i++)noi(.03,.08,3500+R()*1500,i*.04,2,"highpass")}},
  reset:{d:()=>{tone(600,160,.3,"sine",.08);noi(.25,.05,1200,0,.7,"lowpass")},op:()=>OPS.eyepop(),ze:()=>seq([784,622,466,311],.1),pa:wah},
  /* interrupteurs et choix du panneau Confort */
  on:{d:()=>tone(520,780,.1,"triangle",.08),op:()=>OPS.gacha(),ze:()=>seq([659,880],.07),pa:()=>N(98,.18,"sine",.11)},
  off:{d:()=>tone(780,520,.1,"triangle",.07),op:()=>OPS.wood(),ze:()=>seq([880,659],.07),pa:()=>N(82,.18,"sine",.11)},
  seg:{d:()=>N(660,.04,"square",.03),op:()=>OPS.wood(),ze:()=>N(988,.04,"square",.03),pa:key},
  panelOpen:{d:()=>{tone(330,495,.14,"sine",.06);tone(660,990,.16,"sine",.04,.06)},op:()=>OPS.paper(),ze:()=>seq([523,659,784,1047],.09),pa:()=>seq([65,73,82],.16,"sine",.12)},
  panelClose:{d:()=>{tone(495,330,.14,"sine",.06);tone(990,660,.16,"sine",.04,.04)},op:()=>OPS.gacha(),ze:()=>seq([1047,784,659,523],.07),pa:()=>seq([82,73,65],.14,"sine",.12)},
  /* taille du texte (a = palier), sommaire, lecture calme */
  zoom:{d:n=>N(400+(n+3)*40,.05,"triangle",.06),op:()=>OPS.wood(),ze:n=>N(740+(n+3)*30,.05,"triangle",.06),pa:key},
  toc:{d:()=>{noi(.12,.05,2200,0,.8,"bandpass");tone(300,440,.1,"sine",.04)},op:()=>OPS.soru(),ze:()=>tone(440,660,.1,"triangle",.05),pa:()=>tone(180,520,.2,"triangle",.06)},
  /* série de bonnes réponses (a = longueur), série perdue, succès, sans-faute, changement de thème */
  combo:{d:n=>{const f=500+Math.min(n,15)*60;tone(f,f*1.5,.1,"triangle",.08);N(f*2,.12,"sine",.03,.05)},op:n=>N(1100+Math.min(n,15)*40,.12,"triangle",.07),ze:n=>seq([523,659,784].map(f=>f*(1+Math.min(n,12)*.02)),.07),pa:n=>N(98+Math.min(n,15)*6,.2,"sine",.1)},
  lost:{d:()=>{tone(300,120,.35,"sawtooth",.06);noi(.2,.04,500,0,.8,"lowpass")},op:()=>OPS.eyepop(),ze:()=>seq([220,185,147],.14),pa:wah},
  achv:{d:()=>{seq([523,659,784,1047],.12);N(2093,.3,"sine",.04,.4)},op:none,ze:()=>seq([392,523,659,784,1047],.1),pa:()=>{tone(1568,1568,.5,"sine",.07,.04);tone(2093,2093,.6,"sine",.06,.1);coins()}},
  sparkle:{d:()=>{for(let i=0;i<8;i++)N(1800+R()*3000,.08,"sine",.03,i*.05)},op:none,ze:fairy,pa:coins},
  theme:{d:()=>{noi(.2,.06,3000,0,.7,"bandpass");tone(300,900,.2,"sine",.05)},op:()=>OPS.soru(),ze:none,pa:none},

  /* ---- navigation : matière, onglet, carte, volet, logo, menu des thèmes, ordre des matières ---- */
  nav:{d:()=>{tone(440,560,.08,"sine",.06);N(880,.06,"sine",.025,.04)},op:()=>{swish(.05);OPS.wood()},ze:()=>seq([784,988],.06,"square",.04),pa:()=>{key();N(98,.12,"sine",.08)}},
  tab:{d:()=>tone(500,660,.06,"triangle",.06),op:()=>OPS.wood(),ze:()=>{N(1319,.05,"square",.035);N(1568,.05,"square",.035,.05)},pa:key},
  card:{d:()=>{tone(330,495,.1,"sine",.07);N(660,.12,"sine",.03,.06)},op:()=>OPS.paper(),ze:()=>seq([523,659,784],.06,"triangle",.05),pa:()=>{noi(.12,.07,4000,0,.8,"highpass");N(110,.1,"triangle",.06)}},
  accOpen:{d:()=>tone(400,640,.12,"sine",.07),op:()=>{tone(120,200,.15,"sawtooth",.03);OPS.wood()},ze:()=>seq([440,554,659],.07),pa:()=>{noi(.1,.06,3800,0,.8,"highpass");N(131,.14,"sine",.08)}},
  accClose:{d:()=>tone(640,400,.12,"sine",.06),op:()=>{tone(200,110,.15,"sawtooth",.03);OPS.wood()},ze:()=>seq([659,554,440],.07),pa:()=>{noi(.08,.06,1200,0,2);N(98,.14,"sine",.08)}},
  logo:{d:()=>seq([523,392],.1),op:()=>OPS.soru(),ze:()=>seq([392,523,659],.07),pa:()=>tone(180,520,.2,"triangle",.06)},
  menu:{d:()=>{tone(300,600,.18,"sine",.06);noi(.12,.04,3000,0,.7,"bandpass")},op:()=>OPS.paper(),ze:fairy,pa:()=>{tone(3300,2900,.15,"sine",.05);noi(.3,.05,1100,.2,.8,"bandpass")}},
  reorder:{d:()=>{tone(400,300,.06,"sine",.05);tone(300,450,.08,"sine",.05,.06)},op:()=>{OPS.wood();setTimeout(OPS.wood,70)},ze:()=>seq([880,784,988],.05,"square",.03),pa:()=>{key();setTimeout(key,70)}},
  start:{d:()=>{seq([392,523,659,784],.12,"triangle",.07);N(1047,.4,"sine",.05,.45)},op:none,ze:()=>seq([523,659,784,1047],.12,"triangle",.1),pa:none},

  /* ---- boutons, survol, saisie ---- */
  confirm:{d:()=>{tone(440,660,.08,"triangle",.07);N(880,.1,"sine",.04,.07)},op:()=>OPS.gacha(),ze:()=>seq([659,784,1047],.07),pa:()=>{tone(160,110,.06,"triangle",.08);N(2093,.3,"sine",.03,.05)}},
  hover:{d:()=>N(900+R()*200,.02,"sine",.012),op:()=>noi(.02,.025,1800,0,3),ze:()=>N(1400+R()*300,.02,"square",.01),pa:()=>noi(.012,.03,3000,0,3,"highpass")},
  type:{d:()=>noi(.012,.05,3500+R()*800,0,3,"highpass"),op:()=>noi(.02,.06,1100,0,3),ze:()=>N(1100+R()*300,.02,"square",.02),pa:none},
  focus:{d:()=>N(1200,.03,"sine",.02),op:()=>noi(.025,.05,1400,0,3),ze:()=>N(1568,.03,"triangle",.03),pa:()=>noi(.02,.06,2200,0,3,"highpass")},
  toast:{d:()=>{N(1319,.08,"sine",.04);N(1760,.12,"sine",.03,.06)},op:()=>OPS.gacha(),ze:()=>{tone(2093,1760,.07,"sine",.05);tone(1760,2349,.1,"sine",.05,.07)},pa:none},
  check:{d:()=>{tone(660,990,.1,"triangle",.07);N(1320,.12,"sine",.03,.08)},op:()=>OPS.ding(),ze:()=>{N(1568,.07,"square",.04);N(2093,.15,"square",.04,.07)},pa:()=>{tone(1568,1568,.4,"sine",.06);coins()}},
  uncheck:{d:()=>tone(660,440,.1,"triangle",.06),op:()=>OPS.wood(),ze:()=>N(988,.06,"square",.03),pa:()=>N(82,.12,"sine",.1)},

  /* ---- lecteur : reprise, oubli, barre de progression, passage au quiz, retour au cours ---- */
  resume:{d:()=>tone(330,495,.15,"sine",.07),op:()=>OPS.paper(),ze:()=>seq([392,523],.08),pa:()=>tone(180,520,.2,"triangle",.06)},
  discard:{d:()=>tone(500,250,.12,"sine",.06),op:()=>OPS.gacha(),ze:()=>seq([523,392],.07,"square",.04),pa:()=>noi(.15,.07,1500,0,1,"bandpass")},
  seek:{d:()=>{noi(.14,.05,2500,0,.8,"bandpass");tone(400,700,.12,"sine",.04)},op:()=>OPS.soru(),ze:()=>tone(600,1200,.1,"triangle",.05),pa:()=>tone(180,520,.2,"triangle",.06)},
  quizStart:{d:()=>seq([392,523,659],.08),op:()=>OPS.slash(),ze:()=>seq([523,659,784,1047],.07,"square",.04),pa:()=>{tone(3300,2900,.18,"sine",.06);noi(.1,.08,1100,.1,.8,"bandpass")}},
  back:{d:()=>tone(500,350,.1,"sine",.06),op:()=>OPS.wood(),ze:()=>seq([659,523],.06),pa:key},

  /* ---- fin de série du quiz : sous la moyenne, très bon score, sans-faute ---- */
  fail:{d:()=>{tone(392,196,.5,"sawtooth",.05);tone(311,155,.5,"sawtooth",.04,.15)},op:()=>OPS.creak(),ze:()=>seq([392,370,349,330],.18,"triangle",.07),pa:wah},
  great:{d:()=>{seq([523,659,784],.1);N(1047,.3,"triangle",.07,.3)},op:()=>OPS.armament(),ze:()=>seq([784,988,1175],.09),pa:coins},
  perfect:{d:()=>{seq([523,659,784,1047,1319],.1,"triangle",.07);fairy()},op:()=>OPS.horn(),ze:()=>seq([523,659,784,1047,1319,1568],.1,"triangle",.1),pa:()=>{seq([1568,2093,3136],.12,"sine",.06);coins()}}
 };
 sfx.fx=(n,a)=>{const v=SX[n];if(!v)return;try{(v[th()]||v.d)(a||0)}catch(e){}};
 const P=sfx.fx;

 /* ---- lecteur de cours : ouverture, fermeture, pages, zoom, sommaire, lecture calme (on enveloppe les fonctions de cours.js) ---- */
 let opening=false,lp=null;
 const _ro=rdrOpen;rdrOpen=function(){opening=true;lp=null;try{_ro.apply(this,arguments)}finally{opening=false}lp={i:RDR.i,p:RDR.p};P("open")};
 const _rc=rdrClose;rdrClose=function(){const had=!!$("rdr");_rc.apply(this,arguments);if(had&&!opening)P("close");lp=null};
 const _rs=rdrShow;rdrShow=function(){_rs.apply(this,arguments);if(lp&&$("rdr")&&(RDR.i!=lp.i||RDR.p!=lp.p))P(RDR.i!=lp.i?"chapter":RDR.p>lp.p?"page":"pageBack");if($("rdr"))lp={i:RDR.i,p:RDR.p}};
 const _rz=rdrZoom;rdrZoom=function(d){const b=RZL;_rz.apply(this,arguments);if(RZL!=b||d==0)P("zoom",RZL)};
 const _rt=rdrTocToggle;rdrTocToggle=function(){_rt.apply(this,arguments);P("toc")};
 const _rk=rdrCalm;rdrCalm=function(){_rk.apply(this,arguments);P(RCM?"on":"off")};
 const _rm=rdrMask;rdrMask=function(m){_rm.apply(this,arguments);P(RDR.mask?"on":"off")};

 /* ---- succès, sans-faute (confetti), changement de thème ---- */
 const _fa=fxAch;fxAch=function(k,l){const n=st.ach.length;_fa.apply(this,arguments);if(st.ach.length>n)P("achv")};
 const _cf=confetti;confetti=function(){_cf.apply(this,arguments);P("sparkle")};
 let pt=document.documentElement.dataset.theme;
 new MutationObserver(()=>{const t=document.documentElement.dataset.theme;if(pt&&t!=pt)P("theme");pt=t}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});

 /* ---- fonctions de cours.js, cine.js, nav.js, fx.js enveloppées pour les sons restants (chaque fonction n'est enveloppée que si elle existe) ---- */
 const wrap=(nom,ev,cond)=>{try{const f=window[nom]||eval(nom);if(typeof f!="function")return;const o=f;const w=function(){const r=o.apply(this,arguments);if(!cond||cond.apply(this,arguments))P(typeof ev=="function"?ev.apply(this,arguments):ev);return r};eval(nom+"=w")}catch(e){}};
 wrap("rdrResume","resume");
 wrap("rdrResumeForget","discard");
 wrap("rdrProgressGo","seek");
 wrap("rdrToQuiz","quizStart");
 wrap("rdrBack","back");
 wrap("setOrder","reorder");
 wrap("cineToggle",d=>st.cc&&st.cc[d]?"check":"uncheck");
 wrap("toast","toast");
 wrap("fxDone",(g,t)=>t>0&&g==t?"perfect":t>0&&g/t>=.8?"great":"fail",(g,t)=>t>0&&(g/t<.5||g/t>=.8));
 const soft=()=>typeof CF!="undefined"&&CF.hv;
 const sel=".btn,.tabs button,.stat,.opt:not(:disabled),nav button,.dot,.lrow,.acc>.ah,.dcr";
 let lh=null,lt=0,lk=0;
 /* survol (souris seulement, très discret, réglage « Sons discrets » du panneau Confort) */
 document.addEventListener("pointerover",e=>{
  if(e.pointerType!="mouse"||!soft()||!e.target.closest)return;
  const el=e.target.closest(sel);if(!el||el===lh)return;
  lh=el;const n=Date.now();if(n-lt<60)return;lt=n;P("hover");
 });
 document.addEventListener("pointerout",e=>{if(!e.relatedTarget)lh=null});
 /* saisie : un petit son par touche dans les champs de texte (Panthère Rose a déjà sa machine à écrire dans panther.js) */
 document.addEventListener("keydown",e=>{
  if(!soft()||e.ctrlKey||e.metaKey||e.altKey||!/^(INPUT|TEXTAREA)$/.test(e.target.tagName))return;
  if(e.key.length==1||e.key=="Backspace"||e.key=="Enter"){const n=Date.now();if(n-lk>35){lk=n;P("type")}}
 });
 document.addEventListener("focusin",e=>{if(soft()&&/^(INPUT|TEXTAREA)$/.test(e.target.tagName))P("focus")});
 const st0=$("start");if(st0)st0.addEventListener("click",()=>P("start"));

 /* ---- clics (délégation : les boutons sont recréés à chaque rendu) ---- */
 document.addEventListener("click",e=>{
  const t=e.target;if(!t.closest)return;
  if(t.closest("#nx"))P("next");
  else if(t.closest("#pv"))P("prev");
  else if(t.closest(".qzd .dot"))P("dot",+t.closest(".dot").dataset.n||0);
  else if(t.closest(".opt"))P("pick");
  else if(t.closest("#fl"))P("flag");
  else if(t.closest("#sh"))P("shuffle");
  else if(t.closest("#rs"))P("reset");
  else if(t.closest("#au")){const a=$("au");P(a&&a.classList.contains("on")?"on":"off")}
  else if(t.closest("[data-l]")&&t.closest("#sb"))P("chapter");
  else if(t.closest("#b0"))P("close");
  else if(t.closest("nav button"))P("nav");
  else if(t.closest("#logo"))P("logo");
  else if(t.closest("#theme"))P("menu");
  else if(t.closest(".stat"))P("card");
  else if(t.closest(".acc>.ah")){const a=t.closest(".acc");P(a&&a.classList.contains("open")?"accClose":"accOpen")}
  else if(t.closest(".tabs button")&&!t.closest("#sb")&&!t.closest(".cfp")&&!t.closest(".pdfv"))P("tab");
  else if(t.closest(".btn.p")&&!t.closest(".cfp,.pdfv,.dcr,.rdr,.rdback,#qzbar,#start"))P("confirm");
 });
})();
