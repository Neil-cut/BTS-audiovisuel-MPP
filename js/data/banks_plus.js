/* js/data/banks_plus.js — banques de questions supplémentaires (ajoutées à BANKS) */

const Bq=(q,o,c,e,s)=>({q,o,c,e,s});
const Bk=(id,i,n,d,l1,l2)=>({id,i,n,d,levels:[{n:"Niveau 1",q:l1},{n:"Niveau 2",q:l2}]});
const addB=(sid,b)=>{(BANKS[sid]=BANKS[sid]||[]).push(b)};

/* ---------- TES : caméra et optique ---------- */
addB("tes",Bk("tes_cam","🎥","Caméra, optique et image","Capteur, objectifs, exposition vidéo",[
Bq("À cadrage et ouverture identiques, un capteur plus grand donne :",["Plus de profondeur de champ","Moins de profondeur de champ","Moins de lumière","Un débit plus faible"],1,"Un grand capteur nécessite une focale plus longue pour le même cadrage : la profondeur de champ diminue.","Capteur"),
Bq("L’ISO natif d’une caméra est :",["Le plus bas ISO disponible","La sensibilité où le bruit est le plus faible","Toujours 100","Toujours 800"],1,"C’est la sensibilité de base du capteur, sans amplification excessive.","Capteur"),
Bq("Quel diaphragme laisse passer le plus de lumière ?",["f/16","f/8","f/4","f/1,8"],3,"Plus le nombre f/ est petit, plus l’ouverture est grande.","Optique"),
Bq("Le T-stop mesure :",["La taille du capteur","La vitesse d’obturation","La transmission réelle de lumière de l’objectif","La focale"],2,"Il tient compte des pertes dans les lentilles, d’où son usage sur les objectifs cinéma.","Optique"),
Bq("Un filtre ND sert à :",["Changer la balance des blancs","Réduire la lumière sans changer l’ouverture ni la vitesse","Augmenter la netteté","Ajouter un effet de flou"],1,"Il permet de garder une grande ouverture en plein jour.","Optique"),
Bq("Un profil Log sert à :",["Réduire le fichier","Conserver un maximum de dynamique avec une courbe aplatie","Ajouter du contraste à l’image","Supprimer le bruit"],1,"L’image paraît terne et nécessite un étalonnage ou une LUT.","Capteur"),
Bq("Le flou de bougé en vidéo dépend surtout :",["De l’ISO","De la vitesse d’obturation (angle)","Du codec","Du débit audio"],1,"Plus l’obturateur est lent, plus le flou est important.","Exposition"),
Bq("La balance des blancs sert à :",["Régler la sensibilité","Rendre le blanc neutre selon la température de couleur de la lumière","Régler la netteté","Régler le volume"],1,"Elle compense la dominante chaude ou froide de la source.","Couleur"),
Bq("La monture d’un objectif détermine :",["La compatibilité mécanique avec la caméra","La résolution","Le débit","Le codec"],0,"PL, EF, E, MFT… Des bagues adaptatrices permettent certains montages.","Optique"),
Bq("Un zoom numérique :",["Améliore la netteté","Agrandit l’image en interpolant, avec perte de qualité","Utilise une focale plus longue","Réduit le bruit"],1,"Contrairement au zoom optique, il recadre et interpole l’image.","Optique")],
[
Bq("Une dynamique de 14 stops correspond à un rapport de luminosité de :",["14:1","196:1","≈ 16 000:1 (2¹⁴)","14 000:1 exactement"],2,"Chaque stop double la luminosité : 2¹⁴ = 16 384.","Capteur"),
Bq("Le rolling shutter provoque :",["Du bruit","Des déformations sur les mouvements rapides (effet gélatine)","Une perte de couleur","Un écho sonore"],1,"Les lignes du capteur sont lues successivement, pas simultanément.","Capteur"),
Bq("Le facteur de recadrage Super 35 vs plein format est d’environ :",["0,5","1,4 à 1,5","3","1 exactement"],1,"Un Super 35 a un champ plus étroit qu’un plein format à focale égale.","Capteur"),
Bq("Pour réduire le bruit sans changer l’exposition, on peut :",["Augmenter l’ISO","Ajouter de la lumière et baisser l’ISO","Fermer le diaphragme et monter l’ISO","Raccourcir la vitesse"],1,"Plus de lumière permet d’utiliser un ISO plus bas.","Exposition"),
Bq("Un objectif anamorphique :",["Agrandit l’image verticalement","Comprime l’image horizontalement (à désétirer) et donne des flares horizontaux","N’existe qu’en macro","N’a pas de diaphragme"],1,"On obtient un format large et un bokeh ovale caractéristique.","Optique"),
Bq("L’hyperfocale permet :",["De lire le timecode","D’avoir net de la moitié de la distance de mise au point jusqu’à l’infini","De supprimer le bruit","De réduire le débit"],1,"Réglage classique en paysage.","Optique"),
Bq("Les zébras sur une caméra signalent :",["Les zones surexposées au-delà d’un seuil","Le bruit","La netteté","Le niveau audio"],0,"Ils s’affichent sur les hautes lumières dépassant un seuil réglé.","Exposition"),
Bq("Le Rec.709 est :",["Un espace colorimétrique HD / SDR","Un codec audio","Un format de fichier","Une connectique"],0,"Référence de l’HD SDR.","Couleur"),
Bq("Quel est l’avantage d’un obturateur global ?",["Plus de dynamique","Aucun effet de rolling shutter","Un fichier plus léger","Moins de bruit"],1,"Tout le capteur est exposé simultanément.","Capteur"),
Bq("À 25 i/s, quelle vitesse limite le plus le flicker avec des lampes en 50 Hz ?",["1/50 s","1/60 s","1/100 s","1/48 s"],0,"1/50 s est un multiple de la période de 50 Hz ; 1/60 ou 1/48 peuvent faire apparaître des bandes.","Exposition")]));

/* ---------- TES : signal, codecs, stockage, audio ---------- */
addB("tes",Bk("tes_sig","💾","Signal, codecs, stockage et audio","Échantillonnage, débits, RAID, loudness",[
Bq("Le 4:2:0 signifie que la chrominance est :",["Pleine résolution","Divisée par 2 en horizontal et en vertical","Supprimée","Doublée"],1,"Format courant de diffusion (H.264 grand public).","Signal"),
Bq("Une image en 10 bits par composante offre :",["256 niveaux","1 024 niveaux","4 096 niveaux","65 536 niveaux"],1,"2¹⁰ = 1 024, soit moins de banding qu’en 8 bits (256).","Signal"),
Bq("Un débit de 80 Mb/s équivaut à :",["80 Mo/s","10 Mo/s","800 Mo/s","1 Mo/s"],1,"80 ÷ 8 = 10 Mo/s.","Débit"),
Bq("Un conteneur est :",["Un algorithme de compression","Une enveloppe qui regroupe vidéo, audio, timecode et métadonnées","Un type de câble","Un écran"],1,"MOV, MP4, MXF, MKV.","Fichiers"),
Bq("Le MXF est surtout utilisé :",["Pour le web","Dans le broadcast et sur Avid","Pour l’impression","Pour les photos"],1,"Standard d’échange et de stockage professionnel.","Fichiers"),
Bq("Un RAID 0 :",["Est une sauvegarde","Répartit les données (vitesse) sans aucune redondance","Copie les données à l’identique","Tolère 2 pannes"],1,"Si un disque tombe, tout est perdu.","Stockage"),
Bq("La règle 3-2-1 consiste à avoir :",["3 disques, 2 ordinateurs, 1 câble","3 copies, sur 2 supports, dont 1 hors site","3 sauvegardes sur le même disque","1 copie sur 3 supports"],1,"Elle protège des pannes, vols et sinistres.","Stockage"),
Bq("Thunderbolt 3 ou 4 offre jusqu’à :",["480 Mb/s","5 Gb/s","40 Gb/s","1 Tb/s"],2,"Interface rapide pour disques et stations de travail.","Stockage"),
Bq("Pourquoi vérifier une copie par checksum ?",["Pour la compresser","Pour garantir qu’elle est identique à l’original","Pour la renommer","Pour la crypter"],1,"Une copie corrompue peut passer inaperçue.","Stockage"),
Bq("Un codec H.264 est :",["Intra-frame uniquement","Inter-frame (GOP), léger mais plus lourd à décoder","Sans perte","Réservé au son"],1,"Il stocke des images I, P et B.","Fichiers")],
[
Bq("Le débit non compressé d’un 1080p25 en 4:2:2 10 bits est d’environ :",["1 Gb/s","100 Mb/s","10 Mb/s","10 Gb/s"],0,"1920 × 1080 × 25 × 20 bits ≈ 1,04 Gb/s.","Débit"),
Bq("Quel SDI faut-il au minimum pour du 1080p50 en 4:2:2 10 bits (≈ 2 Gb/s) ?",["SD-SDI","HD-SDI 1,5G","3G-SDI","Aucun n’y suffit"],2,"Le 3G-SDI transporte jusqu’à 2,97 Gb/s.","Signal"),
Bq("Le ProRes 4444 se distingue par :",["Un débit très faible","Le 4:4:4 et la possibilité d’un canal alpha","L’absence de couleur","L’audio 5.1"],1,"Utile pour les éléments avec transparence.","Fichiers"),
Bq("Inconvénient d’un GOP long au montage :",["Taille trop petite","Décodage plus lourd, accès image par image plus coûteux","Qualité parfaite","Aucun"],1,"Chaque image dépend d’autres images.","Fichiers"),
Bq("Le drop frame en 29,97 i/s :",["Supprime des images","Saute des numéros de timecode pour rester proche de l’heure réelle","Passe à 25 i/s","Supprime le son"],1,"Les numéros 00 et 01 sont sautés chaque minute, sauf aux minutes multiples de 10.","Timecode"),
Bq("À 48 kHz, la fréquence maximale reproductible est :",["12 kHz","24 kHz","48 kHz","96 kHz"],1,"Théorème de Nyquist : la moitié de la fréquence d’échantillonnage.","Audio"),
Bq("La dynamique théorique d’un son 24 bits est d’environ :",["48 dB","96 dB","144 dB","192 dB"],2,"≈ 6 dB par bit.","Audio"),
Bq("La crête réelle maximale en EBU R128 est :",["0 dBTP","−1 dBTP","−10 dBTP","−23 dBTP"],1,"Sans compter le niveau cible de −23 LUFS.","Audio"),
Bq("L’alimentation fantôme est de :",["5 V","12 V","24 V","48 V"],3,"Elle alimente les micros statiques via XLR.","Audio"),
Bq("Un RAID 5 :",["Tolère la panne d’un disque grâce à la parité","Ne tolère aucune panne","Est un miroir","Demande 1 seul disque"],0,"Il faut au moins 3 disques.","Stockage")]));

/* ---------- Image fixe ---------- */
addB("img",Bk("img_b","📷","Photographie, lumière et fichiers","Exposition, optique, lumière, formats",[
Bq("+1 IL de compensation d’exposition signifie :",["Deux fois moins de lumière","Deux fois plus de lumière","Un changement de focale","Un changement de format"],1,"IL = indice de lumination, équivalent à 1 stop.","Exposition"),
Bq("Avec un 50 mm, la vitesse minimale à main levée est d’environ :",["1/8 s","1/50 s","1/1000 s","1 s"],1,"Règle de base : 1/focale.","Exposition"),
Bq("La mesure spot :",["Mesure toute la scène","Mesure une très petite zone","Mesure seulement le ciel","Remplace l’histogramme"],1,"Pratique pour un visage en contre-jour.","Exposition"),
Bq("La profondeur de champ augmente quand :",["On ouvre le diaphragme","On ferme le diaphragme","On rapproche le sujet","On utilise un téléobjectif"],1,"Fermer le diaphragme = plus de netteté en profondeur.","Optique"),
Bq("La perspective dépend surtout :",["De la distance prise au sujet","Du fabricant","De l’ISO","Du format de fichier"],0,"Changer de focale sans bouger ne change pas la perspective.","Optique"),
Bq("Une lumière dure :",["Vient d’une source large et diffusée","Crée des ombres franches (source petite)","N’existe qu’en studio","N’a pas de direction"],1,"Soleil de midi, projecteur sans diffuseur.","Lumière"),
Bq("Un gel CTO sert à :",["Réchauffer une source (jour → tungstène)","Refroidir une source","Diffuser la lumière","Réduire la lumière sans changer la couleur"],0,"CTO = Color Temperature Orange.","Lumière"),
Bq("Un histogramme collé à droite indique :",["Une sous-exposition","Un risque de surexposition (hautes lumières)","Un excès de bruit","Une mauvaise mise au point"],1,"À droite = hautes lumières.","Exposition"),
Bq("La mesure d’exposition d’un posemètre vise :",["Le noir","Le gris moyen (18 %)","Le blanc","Le rouge"],1,"D’où la compensation sur les scènes très claires ou très sombres.","Exposition"),
Bq("Une lumière douce provient :",["D’une source large ou diffusée","D’un laser","D’une source ponctuelle nue","D’un flash direct"],0,"Ciel couvert, softbox.","Lumière")],
[
Bq("De f/5,6 à f/11, la lumière reçue est :",["Divisée par 2","Divisée par 4","Divisée par 8","Identique"],1,"2 stops = ÷4.","Exposition"),
Bq("1/125 s à f/4 est équivalent (même exposition) à :",["1/250 s à f/2,8","1/250 s à f/5,6","1/60 s à f/2,8","1/500 s à f/4"],0,"On perd 1 stop de temps, on le compense avec 1 stop d’ouverture.","Exposition"),
Bq("Un ratio key:fill de 4:1 correspond à un écart de :",["1 stop","2 stops","3 stops","4 stops"],1,"4 = 2².","Lumière"),
Bq("L’IRC (CRI) mesure :",["La puissance d’une lampe","La fidélité du rendu des couleurs d’une source","La température de couleur","La durée de vie"],1,"100 est l’idéal.","Lumière"),
Bq("Un profil ICC :",["Est un format d’image","Décrit comment interpréter les couleurs d’un espace ou d’un appareil","Réduit le bruit","Change la résolution"],1,"Il garantit la cohérence entre appareils.","Couleur"),
Bq("L’Adobe RGB, comparé au sRGB :",["A un gamut plus large","A un gamut plus petit","N’a aucun rapport avec la couleur","Ne sert qu’au web"],0,"Il couvre davantage de verts et de cyans.","Couleur"),
Bq("Une image de 6000 × 4000 px fait :",["2,4 Mpx","24 Mpx","240 Mpx","0,24 Mpx"],1,"6000 × 4000 = 24 000 000.","Fichiers"),
Bq("À 300 ppp, 6000 px donnent une largeur d’impression d’environ :",["20 cm","51 cm","2 m","5 cm"],1,"6000 ÷ 300 = 20 pouces ≈ 51 cm.","Fichiers"),
Bq("Un fichier RAW 14 bits par rapport à un JPEG 8 bits :",["Est moins retouchable","Offre une latitude de retouche bien supérieure","N’a aucune différence","Ne contient pas de couleurs"],1,"Beaucoup plus de niveaux et pas de compression destructrice.","Fichiers"),
Bq("Une image vectorielle (SVG) :",["Dépend de la résolution","Reste nette à toute taille","Est un RAW","Est limitée à 256 couleurs"],1,"Formes mathématiques, pas de pixels.","Fichiers")]));

/* ---------- Analyse filmique ---------- */
addB("ana",Bk("ana_b","🎞️","Langage cinématographique","Plans, son, montage, histoire du cinéma",[
Bq("Le gros plan sur un visage met surtout en valeur :",["Le décor","Les émotions du personnage","Le mouvement de caméra","Le format d’image"],1,"Il rapproche le spectateur du personnage.","Plans"),
Bq("Une plongée tend à :",["Valoriser","Rapetisser ou fragiliser le sujet","Ne rien changer","Accélérer l’action"],1,"Tendance, à interpréter selon le contexte.","Plans"),
Bq("Le hors-champ est :",["Ce qui n’est pas visible dans le cadre mais est suggéré","Un plan flou","Un plan sans son","Un titre"],0,"Un regard ou un son peuvent évoquer ce qu’on ne voit pas.","Plans"),
Bq("Le zoom diffère du travelling car :",["Il déplace la caméra","Il change la focale sans déplacer la caméra","Il change le montage","Il n’existe pas au cinéma"],1,"Le travelling modifie la perspective, le zoom non.","Mouvements"),
Bq("Une voix off est :",["Une voix dans le champ","Une voix dont la source n’appartient pas à l’espace de l’image","Un bruitage","Une musique"],1,"Commentaire, narration, pensées.","Son"),
Bq("Un flash-back est :",["Un retour en arrière dans le récit","Un saut dans le futur","Un fondu","Un effet de lumière"],0,"Il éclaire le passé d’un personnage ou d’un événement.","Récit"),
Bq("Dans une focalisation interne, le récit :",["Sait tout","Épouse la perception d’un personnage","Ne sait rien","N’a pas de personnage"],1,"On voit et sait ce que sait le personnage.","Récit"),
Bq("Une séquence est :",["Un seul plan","Un ensemble de plans/scènes formant une unité dramatique","Une bande-son","Un effet"],1,"Elle est plus longue qu’un plan et qu’une scène.","Récit"),
Bq("Le format 2,39:1 est appelé :",["Scope (cinémascope)","Académique","Carré","Vertical"],0,"Format très large du cinéma.","Cadre"),
Bq("Un contrepoint sonore :",["Un son en décalage avec l’émotion de l’image","Un son parfaitement synchrone","Un silence","Un bruitage"],0,"Exemple : musique joyeuse sur une scène tragique.","Son")],
[
Bq("Eisenstein défend :",["Un montage par conflit des plans (attractions)","Le plan-séquence absolu","Le jump cut","L’absence de montage"],0,"Cuirassé Potemkine (1925).","Théories"),
Bq("Qui a généralisé le montage alterné ?",["Griffith","Truffaut","Wenders","Spielberg"],0,"Notamment dans ses films des années 1910.","Théories"),
Bq("André Bazin défend :",["Le plan-séquence et la profondeur de champ","Le montage rapide","La musique de fosse","Les effets spéciaux"],0,"Il privilégie un cinéma réaliste de l’espace et de la durée.","Théories"),
Bq("Le jump cut est emblématique de :",["Hollywood classique","La Nouvelle Vague (Godard)","Le cinéma muet","Le cinéma d’animation"],1,"À bout de souffle (1960).","Histoire"),
Bq("Citizen Kane (1941) est célèbre pour :",["Sa profondeur de champ et sa structure en flash-backs","Son absence de son","Sa couleur","Son format 3D"],0,"Orson Welles et le chef opérateur Gregg Toland.","Histoire"),
Bq("L’expressionnisme allemand se caractérise par :",["Des décors réalistes","Des décors déformés et des éclairages très contrastés","Le tournage en extérieur uniquement","L’absence d’acteurs"],1,"Le Cabinet du docteur Caligari (1920).","Histoire"),
Bq("Le néoréalisme italien privilégie :",["Les décors de studio","Les décors réels et les acteurs non professionnels","Les effets spéciaux","Le parlant uniquement"],1,"Rome, ville ouverte (1945).","Histoire"),
Bq("Un plan subjectif montre :",["La scène de très loin","Ce que voit un personnage","Le décor seul","Un générique"],1,"La caméra prend la place de son regard.","Plans"),
Bq("La mise en scène désigne :",["Uniquement le jeu des acteurs","L’ensemble des choix visibles à l’écran (décor, costumes, jeu, cadre, lumière)","Seulement le montage","Seulement le son"],1,"Le découpage concerne la division de l’action en plans.","Notions"),
Bq("La synchrèse (Michel Chion) désigne :",["Une soudure perçue entre un son et une image simultanés","Un effet de zoom","Un format de pellicule","Un type de plan"],0,"Notre perception relie spontanément ce qu’on voit et ce qu’on entend ensemble.","Son")]));

/* ---------- Montage : grammaire ---------- */
addB("mon",Bk("mon_gram","✂️","Raccords et grammaire du montage","Raccords, règles, transitions, rythme",[
Bq("Un faux raccord est :",["Une transition en fondu","Une incohérence de continuité entre deux plans","Un effet sonore","Un titre"],1,"Ex. : un verre plein puis vide sans raison.","Raccords"),
Bq("La règle des 30° :",["Interdit les fondus","Impose de varier d’au moins 30° l’angle entre deux plans du même sujet","Règle l’obturateur","Limite le volume"],1,"Elle évite le jump cut involontaire.","Règles"),
Bq("Un jump cut est :",["Une coupe très visible entre deux plans quasi identiques","Un fondu enchaîné","Un raccord dans l’axe parfait","Un effet sonore"],0,"Peut être involontaire ou assumé (Nouvelle Vague).","Raccords"),
Bq("Un raccord de regard :",["Relie un personnage qui regarde hors-champ et un plan de ce qu’il voit","Change la couleur","Allonge un plan","Supprime le son"],0,"Il crée un lien spatial et narratif.","Raccords"),
Bq("Un insert est :",["Un plan de détail sur un objet","Un fondu","Un son","Un générique"],0,"Il attire l’attention sur un élément précis.","Plans"),
Bq("Un fondu au noir signale souvent :",["Une fin de séquence ou une ellipse forte","Un dialogue","Un raccord dans le mouvement","Une erreur"],0,"Il marque une pause.","Transitions"),
Bq("Dans le montage parallèle, les deux actions :",["Sont toujours simultanées","Sont reliées par thème, sans simultanéité obligatoire","Sont dans le même lieu","N’ont aucun lien"],1,"Différence avec le montage alterné.","Montage"),
Bq("On coupe de préférence :",["Sur un mouvement, un geste ou un regard","Au milieu d’un silence","Toujours à la fin du plan","Sur une erreur"],0,"La coupe passe inaperçue.","Règles"),
Bq("Un plan de réaction montre :",["L’action principale","La réaction d’un personnage à un événement","Un paysage","Le générique"],1,"Il donne de l’émotion et du rythme.","Plans"),
Bq("Franchir l’axe des 180° sans précaution provoque :",["Une inversion des positions et une désorientation","Une meilleure continuité","Un gain de temps","Rien"],0,"Les personnages semblent changer de côté.","Règles")],
[
Bq("Selon Murch, l’émotion représente :",["10 %","23 %","51 %","100 %"],2,"Le critère le plus important d’une coupe.","Théorie"),
Bq("L’ASL désigne :",["La durée moyenne des plans","Le volume sonore","Un format","Un raccourci clavier"],0,"Average Shot Length.","Rythme"),
Bq("Un match cut :",["Relie deux plans par une analogie de forme, de mouvement ou de cadrage","Supprime un plan","Change la couleur","N’existe qu’en documentaire"],0,"Exemple célèbre : 2001, l’os et le satellite.","Raccords"),
Bq("Le « montage invisible » vise à :",["Faire oublier la coupe pour fluidifier le récit","Rendre le montage spectaculaire","Supprimer le son","Réduire le débit"],0,"Typique du cinéma classique.","Théorie"),
Bq("Le B-roll sert à :",["Illustrer et masquer des coupes","Régler l’obturateur","Mixer","Étalonner"],0,"Images d’illustration en complément de la parole.","Documentaire"),
Bq("Le room tone est :",["L’enregistrement du silence d’un lieu pour combler les trous","Un effet de réverbération","Une musique","Une LUT"],0,"Il évite les « trous » sonores entre deux prises.","Son"),
Bq("Dans un sujet de JT, le « off » est :",["La voix du journaliste sur des images","Un extrait d’interview","Un plateau","Un titre"],0,"La « synchro » est l’extrait d’interview avec son d’origine.","Reportage"),
Bq("Une « synchro » en reportage désigne :",["Un extrait d’interview avec le son d’origine","Un fondu","Un raccord de regard","Un générique"],0,"On voit et entend la personne.","Reportage"),
Bq("Un J-cut ou un L-cut servent surtout à :",["Fluidifier les transitions et les dialogues","Supprimer l’image","Augmenter le débit","Changer la fréquence"],0,"Le décalage image/son évite des coupes sèches.","Son"),
Bq("Un volet (wipe) :",["Remplace l’image par un balayage","Est un fondu au noir","Est un raccord invisible","Est une LUT"],0,"Effet de transition stylisé.","Transitions")]));

/* ---------- Montage : workflow, outils, finitions ---------- */
addB("mon",Bk("mon_flow","🎬","Workflow, outils et finitions","Chaîne de postproduction, Avid, étalonnage",[
Bq("Quel est l’ordre logique d’une postproduction ?",["Étalonnage → ingest → montage","Ingest → dérushage → montage → picture lock → étalonnage/mixage → export","Export → montage","Mixage → tournage → étalonnage"],1,"Le picture lock est le point de bascule.","Workflow"),
Bq("La conformation consiste à :",["Reconstituer le montage à partir des médias originaux en pleine qualité","Supprimer les rushes","Créer un générique","Ajouter de la musique"],0,"Passage de l’offline à l’online.","Workflow"),
Bq("L’offline est :",["Un montage avec des fichiers légers (proxys)","L’export final","L’étalonnage","Le mixage"],0,"On monte en basse définition.","Workflow"),
Bq("L’AAF est utilisé pour :",["Échanger une séquence (notamment vers Pro Tools)","Faire un fondu","Diffuser sur le web","Enregistrer du son"],0,"Il permet de transmettre pistes, médias et métadonnées.","Échanges"),
Bq("Un bin Avid est :",["Un chutier qui contient des clips, séquences et médias","Un disque","Un effet","Un codec"],0,"Il structure le projet.","Avid"),
Bq("Un sous-clip :",["Est un extrait nommé d’un rush","Est un export","Est une LUT","Est un effet"],0,"Pratique pour découper de longs rushes.","Organisation"),
Bq("Relinker des médias signifie :",["Les reconnecter quand ils sont hors ligne","Les supprimer","Les compresser","Les étalonner"],0,"Le logiciel ne trouve plus les fichiers.","Organisation"),
Bq("L’étalonnage primaire :",["Corrige l’image dans son ensemble","Ne cible qu’une couleur","Ajoute du son","Est un export"],0,"Balance, exposition, contraste, saturation.","Étalonnage"),
Bq("L’étalonnage secondaire :",["Est global","Cible une zone ou une couleur précise","Est un mixage","Est un format"],1,"Masques, fenêtres, qualificateurs.","Étalonnage"),
Bq("Un waveform mesure :",["La luminance de l’image","Le volume","Le bruit","La netteté"],0,"Il aide à contrôler l’exposition.","Étalonnage")],
[
Bq("Lift, Gamma, Gain agissent respectivement sur :",["Ombres, tons moyens, hautes lumières","Hautes lumières, ombres, tons moyens","Couleur, netteté, bruit","Son, image, texte"],0,"Les trois zones tonales d’une image.","Étalonnage"),
Bq("Le vectorscope affiche :",["La teinte et la saturation","La luminance seulement","Le son","La netteté"],0,"La « ligne de peau » est un repère classique.","Étalonnage"),
Bq("Une LUT est :",["Une table de conversion colorimétrique","Un codec","Un type de câble","Un titre"],0,"Ex. : Log vers Rec.709.","Étalonnage"),
Bq("Dans DaVinci Resolve, la page Fairlight sert à :",["L’audio","L’étalonnage","L’export seulement","La gestion des médias seulement"],0,"Mixage et montage son.","Resolve"),
Bq("Insert (splice-in) :",["Insère le plan en décalant la suite","Remplace sans décaler","Supprime","Duplique"],0,"Overwrite remplace sans décaler.","Outils"),
Bq("Sur Avid, Lift :",["Supprime en laissant un trou","Supprime et ferme le trou","Duplique","Mixe"],0,"Extract supprime et ferme le trou.","Avid"),
Bq("Un DCP est :",["Un package de diffusion pour cinéma numérique","Un codec de tournage","Un raccourci","Un type de disque"],0,"Digital Cinema Package.","Livraison"),
Bq("Pour ouvrir une sauvegarde de l’Attic copiée sur le bureau, on utilise :",["File > Open Bin avec All Files (*.*)","Un double-clic dans l’Attic","File > Import","Le dossier Other Bins directement"],0,"On travaille toujours sur la copie.","Avid"),
Bq("Une bonne pratique de versionnage est de :",["Dupliquer la séquence avant un gros changement (v01, v02…)","Ne jamais sauvegarder","Écraser les versions","Renommer les médias"],0,"Permet de revenir en arrière.","Organisation"),
Bq("Les stems servent à :",["Livrer des sous-mixages séparés (dialogues, musique, effets)","Compresser l’image","Étalonner","Changer la fréquence"],0,"Utiles pour les versions étrangères.","Livraison")]));

/* ---------- Photoshop & After Effects ---------- */
addB("adobe",Bk("adobe_b","🧪","Photoshop, After Effects et compositing","Calques, masques, animation, incrustation",[
Bq("Ctrl+J dans Photoshop :",["Duplique le calque","Annule","Ferme","Exporte"],0,"Nouveau calque par copie.","Photoshop"),
Bq("Ctrl+T dans Photoshop :",["Transformation manuelle","Texte","Taille de toile","Teinte"],0,"Permet de redimensionner, pivoter, déformer.","Photoshop"),
Bq("Le mode de fusion Produit :",["Assombrit, le blanc disparaît","Éclaircit","Inverse","Supprime les couleurs"],0,"Idéal pour les ombres.","Photoshop"),
Bq("Un masque d’écrêtage :",["Limite un calque à la forme du calque inférieur","Supprime les pixels","Fusionne les calques","Flatten l’image"],0,"Pratique pour des textures dans une forme.","Photoshop"),
Bq("Le remplissage selon contenu sert à :",["Supprimer un élément en reconstruisant l’arrière-plan","Changer de format","Convertir en CMJN","Faire un flou"],0,"Retouche intelligente.","Photoshop"),
Bq("Pour une impression, on vise généralement :",["72 ppp","300 ppp","10 ppp","1 000 ppp"],1,"300 ppp à la taille finale.","Photoshop"),
Bq("La touche T dans After Effects affiche :",["L’opacité","La position","La rotation","L’échelle"],0,"A ancrage, P position, S échelle, R rotation.","After Effects"),
Bq("Ctrl+Shift+C dans After Effects :",["Pré-compose les calques sélectionnés","Crée un calque nul","Exporte","Copie"],0,"Regroupe les calques dans une composition.","After Effects"),
Bq("Un calque nul sert à :",["Piloter d’autres calques par parenting (invisible au rendu)","Ajouter du son","Rendre plus net","Exporter"],0,"Il n’est pas visible dans le rendu final.","After Effects"),
Bq("Easy Ease permet :",["Un démarrage et un arrêt progressifs de l’animation","Un rendu plus rapide","De supprimer le son","D’ajouter du flou"],0,"F9 sur les keyframes sélectionnées.","After Effects")],
[
Bq("wiggle(2,30) produit :",["Une variation aléatoire 2 fois par seconde, amplitude 30","Une rotation de 2°","Une pause de 30 s","Un rendu en 30 i/s"],0,"Expression très utilisée pour des tremblements.","After Effects"),
Bq("Un Alpha Matte :",["Utilise la transparence d’un calque comme masque","Utilise la couleur rouge","Supprime le son","Change la résolution"],0,"Luma Matte utilise la luminosité.","After Effects"),
Bq("La suppression du spill sert à :",["Neutraliser les reflets verts sur le sujet","Réduire le bruit","Accélérer le rendu","Changer de format"],0,"Reflets du fond vert sur les cheveux ou les vêtements.","Incrustation"),
Bq("Le Roto Pinceau permet :",["La rotoscopie assistée (détourage image par image)","Le mixage","L’export","L’étalonnage"],0,"Il propage une sélection d’image en image.","After Effects"),
Bq("Le suivi de mouvement (tracking) :",["Permet de coller un élément à un mouvement de caméra","Supprime le bruit","Étalonne","Exporte"],0,"2D ou 3D.","After Effects"),
Bq("Un format d’export avec transparence est :",["ProRes 4444","H.264 standard","MP3","JPEG"],0,"Il peut contenir un canal alpha.","Export"),
Bq("Le Dynamic Link entre Premiere et After Effects :",["Évite un export intermédiaire","Compresse en MP3","Supprime les calques","N’existe pas"],0,"Les modifications sont répercutées.","Premiere"),
Bq("Dans Premiere, le raccourci C sélectionne :",["L’outil rasoir","L’outil sélection","La plume","Le texte"],0,"V = sélection.","Premiere"),
Bq("Media Encoder permet :",["De mettre les exports en file d’attente en arrière-plan","D’éditer des photos","De mixer","D’étalonner"],0,"Il libère le logiciel principal pendant l’export.","Premiere"),
Bq("Pour un bon fond vert, il faut :",["Un éclairage uniforme et le sujet éloigné du fond","Un éclairage orienté sur le fond seulement","Un sujet collé au fond","Un fond froissé"],0,"Cela limite le spill et facilite la clé.","Incrustation")]));

/* ---------- Anglais ---------- */
addB("ang",Bk("ang_b","🇬🇧","English for post-production","Vocabulary, grammar, professional English",[
Bq("“Cut” in editing means:",["An abrupt transition between two shots","A slow fade","A sound effect","A title"],0,"Cut = coupe.","Vocabulary"),
Bq("“Timeline” refers to:",["The editing sequence where clips are arranged","A shooting schedule only","A camera","A microphone"],0,"Timeline = scénario de montage / séquence.","Vocabulary"),
Bq("“Dailies” are:",["The footage shot the previous day","Daily newspapers","Subtitles","Sound effects"],0,"Rushes de la veille.","Vocabulary"),
Bq("Complete: “She ___ editing now.”",["is","are","do","has"],0,"Present continuous : is + -ing.","Grammar"),
Bq("The past simple of “shoot” is:",["shooted","shot","shoot","shoten"],1,"Verbe irrégulier : shoot – shot – shot.","Grammar"),
Bq("“Delivery date” means:",["Date de livraison","Date de naissance","Date d’import","Date d’export seulement"],0,"Date à laquelle le travail doit être livré.","Vocabulary"),
Bq("A “soundtrack” is:",["La bande originale / bande-son","Un sous-titre","Un plan","Un logiciel"],0,"Soundtrack = musique et sons du film.","Vocabulary"),
Bq("“Subtitles” are:",["Sous-titres","Titres","Crédits","Raccords"],0,"Texte affiché pour traduire ou transcrire les dialogues.","Vocabulary"),
Bq("Which is a polite request?",["Send me the file now.","Could you send me the file, please?","You must send the file.","File!"],1,"Could you… ? est poli.","Professional"),
Bq("“Voice-over” means:",["Voix off","Voix de fond","Voix chantée","Voix multiple"],0,"Commentaire sur images.","Vocabulary")],
[
Bq("Complete: “I ___ in this studio for two years.”",["work","have worked","am working","worked"],1,"Present perfect avec for.","Grammar"),
Bq("Complete: “The final cut ___ by the director tomorrow.”",["will be approved","approves","approved","is approving"],0,"Passif futur : will be + participe passé.","Grammar"),
Bq("Complete: “If I had more time, I ___ add more music.”",["will","would","can","am"],1,"Conditionnel de type 2 : if + past simple, would + base verbale.","Grammar"),
Bq("Reported speech: “I finished the cut.” → She said she ___ the cut.",["finished","had finished","has finish","finishes"],1,"Backshift : past simple → past perfect.","Grammar"),
Bq("Complete: “This version is ___ than the first one.”",["good","better","best","gooder"],1,"Comparatif irrégulier : good – better – best.","Grammar"),
Bq("Choose the connector: “___ the delay, we delivered on time.”",["Despite","Because","Although","So"],0,"Despite + groupe nominal.","Grammar"),
Bq("“Deliverables” are:",["What must be delivered to the client","Delivery trucks","Delayed files","Cameras"],0,"Livrables.","Vocabulary"),
Bq("“Wrap” in film language means:",["The end of shooting","The start of editing","A sound effect","A cable"],0,"« That’s a wrap! » = c’est dans la boîte.","Vocabulary"),
Bq("“To lock the picture” means:",["To finalise the edit so no more changes are made","To protect a file with a password","To delete the footage","To compress the file"],0,"Picture lock.","Vocabulary"),
Bq("“To render” means:",["To compute and generate the final images or effects","To record sound","To cut a clip","To translate"],0,"Calculer les images finales.","Vocabulary")]));

/* ---------- Français ---------- */
addB("fr",Bk("fr_b","📚","Culture générale et expression","Langue, figures de style, synthèse",[
Bq("« Il ___ parti hier. »",["a","à","as","est"],3,"Verbe partir au passé composé avec être.","Langue"),
Bq("« ___ images sont magnifiques » (démonstratif) :",["Ses","Ces","C’est","Sait"],1,"Ces = démonstratif pluriel.","Langue"),
Bq("« Elles sont ___ » (partir) :",["parti","partie","parties","partis"],2,"Avec être, accord avec le sujet féminin pluriel.","Langue"),
Bq("« Fort comme un lion » est :",["Une comparaison","Une métaphore","Une litote","Un oxymore"],0,"L’outil « comme » marque la comparaison.","Figures"),
Bq("Une litote :",["Dit peu pour suggérer beaucoup","Exagère","Répète","Oppose"],0,"Ex. : « Ce n’est pas mauvais » pour « c’est très bon ».","Figures"),
Bq("Quel mot est familier ?",["Véhicule","Voiture","Bagnole","Automobile"],2,"Bagnole appartient au registre familier.","Registres"),
Bq("Quel connecteur exprime la cause ?",["Car","Donc","Mais","Enfin"],0,"Car, parce que, puisque.","Argumentation"),
Bq("Quel est l’ordre d’une introduction de synthèse ?",["Amorce, corpus, problématique, plan","Plan, conclusion, amorce","Conclusion, corpus","Corpus, plan, amorce"],0,"Amorce → présentation du corpus → problématique → annonce du plan.","Synthèse"),
Bq("La conclusion d’une synthèse :",["Reprend le bilan en répondant à la problématique, sans idée nouvelle","Donne un avis personnel","Introduit un nouveau document","Cite longuement un texte"],0,"On ne rajoute ni opinion ni information nouvelle.","Synthèse"),
Bq("Pour citer un document dans une synthèse, on écrit :",["« selon le document 2 »","« moi je pense »","« dans un livre que j’ai lu »","« on dit que »"],0,"On référence précisément les documents du corpus.","Synthèse")],
[
Bq("« Je meurs de faim » est :",["Une hyperbole","Une litote","Un oxymore","Une anaphore"],0,"Exagération.","Figures"),
Bq("« Un silence assourdissant » est :",["Un oxymore","Une anaphore","Une métonymie","Une comparaison"],0,"Alliance de termes contradictoires.","Figures"),
Bq("« Je viens, je vois, je vaincs » est :",["Une gradation / un rythme ternaire","Une métaphore","Un oxymore","Une litote"],0,"Succession d’actions progressives.","Figures"),
Bq("« Il nous a quittés » à la place de « Il est mort » est :",["Un euphémisme","Une hyperbole","Une anaphore","Une antithèse"],0,"Adoucit une réalité pénible.","Figures"),
Bq("« Boire un verre » est :",["Une métonymie (le contenant pour le contenu)","Une comparaison","Un oxymore","Une litote"],0,"Le verre représente la boisson.","Figures"),
Bq("« Bien que tu ___ en retard » :",["es","sois","seras","étais"],1,"Bien que + subjonctif.","Langue"),
Bq("« Elle s’est ___ les mains. »",["lavé","lavée","lavés","lavées"],0,"COD « les mains » placé après : participe invariable.","Langue"),
Bq("La problématique d’une synthèse :",["Est une question qui structure la confrontation des documents","Est un résumé","Est une conclusion","N’est pas nécessaire"],0,"Elle guide l’ensemble du plan.","Synthèse"),
Bq("Un plan dialectique suit :",["Thèse / antithèse / synthèse","Chronologie","Ordre alphabétique","Document par document"],0,"Il confronte des positions contraires pour les dépasser.","Argumentation"),
Bq("Un plan thématique :",["Regroupe les idées par thème en croisant les documents","Suit l’ordre des documents","N’utilise aucun exemple","N’existe pas"],0,"C’est le plan attendu en synthèse.","Synthèse")]));
