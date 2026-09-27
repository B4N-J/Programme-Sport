import type { DefinitionGlossaire, EtapeEchauffement } from '../types';

/** Section 2.3 : échauffement standard, 10 minutes, avant chaque séance. */
export const ECHAUFFEMENT: EtapeEchauffement[] = [
  { titre: 'Mobilité des chevilles', detail: 'Cercles de cheville, 10 par sens et par pied.' },
  { titre: 'Mobilité des genoux et hanches', detail: '10 squats au poids du corps lents.' },
  {
    titre: 'Mobilité des épaules',
    detail: "10 cercles de bras vers l'avant, 10 vers l'arrière.",
  },
  {
    titre: 'Équilibre sur une jambe',
    detail: '2 × 30 s par jambe, genou légèrement fléchi (yeux fermés pour corser).',
  },
  {
    titre: 'Séries légères',
    detail:
      '1 à 2 séries légères du premier exercice de la séance. Elles ne comptent pas dans le volume.',
  },
];

/** Section 2.1 : vocabulaire. */
export const GLOSSAIRE: DefinitionGlossaire[] = [
  {
    terme: 'RIR (Reps In Reserve)',
    definition:
      "Nombre de répétitions qu'il resterait possible de faire à la fin d'une série. RIR 0 = échec (impossible de faire une répétition de plus). RIR 2 = on s'arrête alors qu'on pourrait encore en faire 2.",
  },
  {
    terme: 'Tempo',
    definition:
      "Vitesse d'exécution. « Tempo 3 s / 3 s » signifie 3 secondes pour monter et 3 secondes pour descendre.",
  },
  {
    terme: 'Position étirée',
    definition:
      "Moment du mouvement où le muscle ciblé est le plus allongé (par exemple, le bas du développé couché pour les pectoraux). C'est la partie la plus productive pour la prise de muscle : ne jamais la raccourcir.",
  },
  {
    terme: 'Échec',
    definition:
      "Moment où une répétition supplémentaire n'est plus possible avec une technique correcte.",
  },
];

/** Section 2.2 : règles générales, résumées pour consultation rapide. */
export const REGLES_GENERALES: string[] = [
  'Volume : 2 à 3 séries par exercice. Au-delà, chaque série supplémentaire rapporte de moins en moins par rapport à la fatigue qu’elle ajoute.',
  'Intensité : RIR 1 à 2 sur les gros poly-articulaires, RIR 2 et jamais l’échec sur le soulevé de terre jambes tendues, RIR 0 à 1 sur l’isolation et le poids du corps.',
  'Repos : 90 s à 2 min sur les gros exercices, 60 à 90 s sur l’isolation. Au-delà de 90 s, aucun gain supplémentaire mesurable.',
  'Amplitude : toujours complète, en insistant sur la position étirée.',
  'Double progression : quand tu atteins le haut de la fourchette de répétitions sur toutes les séries, augmente la charge la séance suivante et repars du bas de la fourchette.',
  'Sans charge supplémentaire : ralentir la descente à 3 ou 4 s, ajouter une pause d’1 à 2 s en position étirée, passer à une variante plus difficile, ou lester avec un sac à dos.',
  'Charges légères : elles font grossir le muscle autant que les charges lourdes, à condition de s’approcher de l’échec.',
  'Séries d’échauffement : 1 à 2 séries légères avant le premier exercice de chaque séance, non comptées dans le volume.',
];

/** Section 3 : placement de la course. */
export const PLACEMENT_COURSE =
  "De préférence jeudi et dimanche. Éviter une sortie longue ou intense la veille du mardi (lombaires) et du mercredi (jambes et tendons). Si une course tombe un jour de salle, la faire après la séance ou à un autre moment de la journée.";

export const AVERTISSEMENT_SANTE =
  "Ce programme est un outil d'entraînement général et ne remplace pas l'avis d'un professionnel de santé en cas de douleur ou de blessure.";
