# MAP (généré par tools/mapgen.py : ne pas modifier à la main)

## index.html (51 lignes)
ids : intro, lvl, start, logo, nav, theme, main
CSS (ordre) : base.css > layout.css > components.css > intro.css > fx.css > onepiece.css > zelda.css > revision.css > responsive.css
JS (ordre) :
  1. js/data/subjects.js
  2. js/data/quiz_plus.js
  3. js/data/courses.js
  4. js/data/courses_plus.js
  5. js/data/banks.js
  6. js/data/banks_plus.js
  7. js/data/phy_eco.js
  8. js/core/state.js
  9. js/core/utils.js
  10. js/core/fx.js
  11. js/ui/nav.js
  12. js/ui/home.js
  13. js/ui/subject.js
  14. js/features/cours.js
  15. js/features/exercices.js
  16. js/features/quiz.js
  17. js/features/situations.js
  18. js/features/banks.js
  19. js/features/devoirs.js
  20. js/features/revision.js
  21. js/features/zelda.js
  22. js/app.js
ATTENTION : même nom dans des dossiers différents : banks.js

## css/base.css (21 lignes, 6 Ko) : variables de couleurs, thèmes clair/sombre, reset
  thèmes : dark, light
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr --rdd --rdl
  sections : L10 fond du lecteur de cours, thème sombre : halos violet et ble | L16 fond du lecteur de cours, thème clair : repères de mise en p

## css/layout.css (17 lignes, 1 Ko) : structure générale : grille, barre latérale, zone principale
  sections : L10 réorganisation des matières par glisser-déposer

## css/components.css (50 lignes, 4 Ko) : composants réutilisables : cartes, onglets, boutons, quiz, tableaux, leçons
  sections : L21 liste des chapitres, aide-mémoire et lecteur de cours plein  | L35 la « page » : feuille centrée, texte grand, marges intérieur | L44 bouton « Retour au cours » (cours.js), affiché pendant le qu

## css/intro.css (8 lignes, 0 Ko) : écran d’accueil (spawn)

## css/fx.css (28 lignes, 2 Ko) : animations, fissures, toasts, fond animé, confettis

## css/onepiece.css (78 lignes, 35 Ko) : thème One Piece : mer profonde, or des trésors, affiches de prime
  thèmes : onepiece
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr
  sections : L15 version enrichie : navire en bois, affiches WANTED, parchemi | L35 détails cachés et clins d'œil | L56 navire pirate | L57 le bateau est dans la couche du fond : entre la vague arrièr | L64 lecteur de cours plein écran (cours.js) : pont de bois, page | L74 fond du lecteur de cours : carte marine, rose des vents, vag

## css/zelda.css (175 lignes, 29 Ko) : thème Zelda « Forêt Kokiri » (Ocarina of Time) : vert mousse, écorce, or vieilli, lueur de fée cyan
  thèmes : zelda
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr --cy --leather --bev --c
  sections : L7 fond : veines de bois très discrètes (au-dessus du canvas, s | L10 barre latérale : écorce sombre, filet or vieilli | L16 boutons : cuir (secondaire) et vert tunique (action principa | L20 effet magique : lueur de fée cyan au survol | L24 cartes : olive, cadre à double filet doré | L29 titres : séparateur pointillé doré (lucioles) + Triforce | L32 barres de progression : vert et cyan, avec Navi au bout | L37 leçons : parchemin | L43 écran d'accueil : sous-bois et rayons de lumière | L48 bouton retour en haut : Triforce | L52 Navi : fée lumineuse qui suit le curseur (créée par zelda.js | L61 rubis qui s'envolent à chaque bonne réponse | L72 1. palette triadique : émeraude / rubis / saphir pour les ma | L79 2-3. cœurs pixel-art + compteur de rubis + invincibilité (cl | L88 4. menu de pause : glissement horizontal à chaque changement | L92 5. dialogues à coins biseautés, mots clés en couleur | L101 6. jauge de magie verte segmentée | L106 7. réticule Z-Targeting jaune qui se resserre au survol | L116 8. typographie : Cinzel (titres) + Press Start 2P (chiffres) | L124 10. coffre : le temps se fige, l'objet est brandi | L133 13. textures : écorce de bois et parchemin taché | L137 14. papillon -> fée | L142 12. Arwing (code Konami) | L149 15. Bois Perdus : brume | L153 lecteur de cours plein écran (cours.js) : écorce, page en pa | L167 fond du lecteur de cours : forêt Kokiri, motifs géométriques

## css/revision.css (7 lignes, 0 Ko) : onglet « À réviser » (répétition espacée, questions ratées)

## css/responsive.css (6 lignes, 0 Ko) : adaptation mobile (toujours chargé en dernier)

Thèmes CSS présents : dark, light, onepiece, zelda

## js/data/subjects.js (40 lignes, 5 Ko) : les matières : nom, icône, couleur, quiz rapide, mise en situation
  constantes/état : S@3
  matières : tes (TES – Équipements vidéo), img (Image fixe), ana (Analyse filmique), mon (Montage), adobe (Photoshop & After Effects), ang (Anglais), fr (Français)

## js/data/quiz_plus.js (98 lignes, 15 Ko) : quiz rapides enrichis (12 questions par matière), remplace S[i].quiz
  fonctions : Qz@3
  constantes/état : QUIZ@4

## js/data/courses.js (12 lignes, 8 Ko) : fiches de cours (COURS) et leçons longues (LESSONS) par matière
  constantes/état : COURS@3, LESSONS@11
  LESSONS : mon

## js/data/courses_plus.js (129 lignes, 64 Ko) : chapitres supplémentaires (COURS) et leçons détaillées (LESSONS, plusieurs par matière)
  fonctions : les@3
  constantes/état : CHAPTERS@7
  sections : L6 CHAPTERS[id] : chapitres du programme ; chaque chapitre regr | L9 TES – Équipements vidéo | L27 Image fixe | L42 Analyse filmique | L62 chapitres du programme (référentiel « Culture audiovisuelle  | L70 Montage | L87 Photoshop & After Effects | L101 Anglais | L115 Français
  COURS enrichis : adobe, ana, ang, fr, img, mon, tes
  LESSONS : adobe, ana, ang, fr, img, mon, tes

## js/data/banks.js (4 lignes, 57 Ko) : banques de questions (BANKS) : informatique (TES) et Avid Attic (Montage)
  constantes/état : BANKS@3
  banques (id) : info, attic

## js/data/banks_plus.js (222 lignes, 34 Ko) : banques de questions supplémentaires (ajoutées à BANKS)
  fonctions : Bq@3, Bk@4, addB@5
  sections : L7 TES : caméra et optique | L31 TES : signal, codecs, stockage, audio | L55 Image fixe | L79 Analyse filmique | L103 Montage : grammaire | L127 Montage : workflow, outils, finitions | L151 Photoshop & After Effects | L175 Anglais | L199 Français
  banques (id) : tes_cam, tes_sig, img_b, ana_b, mon_gram, mon_flow, adobe_b, ang_b, fr_b

## js/data/phy_eco.js (119 lignes, 37 Ko) : deux matières supplémentaires : Physique-chimie (phy) et Droit & économie (eco)
  sections : L37 COURS (fiches) | L55 CHAPITRES DÉTAILLÉS | L73 BANQUES DE QUESTIONS
  matières : phy (Physique-chimie), eco (Droit & économie)
  banques (id) : phy_b, eco_b
  LESSONS : eco, phy

## js/core/state.js (9 lignes, 0 Ko) : état de l’application et sauvegarde (localStorage)
  fonctions : save@5
  constantes/état : st@3, cur@7, sub@8

## js/core/utils.js (8 lignes, 0 Ko) : petites fonctions partagées : esc, $, moyenne, formats, niveau XP
  fonctions : esc@3, avg@5, fmt@6, lv@7

## js/core/fx.js (194 lignes, 15 Ko) : effets : sons synthétisés, fissures, toasts, succès, confettis, fond animé
  fonctions : OP@5, actx@7, tone(f1,f2,d,type,v,delay)@8, noi(d,v,fc,delay,q,type)@16, crack()@80, toast(m)@94, fxAch(k,label)@98, fxDone(good,total)@99, fxEnter()@103, confetti()@104, sndLabel@119, berry()@126, fxPulse()@131, jar()@158, fxWanted(t,n)@165
  constantes/état : REDUCE@4, AC@6, rnd@26, OPS@27, sfx@64, pulse@124, PX@125, JM@156, JR@157
  sections : L15 bruit filtré (coups, froissement, craquement) : d = durée, v | L25 sons du thème One Piece (appelés par sfx seulement quand OP( | L79 fissure SVG aléatoire (réponse fausse) | L93 notifications, succès, fin de niveau | L117 bouton son + clic sonore global | L123 fond animé : vagues + points, pulsation à chaque bonne répon | L155 One Piece : jargon pirate, Pandaman caché, chapeau de retour | L172 One Piece : navire pirate qui navigue en bas de l'écran (rem

## js/ui/nav.js (74 lignes, 4 Ko) : barre latérale, navigation et ordre des matières (glisser-déposer, sauvegardé dans st.order)
  fonctions : SO@5, setOrder(ids,focus)@6, nav()@10, dragNav()@20, go()@73
  constantes/état : LASTDRAG@3
  sections : L4 matières triées selon l’ordre choisi ; les nouvelles matière | L19 glisser-déposer au pointeur : souris (dès 5 px de déplacemen

## js/ui/home.js (11 lignes, 0 Ko) : tableau de bord
  fonctions : home()@3

## js/ui/subject.js (10 lignes, 0 Ko) : page d’une matière et ses onglets
  fonctions : subj()@3

## js/features/cours.js (143 lignes, 6 Ko) : onglet Cours : chapitres détaillés (LESSONS) lus en plein écran, paginés, + aide-mémoire repliable (COURS)
  fonctions : toggleLes()@3, rdrPages(h)@9, rdrLoad(i,p)@26, rdrShow()@32, rdrPage(k)@49, rdrGo(d)@51, rdrKey(e)@59, rdrOpen(i)@65, rdrClose()@82, rdrToQuiz()@90, rdrBackSync()@95, rdrBackHide()@104, rdrBack()@105, crsList(id,n)@115, crsMode(m)@124, crsOpen(c)@125, crsBack()@126, cours(s)@127
  constantes/état : RDR@6, RDB@89, CV@114
  sections : L5 Lecteur plein écran | L8 Découpe un chapitre en pages : une page par titre <h3>, les  | L88 Retour au cours depuis le quiz : mémorise chapitre et page,  | L113 Onglet Cours : « Chapitres » (programme, avec leurs leçons) 

## js/features/exercices.js (8 lignes, 0 Ko) : onglet Exercices et ses sous-onglets
  fonctions : exo(s)@3

## js/features/quiz.js (26 lignes, 1 Ko) : quiz rapide (QCM de la matière)
  fonctions : quiz(s)@3

## js/features/situations.js (16 lignes, 0 Ko) : mises en situation (réponses libres + mots-clés)
  fonctions : sit(s)@3

## js/features/banks.js (52 lignes, 5 Ko) : banques de questions : niveaux, bilan, raccourcis clavier
  fonctions : bs@3, banks(s)@5, openBank(s,b,l)@10
  constantes/état : CB@4

## js/features/devoirs.js (15 lignes, 1 Ko) : devoirs, notes et moyennes pondérées
  fonctions : dev(s)@3

## js/features/revision.js (115 lignes, 7 Ko) : répétition espacée (paliers de 1, 3 et 7 jours) et mode « questions ratées »
  fonctions : srHash@7, srKeyB@8, srKeyQ@9, srWhen@10, srRec(key,ok)@13, srMigrate()@23, srItems(s)@34, srIsDue@43, srIsBad@44, srDue@45, rev(s)@49, revStart(s,mode)@70, revShow()@76, revAns(j)@90, revNext()@98, revEnd()@99
  constantes/état : SR_DAYS@5, RV@48
  sections : L12 enregistre une réponse : une erreur programme un retour à J+ | L22 reprise de l’existant : les erreurs déjà enregistrées dans l | L33 toutes les questions d’une matière, sous une forme unique | L47 écran d’accueil de l’onglet | L69 séance

## js/features/zelda.js (182 lignes, 8 Ko) : extras du thème Zelda (à charger après fx.js et avant app.js)
  fonctions : ZL@3, zSave@11, zHeart@15, zRender@20, zHeal@27, zHit@30, zLost@40, zWrong@45, zKo@54, zChest@96, zTick@111, zHide@112, zBf@130, zArwing@149, nTarget@170
  constantes/état : ZH@9, ZG@14, zs@25, zLW@44, zSeen@53, _ok@69, _pulse@77, zTC@93, zItems@95, zSel@108, ZT@110, zLast@113, zK@147, zKi@148, NV@169, prevT@180
  sections : L5 polices : Cinzel (titres) + Press Start 2P (chiffres) | L8 état : cœurs (en quarts) et rubis | L13 cœurs pixel-art dans la barre latérale | L29 coup reçu (mauvaise réponse) : -1 quart, puis ~2 s d'invinci | L39 3 mauvaises réponses d'affilée : Bois Perdus | L52 détection d'une mauvaise réponse : une option qui reçoit la  | L68 sons : jingle de secret, fanfare, coffre | L76 bonne réponse : loot intelligent (cœur si peu de vie, sinon  | L92 coffre : le temps se fige, l'objet est brandi | L107 Z-Targeting + sons de curseur | L129 papillon : reste dessus 1,3 s et il devient une fée (+1 cœur | L146 Arwing de Star Fox : ↑ ↑ ↓ ↓ ← → ← → B A | L167 Navi : fée qui suit le curseur | L179 « Hey ! Listen ! » quand on bascule sur le thème

## js/app.js (24 lignes, 1 Ko) : démarrage : thème, écran d’accueil, premier affichage (toujours chargé en dernier)
  fonctions : setTh@11
  constantes/état : TH@3, TX@5
  sections : L4 textes propres à chaque thème : icône du logo, texte de l’éc

## État partagé
champs de st : ach, b, bk, g, n, order, rvc, snd, sr, srInit, theme, xp
clés localStorage : btsapp, zhud

