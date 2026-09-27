# CLAUDE.md — Programme Muscu

## 1. Contexte

| | |
|---|---|
| **Quoi** | PWA de consultation et de suivi d'un programme de musculation personnel |
| **Pour qui** | Benjamin, usage personnel, seul utilisateur |
| **Livrable** | Site statique hors-ligne, installé sur l'écran d'accueil du téléphone |
| **Deadline** | Aucune, projet personnel |
| **Langue** | Français, interface comprise |
| **Stack** | Vite + React 18 + TypeScript, `vite-plugin-pwa`, `react-router` en HashRouter |
| **Déploiement** | GitHub Pages via GitHub Actions — <https://b4n-j.github.io/Programme-Sport/> |
| **Dépôt** | `B4N-J/Programme-Sport`, public (GitHub Pages l'impose sur le plan gratuit) |

## 2. Le brief en clair

L'app doit répondre à trois besoins, dans cet ordre :

1. **Consulter** — vue de la semaine, détail cliquable de chaque jour, fiche
   complète de chaque exercice. C'est la demande initiale.
2. **Suivre une séance** — cocher les séries faites, chronométrer le repos,
   saisir charge × répétitions. Sans cela, l'app n'apporte rien de plus que le
   markdown ouvert dans une app de notes.
3. **Appliquer la double progression** — rappeler la charge de la dernière
   séance et signaler quand le haut de la fourchette de répétitions est atteint
   sur toutes les séries (règle 2.2.5 du programme), inapplicable de tête sur
   47 exercices.

4. **Durer** — série de jours suivis, courbe d'évolution des charges, et
   surtout des données qui survivent à l'appareil. `localStorage` seul ne
   suffit pas pour un historique qu'on veut relire dans un an.

Contraintes transverses : **fonctionner sans réseau**, et **ne jamais perdre
l'historique**.

## 3. Ressources

| Fichier | Usage |
|---|---|
| `programme-musculation.md` | Document de référence, 620 lignes, édité à la main. Sections : contexte, principes, planning, 47 fiches exercices, fondements scientifiques |
| `src/data/exercices.ts` | Les 47 fiches, transcrites de la section 4 |
| `src/data/seances.ts` | Les 5 séances et 2 jours de repos, transcrits de la section 3 |
| `src/data/principes.ts` | Échauffement (§ 2.3), glossaire (§ 2.1), règles (§ 2.2), placement de la course (§ 3) |
| `scripts/check-data.ts` | Compare markdown et `src/data/` : fiches, identifiants, séries, repos, RIR |
| `src/lib/journal.ts` | Journal durable : séances clôturées, historique complet, série de jours, fusion entre appareils, points de courbe |
| `src/lib/sync.ts` | Appels REST vers Supabase et script SQL d'installation |
| `scripts/check-rendu.tsx` | Monte les 57 vues hors navigateur et vérifie leur contenu, la substitution, la progression, la série et les courbes |
| `scripts/check-sync.ts` | Rejoue un cycle de synchronisation à deux appareils contre un faux PostgREST |

## 4. Règles de travail

- **`src/data/` est la source de vérité de l'app**, `programme-musculation.md`
  celle de l'humain. Toute modification de l'un impose la modification de
  l'autre, suivie de `npm run check:data`.
- **Ne jamais inventer de contenu d'entraînement.** Séries, répétitions, repos,
  RIR, consignes et descriptions viennent du markdown, mot pour mot. Un
  remplacement d'exercice n'existe que si le document le prévoit explicitement.
- **`npm run check`** avant toute livraison : cohérence des données, rendu des
  vues, types.
- **Mobile d'abord** : cibles tactiles d'au moins 44 px, aucun défilement
  horizontal, rien d'utile masqué par la barre du minuteur.

## 5. Pièges à éviter

- **Le minuteur ne décrémente jamais un compteur.** iOS gèle les timers dès que
  l'écran s'éteint ou que l'app passe en arrière-plan. `useMinuteur` stocke un
  horodatage de fin et recalcule le restant à chaque rendu et sur
  `visibilitychange`. Ne pas revenir à un `setInterval` décrémental.
- **L'`AudioContext` se crée pendant un geste de l'utilisateur.** Créé au
  chargement, il reste suspendu sur iOS et le bip de fin de repos ne se fait
  jamais entendre.
- **Tout accès à `localStorage` est protégé.** En navigation privée l'accès peut
  lever une exception ; l'app doit rester utilisable sans stockage.
- **HashRouter, pas BrowserRouter.** GitHub Pages n'accepte pas de règle de
  réécriture, et le geste « retour » ne fonctionne pas en PWA plein écran sans
  entrées d'historique.
- **Le journal se fusionne, il ne s'écrase pas.** `fusionner()` réunit les
  clés des deux côtés : séances indexées par date, historique indexé par date
  et par exercice. Un « le dernier écrit gagne » ferait disparaître une séance
  saisie sur l'autre appareil. L'import d'un fichier suit la même règle.
- **Aucun identifiant Supabase dans le bundle.** Le dépôt est public (GitHub
  Pages l'impose sur le plan gratuit) ; les identifiants se saisissent dans les
  réglages et restent dans `localStorage`.
- **Les effets de synchronisation dépendent des valeurs, pas de l'objet
  `configSync`.** Celui-ci est recréé à chaque frappe dans les réglages et
  déclencherait une requête par caractère saisi.
- **Clôturer une séance est un geste explicite.** Cocher toutes les cases ne
  clôture rien : on peut finir sans tout renseigner, ou renseigner sans s'être
  entraîné. C'est la clôture qui alimente la série.
- **Parser le markdown à l'exécution a été écarté** : les formats de séries sont
  trop hétérogènes (`2 × max moins 1`, `1 × 20 s par direction`,
  `3 × 8 à 12 par bras`). Le parseur de `check-data.ts` ne lit que les colonnes
  stables du planning, à fin de contrôle — pas pour alimenter l'app.

## 6. Décisions prises

| Date | Décision | Statut |
|---|---|---|
| 2026-09-27 | Périmètre : consultation + suivi léger. Historique complet et graphiques écartés | Acté |
| 2026-09-27 | PWA hébergée et hors-ligne plutôt qu'Artifact ou fichier HTML local | Acté |
| 2026-09-27 | Données converties une fois en TypeScript typé ; le `.md` reste le document de référence | Acté |
| 2026-09-27 | Vite + React + TypeScript | Acté |
| 2026-09-27 | Les hypothèses matériel non tranchées (§ 5 du markdown) deviennent des interrupteurs de réglages qui pilotent les substitutions | Acté |
| 2026-09-27 | Pas de synchronisation PC ↔ téléphone : `localStorage` par appareil | Acté |
| 2026-09-27 | Seules 3 substitutions existent, celles que le document prévoit. Aucun remplacement inventé pour `releves_genoux_suspendus` si le parc n'a pas de barre haute | Acté |
| 2026-09-27 | GitHub Pages sur dépôt public `B4N-J/Programme-Sport` | Acté — déployé et vérifié |
| 2026-09-27 | Historique complet conservé, et non plus les deux dernières séances : sans lui, pas de courbe | Acté |
| 2026-09-27 | Série de jours : un jour de repos prévu au programme maintient la série, la journée en cours ne la casse pas tant qu'elle n'est pas finie | Acté |
| 2026-09-27 | Synchronisation Supabase par document unique fusionné, sans compte ni authentification | Acté |
| 2026-09-27 | Identifiants Supabase saisis dans les réglages, jamais compilés — le dépôt GitHub Pages gratuit est public | Acté |
| 2026-09-27 | Courbe en SVG écrit à la main, sans bibliothèque de graphiques | Acté |
| 2026-09-27 | Export / import JSON conservé comme filet, même avec la synchronisation | Acté |

## 7. État d'avancement

| Étape | Statut |
|---|---|
| Échafaudage Vite + React + TS + PWA | Fait |
| Modèle de données et transcription des 47 fiches | Fait |
| Transcription des 5 séances et de la routine quotidienne | Fait |
| Contrôle de cohérence markdown ↔ données | Fait |
| Vues semaine, séance, fiche exercice | Fait |
| Réglages matériel et substitutions | Fait |
| Suivi : cases, saisies, rappel dernière séance, double progression | Fait |
| Minuteur de repos, bip, verrou d'écran | Fait |
| Icônes, manifest, hors-ligne | Fait |
| Test de rendu des 56 vues | Fait |
| Dépôt git et workflow de déploiement | Fait |
| Historique complet, clôture de séance, série de jours | Fait |
| Courbe d'évolution des charges (fiche + vue progression) | Fait |
| Export / import JSON | Fait |
| Synchronisation Supabase et son test à deux appareils | Fait |
| Déploiement effectif sur GitHub Pages | Fait |
| Création du projet Supabase et de la table | Fait — cycle écriture / lecture / suppression vérifié contre la vraie base |
| Saisie des identifiants dans les réglages, sur les deux appareils | À faire — côté utilisateur |
| Test sur téléphone réel, mode avion | À faire |

### Journal

**2026-09-27** — Création du projet de bout en bout. Programme transcrit
intégralement (47 fiches, 44 lignes d'exercice sur 5 séances), interface
complète, PWA hors-ligne vérifiée (238 Kio précachés), deux scripts de contrôle
verts. Reste le déploiement sur un dépôt distant et la validation sur téléphone.

**2026-09-27, suite** — Benjamin demande des sauvegardes durables, une série de
jours suivis et une courbe d'évolution des charges. Constat posé : le stockage
navigateur ne peut pas porter un historique qu'on relit dans un an. Il choisit,
en connaissance du surcoût, la PWA sur GitHub Pages doublée d'une base
Supabase, plutôt qu'une page hébergée plus simple. Ajout du journal durable,
de la clôture de séance, de la série, du calendrier de huit semaines, de la
courbe SVG, de l'export / import JSON et de la synchronisation. Un troisième
script de contrôle rejoue un cycle à deux appareils. 258 Kio précachés, quatre
contrôles verts. Au passage : l'hypothèse « les salles captent mal » venait de
moi et non de lui — il a confirmé avoir du réseau, mais a préféré garder le
hors-ligne.

**2026-09-27, fin** — Déploiement bout en bout. Dépôt `B4N-J/Programme-Sport`
créé et poussé, workflow vert, site servi sur
<https://b4n-j.github.io/Programme-Sport/> avec tous les fichiers précachés
accessibles. Projet Supabase créé par Benjamin ; table, règle d'accès et clé
vérifiées depuis le terminal par un cycle complet écriture / relecture /
suppression. Un correctif au passage : l'endpoint REST collé à la place de
l'URL du projet est désormais normalisé par `baseProjet()`. Reste la saisie
des identifiants dans les réglages de chaque appareil et le test en mode avion.

## 8. Points ouverts

- **Compte GitHub** à confirmer pour le déploiement ; Cloudflare Pages en
  solution de repli.
- **Réglages matériel** : les valeurs par défaut sont optimistes (banc
  inclinable, banc assez haut, tractions complètes possibles). À corriger dans
  l'app après vérification à la salle. Les questions correspondantes restent
  ouvertes dans la section 5 du markdown.
- **Barre haute au parc** : si elle manque, `releves_genoux_suspendus` n'a pas
  de remplacement prévu par le document. À trancher côté programme, pas côté
  app.
- **Course à pied** : volume et type de sorties non précisés dans le markdown.
  L'app se contente d'afficher la consigne de placement.
- **Synchronisation à deux appareils jamais observée.** Le cycle a été validé
  contre la vraie base depuis une seule machine ; la convergence
  téléphone ↔ ordinateur reste à constater.
- **Identifiants Supabase hors du dépôt.** Ils ne sont écrits nulle part dans
  le code ni dans ce fichier : le dépôt est public. Ils vivent dans les
  réglages de l'app, sur chaque appareil.
- **Lecture de la base par quiconque a la clé.** La règle d'accès du script SQL
  ouvre la table au rôle `anon`, sans authentification. Acceptable pour des
  charges de musculation, à revoir si le contenu change de nature.
- **Aucune vérification visuelle.** L'extension navigateur a été déclinée : les
  vues sont montées et leur contenu vérifié hors navigateur, mais la mise en
  page n'a jamais été regardée.
