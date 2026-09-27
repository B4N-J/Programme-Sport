import { getExercice } from '../data/exercices';
import type { ConditionMateriel, Exercice, LigneSeance } from '../types';

/**
 * Réglages matériel : ils répondent aux hypothèses non tranchées de la
 * section 5 du document et déclenchent les remplacements qu'il prévoit.
 */
export type Reglages = {
  [K in ConditionMateriel]: boolean;
} & {
  /** Empêcher l'extinction de l'écran pendant une séance. */
  garderEcranAllume: boolean;
  /** Bip de fin de repos. */
  sonMinuteur: boolean;
};

export const REGLAGES_PAR_DEFAUT: Reglages = {
  bancNonInclinable: false,
  bancTropBas: false,
  tractionsImpossibles: false,
  garderEcranAllume: true,
  sonMinuteur: true,
};

export const LIBELLES_CONDITIONS: Record<ConditionMateriel, { question: string; effet: string }> = {
  bancNonInclinable: {
    question: "Le banc de la salle n'est pas inclinable",
    effet: 'Développé incliné remplacé par le développé couché paumes face à face.',
  },
  bancTropBas: {
    question: "Le banc est trop bas pour le curl couché (les haltères touchent le sol)",
    effet: 'Curl couché remplacé par le curl haltères alterné.',
  },
  tractionsImpossibles: {
    question: 'Je ne fais pas encore 5 tractions complètes',
    effet: 'Tractions remplacées par les tractions négatives.',
  },
};

export type ExerciceEffectif = {
  exercice: Exercice;
  /** Renseigné quand un remplacement a eu lieu : l'exercice initialement prescrit. */
  remplace?: Exercice;
};

/** Exercice réellement à faire pour une ligne, compte tenu des réglages. */
export function exerciceEffectif(ligne: LigneSeance, reglages: Reglages): ExerciceEffectif {
  const prescrit = getExercice(ligne.exerciceId);
  const substitut = ligne.remplacePar;

  if (substitut && reglages[substitut.condition]) {
    const remplacant = getExercice(substitut.exerciceId);
    if (remplacant && prescrit) return { exercice: remplacant, remplace: prescrit };
  }

  // Le contrôle `npm run check:data` garantit que l'identifiant existe.
  return { exercice: prescrit! };
}
