import { useCallback } from 'react';

import { cleDuJour } from '../lib/jour';
import { clePourHistorique, type EntreeHistorique, type SerieRealisee } from '../lib/progression';
import { ecrire, lire, supprimer, useLocalStorage } from './useLocalStorage';

export type SerieSaisie = { kg: string; reps: string };
export type EtatLigne = { cases: boolean[]; saisies: SerieSaisie[] };
/** Clé : la colonne « Ordre » de la ligne, stable même si un exercice se répète. */
export type SuiviJour = Record<string, EtatLigne>;

const SERIE_VIDE: SerieSaisie = { kg: '', reps: '' };

function ajuster(etat: EtatLigne | undefined, nbCases: number): EtatLigne {
  const cases = Array.from({ length: nbCases }, (_, i) => etat?.cases[i] ?? false);
  const saisies = Array.from({ length: nbCases }, (_, i) => etat?.saisies[i] ?? SERIE_VIDE);
  return { cases, saisies };
}

/** Écrit la séance du jour en tête de l'historique de l'exercice (2 entrées gardées). */
function enregistrerHistorique(exerciceId: string, saisies: SerieSaisie[]): void {
  const cle = clePourHistorique(exerciceId);
  const series: SerieRealisee[] = saisies
    .map((s) => ({ kg: Number(s.kg.replace(',', '.')) || 0, reps: Number(s.reps) || 0 }))
    .filter((s) => s.reps > 0);

  const aujourdhui = cleDuJour();
  const precedent = lire<EntreeHistorique[]>(cle, []).filter((e) => e.date !== aujourdhui);

  if (series.length === 0) {
    if (precedent.length === 0) supprimer(cle);
    else ecrire(cle, precedent.slice(0, 2));
    return;
  }

  ecrire(cle, [{ date: aujourdhui, series }, ...precedent].slice(0, 2));
}

/** Dernière séance enregistrée pour cet exercice, en excluant celle du jour. */
export function derniereSeance(exerciceId: string): EntreeHistorique | null {
  const aujourdhui = cleDuJour();
  return lire<EntreeHistorique[]>(clePourHistorique(exerciceId), []).find(
    (e) => e.date !== aujourdhui,
  ) ?? null;
}

/**
 * Suivi de la séance du jour : cases cochées et charges saisies.
 * Les données sont rattachées à la date du jour, donc une nouvelle journée
 * repart d'une séance vierge sans rien effacer.
 */
export function useSuiviSeance() {
  const [suivi, setSuivi] = useLocalStorage<SuiviJour>(`muscu:seance:${cleDuJour()}`, {});

  const etatLigne = useCallback(
    (ordre: number, nbCases: number) => ajuster(suivi[String(ordre)], nbCases),
    [suivi],
  );

  const basculerCase = useCallback(
    (ordre: number, index: number, nbCases: number) => {
      setSuivi((precedent) => {
        const etat = ajuster(precedent[String(ordre)], nbCases);
        const cases = [...etat.cases];
        cases[index] = !cases[index];
        return { ...precedent, [String(ordre)]: { ...etat, cases } };
      });
    },
    [setSuivi],
  );

  const setSaisie = useCallback(
    (
      ordre: number,
      exerciceId: string,
      index: number,
      champ: keyof SerieSaisie,
      valeur: string,
      nbCases: number,
    ) => {
      const saisies = ajuster(suivi[String(ordre)], nbCases).saisies.map((s, i) =>
        i === index ? { ...s, [champ]: valeur } : s,
      );

      // Écrit hors de l'updater : celui-ci doit rester pur, StrictMode l'appelle
      // deux fois en développement.
      enregistrerHistorique(exerciceId, saisies);

      setSuivi((precedent) => ({
        ...precedent,
        [String(ordre)]: { ...ajuster(precedent[String(ordre)], nbCases), saisies },
      }));
    },
    [suivi, setSuivi],
  );

  const reinitialiser = useCallback(() => setSuivi({}), [setSuivi]);

  const nbCochees = Object.values(suivi).reduce(
    (n, etat) => n + etat.cases.filter(Boolean).length,
    0,
  );

  return { suivi, etatLigne, basculerCase, setSaisie, reinitialiser, nbCochees };
}
