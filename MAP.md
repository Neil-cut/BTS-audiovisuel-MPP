# MAP (généré par tools/mapgen.py : ne pas modifier à la main)

## index.html (55 lignes)
ids : intro, lvl, start, logo, nav, theme, main
CSS (ordre) : base.css > layout.css > components.css > intro.css > fx.css > onepiece.css > zelda.css > panther.css > revision.css > responsive.css
JS (ordre) :
  1. js/data/subjects.js
  2. js/data/quiz_plus.js
  3. js/data/courses.js
  4. js/data/courses_plus.js
  5. js/data/banks.js
  6. js/data/banks_plus.js
  7. js/data/phy_eco.js
  8. js/data/cineclub.js
  9. js/core/state.js
  10. js/core/utils.js
  11. js/core/fx.js
  12. js/ui/nav.js
  13. js/ui/home.js
  14. js/ui/subject.js
  15. js/features/cours.js
  16. js/features/exercices.js
  17. js/features/quiz.js
  18. js/features/situations.js
  19. js/features/banks.js
  20. js/features/devoirs.js
  21. js/features/cine.js
  22. js/features/revision.js
  23. js/features/zelda.js
  24. js/features/panther.js
  25. js/app.js
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

## css/zelda.css (64 lignes, 5 Ko) : thème Zelda « Forêt Kokiri » (Ocarina of Time) : vert mousse, écorce, or vieilli, lueur de fée cyan
  thèmes : zelda
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr --cy --leather
  sections : L7 fond : veines de bois très discrètes (au-dessus du canvas, s | L10 barre latérale : écorce sombre, filet or vieilli | L16 boutons : cuir (secondaire) et vert tunique (action principa | L20 effet magique : lueur de fée cyan au survol | L24 cartes : olive, cadre à double filet doré | L29 titres : séparateur pointillé doré (lucioles) + Triforce | L32 barres de progression : vert et cyan, avec Navi au bout | L37 leçons : parchemin | L43 écran d'accueil : sous-bois et rayons de lumière | L48 bouton retour en haut : Triforce | L52 Navi : fée lumineuse qui suit le curseur (créée par zelda.js | L61 rubis qui s'envolent à chaque bonne réponse

## css/panther.css (108 lignes, 10 Ko) : thème « Panthère Rose » : jazz noir 1940, rouge brique dominant, rose, noir, crème, braise orange
  thèmes : panther
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr --em
  sections : L7 fond : persiennes de lumière + grain de pellicule (au-dessus | L11 barre latérale : noir profond, filet crème | L17 boutons : noir à filet crème (secondaire), rose panthère (pr | L21 survol : lueur de braise (le bout du cigare) | L25 cartes : noir bordeaux, double filet crème | L30 titres : filet crème avec losange central (style « 1940's JA | L33 barres de progression : rose vers rouge, saxo au bout | L38 leçons : papier crème, titres rouge brique | L44 écran d'accueil : fond rouge à spot de lumière, silhouette d | L51 bouton retour en haut : chapeau | L55 fumée de cigarette qui monte derrière le contenu (créée par  | L61 notes de jazz qui s'envolent à chaque bonne réponse | L65 fond du lecteur de cours (.rdr) : les calques ::before et :: | L70 Panthère Rose : persiennes, silhouette de fedora, fumée qui  | L78 poursuite en arrière-plan : un voleur avec son sac court sur

## css/revision.css (7 lignes, 0 Ko) : onglet « À réviser » (répétition espacée, questions ratées)

## css/responsive.css (6 lignes, 0 Ko) : adaptation mobile (toujours chargé en dernier)

Thèmes CSS présents : dark, light, onepiece, panther, zelda

## js/data/subjects.js (40 lignes, 5 Ko) : les matières : nom, icône, couleur, quiz rapide, mise en situation
  constantes/état : S@3
  matières : tes (TES – Équipements vidéo), img (Image fixe), ana (Analyse filmique), mon (Montage), adobe (Photoshop & After Effects), ang (Anglais), fr (Français)

## js/data/quiz_plus.js (98 lignes, 15 Ko) : quiz rapides enrichis (12 questions par matière), remplace S[i].quiz
  fonctions : Qz@3
  constantes/état : QUIZ@4

## js/data/courses.js (12 lignes, 8 Ko) : fiches de cours (COURS) et leçons longues (LESSONS) par matière
  constantes/état : COURS@3, LESSONS@11
  LESSONS : mon

## js/data/courses_plus.js (468 lignes, 111 Ko) : chapitres supplémentaires (COURS) et leçons détaillées (LESSONS, plusieurs par matière)
  fonctions : les@3
  constantes/état : CHAPTERS@7
  sections : L6 CHAPTERS[id] : chapitres du programme ; chaque chapitre regr | L9 TES – Équipements vidéo | L27 Image fixe | L44 chapitres Image fixe : proposition à valider (le référentiel | L52 chapitres des autres matières : proposition validée par l'ut | L88 Analyse filmique | L108 chapitres du programme (référentiel « Culture audiovisuelle  | L116 Montage | L215 Photoshop & After Effects | L229 Anglais | L352 Français
  COURS enrichis : adobe, ana, ang, fr, img, mon, tes
  LESSONS : adobe, ana, ang, fr, img, mon, tes

## js/data/banks.js (4 lignes, 57 Ko) : banques de questions (BANKS) : informatique (TES) et Avid Attic (Montage)
  constantes/état : BANKS@3
  banques (id) : info, attic

## js/data/banks_plus.js (222 lignes, 34 Ko) : banques de questions supplémentaires (ajoutées à BANKS)
  fonctions : Bq@3, Bk@4, addB@5
  sections : L7 TES : caméra et optique | L31 TES : signal, codecs, stockage, audio | L55 Image fixe | L79 Analyse filmique | L103 Montage : grammaire | L127 Montage : workflow, outils, finitions | L151 Photoshop & After Effects | L175 Anglais | L199 Français
  banques (id) : tes_cam, tes_sig, img_b, ana_b, mon_gram, mon_flow, adobe_b, ang_b, fr_b

## js/data/phy_eco.js (213 lignes, 54 Ko) : deux matières supplémentaires : Physique-chimie (phy) et Droit & économie (eco)
  sections : L37 COURS (fiches) | L55 CHAPITRES DÉTAILLÉS | L131 BANQUES DE QUESTIONS | L201 chapitres (proposition validée par l'utilisateur ; indices à
  matières : phy (Physique-chimie), eco (Droit & économie)
  banques (id) : phy_b, phy_ds1, eco_b
  LESSONS : eco, phy

## js/data/cineclub.js (17 lignes, 2 Ko) : programme du ciné-club 2026-2027 (d = date, t = titre, r = réalisateur, x = description sans spoil)
  constantes/état : CINECLUB@3

## js/core/state.js (9 lignes, 0 Ko) : état de l’application et sauvegarde (localStorage)
  fonctions : save@5
  constantes/état : st@3, cur@7, sub@8

## js/core/utils.js (8 lignes, 0 Ko) : petites fonctions partagées : esc, $, moyenne, formats, niveau XP
  fonctions : esc@3, avg@5, fmt@6, lv@7

## js/core/fx.js (194 lignes, 15 Ko) : effets : sons synthétisés, fissures, toasts, succès, confettis, fond animé
  fonctions : OP@5, actx@7, tone(f1,f2,d,type,v,delay)@8, noi(d,v,fc,delay,q,type)@16, crack()@80, toast(m)@94, fxAch(k,label)@98, fxDone(good,total)@99, fxEnter()@103, confetti()@104, sndLabel@119, berry()@126, fxPulse()@131, jar()@158, fxWanted(t,n)@165
  constantes/état : REDUCE@4, AC@6, rnd@26, OPS@27, sfx@64, pulse@124, PX@125, JM@156, JR@157
  sections : L15 bruit filtré (coups, froissement, craquement) : d = durée, v | L25 sons du thème One Piece (appelés par sfx seulement quand OP( | L79 fissure SVG aléatoire (réponse fausse) | L93 notifications, succès, fin de niveau | L117 bouton son + clic sonore global | L123 fond animé : vagues + points, pulsation à chaque bonne répon | L155 One Piece : jargon pirate, Pandaman caché, chapeau de retour | L172 One Piece : navire pirate qui navigue en bas de l'écran (rem

## js/ui/nav.js (75 lignes, 4 Ko) : barre latérale, navigation et ordre des matières (glisser-déposer, sauvegardé dans st.order)
  fonctions : SO@5, setOrder(ids,focus)@6, nav()@10, dragNav()@21, go()@74
  constantes/état : LASTDRAG@3
  sections : L4 matières triées selon l’ordre choisi ; les nouvelles matière | L20 glisser-déposer au pointeur : souris (dès 5 px de déplacemen

## js/ui/home.js (11 lignes, 0 Ko) : tableau de bord
  fonctions : home()@3

## js/ui/subject.js (10 lignes, 0 Ko) : page d’une matière et ses onglets
  fonctions : subj()@3

## js/features/cours.js (197 lignes, 10 Ko) : onglet Cours : chapitres détaillés (LESSONS) lus en plein écran, paginés, + aide-mémoire repliable (COURS)
  fonctions : toggleLes()@3, noNum@6, rdrPages(h)@10, rdrLoad(i,p)@27, rdrShow()@33, rdrPage(k)@51, rdrMaskStyle()@54, rdrMask(m)@63, rdrMaskUI(b)@69, rdrGo(d)@81, rdrKey(e)@89, rdrOpen(i,k)@95, rdrClose()@113, rdrToQuiz()@121, rdrBackSync()@126, rdrBackHide()@135, rdrBack()@136, crsList(id,n)@146, crsStyle()@155, crsToggle(id)@176, cours(s)@177
  constantes/état : RDR@7, RDB@120, CV@145
  sections : L5 Lecteur plein écran | L9 Découpe un chapitre en pages : une page par titre <h3>, les  | L53 Feuille blanche : masque la colonne gauche ou droite des tab | L119 Retour au cours depuis le quiz : mémorise chapitre et page,  | L144 Onglet Cours : une seule page, chapitres du programme avec l

## js/features/exercices.js (15 lignes, 1 Ko) : onglet S’entraîner : accueil (révision + cartes) puis l’exercice choisi, avec bouton de retour
  fonctions : exoGo(u)@4, exo(s)@5
  constantes/état : EXO@3

## js/features/quiz.js (26 lignes, 1 Ko) : quiz rapide (QCM de la matière)
  fonctions : quiz(s)@3

## js/features/situations.js (16 lignes, 0 Ko) : mises en situation (réponses libres + mots-clés)
  fonctions : sit(s)@3

## js/features/banks.js (52 lignes, 5 Ko) : banques de questions : niveaux, bilan, raccourcis clavier
  fonctions : bs@3, banks(s)@5, openBank(s,b,l)@10
  constantes/état : CB@4

## js/features/devoirs.js (15 lignes, 1 Ko) : devoirs, notes et moyennes pondérées
  fonctions : dev(s)@3

## js/features/cine.js (38 lignes, 2 Ko) : onglet Ciné-club : séances à voir (CINECLUB), case « vu » sauvegardée dans st.cc
  fonctions : ccDate@4, ccFmt@5, cineToggle(d)@6, ccStyle()@10, cine()@26

## js/features/revision.js (115 lignes, 7 Ko) : répétition espacée (paliers de 1, 3 et 7 jours) et mode « questions ratées »
  fonctions : srHash@7, srKeyB@8, srKeyQ@9, srWhen@10, srRec(key,ok)@13, srMigrate()@23, srItems(s)@34, srIsDue@43, srIsBad@44, srDue@45, rev(s)@49, revStart(s,mode)@70, revShow()@76, revAns(j)@90, revNext()@98, revEnd()@99
  constantes/état : SR_DAYS@5, RV@48
  sections : L12 enregistre une réponse : une erreur programme un retour à J+ | L22 reprise de l’existant : les erreurs déjà enregistrées dans l | L33 toutes les questions d’une matière, sous une forme unique | L47 écran d’accueil de l’onglet | L69 séance

## js/features/zelda.js (36 lignes, 1 Ko) : extras du thème Zelda : Navi, rubis, jingles (à charger après fx.js et avant app.js)
  fonctions : ZL@3, nTarget@24
  constantes/état : _ok@6, _pulse@11, NV@23, prevT@34
  sections : L5 sons : jingle de secret sur bonne réponse, fanfare à la fin  | L10 rubis (vert 1, bleu 5, rouge 20) à chaque bonne réponse | L21 Navi : fée qui suit le curseur avec un peu de retard et de f | L33 « Hey ! Listen ! » quand on bascule sur le thème

## js/features/panther.js (92 lignes, 8 Ko) : extras du thème Panthère Rose : sons jazz, notes, fumée, vocabulaire d’enquête

## js/app.js (67 lignes, 4 Ko) : démarrage : thème, sélecteur de thème, écran d’accueil, premier affichage (toujours chargé en dernier)
  fonctions : curTh@14, setTh@15, pick()@42
  constantes/état : TH@3, TX@5, TS@13
  sections : L4 textes propres à chaque thème : icône du logo, texte de l’éc | L12 aperçu des couleurs de chaque thème dans le sélecteur : fond | L21 style du sélecteur : intégré ici, donc aucune ligne à ajoute | L41 sélecteur : fenêtre centrée, fond flouté ; se ferme avec ✕, 

## État partagé
champs de st : ach, b, bk, cc, g, n, order, rvc, snd, sr, srInit, theme, xp
clés localStorage : btsapp

