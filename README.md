# Programme Muscu

Application web de consultation et de suivi du programme d'entraînement décrit
dans [`programme-musculation.md`](programme-musculation.md). Pensée pour le
téléphone, à la salle : vue de la semaine, détail de chaque séance, fiche
complète de chaque exercice, cases à cocher par série, minuteur de repos et
rappel de la charge de la dernière séance.

Fonctionne **hors-ligne** une fois ouverte : tout est mis en cache, y compris le
programme lui-même.

## Installer sur le téléphone

1. Ouvrir l'URL du site dans Safari (iOS) ou Chrome (Android).
2. Menu de partage → **Ajouter à l'écran d'accueil**.
3. L'app s'ouvre alors en plein écran, sans barre de navigateur, et fonctionne
   sans réseau.

## Développement

```bash
npm install
npm run dev        # serveur local
npm run check      # cohérence des données + rendu des vues + types
npm run build      # build de production
npm run preview    # servir le build, pour tester le hors-ligne
```

## Structure

| Chemin | Rôle |
|---|---|
| `programme-musculation.md` | Document de référence, lisible, édité à la main |
| `src/data/` | Source de vérité de l'app : exercices, séances, principes |
| `src/lib/` | Formats d'affichage, jours, substitutions matériel, double progression |
| `src/hooks/` | Stockage local, minuteur de repos, suivi de séance, verrou d'écran |
| `src/components/` | Vues et composants d'interface |
| `scripts/check-data.ts` | Vérifie que `src/data/` ne diverge pas du markdown |
| `scripts/check-rendu.tsx` | Monte chaque vue hors navigateur et vérifie le contenu |

## Modifier le programme

Le markdown reste le document de référence, mais l'app lit `src/data/`. Après
avoir modifié l'un, mettre l'autre à jour puis lancer :

```bash
npm run check:data
```

Le script signale toute divergence : fiche manquante, identifiant inconnu,
nombre de séries, durée de repos ou RIR qui ne correspondent plus.

## Déploiement

Un push sur `main` déclenche le workflow `.github/workflows/deploy.yml`, qui
lance les contrôles, construit le site et le publie sur GitHub Pages. Activer
au préalable **Settings → Pages → Source : GitHub Actions**.
