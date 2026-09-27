/**
 * Contrôle de cohérence entre `programme-musculation.md` (document de référence,
 * édité à la main) et `src/data/` (source de vérité de l'application).
 *
 * Usage : npm run check:data
 * Sort en code 1 dès qu'une divergence est détectée.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { EXERCICES } from '../src/data/exercices.ts';
import { ROUTINE_QUOTIDIENNE, SEANCES } from '../src/data/seances.ts';
import type { Dosage } from '../src/types.ts';

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const markdown = readFileSync(resolve(racine, 'programme-musculation.md'), 'utf8');

const erreurs: string[] = [];
const erreur = (m: string) => erreurs.push(m);

// ---------------------------------------------------------------- 1. Fiches
// Titres de la forme : #### `dc_halteres` : Développé couché haltères
const fichesMd = [...markdown.matchAll(/^#### `([a-z0-9_]+)`/gm)].map((m) => m[1]);
const fichesTs = EXERCICES.map((e) => e.id);

for (const id of fichesMd) {
  if (!fichesTs.includes(id)) erreur(`Fiche « ${id} » présente dans le markdown, absente de exercices.ts`);
}
for (const id of fichesTs) {
  if (!fichesMd.includes(id)) erreur(`Fiche « ${id} » présente dans exercices.ts, absente du markdown`);
}
const doublons = fichesTs.filter((id, i) => fichesTs.indexOf(id) !== i);
if (doublons.length) erreur(`Identifiants dupliqués dans exercices.ts : ${doublons.join(', ')}`);

// ------------------------------------------------- 2. Références des séances
const idsConnus = new Set(fichesTs);
for (const seance of SEANCES) {
  for (const ligne of seance.lignes) {
    const refs = [ligne.exerciceId, ligne.remplacePar?.exerciceId, ligne.alternativeLibre];
    for (const ref of refs) {
      if (ref && !idsConnus.has(ref)) {
        erreur(`${seance.jour}, ligne ${ligne.ordre} : identifiant inconnu « ${ref} »`);
      }
    }
  }
  const ordres = seance.lignes.map((l) => l.ordre);
  const attendus = seance.lignes.map((_, i) => i + 1);
  if (ordres.join(',') !== attendus.join(',')) {
    erreur(`${seance.jour} : la colonne « Ordre » n'est pas la suite 1..n (${ordres.join(', ')})`);
  }
}
for (const r of ROUTINE_QUOTIDIENNE) {
  if (!idsConnus.has(r.exerciceId)) erreur(`Routine quotidienne : identifiant inconnu « ${r.exerciceId} »`);
}

// ------------------------------------------- 3. Tableaux du planning (§ 3)
type LigneMd = { id: string; series: number; reposSec: number; reposSecMin?: number; rir: string };

/** Extrait les lignes du tableau qui suit le titre « ### <Jour> : … ». */
function tableauDuJour(jour: string): LigneMd[] {
  const titre = jour.charAt(0).toUpperCase() + jour.slice(1);
  const debut = markdown.search(new RegExp(`^### ${titre} :`, 'm'));
  if (debut === -1) return [];
  const suite = markdown.slice(debut);
  const fin = suite.indexOf('\n### ', 1);
  const bloc = fin === -1 ? suite : suite.slice(0, fin);

  return bloc
    .split('\n')
    .filter((l) => /^\| \d+ \|/.test(l))
    .map((l) => {
      const c = l.split('|').map((x) => x.trim());
      // c[0] vide, c[1] ordre, c[2] id, c[3] nom, c[4] séries, c[5] repos, c[6] RIR
      const id = (c[2] ?? '').replace(/`/g, '').split(' ')[0] ?? '';
      const series = Number.parseInt((c[4] ?? '').split('×')[0]?.trim() ?? '', 10);
      const { sec, secMin } = parseRepos(c[5] ?? '');
      return { id, series, reposSec: sec, reposSecMin: secMin, rir: c[6] ?? '' };
    });
}

/** « 2 min » → 120 ; « 90 s » → 90 ; « 60 à 90 s » → { sec: 90, secMin: 60 }. */
function parseRepos(texte: string): { sec: number; secMin?: number } {
  const fourchette = texte.match(/^(\d+)\s*à\s*(\d+)\s*s$/);
  if (fourchette) return { sec: Number(fourchette[2]), secMin: Number(fourchette[1]) };
  const minutes = texte.match(/^(\d+)\s*min$/);
  if (minutes) return { sec: Number(minutes[1]) * 60, secMin: undefined };
  const secondes = texte.match(/^(\d+)\s*s$/);
  if (secondes) return { sec: Number(secondes[1]), secMin: undefined };
  return { sec: Number.NaN, secMin: undefined };
}

function seriesDeDosage(d: Dosage): number {
  return d.series;
}

for (const seance of SEANCES) {
  if (seance.repos) continue;
  const lignesMd = tableauDuJour(seance.jour);
  if (lignesMd.length === 0) {
    erreur(`${seance.jour} : tableau introuvable dans le markdown`);
    continue;
  }
  if (lignesMd.length !== seance.lignes.length) {
    erreur(
      `${seance.jour} : ${lignesMd.length} ligne(s) dans le markdown contre ${seance.lignes.length} dans seances.ts`,
    );
    continue;
  }
  lignesMd.forEach((md, i) => {
    const ts = seance.lignes[i]!;
    if (md.id !== ts.exerciceId) {
      erreur(`${seance.jour}, ligne ${i + 1} : « ${md.id} » dans le markdown contre « ${ts.exerciceId} »`);
    }
    if (md.series !== seriesDeDosage(ts.dosage)) {
      erreur(
        `${seance.jour}, ligne ${i + 1} (${md.id}) : ${md.series} série(s) dans le markdown contre ${seriesDeDosage(ts.dosage)}`,
      );
    }
    if (md.reposSec !== ts.reposSec || (md.reposSecMin ?? undefined) !== (ts.reposSecMin ?? undefined)) {
      const attendu = md.reposSecMin ? `${md.reposSecMin} à ${md.reposSec} s` : `${md.reposSec} s`;
      const trouve = ts.reposSecMin ? `${ts.reposSecMin} à ${ts.reposSec} s` : `${ts.reposSec} s`;
      erreur(`${seance.jour}, ligne ${i + 1} (${md.id}) : repos ${attendu} dans le markdown contre ${trouve}`);
    }
    if (md.rir !== (ts.rir ?? '')) {
      erreur(
        `${seance.jour}, ligne ${i + 1} (${md.id}) : RIR « ${md.rir} » dans le markdown contre « ${ts.rir ?? ''} »`,
      );
    }
  });
}

// ------------------------------------------------------------------ Verdict
if (erreurs.length > 0) {
  console.error(`\n✗ ${erreurs.length} divergence(s) entre le markdown et src/data/ :\n`);
  for (const e of erreurs) console.error(`  · ${e}`);
  console.error('');
  process.exit(1);
}

const nbLignes = SEANCES.reduce((n, s) => n + s.lignes.length, 0);
console.log(
  `✓ Cohérent : ${fichesTs.length} fiches, ${SEANCES.filter((s) => !s.repos).length} séances, ${nbLignes} lignes d'exercice.`,
);
