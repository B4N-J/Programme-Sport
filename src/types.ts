/**
 * Modèle de données du programme.
 *
 * Source de vérité : ce dossier `src/data/`. Le fichier `programme-musculation.md`
 * reste le document de référence lisible ; `npm run check:data` vérifie que les
 * deux ne divergent pas.
 */

export type Jour =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi'
  | 'dimanche';

export const JOURS: readonly Jour[] = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
];

export type GroupeMusculaire =
  | 'pectoraux'
  | 'dos'
  | 'triceps'
  | 'biceps'
  | 'epaules'
  | 'nuque'
  | 'abdominaux'
  | 'chevilles'
  | 'avant-bras'
  | 'visage';

export const LIBELLE_GROUPE: Record<GroupeMusculaire, string> = {
  pectoraux: 'Pectoraux',
  dos: 'Dos et lombaires',
  triceps: 'Triceps',
  biceps: 'Biceps',
  epaules: 'Épaules',
  nuque: 'Nuque',
  abdominaux: 'Abdominaux',
  chevilles: 'Chevilles, genoux et tendons',
  'avant-bras': 'Avant-bras',
  visage: 'Visage et mâchoire',
};

/** Fiche exercice complète (section 4 du markdown). */
export type Exercice = {
  id: string;
  nom: string;
  groupe: GroupeMusculaire;
  muscles: string;
  materiel?: string;
  positionDepart?: string;
  /** Étapes numérotées, ou une seule entrée pour les exécutions en un paragraphe. */
  execution: string[];
  pointsCles?: string[];
  erreurs?: string[];
  /** Spécifique aux fiches nuque : comment ajouter de la résistance. */
  resistance?: string;
  plusFacile?: string;
  plusDifficile?: string;
  note?: string;
};

/**
 * Les dosages du markdown sont hétérogènes ; cette union les couvre tous en
 * restant exploitable par le minuteur et le tracker de séries.
 */
export type Dosage =
  /** « 3 × 6 à 10 », « 3 × 8 à 12 par bras » */
  | { type: 'reps'; series: number; repsMin: number; repsMax: number; parCote?: boolean }
  /** « 2 × 30 à 60 s », « 2 × 30 à 45 s par côté », « 2 × 30 s » */
  | { type: 'duree'; series: number; secMin: number; secMax?: number; parCote?: boolean }
  /** « 2 × max moins 1 » */
  | { type: 'max'; series: number; libelle: string }
  /** « 1 × 20 s par direction » */
  | { type: 'directions'; series: number; sec: number; directions: string[] };

/**
 * Conditions matériel non tranchées (section 5 du markdown), réglables dans l'app.
 * Seules figurent ici les conditions pour lesquelles le document fournit
 * explicitement un exercice de remplacement.
 */
export type ConditionMateriel =
  | 'bancNonInclinable'
  | 'bancTropBas'
  | 'tractionsImpossibles';

export type LigneSeance = {
  ordre: number;
  exerciceId: string;
  /** Remplacement prévu par le document quand la condition matériel est remplie. */
  remplacePar?: { exerciceId: string; condition: ConditionMateriel };
  /** Variante laissée au libre choix par le document (« ou bird_dog »). */
  alternativeLibre?: string;
  dosage: Dosage;
  /** Repos prescrit. `reposSecMin` n'est présent que pour les fourchettes (« 60 à 90 s »). */
  reposSec: number;
  reposSecMin?: number;
  /** Tel qu'écrit dans le markdown : « 1 à 2 », « 0 », absent pour les tenues. */
  rir?: string;
  consigne?: string;
};

export type Seance = {
  jour: Jour;
  titre: string;
  lieu: 'Salle' | 'Parc' | null;
  repos: boolean;
  /** Texte affiché pour les jours de repos. */
  noteRepos?: string;
  lignes: LigneSeance[];
};

/** Bloc « Chaque jour, à la maison » : dosages hors norme, laissés en texte. */
export type RoutineQuotidienne = {
  exerciceId: string;
  dosageTexte: string;
};

export type EtapeEchauffement = {
  titre: string;
  detail: string;
};

/** Entrée du glossaire (section 2.1). */
export type DefinitionGlossaire = {
  terme: string;
  definition: string;
};
