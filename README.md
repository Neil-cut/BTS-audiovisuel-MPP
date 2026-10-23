# BTS Audiovisuel – site de révision

Ouvre `index.html` dans un navigateur : aucun serveur nécessaire.

## Organisation
- `css/` : `base` (couleurs, thèmes) · `layout` (structure) · `components` (cartes, boutons, quiz) · `intro` (écran d’accueil) · `revision` (onglet À réviser) · `responsive` (mobile, toujours en dernier).
- `js/data/` : **tout le contenu** (matières, cours, banques de questions). C’est ici que tu travailles le plus. Les fichiers `*_plus.js` ajoutent les chapitres détaillés (`courses_plus.js`), les quiz rapides (`quiz_plus.js`) et des banques de questions (`banks_plus.js`). `phy_eco.js` ajoute les matières Physique-chimie et Droit & économie (matière, fiches, chapitres, quiz, banque, mise en situation).
- `js/core/` : état + sauvegarde, fonctions utilitaires.
- `js/ui/` : barre latérale, tableau de bord, page d’une matière.
- `js/features/` : un fichier par onglet (cours, exercices, quiz, situations, banques, devoirs, révision).
- `js/app.js` : démarrage.
- `tools/bundle.py` : regroupe tout en un seul fichier `dist/bts-single.html` (utile pour republier sur Claude).

## Répétition espacée et questions ratées
`js/features/revision.js` ajoute, dans Exercices, l’onglet **🔁 À réviser**. Une question ratée (quiz rapide ou banque) revient 1 jour plus tard ; réussie, elle revient 3 jours plus tard, à nouveau 7 jours plus tard, avant d’être considérée comme maîtrisée. Le mode « questions ratées » regroupe les erreurs en attente et les questions marquées ⭐. Les fonctions `srRec` (appelée par `banks.js` et `quiz.js`) et `srDue` (compteur de l’onglet) sont définies dans ce fichier.

## Ordre de chargement
L’ordre des balises dans `index.html` compte (données → état → utilitaires → interface → fonctionnalités → `app.js`). Quand tu ajoutes un fichier, ajoute sa balise au bon endroit.

## Recettes
- **Ajouter une matière** : un objet dans `js/data/subjects.js`, une entrée du même `id` dans `COURS` (`courses.js`).
- **Ajouter un cours** : ajouter `["Titre",["point 1","point 2"]]` dans `COURS[id]`.
- **Ajouter une banque de questions** : `BANKS[id].push({id:"unique",i:"🎞️",n:"Nom",d:"Description",levels:[{n:"Niveau 1",q:[{q:"…",o:["A","B","C"],c:0,e:"explication"}]}]})`. `c` = index de la bonne réponse. `id` doit être unique (sert à la sauvegarde).
- **Ajouter une leçon longue** : `LESSONS[id]=["Titre","<h3>…</h3><p>…</p>"]`.
- **Changer les couleurs** : variables en haut de `css/base.css`.

## Données sauvegardées
Tout est dans `localStorage` sous la clé `btsapp` (notes, scores, XP, progression des banques, planning de révision `sr`). Ne renomme pas les `id` de banques ou de matières sans migrer ces données.

## Pistes pour la suite
Passer en modules ES (`import/export`) une fois le site hébergé, séparer les contenus en fichiers JSON, ajouter une sauvegarde/export des notes.
