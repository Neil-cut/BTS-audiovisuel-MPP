/* js/data/docs.js — documents PDF par matière, affichés dans l'onglet Cours (volet « Documents PDF ») ; les fichiers sont dans le dossier docs/
   DOCS[id de la matière] = [{t titre, d description, f chemin du fichier, p nombre de pages, k taille en Ko}, …]
   Pour ajouter un document : copier le PDF dans docs/ et ajouter une ligne ici (aucune autre modification). */

const DOCS={
 tes:[
  {t:"Composants d’un PC",d:"Rôle de chaque élément d’une configuration (processeur, RAM, disques, cartes) et trajet de l’information, avec l’analogie du bureau.",f:"docs/tes-composants-pc.pdf",p:2,k:216},
  {t:"Informatique et vidéo : débits, connectiques, résolutions",d:"Bit, octet et débit ; débits des connectiques de stockage, d’affichage et de réseau ; résolutions, balayage entrelacé ou progressif et cadence.",f:"docs/tes-informatique-video.pdf",p:2,k:262}
 ],
 phy:[
  {t:"Optique géométrique : cours simplifié et exercices",d:"Lumière, réflexion, réfraction, réflexion totale, lentilles minces : l’essentiel, un exemple résolu et des exercices corrigés pour chaque partie.",f:"docs/phy-optique-cours-simplifie.pdf",p:5,k:62},
  {t:"Optique géométrique : fiche de révision express",d:"Résumé de dernière minute : lois, formules, méthode d’exercice et formulaire final à recopier au brouillon.",f:"docs/phy-optique-fiche-express.pdf",p:3,k:58},
  {t:"Optique : exercices de calcul et objectif à deux lentilles",d:"Cinq exercices avec corrections détaillées. La formule de la vergence de deux lentilles séparées n’est pas dans le cours : à vérifier avec l’enseignant.",f:"docs/phy-optique-exercices-objectif.pdf",p:3,k:50}
 ]
};

/* Tutos vidéo par matière (volet « Tutos vidéo » de l'onglet Cours, docs.js) : liens YouTube, questions à noter, notes personnelles
   VIDEOS[id de la matière] = {v:[{id (unique, lettres et chiffres), t titre, u lien, o objectif, q:[questions à noter], r rappel facultatif}],
                              c:[{t titre, u lien, d description}] (chaînes à suivre)}
   Les coches et les notes sont enregistrées dans st.vd[id] = {c:{numéro de question:true}, n:"notes"} ; st.vd._ = notes générales. */
const VIDEOS={
 mon:{
  v:[
   {id:"premix",t:"Le premix audio en automatique",u:"https://www.youtube.com/watch?v=Umw0JjY-lV4",
    o:"Préparer automatiquement le mixage audio (premix) dans Avid, pour gagner du temps avant le réglage fin.",
    q:["Quelle fonction ou quel réglage Avid lance le premix automatique ?","Sur quelles pistes le premix s’applique-t-il (dialogues, musique, ambiances) ?","Que faut-il vérifier ensuite à la main ?"]},
   {id:"ducking",t:"L’audio ducking",u:"https://www.youtube.com/watch?v=YeqYKLJl4d8&list=PLd7y2MMYdcPlLQCr-WJas-Hii4cYo73JB&index=4",
    o:"Baisser automatiquement le niveau de la musique (ou des ambiances) quand une voix parle, pour garder des dialogues intelligibles.",
    q:["Quelle piste déclenche l’effet (la voix) et quelle piste est baissée (la musique) ?","Quels paramètres règlent la vitesse d’attaque, la vitesse de relâche et le niveau de baisse ?","Quel lien avec la leçon « Rythme et son » du cours de Montage : le son guide l’émotion ?"],
    r:"L’audio ducking s’inscrit dans l’ordre de mixage général : les dialogues d’abord, puis la musique et les ambiances."}
  ],
  c:[
   {t:"Chaîne YouTube : Let’s Edit with Media Composer",u:"https://www.youtube.com/@LetsEditMC_Avid/videos",
    d:"Kevin McAuliffe y explique clairement les fonctions d’Avid (Attic, bins, audio, export). Son accent peut demander un peu d’attention au début, mais ses démonstrations sont efficaces : regarde-le en dessinant les étapes à côté de toi. Conseil : utilise les vidéos par thème en parallèle du cours, plutôt qu’en continu. Cette chaîne s’appelait auparavant « Media Composer 101 »."},
   {t:"Tutoriels officiels d’Avid",u:"https://www.youtube.com/results?search_query=Avid+Media+Composer+tutorial",
    d:"Avid publie aussi ses propres tutoriels sur YouTube. Le nom exact des chaînes officielles est à confirmer sur le site d’Avid avant de les citer ; ce lien lance une recherche pour les retrouver."}
  ]
 }
};
