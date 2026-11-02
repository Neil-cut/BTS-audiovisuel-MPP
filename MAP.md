# MAP (généré par tools/mapgen.py : ne pas modifier à la main)

## index.html (59 lignes)
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
  9. js/data/docs.js
  10. js/core/state.js
  11. js/core/utils.js
  12. js/core/fx.js
  13. js/ui/nav.js
  14. js/ui/home.js
  15. js/ui/subject.js
  16. js/features/cours.js
  17. js/features/docs.js
  18. js/features/exercices.js
  19. js/features/quiz.js
  20. js/features/situations.js
  21. js/features/banks.js
  22. js/features/devoirs.js
  23. js/features/cine.js
  24. js/features/revision.js
  25. js/features/zelda.js
  26. js/features/panther.js
  27. js/features/sons.js
  28. js/features/confort.js
  29. js/app.js
ATTENTION : même nom dans des dossiers différents : banks.js, docs.js

## css/base.css (21 lignes, 6 Ko) : variables de couleurs, thèmes clair/sombre, reset
  thèmes : dark, light
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr --rdd --rdl
  sections : L10 fond du lecteur de cours, thème sombre : halos violet et ble | L16 fond du lecteur de cours, thème clair : repères de mise en p

## css/layout.css (17 lignes, 1 Ko) : structure générale : grille, barre latérale, zone principale
  sections : L10 réorganisation des matières par glisser-déposer

## css/components.css (131 lignes, 12 Ko) : composants réutilisables : cartes, onglets, boutons, quiz, tableaux, leçons
  sections : L21 liste des chapitres, aide-mémoire et lecteur de cours plein  | L34 taille du texte (A− A A+) : le facteur --rdz est posé sur #r | L37 la « page » : feuille centrée, texte grand, marges intérieur | L43 mots clés et notes « À retenir » plus lisibles dans le lecte | L53 barre de progression de lecture (cours.js) : fine, sous l'en | L62 sommaire latéral du lecteur (cours.js) : colonne à gauche su | L75 quiz : question plus grande, réponses sur deux colonnes quan | L80 banques (banks.js) : question et réponses à gauche, correcti | L89 pastilles de progression : groupées par 10, plus grandes, av | L95 réponses : icône ✓ / ✗ à droite, lisible sans la couleur ; . | L107 panneau « Confort » (confort.js) | L117 fond calme global (classe « still » sur <html>, posée par co | L121 bouton « Retour au cours » (cours.js), affiché pendant le qu | L128 mode lecture calme (cours.js) : fond uni, plus de décors du 

## css/intro.css (8 lignes, 0 Ko) : écran d’accueil (spawn)

## css/fx.css (28 lignes, 2 Ko) : animations, fissures, toasts, fond animé, confettis

## css/onepiece.css (84 lignes, 36 Ko) : thème One Piece : mer profonde, or des trésors, affiches de prime
  thèmes : onepiece
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr
  sections : L15 version enrichie : navire en bois, affiches WANTED, parchemi | L35 détails cachés et clins d'œil | L56 navire pirate | L57 le bateau est dans la couche du fond : entre la vague arrièr | L64 lecteur de cours plein écran (cours.js) : pont de bois, page | L74 fond du lecteur de cours : carte marine, rose des vents, vag | L79 quiz : encart de correction (.qzr) en bulle de parchemin, co

## css/zelda.css (69 lignes, 5 Ko) : thème Zelda « Forêt Kokiri » (Ocarina of Time) : vert mousse, écorce, or vieilli, lueur de fée cyan
  thèmes : zelda
  variables : --bg --card --tx --mu --bd --ac --ok --ko --pr --cy --leather
  sections : L7 fond : veines de bois très discrètes (au-dessus du canvas, s | L10 barre latérale : écorce sombre, filet or vieilli | L16 boutons : cuir (secondaire) et vert tunique (action principa | L20 effet magique : lueur de fée cyan au survol | L24 cartes : olive, cadre à double filet doré | L29 titres : séparateur pointillé doré (lucioles) + Triforce | L32 barres de progression : vert et cyan, avec Navi au bout | L37 leçons : parchemin | L43 écran d'accueil : sous-bois et rayons de lumière | L48 bouton retour en haut : Triforce | L52 contraste : dans le lecteur, titres, puces et mots d'appel d | L57 Navi : fée lumineuse qui suit le curseur (créée par zelda.js | L66 rubis qui s'envolent à chaque bonne réponse

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

## js/data/courses_plus.js (478 lignes, 131 Ko) : chapitres supplémentaires (COURS) et leçons détaillées (LESSONS, plusieurs par matière)
  fonctions : les@3
  constantes/état : CHAPTERS@7
  sections : L6 CHAPTERS[id] : chapitres du programme ; chaque chapitre regr | L9 TES – Équipements vidéo | L32 Image fixe | L49 chapitres Image fixe : proposition à valider (le référentiel | L57 chapitres des autres matières : proposition validée par l'ut | L96 Analyse filmique | L116 chapitres du programme (référentiel « Culture audiovisuelle  | L124 Montage | L223 Photoshop & After Effects | L237 Anglais | L360 Français
  COURS enrichis : adobe, ana, ang, fr, img, mon, tes
  LESSONS : adobe, ana, ang, fr, img, mon, tes

## js/data/banks.js (4 lignes, 57 Ko) : banques de questions (BANKS) : informatique (TES) et Avid Attic (Montage)
  constantes/état : BANKS@3
  banques (id) : info, attic

## js/data/banks_plus.js (300 lignes, 51 Ko) : banques de questions supplémentaires (ajoutées à BANKS)
  fonctions : Bq@3, Bk@4, addB@5
  sections : L7 TES : caméra et optique | L31 TES : signal, codecs, stockage, audio | L55 Image fixe | L79 Analyse filmique | L103 Montage : grammaire | L127 Montage : workflow, outils, finitions | L151 Photoshop & After Effects | L175 Anglais | L199 Français | L223 Français : banque spécialisée en figures de style | L267 Français : banque spécialisée en humanisme et courtoisie lit
  banques (id) : tes_cam, tes_sig, img_b, ana_b, mon_gram, mon_flow, adobe_b, ang_b, fr_b, fr_figures, fr_humcour

## js/data/phy_eco.js (214 lignes, 58 Ko) : deux matières supplémentaires : Physique-chimie (phy) et Droit & économie (eco)
  sections : L37 COURS (fiches) | L55 CHAPITRES DÉTAILLÉS | L132 BANQUES DE QUESTIONS | L202 chapitres (proposition validée par l'utilisateur ; indices à
  matières : phy (Physique-chimie), eco (Droit & économie)
  banques (id) : phy_b, phy_ds1, eco_b
  LESSONS : eco, phy

## js/data/cineclub.js (17 lignes, 2 Ko) : programme du ciné-club 2026-2027 (d = date, t = titre, r = réalisateur, x = description sans spoil)
  constantes/état : CINECLUB@3

## js/data/docs.js (40 lignes, 3 Ko) : documents PDF par matière, affichés dans l'onglet Cours (volet « Documents PDF ») ; les fichiers sont dans le dossier docs/
  constantes/état : DOCS@5, VIDEOS@21

## js/core/state.js (13 lignes, 0 Ko) : état de l’application et sauvegarde (localStorage)
  fonctions : save@5, cfSave@10
  constantes/état : st@3, CF@9, cur@11, sub@12

## js/core/utils.js (8 lignes, 0 Ko) : petites fonctions partagées : esc, $, moyenne, formats, niveau XP
  fonctions : esc@3, avg@5, fmt@6, lv@7

## js/core/fx.js (197 lignes, 15 Ko) : effets : sons synthétisés, fissures, toasts, succès, confettis, fond animé
  fonctions : OP@5, STILL@7, actx@9, tone(f1,f2,d,type,v,delay)@10, noi(d,v,fc,delay,q,type)@18, crack()@82, toast(m)@96, fxAch(k,label)@100, fxDone(good,total)@101, fxEnter()@105, confetti()@106, sndLabel@121, berry()@128, fxPulse()@133, jar()@161, fxWanted(t,n)@168
  constantes/état : REDUCE@4, AC@8, rnd@28, OPS@29, sfx@66, pulse@126, PX@127, JM@159, JR@160
  sections : L6 fond calme (panneau Confort) : classe « still » sur <html> ; | L17 bruit filtré (coups, froissement, craquement) : d = durée, v | L27 sons du thème One Piece (appelés par sfx seulement quand OP( | L81 fissure SVG aléatoire (réponse fausse) | L95 notifications, succès, fin de niveau | L119 bouton son + clic sonore global | L125 fond animé : vagues + points, pulsation à chaque bonne répon | L158 One Piece : jargon pirate, Pandaman caché, chapeau de retour | L175 One Piece : navire pirate qui navigue en bas de l'écran (rem

## js/ui/nav.js (75 lignes, 4 Ko) : barre latérale, navigation et ordre des matières (glisser-déposer, sauvegardé dans st.order)
  fonctions : SO@5, setOrder(ids,focus)@6, nav()@10, dragNav()@21, go()@74
  constantes/état : LASTDRAG@3
  sections : L4 matières triées selon l’ordre choisi ; les nouvelles matière | L20 glisser-déposer au pointeur : souris (dès 5 px de déplacemen

## js/ui/home.js (11 lignes, 0 Ko) : tableau de bord
  fonctions : home()@3

## js/ui/subject.js (10 lignes, 0 Ko) : page d’une matière et ses onglets
  fonctions : subj()@3

## js/features/cours.js (344 lignes, 19 Ko) : onglet Cours : chapitres détaillés (LESSONS) lus en plein écran, paginés, + aide-mémoire repliable (COURS)
  fonctions : toggleLes()@3, noNum@6, rdrZoomApply()@12, rdrCalmApply()@22, rdrCalm()@28, rdrWide@32, rdrTitles(pg)@33, rdrTocApply()@36, rdrToc()@43, rdrTocGo(j,k)@56, rdrTocToggle()@60, rdrCounts()@66, rdrProgress()@67, rdrProgressGo(e)@85, rdrLT@96, rdrResumeAll()@97, rdrSave()@98, rdrResumeFind(sid)@105, rdrAgo(t)@118, rdrResume()@123, rdrResumeForget()@128, rdrZoom(d)@134, rdrPages(h)@141, rdrLoad(i,p)@158, rdrShow()@164, rdrPage(k)@183, rdrMaskStyle()@186, rdrMask(m)@195, rdrMaskUI(b)@201, rdrGo(d)@213, rdrKey(e)@221, rdrOpen(i,k)@228, rdrClose()@250, rdrToQuiz()@259, rdrBackSync()@264, rdrBackHide()@273, rdrBack()@274, crsList(id,n)@284, crsStyle()@293, crsToggle(id)@319, cours(s)@320
  constantes/état : RDR@7, RZ@10, RZL@11, RCM@21, RSW@30, RSN@31, RDB@258, CV@283
  sections : L5 Lecteur plein écran | L9 Taille du texte du lecteur : paliers de 10 %, mémorisée (clé | L20 Mode lecture calme : masque les décors du thème (navire, fum | L29 Sommaire latéral : leçons de la liste ouverte, pages de la l | L65 Barre de progression de lecture : avancement dans toute la l | L95 Reprise de lecture : dernière page lue par matière (clé loca | L140 Découpe un chapitre en pages : une page par titre <h3>, les  | L185 Feuille blanche : masque la colonne gauche ou droite des tab | L257 Retour au cours depuis le quiz : mémorise chapitre et page,  | L282 Onglet Cours : une seule page, chapitres du programme avec l

## js/features/docs.js (78 lignes, 6 Ko) : documents PDF des matières : liste (volet « Documents PDF » de l'onglet Cours, appelée par cours.js) et visionneuse plein écran
  fonctions : docsStyle()@5, docsRows(id)@29, pdfOpen(id,i)@34, pdfClose(quiet)@46, vdGet(id)@56, vdFx(on)@57, vdCk(id,i,on,tot)@58, vdNote(id,v)@63, vdRows(id)@64
  constantes/état : PDFV@4, VDT@62
  sections : L28 lignes de la liste d'une matière (corps du volet de l'onglet | L55 tutos vidéo : liste, questions à noter (cases) et notes pers

## js/features/exercices.js (15 lignes, 1 Ko) : onglet S’entraîner : accueil (révision + cartes) puis l’exercice choisi, avec bouton de retour
  fonctions : exoGo(u)@4, exo(s)@5
  constantes/état : EXO@3

## js/features/quiz.js (35 lignes, 2 Ko) : quiz rapide (QCM de la matière) : même présentation que les banques (colonnes, barre fixe, pastilles, ✓ / ✗) ; les fonctions qz* viennent de banks.js
  fonctions : quiz(s)@3

## js/features/situations.js (16 lignes, 0 Ko) : mises en situation (réponses libres + mots-clés)
  fonctions : sit(s)@3

## js/features/banks.js (75 lignes, 7 Ko) : banques de questions : niveaux, bilan, raccourcis clavier
  fonctions : bs@3, qzBarOff()@6, qzBarSet(n,tot,pvOff,nxOff,nxTxt)@9, qzDots(tot,f,cur,num)@15, qzIcon@24, banks(s)@25, openBank(s,b,l)@30
  constantes/état : CB@4
  sections : L5 barre Précédent / Suivant fixe (ajoutée à <body>, retirée dè | L8 éléments partagés avec quiz.js : barre Précédent / Suivant,  | L14 f(n) renvoie "g" (réussie), "r" (ratée) ou "" ; num(n) donne

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

## js/features/sons.js (151 lignes, 14 Ko) : effets sonores de l'interface (lecteur, quiz, panneau Confort), avec une version par thème

## js/features/confort.js (99 lignes, 4 Ko) : panneau « Confort » : taille du texte, largeur, interligne, mode calme, fond animé, sons, chronomètre et délai du quiz

## js/app.js (67 lignes, 4 Ko) : démarrage : thème, sélecteur de thème, écran d’accueil, premier affichage (toujours chargé en dernier)
  fonctions : curTh@14, setTh@15, pick()@42
  constantes/état : TH@3, TX@5, TS@13
  sections : L4 textes propres à chaque thème : icône du logo, texte de l’éc | L12 aperçu des couleurs de chaque thème dans le sélecteur : fond | L21 style du sélecteur : intégré ici, donc aucune ligne à ajoute | L41 sélecteur : fenêtre centrée, fond flouté ; se ferme avec ✕, 

## État partagé
champs de st : ach, b, bk, cc, g, n, order, rvc, snd, sr, srInit, theme, vd, xp
clés localStorage : btsapp, btscf, btsrdc, btsrdp, btsrds, btsrdz

## Autres ressources
- docs/ : 5 fichier(s)
