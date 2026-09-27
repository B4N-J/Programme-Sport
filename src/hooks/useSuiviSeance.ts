import { useCallback } from 'react';

import { cleDuJour } from '../lib/jour';
import type { SerieRealisee } from '../lib/progression';
import { useJournal } from './useJournal';
import { useLocalStorage } from './useLocalStorage';

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

/** Les champs saisis deviennent des séries mesurables ; les vides sont ignorés. */
function enSeries(saisies: SerieSaisie[]): SerieRealisee[] {
  return saisies
    .map((s) => ({ kg: Number(s.kg.replace(',', '.')) || 0, reps: Number(s.reps) || 0 }))
    .filter((s) => s.reps > 0);
}

/**
 * Suivi de la séance du jour : cases cochées et charges saisies.
 * Les données sont rattachées à la date du jour, donc une nouvelle journée
 * repart d'une séance vierge sans rien effacer.
 */
export function useSuiviSeance() {
  const [suivi, setSuivi] = useLocalStorage<SuiviJour>(`muscu:seance:${cleDuJour()}`, {});
  const { enregistrerSeries } = useJournal();

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
      enregistrerSeries(exerciceId, enSeries(saisies));

      setSuivi((precedent) => ({
        ...precedent,
        [String(ordre)]: { ...ajuster(precedent[String(ordre)], nbCases), saisies },
      }));
    },
    [suivi, setSuivi, enregistrerSeries],
  );

  const reinitialiser = useCallback(() => setSuivi({}), [setSuivi]);

  const nbCochees = Object.values(suivi).reduce(
    (n, etat) => n + etat.cases.filter(Boolean).length,
    0,
  );

  return { suivi, etatLigne, basculerCase, setSaisie, reinitialiser, nbCochees };
}
