# Programme Muscu

Application web de consultation et de suivi du programme d'entraînement décrit
dans [`programme-musculation.md`](programme-musculation.md). Pensée pour le
téléphone, à la salle : vue de la semaine, détail de chaque séance, fiche
complète de chaque exercice, cases à cocher par série, minuteur de repos,
rappel de la charge de la dernière séance, série de jours suivis et courbe
d'évolution des charges.

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
| `src/lib/` | Formats d'affichage, jours, journal et série, substitutions matériel, synchronisation |
| `src/hooks/` | Stockage local, journal, minuteur de repos, suivi de séance, verrou d'écran |
| `src/components/` | Vues et composants d'interface |
| `scripts/check-data.ts` | Vérifie que `src/data/` ne diverge pas du markdown |
| `scripts/check-rendu.tsx` | Monte chaque vue hors navigateur, vérifie le contenu, la série et les courbes |
| `scripts/check-sync.ts` | Rejoue la synchronisation contre un faux PostgREST |

## Modifier le programme

Le markdown reste le document de référence, mais l'app lit `src/data/`. Après
avoir modifié l'un, mettre l'autre à jour puis lancer :

```bash
npm run check:data
```

Le script signale toute divergence : fiche manquante, identifiant inconnu,
nombre de séries, durée de repos ou RIR qui ne correspondent plus.

## Sauvegarde et synchronisation

Par défaut, tout vit dans le stockage du navigateur : **les données
disparaissent** si le site est désinstallé, si les données de navigation sont
vidées ou si le téléphone est perdu. Deux filets existent, dans les réglages de
l'app.

**Export et import d'un fichier** — un JSON à ranger où tu veux. L'import
*fusionne* avec ce qui est déjà là : réimporter une vieille sauvegarde
n'efface jamais les séances plus récentes.

**Synchronisation Supabase** — téléphone et ordinateur partagent le même
historique, et les données survivent à l'appareil. Mise en place, une fois :

1. Créer un projet gratuit sur [supabase.com](https://supabase.com).
2. Éditeur SQL → coller le script affiché dans **Réglages → Synchronisation →
   Script de la table**, puis l'exécuter.
3. Settings → API → copier l'**URL du projet** et la clé **`anon` public**.
4. Les coller dans **Réglages → Synchronisation**, sur chaque appareil, puis
   **Synchroniser maintenant**.

Les identifiants ne sont **pas** compilés dans le site : GitHub Pages impose un
dépôt public sur le plan gratuit, et tout ce qui serait compilé y serait
lisible. Ils restent dans le stockage de chaque appareil. Un déploiement privé
peut à l'inverse les fournir par les variables `VITE_SUPABASE_URL` et
`VITE_SUPABASE_ANON_KEY`.

> La règle d'accès du script laisse le rôle `anon` lire et écrire la table.
> Quiconque obtient l'URL et la clé peut donc lire ton historique
> d'entraînement. Pour des charges de musculation c'est un risque assumé ;
> c'est la contrepartie d'une base sans compte ni mot de passe.

La synchronisation est **différée** : hors réseau, l'app continue d'écrire en
local et rattrape le retard au retour de la connexion. La fusion est indexée
par date des deux côtés, donc aucune séance ne peut être écrasée par l'autre
appareil.

## Déploiement

Un push sur `main` déclenche le workflow `.github/workflows/deploy.yml`, qui
lance les contrôles, construit le site et le publie sur GitHub Pages. Activer
au préalable **Settings → Pages → Source : GitHub Actions**.

```bash
gh repo create programme-muscu --public --source=. --push
```
