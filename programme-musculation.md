# Programme de musculation de Benjamin

Document de référence destiné à servir de base à une application mobile de suivi d'entraînement. Il contient le contexte, les principes d'entraînement, le planning hebdomadaire complet et la fiche détaillée de chaque exercice.

Chaque exercice possède un identifiant unique (`id`) utilisé dans le planning, pour que l'application puisse relier un jour d'entraînement aux fiches exercices sans dupliquer les descriptions.

---

## 1. Contexte

**Objectif** : hypertrophie maximale (prise de muscle visible) sur les groupes prioritaires, et renforcement articulaire.

**Priorités musculaires, dans l'ordre** :
1. Pectoraux
2. Dos, avec un focus sur les lombaires
3. Triceps
4. Biceps
5. Abdominaux
6. Épaules et nuque
7. Visage et mâchoire
8. Renforcement chevilles, genoux et articulations
9. Avant-bras

**Fréquence** : 5 séances par semaine, plus de la course à pied à côté (volume et type de sorties encore à préciser). Pas de séance jambes dédiée : la course couvre une partie de ce travail, et le bloc chevilles/genoux complète.

**Matériel disponible** :
1. Salle : un banc (plat, inclinable à confirmer) et des haltères jusqu'à 30 kg, plus le sol. Aucune machine.
2. Parc de street workout proche : barre de traction, barres parallèles, barres basses. Aucun poids sur place, tout se fait au poids du corps (un sac à dos lesté peut être apporté).

---

## 2. Principes d'entraînement

Ces règles s'appliquent à toutes les séances. Elles reposent sur les méta-analyses récentes en science de l'entraînement (voir section 7).

### 2.1 Vocabulaire

**RIR (Reps In Reserve)** : nombre de répétitions qu'il resterait possible de faire à la fin d'une série. RIR 0 = échec (impossible de faire une répétition de plus). RIR 2 = on s'arrête alors qu'on pourrait encore en faire 2.

**Tempo** : vitesse d'exécution. « Tempo 3 s / 3 s » signifie 3 secondes pour monter et 3 secondes pour descendre.

**Position étirée** : moment du mouvement où le muscle ciblé est le plus allongé (par exemple, le bas du développé couché pour les pectoraux). C'est la partie la plus productive pour la prise de muscle : ne jamais la raccourcir.

**Échec** : moment où une répétition supplémentaire n'est plus possible avec une technique correcte.

### 2.2 Règles générales

1. **Volume** : 2 à 3 séries par exercice. Au-delà, chaque série supplémentaire rapporte de moins en moins par rapport à la fatigue qu'elle ajoute.
2. **Intensité** :
   1. Gros exercices poly-articulaires (développés, rowing buste penché, développé militaire) : RIR 1 à 2.
   2. Soulevé de terre jambes tendues : RIR 2, jamais à l'échec (risque pour le dos).
   3. Exercices d'isolation et exercices au poids du corps : RIR 0 à 1.
3. **Repos entre les séries** : 90 s à 2 min sur les gros exercices, 60 à 90 s sur l'isolation. Au-delà de 90 s, aucun gain supplémentaire mesurable sur la prise de muscle.
4. **Amplitude** : toujours complète, en insistant sur la position étirée.
5. **Progression (double progression)** : chaque exercice a une fourchette de répétitions (ex. 8 à 12). Quand tu atteins le haut de la fourchette sur toutes les séries, tu augmentes la charge la séance suivante et tu repars du bas de la fourchette.
6. **Progression sans charge supplémentaire** (au parc ou quand les 30 kg deviennent trop légers) : ralentir la descente à 3 ou 4 s, ajouter une pause d'1 à 2 s en position étirée, passer à une variante plus difficile, ou lester avec un sac à dos.
7. **Charges légères** : elles font grossir le muscle autant que les charges lourdes, à condition de s'approcher de l'échec. Les limites du matériel ne sont donc pas un frein.
8. **Séries d'échauffement** : 1 à 2 séries légères avant le premier exercice de chaque séance. Elles ne comptent pas dans le volume.

### 2.3 Échauffement standard (10 minutes, avant chaque séance)

1. Mobilité des chevilles : cercles de cheville, 10 par sens et par pied.
2. Mobilité des genoux et hanches : 10 squats au poids du corps lents.
3. Mobilité des épaules : 10 cercles de bras vers l'avant, 10 vers l'arrière.
4. Équilibre sur une jambe : 2 × 30 s par jambe, genou légèrement fléchi (yeux fermés pour corser).
5. 1 à 2 séries légères du premier exercice de la séance.

---

## 3. Planning hebdomadaire

| Jour | Contenu | Lieu |
|---|---|---|
| Lundi | Pecs (lourd) + Triceps + Abdos | Salle |
| Mardi | Dos + Lombaires (lourd) + Biceps + Avant-bras | Salle |
| Mercredi | Épaules + Nuque + Chevilles/genoux + Abdos | Salle |
| Jeudi | Repos salle (course possible) | |
| Vendredi | Pecs (volume) + Dos + Lombaires légères + Abdos | Parc |
| Samedi | Bras + Épaules légères + Avant-bras + Nuque + Tendons | Salle |
| Dimanche | Repos salle (course possible) | |

**Placement de la course** : de préférence jeudi et dimanche. Éviter une sortie longue ou intense la veille du mardi (lombaires) et du mercredi (jambes et tendons). Si une course tombe un jour de salle, la faire après la séance ou à un autre moment de la journée.

### Lundi : Pecs lourd + Triceps + Abdos (salle)

| Ordre | id | Exercice | Séries × reps | Repos | RIR | Consigne |
|---|---|---|---|---|---|---|
| 1 | `dc_halteres` | Développé couché haltères | 3 × 6 à 10 | 2 min | 1 à 2 | Descente lente, étirement complet en bas |
| 2 | `dev_incline` | Développé incliné haltères (si banc plat : `dc_paumes_face`) | 3 × 8 à 12 | 2 min | 1 à 2 | |
| 3 | `ecarte_couche` | Écarté couché haltères | 2 × 10 à 15 | 90 s | 0 à 1 | Pause 1 s en bas |
| 4 | `pullover` | Pullover haltère | 2 × 10 à 15 | 90 s | 1 | |
| 5 | `ext_nuque_2mains` | Extension nuque à deux mains | 3 × 10 à 15 | 90 s | 0 à 1 | Exercice triceps prioritaire |
| 6 | `barre_front` | Barre au front haltères | 2 × 10 à 15 | 90 s | 0 à 1 | |
| 7 | `crunch_leste` | Crunch lesté | 3 × 10 à 20 | 60 s | 0 à 1 | |
| 8 | `releves_jambes_sol` | Relevés de jambes au sol | 2 × 12 à 20 | 60 s | 0 à 1 | |

### Mardi : Dos + Lombaires + Biceps + Avant-bras (salle)

| Ordre | id | Exercice | Séries × reps | Repos | RIR | Consigne |
|---|---|---|---|---|---|---|
| 1 | `rowing_1bras` | Rowing un bras, appui banc | 3 × 8 à 12 par bras | 90 s | 1 | Laisser l'épaule descendre en bas |
| 2 | `rowing_penche` | Rowing buste penché deux haltères | 3 × 10 à 12 | 2 min | 1 à 2 | |
| 3 | `sdt_jambes_tendues` | Soulevé de terre jambes tendues | 2 × 8 à 10 | 2 min | 2 | Jamais à l'échec |
| 4 | `superman_leste` | Superman lesté | 3 × 10 à 15, pause 2 s en haut | 90 s | 1 | Exercice lombaire principal |
| 5 | `curl_couche` | Curl couché bras pendants (sinon `curl_alterne`) | 3 × 8 à 12 | 90 s | 0 à 1 | |
| 6 | `curl_marteau` | Curl marteau | 2 × 10 à 15 | 60 à 90 s | 0 à 1 | |
| 7 | `curl_poignets` | Curl poignets | 2 × 15 à 25 | 60 s | 0 | |
| 8 | `farmer_hold` | Tenue d'haltères lourds | 2 × 30 à 60 s | 60 s | | Charge maximale tenable |

### Mercredi : Épaules + Nuque + Chevilles/genoux + Abdos (salle)

| Ordre | id | Exercice | Séries × reps | Repos | RIR | Consigne |
|---|---|---|---|---|---|---|
| 1 | `dev_militaire` | Développé militaire assis | 3 × 8 à 12 | 2 min | 1 à 2 | |
| 2 | `elev_lat_penchees` | Élévations latérales penchées | 3 × 12 à 20 par bras | 60 s | 0 | |
| 3 | `oiseau` | Oiseau | 2 × 12 à 20 | 60 s | 0 à 1 | |
| 4 | `ext_nuque_ventre` | Extension de nuque à plat ventre | 2 × 15 à 20 | 60 s | 2 | Aucune secousse |
| 5 | `flex_nuque_dos` | Flexion de nuque sur le dos | 2 × 15 à 20 | 60 s | 2 | Aucune secousse |
| 6 | `bulgares_tempo` | Fentes bulgares tempo 3 s / 3 s | 3 × 6 à 10 par jambe | 90 s | 1 à 2 | Lourd et lent |
| 7 | `mollets_tempo` | Mollets sur une jambe tempo 3 s / 3 s | 3 × 8 à 12 par jambe | 60 s | 1 | |
| 8 | `releves_pointes` | Relevés de pointes dos au mur | 2 × 15 à 25 | 45 s | 0 à 1 | |
| 9 | `planche` | Planche | 2 × 45 à 60 s | 45 s | | |
| 10 | `planche_laterale` | Planche latérale | 2 × 30 à 45 s par côté | 45 s | | |

### Vendredi : Pecs volume + Dos + Lombaires légères + Abdos (parc)

| Ordre | id | Exercice | Séries × reps | Repos | RIR | Consigne |
|---|---|---|---|---|---|---|
| 1 | `tractions` | Tractions pronation (sinon `tractions_negatives`) | 3 × 6 à 12 | 2 min | 1 | Bras tendus en bas |
| 2 | `dips_penche` | Dips buste penché | 3 × 8 à 20 | 90 s | 1 | Descente 3 s |
| 3 | `rowing_australien` | Rowing australien | 3 × 10 à 20 | 90 s | 0 à 1 | |
| 4 | `pompes_surelevees` | Pompes pieds surélevés | 2 × max moins 1 | 90 s | 1 | |
| 5 | `pompes_deficit` | Pompes en déficit | 2 × max moins 1 | 90 s | 1 | |
| 6 | `releves_genoux_suspendus` | Relevés de genoux suspendus | 3 × 10 à 15 | 60 s | 0 à 1 | |
| 7 | `tenue_superman` | Tenue superman (ou `bird_dog`) | 2 × 30 s | 45 s | | Léger, lombaires en endurance |

### Samedi : Bras + Épaules légères + Avant-bras + Nuque + Tendons (salle)

| Ordre | id | Exercice | Séries × reps | Repos | RIR | Consigne |
|---|---|---|---|---|---|---|
| 1 | `dc_prise_serree` | Développé couché prise serrée | 2 × 8 à 12 | 90 s | 1 | |
| 2 | `ext_triceps_1bras` | Extension triceps un bras au-dessus de la tête | 2 × 10 à 15 par bras | 60 s | 0 à 1 | |
| 3 | `curl_concentre` | Curl concentré | 2 × 10 à 15 par bras | 60 s | 0 | |
| 4 | `curl_marteau` | Curl marteau | 2 × 10 à 15 | 60 s | 0 à 1 | |
| 5 | `elev_laterales` | Élévations latérales | 3 × 15 à 25 | 60 s | 0 | |
| 6 | `oiseau` | Oiseau | 2 × 15 à 20 | 60 s | 0 à 1 | |
| 7 | `iso_nuque` | Isométrie nuque 4 directions | 1 × 20 s par direction | 30 s | | |
| 8 | `curl_inverse` | Curl inversé | 2 × 12 à 15 | 60 s | 0 à 1 | |
| 9 | `ext_poignets` | Extension des poignets | 2 × 15 à 20 | 45 s | 0 | |
| 10 | `mollets_tempo` | Mollets sur une jambe tempo 3 s / 3 s | 2 × 8 à 12 par jambe | 60 s | 1 | |
| 11 | `chaise_mur` | Chaise contre le mur | 2 × 45 s | 60 s | | |

### Chaque jour, à la maison (5 minutes)

| id | Exercice | Dosage |
|---|---|---|
| `chin_tucks` | Rentrés de menton | 3 × 10, tenus 3 s |
| `chewing_gum` | Mastication de chewing-gum dur (facultatif) | 5 min, 2 fois par jour maximum |

### Volume hebdomadaire obtenu

| Groupe | Séries directes par semaine |
|---|---|
| Pectoraux | environ 15 |
| Dos | environ 14 |
| Lombaires | 1 séance lourde (mardi) + 1 légère (vendredi) |
| Triceps | environ 9, plus beaucoup de travail indirect via les développés et les dips |
| Biceps | environ 9, plus le travail indirect via les tractions et rowings |
| Abdominaux | environ 12, sur 3 jours |
| Épaules | 6 séries latérales, 4 séries arrière, l'avant est travaillé par les développés |
| Nuque | 2 séances |
| Chevilles et genoux | 2 séances |
| Avant-bras | environ 8, plus le travail de préhension des tractions et rowings |

---

## 4. Fiches exercices

Format de chaque fiche : muscles ciblés, matériel, position de départ, exécution étape par étape, points clés, erreurs fréquentes, variantes plus facile et plus difficile.

### 4.1 Pectoraux

#### `dc_halteres` : Développé couché haltères
**Muscles** : pectoraux, avant des épaules, triceps.
**Matériel** : banc plat, deux haltères.
**Position de départ** : assis au bout du banc, haltères posés sur les cuisses. Allonge-toi en ramenant les haltères contre la poitrine, puis pousse-les bras tendus au-dessus des épaules. Pieds à plat au sol, omoplates serrées l'une contre l'autre et tirées vers le bas, légère cambrure naturelle.
**Exécution** :
1. Descends les haltères en 2 à 3 secondes vers les côtés de la poitrine, coudes à environ 45° du corps (pas collés, pas à 90°).
2. Descends jusqu'à sentir un étirement franc des pectoraux, haltères au niveau de la poitrine ou légèrement en dessous.
3. Pousse vers le haut en rapprochant légèrement les haltères, jusqu'à tendre les bras sans verrouiller brutalement les coudes.
**Points clés** : les omoplates restent serrées pendant toute la série. La descente est lente et contrôlée.
**Erreurs fréquentes** : rebondir en bas, raccourcir l'amplitude, décoller les fesses du banc, coudes à 90° (stress sur les épaules).
**Plus facile** : pompes classiques. **Plus difficile** : tempo 4 s en descente, pause 2 s en bas.

#### `dev_incline` : Développé incliné haltères
**Muscles** : haut des pectoraux, avant des épaules, triceps.
**Matériel** : banc incliné à environ 30°, deux haltères.
**Position de départ** : comme le développé couché, dossier incliné à 30° (au-delà, les épaules prennent le relais).
**Exécution** : identique à `dc_halteres`, les haltères descendent vers le haut de la poitrine, sous les clavicules.
**Points clés** : 30° suffisent. Omoplates serrées.
**Erreurs fréquentes** : banc trop incliné, décoller le dos du dossier.
**Remplacement si le banc est plat** : `dc_paumes_face`.

#### `dc_paumes_face` : Développé couché paumes face à face
**Muscles** : pectoraux, triceps, plus doux pour les épaules.
**Matériel** : banc plat, deux haltères.
**Exécution** : comme `dc_halteres`, mais les paumes restent tournées l'une vers l'autre pendant tout le mouvement et les coudes restent plus proches du corps (environ 30°).
**Points clés** : descente jusqu'à l'étirement des pectoraux.

#### `ecarte_couche` : Écarté couché haltères
**Muscles** : pectoraux, en isolation et en étirement.
**Matériel** : banc plat, deux haltères plus légers que pour le développé.
**Position de départ** : allongé, haltères au-dessus de la poitrine, paumes face à face, coudes légèrement fléchis (environ 20°).
**Exécution** :
1. Ouvre les bras sur les côtés en arc de cercle, en gardant le même angle de coude, jusqu'à sentir un étirement marqué des pectoraux (haltères à hauteur de la poitrine).
2. Marque une pause d'1 seconde en bas.
3. Referme les bras en arc de cercle comme pour enlacer un gros tronc d'arbre, jusqu'à ce que les haltères se rapprochent au-dessus de la poitrine.
**Points clés** : l'angle des coudes ne change pas. Le travail se fait dans l'étirement.
**Erreurs fréquentes** : plier les coudes en descendant (ça devient un développé), descendre trop bas au point de ressentir une gêne à l'avant de l'épaule.

#### `pullover` : Pullover haltère
**Muscles** : pectoraux et grand dorsal, en étirement.
**Matériel** : banc plat, un haltère.
**Position de départ** : allongé dans la longueur du banc, tête au bout. Tiens un haltère à deux mains par le disque supérieur, bras presque tendus au-dessus de la poitrine.
**Exécution** :
1. Descends l'haltère derrière la tête en arc de cercle, bras presque tendus, jusqu'à ce que les bras soient à peu près alignés avec le buste et que tu sentes l'étirement des pectoraux et du dos.
2. Ramène l'haltère au-dessus de la poitrine par le même chemin.
**Points clés** : coudes légèrement fléchis et fixes. Les côtes restent basses, ne cambre pas excessivement.
**Erreurs fréquentes** : plier les coudes pendant le mouvement, descendre au-delà de la mobilité de l'épaule.

#### `dips_penche` : Dips buste penché
**Muscles** : bas des pectoraux, triceps, avant des épaules.
**Matériel** : barres parallèles du parc.
**Position de départ** : en appui bras tendus sur les barres, jambes fléchies et croisées derrière, buste penché vers l'avant (environ 30°).
**Exécution** :
1. Descends en 3 secondes en pliant les coudes, qui partent légèrement vers l'extérieur, en gardant le buste penché.
2. Descends jusqu'à ce que les épaules arrivent au niveau des coudes (étirement des pectoraux), sans aller au-delà si l'épaule tire.
3. Remonte en poussant jusqu'aux bras tendus.
**Points clés** : le buste penché cible les pectoraux. Buste droit = surtout triceps.
**Erreurs fréquentes** : épaules qui remontent vers les oreilles, descente trop profonde et brutale.
**Plus facile** : dips avec les pieds posés sur une barre basse, ou négatives (descente lente seulement). **Plus difficile** : sac à dos lesté.

#### `pompes_surelevees` : Pompes pieds surélevés
**Muscles** : haut des pectoraux, avant des épaules, triceps.
**Matériel** : banc ou barre basse du parc pour poser les pieds.
**Position de départ** : mains au sol légèrement plus écartées que les épaules, pieds posés sur le support, corps gainé et aligné de la tête aux talons.
**Exécution** :
1. Descends en 2 à 3 secondes jusqu'à ce que la poitrine frôle le sol, coudes à environ 45° du corps.
2. Remonte en poussant jusqu'aux bras tendus.
**Points clés** : les fesses ne montent pas et le bassin ne s'affaisse pas.
**Erreurs fréquentes** : amplitude incomplète, hanches qui tombent.
**Plus difficile** : support plus haut, sac à dos lesté, pause en bas.

#### `pompes_deficit` : Pompes en déficit
**Muscles** : pectoraux, avec un étirement plus grand qu'une pompe classique.
**Matériel** : deux barres basses parallèles ou deux supports stables de même hauteur.
**Position de départ** : mains sur les deux supports, pieds au sol, corps aligné.
**Exécution** :
1. Descends lentement entre les supports jusqu'à ce que la poitrine passe sous le niveau des mains, sans douleur à l'épaule.
2. Marque une courte pause dans l'étirement, puis remonte.
**Points clés** : la profondeur supplémentaire est tout l'intérêt de l'exercice.
**Erreurs fréquentes** : descendre trop vite et trop bas dès les premières séances. Augmente la profondeur progressivement.

### 4.2 Dos et lombaires

#### `rowing_1bras` : Rowing un bras, appui banc
**Muscles** : grand dorsal, milieu du dos, arrière des épaules, biceps.
**Matériel** : banc plat, un haltère.
**Position de départ** : genou et main du même côté posés sur le banc, l'autre pied au sol un peu en arrière. Dos plat et parallèle au sol. L'autre main tient l'haltère bras tendu sous l'épaule.
**Exécution** :
1. Laisse l'épaule descendre vers le sol pour étirer le dos en bas du mouvement.
2. Tire l'haltère vers la hanche (pas vers l'épaule), en menant avec le coude, jusqu'à ce que le coude dépasse le niveau du dos.
3. Serre l'omoplate une seconde, puis redescends lentement jusqu'à l'étirement complet.
**Points clés** : le chemin de l'haltère va vers la hanche. Le buste ne tourne pas.
**Erreurs fréquentes** : tirer avec le biceps, faire pivoter le buste pour tricher, amplitude raccourcie en bas.

#### `rowing_penche` : Rowing buste penché deux haltères
**Muscles** : dos dans son ensemble, lombaires en gainage.
**Matériel** : deux haltères.
**Position de départ** : debout, pieds largeur de hanches, genoux légèrement fléchis. Penche le buste vers l'avant à environ 45° en poussant les fesses vers l'arrière, dos plat. Haltères bras tendus sous les épaules.
**Exécution** :
1. Tire les deux haltères vers le bas du ventre en serrant les omoplates.
2. Redescends lentement jusqu'aux bras tendus.
**Points clés** : le dos reste plat et l'angle du buste ne change pas pendant la série.
**Erreurs fréquentes** : dos qui s'arrondit, buste qui se relève à chaque répétition pour aider.

#### `sdt_jambes_tendues` : Soulevé de terre jambes tendues (roumain) aux haltères
**Muscles** : ischio-jambiers, fessiers, lombaires en maintien.
**Matériel** : deux haltères.
**Position de départ** : debout, pieds largeur de hanches, haltères devant les cuisses, genoux légèrement fléchis et fixes.
**Exécution** :
1. Pousse les fesses vers l'arrière en inclinant le buste vers l'avant, dos parfaitement plat, haltères qui glissent le long des jambes.
2. Descends jusqu'à sentir un fort étirement à l'arrière des cuisses (en général mi-tibia au maximum). Arrête-toi avant que le bas du dos ne commence à s'arrondir.
3. Remonte en poussant les hanches vers l'avant et en serrant les fessiers.
**Points clés** : c'est un mouvement de hanche, pas de dos. Toujours 2 répétitions de marge.
**Erreurs fréquentes** : dos arrondi, genoux qui se plient trop (ça devient un squat), haltères qui s'éloignent des jambes.
**Note** : cet exercice renforce peu les lombaires de façon isolée selon la recherche. Le travail lombaire spécifique est assuré par `superman_leste`.

#### `superman_leste` : Superman lesté
**Muscles** : muscles lombaires (érecteurs du rachis), fessiers.
**Matériel** : sol, un haltère léger (2 à 8 kg au début).
**Position de départ** : allongé sur le ventre, bras tendus devant toi, haltère tenu à deux mains.
**Exécution** :
1. Décolle simultanément les bras, la poitrine et les jambes du sol en contractant le bas du dos et les fessiers.
2. Tiens la position haute 2 secondes.
3. Redescends lentement.
**Points clés** : regard vers le sol pour ne pas casser la nuque. Mouvement contrôlé, sans élan.
**Erreurs fréquentes** : lancer le mouvement avec de l'élan, hyperextension de la nuque.
**Plus facile** : sans haltère, ou haltère tenu contre la poitrine. **Plus difficile** : haltère plus lourd, pause de 3 à 5 s.

#### `tenue_superman` : Tenue superman
**Muscles** : lombaires en endurance.
**Exécution** : même position haute que `superman_leste`, sans charge, tenue pendant le temps indiqué.

#### `bird_dog` : Bird dog
**Muscles** : lombaires, gainage profond.
**Position de départ** : à quatre pattes, mains sous les épaules, genoux sous les hanches, dos plat.
**Exécution** :
1. Tends en même temps le bras droit devant et la jambe gauche derrière, jusqu'à ce qu'ils soient alignés avec le dos.
2. Tiens 2 secondes sans que le bassin ne bascule.
3. Reviens et change de côté.
**Points clés** : on pourrait poser un verre d'eau sur le bas du dos sans le renverser.

#### `tractions` : Tractions pronation
**Muscles** : grand dorsal, biceps, arrière des épaules.
**Matériel** : barre de traction du parc.
**Position de départ** : suspendu à la barre, paumes vers l'avant, mains un peu plus écartées que les épaules, bras complètement tendus.
**Exécution** :
1. Abaisse d'abord les épaules (éloigne-les des oreilles), puis tire en menant avec les coudes vers les côtes.
2. Monte jusqu'à passer le menton au-dessus de la barre.
3. Redescends en 2 à 3 secondes jusqu'aux bras complètement tendus.
**Points clés** : amplitude complète en bas, c'est la position étirée du dos.
**Erreurs fréquentes** : balancer les jambes, demi-répétitions sans tendre les bras.
**Plus facile** : `tractions_negatives`. **Plus difficile** : sac à dos lesté.

#### `tractions_negatives` : Tractions négatives
**Exécution** : monte en sautant ou avec un appui jusqu'à la position menton au-dessus de la barre, puis redescends le plus lentement possible (5 secondes) jusqu'aux bras tendus. Remplace les tractions tant que tu ne fais pas au moins 5 répétitions complètes.

#### `rowing_australien` : Rowing australien
**Muscles** : milieu du dos, arrière des épaules, biceps.
**Matériel** : barre basse du parc (hauteur de hanche environ).
**Position de départ** : sous la barre, mains en pronation largeur d'épaules, bras tendus, corps gainé et droit, talons au sol.
**Exécution** :
1. Tire la poitrine vers la barre en serrant les omoplates.
2. Redescends lentement jusqu'aux bras tendus.
**Points clés** : le corps reste rigide comme une planche.
**Plus facile** : genoux fléchis, pieds à plat. **Plus difficile** : pieds surélevés, corps plus horizontal, pause en haut.

### 4.3 Triceps

#### `ext_nuque_2mains` : Extension nuque à deux mains
**Muscles** : triceps, surtout la longue portion (la plus volumineuse).
**Matériel** : un haltère, banc pour s'asseoir.
**Position de départ** : assis dos droit, haltère tenu à deux mains par le disque supérieur, bras tendus au-dessus de la tête.
**Exécution** :
1. Descends l'haltère derrière la tête en pliant uniquement les coudes, jusqu'à un étirement marqué des triceps.
2. Tends les bras pour remonter.
**Points clés** : les coudes pointent vers l'avant et restent proches de la tête. Cette position bras levés a produit nettement plus de croissance des triceps que les extensions bras le long du corps.
**Erreurs fréquentes** : coudes qui s'écartent, dos qui se cambre.

#### `barre_front` : Barre au front haltères
**Muscles** : triceps.
**Matériel** : banc plat, deux haltères.
**Position de départ** : allongé, haltères tenus bras tendus au-dessus de la poitrine, paumes face à face.
**Exécution** :
1. Plie les coudes pour descendre les haltères de chaque côté de la tête, jusqu'au niveau des oreilles.
2. Tends les bras pour remonter.
**Points clés** : les coudes restent fixes et pointés vers le plafond. Tu peux incliner légèrement les bras vers l'arrière pour étirer davantage.
**Erreurs fréquentes** : coudes qui s'ouvrent, bras qui bougent (ça devient un développé).

#### `dc_prise_serree` : Développé couché prise serrée
**Muscles** : triceps en priorité, pectoraux.
**Exécution** : comme `dc_halteres`, mais les haltères se touchent presque, paumes face à face, et les coudes frôlent le corps pendant la descente.

#### `ext_triceps_1bras` : Extension triceps un bras au-dessus de la tête
**Muscles** : triceps, longue portion.
**Matériel** : un haltère.
**Position de départ** : assis ou debout, haltère tenu d'une main bras tendu au-dessus de la tête. L'autre main soutient le bras de travail au niveau du coude.
**Exécution** :
1. Descends l'haltère derrière la tête en pliant le coude, jusqu'à l'étirement du triceps.
2. Tends le bras.
**Points clés** : le coude reste pointé vers le plafond.

### 4.4 Biceps

#### `curl_couche` : Curl couché bras pendants
**Muscles** : biceps, en position étirée.
**Matériel** : banc plat assez haut pour que les haltères ne touchent pas le sol bras tendus.
**Position de départ** : allongé sur le dos, bras pendants de chaque côté du banc, paumes vers le plafond. Les bras sont en arrière du corps, ce qui étire le biceps.
**Exécution** :
1. Plie les coudes pour monter les haltères vers les épaules sans avancer les bras.
2. Redescends lentement jusqu'à l'extension complète.
**Points clés** : les bras restent pendants vers le sol, seuls les avant-bras bougent.
**Remplacement si le banc est trop bas** : `curl_alterne`.

#### `curl_alterne` : Curl haltères alterné
**Muscles** : biceps.
**Position de départ** : debout, haltères le long du corps, paumes tournées vers les cuisses.
**Exécution** :
1. Monte un haltère vers l'épaule en tournant la paume vers le haut pendant la montée.
2. Redescends lentement jusqu'au bras complètement tendu, puis l'autre bras.
**Erreurs fréquentes** : balancer le buste, coudes qui avancent.

#### `curl_marteau` : Curl marteau
**Muscles** : biceps, brachial (muscle sous le biceps qui épaissit le bras), avant-bras.
**Exécution** : comme `curl_alterne`, mais paumes tournées l'une vers l'autre pendant tout le mouvement, comme si tu tenais un marteau. Les deux bras peuvent travailler ensemble ou en alterné.

#### `curl_concentre` : Curl concentré
**Muscles** : biceps, en isolation stricte.
**Position de départ** : assis au bout du banc, jambes écartées, buste penché. Le dos du bras qui travaille est calé contre l'intérieur de la cuisse, haltère bras tendu.
**Exécution** :
1. Monte l'haltère vers l'épaule en pliant le coude.
2. Contracte une seconde en haut, redescends lentement jusqu'au bras tendu.
**Points clés** : le bras ne bouge pas, impossible de tricher.

### 4.5 Épaules

#### `dev_militaire` : Développé militaire assis
**Muscles** : épaules (surtout l'avant et le milieu), triceps.
**Matériel** : banc avec dossier relevé à la verticale (sinon assis sans dossier, dos gainé), deux haltères.
**Position de départ** : assis, dos calé, haltères à hauteur d'épaules, paumes vers l'avant, coudes légèrement en avant du corps.
**Exécution** :
1. Pousse les haltères au-dessus de la tête jusqu'aux bras tendus.
2. Redescends lentement jusqu'à hauteur d'oreilles ou légèrement en dessous.
**Erreurs fréquentes** : cambrer le bas du dos, descendre à moitié.

#### `elev_lat_penchees` : Élévations latérales penchées
**Muscles** : milieu des épaules (c'est lui qui donne la largeur), en position étirée.
**Matériel** : un haltère, un support fixe (montant, poteau, rack).
**Position de départ** : debout à côté du support, tiens-le d'une main et penche-toi de côté en éloignant le corps du support (environ 15 à 20°). L'haltère est dans la main libre, bras pendant devant la hanche.
**Exécution** :
1. Monte le bras sur le côté, coude légèrement fléchi, jusqu'à hauteur d'épaule.
2. Redescends lentement jusqu'à ce que l'haltère passe devant le corps (position étirée).
**Points clés** : l'inclinaison augmente la tension en bas du mouvement. Mène avec le coude, pas avec la main.
**Erreurs fréquentes** : hausser l'épaule vers l'oreille, prendre de l'élan.

#### `elev_laterales` : Élévations latérales
**Muscles** : milieu des épaules.
**Position de départ** : debout, haltères le long du corps, coudes légèrement fléchis.
**Exécution** : monte les deux bras sur les côtés jusqu'à hauteur d'épaules, puis redescends lentement.
**Points clés** : charges légères, séries longues, pas d'élan.

#### `oiseau` : Oiseau (élévations buste penché)
**Muscles** : arrière des épaules, haut du dos.
**Position de départ** : debout ou assis au bout du banc, buste penché presque parallèle au sol, dos plat, haltères pendants sous la poitrine, paumes face à face.
**Exécution** :
1. Ouvre les bras sur les côtés, coudes légèrement fléchis, comme des ailes, jusqu'à hauteur du dos.
2. Redescends lentement.
**Erreurs fréquentes** : serrer les omoplates au point de transformer l'exercice en rowing, charges trop lourdes.

### 4.6 Nuque

Règle de sécurité pour toute la section : mouvements lents et sans aucune secousse, progression très graduelle, arrêt immédiat en cas de douleur, d'engourdissement ou de fourmillement.

#### `ext_nuque_ventre` : Extension de nuque à plat ventre
**Muscles** : muscles arrière du cou (splénius, semi-épineux).
**Matériel** : banc plat.
**Position de départ** : allongé sur le ventre, les épaules au bord du banc, la tête dans le vide. Menton légèrement rentré, tête qui pend vers le sol.
**Exécution** :
1. Relève lentement la tête vers l'arrière jusqu'à ce qu'elle soit alignée avec le buste ou légèrement au-dessus.
2. Redescends lentement.
**Résistance** : au début, le poids de la tête suffit. Ensuite, pose une main à l'arrière du crâne et appuie modérément contre le mouvement (résistance manuelle).
**Points clés** : amplitude confortable, jamais forcée en fin de course.

#### `flex_nuque_dos` : Flexion de nuque sur le dos
**Muscles** : muscles avant du cou (sterno-cléido-mastoïdien).
**Position de départ** : allongé sur le dos, les épaules au bord du banc, la tête dans le vide.
**Exécution** :
1. Rentre le menton puis ramène lentement la tête vers la poitrine.
2. Redescends lentement jusqu'à l'alignement avec le buste, sans laisser la tête tomber en arrière.
**Résistance** : poids de la tête, puis main posée sur le front qui freine le mouvement.

#### `iso_nuque` : Isométrie nuque 4 directions
**Exécution** : assis ou debout, place la main contre le front et pousse la tête contre la main sans bouger, 20 secondes. Répète avec la main à l'arrière du crâne, puis contre chaque côté de la tête. Intensité modérée, respiration normale.

### 4.7 Abdominaux

#### `crunch_leste` : Crunch lesté
**Muscles** : grand droit de l'abdomen (les « tablettes »).
**Matériel** : sol, un haltère.
**Position de départ** : allongé sur le dos, genoux pliés, pieds au sol, haltère tenu contre la poitrine.
**Exécution** :
1. Enroule le haut du dos en rapprochant les côtes du bassin, jusqu'à décoller les omoplates du sol.
2. Contracte une seconde, redescends lentement jusqu'à poser les épaules.
**Points clés** : c'est un enroulement de la colonne, pas une remontée complète du buste. Le bas du dos reste au sol.
**Erreurs fréquentes** : tirer sur la nuque, remonter avec de l'élan.

#### `releves_jambes_sol` : Relevés de jambes au sol
**Muscles** : grand droit de l'abdomen, partie basse.
**Position de départ** : allongé sur le dos, jambes tendues, mains sous les fesses ou le long du corps.
**Exécution** :
1. Monte les jambes tendues jusqu'à la verticale.
2. Redescends lentement sans toucher le sol.
**Points clés** : le bas du dos reste plaqué au sol. S'il se décolle, plie légèrement les genoux.

#### `releves_genoux_suspendus` : Relevés de genoux suspendus
**Muscles** : grand droit de l'abdomen, fléchisseurs de hanche.
**Matériel** : barre de traction du parc.
**Position de départ** : suspendu à la barre, bras tendus, corps immobile.
**Exécution** :
1. Monte les genoux vers la poitrine en enroulant le bassin vers le haut (le bassin bascule, pas seulement les jambes).
2. Redescends lentement sans balancer.
**Plus difficile** : jambes tendues.

#### `planche` : Planche
**Muscles** : sangle abdominale, gainage global.
**Position** : en appui sur les avant-bras (coudes sous les épaules) et la pointe des pieds, corps aligné de la tête aux talons. Serre les fessiers et rentre légèrement le ventre.
**Erreurs fréquentes** : fesses trop hautes, bassin qui s'affaisse.

#### `planche_laterale` : Planche latérale
**Muscles** : obliques, stabilisateurs du tronc.
**Position** : allongé sur le côté, en appui sur un avant-bras (coude sous l'épaule) et le bord du pied du dessous. Monte les hanches pour aligner tout le corps et tiens.
**Erreurs fréquentes** : hanches qui descendent, buste qui pivote vers l'avant.

### 4.8 Chevilles, genoux et tendons

Principe : les tendons se renforcent sous des charges lourdes et des mouvements lents. D'où les tempos de 3 secondes.

#### `bulgares_tempo` : Fentes bulgares tempo 3 s / 3 s
**Muscles** : quadriceps, fessiers, tendon rotulien, stabilité du genou.
**Matériel** : banc, un ou deux haltères.
**Position de départ** : dos au banc, un pied posé derrière sur le banc (dessus du pied à plat), l'autre pied au sol environ un grand pas en avant. Haltères le long du corps.
**Exécution** :
1. Descends en 3 secondes en pliant la jambe avant, jusqu'à ce que la cuisse avant soit presque parallèle au sol.
2. Remonte en 3 secondes en poussant dans le talon avant.
**Points clés** : le genou avant suit l'axe du pied (il ne rentre pas vers l'intérieur). Le buste peut être légèrement penché vers l'avant.
**Erreurs fréquentes** : pied avant trop près du banc, genou qui rentre.

#### `mollets_tempo` : Mollets sur une jambe tempo 3 s / 3 s
**Muscles** : mollets, tendon d'Achille.
**Matériel** : une marche ou un rebord stable, un haltère.
**Position de départ** : debout sur une jambe, l'avant du pied sur le rebord, talon dans le vide. Haltère dans la main du même côté, l'autre main se tient à un support pour l'équilibre.
**Exécution** :
1. Descends le talon en 3 secondes le plus bas possible (étirement du mollet).
2. Monte en 3 secondes sur la pointe du pied, le plus haut possible.
**Points clés** : amplitude complète, aucun rebond en bas.

#### `releves_pointes` : Relevés de pointes dos au mur
**Muscles** : jambier antérieur (muscle devant le tibia), prévention des douleurs au tibia en course.
**Position de départ** : dos et fesses contre un mur, talons à environ 30 cm du mur, jambes tendues.
**Exécution** : relève les pointes de pied vers les tibias le plus haut possible, puis repose-les lentement.
**Plus difficile** : talons plus loin du mur.

#### `chaise_mur` : Chaise contre le mur
**Muscles** : quadriceps, tendon rotulien (isométrie).
**Position** : dos plaqué au mur, descends jusqu'à ce que les cuisses soient parallèles au sol, genoux à 90° au-dessus des chevilles. Tiens.
**Erreurs fréquentes** : genoux qui dépassent les orteils, dos qui décolle du mur.

### 4.9 Avant-bras

#### `curl_poignets` : Curl poignets
**Muscles** : fléchisseurs des avant-bras (face intérieure).
**Position de départ** : assis, avant-bras posés sur les cuisses ou sur le banc, paumes vers le haut, poignets dans le vide, haltères en main.
**Exécution** : laisse les haltères descendre en déroulant les doigts, puis referme la main et monte le poignet le plus haut possible. Seuls les poignets bougent.

#### `ext_poignets` : Extension des poignets
**Muscles** : extenseurs des avant-bras (face extérieure), équilibre avec les fléchisseurs.
**Exécution** : même position que `curl_poignets`, mais paumes vers le sol. Monte le dos de la main vers le plafond, puis redescends. Charges légères.

#### `curl_inverse` : Curl inversé
**Muscles** : dessus des avant-bras, brachial.
**Exécution** : comme un curl classique, mais paumes tournées vers le sol pendant tout le mouvement. Poignets droits, ne pas les casser.

#### `farmer_hold` : Tenue d'haltères lourds
**Muscles** : préhension, avant-bras, trapèzes, gainage.
**Exécution** : debout, prends les deux haltères les plus lourds disponibles, bras le long du corps, épaules basses et en arrière, et tiens pendant la durée indiquée. Arrête quand la prise lâche.

### 4.10 Visage et mâchoire (à la maison)

#### `chin_tucks` : Rentrés de menton
**Muscles** : fléchisseurs profonds du cou, posture de la nuque.
**Exécution** : assis ou debout, regard droit devant, recule le menton horizontalement (comme pour faire un double menton), sans baisser la tête. Tiens 3 secondes, relâche.
**Intérêt** : améliore la posture de la tête et du cou, ce qui joue sur l'apparence de la ligne cou/mâchoire.

#### `chewing_gum` : Mastication de chewing-gum dur (facultatif)
**Exécution** : mâcher en alternant les deux côtés, 5 minutes, 2 fois par jour au maximum.
**Précaution** : la mastication quotidienne prolongée est associée à des troubles de l'articulation de la mâchoire. Arrêt immédiat en cas de douleur, claquement ou gêne à l'ouverture de la bouche.
**Réalisme** : les preuves d'un effet esthétique sont faibles. Le facteur le plus déterminant pour une mâchoire marquée est un taux de masse grasse bas.

---

## 5. Hypothèses à confirmer

1. Le banc est-il inclinable ? Si non, `dev_incline` est remplacé par `dc_paumes_face`.
2. Le banc est-il assez haut pour `curl_couche` ? Si non, remplacé par `curl_alterne`.
3. Le parc a-t-il une barre assez haute pour `releves_genoux_suspendus` et une barre basse pour `rowing_australien` ?
4. Volume et type de course par semaine, pour ajuster le placement des sorties.

---

## 6. Notes pour le développement de l'application

Idées de fonctionnalités cohérentes avec ce programme (à adapter librement) :
1. Vue du jour : affiche automatiquement la séance correspondant au jour de la semaine, avec l'échauffement standard en premier.
2. Fiche exercice : accessible depuis chaque ligne de séance via l'`id`, avec la description complète de la section 4.
3. Saisie par série : charge (kg) et répétitions réalisées, pour appliquer la double progression (section 2.2, règle 5). L'application peut signaler quand le haut de la fourchette est atteint sur toutes les séries.
4. Minuteur de repos : durée préremplie selon la colonne « Repos ».
5. Minuteur pour les exercices en durée (planche, isométries, chaise, farmer hold).
6. Historique : graphique de progression de la charge par exercice.
7. Remplacements : proposer automatiquement l'alternative indiquée quand le matériel manque.

Structure de données suggérée : une table `exercices` (id, nom, groupe, matériel, description) et une table `seances` (jour, lieu, liste ordonnée de lignes : id exercice, séries, reps min, reps max ou durée, repos, RIR, consigne).

---

## 7. Fondements scientifiques (résumé)

1. **Volume** : la prise de muscle augmente avec le nombre de séries hebdomadaires, avec des rendements décroissants. Pelland et al., Sports Medicine, 2025 (méta-régression de 67 études).
2. **Proximité de l'échec** : s'arrêter plus près de l'échec favorise la prise de muscle. Robinson et al., Sports Medicine, 2024. Chez des pratiquants entraînés, 1 à 2 répétitions de marge donnent une hypertrophie similaire à l'échec : Refalo et al., Journal of Sports Sciences, 2024.
3. **Charge** : charges légères et lourdes donnent une hypertrophie similaire si les séries sont poussées près de l'échec. Schoenfeld et al., JSCR, 2017.
4. **Position étirée** : l'entraînement en position allongée du muscle favorise la croissance. Wolf et al., IJSC, 2023 et Sports Medicine, 2025. Extension triceps bras au-dessus de la tête supérieure à l'extension bras le long du corps : Maeo et al., European Journal of Sport Science, 2023.
5. **Repos** : léger avantage au-delà de 60 s, pas de différence notable au-delà de 90 s. Singer et al., Frontiers in Sports and Active Living, 2024.
6. **Lombaires** : une séance par semaine suffit pour développer la force d'extension lombaire, et l'isométrique est efficace. Graves et al., Spine, 1990.
7. **Nuque** : les exercices classiques ne font pas grossir la nuque, un travail direct le fait. Conley et al., European Journal of Applied Physiology, 1997.
8. **Tendons** : la musculation lourde augmente la rigidité des tendons d'Achille et rotulien. Étude sur triathlètes, Scientific Reports, 2025.
9. **Course et musculation** : pas d'effet global sur la taille des muscles (Schumann et al., Sports Medicine, 2022), léger effet négatif possible au niveau des fibres, plus marqué avec la course (Lundberg et al., Sports Medicine, 2022).
10. **Visage** : amélioration de la plénitude des joues après 20 semaines d'exercices faciaux quotidiens chez des femmes de 40 à 65 ans. Alam et al., JAMA Dermatology, 2018. Preuves limitées.

Ce programme est un outil d'entraînement général et ne remplace pas l'avis d'un professionnel de santé en cas de douleur ou de blessure.
