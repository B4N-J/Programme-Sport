import type { Exercice } from '../types';

/**
 * Fiches exercices, transcrites de la section 4 de `programme-musculation.md`.
 * L'ordre suit celui du document. `npm run check:data` vérifie qu'aucune fiche
 * ne manque et qu'aucun identifiant n'a divergé.
 */
export const EXERCICES: Exercice[] = [
  // ---------------------------------------------------------------- 4.1 Pectoraux
  {
    id: "dc_halteres",
    nom: "Développé couché haltères",
    groupe: "pectoraux",
    muscles: "pectoraux, avant des épaules, triceps.",
    materiel: "banc plat, deux haltères.",
    positionDepart:
      "assis au bout du banc, haltères posés sur les cuisses. Allonge-toi en ramenant les haltères contre la poitrine, puis pousse-les bras tendus au-dessus des épaules. Pieds à plat au sol, omoplates serrées l'une contre l'autre et tirées vers le bas, légère cambrure naturelle.",
    execution: [
      "Descends les haltères en 2 à 3 secondes vers les côtés de la poitrine, coudes à environ 45° du corps (pas collés, pas à 90°).",
      "Descends jusqu'à sentir un étirement franc des pectoraux, haltères au niveau de la poitrine ou légèrement en dessous.",
      "Pousse vers le haut en rapprochant légèrement les haltères, jusqu'à tendre les bras sans verrouiller brutalement les coudes.",
    ],
    pointsCles: [
      "Les omoplates restent serrées pendant toute la série.",
      "La descente est lente et contrôlée.",
    ],
    erreurs: [
      "Rebondir en bas.",
      "Raccourcir l'amplitude.",
      "Décoller les fesses du banc.",
      "Coudes à 90° (stress sur les épaules).",
    ],
    plusFacile: "Pompes classiques.",
    plusDifficile: "Tempo 4 s en descente, pause 2 s en bas.",
  },
  {
    id: "dev_incline",
    nom: "Développé incliné haltères",
    groupe: "pectoraux",
    muscles: "haut des pectoraux, avant des épaules, triceps.",
    materiel: "banc incliné à environ 30°, deux haltères.",
    positionDepart: "comme le développé couché, dossier incliné à 30° (au-delà, les épaules prennent le relais).",
    execution: [
      "Identique à dc_halteres, les haltères descendent vers le haut de la poitrine, sous les clavicules.",
    ],
    pointsCles: ["30° suffisent.", "Omoplates serrées."],
    erreurs: ["Banc trop incliné.", "Décoller le dos du dossier."],
    note: "Remplacement si le banc est plat : dc_paumes_face.",
  },
  {
    id: "dc_paumes_face",
    nom: "Développé couché paumes face à face",
    groupe: "pectoraux",
    muscles: "pectoraux, triceps, plus doux pour les épaules.",
    materiel: "banc plat, deux haltères.",
    execution: [
      "Comme dc_halteres, mais les paumes restent tournées l'une vers l'autre pendant tout le mouvement et les coudes restent plus proches du corps (environ 30°).",
    ],
    pointsCles: ["Descente jusqu'à l'étirement des pectoraux."],
  },
  {
    id: "ecarte_couche",
    nom: "Écarté couché haltères",
    groupe: "pectoraux",
    muscles: "pectoraux, en isolation et en étirement.",
    materiel: "banc plat, deux haltères plus légers que pour le développé.",
    positionDepart:
      "allongé, haltères au-dessus de la poitrine, paumes face à face, coudes légèrement fléchis (environ 20°).",
    execution: [
      "Ouvre les bras sur les côtés en arc de cercle, en gardant le même angle de coude, jusqu'à sentir un étirement marqué des pectoraux (haltères à hauteur de la poitrine).",
      "Marque une pause d'1 seconde en bas.",
      "Referme les bras en arc de cercle comme pour enlacer un gros tronc d'arbre, jusqu'à ce que les haltères se rapprochent au-dessus de la poitrine.",
    ],
    pointsCles: ["L'angle des coudes ne change pas.", "Le travail se fait dans l'étirement."],
    erreurs: [
      "Plier les coudes en descendant (ça devient un développé).",
      "Descendre trop bas au point de ressentir une gêne à l'avant de l'épaule.",
    ],
  },
  {
    id: "pullover",
    nom: "Pullover haltère",
    groupe: "pectoraux",
    muscles: "pectoraux et grand dorsal, en étirement.",
    materiel: "banc plat, un haltère.",
    positionDepart:
      "allongé dans la longueur du banc, tête au bout. Tiens un haltère à deux mains par le disque supérieur, bras presque tendus au-dessus de la poitrine.",
    execution: [
      "Descends l'haltère derrière la tête en arc de cercle, bras presque tendus, jusqu'à ce que les bras soient à peu près alignés avec le buste et que tu sentes l'étirement des pectoraux et du dos.",
      "Ramène l'haltère au-dessus de la poitrine par le même chemin.",
    ],
    pointsCles: [
      "Coudes légèrement fléchis et fixes.",
      "Les côtes restent basses, ne cambre pas excessivement.",
    ],
    erreurs: [
      "Plier les coudes pendant le mouvement.",
      "Descendre au-delà de la mobilité de l'épaule.",
    ],
  },
  {
    id: "dips_penche",
    nom: "Dips buste penché",
    groupe: "pectoraux",
    muscles: "bas des pectoraux, triceps, avant des épaules.",
    materiel: "barres parallèles du parc.",
    positionDepart:
      "en appui bras tendus sur les barres, jambes fléchies et croisées derrière, buste penché vers l'avant (environ 30°).",
    execution: [
      "Descends en 3 secondes en pliant les coudes, qui partent légèrement vers l'extérieur, en gardant le buste penché.",
      "Descends jusqu'à ce que les épaules arrivent au niveau des coudes (étirement des pectoraux), sans aller au-delà si l'épaule tire.",
      "Remonte en poussant jusqu'aux bras tendus.",
    ],
    pointsCles: [
      "Le buste penché cible les pectoraux. Buste droit = surtout triceps.",
    ],
    erreurs: [
      "Épaules qui remontent vers les oreilles.",
      "Descente trop profonde et brutale.",
    ],
    plusFacile: "Dips avec les pieds posés sur une barre basse, ou négatives (descente lente seulement).",
    plusDifficile: "Sac à dos lesté.",
  },
  {
    id: "pompes_surelevees",
    nom: "Pompes pieds surélevés",
    groupe: "pectoraux",
    muscles: "haut des pectoraux, avant des épaules, triceps.",
    materiel: "banc ou barre basse du parc pour poser les pieds.",
    positionDepart:
      "mains au sol légèrement plus écartées que les épaules, pieds posés sur le support, corps gainé et aligné de la tête aux talons.",
    execution: [
      "Descends en 2 à 3 secondes jusqu'à ce que la poitrine frôle le sol, coudes à environ 45° du corps.",
      "Remonte en poussant jusqu'aux bras tendus.",
    ],
    pointsCles: ["Les fesses ne montent pas et le bassin ne s'affaisse pas."],
    erreurs: ["Amplitude incomplète.", "Hanches qui tombent."],
    plusDifficile: "Support plus haut, sac à dos lesté, pause en bas.",
  },
  {
    id: "pompes_deficit",
    nom: "Pompes en déficit",
    groupe: "pectoraux",
    muscles: "pectoraux, avec un étirement plus grand qu'une pompe classique.",
    materiel: "deux barres basses parallèles ou deux supports stables de même hauteur.",
    positionDepart: "mains sur les deux supports, pieds au sol, corps aligné.",
    execution: [
      "Descends lentement entre les supports jusqu'à ce que la poitrine passe sous le niveau des mains, sans douleur à l'épaule.",
      "Marque une courte pause dans l'étirement, puis remonte.",
    ],
    pointsCles: ["La profondeur supplémentaire est tout l'intérêt de l'exercice."],
    erreurs: [
      "Descendre trop vite et trop bas dès les premières séances. Augmente la profondeur progressivement.",
    ],
  },

  // --------------------------------------------------------- 4.2 Dos et lombaires
  {
    id: "rowing_1bras",
    nom: "Rowing un bras, appui banc",
    groupe: "dos",
    muscles: "grand dorsal, milieu du dos, arrière des épaules, biceps.",
    materiel: "banc plat, un haltère.",
    positionDepart:
      "genou et main du même côté posés sur le banc, l'autre pied au sol un peu en arrière. Dos plat et parallèle au sol. L'autre main tient l'haltère bras tendu sous l'épaule.",
    execution: [
      "Laisse l'épaule descendre vers le sol pour étirer le dos en bas du mouvement.",
      "Tire l'haltère vers la hanche (pas vers l'épaule), en menant avec le coude, jusqu'à ce que le coude dépasse le niveau du dos.",
      "Serre l'omoplate une seconde, puis redescends lentement jusqu'à l'étirement complet.",
    ],
    pointsCles: ["Le chemin de l'haltère va vers la hanche.", "Le buste ne tourne pas."],
    erreurs: [
      "Tirer avec le biceps.",
      "Faire pivoter le buste pour tricher.",
      "Amplitude raccourcie en bas.",
    ],
  },
  {
    id: "rowing_penche",
    nom: "Rowing buste penché deux haltères",
    groupe: "dos",
    muscles: "dos dans son ensemble, lombaires en gainage.",
    materiel: "deux haltères.",
    positionDepart:
      "debout, pieds largeur de hanches, genoux légèrement fléchis. Penche le buste vers l'avant à environ 45° en poussant les fesses vers l'arrière, dos plat. Haltères bras tendus sous les épaules.",
    execution: [
      "Tire les deux haltères vers le bas du ventre en serrant les omoplates.",
      "Redescends lentement jusqu'aux bras tendus.",
    ],
    pointsCles: [
      "Le dos reste plat et l'angle du buste ne change pas pendant la série.",
    ],
    erreurs: [
      "Dos qui s'arrondit.",
      "Buste qui se relève à chaque répétition pour aider.",
    ],
  },
  {
    id: "sdt_jambes_tendues",
    nom: "Soulevé de terre jambes tendues (roumain) aux haltères",
    groupe: "dos",
    muscles: "ischio-jambiers, fessiers, lombaires en maintien.",
    materiel: "deux haltères.",
    positionDepart:
      "debout, pieds largeur de hanches, haltères devant les cuisses, genoux légèrement fléchis et fixes.",
    execution: [
      "Pousse les fesses vers l'arrière en inclinant le buste vers l'avant, dos parfaitement plat, haltères qui glissent le long des jambes.",
      "Descends jusqu'à sentir un fort étirement à l'arrière des cuisses (en général mi-tibia au maximum). Arrête-toi avant que le bas du dos ne commence à s'arrondir.",
      "Remonte en poussant les hanches vers l'avant et en serrant les fessiers.",
    ],
    pointsCles: [
      "C'est un mouvement de hanche, pas de dos.",
      "Toujours 2 répétitions de marge.",
    ],
    erreurs: [
      "Dos arrondi.",
      "Genoux qui se plient trop (ça devient un squat).",
      "Haltères qui s'éloignent des jambes.",
    ],
    note: "Cet exercice renforce peu les lombaires de façon isolée selon la recherche. Le travail lombaire spécifique est assuré par superman_leste.",
  },
  {
    id: "superman_leste",
    nom: "Superman lesté",
    groupe: "dos",
    muscles: "muscles lombaires (érecteurs du rachis), fessiers.",
    materiel: "sol, un haltère léger (2 à 8 kg au début).",
    positionDepart: "allongé sur le ventre, bras tendus devant toi, haltère tenu à deux mains.",
    execution: [
      "Décolle simultanément les bras, la poitrine et les jambes du sol en contractant le bas du dos et les fessiers.",
      "Tiens la position haute 2 secondes.",
      "Redescends lentement.",
    ],
    pointsCles: [
      "Regard vers le sol pour ne pas casser la nuque.",
      "Mouvement contrôlé, sans élan.",
    ],
    erreurs: ["Lancer le mouvement avec de l'élan.", "Hyperextension de la nuque."],
    plusFacile: "Sans haltère, ou haltère tenu contre la poitrine.",
    plusDifficile: "Haltère plus lourd, pause de 3 à 5 s.",
  },
  {
    id: "tenue_superman",
    nom: "Tenue superman",
    groupe: "dos",
    muscles: "lombaires en endurance.",
    execution: [
      "Même position haute que superman_leste, sans charge, tenue pendant le temps indiqué.",
    ],
  },
  {
    id: "bird_dog",
    nom: "Bird dog",
    groupe: "dos",
    muscles: "lombaires, gainage profond.",
    positionDepart: "à quatre pattes, mains sous les épaules, genoux sous les hanches, dos plat.",
    execution: [
      "Tends en même temps le bras droit devant et la jambe gauche derrière, jusqu'à ce qu'ils soient alignés avec le dos.",
      "Tiens 2 secondes sans que le bassin ne bascule.",
      "Reviens et change de côté.",
    ],
    pointsCles: [
      "On pourrait poser un verre d'eau sur le bas du dos sans le renverser.",
    ],
  },
  {
    id: "tractions",
    nom: "Tractions pronation",
    groupe: "dos",
    muscles: "grand dorsal, biceps, arrière des épaules.",
    materiel: "barre de traction du parc.",
    positionDepart:
      "suspendu à la barre, paumes vers l'avant, mains un peu plus écartées que les épaules, bras complètement tendus.",
    execution: [
      "Abaisse d'abord les épaules (éloigne-les des oreilles), puis tire en menant avec les coudes vers les côtes.",
      "Monte jusqu'à passer le menton au-dessus de la barre.",
      "Redescends en 2 à 3 secondes jusqu'aux bras complètement tendus.",
    ],
    pointsCles: ["Amplitude complète en bas, c'est la position étirée du dos."],
    erreurs: ["Balancer les jambes.", "Demi-répétitions sans tendre les bras."],
    plusFacile: "Tractions négatives (tractions_negatives).",
    plusDifficile: "Sac à dos lesté.",
  },
  {
    id: "tractions_negatives",
    nom: "Tractions négatives",
    groupe: "dos",
    muscles: "grand dorsal, biceps, arrière des épaules.",
    materiel: "barre de traction du parc.",
    execution: [
      "Monte en sautant ou avec un appui jusqu'à la position menton au-dessus de la barre, puis redescends le plus lentement possible (5 secondes) jusqu'aux bras tendus.",
    ],
    note: "Remplace les tractions tant que tu ne fais pas au moins 5 répétitions complètes.",
  },
  {
    id: "rowing_australien",
    nom: "Rowing australien",
    groupe: "dos",
    muscles: "milieu du dos, arrière des épaules, biceps.",
    materiel: "barre basse du parc (hauteur de hanche environ).",
    positionDepart:
      "sous la barre, mains en pronation largeur d'épaules, bras tendus, corps gainé et droit, talons au sol.",
    execution: [
      "Tire la poitrine vers la barre en serrant les omoplates.",
      "Redescends lentement jusqu'aux bras tendus.",
    ],
    pointsCles: ["Le corps reste rigide comme une planche."],
    plusFacile: "Genoux fléchis, pieds à plat.",
    plusDifficile: "Pieds surélevés, corps plus horizontal, pause en haut.",
  },

  // ------------------------------------------------------------------ 4.3 Triceps
  {
    id: "ext_nuque_2mains",
    nom: "Extension nuque à deux mains",
    groupe: "triceps",
    muscles: "triceps, surtout la longue portion (la plus volumineuse).",
    materiel: "un haltère, banc pour s'asseoir.",
    positionDepart:
      "assis dos droit, haltère tenu à deux mains par le disque supérieur, bras tendus au-dessus de la tête.",
    execution: [
      "Descends l'haltère derrière la tête en pliant uniquement les coudes, jusqu'à un étirement marqué des triceps.",
      "Tends les bras pour remonter.",
    ],
    pointsCles: [
      "Les coudes pointent vers l'avant et restent proches de la tête.",
      "Cette position bras levés a produit nettement plus de croissance des triceps que les extensions bras le long du corps.",
    ],
    erreurs: ["Coudes qui s'écartent.", "Dos qui se cambre."],
  },
  {
    id: "barre_front",
    nom: "Barre au front haltères",
    groupe: "triceps",
    muscles: "triceps.",
    materiel: "banc plat, deux haltères.",
    positionDepart:
      "allongé, haltères tenus bras tendus au-dessus de la poitrine, paumes face à face.",
    execution: [
      "Plie les coudes pour descendre les haltères de chaque côté de la tête, jusqu'au niveau des oreilles.",
      "Tends les bras pour remonter.",
    ],
    pointsCles: [
      "Les coudes restent fixes et pointés vers le plafond.",
      "Tu peux incliner légèrement les bras vers l'arrière pour étirer davantage.",
    ],
    erreurs: ["Coudes qui s'ouvrent.", "Bras qui bougent (ça devient un développé)."],
  },
  {
    id: "dc_prise_serree",
    nom: "Développé couché prise serrée",
    groupe: "triceps",
    muscles: "triceps en priorité, pectoraux.",
    materiel: "banc plat, deux haltères.",
    execution: [
      "Comme dc_halteres, mais les haltères se touchent presque, paumes face à face, et les coudes frôlent le corps pendant la descente.",
    ],
  },
  {
    id: "ext_triceps_1bras",
    nom: "Extension triceps un bras au-dessus de la tête",
    groupe: "triceps",
    muscles: "triceps, longue portion.",
    materiel: "un haltère.",
    positionDepart:
      "assis ou debout, haltère tenu d'une main bras tendu au-dessus de la tête. L'autre main soutient le bras de travail au niveau du coude.",
    execution: [
      "Descends l'haltère derrière la tête en pliant le coude, jusqu'à l'étirement du triceps.",
      "Tends le bras.",
    ],
    pointsCles: ["Le coude reste pointé vers le plafond."],
  },

  // ------------------------------------------------------------------- 4.4 Biceps
  {
    id: "curl_couche",
    nom: "Curl couché bras pendants",
    groupe: "biceps",
    muscles: "biceps, en position étirée.",
    materiel: "banc plat assez haut pour que les haltères ne touchent pas le sol bras tendus.",
    positionDepart:
      "allongé sur le dos, bras pendants de chaque côté du banc, paumes vers le plafond. Les bras sont en arrière du corps, ce qui étire le biceps.",
    execution: [
      "Plie les coudes pour monter les haltères vers les épaules sans avancer les bras.",
      "Redescends lentement jusqu'à l'extension complète.",
    ],
    pointsCles: ["Les bras restent pendants vers le sol, seuls les avant-bras bougent."],
    note: "Remplacement si le banc est trop bas : curl_alterne.",
  },
  {
    id: "curl_alterne",
    nom: "Curl haltères alterné",
    groupe: "biceps",
    muscles: "biceps.",
    materiel: "deux haltères.",
    positionDepart: "debout, haltères le long du corps, paumes tournées vers les cuisses.",
    execution: [
      "Monte un haltère vers l'épaule en tournant la paume vers le haut pendant la montée.",
      "Redescends lentement jusqu'au bras complètement tendu, puis l'autre bras.",
    ],
    erreurs: ["Balancer le buste.", "Coudes qui avancent."],
  },
  {
    id: "curl_marteau",
    nom: "Curl marteau",
    groupe: "biceps",
    muscles: "biceps, brachial (muscle sous le biceps qui épaissit le bras), avant-bras.",
    materiel: "deux haltères.",
    execution: [
      "Comme curl_alterne, mais paumes tournées l'une vers l'autre pendant tout le mouvement, comme si tu tenais un marteau.",
      "Les deux bras peuvent travailler ensemble ou en alterné.",
    ],
  },
  {
    id: "curl_concentre",
    nom: "Curl concentré",
    groupe: "biceps",
    muscles: "biceps, en isolation stricte.",
    materiel: "banc, un haltère.",
    positionDepart:
      "assis au bout du banc, jambes écartées, buste penché. Le dos du bras qui travaille est calé contre l'intérieur de la cuisse, haltère bras tendu.",
    execution: [
      "Monte l'haltère vers l'épaule en pliant le coude.",
      "Contracte une seconde en haut, redescends lentement jusqu'au bras tendu.",
    ],
    pointsCles: ["Le bras ne bouge pas, impossible de tricher."],
  },

  // ------------------------------------------------------------------ 4.5 Épaules
  {
    id: "dev_militaire",
    nom: "Développé militaire assis",
    groupe: "epaules",
    muscles: "épaules (surtout l'avant et le milieu), triceps.",
    materiel:
      "banc avec dossier relevé à la verticale (sinon assis sans dossier, dos gainé), deux haltères.",
    positionDepart:
      "assis, dos calé, haltères à hauteur d'épaules, paumes vers l'avant, coudes légèrement en avant du corps.",
    execution: [
      "Pousse les haltères au-dessus de la tête jusqu'aux bras tendus.",
      "Redescends lentement jusqu'à hauteur d'oreilles ou légèrement en dessous.",
    ],
    erreurs: ["Cambrer le bas du dos.", "Descendre à moitié."],
  },
  {
    id: "elev_lat_penchees",
    nom: "Élévations latérales penchées",
    groupe: "epaules",
    muscles: "milieu des épaules (c'est lui qui donne la largeur), en position étirée.",
    materiel: "un haltère, un support fixe (montant, poteau, rack).",
    positionDepart:
      "debout à côté du support, tiens-le d'une main et penche-toi de côté en éloignant le corps du support (environ 15 à 20°). L'haltère est dans la main libre, bras pendant devant la hanche.",
    execution: [
      "Monte le bras sur le côté, coude légèrement fléchi, jusqu'à hauteur d'épaule.",
      "Redescends lentement jusqu'à ce que l'haltère passe devant le corps (position étirée).",
    ],
    pointsCles: [
      "L'inclinaison augmente la tension en bas du mouvement.",
      "Mène avec le coude, pas avec la main.",
    ],
    erreurs: ["Hausser l'épaule vers l'oreille.", "Prendre de l'élan."],
  },
  {
    id: "elev_laterales",
    nom: "Élévations latérales",
    groupe: "epaules",
    muscles: "milieu des épaules.",
    materiel: "deux haltères.",
    positionDepart: "debout, haltères le long du corps, coudes légèrement fléchis.",
    execution: [
      "Monte les deux bras sur les côtés jusqu'à hauteur d'épaules, puis redescends lentement.",
    ],
    pointsCles: ["Charges légères, séries longues, pas d'élan."],
  },
  {
    id: "oiseau",
    nom: "Oiseau (élévations buste penché)",
    groupe: "epaules",
    muscles: "arrière des épaules, haut du dos.",
    materiel: "deux haltères.",
    positionDepart:
      "debout ou assis au bout du banc, buste penché presque parallèle au sol, dos plat, haltères pendants sous la poitrine, paumes face à face.",
    execution: [
      "Ouvre les bras sur les côtés, coudes légèrement fléchis, comme des ailes, jusqu'à hauteur du dos.",
      "Redescends lentement.",
    ],
    erreurs: [
      "Serrer les omoplates au point de transformer l'exercice en rowing.",
      "Charges trop lourdes.",
    ],
  },

  // -------------------------------------------------------------------- 4.6 Nuque
  {
    id: "ext_nuque_ventre",
    nom: "Extension de nuque à plat ventre",
    groupe: "nuque",
    muscles: "muscles arrière du cou (splénius, semi-épineux).",
    materiel: "banc plat.",
    positionDepart:
      "allongé sur le ventre, les épaules au bord du banc, la tête dans le vide. Menton légèrement rentré, tête qui pend vers le sol.",
    execution: [
      "Relève lentement la tête vers l'arrière jusqu'à ce qu'elle soit alignée avec le buste ou légèrement au-dessus.",
      "Redescends lentement.",
    ],
    resistance:
      "au début, le poids de la tête suffit. Ensuite, pose une main à l'arrière du crâne et appuie modérément contre le mouvement (résistance manuelle).",
    pointsCles: ["Amplitude confortable, jamais forcée en fin de course."],
  },
  {
    id: "flex_nuque_dos",
    nom: "Flexion de nuque sur le dos",
    groupe: "nuque",
    muscles: "muscles avant du cou (sterno-cléido-mastoïdien).",
    materiel: "banc plat.",
    positionDepart: "allongé sur le dos, les épaules au bord du banc, la tête dans le vide.",
    execution: [
      "Rentre le menton puis ramène lentement la tête vers la poitrine.",
      "Redescends lentement jusqu'à l'alignement avec le buste, sans laisser la tête tomber en arrière.",
    ],
    resistance: "poids de la tête, puis main posée sur le front qui freine le mouvement.",
  },
  {
    id: "iso_nuque",
    nom: "Isométrie nuque 4 directions",
    groupe: "nuque",
    muscles: "muscles du cou, dans les quatre directions.",
    execution: [
      "Assis ou debout, place la main contre le front et pousse la tête contre la main sans bouger, 20 secondes.",
      "Répète avec la main à l'arrière du crâne, puis contre chaque côté de la tête.",
      "Intensité modérée, respiration normale.",
    ],
  },

  // --------------------------------------------------------------- 4.7 Abdominaux
  {
    id: "crunch_leste",
    nom: "Crunch lesté",
    groupe: "abdominaux",
    muscles: "grand droit de l'abdomen (les « tablettes »).",
    materiel: "sol, un haltère.",
    positionDepart:
      "allongé sur le dos, genoux pliés, pieds au sol, haltère tenu contre la poitrine.",
    execution: [
      "Enroule le haut du dos en rapprochant les côtes du bassin, jusqu'à décoller les omoplates du sol.",
      "Contracte une seconde, redescends lentement jusqu'à poser les épaules.",
    ],
    pointsCles: [
      "C'est un enroulement de la colonne, pas une remontée complète du buste.",
      "Le bas du dos reste au sol.",
    ],
    erreurs: ["Tirer sur la nuque.", "Remonter avec de l'élan."],
  },
  {
    id: "releves_jambes_sol",
    nom: "Relevés de jambes au sol",
    groupe: "abdominaux",
    muscles: "grand droit de l'abdomen, partie basse.",
    positionDepart:
      "allongé sur le dos, jambes tendues, mains sous les fesses ou le long du corps.",
    execution: [
      "Monte les jambes tendues jusqu'à la verticale.",
      "Redescends lentement sans toucher le sol.",
    ],
    pointsCles: [
      "Le bas du dos reste plaqué au sol. S'il se décolle, plie légèrement les genoux.",
    ],
  },
  {
    id: "releves_genoux_suspendus",
    nom: "Relevés de genoux suspendus",
    groupe: "abdominaux",
    muscles: "grand droit de l'abdomen, fléchisseurs de hanche.",
    materiel: "barre de traction du parc.",
    positionDepart: "suspendu à la barre, bras tendus, corps immobile.",
    execution: [
      "Monte les genoux vers la poitrine en enroulant le bassin vers le haut (le bassin bascule, pas seulement les jambes).",
      "Redescends lentement sans balancer.",
    ],
    plusDifficile: "Jambes tendues.",
  },
  {
    id: "planche",
    nom: "Planche",
    groupe: "abdominaux",
    muscles: "sangle abdominale, gainage global.",
    positionDepart:
      "en appui sur les avant-bras (coudes sous les épaules) et la pointe des pieds, corps aligné de la tête aux talons. Serre les fessiers et rentre légèrement le ventre.",
    execution: ["Tiens la position pendant la durée indiquée."],
    erreurs: ["Fesses trop hautes.", "Bassin qui s'affaisse."],
  },
  {
    id: "planche_laterale",
    nom: "Planche latérale",
    groupe: "abdominaux",
    muscles: "obliques, stabilisateurs du tronc.",
    positionDepart:
      "allongé sur le côté, en appui sur un avant-bras (coude sous l'épaule) et le bord du pied du dessous.",
    execution: ["Monte les hanches pour aligner tout le corps et tiens."],
    erreurs: ["Hanches qui descendent.", "Buste qui pivote vers l'avant."],
  },

  // ------------------------------------------ 4.8 Chevilles, genoux et tendons
  {
    id: "bulgares_tempo",
    nom: "Fentes bulgares tempo 3 s / 3 s",
    groupe: "chevilles",
    muscles: "quadriceps, fessiers, tendon rotulien, stabilité du genou.",
    materiel: "banc, un ou deux haltères.",
    positionDepart:
      "dos au banc, un pied posé derrière sur le banc (dessus du pied à plat), l'autre pied au sol environ un grand pas en avant. Haltères le long du corps.",
    execution: [
      "Descends en 3 secondes en pliant la jambe avant, jusqu'à ce que la cuisse avant soit presque parallèle au sol.",
      "Remonte en 3 secondes en poussant dans le talon avant.",
    ],
    pointsCles: [
      "Le genou avant suit l'axe du pied (il ne rentre pas vers l'intérieur).",
      "Le buste peut être légèrement penché vers l'avant.",
    ],
    erreurs: ["Pied avant trop près du banc.", "Genou qui rentre."],
    note: "Les tendons se renforcent sous des charges lourdes et des mouvements lents, d'où le tempo de 3 secondes.",
  },
  {
    id: "mollets_tempo",
    nom: "Mollets sur une jambe tempo 3 s / 3 s",
    groupe: "chevilles",
    muscles: "mollets, tendon d'Achille.",
    materiel: "une marche ou un rebord stable, un haltère.",
    positionDepart:
      "debout sur une jambe, l'avant du pied sur le rebord, talon dans le vide. Haltère dans la main du même côté, l'autre main se tient à un support pour l'équilibre.",
    execution: [
      "Descends le talon en 3 secondes le plus bas possible (étirement du mollet).",
      "Monte en 3 secondes sur la pointe du pied, le plus haut possible.",
    ],
    pointsCles: ["Amplitude complète, aucun rebond en bas."],
  },
  {
    id: "releves_pointes",
    nom: "Relevés de pointes dos au mur",
    groupe: "chevilles",
    muscles:
      "jambier antérieur (muscle devant le tibia), prévention des douleurs au tibia en course.",
    positionDepart:
      "dos et fesses contre un mur, talons à environ 30 cm du mur, jambes tendues.",
    execution: [
      "Relève les pointes de pied vers les tibias le plus haut possible, puis repose-les lentement.",
    ],
    plusDifficile: "Talons plus loin du mur.",
  },
  {
    id: "chaise_mur",
    nom: "Chaise contre le mur",
    groupe: "chevilles",
    muscles: "quadriceps, tendon rotulien (isométrie).",
    positionDepart:
      "dos plaqué au mur, descends jusqu'à ce que les cuisses soient parallèles au sol, genoux à 90° au-dessus des chevilles.",
    execution: ["Tiens la position pendant la durée indiquée."],
    erreurs: ["Genoux qui dépassent les orteils.", "Dos qui décolle du mur."],
  },

  // --------------------------------------------------------------- 4.9 Avant-bras
  {
    id: "curl_poignets",
    nom: "Curl poignets",
    groupe: "avant-bras",
    muscles: "fléchisseurs des avant-bras (face intérieure).",
    materiel: "deux haltères.",
    positionDepart:
      "assis, avant-bras posés sur les cuisses ou sur le banc, paumes vers le haut, poignets dans le vide, haltères en main.",
    execution: [
      "Laisse les haltères descendre en déroulant les doigts, puis referme la main et monte le poignet le plus haut possible.",
      "Seuls les poignets bougent.",
    ],
  },
  {
    id: "ext_poignets",
    nom: "Extension des poignets",
    groupe: "avant-bras",
    muscles: "extenseurs des avant-bras (face extérieure), équilibre avec les fléchisseurs.",
    materiel: "deux haltères légers.",
    execution: [
      "Même position que curl_poignets, mais paumes vers le sol.",
      "Monte le dos de la main vers le plafond, puis redescends.",
    ],
    pointsCles: ["Charges légères."],
  },
  {
    id: "curl_inverse",
    nom: "Curl inversé",
    groupe: "avant-bras",
    muscles: "dessus des avant-bras, brachial.",
    materiel: "deux haltères.",
    execution: [
      "Comme un curl classique, mais paumes tournées vers le sol pendant tout le mouvement.",
    ],
    pointsCles: ["Poignets droits, ne pas les casser."],
  },
  {
    id: "farmer_hold",
    nom: "Tenue d'haltères lourds",
    groupe: "avant-bras",
    muscles: "préhension, avant-bras, trapèzes, gainage.",
    materiel: "les deux haltères les plus lourds disponibles.",
    execution: [
      "Debout, prends les deux haltères les plus lourds disponibles, bras le long du corps, épaules basses et en arrière, et tiens pendant la durée indiquée.",
      "Arrête quand la prise lâche.",
    ],
  },

  // -------------------------------------------- 4.10 Visage et mâchoire (maison)
  {
    id: "chin_tucks",
    nom: "Rentrés de menton",
    groupe: "visage",
    muscles: "fléchisseurs profonds du cou, posture de la nuque.",
    execution: [
      "Assis ou debout, regard droit devant, recule le menton horizontalement (comme pour faire un double menton), sans baisser la tête.",
      "Tiens 3 secondes, relâche.",
    ],
    note: "Améliore la posture de la tête et du cou, ce qui joue sur l'apparence de la ligne cou/mâchoire.",
  },
  {
    id: "chewing_gum",
    nom: "Mastication de chewing-gum dur (facultatif)",
    groupe: "visage",
    muscles: "masséters (muscles de la mâchoire).",
    execution: ["Mâcher en alternant les deux côtés, 5 minutes, 2 fois par jour au maximum."],
    pointsCles: [
      "Précaution : la mastication quotidienne prolongée est associée à des troubles de l'articulation de la mâchoire. Arrêt immédiat en cas de douleur, claquement ou gêne à l'ouverture de la bouche.",
    ],
    note: "Les preuves d'un effet esthétique sont faibles. Le facteur le plus déterminant pour une mâchoire marquée est un taux de masse grasse bas.",
  },
];

/** Index par identifiant, pour les recherches depuis les séances et les routes. */
export const EXERCICES_PAR_ID: Record<string, Exercice> = Object.fromEntries(
  EXERCICES.map((e) => [e.id, e]),
);

export function getExercice(id: string): Exercice | undefined {
  return EXERCICES_PAR_ID[id];
}
