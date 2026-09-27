import type { Dosage, LigneSeance } from '../types';

/** « 3 × 6 à 10 », « 2 × 30 à 45 s par côté », « 1 × 20 s par direction ». */
export function formatDosage(d: Dosage): string {
  switch (d.type) {
    case 'reps': {
      const plage = d.repsMin === d.repsMax ? `${d.repsMin}` : `${d.repsMin} à ${d.repsMax}`;
      return `${d.series} × ${plage}${d.parCote ? ' par côté' : ''}`;
    }
    case 'duree': {
      const plage = d.secMax ? `${d.secMin} à ${d.secMax} s` : `${d.secMin} s`;
      return `${d.series} × ${plage}${d.parCote ? ' par côté' : ''}`;
    }
    case 'max':
      return `${d.series} × ${d.libelle}`;
    case 'directions':
      return `${d.series} × ${d.sec} s par direction`;
  }
}

/** « 2 min », « 90 s », « 60 à 90 s ». */
export function formatRepos(ligne: Pick<LigneSeance, 'reposSec' | 'reposSecMin'>): string {
  if (ligne.reposSecMin) return `${ligne.reposSecMin} à ${ligne.reposSec} s`;
  return ligne.reposSec % 60 === 0 && ligne.reposSec >= 120
    ? `${ligne.reposSec / 60} min`
    : `${ligne.reposSec} s`;
}

/** Secondes → « 1:30 », pour le minuteur. */
export function formatChrono(secondes: number): string {
  const s = Math.max(0, Math.ceil(secondes));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * Étiquettes des cases à cocher d'un exercice.
 * Les exercices « par côté » doublent les cases (G / D), les isométries à
 * directions en affichent une par direction.
 */
export function etiquettesSeries(d: Dosage): string[] {
  if (d.type === 'directions') return d.directions;
  const base = Array.from({ length: d.series }, (_, i) => `Série ${i + 1}`);
  if ('parCote' in d && d.parCote) {
    return base.flatMap((s) => [`${s} G`, `${s} D`]);
  }
  return base;
}

/** Durée à chronométrer pour une série, si l'exercice se compte en temps. */
export function dureeSerie(d: Dosage): number | null {
  if (d.type === 'duree') return d.secMax ?? d.secMin;
  if (d.type === 'directions') return d.sec;
  return null;
}

/** Une saisie de charge n'a de sens que pour les exercices comptés en répétitions. */
export function accepteSaisie(d: Dosage): boolean {
  return d.type === 'reps' || d.type === 'max';
}
