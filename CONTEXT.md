# CONTEXT : site de révision BTS Audiovisuel (Montage & Post-production)

> À joindre au début d'une conversation avec MAP.md (carte à jour, générée par `python3 tools/mapgen.py`) et uniquement les fichiers concernés par la demande (voir §7).

## 1. Principes
- Site statique : HTML + CSS + JavaScript pur, sans framework, sans module ES, sans serveur (ouverture directe de `index.html`).
- Tout est global : chaque fichier JS déclare des `const`, `let` et `function` partagés par les suivants. L'ordre des balises `<script>` de `index.html` est donc contraignant (voir MAP.md, liste « JS (ordre) »).
- Langue : français. Contenu rédigé en registre soutenu.
- `tools/bundle.py` assemble le tout dans `dist/bts-single.html` (publication uniquement). `dist/` et `bundle.py` ne sont jamais à envoyer ni à modifier.
- `MAP.md` est généré par `tools/mapgen.py` : ne jamais le modifier à la main.

## 2. Arborescence
- `index.html` : ids principaux `intro`, `lvl`, `start`, `logo`, `nav`, `theme`, `main`.
- `css/` (ordre de chargement) : base · layout · components · intro · fx · onepiece · zelda · panther · revision · responsive (toujours en dernier).
- `js/data/` : contenu pédagogique (subjects, quiz_plus, courses, courses_plus, banks, banks_plus, phy_eco, cineclub).
- `js/core/` : state (état + sauvegarde), utils (petites fonctions), fx (sons, fond animé, toasts, confettis, éléments One Piece).
- `js/ui/` : nav (barre latérale, glisser-déposer), home (tableau de bord), subject (page d'une matière).
- `js/features/` : un fichier par onglet (cours, exercices, quiz, situations, banks, devoirs, cine, revision) et les extras de thèmes (zelda, panther).
- `js/app.js` : démarrage (thème, sélecteur de thème, accueil, premier affichage).
- **Piège : deux fichiers portent le nom `banks.js`** : `js/data/banks.js` (données, objet `BANKS`) et `js/features/banks.js` (interface : `banks`, `openBank`, `bs`). Toujours préciser le dossier.

## 3. Contrat entre fichiers (noms à ne pas renommer)
- État : `st` (objet sauvegardé sous la clé localStorage `btsapp`), `save()`, variables de navigation `cur` (matière ou `"home"`) et `sub` (quiz/bk/rev/sit), plus la variable d'onglet `tab` (cours/exo/dev/…) déclarée côté navigation (à vérifier dans le code si besoin : MAP.md ne la liste pas dans `state.js`).
- Champs de `st` : `g` (devoirs), `b` (meilleurs quiz), `n` (notes et réponses libres), `bk` (progression des banques, clé = id banque + n° de niveau), `xp`, `ach` (succès), `snd`, `theme`, `order` (ordre des matières), `sr` (répétition espacée), `srInit`, `rvc`, `cc` (cases « vu » du ciné-club, clé = date de la séance).
- Utilitaires : `$(id)`, `esc()`, `avg(id)`, `fmt()`, `lv()`.
- Données : `S` (matières), `SO()` (matières triées), `COURS`, `LESSONS`, `CHAPTERS`, `BANKS`, `QUIZ`, `CINECLUB`. Aides de saisie : `Qz(q,o,a,e)` (quiz rapide), `Bq(q,o,c,e,section)` (question de banque), `Bk(id,icône,nom,description,niveau1,niveau2)`, `addB(idMatière,banque)`, `les(titre,html)`.
- Effets : `sfx.ok/ko/win/click…`, `tone()`, `noi()`, `toast()`, `fxAch()`, `fxDone()`, `fxPulse()`, `fxWanted()`, `fxEnter()`, `confetti()`, `crack()`, constantes `REDUCE`, `OP()` (thème One Piece), `ZL()` (thème Zelda).
- Révision : `srRec(clé,réussi)` (appelée par quiz.js et banks.js), `srKeyB`, `srKeyQ`, `srDue(s)`.
- Navigation : `go()` redessine la page courante ; chaque onglet expose une fonction (`cours(s)`, `exo(s)`, `dev(s)`, `quiz(s)`, `banks(s)`, `rev(s)`, `sit(s)`, `cine()`) qui remplit `#sb` ou `#sub`. `exoGo(u)` ouvre l'exercice choisi depuis l'accueil de S'entraîner (`EXO`).
- Lecteur de cours plein écran (dans `js/features/cours.js`) : état `RDR` (`ls` chapitres de la matière, `i` chapitre, `p` page, `pg` pages) ; fonctions `rdrOpen(i,k)`, `rdrClose()`, `rdrGo(±1)`, `rdrPage(k)`, `rdrLoad(i,p)`, `rdrShow()`, `rdrPages(html)`, `rdrKey(e)`. Préfixe `rdr` réservé à ce lecteur. `toggleLes()` (passage au quiz) reste dans cours.js.
- Retour depuis le quiz (dans `js/features/cours.js`) : le bouton « Passer au quiz » du lecteur appelle `rdrToQuiz()`, qui mémorise `RDB={s (matière), i (leçon dans la liste ouverte), p (page), n (nb de pages), m, c (vue Chapitres/Leçons et chapitre ouvert, restaurés au retour)}`, ferme le lecteur et appelle `toggleLes()`. `rdrBackSync()` affiche ou retire le bouton flottant `#rdback.rdback` (style dans components.css) selon `cur`, `tab` et la présence du lecteur ; il est rappelé par un `MutationObserver` sur `#main`. `rdrBack()` rouvre le lecteur à la page mémorisée, `rdrBackHide()` abandonne le retour.
- Lecteur : il est ajouté à `document.body` (`#rdr.rdr`), hors de `#sb`, donc il survit à `go()`. Classes : `.rdh` (en-tête), `.rdt` (titre), `.rdn` (n° de page), `.rdb` (zone défilante), `.rdp` (colonne de texte, aussi `.les`), `.rdf` (pied), `.rdv` / `.rdx` (précédent / suivant), `.rdd` (points). Liste des chapitres : `.rdg` (grille) et `.rdc` (carte). Aide-mémoire : `details.memo`.
- Feuille blanche (dans `js/features/cours.js`) : `RDR.mask` ("", "l" ou "r"), `rdrMask(m)` (bascule le côté masqué en conservant le défilement), `rdrMaskUI(b)` (appelée par `rdrShow` : ajoute la barre « 📝 Feuille blanche » et floute la colonne choisie des **tableaux à deux colonnes** de la page), `rdrMaskStyle()` (style injecté, id `rdmks`). Classes : `.rdmk` (barre), `td.mk` (case masquée, `filter:blur`), `td.mk.show` (case révélée au clic). Les tableaux à plus ou moins de deux colonnes ne sont pas concernés ; pour qu'un tableau de leçon serve à la feuille blanche, il doit avoir exactement deux `<td>` par ligne (en-tête en `<th>`).
- Ciné-club (`js/features/cine.js`) : `ccDate`, `ccFmt`, `cineToggle(d)` (coche « vu », sauvegardée dans `st.cc`), `ccStyle()` (style intégré), `cine()` (rendu de l'onglet).

## 4. Formats de données
- Matière : `{id, n, i, c (couleur), quiz:[{q,o:[…],a:indexBonneRéponse,e}], sit:{t,k:[motsClés],m}}`. Les matières `phy` et `eco` sont ajoutées par `S.push` dans phy_eco.js. `quiz_plus.js` (`QUIZ`, 12 questions par matière) remplace `S[i].quiz`.
- `COURS[id]` : `[["Titre",["point 1","point 2"]], …]`.
- `LESSONS[id]` : `["Titre","<html>"]` ou liste de ces paires (plusieurs chapitres). Dans `courses_plus.js`, `les(titre,html)` ajoute à la fin un paragraphe avec le bouton « Passer au quiz » ; le lecteur le retire et le remplace par le sien sur la dernière page.
- Pagination du lecteur : un chapitre est découpé à chaque `<h3>` ; une page de moins de 700 caractères est fusionnée avec la précédente. Tout nouveau chapitre doit donc être structuré en `<h3>` (texte avant le premier `<h3>` = début de la première page). Les tableaux larges se placent dans `<div style="overflow-x:auto">`.
- `CHAPTERS[id]` (déclaré dans `courses_plus.js`) : chapitres du programme, `[{t:"📚 1. Titre",d:"description",l:[indices dans LESSONS[id]]}, …]`. Une leçon ne figurant dans aucun chapitre est rangée automatiquement dans « Autres leçons ». Toutes les matières de `courses_plus.js` (tes, img, ana, mon, adobe, ang, fr) en possèdent désormais, ainsi que phy et eco (section « chapitres » de `phy_eco.js`). Les chapitres de `ana` suivent les rubriques du référentiel « Culture audiovisuelle et artistique » (pas de liste numérotée officielle) ; ceux des autres matières sont des propositions validées par l'utilisateur (ceux d'Image fixe sont à valider).
- Onglet Cours : si la matière a des `CHAPTERS`, deux sous-onglets : « 📚 Chapitres » (cartes de chapitres, puis leurs leçons ; le lecteur ne navigue qu'entre les leçons du chapitre) et « 📖 Leçons » (toutes, en vrac). Sinon, vue « Leçons » seule. État de la vue : `CV={s (matière), m ("chap"|"les"), c (chapitre ouvert ou null)}` ; fonctions `crsList(id,n)`, `crsStyle()`, `crsToggle(id)` dans cours.js. Les `COURS[id]` (fiches courtes) s'affichent dans un bloc repliable « 🧠 Aide-mémoire » ; les `LESSONS` s'ouvrent dans le lecteur.
- `BANKS[id]` : `[{id, i, n, d, levels:[{n, q:[{q,o,c,e,s}]}]}]` ; `c` = index de la bonne réponse ; l'`id` d'une banque est unique et sert à la sauvegarde (ne jamais le renommer sans migrer `st.bk` et `st.sr`). Banques actuelles : info, attic (banks.js) ; tes_cam, tes_sig, img_b, ana_b, mon_gram, mon_flow, adobe_b, ang_b, fr_b (banks_plus.js) ; phy_b, phy_ds1, eco_b (phy_eco.js). `phy_ds1` reprend l'énoncé du DS 1 d'optique en QCM (niveau 1 : exercice 1, niveau 2 : exercice 2) ; chaque question rappelle ses données.
- `CINECLUB` (`js/data/cineclub.js`) : programme 2026-2027, une entrée par séance `{d (date), t (titre), r (réalisateur), x (description sans spoil)}`.
- Tableaux de vocabulaire et de révision : dans une leçon, un tableau `<table>` à deux colonnes (`<th>` + lignes de deux `<td>`) active la feuille blanche (§3). Les leçons d'anglais, de français (figures de style, programme, filmographie), de montage (formats, raccourcis Avid) et de physique (DS 1) en contiennent.
- Organisation des leçons ajoutées en octobre 2026 : `LESSONS.ang` 6 leçons (5 compréhension orale, 6 « Women at work »), 5 chapitres ; `LESSONS.fr` 8 leçons (5 à 8 : analyse littéraire, procédés, figures de style, histoire littéraire), 6 chapitres ; `LESSONS.mon` 12 entrées (indice 0 : Avid Attic ; 1 à 11 numérotées, dont 7 à 11 pour Avid : formats, séquences, audio, raccourcis, export), 6 chapitres ; `LESSONS.phy` 7 leçons (la 7 est le DS 1 corrigé, rangée dans le chapitre 1) ; `LESSONS.img` contient deux leçons « Histoire de l'art : Mémoires » (leçons 6 et 7, chapitre 4).
- Matières actuelles (9) : tes, img, ana, mon, adobe, ang, fr, phy, eco (voir MAP.md pour la liste exacte).

## 5. Thèmes
- Cinq thèmes : `dark`, `light`, `onepiece`, `zelda`, `panther` (attribut `data-theme` sur `<html>`). Liste et textes d'accueil dans `app.js` (`TH`, `TX`, `TS` ; fonctions `curTh`, `setTh`, `pick`) ; bouton de bascule `#theme`, sélecteur en fenêtre centrée.
- Lecteur de cours : la page de lecture `.rdp` n'utilise PAS la classe `.les` (qui porte les parchemins des thèmes) ; son style de base est dans components.css et chaque thème la restyle dans son propre css (bloc « lecteur de cours plein écran » en fin de `onepiece.css` : pont de bois + parchemin ; `zelda.css` : écorce + parchemin taché, couleurs triadiques des `<b>` ; `panther.css` : fond du lecteur `.rdr`). Les thèmes `dark` et `light` utilisent le style de base (feuille `var(--card)`).
- Les couleurs passent par des variables CSS (`--bg --card --tx --mu --bd --ac --ok --ko --pr`), redéfinies dans chaque thème (variables propres : `--cy --leather` pour Zelda, `--em` pour Panthère Rose, `--rdd --rdl` pour les fonds du lecteur sombre et clair). Toute règle propre à un thème est préfixée `[data-theme="x"]` et vit dans `css/<thème>.css`.
- One Piece : `OP()` dans fx.js, vocabulaire pirate (`JM`, `jar()`), navire animé, affiche WANTED, bérrys. Sons synthétisés dans l'objet `OPS` (fx.js), inspirés de l'anime : `gomu`, `logia`, `gura`, `room`, `haki`, `armament`, `slash`, `soru`, `puru`, `gacha`, `creak`, `cannon`, `eyepop`, `ding`, `run`, `wood`, `horn`, `paper`, `fanfare` ; `sfx.*` les expose tous. Branchements : bonne réponse = `ding`, mauvaise = `gura`, clic = `wood`, retour en haut = `gomu`, victoire = `fanfare` (`armament` + `ding`), changement de page = `soru` (`fxEnter`), succès = `armament`, niveau sans faute = `logia`, niveau très raté = `haki`, avis WANTED = `slash` puis `paper`, Pandaman = `eyepop` puis `run`, toasts = `puru`/`gacha`, bouton Démarrer = `cannon` et bascule vers le thème = `horn` puis `creak` (app.js), ouverture du lecteur de cours = `room` (cours.js).
- Zelda (« Forêt Kokiri », Ocarina of Time) : `zelda.js` redéfinit `sfx.ok`, `sfx.win` et `fxPulse`, observe les réponses fausses (classe `.opt.ko`) pour retirer des cœurs, et gère rubis, coffre, Z-targeting, Navi (fée qui suit le curseur), papillon, code Konami, « Hey ! Listen ! » à la bascule de thème. Il se charge après fx.js et avant app.js.
- Panthère Rose (jazz noir 1940 : rouge brique, rose, noir, crème, braise orange) : `panther.js` gère sons jazz, notes de musique, fumée de cigarette, vocabulaire d'enquête ; `panther.css` porte persiennes, grain de pellicule, silhouette de fedora, poursuite en arrière-plan (un voleur avec son sac), bouton de retour en haut en forme de chapeau. Il se charge après zelda.js et avant app.js. (Détail des fonctions : voir le fichier, MAP.md n'en liste aucune.)
- Fond du lecteur plein écran (`.rdr`) : One Piece (carte marine, rose des vents, vagues seigaiha, parchemin texturé) dans `onepiece.css` ; Zelda (motifs géométriques, anneau runique, montagnes brumeuses, lucioles animées sous `prefers-reduced-motion:no-preference`) dans `zelda.css` ; Panthère Rose dans `panther.css` (calques `::before` et `::after`) ; sombre (halos violet et bleu nuit, trame de table de montage, perforations, grain) et clair (repères éditoriaux, formes pastel) dans `base.css`, via les variables `--rdd` et `--rdl`. Les thèmes sombre et clair s'appliquent avec `data-theme` explicite ou, sans attribut, selon `prefers-color-scheme`. L'en-tête et le pied du lecteur sont volontairement fins et transparents (pas de bordures) pour libérer de l'espace de lecture.
- Ajouter un thème : valeur dans `TH`/`TX`/`TS` (app.js), fichier `css/<nom>.css` inséré dans index.html avant revision.css et responsive.css, variables redéfinies sous `:root[data-theme="<nom>"]`, éventuel `js/features/<nom>.js` chargé après fx.js et avant app.js.

## 6. Règles de travail pour Claude
1. Ne modifier que ce qui est demandé ; ne rien réécrire d'autre.
2. Livrer uniquement les fichiers modifiés, complets, prêts à remplacer les originaux. Deux fichiers : envoi séparé ; davantage : un seul zip. Indiquer le chemin exact de chaque fichier (`js/features/banks.js`, et non `banks.js`).
3. Ne pas deviner le contenu d'un fichier non fourni : le demander en citant son chemin, en s'appuyant sur MAP.md.
4. Conserver les noms existants (fonctions, ids HTML, classes CSS, clés de `st`, ids de banques et de matières).
5. Tout ajout visuel respecte les cinq thèmes et le mode `prefers-reduced-motion` (`REDUCE`).
6. Respecter l'ordre de chargement ; tout nouveau fichier reçoit sa balise dans index.html, à la bonne place.
7. Registre soutenu pour tous les textes visibles du site et pour les documents produits.
8. En fin de modification, rappeler de relancer `python3 tools/mapgen.py` pour actualiser MAP.md.

## 7. Quels fichiers joindre selon la demande
| Demande | Fichiers à joindre |
|---|---|
| Ajouter des questions de quiz rapide | `js/data/quiz_plus.js` (ou `subjects.js` pour les 3 questions d'origine) |
| Ajouter une banque ou des questions de banque | `js/data/banks_plus.js` (exemples de format) |
| Ajouter un cours ou un chapitre | `js/data/courses_plus.js` (extrait de la matière suffit) |
| Lecteur de cours plein écran, liste des chapitres, aide-mémoire, bouton de retour depuis le quiz | `js/features/cours.js` + `css/components.css` + `css/responsive.css` (+ le CSS du thème concerné) |
| Fond du lecteur ou des thèmes sombre et clair | `css/base.css` (sombre, clair), `css/onepiece.css`, `css/zelda.css`, `css/panther.css` |
| Nouvelle matière | `js/data/phy_eco.js` (modèle), `subjects.js` seulement si nécessaire |
| Feuille blanche (masquer une colonne de tableau) | `js/features/cours.js` |
| Cours ou exercices de physique, DS d'optique | `js/data/phy_eco.js` |
| Cours d'anglais, de français, de montage, d'image fixe | `js/data/courses_plus.js` |
| Interface d'un quiz ou d'une banque | `js/features/quiz.js` ou `js/features/banks.js` + `css/components.css` |
| Répétition espacée, questions ratées | `js/features/revision.js` + `css/revision.css` |
| Ciné-club (programme ou onglet) | `js/data/cineclub.js` (séances) ou `js/features/cine.js` (interface) |
| Barre latérale, glisser-déposer | `js/ui/nav.js` + `css/layout.css` |
| Tableau de bord, page d'une matière | `js/ui/home.js` ou `js/ui/subject.js` |
| Sons, animations, fond, confettis | `js/core/fx.js` + `css/fx.css` |
| Thème One Piece, Zelda ou Panthère Rose | `css/<thème>.css` (+ `js/features/zelda.js` ou `js/features/panther.js`, `js/core/fx.js`, `js/app.js`) |
| Sélecteur de thème, écran d'accueil | `js/app.js` + `css/intro.css` |
| Adaptation mobile | `css/responsive.css` (+ le CSS du composant concerné) |
| Changement de structure de page | `index.html` |

## 8. Journal des changements récents
(une ligne par évolution : date, fichiers, résumé)
- Répétition espacée (1, 3 et 7 jours) et mode « questions ratées » : `revision.js`, `revision.css`, appels `srRec` dans quiz.js et banks.js.
- Thèmes One Piece et Zelda enrichis (voir fichiers css et zelda.js).
- 2026-10-25 · `js/data/courses_plus.js` : Analyse filmique (`ana`) passe de 6 à 10 chapitres (7 échelle des plans comparée, 8 analyser un film et l'histoire des formes, 9 étude de séquence d'*Alien*, 10 barème de l'épreuve). Les tableaux utilisent des styles intégrés avec les variables de thème. Seule modification d'une ligne existante : virgule finale du chapitre 6.
- 2026-10-25 · `js/features/cours.js`, `css/components.css`, `css/responsive.css` : lecteur de cours plein écran paginé (flèches, boutons, balayage mobile, Échap, points de page, chapitre suivant/précédent, bouton quiz en dernière page) ; chapitres affichés en cartes ; fiches `COURS` regroupées dans un aide-mémoire repliable. Les blocs CSS ajoutés sont en fin de components.css (`.rdg`, `.rdc`, `.memo`, `.rdr…`) et responsive.css (règles ≤ 720 px). Testé sous jsdom (pagination, navigation, fermeture, quiz).
- 2026-10-25 · correction du lecteur après retour visuel : `cours.js` (`.rdp` sans classe `.les`), `components.css` (feuille centrée de 46 em, police fluide 1,1 à 1,4 rem, en-tête et pied plus grands), `responsive.css`, `onepiece.css` et `zelda.css` (blocs « lecteur de cours plein écran » en fin de fichier).
- 2026-10-25 · `js/core/fx.js`, `js/app.js`, `js/features/cours.js` : sons One Piece remplacés par des effets inspirés de l'anime (Fruits du Démon, Haki, ambiance marine, gags) et branchés (voir §5). Seul le thème One Piece est concerné.
- 2026-10-25 · `css/components.css`, `css/responsive.css`, `css/onepiece.css`, `css/zelda.css` : en-tête et pied du lecteur sans bordures ni fond, plus bas, pour gagner de la place de lecture.
- 2026-10-25 · `css/onepiece.css`, `css/zelda.css`, `css/base.css` : fonds décoratifs du lecteur plein écran (voir §5).
- 2026-10-25 · `js/features/cours.js`, `css/components.css` : bouton flottant « Retour au cours » pendant le quiz, qui rouvre le lecteur à la page quittée (voir §3).
- 2026-10-25 · `js/data/courses_plus.js`, `js/features/cours.js` : onglet Cours en deux vues (Chapitres du programme / Leçons en vrac) ; « Chapitre précédent/suivant » du lecteur devient « Leçon précédente/suivante ».
- 2026-10-27 · `CONTEXT.md` resynchronisé avec MAP.md : thème Panthère Rose (`panther.css`, `panther.js`, `st` inchangé), onglet Ciné-club (`cineclub.js`, `cine.js`, `st.cc`), `CHAPTERS` désormais présents pour toutes les matières, noms de fonctions de `cours.js` et `app.js` corrigés, liste des banques et tableau du §7 complétés.

- 2026-10-28 · `js/data/courses_plus.js` : anglais (leçon 5 compréhension orale, leçon 6 « Women at work » avec chapitres 4 et 5), français (leçons 5 à 8, chapitres 5 et 6), montage (leçons 7 à 11 sur Avid, chapitres 4 à 6). Titres de leçon au format « 📖 N. … » pour que `noNum` les nettoie.
- 2026-10-28 · `js/features/cours.js` : mode « feuille blanche » (voir §3), style injecté par le fichier lui-même, aucun CSS ajouté.
- 2026-10-28 · `js/data/phy_eco.js` : leçon 7 « DS 1 corrigé : optique géométrique » (chapitre 1, avec compléments tirés de la documentation DT 14) et banque `phy_ds1` (énoncé et questions du DS).
- 2026-10-28 · `CONTEXT.md` mis à jour avec ces ajouts.

## 9. Problèmes connus / à corriger
- Lecteur de cours : correctifs du 2026-10-25 (texte plus grand, page centrée avec marges, style par thème, fonds décoratifs, bouton de retour depuis le quiz) à valider visuellement par l'utilisateur, notamment sur mobile et dans les thèmes `light` et `dark`. Les rendus ont été testés seulement sur des pages de test. Le fond du thème `panther` est à valider de la même façon.
- Anglais : la fiche 5 (« Le travail des femmes ») et la méthode de compréhension orale sont intégrées ; les autres fiches de vocabulaire restent à fournir.
- Points à vérifier sur les originaux : raccourcis Avid contradictoires entre photos (V/B, Ctrl+8 ou Ctrl+9) ; niveaux en dB et réglages du ducking (chiffres en partie barrés) ; tableau Renaissance à romantisme (photo 9) et numéros entourés du programme de français ; rédaction de la question 1.10 du DS (proposition, à comparer au corrigé officiel).
- Feuille blanche et leçons récentes : rendu à valider visuellement (mobile, thèmes `light` et `panther`).
- Hors périmètre actuel : l'onglet S'entraîner (`exercices.js`) n'a pas été modifié ; le DS est donc proposé en QCM dans la banque `phy_ds1`.
- Chapitres d'Image fixe : proposition à valider (commentaire dans `courses_plus.js`, vers L44).
- Pages très courtes : certains chapitres (fiches d'origine) tiennent sur 1 à 3 pages peu remplies ; la fusion à 700 caractères pourrait être revue.
- Contenu : doublons possibles entre les fiches `COURS` (aide-mémoire) et les chapitres `LESSONS` ; tri de contenu à faire matière par matière avec l'utilisateur.
