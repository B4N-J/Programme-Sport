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
| **Déploiement** | GitHub Pages via GitHub Actions |

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

Contrainte transverse : **fonctionner sans réseau**, les salles captant souvent
mal.

## 3. Ressources

| Fichier | Usage |
|---|---|
| `programme-musculation.md` | Document de référence, 620 lignes, édité à la main. Sections : contexte, principes, planning, 47 fiches exercices, fondements scientifiques |
| `src/data/exercices.ts` | Les 47 fiches, transcrites de la section 4 |
| `src/data/seances.ts` | Les 5 séances et 2 jours de repos, transcrits de la section 3 |
| `src/data/principes.ts` | Échauffement (§ 2.3), glossaire (§ 2.1), règles (§ 2.2), placement de la course (§ 3) |
| `scripts/check-data.ts` | Compare markdown et `src/data/` : fiches, identifiants, séries, repos, RIR |
| `scripts/check-rendu.tsx` | Monte les 56 vues hors navigateur et vérifie leur contenu, plus la logique de substitution et de progression |

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
| 2026-09-27 | GitHub Pages | Provisoire — à confirmer que le compte GitHub existe, sinon Cloudflare Pages |

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
| Déploiement effectif sur GitHub Pages | À faire — nécessite le dépôt distant |
| Test sur téléphone réel, mode avion | À faire |

### Journal

**2026-09-27** — Création du projet de bout en bout. Programme transcrit
intégralement (47 fiches, 44 lignes d'exercice sur 5 séances), interface
complète, PWA hors-ligne vérifiée (238 Kio précachés), deux scripts de contrôle
verts. Reste le déploiement sur un dépôt distant et la validation sur téléphone.

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
- **Pas de synchronisation** entre appareils. Un export/import JSON pourra être
  ajouté si le besoin se confirme.
