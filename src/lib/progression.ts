import type { Dosage } from '../types';

export type SerieRealisee = { kg: number; reps: number };

export type EntreeHistorique = {
  /** « 2026-09-27 », en heure locale. */
  date: string;
  series: SerieRealisee[];
};


/** « 22 kg × 10, 10, 9 » — ou « 10, 10, 9 » au poids du corps. */
export function resumerEntree(entree: EntreeHistorique): string {
  if (entree.series.length === 0) return '';
  const charges = [...new Set(entree.series.map((s) => s.kg))];
  const reps = entree.series.map((s) => s.reps).join(', ');
  if (charges.length === 1 && charges[0] === 0) return reps;
  if (charges.length === 1) return `${charges[0]} kg × ${reps}`;
  return entree.series.map((s) => (s.kg ? `${s.kg}×${s.reps}` : `${s.reps}`)).join(', ');
}

/**
 * Double progression (section 2.2, règle 5) : quand le haut de la fourchette
 * est atteint sur toutes les séries, la charge augmente à la séance suivante.
 */
export function haussePreconisee(dosage: Dosage, entree: EntreeHistorique | null): boolean {
  if (!entree || dosage.type !== 'reps') return false;
  const attendues = dosage.series * (dosage.parCote ? 2 : 1);
  if (entree.series.length < attendues) return false;
  return entree.series.every((s) => s.reps >= dosage.repsMax);
}
