# CONTEXT : site de révision BTS Audiovisuel (Montage & Post-production)

> À joindre au début d'une conversation avec MAP.md (carte à jour, générée par `python3 tools/mapgen.py`) et uniquement les fichiers concernés par la demande (voir §7).

## 1. Principes
- Site statique : HTML + CSS + JavaScript pur, sans framework, sans module ES, sans serveur (ouverture directe de `index.html`).
- Tout est global : chaque fichier JS déclare des `const`, `let` et `function` partagés par les suivants. L'ordre des balises `<script>` de `index.html` est donc contraignant (voir MAP.md, liste « JS (ordre) »).
- Langue : français. Contenu rédigé en registre soutenu.
- `tools/bundle.py` assemble le tout dans `dist/bts-single.html` (publication uniquement). `dist/` et `bundle.py` ne sont jamais à envoyer ni à modifier.

## 2. Arborescence
- `css/` : base (variables, thèmes clair/sombre) · layout · components · intro · fx · onepiece · zelda · revision · responsive (toujours en dernier).
- `js/data/` : contenu pédagogique (subjects, quiz_plus, courses, courses_plus, banks, banks_plus, phy_eco).
- `js/core/` : state (état + sauvegarde), utils (petites fonctions), fx (sons, fond animé, toasts, confettis, éléments One Piece).
- `js/ui/` : nav (barre latérale, glisser-déposer), home (tableau de bord), subject (page d'une matière).
- `js/features/` : un fichier par onglet (cours, exercices, quiz, situations, banks, devoirs, revision) et zelda (extras du thème Zelda).
- `js/app.js` : démarrage (thème, accueil, premier affichage).
- **Piège : deux fichiers portent le nom `banks.js`** : `js/data/banks.js` (données, objet `BANKS`) et `js/features/banks.js` (interface : `banks`, `openBank`, `bs`). Toujours préciser le dossier.

## 3. Contrat entre fichiers (noms à ne pas renommer)
- État : `st` (objet sauvegardé sous la clé localStorage `btsapp`), `save()`, variables de navigation `cur` (matière ou `"home"`), `tab` (cours/exo/dev), `sub` (quiz/bk/rev/sit).
- Champs de `st` : `g` (devoirs), `b` (meilleurs quiz), `n` (notes et réponses libres), `bk` (progression des banques, clé = id banque + n° de niveau), `xp`, `ach` (succès), `snd`, `theme`, `order` (ordre des matières), `sr` (répétition espacée), `srInit`, `rvc`.
- Utilitaires : `$(id)`, `esc()`, `avg(id)`, `fmt()`, `lv()`.
- Données : `S` (matières), `SO()` (matières triées), `COURS`, `LESSONS`, `BANKS`. Aides de saisie : `Qz(q,o,a,e)` (quiz rapide), `Bq(q,o,c,e,section)` (question de banque), `Bk(id,icône,nom,description,niveau1,niveau2)`, `addB(idMatière,banque)`, `les(titre,html)`.
- Effets : `sfx.ok/ko/win/click…`, `tone()`, `toast()`, `fxAch()`, `fxDone()`, `fxPulse()`, `fxWanted()`, `fxEnter()`, `confetti()`, `crack()`, constantes `REDUCE`, `OP()` (thème One Piece), `ZL()` (thème Zelda).
- Révision : `srRec(clé,réussi)` (appelée par quiz.js et banks.js), `srKeyB`, `srKeyQ`, `srDue(s)`.
- Navigation : `go()` redessine la page courante ; chaque onglet expose une fonction (`cours(s)`, `exo(s)`, `dev(s)`, `quiz(s)`, `banks(s)`, `rev(s)`, `sit(s)`) qui remplit `#sb` ou `#sub`.
- Lecteur de cours plein écran (dans `js/features/cours.js`) : état `RDR` (`ls` chapitres de la matière, `i` chapitre, `p` page, `pg` pages) ; fonctions `rdrOpen(i)`, `rdrClose()`, `rdrGo(±1)`, `rdrPage(k)`, `rdrLoad(i,p)`, `rdrShow()`, `rdrPages(html)`, `rdrKey(e)`. Préfixe `rdr` réservé à ce lecteur. `toggleLes()` (passage au quiz) reste dans cours.js.
- Lecteur : il est ajouté à `document.body` (`#rdr.rdr`), hors de `#sb`, donc il survit à `go()`. Classes : `.rdh` (en-tête), `.rdt` (titre), `.rdn` (n° de page), `.rdb` (zone défilante), `.rdp` (colonne de texte, aussi `.les`), `.rdf` (pied), `.rdv` / `.rdx` (précédent / suivant), `.rdd` (points). Liste des chapitres : `.rdg` (grille) et `.rdc` (carte). Aide-mémoire : `details.memo`.

## 4. Formats de données
- Matière : `{id, n, i, c (couleur), quiz:[{q,o:[…],a:indexBonneRéponse,e}], sit:{t,k:[motsClés],m}}`. Les matières `phy` et `eco` sont ajoutées par `S.push` dans phy_eco.js.
- `COURS[id]` : `[["Titre",["point 1","point 2"]], …]`.
- `LESSONS[id]` : `["Titre","<html>"]` ou liste de ces paires (plusieurs chapitres). Dans `courses_plus.js`, `les(titre,html)` ajoute à la fin un paragraphe avec le bouton « Passer au quiz » ; le lecteur le retire et le remplace par le sien sur la dernière page.
- Pagination du lecteur : un chapitre est découpé à chaque `<h3>` ; une page de moins de 700 caractères est fusionnée avec la précédente. Tout nouveau chapitre doit donc être structuré en `<h3>` (texte avant le premier `<h3>` = début de la première page). Les tableaux larges se placent dans `<div style="overflow-x:auto">`.
- Onglet Cours : les `COURS[id]` (fiches courtes) s'affichent dans un bloc repliable « 🧠 Aide-mémoire » (ouvert d'office si la matière n'a aucun chapitre) ; les `LESSONS` s'ouvrent dans le lecteur.
- `BANKS[id]` : `[{id, i, n, d, levels:[{n, q:[{q,o,c,e,s}]}]}]` ; `c` = index de la bonne réponse ; l'`id` d'une banque est unique et sert à la sauvegarde (ne jamais le renommer sans migrer `st.bk` et `st.sr`).
- Matières actuelles (9) : tes, img, ana, mon, adobe, ang, fr, phy, eco (voir MAP.md pour la liste exacte).

## 5. Thèmes
- Quatre thèmes : `dark`, `light`, `onepiece`, `zelda` (attribut `data-theme` sur `<html>`). Liste et textes d'accueil dans `app.js` (`TH`, `TL`, `TX`) ; bouton de bascule `#theme`.
- Lecteur de cours : la page de lecture `.rdp` n'utilise PAS la classe `.les` (qui porte les parchemins des thèmes) ; son style de base est dans components.css et chaque thème la restyle dans son propre css (bloc « lecteur de cours plein écran » en fin de `onepiece.css` : pont de bois + parchemin ; `zelda.css` : écorce + parchemin taché, couleurs triadiques des `<b>`). Les thèmes `dark` et `light` utilisent le style de base (feuille `var(--card)`).
- Les couleurs passent par des variables CSS (`--bg --card --tx --mu --bd --ac --ok --ko --pr`), redéfinies dans chaque thème. Toute règle propre à un thème est préfixée `[data-theme="x"]` et vit dans `css/<thème>.css`.
- One Piece : `OP()` dans fx.js, vocabulaire pirate (`JM`, `jar()`), navire animé, affiche WANTED, bérrys.
- Zelda : `zelda.js` redéfinit `sfx.ok`, `sfx.win` et `fxPulse`, observe les réponses fausses (classe `.opt.ko`) pour retirer des cœurs, et gère rubis, coffre, Z-targeting, Navi, papillon, code Konami. Il se charge après fx.js et avant app.js.
- Ajouter un thème : valeur dans `TH`/`TL`/`TX` (app.js), fichier `css/<nom>.css` inséré dans index.html avant revision.css et responsive.css, variables redéfinies sous `:root[data-theme="<nom>"]`.

## 6. Règles de travail pour Claude
1. Ne modifier que ce qui est demandé ; ne rien réécrire d'autre.
2. Livrer uniquement les fichiers modifiés, complets, prêts à remplacer les originaux. Deux fichiers : envoi séparé ; davantage : un seul zip. Indiquer le chemin exact de chaque fichier (`js/features/banks.js`, et non `banks.js`).
3. Ne pas deviner le contenu d'un fichier non fourni : le demander en citant son chemin, en s'appuyant sur MAP.md.
4. Conserver les noms existants (fonctions, ids HTML, classes CSS, clés de `st`, ids de banques et de matières).
5. Tout ajout visuel respecte les quatre thèmes et le mode `prefers-reduced-motion` (`REDUCE`).
6. Respecter l'ordre de chargement ; tout nouveau fichier reçoit sa balise dans index.html, à la bonne place.
7. Registre soutenu pour tous les textes visibles du site et pour les documents produits.
8. En fin de modification, rappeler de relancer `python3 tools/mapgen.py` pour actualiser MAP.md.

## 7. Quels fichiers joindre selon la demande
| Demande | Fichiers à joindre |
|---|---|
| Ajouter des questions de quiz rapide | `js/data/quiz_plus.js` (ou `subjects.js` pour les 3 questions d'origine) |
| Ajouter une banque ou des questions de banque | `js/data/banks_plus.js` (exemples de format) |
| Ajouter un cours ou un chapitre | `js/data/courses_plus.js` (extrait de la matière suffit) |
| Lecteur de cours plein écran, liste des chapitres, aide-mémoire | `js/features/cours.js` + `css/components.css` + `css/responsive.css` (+ le CSS du thème concerné) |
| Nouvelle matière | `js/data/phy_eco.js` (modèle), `subjects.js` seulement si nécessaire |
| Interface d'un quiz ou d'une banque | `js/features/quiz.js` ou `js/features/banks.js` + `css/components.css` |
| Répétition espacée, questions ratées | `js/features/revision.js` + `css/revision.css` |
| Barre latérale, glisser-déposer | `js/ui/nav.js` + `css/layout.css` |
| Tableau de bord, page d'une matière | `js/ui/home.js` ou `js/ui/subject.js` |
| Sons, animations, fond, confettis | `js/core/fx.js` + `css/fx.css` |
| Thème One Piece ou Zelda | `css/onepiece.css` ou `css/zelda.css` (+ `js/features/zelda.js`, `js/core/fx.js`, `js/app.js`) |
| Adaptation mobile | `css/responsive.css` (+ le CSS du composant concerné) |
| Changement de structure de page | `index.html` |

## 8. Journal des changements récents
(une ligne par évolution : date, fichiers, résumé)
- Répétition espacée (1, 3 et 7 jours) et mode « questions ratées » : `revision.js`, `revision.css`, appels `srRec` dans quiz.js et banks.js.
- Thèmes One Piece et Zelda enrichis (voir fichiers css et zelda.js).
- 2026-10-25 · `js/data/courses_plus.js` : Analyse filmique (`ana`) passe de 6 à 10 chapitres (7 échelle des plans comparée, 8 analyser un film et l'histoire des formes, 9 étude de séquence d'*Alien*, 10 barème de l'épreuve). Les tableaux utilisent des styles intégrés avec les variables de thème. Seule modification d'une ligne existante : virgule finale du chapitre 6.
- 2026-10-25 · `js/features/cours.js`, `css/components.css`, `css/responsive.css` : lecteur de cours plein écran paginé (flèches, boutons, balayage mobile, Échap, points de page, chapitre suivant/précédent, bouton quiz en dernière page) ; chapitres affichés en cartes ; fiches `COURS` regroupées dans un aide-mémoire repliable. Les blocs CSS ajoutés sont en fin de components.css (`.rdg`, `.rdc`, `.memo`, `.rdr…`) et responsive.css (règles ≤ 720 px). Testé sous jsdom (pagination, navigation, fermeture, quiz).
- 2026-10-25 · correction du lecteur après retour visuel : `cours.js` (`.rdp` sans classe `.les`), `components.css` (feuille centrée de 46 em, police fluide 1,1 à 1,4 rem, en-tête et pied plus grands), `responsive.css`, `onepiece.css` et `zelda.css` (blocs « lecteur de cours plein écran » en fin de fichier).

## 9. Problèmes connus / à corriger
- Lecteur de cours : correctifs du 2026-10-25 (texte plus grand, page centrée avec marges, style par thème) à valider visuellement par l'utilisateur, notamment sur mobile et dans le thème `light`.
- Pages très courtes : certains chapitres (fiches d'origine) tiennent sur 1 à 3 pages peu remplies ; la fusion à 700 caractères pourrait être revue.
- Contenu : doublons possibles entre les fiches `COURS` (aide-mémoire) et les chapitres `LESSONS` ; tri de contenu à faire matière par matière avec l'utilisateur.
